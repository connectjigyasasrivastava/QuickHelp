import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export type AuthUser = {
  id: string;
  email: string;
  name: string;
};

export function signToken(user: AuthUser) {
  return jwt.sign(user, process.env.JWT_SECRET as string, { expiresIn: "7d" });
}

export async function getAuthUser() {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return null;
  }

  try {
    return jwt.verify(token, process.env.JWT_SECRET as string) as AuthUser;
  } catch {
    return null;
  }
}
