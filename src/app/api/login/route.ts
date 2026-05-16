import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { signToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const formData = await request.formData();
  const email = String(formData.get("email") || "").toLowerCase().trim();
  const password = String(formData.get("password") || "");

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    redirect("/login?error=Account%20not%20found.%20Create%20an%20account%20first.");
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    redirect("/login?error=Incorrect%20password.%20Please%20try%20again.");
  }

  const token = signToken({
    id: user.id,
    email: user.email,
    name: user.name,
  });

  (await cookies()).set("token", token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });

  redirect("/dashboard");
}
