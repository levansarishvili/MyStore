// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import Loading from "../../loading";

// export default function ProfilePage() {
//   const [user, setUser] = useState(null);
//   const router = useRouter();

//   useEffect(() => {
//     const token = localStorage.getItem("accessToken");

//     async function fetchUser() {
//       try {
//         const res = await fetch("https://dummyjson.com/user/me", {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!res.ok) {
//           console.error("Failed to fetch profile data");
//           return;
//         }

//         const data = await res.json();

//         // Update the user state
//         setUser(data);
//       } catch (error) {
//         console.error(error);
//       }
//     }

//     fetchUser();
//   }, [router]);

//   // Render loading state if user is null
//   if (!user) {
//     return <Loading />;
//   }

//   return (
//     <section className="profile-wrapper flex flex-col items-center gap-20">
//       <h1 className="section-header text-4xl font-semibold">My Account</h1>

//       {/* Profile content */}
//       <div className="profile-content dark:bg-[#313131] dark:text-[#f8f9fa] grid grid-cols-2 gap-x-40 w-full border rounded-2xl bg-[#f1f3f5] p-16">
//         <div className="profile-media-wrapper flex flex-col items-center gap-16">
//           <div className="profile__img-wrapper flex flex-col items-center gap-3">
//             <div className="profile__img-box flex items-center justify-center w-40 h-40 rounded-full border-2 border-[#ec5e2a] overflow-hidden bg-white">
//               <img
//                 className="profile__img w-3/4"
//                 src={user.image || "../../assets/person.svg"}
//                 alt={user.firstName || "User"}
//               />
//             </div>
//           </div>

//           <div className="profile-txt-wrapper flex flex-col gap-12 items-start">
//             <p className="profile-txt text-[1.4rem]">
//               Name: {user.firstName} {user.lastName}
//             </p>
//             <p className="profile-txt text-[1.4rem]">
//               Phone: {user.phone || "N/A"}
//             </p>
//             <p className="profile-txt text-[1.4rem]">Email: {user.email}</p>
//             <p className="profile-txt text-[1.4rem]">
//               Address:
//               <span>{user.address.address}</span>
//               <span>{user.address.city}</span>
//               <span>{user.address.country}</span>
//             </p>
//             <p className="profile-txt text-[1.4rem]">
//               Profession: {user.company.title}
//             </p>
//           </div>
//         </div>

//         <div className="profile__info flex flex-col gap-12 items-center w-[50rem]">
//           <h2 className="profile-info-header text-[2.2rem] font-semibold">
//             Account Details
//           </h2>
//           <form className="profile__form flex flex-col justify-center items-center gap-8 w-3/4">
//             <div className="input-box flex flex-col justify-between items-start gap-2 w-full">
//               <label
//                 className="input-label text-[1.4rem] text-gray-400 cursor-pointer"
//                 htmlFor="fname"
//               >
//                 First Name*
//               </label>
//               <input
//                 className="profile__input rounded-lg h-12 border border-gray-300 w-full px-4 py-6 text-[1.4rem] text-gray-700 outline-none transition-all duration-300 focus:border-[#ec5e2a]"
//                 type="text"
//                 id="fname"
//               />
//             </div>
//             <div className="input-box flex flex-col justify-between items-start gap-2 w-full">
//               <label
//                 className="input-label text-[1.4rem] text-gray-400 cursor-pointer"
//                 htmlFor="lname"
//               >
//                 Last Name*
//               </label>
//               <input
//                 className="profile__input rounded-lg h-12 border border-gray-300 w-full px-4 py-6 text-[1.4rem] text-gray-700 outline-none transition-all duration-300 focus:border-[#ec5e2a]"
//                 type="text"
//                 id="lname"
//               />
//             </div>
//             <div className="input-box flex flex-col justify-between items-start gap-2 w-full">
//               <label
//                 className="input-label text-[1.4rem] text-gray-400 cursor-pointer"
//                 htmlFor="phone"
//               >
//                 Phone*
//               </label>
//               <input
//                 className="profile__input rounded-lg h-12 border border-gray-300 w-full px-4 py-6 text-[1.4rem] text-gray-700 outline-none transition-all duration-300 focus:border-[#ec5e2a]"
//                 type="tel"
//                 id="phone"
//               />
//             </div>
//             <div className="input-box flex flex-col justify-between items-start gap-2 w-full">
//               <label
//                 className="input-label text-[1.4rem] text-gray-400 cursor-pointer"
//                 htmlFor="email"
//               >
//                 Email*
//               </label>
//               <input
//                 className="profile__input rounded-lg h-12 border border-gray-300 w-full px-4 py-6 text-[1.4rem] text-gray-700 outline-none transition-all duration-300 focus:border-[#ec5e2a]"
//                 type="email"
//                 id="email"
//               />
//             </div>

//             <button className="btn w-40">Save changes</button>
//           </form>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import Loading from "../../loading";

export default function ProfileClient() {
  const { user, error, isLoading } = useUser();

  if (isLoading)
    return (
      <div>
        <Loading />
      </div>
    );
  if (error) return <div>{error.message}</div>;

  return (
    user && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    )
  );
}

// Server compponent
// import { getSession } from '@auth0/nextjs-auth0';

// export default async function ProfileServer() {
//   const { user } = await getSession();

//   return (
//       user && (
//           <div>
//             <img src={user.picture} alt={user.name} />
//             <h2>{user.name}</h2>
//             <p>{user.email}</p>
//           </div>
//       )
//   );
// }
