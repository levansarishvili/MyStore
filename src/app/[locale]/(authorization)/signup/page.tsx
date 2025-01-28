import Link from "next/link";
import { signup, signInWithGithub, signInWithGoogle } from "./actions";
import { useTranslations } from "next-intl";
import { Button } from "src/app/components/ui/button";

export default function LoginPage() {
  const t = useTranslations("LoginPage");

  return (
    <form className="flex flex-col items-center gap-16 justify-center border w-[28rem] mx-auto rounded-xl p-6 shadow-md">
      <h1 className="text-2xl md:text-4xl font-medium">{t("login-header")}</h1>
      <div className="flex">
        <p>Don&apos;t have an accout yet? &nbsp;</p>
        <Link href="/login" className="text-primary">
          Sign in
        </Link>
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2 min-w-[16rem]">
          <label className="text-[1.6rem]" htmlFor="email">
            {t("email")}:
          </label>
          <input
            className="border rounded-lg px-4 py-2 text-[1.4rem] dark:bg-[#4a4a4a]"
            id="email"
            name="email"
            type="email"
            data-cy="email-input"
            // required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[1.6rem]" htmlFor="password">
            {t("password")}:
          </label>
          <input
            className="border rounded-lg px-4 py-2 text-[1.4rem] dark:bg-[#4a4a4a]"
            id="password"
            name="password"
            type="password"
            data-cy="password-input"
            // required
          />
        </div>
      </div>
      <div className="w-2/3">
        <Button
          formAction={signup}
          variant={"default"}
          className="hover:bg-[#38cb89]/80 transition-all duration-300 w-full"
          data-cy="signup-button"
        >
          {t("signup-button")}
        </Button>
      </div>
    </form>
  );
}
