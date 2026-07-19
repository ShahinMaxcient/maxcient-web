import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { auth } from "@/auth";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await req.formData();
  const file = form.get("file") as File | null;
  if (!file || !file.size) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const maxSize = 4.5 * 1024 * 1024; // 4.5 MB
  if (file.size > maxSize) {
    return NextResponse.json({ error: "File too large (max 4.5 MB)" }, { status: 400 });
  }

  const allowed = ["image/jpeg", "image/png", "image/webp", "image/svg+xml", "image/gif"];
  if (!allowed.includes(file.type)) {
    return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
  }

  const blob = await put(file.name, file, {
    access: "public",
    addRandomSuffix: true,
  });

  return NextResponse.json({ url: blob.url });
}
