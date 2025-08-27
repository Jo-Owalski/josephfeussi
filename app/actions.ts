"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "./utils/db";
import { redirect } from "next/navigation";

export async function handleSubmission(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return redirect("api/auth/register")
  }

  const title = String(formData.get("title") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();

  const urlValue = formData.get("url");
  const imageUrl = urlValue ? String(urlValue).trim() : undefined;

  await prisma.blogPost.create({
    data: {
      title,
      content,
      authorId: user.id,
      authorName: String(
        user.given_name ?? user.family_name ?? user.email ?? "Anonymous"
      ),
      authorImage: String(user.picture ?? ""),
      ...(imageUrl ? { imageUrl } : {}), // only include if provided; otherwise DB default is used
    },
  });

  return redirect("/");
};
