# Déploiement Vercel Services

Cette configuration déploie Midday dans **un seul projet Vercel** avec une URL publique commune :

- `dashboard` : application Next.js conteneurisée ;
- `api` : API Bun/Hono conteneurisée ;
- `Supabase` et Redis : services managés externes ;
- `worker` : à migrer vers Vercel Queues/Workflow, ou à conserver sur Railway tant qu'il dépend d'un consommateur BullMQ permanent.

## Configuration

Le fichier [`/vercel.json`](../vercel.json) est placé à la racine du monorepo. Le projet Vercel doit donc utiliser la racine du dépôt comme **Root Directory** et le framework `Services`.

Les deux services utilisent `root: "."` et des `entrypoint` Dockerfiles sous `apps/`. C’est volontaire : les Dockerfiles exécutent `turbo prune` et ont besoin du `package.json`, du lockfile et des packages workspace à la racine du monorepo. Un `root` réglé sur `apps/api` ou `apps/dashboard` transforme le contexte Docker en sous-répertoire et provoque l’erreur `Missing devEngines.packageManager or legacy packageManager`.

## Routage

- `/api/*` est routé vers le service `api` ;
- toutes les autres routes sont routées vers `dashboard` ;
- `dashboard` appelle `api` via le binding interne `API_URL` ;
- `api` n'est pas exposée par un domaine séparé.

Les réécritures transmettent le chemin original au service. L'API doit donc continuer à accepter ses routes sous `/api` comme dans le code actuel.

## Variables d'environnement minimales

À configurer dans le projet Vercel, sans les committer :

- variables Supabase et base de données ;
- `REDIS_URL` et, si nécessaire, `REDIS_QUEUE_URL` ;
- secrets de chiffrement et JWT ;
- clés OpenAI/Google et intégrations activées ;
- `NEXT_PUBLIC_*` nécessaires au build du dashboard ;
- `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY`, identique entre déploiements et réplicas ;
- `API_URL` est injectée automatiquement par le binding Vercel et ne doit pas être définie manuellement.

## Worker

Le worker actuel lance un serveur HTTP de health-check, mais son rôle principal est de consommer des files BullMQ en continu. Les conteneurs Vercel peuvent être arrêtés après une période sans trafic ; un service privé sans requêtes n'est donc pas un remplacement fiable d'un worker permanent.

La migration recommandée est :

1. garder le worker sur Railway pendant la migration du dashboard et de l'API ;
2. déplacer les tâches compatibles vers Vercel Queues ou Vercel Workflow ;
3. revalider les traitements qui nécessitent des connexions TCP persistantes à Redis avant de supprimer Railway.

## Validation locale

```bash
npx vercel dev -L
```

Puis vérifier :

```bash
curl http://localhost:3000/health
curl http://localhost:3000/api/health
```

Le premier déploiement doit être effectué comme preview avant toute promotion en production.
