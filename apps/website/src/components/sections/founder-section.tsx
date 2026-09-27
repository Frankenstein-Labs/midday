import Image from "next/image";
import { founder } from "@/data/founder";

export function FounderSection() {
  return (
    <section className="bg-background py-12 sm:py-16 lg:py-24">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        <div className="text-center space-y-4 mb-10 sm:mb-12">
          <h2 className="font-serif text-2xl text-foreground">
            Built by its founder
          </h2>
          <p className="hidden sm:block font-sans text-base text-muted-foreground leading-normal max-w-xl mx-auto">
            Who is building the product, and where the vision comes from.
          </p>
        </div>

        <div className="border border-border grid grid-cols-1 sm:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
          <div className="relative aspect-square sm:aspect-auto border-b sm:border-b-0 sm:border-r border-border bg-secondary">
            <Image
              src={founder.photo}
              alt={founder.name}
              width={460}
              height={460}
              sizes="(max-width: 640px) 100vw, 280px"
              className="h-full w-full object-cover"
              priority={false}
            />
          </div>

          <div className="p-6 sm:p-10 lg:p-14 flex flex-col justify-center">
            <p className="font-sans text-xs uppercase tracking-[0.16em] text-muted-foreground">
              {founder.role}
            </p>
            <h3 className="font-serif text-2xl sm:text-3xl text-foreground mt-3">
              {founder.name}
            </h3>
            <p className="font-sans text-sm text-muted-foreground mt-2">
              {founder.age} years old · {founder.location}
            </p>
            <p className="font-sans text-sm sm:text-base text-muted-foreground leading-relaxed mt-6 max-w-2xl">
              {founder.statement}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
