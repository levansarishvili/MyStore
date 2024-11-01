// Create Footer component
function Footer() {
  return (
    <footer className="footer dark:bg-[#313131] dark:text-white dark:shadow-td flex items-center text-gray-700 text-2xl bg-[#f1f3f5]">
      <div className="footer__wrapper max-w-[144rem] mx-auto my-0 w-full h-full flex justify-between items-center px-16 py-0">
        {/* Footer logo */}
        <img
          src="../assets/logo.svg"
          alt="Georgia national football team logo"
          className="footer__logo h-24"
        ></img>

        <p className="copyright max-w-[30rem] text-center">
          © Levan Sarishvili, Tbilisi, Georgia, 2024.
        </p>

        {/* Social icons */}
        <div className="social flex justify-end gap-4">
          <span className="footer__icon-wrapper flex justify-center items-center w-12 h-12 rounded-full cursor-pointer bg-[#ec5e2ae2] transition-all duration-300 hover:bg-[#ec5e2a] ">
            <svg
              className="social-icon w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="#fff"
            >
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
            </svg>
          </span>

          <span className="footer__icon-wrapper flex justify-center items-center w-12 h-12 rounded-full cursor-pointer bg-[#ec5e2ae2] transition-all duration-300 hover:bg-[#ec5e2a]">
            <svg
              className="social-icon w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="#fff"
              viewBox="0 0 256 256"
            >
              <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,72a24,24,0,1,1,24-24A24,24,0,0,1,128,152ZM176,20H80A60.07,60.07,0,0,0,20,80v96a60.07,60.07,0,0,0,60,60h96a60.07,60.07,0,0,0,60-60V80A60.07,60.07,0,0,0,176,20Zm36,156a36,36,0,0,1-36,36H80a36,36,0,0,1-36-36V80A36,36,0,0,1,80,44h96a36,36,0,0,1,36,36ZM196,76a16,16,0,1,1-16-16A16,16,0,0,1,196,76Z"></path>
            </svg>
          </span>
          <span className="footer__icon-wrapper flex justify-center items-center w-12 h-12 rounded-full cursor-pointer bg-[#ec5e2ae2] transition-all duration-300 hover:bg-[#ec5e2a]">
            <svg
              className="social-icon w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              fill="#fff"
            >
              <path d="M508.64 148.79c0-45-33.1-81.2-74-81.2C379.24 65 322.74 64 265 64h-18c-57.6 0-114.2 1-169.6 3.6C36.6 67.6 3.5 104 3.5 149 1 184.59-.06 220.19 0 255.79q-.15 53.4 3.4 106.9c0 45 33.1 81.5 73.9 81.5 58.2 2.7 117.9 3.9 178.6 3.8q91.2.3 178.6-3.8c40.9 0 74-36.5 74-81.5 2.4-35.7 3.5-71.3 3.4-107q.34-53.4-3.26-106.9zM207 353.89v-196.5l145 98.2z" />
            </svg>
          </span>
          <span className="footer__icon-wrapper flex justify-center items-center w-12 h-12 rounded-full cursor-pointer bg-[#ec5e2ae2] transition-all duration-300 hover:bg-[#ec5e2a]">
            <svg
              className="social-icon w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              fill="#fff"
            >
              <path d="M412.19 118.66a109.27 109.27 0 01-9.45-5.5 132.87 132.87 0 01-24.27-20.62c-18.1-20.71-24.86-41.72-27.35-56.43h.1C349.14 23.9 350 16 350.13 16h-82.44v318.78c0 4.28 0 8.51-.18 12.69 0 .52-.05 1-.08 1.56 0 .23 0 .47-.05.71v.18a70 70 0 01-35.22 55.56 68.8 68.8 0 01-34.11 9c-38.41 0-69.54-31.32-69.54-70s31.13-70 69.54-70a68.9 68.9 0 0121.41 3.39l.1-83.94a153.14 153.14 0 00-118 34.52 161.79 161.79 0 00-35.3 43.53c-3.48 6-16.61 30.11-18.2 69.24-1 22.21 5.67 45.22 8.85 54.73v.2c2 5.6 9.75 24.71 22.38 40.82A167.53 167.53 0 00115 470.66v-.2l.2.2c39.91 27.12 84.16 25.34 84.16 25.34 7.66-.31 33.32 0 62.46-13.81 32.32-15.31 50.72-38.12 50.72-38.12a158.46 158.46 0 0027.64-45.93c7.46-19.61 9.95-43.13 9.95-52.53V176.49c1 .6 14.32 9.41 14.32 9.41s19.19 12.3 49.13 20.31c21.48 5.7 50.42 6.9 50.42 6.9v-81.84c-10.14 1.1-30.73-2.1-51.81-12.61z" />
            </svg>
          </span>
        </div>
      </div>
    </footer>
  );
}

// Exporting Footer component
export default Footer;
