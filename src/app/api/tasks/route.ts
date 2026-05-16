import { redirect } from "next/navigation";
import { getAuthUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const user = await getAuthUser();

  if (!user) {
    redirect("/login");
  }

  const formData = await request.formData();
  const title = String(formData.get("title") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const location = String(formData.get("location") || "").trim();
  const budget = Number(formData.get("budget") || 0);

  if (!title || !description || !location || budget < 1) {
    redirect("/tasks/new");
  }

  await prisma.task.create({
    data: {
      title,
      description,
      location,
      budget,
      ownerId: user.id,
    },
  });

  redirect("/dashboard");
}
