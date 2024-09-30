import "./Contact.css";
import "./CustomScrollbar.css";

function Contact() {
  return (
    <main className="main">
      <section className="contact-wrapper">
        {/* Contact Form */}
        <div className="contact-form-wrapper">
          <h2 className="contact-form__title">მოგვწერე</h2>
          <form action="" className="contact-form">
            <input
              type="text"
              name=""
              id=""
              className="contact-input"
              placeholder="სახელი"
            />
            <input
              type="text"
              name=""
              id=""
              className="contact-input"
              placeholder="ელ.ფოსტა"
            />
            <input
              type="text"
              name=""
              id=""
              className="contact-input"
              placeholder="ტელეფონი"
            />
            <textarea
              type=""
              name=""
              id=""
              className="contact-input text-input"
              placeholder="ჩაწერე ტექსტი"
            />
            <button className="btn contact-btn">გაგზავნა</button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="contact-info">
          <h2 className="contact-info__title">საკონტაქტო ინფორმაცია</h2>

          <ul className="contact__list">
            <li className="contact__list__item">
              <svg
                className="contact-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="#000"
                viewBox="0 0 256 256"
              >
                <path d="M128,24h0A104,104,0,1,0,232,128,104.12,104.12,0,0,0,128,24Zm88,104a87.61,87.61,0,0,1-3.33,24H174.16a157.44,157.44,0,0,0,0-48h38.51A87.61,87.61,0,0,1,216,128ZM102,168H154a115.11,115.11,0,0,1-26,45A115.27,115.27,0,0,1,102,168Zm-3.9-16a140.84,140.84,0,0,1,0-48h59.88a140.84,140.84,0,0,1,0,48ZM40,128a87.61,87.61,0,0,1,3.33-24H81.84a157.44,157.44,0,0,0,0,48H43.33A87.61,87.61,0,0,1,40,128ZM154,88H102a115.11,115.11,0,0,1,26-45A115.27,115.27,0,0,1,154,88Zm52.33,0H170.71a135.28,135.28,0,0,0-22.3-45.6A88.29,88.29,0,0,1,206.37,88ZM107.59,42.4A135.28,135.28,0,0,0,85.29,88H49.63A88.29,88.29,0,0,1,107.59,42.4ZM49.63,168H85.29a135.28,135.28,0,0,0,22.3,45.6A88.29,88.29,0,0,1,49.63,168Zm98.78,45.6a135.28,135.28,0,0,0,22.3-45.6h35.66A88.29,88.29,0,0,1,148.41,213.6Z"></path>
              </svg>
              <p>ქ. თბილისი, 0179, ჭავჭავაძის გამზ. 76ა</p>
            </li>
            <li className="contact__list__item">
              <svg
                className="contact-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="#000"
                viewBox="0 0 256 256"
              >
                <path d="M222.37,158.46l-47.11-21.11-.13-.06a16,16,0,0,0-15.17,1.4,8.12,8.12,0,0,0-.75.56L134.87,160c-15.42-7.49-31.34-23.29-38.83-38.51l20.78-24.71c.2-.25.39-.5.57-.77a16,16,0,0,0,1.32-15.06l0-.12L97.54,33.64a16,16,0,0,0-16.62-9.52A56.26,56.26,0,0,0,32,80c0,79.4,64.6,144,144,144a56.26,56.26,0,0,0,55.88-48.92A16,16,0,0,0,222.37,158.46ZM176,208A128.14,128.14,0,0,1,48,80,40.2,40.2,0,0,1,82.87,40a.61.61,0,0,0,0,.12l21,47L83.2,111.86a6.13,6.13,0,0,0-.57.77,16,16,0,0,0-1,15.7c9.06,18.53,27.73,37.06,46.46,46.11a16,16,0,0,0,15.75-1.14,8.44,8.44,0,0,0,.74-.56L168.89,152l47,21.05h0s.08,0,.11,0A40.21,40.21,0,0,1,176,208Z"></path>
              </svg>
              <p>032 291 26 70</p>
            </li>
            <li className="contact__list__item">
              <svg
                className="contact-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="#000"
                viewBox="0 0 256 256"
              >
                <path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48Zm-96,85.15L52.57,64H203.43ZM98.71,128,40,181.81V74.19Zm11.84,10.85,12,11.05a8,8,0,0,0,10.82,0l12-11.05,58,53.15H52.57ZM157.29,128,216,74.18V181.82Z"></path>
              </svg>
              <p>geo.refereeing@gff.ge</p>
            </li>
          </ul>
        </div>

        <div></div>
      </section>
    </main>
  );
}

export default Contact;
