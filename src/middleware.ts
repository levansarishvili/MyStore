import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// For Supabase session management
import { type NextRequest } from "next/server";
import { updateSession } from "./utils/supabase/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export default createMiddleware(routing);

export const config = {
  matcher: ["/", "/(ka|en)/:path*"],
};
