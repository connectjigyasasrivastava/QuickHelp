import Link from "next/link";
import { redirect } from "next/navigation";
import { CheckCircle2, Plus } from "lucide-react";
import { getAuthUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const authUser = await getAuthUser();

  if (!authUser) {
    redirect("/login");
  }

  const [user, tasks] = await Promise.all([
    prisma.user.findUnique({
      where: { id: authUser.id },
    }),
    prisma.task.findMany({
      include: { owner: true, helper: true },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  if (!user) {
    redirect("/login");
  }

  const openTasks = tasks.filter((task) => task.status === "OPEN").length;
  const completedTasks = tasks.filter((task) => task.status === "COMPLETED").length;

  return (
    <main className="min-h-screen px-6 py-8">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">QuickHelp</h1>
            <p className="mt-1 text-zinc-600">Welcome, {user.name}</p>
          </div>
          <div className="flex gap-3">
            <Link href="/tasks/new" className="inline-flex items-center gap-2 rounded-md bg-zinc-950 px-4 py-3 font-semibold text-white">
              <Plus size={18} /> Post task
            </Link>
            <form action="/api/logout" method="POST">
              <button className="rounded-md border border-zinc-300 bg-white px-4 py-3 font-semibold">Logout</button>
            </form>
          </div>
        </header>

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-zinc-600">Wallet balance</p>
            <p className="mt-2 text-3xl font-bold">Rs {user.balance}</p>
          </div>
          <div className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-zinc-600">Open tasks</p>
            <p className="mt-2 text-3xl font-bold">{openTasks}</p>
          </div>
          <div className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-zinc-600">Completed tasks</p>
            <p className="mt-2 text-3xl font-bold">{completedTasks}</p>
          </div>
        </section>

        <section className="mt-8 grid gap-4">
          {tasks.map((task) => (
            <article key={task.id} className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold">{task.title}</h2>
                  <p className="mt-2 max-w-2xl text-zinc-700">{task.description}</p>
                  <p className="mt-3 text-sm text-zinc-600">{task.location}</p>
                  <p className="mt-1 text-sm text-zinc-600">Posted by {task.owner.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">Rs {task.budget}</p>
                  <p className="mt-2 rounded-md bg-zinc-100 px-3 py-1 text-sm font-semibold">{task.status}</p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                {task.status === "OPEN" && task.ownerId !== user.id && (
                  <form action={`/api/tasks/${task.id}/accept`} method="POST">
                    <button className="rounded-md bg-emerald-700 px-4 py-2 font-semibold text-white">Accept task</button>
                  </form>
                )}

                {task.status === "ACCEPTED" && task.ownerId === user.id && (
                  <form action={`/api/tasks/${task.id}/complete`} method="POST">
                    <button className="inline-flex items-center gap-2 rounded-md bg-zinc-950 px-4 py-2 font-semibold text-white">
                      <CheckCircle2 size={18} /> Mark complete
                    </button>
                  </form>
                )}

                {task.helper && <p className="py-2 text-sm text-zinc-600">Helper: {task.helper.name}</p>}
              </div>
            </article>
          ))}

          {tasks.length === 0 && (
            <div className="rounded-lg border border-zinc-200 bg-white p-8 text-center">
              <h2 className="text-xl font-bold">No tasks yet</h2>
              <p className="mt-2 text-zinc-600">Post the first task and start your local marketplace.</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
