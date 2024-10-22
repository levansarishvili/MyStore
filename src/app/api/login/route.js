import { NextResponse } from "next/server";

export async function POST(req) {
  const { username, password } = await req.json();
  try {
    const response = await fetch("https://dummyjson.com/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
        // expiresInMins: 30,
      }),
    });
    if (!response.ok) {
      return NextResponse.json(
        { error: "Password or Username is incorrect" },
        { status: 401 }
      );
    }
    const data = await response.json();
    const accessToken = data.accessToken;

    // Set token in cookies
    const responseWithCookies = NextResponse.json({
      message: "Login successful",
    });
    responseWithCookies.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 30,
      path: "/",
    });
    return responseWithCookies;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
