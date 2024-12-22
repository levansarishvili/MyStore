import { login, signup } from "./actions";

export default function LoginPage() {
  return (
    <form className="flex flex-col items-center gap-16 justify-center border w-[32rem] mx-auto rounded-xl p-6 shadow-md">
      <h1 className="text-[2.4rem] font-medium">Login</h1>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2 min-w-[26rem]">
          <label className="text-[1.6rem]" htmlFor="email">
            Email:
          </label>
          <input
            className="border rounded-lg px-4 py-2 text-[1.4rem]"
            id="email"
            name="email"
            type="email"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[1.6rem]" htmlFor="password">
            Password:
          </label>
          <input
            className="border rounded-lg px-4 py-2 text-[1.4rem]"
            id="password"
            name="password"
            type="password"
            required
          />
        </div>
      </div>

      <div className="flex gap-8 justify-center">
        <button
          formAction={login}
          className="px-4 py-2 rounded-lg text-white bg-[#ec5e2a] hover:bg-[]"
        >
          Log in
        </button>
        <button
          formAction={signup}
          className="px-4 py-2 rounded-lg text-white bg-gray-400 hover:bg-[]"
        >
          Sign up
        </button>
      </div>
    </form>
  );
}
