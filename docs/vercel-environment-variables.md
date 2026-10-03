# Variables d’environnement Vercel pour Midday

Cette liste correspond au projet Vercel Services à la racine du dépôt. Les valeurs sensibles ne doivent pas être commitées.

## 1. Variables minimales — API

À définir pour **Production, Preview et Development** selon le besoin :

| Variable | Valeur attendue |
|---|---|
| `NODE_ENV` | `production` |
| `SUPABASE_URL` | URL du projet Supabase |
| `SUPABASE_SECRET_KEY` | clé secrète serveur Supabase (`service_role`/secret), jamais publique |
| `DATABASE_PRIMARY_URL` | URL pooler transactionnel/serveur primaire Supabase |
| `DATABASE_PRIMARY_POOLER_URL` | URL pooler utilisée par les jobs et connexions applicatives |
| `REDIS_URL` | URL Redis cache managé, par exemple Upstash |
| `REDIS_QUEUE_URL` | URL Redis TCP persistante pour BullMQ ; ne pas utiliser une URL HTTP Upstash |
| `INTERNAL_API_KEY` | secret aléatoire partagé par API et dashboard |
| `MIDDAY_ENCRYPTION_KEY` | clé aléatoire conforme aux attentes du projet |
| `FILE_KEY_SECRET` | secret aléatoire pour les clés de fichiers |
| `INVOICE_JWT_SECRET` | secret aléatoire pour les tokens de facture |
| `ALLOWED_API_ORIGINS` | URL du dashboard, par exemple `https://midday.vercel.app` |
| `MIDDAY_DASHBOARD_URL` | URL publique du dashboard, utilisée dans les liens et callbacks |
| `MIDDAY_API_URL` | URL publique du projet, ou URL API dédiée si elle existe |
| `RESEND_API_KEY` | clé Resend si les e-mails sont activés |

## 2. Variables minimales — Dashboard

| Variable | Valeur attendue |
|---|---|
| `NODE_ENV` | `production` |
| `NEXT_PUBLIC_SUPABASE_URL` | même URL Supabase que l’API |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | clé publishable/anon Supabase, jamais la clé secrète |
| `NEXT_PUBLIC_SUPABASE_ID` | identifiant du projet Supabase |
| `NEXT_PUBLIC_URL` | URL publique du dashboard |
| `NEXT_PUBLIC_API_URL` | **`/api`** pour utiliser le routage du projet Vercel unique |
| `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY` | clé base64 aléatoire de 32 octets, identique entre les déploiements |
| `INTERNAL_API_KEY` | exactement la même valeur que celle de l’API |
| `FILE_KEY_SECRET` | exactement la même valeur que celle utilisée par l’API si le dashboard en a besoin |
| `INVOICE_JWT_SECRET` | même valeur que l’API pour les flux de facture concernés |

`API_URL` est injectée automatiquement par le binding Vercel pour les appels serveur dashboard → API. Ne la définis pas manuellement.

## 3. Variables fortement recommandées

| Variable | Rôle |
|---|---|
| `LOG_LEVEL` | `info` en production |
| `LOG_PRETTY` | `false` en production |
| `OPENAI_API_KEY` | assistant, extraction et fonctions IA OpenAI |
| `GOOGLE_GENERATIVE_AI_API_KEY` | fonctionnalités Gemini/Google |
| `R2_ENDPOINT` | stockage R2 |
| `R2_ACCESS_KEY_ID` | accès R2 |
| `R2_SECRET_ACCESS_KEY` | secret R2 |
| `R2_BUCKET_NAME` | bucket R2 |
| `NEXT_PUBLIC_SENTRY_DSN` | monitoring navigateur |
| `SENTRY_AUTH_TOKEN` | upload des source maps au build |
| `SENTRY_ORG` | organisation Sentry |
| `SENTRY_PROJECT` | projet Sentry |

## 4. Intégrations optionnelles

Ne renseigner une ligne que si l’intégration correspondante est activée :

- Banking : `PLAID_CLIENT_ID`, `PLAID_SECRET`, `PLAID_ENVIRONMENT`, `GOCARDLESS_SECRET_ID`, `GOCARDLESS_SECRET_KEY`, `ENABLEBANKING_APPLICATION_ID`, `ENABLE_BANKING_KEY_CONTENT`, `ENABLEBANKING_REDIRECT_URL`, `TELLER_CERT_BASE64`, `TELLER_KEY_BASE64`, `TELLER_SIGNING_SECRET` ;
- e-mail et messagerie : `RESEND_AUDIENCE_ID`, `SLACK_CLIENT_ID`, `SLACK_CLIENT_SECRET`, `SLACK_SIGNING_SECRET`, `SLACK_STATE_SECRET`, `SLACK_OAUTH_REDIRECT_URL`, `TELEGRAM_BOT_TOKEN`, `TELEGRAM_WEBHOOK_SECRET_TOKEN`, `TELEGRAM_BOT_USERNAME`, `WHATSAPP_PHONE_NUMBER_ID`, `WHATSAPP_BUSINESS_ACCOUNT_ID`, `WHATSAPP_ACCESS_TOKEN`, `WHATSAPP_VERIFY_TOKEN`, `WHATSAPP_APP_SECRET`, `SENDBLUE_API_KEY`, `SENDBLUE_API_SECRET`, `SENDBLUE_FROM_NUMBER`, `SENDBLUE_WEBHOOK_SECRET` ;
- paiements : `POLAR_ACCESS_TOKEN`, `POLAR_ENVIRONMENT`, `POLAR_WEBHOOK_SECRET`, `STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY`, `STRIPE_CONNECT_CLIENT_ID`, `STRIPE_CONNECT_WEBHOOK_SECRET` ;
- intégrations comptables : `GMAIL_CLIENT_ID`, `GMAIL_CLIENT_SECRET`, `GMAIL_REDIRECT_URI`, `OUTLOOK_CLIENT_ID`, `OUTLOOK_CLIENT_SECRET`, `OUTLOOK_REDIRECT_URI`, `XERO_CLIENT_ID`, `XERO_CLIENT_SECRET`, `XERO_OAUTH_REDIRECT_URL`, `QUICKBOOKS_CLIENT_ID`, `QUICKBOOKS_CLIENT_SECRET`, `QUICKBOOKS_OAUTH_REDIRECT_URL`, `FORTNOX_CLIENT_ID`, `FORTNOX_CLIENT_SECRET`, `FORTNOX_OAUTH_REDIRECT_URL` ;
- documents et enrichissement : `AZURE_DOCUMENT_INTELLIGENCE_ENDPOINT`, `AZURE_DOCUMENT_INTELLIGENCE_KEY`, `MISTRAL_API_KEY`, `EXA_API_KEY`, `COMPANY_ENRICH_API_KEY`, `LOGO_DEV_TOKEN`, `PLAIN_API_KEY`, `COMPOSIO_API_KEY` ;
- stockage et autres : `GITHUB_RELEASE_TOKEN`, `OPENPANEL_SECRET_KEY`, `NEXT_PUBLIC_OPENPANEL_CLIENT_ID`, `NEXT_PUBLIC_GOOGLE_API_KEY`.

## 5. Secrets à générer

Générer les secrets internes avec un gestionnaire de secrets ou :

```bash
openssl rand -base64 32   # NEXT_SERVER_ACTIONS_ENCRYPTION_KEY
openssl rand -hex 32      # INTERNAL_API_KEY
openssl rand -hex 32      # MIDDAY_ENCRYPTION_KEY
openssl rand -hex 32      # FILE_KEY_SECRET
openssl rand -hex 32      # INVOICE_JWT_SECRET
openssl rand -hex 32      # WEBHOOK_SECRET_KEY
```

Utiliser des valeurs différentes pour des secrets différents, sauf lorsque ce document indique explicitement qu’une valeur doit être partagée.

## 6. Ordre recommandé

1. Créer les variables API et Dashboard avec les mêmes valeurs partagées.
2. Déployer une Preview.
3. Remplacer `MIDDAY_DASHBOARD_URL` et `ALLOWED_API_ORIGINS` par l’URL Preview réelle.
4. Vérifier `/api/health` et `/health`.
5. Ajouter les intégrations optionnelles une par une.
6. Après validation, définir les valeurs Production avec le domaine final et redéployer.

## 7. Worker

Le worker BullMQ n’est pas inclus dans le projet Vercel Services public : Vercel peut arrêter un conteneur privé sans trafic, ce qui ne garantit pas un consommateur de queue permanent. Garder `REDIS_QUEUE_URL` et le worker sur Railway pendant la migration, ou migrer les jobs vers Vercel Queues/Workflow avant de supprimer Railway.
