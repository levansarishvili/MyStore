"use client";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function fetchUserProfile() {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        setErrorMessage("Access token not found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("https://dummyjson.com/auth/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          credentials: "include",
        });

        const data = await response.json();
        if (response.ok) {
          setUser(data);
        } else {
          throw new Error(data.message || "Failed to fetch user profile.");
        }
      } catch (error) {
        console.error("Fetching user profile failed:", error);
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUserProfile();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (errorMessage) return <p>Error: {errorMessage}</p>;
  if (!user) return <p>No profile data available.</p>;

  return (
    <div>Profile</div>
    // <section className="profile-wrapper">
    //   <h1 className="section-header">My Account</h1>
    //   <div className="profile-content">
    //     <div className="profile-media-wrapper">
    //       <div className="profile__img-wrapper">
    //         <div className="profile__img-box">
    //           {/* <img
    //             className="profile__img"
    //             src={user.image || "../../assets/person.svg"}
    //             alt={user.firstName || "User"}
    //           /> */}
    //         </div>
    //         <div className="profile__img-edit">
    //           <button>Edit</button>
    //         </div>
    //       </div>

    //       <div className="profile-txt-wrapper">
    //         <p className="profile-txt">
    //           Name: {user.firstName} {user.lastName}
    //         </p>
    //         <p className="profile-txt">Phone: {user.phone || "N/A"}</p>
    //         <p className="profile-txt">Email: {user.email}</p>
    //       </div>
    //     </div>

    //     <div className="profile__info">
    //       <h2 className="profile-info-header">Account Details</h2>
    //       <form className="profile__form">
    //         {/* Each field is ReadOnly; enable editing if needed */}
    //         <div className="input-box">
    //           <label className="input-label" htmlFor="fname">
    //             First Name*
    //           </label>
    //           <input
    //             className="profile__input"
    //             type="text"
    //             id="fname"
    //             value={user.firstName}
    //             readOnly
    //           />
    //         </div>
    //         <div className="input-box">
    //           <label className="input-label" htmlFor="lname">
    //             Last Name*
    //           </label>
    //           <input
    //             className="profile__input"
    //             type="text"
    //             id="lname"
    //             value={user.lastName}
    //             readOnly
    //           />
    //         </div>
    //         <div className="input-box">
    //           <label className="input-label" htmlFor="phone">
    //             Phone*
    //           </label>
    //           <input
    //             className="profile__input"
    //             type="tel"
    //             id="phone"
    //             value={user.phone || ""}
    //             readOnly
    //           />
    //         </div>
    //         <div className="input-box">
    //           <label className="input-label" htmlFor="email">
    //             Email*
    //           </label>
    //           <input
    //             className="profile__input"
    //             type="email"
    //             id="email"
    //             value={user.email}
    //             readOnly
    //           />
    //         </div>
    //       </form>
    //       <button className="btn">Save Changes</button>
    //     </div>
    //   </div>
    // </section>
  );
}
