import { redirect } from "next/navigation";
import { getAuthUser } from "@/lib/auth";

export default async function NewTaskPage() {
  const user = await getAuthUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="grid min-h-screen place-items-center px-6">
      <form action="/api/tasks" method="POST" className="w-full max-w-2xl rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-bold">Post a task</h1>
        <div className="mt-6 space-y-4">
          <input name="title" placeholder="Task title" required className="w-full rounded-md border border-zinc-300 px-4 py-3" />
          <textarea name="description" placeholder="Describe the task" required className="min-h-32 w-full rounded-md border border-zinc-300 px-4 py-3" />
          <input name="location" placeholder="Location" required className="w-full rounded-md border border-zinc-300 px-4 py-3" />
          <input name="budget" type="number" min="1" placeholder="Budget in Rs" required className="w-full rounded-md border border-zinc-300 px-4 py-3" />
          <button className="w-full rounded-md bg-zinc-950 px-4 py-3 font-semibold text-white">Publish task</button>
        </div>
      </form>
    </main>
  );
}
