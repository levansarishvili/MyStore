import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../../utils/supabase/server";
import GetUserData from "src/app/components/GetUserData";

export async function POST(req: NextRequest) {
  // Extract the data from the request body
  const { title, body, image_url } = await req.json();
  if (!title || !body || !image_url) {
    return NextResponse.json(
      { success: false, message: "Missing required fields" },
      { status: 400 }
    );
  }

  const supabase = await createClient();

  const userData = await GetUserData();
  const userId = userData?.id;
  if (!userId) {
    return NextResponse.json(
      { success: false, message: "User not logged in" },
      { status: 401 }
    );
  }

  // Insert the blog into the database
  const { data: blog, error: insertError } = await supabase
    .from("posts")
    .insert({
      title: title,
      body: body,
      user_id: userId,
      image_url: image_url,
    });

  if (insertError) {
    return NextResponse.json(
      { success: false, message: insertError.message },
      { status: 500 }
    );
  }
  return NextResponse.json({ success: true, blog }, { status: 200 });
}
