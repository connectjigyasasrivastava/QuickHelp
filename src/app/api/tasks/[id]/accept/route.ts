import { redirect } from "next/navigation";
import { getAuthUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function POST(_: Request, context: RouteContext) {
  const user = await getAuthUser();

  if (!user) {
    redirect("/login");
  }

  const { id } = await context.params;
  const task = await prisma.task.findUnique({
    where: { id },
  });

  if (!task || task.status !== "OPEN" || task.ownerId === user.id) {
    redirect("/dashboard");
  }

  await prisma.task.update({
    where: { id },
    data: {
      status: "ACCEPTED",
      helperId: user.id,
    },
  });

  redirect("/dashboard");
}
