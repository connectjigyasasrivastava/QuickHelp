import Link from "next/link";
import { ArrowRight, MapPin, ShieldCheck, Wallet } from "lucide-react";

export default function Home() {
  const tasks = [
    ["Pick up medicines", "Koramangala to Indiranagar", "Rs 250"],
    ["Assemble study table", "HSR Layout", "Rs 600"],
    ["Submit college form", "North Campus", "Rs 300"],
  ];

  return (
    <main className="min-h-screen">
      <section className="mx-auto grid min-h-screen max-w-6xl items-center gap-10 px-6 py-10 md:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-emerald-700">
            Local paid tasks
          </p>
          <h1 className="max-w-3xl text-5xl font-bold leading-tight text-zinc-950 md:text-7xl">
            Get everyday tasks done by trusted people nearby.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-700">
            Post a task, set your budget, and let nearby helpers accept the work. Built for errands, campus help, society jobs, and urgent local support.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/register" className="inline-flex items-center gap-2 rounded-md bg-zinc-950 px-5 py-3 font-semibold text-white">
              Start now <ArrowRight size={18} />
            </Link>
            <Link href="/login" className="inline-flex items-center gap-2 rounded-md border border-zinc-300 bg-white px-5 py-3 font-semibold text-zinc-950">
              Login
            </Link>
          </div>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
          <div className="space-y-4">
            {tasks.map((task) => (
              <div key={task[0]} className="rounded-md border border-zinc-200 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-bold text-zinc-950">{task[0]}</h2>
                    <p className="mt-2 flex items-center gap-2 text-sm text-zinc-600">
                      <MapPin size={16} /> {task[1]}
                    </p>
                  </div>
                  <span className="rounded-md bg-emerald-100 px-3 py-1 text-sm font-bold text-emerald-800">
                    {task[2]}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-md bg-zinc-100 p-4">
              <ShieldCheck className="text-emerald-700" />
              <p className="mt-3 font-semibold">Verified helpers</p>
            </div>
            <div className="rounded-md bg-zinc-100 p-4">
              <Wallet className="text-emerald-700" />
              <p className="mt-3 font-semibold">Escrow-style flow</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
