import React from "react";
import { cookies } from "next/headers";
import { useRouter } from "next/navigation";

export default async function ProfilePage() {
  const router = useRouter();
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const res = await fetch("https://dummyjson.com/auth/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok || !accessToken) {
    router.push("/login");
  }

  const user = await res.json();

  return (
    <section className="profile-wrapper">
      <h1 className="section-header">My Account</h1>
      <div className="profile-content">
        <div className="profile-media-wrapper">
          <div className="profile__img-wrapper">
            <div className="profile__img-box">
              <img
                className="profile__img"
                src={user.image || "../../assets/person.svg"}
                alt={user.firstName || "User"}
              />
            </div>
          </div>

          <div className="profile-txt-wrapper">
            <p className="profile-txt">
              Name: {user.firstName} {user.lastName}
            </p>
            <p className="profile-txt">Phone: {user.phone || "N/A"}</p>
            <p className="profile-txt">Email: {user.email}</p>
            <p className="profile-txt">
              Address:
              <span>{user.address.address}</span>
              <span>{user.address.city}</span>
              <span>{user.address.country}</span>
            </p>
            <p className="profile-txt">Profession: {user.company.title}</p>
          </div>
        </div>

        <div className="profile__info">
          <h2 className="profile-info-header">Account Details</h2>
          <form className="profile__form">
            <div className="input-box">
              <label className="input-label" htmlFor="fname">
                First Name*
              </label>
              <input
                className="profile__input"
                type="text"
                id="fname"
                value={user.firstName}
                readOnly
              />
            </div>
            <div className="input-box">
              <label className="input-label" htmlFor="lname">
                Last Name*
              </label>
              <input
                className="profile__input"
                type="text"
                id="lname"
                value={user.lastName}
                readOnly
              />
            </div>
            <div className="input-box">
              <label className="input-label" htmlFor="phone">
                Phone*
              </label>
              <input
                className="profile__input"
                type="tel"
                id="phone"
                value={user.phone || ""}
                readOnly
              />
            </div>
            <div className="input-box">
              <label className="input-label" htmlFor="email">
                Email*
              </label>
              <input
                className="profile__input"
                type="email"
                id="email"
                value={user.email}
                readOnly
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
