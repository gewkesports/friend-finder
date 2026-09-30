import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, CarFront, Gauge, History, Search, Sparkles, Trophy, Zap } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

const cars = [
  { name: "Porsche 911 RSR", group: "Gr.3", drive: "MR" },
  { name: "BMW M4 GT3", group: "Gr.3", drive: "FR" },
  { name: "Toyota GR Supra", group: "Gr.4", drive: "FR" },
];

const features = [
  { icon: Sparkles, title: "Engenheiro virtual", text: "Gere setups a partir do carro, pista, pneus, objetivo e comportamento desejado." },
  { icon: Gauge, title: "Setup validado", text: "Os valores passam por regras de limites antes de chegar ao seu setup final." },
  { icon: History, title: "Evolua por feedback", text: "Teste no GT7, diga o que aconteceu e transforme V1 em V2, V3 e além." },
];

function Index() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#07111f] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_15%,rgba(34,211,238,0.13),transparent_30%),radial-gradient(circle_at_10%_80%,rgba(59,130,246,0.10),transparent_32%)]" />

      <header className="relative z-10 border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-400/10">
              <Zap className="h-5 w-5 text-cyan-300" />
            </div>
            <div>
              <div className="text-lg font-black tracking-[0.18em]">TUNE LAB</div>
              <div className="text-[10px] font-medium uppercase tracking-[0.25em] text-slate-500">GT7 Setup Engineer</div>
            </div>
          </div>
          <div className="hidden items-center gap-7 text-sm text-slate-400 md:flex">
            <a href="#como-funciona" className="transition hover:text-white">Como funciona</a>
            <a href="#catalogo" className="transition hover:text-white">Catálogo</a>
            <button className="rounded-lg border border-white/10 px-4 py-2 text-white transition hover:border-cyan-400/40 hover:bg-white/5">Entrar</button>
          </div>
        </div>
      </header>

      <section className="relative z-10 mx-auto grid max-w-7xl gap-12 px-5 pb-20 pt-16 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:pb-28 lg:pt-24">
        <div className="flex flex-col justify-center">
          <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-3 py-1.5 text-xs font-semibold text-cyan-300">
            <Sparkles className="h-3.5 w-3.5" /> Seu engenheiro de setups para GT7
          </div>
          <h1 className="max-w-3xl text-5xl font-black leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl">
            Pare de testar setup no escuro.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            O TUNE LAB transforma seu carro, sua pista e seu feedback em um setup estruturado para você testar no Gran Turismo 7 — e aprende com cada nova tentativa.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="/app" className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-300 px-6 py-3.5 font-bold text-slate-950 shadow-[0_0_40px_rgba(103,232,249,0.18)] transition hover:bg-cyan-200">
              Abrir TUNE LAB <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#catalogo" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 px-6 py-3.5 font-semibold text-white transition hover:bg-white/5">
              Explorar catálogo
            </a>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-xs text-slate-500">
            <span>79 carros catalogados</span><span>121 layouts catalogados</span><span>Iteração por feedback</span>
          </div>
        </div>

        <div id="novo-setup" className="relative">
          <div className="absolute -inset-5 rounded-[2rem] bg-cyan-400/5 blur-3xl" />
          <div className="relative rounded-3xl border border-white/10 bg-[#0c1828]/95 p-5 shadow-2xl backdrop-blur">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Novo setup</p>
                <h2 className="mt-1 text-xl font-bold">Comece pelo carro</h2>
              </div>
              <div className="rounded-xl bg-cyan-400/10 p-2.5"><CarFront className="h-5 w-5 text-cyan-300" /></div>
            </div>
            <label className="mb-2 block text-xs font-semibold text-slate-400">Carro</label>
            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#081321] px-4 py-3.5">
              <Search className="h-4 w-4 text-slate-500" />
              <span className="text-sm text-slate-300">Pesquisar carro...</span>
            </div>
            <div className="mt-3 space-y-2">
              {cars.map((car) => (
                <button key={car.name} className="flex w-full items-center justify-between rounded-xl border border-white/5 bg-white/[0.025] px-4 py-3 text-left transition hover:border-cyan-400/30 hover:bg-cyan-400/5">
                  <div><p className="text-sm font-semibold">{car.name}</p><p className="mt-0.5 text-xs text-slate-500">{car.drive} · {car.group}</p></div>
                  <ArrowRight className="h-4 w-4 text-slate-600" />
                </button>
              ))}
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-white/5 bg-white/[0.025] p-3"><p className="text-[10px] uppercase tracking-wider text-slate-500">Pista</p><p className="mt-1 text-sm text-slate-300">Selecionar depois</p></div>
              <div className="rounded-xl border border-white/5 bg-white/[0.025] p-3"><p className="text-[10px] uppercase tracking-wider text-slate-500">Pneus</p><p className="mt-1 text-sm text-slate-300">Racing Soft</p></div>
            </div>
            <a href="/app" className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-white/10 py-3 text-sm font-bold text-white transition hover:bg-white/15">
              Abrir aplicativo <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <section id="como-funciona" className="relative z-10 border-y border-white/10 bg-[#091523]">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-300">A lógica do TUNE LAB</p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">Não é só gerar números.</h2>
            <p className="mt-4 text-slate-400">A ideia é criar um ciclo de engenharia: gerar, testar, entender e ajustar.</p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {features.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10"><Icon className="h-5 w-5 text-cyan-300" /></div>
                <h3 className="mt-5 font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="catalogo" className="relative z-10 mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            ["79", "carros", "Gr.1 · Gr.3 · Gr.4"],
            ["121", "layouts", "Circuitos e variantes"],
            ["∞", "iterações", "Setup V1 → V2 → V3..."],
          ].map(([number, label, sub]) => (
            <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.025] p-7">
              <Trophy className="h-5 w-5 text-cyan-300" />
              <p className="mt-5 text-4xl font-black">{number}</p>
              <p className="mt-1 font-bold">{label}</p>
              <p className="mt-1 text-sm text-slate-500">{sub}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/10 px-5 py-7 text-center text-xs text-slate-600">
        TUNE LAB · GT7 Setup Engineer · Construído para evoluir com cada piloto.
      </footer>
    </main>
  );
}
