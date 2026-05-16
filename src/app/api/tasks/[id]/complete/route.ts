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

  if (!task || task.ownerId !== user.id || !task.helperId || task.status !== "ACCEPTED") {
    redirect("/dashboard");
  }

  await prisma.$transaction([
    prisma.task.update({
      where: { id },
      data: { status: "COMPLETED" },
    }),
    prisma.user.update({
      where: { id: task.helperId },
      data: { balance: { increment: task.budget } },
    }),
  ]);

  redirect("/dashboard");
}
