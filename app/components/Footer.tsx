import Link from "next/link";
import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-5 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <h2 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">
          Let's Connect!
        </h2>
        <p className="text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4 max-w-xs sm:max-w-md">
          Feel free to reach out through any of the platforms below.
        </p>

        {/* Social Icons */}
        <div className="flex space-x-4 sm:space-x-6">
          <Link
            href="https://www.linkedin.com/in/vanshikasabharwal0006/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-500 transition duration-300 text-xl sm:text-2xl"
          >
            <FaLinkedin />
          </Link>
          <Link
            href="https://x.com/Vanshika_0006"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-400 transition duration-300 text-xl sm:text-2xl"
          >
            <FaTwitter />
          </Link>
          <Link
            href="https://github.com/VanshikaSabharwal/sudoku-web-app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-300 transition duration-300 text-xl sm:text-2xl"
          >
            <FaGithub />
          </Link>
        </div>

        {/* Copyright */}
        <p className="text-[10px] sm:text-xs text-gray-500 mt-3 sm:mt-4">
          © {new Date().getFullYear()} Vanshika Sabharwal. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
