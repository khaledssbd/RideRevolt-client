import { Link } from 'react-router-dom';
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from 'react-icons/fa6';


const Footer = () => {
  return (
    <footer className="mt-30 py-5 md:py-8 px-5 md:px-20 text-black dark:text-primary border-t">
      <div className="flex flex-col md:flex-row justify-between items-center gap-5 mb-8">
        <div className="mb-12">
          <Link
            to="/"
            className="btn btn-ghost text-xl md:text-4xl flex md:block justify-center font-extrabold md:mb-4"
            data-aos="flip-up"
          >
            <button
              className="flex justify-center items-center gap-2 md:gap-3 cursor-pointer"
              data-tooltip-id="RideRevolt"
              data-tooltip-content="RideRevolt"
              data-tooltip-place="right"
            >
              <img
                className="w-16 md:w-24 rounded-lg"
                src="/RideRevolt.png"
                alt="RideRevolt"
              />

              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 text-transparent bg-clip-text">
                RideRevolt
              </span>
            </button>
          </Link>
          <p
            className="text-black: dark:text-amber-500 text-sm md:text-lg font-normal text-justify"
            data-aos="zoom-out-right"
          >
            RideRevolt – Unleash the Road, Rule the Streets! 🚴
          </p>
        </div>
        <div className="flex flex-col items-center">
          <h4 className="text-xs sm:text-base md:text-xl font-semibold mb-2 md:mb-5">
            Social Links
          </h4>
          <div className="flex gap-4 text-xl md:text-3xl mb-3">
            <a
              href="https://www.facebook.com/mdkhaledsshuvo"
              className="text-[#1877F2] cursor-pointer"
            >
              <FaFacebook />
            </a>
            <a
              href="https://twitter.com/mdkhaledsshuvo"
              className="text-[#1DA1F2] cursor-pointer"
            >
              <FaTwitter />
            </a>
            <a
              href="https://www.instagram.com/mdkhaledsshuvo"
              className="text-[#E1306C] cursor-pointer"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.linkedin.com/in/mdkhaledsshuvo"
              className="text-[#0077B5] cursor-pointer"
            >
              <FaLinkedin />
            </a>
          </div>
          <h4 className="text-xs sm:text-sm">Address:-</h4>
          <h4 className="text-xs sm:text-sm">
            RideRevolt, Academy Road, Feni Sadar, Feni.
          </h4>
          <h4 className="text-xs sm:text-sm">Email: khaledssbd@gmail.com</h4>
        </div>
      </div>
      <hr />
      <div className="mt-8 flex justify-between items-center">
        <div>
          <h5 className="hidden sm:flex font-normal">
            Copyright ©{new Date().getFullYear()} - All right reserved by
            💕Khaled
          </h5>
        </div>
        <div className="flex gap-8">
          <div>
            <h5 className="text-sm md:text-base font-medium">
              Terms & condition
            </h5>
          </div>
          <div>
            <h5 className="text-sm md:text-base font-medium">
              Return & refund policy
            </h5>
          </div>
          <div>
            <h5 className="text-sm md:text-base font-medium">Privacy policy</h5>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-5">
        <h5 className="text-[#FFFFFFB2] flex sm:hidden font-normal text-sm md:text-sm">
          Copyright ©{new Date().getFullYear()} - All right reserved by 💕Khaled
        </h5>
      </div>
    </footer>
  );
};

export default Footer;
