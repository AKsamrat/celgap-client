import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

export default function TopMenuBar() {
  return (
    <div className="bg-blue-100 text-[#0347A7] font-normal  ">
      <div className="hidden lg:flex w-full px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-center w-full h-12">
          {/* Social Media Icons - Left Side */}
          <div className="flex items-center space-x-4 *:text-[#0347A7]">
            <a
              href="https://www.facebook.com/share/p/1Ck288byeK"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-300 transition-colors duration-200"
              aria-label="Facebook"
            >
              <Facebook className="h-[22px] w-[22px]" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-300 transition-colors duration-200"
              aria-label="YouTube"
            >
              <Youtube className="h-[22px] w-[22px]" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-300 transition-colors duration-200"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-[22px] w-[22px]" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-300 transition-colors duration-200"
              aria-label="Instagram"
            >
              <Instagram className="h-[22px] w-[22px]" />
            </a>
          </div>

          {/* Right Side Menu Items */}
          <div className="flex items-center">
            <a
              href="/help"
              className="text-sm hover:text-blue-300 transition-colors duration-200 font-semibold"
            >
              Get Help
            </a>
            <p className="px-3 text-gray-400">|</p>
            <a
              href="/profile"
              className="text-sm hover:text-blue-300 transition-colors duration-200"
            >
              centerforlaw@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Version */}
      <div className="lg:hidden px-4 py-3">
        <div className="flex justify-center space-x-4 mb-3">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-300 transition-colors duration-200"
            aria-label="Facebook"
          >
            <Facebook className="h-6 w-6" />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red-300 transition-colors duration-200"
            aria-label="YouTube"
          >
            <Youtube className="h-6 w-6" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-300 transition-colors duration-200"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-6 w-6" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-300 transition-colors duration-200"
            aria-label="Instagram"
          >
            <Instagram className="h-6 w-6" />
          </a>
        </div>
        <div className="flex justify-center text-sm">
          <a
            href="/help"
            className="hover:text-blue-300 transition-colors duration-200 font-semibold"
          >
            Get Help
          </a>
          <p className="px-3 text-gray-400">|</p>
          <a
            href="/profile"
            className="hover:text-blue-300 transition-colors duration-200"
          >
            centerforlaw@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
}
