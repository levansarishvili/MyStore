import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../../utils/supabase/server";
import GetUserData from "src/app/components/GetUserData";

export async function POST(req: NextRequest) {
  // Extract the data from the request body
  const { data, data_ka } = await req.json();
  const { title, body, image_url } = await data;
  const { title_ka, body_ka } = await data_ka;

  if (!title || !body || !image_url || !title_ka || !body_ka) {
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
    })
    .select("*");
  console.log(blog);

  if (insertError) {
    return NextResponse.json(
      { success: false, message: insertError.message },
      { status: 500 }
    );
  }

  // Add translations into post_translations table
  const { data: blog_ka, error: insertError_ka } = await supabase
    .from("post_translations")
    .insert({
      blog_id: blog[0].id,
      translated_title: title_ka,
      translated_body: body_ka,
      language_code: "ka",
      user_id: userId,
      image_url: image_url,
    });

  if (insertError_ka) {
    return NextResponse.json(
      { success: false, message: insertError_ka.message },
      { status: 500 }
    );
  }

  // Add translations into post_translations table
  const { data: blog_en, error: insertError_en } = await supabase
    .from("post_translations")
    .insert({
      blog_id: blog[0].id,
      translated_title: title,
      translated_body: body,
      language_code: "en",
      user_id: userId,
      image_url: image_url,
    });

  if (insertError_en) {
    return NextResponse.json(
      { success: false, message: insertError_en.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, blog }, { status: 200 });
}
