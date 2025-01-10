import Image from "next/image";
import { createClient } from "../../../../utils/supabase/server";

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  const userData = data?.user;

  return (
    <section className="profile-wrapper flex flex-col items-center gap-20">
      <h1 className="section-header text-4xl font-semibold">My Account</h1>

      {/* Profile content */}
      <div className="profile-content dark:bg-[#313131] dark:text-[#f8f9fa] grid grid-cols-2 gap-x-40 w-full border rounded-2xl bg-[#f1f3f5] p-16">
        <div className="profile-media-wrapper flex flex-col items-center gap-16">
          <div className="profile__img-wrapper flex flex-col items-center gap-3">
            <div className="profile__img-box flex items-center justify-center w-40 h-40 rounded-full border-2 border-[#ec5e2a] overflow-hidden bg-white">
              <Image
                className="profile__img rounded-full w-11/12"
                src={`${
                  userData?.user_metadata.avatar_url
                    ? userData?.user_metadata.avatar_url
                    : "/assets/user-avatar.png"
                }`}
                alt="User"
                width={100}
                height={100}
                quality={100}
              ></Image>
            </div>
          </div>

          <div className="profile-txt-wrapper flex flex-col gap-12 items-start">
            {/* <p className="profile-txt text-[1.4rem]">Name: {user.name}</p> */}
            {userData?.user_metadata?.user_name && (
              <p className="profile-txt text-[1.4rem]">
                Username: {userData?.user_metadata?.user_name}
              </p>
            )}

            <p className="profile-txt text-[1.4rem]">
              Email: {userData?.email}
            </p>
          </div>
        </div>

        <div className="profile__info flex flex-col gap-12 items-center w-[50rem]">
          <h2 className="profile-info-header text-[2.2rem] font-semibold">
            Account Details
          </h2>
          <form className="profile__form flex flex-col justify-center items-center gap-8 w-3/4">
            <div className="input-box flex flex-col justify-between items-start gap-2 w-full">
              <label
                className="input-label text-[1.4rem] text-gray-400 cursor-pointer"
                htmlFor="fname"
              >
                First Name*
              </label>
              <input
                className="profile__input dark:bg-[#4a4a4a] dark:text-white rounded-lg h-12 border border-gray-300 w-full px-4 py-6 text-[1.4rem] text-gray-700 outline-none transition-all duration-300 focus:border-[#ec5e2a]"
                type="text"
                id="fname"
              />
            </div>
            <div className="input-box flex flex-col justify-between items-start gap-2 w-full">
              <label
                className="input-label text-[1.4rem] text-gray-400 cursor-pointer"
                htmlFor="lname"
              >
                Last Name*
              </label>
              <input
                className="profile__input dark:bg-[#4a4a4a] dark:text-white rounded-lg h-12 border border-gray-300 w-full px-4 py-6 text-[1.4rem] text-gray-700 outline-none transition-all duration-300 focus:border-[#ec5e2a]"
                type="text"
                id="lname"
              />
            </div>
            <div className="input-box flex flex-col justify-between items-start gap-2 w-full">
              <label
                className="input-label text-[1.4rem] text-gray-400 cursor-pointer"
                htmlFor="phone"
              >
                Phone*
              </label>
              <input
                className="profile__input dark:bg-[#4a4a4a] dark:text-white rounded-lg h-12 border border-gray-300 w-full px-4 py-6 text-[1.4rem] text-gray-700 outline-none transition-all duration-300 focus:border-[#ec5e2a]"
                type="tel"
                id="phone"
              />
            </div>
            <div className="input-box flex flex-col justify-between items-start gap-2 w-full">
              <label
                className="input-label text-[1.4rem] text-gray-400 cursor-pointer"
                htmlFor="email"
              >
                Email*
              </label>
              <input
                className="profile__input dark:bg-[#4a4a4a] dark:text-white rounded-lg h-12 border border-gray-300 w-full px-4 py-6 text-[1.4rem] text-gray-700 outline-none transition-all duration-300 focus:border-[#ec5e2a]"
                type="email"
                id="email"
              />
            </div>

            <button className="btn w-40">Save changes</button>
          </form>
        </div>
      </div>
    </section>
  );
}
