import { NextResponse } from "next/server";
import { createClient } from "../../../../utils/supabase/server";
import GetUserData from "../../../components/GetUserData";

export async function DELETE(req: Request) {
  const supabase = await createClient();

  // Get user ID
  const userData = await GetUserData();
  const userId = userData?.id;

  if (!userId) {
    return NextResponse.json(
      { success: false, message: "User not logged in" },
      { status: 401 }
    );
  }

  // Get blog ID from request body
  const { blogId } = await req.json();

  if (!blogId) {
    return NextResponse.json(
      { success: false, message: "Blog ID is required" },
      { status: 400 }
    );
  }

  // Get blog image from Supabase
  const { data: blogImage, error: blogImageError } = (await supabase
    .from("posts")
    .select("image_url")
    .eq("id", blogId)
    .single()) as { data: { image_url: string }; error: any };

  if (blogImageError) {
    return NextResponse.json(
      { success: false, message: blogImageError.message },
      { status: 500 }
    );
  }

  const imageName = blogImage?.image_url.split("/").pop() as string;

  // Delete blog from Supabase storage
  const { error: storageError } = await supabase.storage
    .from("blog-images")
    .remove([imageName]);

  if (storageError) {
    return NextResponse.json(
      { success: false, message: storageError.message },
      { status: 500 }
    );
  }

  // Delete blog from Supabase database
  const { error } = await supabase.from("posts").delete().eq("id", blogId);
  if (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, message: "Blog deleted" });
}
