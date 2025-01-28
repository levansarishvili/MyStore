import Link from "next/link";
import { login, signup, signInWithGithub, signInWithGoogle } from "./actions";
import { useTranslations } from "next-intl";
import { Button } from "src/app/components/ui/button";

export default function LoginPage() {
  const t = useTranslations("LoginPage");

  return (
    <div className="bg-card flex flex-col items-center gap-10 justify-center border max-w-[28rem] mx-auto rounded-xl px-12 py-4 shadow-md">
      <form className="flex flex-col items-center gap-10 justify-center max-w-[28rem] mx-auto">
        <h1 className="text-2xl md:text-4xl font-medium">
          {t("login-header")}
        </h1>
        <div className="flex">
          <p>Don&apos;t have an accout yet? &nbsp;</p>
          <Link href="/signup" className="text-primary">
            Sign Up
          </Link>
        </div>
        <div className="flex flex-col gap-6 w-full">
          <div className="flex flex-col gap-2 min-w-[16rem]">
            <label className="text-base" htmlFor="email">
              {t("email")}:
            </label>
            <input
              className="border rounded-lg px-4 py-2 text-sm "
              id="email"
              name="email"
              type="email"
              data-cy="email-input"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-base" htmlFor="password">
              {t("password")}:
            </label>
            <input
              className="border rounded-lg px-4 py-2 text-sm "
              id="password"
              name="password"
              type="password"
              data-cy="password-input"
              required
            />
          </div>
        </div>
        <div className="w-2/3">
          <Button
            formAction={login}
            variant={"default"}
            className="hover:bg-[#38cb89]/80 transition-all duration-300 w-full text-foreground"
            data-cy="login-button"
          >
            {t("login-button")}
          </Button>
        </div>
      </form>
      <form className="flex flex-col gap-4 justify-center items-center">
        <p className="text-sm">{t("sign-in-with")}</p>
        <div className="flex gap-8">
          {/* Sign in with GitHub */}
          <button
            formAction={signInWithGithub}
            className="w-9 h-9 flex items-center gap-4 duration-300 font-medium hover:fill-[#38cb89] fill-foreground"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ionicon w-12 h-12"
              viewBox="0 0 512 512"
            >
              <path d="M256 32C132.3 32 32 134.9 32 261.7c0 101.5 64.2 187.5 153.2 217.9a17.56 17.56 0 003.8.4c8.3 0 11.5-6.1 11.5-11.4 0-5.5-.2-19.9-.3-39.1a102.4 102.4 0 01-22.6 2.7c-43.1 0-52.9-33.5-52.9-33.5-10.2-26.5-24.9-33.6-24.9-33.6-19.5-13.7-.1-14.1 1.4-14.1h.1c22.5 2 34.3 23.8 34.3 23.8 11.2 19.6 26.2 25.1 39.6 25.1a63 63 0 0025.6-6c2-14.8 7.8-24.9 14.2-30.7-49.7-5.8-102-25.5-102-113.5 0-25.1 8.7-45.6 23-61.6-2.3-5.8-10-29.2 2.2-60.8a18.64 18.64 0 015-.5c8.1 0 26.4 3.1 56.6 24.1a208.21 208.21 0 01112.2 0c30.2-21 48.5-24.1 56.6-24.1a18.64 18.64 0 015 .5c12.2 31.6 4.5 55 2.2 60.8 14.3 16.1 23 36.6 23 61.6 0 88.2-52.4 107.6-102.3 113.3 8 7.1 15.2 21.1 15.2 42.5 0 30.7-.3 55.5-.3 63 0 5.4 3.1 11.5 11.4 11.5a19.35 19.35 0 004-.4C415.9 449.2 480 363.1 480 261.7 480 134.9 379.7 32 256 32z" />
            </svg>
          </button>
          {/* Sign in with Google */}
          <button
            formAction={signInWithGoogle}
            className="w-9 h-9 flex items-center gap-4 duration-300 font-medium hover:fill-[#38cb89] fill-foreground"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ionicon w-12 h-12"
              viewBox="0 0 512 512"
            >
              <path d="M473.16 221.48l-2.26-9.59H262.46v88.22H387c-12.93 61.4-72.93 93.72-121.94 93.72-35.66 0-73.25-15-98.13-39.11a140.08 140.08 0 01-41.8-98.88c0-37.16 16.7-74.33 41-98.78s61-38.13 97.49-38.13c41.79 0 71.74 22.19 82.94 32.31l62.69-62.36C390.86 72.72 340.34 32 261.6 32c-60.75 0-119 23.27-161.58 65.71C58 139.5 36.25 199.93 36.25 256s20.58 113.48 61.3 155.6c43.51 44.92 105.13 68.4 168.58 68.4 57.73 0 112.45-22.62 151.45-63.66 38.34-40.4 58.17-96.3 58.17-154.9 0-24.67-2.48-39.32-2.59-39.96z" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}
