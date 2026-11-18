import type { Project } from "@/data/portfolio";

// Small, illustrative mock UIs for each project panel. Pure markup, no data fetching.

function Frame({ title, badge, children }: { title: string; badge?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-line bg-bg/80 shadow-[0_20px_50px_-20px_rgb(0_0_0/0.7)]">
      <div className="flex items-center gap-2 border-b border-line px-3 py-2">
        <span className="flex gap-1" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
        </span>
        <span className="truncate font-mono text-[10px] text-muted">{title}</span>
        {badge && (
          <span className="ml-auto flex items-center gap-1 font-mono text-[10px] text-accent">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
            {badge}
          </span>
        )}
      </div>
      <div className="flex-1 p-3 text-[11px] leading-snug">{children}</div>
    </div>
  );
}

function Sav() {
  const agents = ["NLP", "RAG", "Parts", "Repair"];
  return (
    <Frame title="sav-ia / diagnosis" badge="Live">
      <div className="ml-auto w-fit max-w-[85%] rounded-lg rounded-br-sm bg-surface-2 px-2.5 py-1.5 text-text">
        My washing machine won&apos;t drain and shows E21.
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-1">
        {agents.map((a, i) => (
          <span key={a} className="flex items-center gap-1">
            <span className="rounded-md border border-accent/30 bg-accent/10 px-1.5 py-0.5 font-mono text-[10px] text-accent">{a}</span>
            {i < agents.length - 1 && <span className="text-muted">→</span>}
          </span>
        ))}
      </div>
      <div className="mt-3 space-y-2 rounded-lg border border-line bg-surface p-2.5">
        <div className="flex items-center justify-between">
          <span className="text-muted">Likely cause</span>
          <span className="font-mono text-accent">82%</span>
        </div>
        <p className="font-medium text-text">Clogged drain pump filter</p>
        <div className="h-1 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-[82%] rounded-full bg-linear-to-r from-accent to-accent-2" />
        </div>
        <div className="flex items-center justify-between pt-1">
          <span className="text-muted">Spare part</span>
          <span className="text-text">Drain pump · DP-220</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted">Verdict</span>
          <span className="text-accent">✓ Repairable</span>
        </div>
      </div>
    </Frame>
  );
}

function Expense() {
  const fields = [
    { k: "Merchant", v: "MG Market" },
    { k: "Date", v: "2026-10-12" },
    { k: "Category", v: "Supermarkets" },
  ];
  return (
    <div className="mx-auto w-[210px] rounded-[26px] border border-line bg-bg/90 p-1.5 shadow-[0_20px_50px_-20px_rgb(0_0_0/0.7)]">
      <div className="overflow-hidden rounded-[20px] border border-line bg-surface text-[11px] leading-snug">
        <div className="flex items-center justify-between px-3 pt-2 font-mono text-[9px] text-muted">
          <span>9:41</span>
          <span className="h-3 w-12 rounded-full bg-bg" aria-hidden="true" />
          <span>5G</span>
        </div>
        <div className="flex items-center justify-between px-3 pt-2 pb-1.5">
          <span className="font-semibold text-text">Review expense</span>
          <span className="rounded-full bg-accent/15 px-1.5 py-0.5 font-mono text-[9px] text-accent">92%</span>
        </div>

        <div className="mx-3 flex gap-2 rounded-lg border border-line bg-bg/60 p-2">
          <div className="flex w-10 shrink-0 flex-col gap-1 rounded bg-white/85 p-1" aria-hidden="true">
            {[80, 60, 70, 50, 90, 40].map((w, i) => (
              <span key={i} className="h-[2px] rounded bg-black/40" style={{ width: `${w}%` }} />
            ))}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-muted">Amount</p>
            <p className="font-mono text-base font-semibold text-text">47.80 TND</p>
          </div>
        </div>

        <ul className="mx-3 mt-2 space-y-1">
          {fields.map((f) => (
            <li key={f.k} className="flex justify-between rounded-md bg-bg/60 px-2 py-1">
              <span className="text-muted">{f.k}</span>
              <span className="text-text">{f.v}</span>
            </li>
          ))}
        </ul>

        <div className="mx-3 mt-2.5 rounded-md bg-linear-to-r from-accent to-accent-2 py-1.5 text-center font-medium text-bg">
          Save to Sheets
        </div>

        <div className="mx-3 mt-2 mb-3 flex items-center gap-1.5 rounded-md border border-amber-400/30 bg-amber-400/10 px-2 py-1 text-[10px] text-amber-300">
          <span aria-hidden="true">🔔</span> 132.50 TND · over 100 TND alert
        </div>
      </div>
    </div>
  );
}

function Erp() {
  const rows = [
    { item: "Steel bolts M8", qty: 82 },
    { item: "Copper cable 2.5mm", qty: 54 },
    { item: "PVC pipe 40mm", qty: 9, low: true },
    { item: "Circuit breaker 16A", qty: 37 },
  ];
  return (
    <Frame title="erp / stock" badge="Synced">
      <div className="mb-2 flex items-center justify-between rounded-md border border-amber-400/30 bg-amber-400/10 px-2 py-1.5 text-amber-300">
        <span>⚠ Restock alert</span>
        <span className="font-mono text-[10px]">PVC pipe 40mm</span>
      </div>
      <ul className="space-y-2">
        {rows.map((r) => (
          <li key={r.item}>
            <div className="flex justify-between">
              <span className="text-text">{r.item}</span>
              <span className={`font-mono ${r.low ? "text-amber-300" : "text-muted"}`}>{r.qty}</span>
            </div>
            <div className="mt-1 h-1 rounded-full bg-white/10">
              <div
                className={`h-full rounded-full ${r.low ? "bg-amber-400" : "bg-accent/70"}`}
                style={{ width: `${r.qty}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-3 flex h-10 items-end gap-1" aria-hidden="true">
        {[40, 55, 35, 70, 60, 80, 45, 90, 65, 75].map((h, i) => (
          <span key={i} className="flex-1 rounded-sm bg-accent-2/40" style={{ height: `${h}%` }} />
        ))}
      </div>
    </Frame>
  );
}

function Blood() {
  const donors = [
    { name: "Donor #128", dist: "1.2 km" },
    { name: "Donor #087", dist: "2.8 km" },
    { name: "Donor #214", dist: "4.1 km" },
  ];
  return (
    <Frame title="blood-donation / requests" badge="Live">
      <div className="rounded-lg border border-rose-400/30 bg-rose-500/10 p-2.5">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] tracking-wider text-rose-300">URGENT</span>
          <span className="text-muted">2 min ago</span>
        </div>
        <div className="mt-1.5 flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-rose-500/20 font-mono text-sm font-bold text-rose-300">
            O−
          </span>
          <div>
            <p className="font-medium text-text">3 units needed</p>
            <p className="text-muted">City Hospital · Sfax</p>
          </div>
        </div>
      </div>
      <p className="mt-3 mb-1.5 text-muted">Matching donors notified</p>
      <ul className="space-y-1.5">
        {donors.map((d) => (
          <li key={d.name} className="flex items-center justify-between rounded-md bg-surface px-2 py-1.5">
            <span className="flex items-center gap-2 text-text">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {d.name}
            </span>
            <span className="font-mono text-[10px] text-muted">{d.dist} · ✓ sent</span>
          </li>
        ))}
      </ul>
    </Frame>
  );
}

function Risk() {
  const features = [
    { f: "Height work", v: 88 },
    { f: "PPE compliance", v: 64 },
    { f: "Crew experience", v: 47 },
    { f: "Weather", v: 31 },
  ];
  return (
    <Frame title="risk-model / predict">
      <div className="flex items-center gap-3">
        <div
          className="grid h-16 w-16 shrink-0 place-items-center rounded-full"
          style={{ background: "conic-gradient(#fb7185 0 78%, rgb(255 255 255 / 0.08) 78% 100%)" }}
        >
          <div className="grid h-12 w-12 place-items-center rounded-full bg-bg font-mono text-sm font-bold text-rose-300">0.78</div>
        </div>
        <div>
          <p className="font-mono text-[10px] tracking-wider text-rose-300">HIGH RISK</p>
          <p className="text-text">Site B · Block 4</p>
          <p className="text-muted">XGBoost · RF ensemble</p>
        </div>
      </div>
      <p className="mt-3 mb-1.5 text-muted">Feature importance</p>
      <ul className="space-y-1.5">
        {features.map((x) => (
          <li key={x.f} className="flex items-center gap-2">
            <span className="w-24 shrink-0 truncate text-text">{x.f}</span>
            <span className="h-1.5 flex-1 rounded-full bg-white/10">
              <span className="block h-full rounded-full bg-linear-to-r from-accent to-accent-2" style={{ width: `${x.v}%` }} />
            </span>
          </li>
        ))}
      </ul>
    </Frame>
  );
}

function Shop() {
  const items = [
    { name: "Wireless headset", price: "129 TND", hue: "from-accent/30 to-accent-2/10" },
    { name: "Smart watch", price: "249 TND", hue: "from-accent-2/30 to-accent/10" },
  ];
  return (
    <Frame title="shop / catalog">
      <div className="grid grid-cols-2 gap-2">
        {items.map((it) => (
          <div key={it.name} className="rounded-lg border border-line bg-surface p-1.5">
            <div className={`h-12 rounded-md bg-linear-to-br ${it.hue}`} aria-hidden="true" />
            <p className="mt-1.5 truncate text-text">{it.name}</p>
            <p className="font-mono text-[10px] text-accent">{it.price}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 space-y-1 rounded-lg border border-line bg-surface p-2.5">
        <div className="flex justify-between text-muted">
          <span>Cart (2)</span>
          <span className="font-mono">378 TND</span>
        </div>
        <div className="flex justify-between text-muted">
          <span>Delivery</span>
          <span className="font-mono">7 TND</span>
        </div>
        <div className="flex justify-between border-t border-line pt-1 font-medium text-text">
          <span>Total</span>
          <span className="font-mono">385 TND</span>
        </div>
        <div className="mt-1.5 rounded-md bg-linear-to-r from-accent to-accent-2 py-1 text-center font-medium text-bg">
          Checkout
        </div>
      </div>
    </Frame>
  );
}

const PREVIEWS = { sav: Sav, expense: Expense, erp: Erp, blood: Blood, risk: Risk, shop: Shop };

export function ProjectPreview({ kind }: { kind: NonNullable<Project["preview"]> }) {
  const Preview = PREVIEWS[kind];
  return (
    <figure className="flex flex-col justify-center xl:h-full" aria-hidden="true">
      <Preview />
      <figcaption className="mt-2 text-right font-mono text-[10px] text-muted/70">Illustrative UI</figcaption>
    </figure>
  );
}
