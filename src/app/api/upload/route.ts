import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import sharp from "sharp";
import { auth } from "@/auth";

const BUCKET = "uploads";

// Instantiate the Supabase client lazily, inside the handler. At module scope
// it ran during Next's build-time "collect page data" pass, where the env vars
// may be absent, and createClient throws "supabaseUrl is required." — failing
// the whole build. Deferring it to request time means the build never needs
// the credentials, only the running function does.
function getSupabase() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase environment variables are not configured");
  return createClient(url, key);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabase();

  const form = await req.formData();
  const file = form.get("file") as File | null;
  if (!file || !file.size) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const maxSize = 10 * 1024 * 1024; // generous input cap — we compress before storing
  if (file.size > maxSize) {
    return NextResponse.json({ error: "File too large (max 10 MB)" }, { status: 400 });
  }

  const allowed = ["image/jpeg", "image/png", "image/webp", "image/svg+xml", "image/gif"];
  if (!allowed.includes(file.type)) {
    return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
  }

  const stamp = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  let body: Buffer | File = file;
  let contentType = file.type;
  let path: string;

  if (file.type === "image/svg+xml" || file.type === "image/gif") {
    // Vector / animated formats pass through untouched.
    const ext = file.type === "image/svg+xml" ? "svg" : "gif";
    path = `${stamp}.${ext}`;
  } else {
    // Photos: auto-rotate, cap at 2400px wide, re-encode as WebP.
    // Typically shrinks a 4–8 MB photo to a few hundred KB with no visible loss.
    try {
      const input = Buffer.from(await file.arrayBuffer());
      body = await sharp(input)
        .rotate()
        .resize({ width: 2400, withoutEnlargement: true })
        .webp({ quality: 82 })
        .toBuffer();
      contentType = "image/webp";
      path = `${stamp}.webp`;
    } catch {
      // Corrupt or unsupported image data — store the original rather than failing.
      const ext = file.name.split(".").pop() || "jpg";
      path = `${stamp}.${ext}`;
    }
  }

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, body, { contentType, upsert: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);

  return NextResponse.json({ url: data.publicUrl });
}
