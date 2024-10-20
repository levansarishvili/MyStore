"use client";
import "./Profile.css";
import Button from "../../components/Button";
import { useEffect, useState } from "react";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("https://dummyjson.com/users/1")
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  if (!user) return <p>Loading...</p>;
  return (
    <section className="profile-wrapper">
      <h1 className="section-header"> My Account</h1>
      <div className="profile-content">
        <div className="profile-media-wrapper">
          <div className="profile__img-wrapper">
            <div className="profile__img-box">
              <img
                className="profile__img"
                src="../../assets/person.svg"
                alt="User"
              />
            </div>
            <div className="profile__img-edit">
              {user.image}
              <p>Edit</p>
            </div>
          </div>

          <div className="profile-txt-wrapper">
            <p className="profile-txt">
              Name: {user.firstName} {user.lastName}
            </p>

            <p className="profile-txt">Phone: {user.phone}</p>
            <p className="profile-txt">Email: {user.email}</p>
          </div>
        </div>

        {/* User Info */}
        <div className="profile__info">
          <h2 className="profile-info-header">Account Details</h2>
          <form action="" className="profile__form">
            <div className="input-box">
              <label className="input-label" htmlFor="fname">
                First Name*
              </label>
              <input className="profile__input" type="text" id="fname" />
            </div>
            <div className="input-box">
              <label className="input-label" htmlFor="lname">
                Last Name*
              </label>
              <input className="profile__input" type="text" id="lname" />
            </div>
            <div className="input-box">
              <label className="input-label" htmlFor="age">
                Age*
              </label>
              <input className="profile__input" type="number" id="age" />
            </div>
            <div className="input-box">
              <label className="input-label" htmlFor="phone">
                Phone*
              </label>
              <input className="profile__input" type="tel" id="phone" />
            </div>
            <div className="input-box">
              <label className="input-label" htmlFor="email">
                Email*
              </label>
              <input className="profile__input" type="email" id="email" />
            </div>
          </form>

          <Button className="btn" name="Save Changes" />
        </div>
      </div>
    </section>
  );
}

export default Profile;
