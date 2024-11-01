"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const logoutHandler = () => {
    localStorage.clear();
    router.push("/login");
  };

  return (
    <div className="logout-btn w-10 h-10 group" onClick={logoutHandler}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="header__icon group-hover:stroke-[#ec5e2a] transition-all duration-300 dark:fill-white"
        viewBox="0 0 512 512"
      >
        <path
          d="M304 336v40a40 40 0 01-40 40H104a40 40 0 01-40-40V136a40 40 0 0140-40h152c22.09 0 48 17.91 48 40v40M368 336l80-80-80-80M176 256h256"
          fill="none"
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="32"
        />
      </svg>
    </div>
  );
}
