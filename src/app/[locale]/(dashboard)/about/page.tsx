function About() {
  return (
    <section className="about-wrapper flex flex-col items-center justify-center gap-4 text-4xl text-center max-w-[80rem]">
      <div className="project-overview flex flex-col gap-40">
        <div className="overview-block flex flex-col gap-20">
          <h1 className="section-header text-4xl font-semibold">
            Project Overview
          </h1>
          <p className="overview-txt text-[1.6rem]">
            Welcome to
            <strong className="highlight-txt text-[#ec5e2a] font-bold">
              E-Shop
            </strong>
            , your go-to destination for all things sports! Whether you're a
            seasoned athlete or just starting your fitness journey, we've got
            the gear you need to stay at the top of your game. Our passion for
            sports drives us to provide the best products from leading brands,
            ensuring you always have access to the
            <span className="highlight-txt text-[#ec5e2a] font-medium">
              &nbsp;highest quality equipment and apparel.
            </span>
          </p>
        </div>

        <div className="overview-block flex flex-col gap-16">
          <h2 className="overview-subheader text-3xl font-semibold">
            Website Pages
          </h2>
          <ul className="tech-list list-none text-3xl grid grid-cols-3 gap-x-8 gap-y-10 content-center justify-items-center">
            <li className="tech-list__item border rounded-xl w-80 p-4 cursor-pointer transition-all duration-300 hover:text-white hover:bg-[#ec5e2a]">
              Home
            </li>
            <li className="tech-list__item border rounded-xl w-80 p-4 cursor-pointer transition-all duration-300 hover:text-white hover:bg-[#ec5e2a]">
              About
            </li>
            <li className="tech-list__item border rounded-xl w-80 p-4 cursor-pointer transition-all duration-300 hover:text-white hover:bg-[#ec5e2a]">
              Products
            </li>
            <li className="tech-list__item border rounded-xl w-80 p-4 cursor-pointer transition-all duration-300 hover:text-white hover:bg-[#ec5e2a]">
              Blogs
            </li>
            <li className="tech-list__item border rounded-xl w-80 p-4 cursor-pointer transition-all duration-300 hover:text-white hover:bg-[#ec5e2a]">
              Contact
            </li>
            <li className="tech-list__item border rounded-xl w-80 p-4 cursor-pointer transition-all duration-300 hover:text-white hover:bg-[#ec5e2a]">
              Buy Now
            </li>
          </ul>
        </div>

        <div className="overview-block flex flex-col gap-16">
          <h2 className="overview-subheader text-3xl font-semibold">
            Used Technologies
          </h2>
          <ul className="tech-list list-none text-3xl grid grid-cols-3 gap-x-8 gap-y-10 content-center justify-items-center">
            <li className="tech-list__item border rounded-xl w-80 p-4 cursor-pointer transition-all duration-300 hover:text-white hover:bg-[#ec5e2a]">
              HTML
            </li>
            <li className="tech-list__item border rounded-xl w-80 p-4 cursor-pointer transition-all duration-300 hover:text-white hover:bg-[#ec5e2a]">
              CSS
            </li>
            <li className="tech-list__item border rounded-xl w-80 p-4 cursor-pointer transition-all duration-300 hover:text-white hover:bg-[#ec5e2a]">
              Javascript
            </li>
            <li className="tech-list__item border rounded-xl w-80 p-4 cursor-pointer transition-all duration-300 hover:text-white hover:bg-[#ec5e2a]">
              React.js
            </li>
            <li className="tech-list__item border rounded-xl w-80 p-4 cursor-pointer transition-all duration-300 hover:text-white hover:bg-[#ec5e2a]">
              React Router
            </li>
            <li className="tech-list__item border rounded-xl w-80 p-4 cursor-pointer transition-all duration-300 hover:text-white hover:bg-[#ec5e2a]">
              Next.js
            </li>
            <li className="tech-list__item border rounded-xl w-80 p-4 cursor-pointer transition-all duration-300 hover:text-white hover:bg-[#ec5e2a]">
              NPM
            </li>
            <li className="tech-list__item border rounded-xl w-80 p-4 cursor-pointer transition-all duration-300 hover:text-white hover:bg-[#ec5e2a]">
              Git/Github
            </li>
            <li className="tech-list__item border rounded-xl w-80 p-4 cursor-pointer transition-all duration-300 hover:text-white hover:bg-[#ec5e2a]">
              Netlify
            </li>
          </ul>
        </div>

        <div className="overview-block flex flex-col gap-16">
          <h2 className="overview-subheader text-3xl font-semibold">
            Author - Levan Sarishvili
          </h2>
          <ul className="author-list list-none flex justify-center gap-20">
            <li className="author-list__item flex items-center gap-4">
              <a
                rel="noreferrer"
                target="_blank"
                className="author-link flex items-center gap-8 text-3xl transition-all duration-300 hover:text-[#ec5e2a] group"
                href="https://www.linkedin.com/in/levan-s-b87245b1/"
              >
                <svg
                  className="author__icon h-12 group-hover:fill-[#ec5e2a] transition-all duration-300 dark:fill-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M444.17 32H70.28C49.85 32 32 46.7 32 66.89v374.72C32 461.91 49.85 480 70.28 480h373.78c20.54 0 35.94-18.21 35.94-38.39V66.89C480.12 46.7 464.6 32 444.17 32zm-273.3 373.43h-64.18V205.88h64.18zM141 175.54h-.46c-20.54 0-33.84-15.29-33.84-34.43 0-19.49 13.65-34.42 34.65-34.42s33.85 14.82 34.31 34.42c-.01 19.14-13.31 34.43-34.66 34.43zm264.43 229.89h-64.18V296.32c0-26.14-9.34-44-32.56-44-17.74 0-28.24 12-32.91 23.69-1.75 4.2-2.22 9.92-2.22 15.76v113.66h-64.18V205.88h64.18v27.77c9.34-13.3 23.93-32.44 57.88-32.44 42.13 0 74 27.77 74 87.64z" />
                </svg>{" "}
                Linkedin ➡
              </a>
            </li>
            <li className="author-list__item flex items-center gap-4">
              <a
                rel="noreferrer"
                target="_blank"
                className="author-link flex items-center gap-8 text-3xl transition-all duration-300 hover:text-[#ec5e2a] group"
                href="https://github.com/levansarishvili"
              >
                <svg
                  className="author__icon h-12 group-hover:fill-[#ec5e2a] transition-all duration-300 dark:fill-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M256 32C132.3 32 32 134.9 32 261.7c0 101.5 64.2 187.5 153.2 217.9a17.56 17.56 0 003.8.4c8.3 0 11.5-6.1 11.5-11.4 0-5.5-.2-19.9-.3-39.1a102.4 102.4 0 01-22.6 2.7c-43.1 0-52.9-33.5-52.9-33.5-10.2-26.5-24.9-33.6-24.9-33.6-19.5-13.7-.1-14.1 1.4-14.1h.1c22.5 2 34.3 23.8 34.3 23.8 11.2 19.6 26.2 25.1 39.6 25.1a63 63 0 0025.6-6c2-14.8 7.8-24.9 14.2-30.7-49.7-5.8-102-25.5-102-113.5 0-25.1 8.7-45.6 23-61.6-2.3-5.8-10-29.2 2.2-60.8a18.64 18.64 0 015-.5c8.1 0 26.4 3.1 56.6 24.1a208.21 208.21 0 01112.2 0c30.2-21 48.5-24.1 56.6-24.1a18.64 18.64 0 015 .5c12.2 31.6 4.5 55 2.2 60.8 14.3 16.1 23 36.6 23 61.6 0 88.2-52.4 107.6-102.3 113.3 8 7.1 15.2 21.1 15.2 42.5 0 30.7-.3 55.5-.3 63 0 5.4 3.1 11.5 11.4 11.5a19.35 19.35 0 004-.4C415.9 449.2 480 363.1 480 261.7 480 134.9 379.7 32 256 32z" />
                </svg>
                Github ➡
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default About;
