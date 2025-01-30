import { NextResponse } from "next/server";
import { createClient } from "src/utils/supabase/server";

export async function POST(req: Request) {
  const supabase = await createClient();

  // Parse FormData
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  // Generate unique file name
  const filePath = `uploads/${Date.now()}-${file.name}`;

  // Upload to Supabase Storage
  const { data, error } = await supabase.storage
    .from("product-images")
    .upload(filePath, file);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Get public URL
  const { data: publicUrlData } = supabase.storage
    .from("product-images")
    .getPublicUrl(filePath);
  const imageUrl = publicUrlData.publicUrl;

  return NextResponse.json({ imageUrl });
}
