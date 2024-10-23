"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "../../loading";
import "./Profile.css";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    async function fetchUser() {
      try {
        const res = await fetch("https://dummyjson.com/user/me", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          console.error("Failed to fetch profile data");
          return;
        }

        const data = await res.json();

        // Update the user state
        setUser(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchUser();
  }, [router]);

  // Render loading state if user is null
  if (!user) {
    return <Loading />;
  }

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
