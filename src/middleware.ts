import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { type NextRequest } from "next/server";
import { updateSession } from "./utils/supabase/middleware";

// Create the intl middleware
const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  // Step 1: Apply internationalization middleware
  const intlResponse = intlMiddleware(request);
  if (intlResponse) {
    // If intlMiddleware returns a response (e.g., a redirect), short-circuit and return it
    return intlResponse;
  }

  // Step 2: Apply Supabase session update logic
  return await updateSession(request);
}

export const config = {
  matcher: [
    // Combine both matchers for intl and supabase
    "/",
    "/(ka|en)/:path*", // Matcher for internationalized paths
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)", // Matcher for Supabase auth
  ],
};
