import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="grid min-h-screen place-items-center px-6">
      <form action="/api/login" method="POST" className="w-full max-w-md rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-bold">Login</h1>
        <div className="mt-6 space-y-4">
          <input name="email" type="email" placeholder="Email" required className="w-full rounded-md border border-zinc-300 px-4 py-3" />
          <input name="password" type="password" placeholder="Password" required className="w-full rounded-md border border-zinc-300 px-4 py-3" />
          <button className="w-full rounded-md bg-zinc-950 px-4 py-3 font-semibold text-white">Login</button>
        </div>
        <p className="mt-5 text-sm text-zinc-600">
          New here? <Link href="/register" className="font-semibold text-zinc-950">Create account</Link>
        </p>
      </form>
    </main>
  );
}
