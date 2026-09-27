"use client";

import Image from "next/image";

const demoStats = [
  { label: "Cash position", value: "$48,620", detail: "+12.4% this month" },
  { label: "Revenue this month", value: "$21,450", detail: "84% of target" },
  { label: "Open invoices", value: "8", detail: "$12,840 outstanding" },
  { label: "To review", value: "14", detail: "Transactions ready" },
];

export function PersonalizedWelcome() {
  return (
    <section className="mb-8 overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-background via-background to-muted/40 shadow-[0_18px_60px_-36px_rgba(0,0,0,0.35)]">
      <div className="relative flex flex-col gap-6 p-5 sm:p-7 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-4 sm:gap-5">
          <div className="relative size-16 shrink-0 overflow-hidden rounded-2xl border-2 border-background shadow-lg ring-1 ring-border/70 sm:size-20">
            <Image
              src="/profile-photo.jpeg"
              alt="Profile"
              fill
              sizes="80px"
              className="object-cover"
              priority
            />
          </div>
          <div className="max-w-xl">
            <div className="mb-2 inline-flex items-center rounded-full border border-primary/15 bg-primary/[0.06] px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-primary/75">
              Your workspace
            </div>
            <h2 className="text-xl font-medium tracking-tight sm:text-2xl">
              Welcome to your financial command center
            </h2>
            <p className="mt-2 max-w-lg text-sm leading-6 text-muted-foreground">
              A calm, clear workspace to track cash flow, invoices, expenses,
              and the next best action for your business.
            </p>
          </div>
        </div>
        <div className="relative flex shrink-0 items-center gap-3 rounded-xl border border-border/60 bg-background/75 px-4 py-3 backdrop-blur-sm">
          <div className="size-2 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.12)]" />
          <div>
            <p className="text-xs font-medium">Workspace ready</p>
            <p className="text-[11px] text-muted-foreground">Live financial overview</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 border-t border-border/60 bg-muted/20 sm:grid-cols-4">
        {demoStats.map((stat, index) => (
          <div
            key={stat.label}
            className={`px-4 py-4 sm:px-5 ${index > 0 ? "border-l border-border/60" : ""}`}
          >
            <p className="text-[11px] text-muted-foreground">{stat.label}</p>
            <p className="mt-1 text-lg font-medium tracking-tight">{stat.value}</p>
            <p className="mt-0.5 text-[10px] text-muted-foreground">{stat.detail}</p>
          </div>
        ))}
      </div>
      <p className="px-5 pb-3 pt-2 text-right text-[10px] text-muted-foreground/70">
        Demo snapshot · Connect your accounts to replace these figures
      </p>
    </section>
  );
}
