import "./Profile.css";
import Button from "../components/Button";

function Profile() {
  return (
    <section className="profile-wrapper">
      <h1 className="section-header"> My Account</h1>
      <div className="profile-content">
        {/* User Media */}
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
              <svg
                className="edit-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="#000000"
                viewBox="0 0 256 256"
              >
                <path d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.68,147.31,64l24-24L216,84.68Z"></path>
              </svg>
              <p>Edit</p>
            </div>
          </div>

          <div className="profile-txt-wrapper">
            <p className="profile-txt">Levan Sarishvili</p>

            <p className="profile-txt">+995 558777777</p>
            <p className="profile-txt">levanisarishvili01@gmail.com</p>
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
