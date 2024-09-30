import "./About.css";
import "./CustomScrollbar.css";

function About() {
  return (
    <main className="main">
      <section className="about-wrapper">
        <div className="project-overview">
          <div className="overview-block">
            <h1 className="overview-header">პროექტის მიმოხილვა</h1>
            <p className="overview-txt">
              საიტზე შეგხვდებათ საქართველოს ფეხბურთის ეროვნული ნაკრების ირგვლივ
              მიმდინარე მოვლენები, სიახლეები, შემადგენლობა და ასევე ოფიციალური
              ონლაინ მაღაზია.{" "}
              <span className="highlight-txt">
                პროექტის მიზანია ქართული ფეხბურთის პოპულარიზაცია და ჯანსაღი
                ცხოვრების წესის წახალისება.
              </span>
            </p>
          </div>

          <div className="overview-block">
            <h2 className="overview-subheader">საიტის გვერდები</h2>
            <ul className="tech-list">
              <li className="tech-list__item">მთავარი</li>
              <li className="tech-list__item">ჩვენს შესახებ</li>
              <li className="tech-list__item">შემადგენლობა</li>
              <li className="tech-list__item">სიახლეები</li>
              <li className="tech-list__item"> მაღაზია</li>
              <li className="tech-list__item">კონტაქტი</li>
            </ul>
          </div>

          <div className="overview-block">
            <h2 className="overview-subheader">გამოყენებული ტექნოლოგიები</h2>
            <ul className="tech-list">
              <li className="tech-list__item">HTML</li>
              <li className="tech-list__item">CSS</li>
              <li className="tech-list__item">Javascript</li>
              <li className="tech-list__item">React.js</li>
              <li className="tech-list__item">React Router</li>
              <li className="tech-list__item">Figma</li>
              <li className="tech-list__item">NPM</li>
              <li className="tech-list__item">Git/Github</li>
              <li className="tech-list__item">Netlify</li>
            </ul>
          </div>

          <div className="overview-block">
            <h2 className="overview-subheader">ავტორი - ლევან სარიშვილი</h2>
            <ul className="author-list">
              <li className="author-list__item">
                <svg
                  className="contact-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="#ffffff"
                  viewBox="0 0 256 256"
                >
                  <path d="M216,24H40A16,16,0,0,0,24,40V216a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V40A16,16,0,0,0,216,24Zm0,192H40V40H216V216ZM96,112v64a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0Zm88,28v36a8,8,0,0,1-16,0V140a20,20,0,0,0-40,0v36a8,8,0,0,1-16,0V112a8,8,0,0,1,15.79-1.78A36,36,0,0,1,184,140ZM100,84A12,12,0,1,1,88,72,12,12,0,0,1,100,84Z"></path>
                </svg>
                <a
                  rel="noreferrer"
                  target="_blank"
                  className="author-link"
                  href="https://www.linkedin.com/in/levan-s-b87245b1/"
                >
                  Linkedin ➡
                </a>
              </li>
              <li className="author-list__item">
                <svg
                  className="contact-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="#ffffff"
                  viewBox="0 0 256 256"
                >
                  <path d="M208.31,75.68A59.78,59.78,0,0,0,202.93,28,8,8,0,0,0,196,24a59.75,59.75,0,0,0-48,24H124A59.75,59.75,0,0,0,76,24a8,8,0,0,0-6.93,4,59.78,59.78,0,0,0-5.38,47.68A58.14,58.14,0,0,0,56,104v8a56.06,56.06,0,0,0,48.44,55.47A39.8,39.8,0,0,0,96,192v8H72a24,24,0,0,1-24-24A40,40,0,0,0,8,136a8,8,0,0,0,0,16,24,24,0,0,1,24,24,40,40,0,0,0,40,40H96v16a8,8,0,0,0,16,0V192a24,24,0,0,1,48,0v40a8,8,0,0,0,16,0V192a39.8,39.8,0,0,0-8.44-24.53A56.06,56.06,0,0,0,216,112v-8A58.14,58.14,0,0,0,208.31,75.68ZM200,112a40,40,0,0,1-40,40H112a40,40,0,0,1-40-40v-8a41.74,41.74,0,0,1,6.9-22.48A8,8,0,0,0,80,73.83a43.81,43.81,0,0,1,.79-33.58,43.88,43.88,0,0,1,32.32,20.06A8,8,0,0,0,119.82,64h32.35a8,8,0,0,0,6.74-3.69,43.87,43.87,0,0,1,32.32-20.06A43.81,43.81,0,0,1,192,73.83a8.09,8.09,0,0,0,1,7.65A41.72,41.72,0,0,1,200,104Z"></path>
                </svg>
                <a
                  rel="noreferrer"
                  target="_blank"
                  className="author-link"
                  href="https://github.com/levansarishvili"
                >
                  Github ➡
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}

export default About;
