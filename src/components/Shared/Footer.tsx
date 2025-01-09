import MaxWidthWrapper from "./MaxWidthWrapper";

const Footer = () => {
  return (
    <footer className="bg-gray-800 mx-auto max-w-screen-xl md:px-10 py-5 md:py-10 text-white">
      <MaxWidthWrapper>
        <div className="container mx-auto text-center">
          <p className="text-sm">
            &copy; 2025 All rights reserved. |{" "}
            <a href="/terms" className="text-blue-400 hover:underline">
              Terms
            </a>{" "}
            |{" "}
            <a href="/privacy" className="text-blue-400 hover:underline">
              Privacy Policy
            </a>{" "}
            |{" "}
            <a href="/cookies" className="text-blue-400 hover:underline">
              Cookies Policy
            </a>
          </p>
          <p className="text-sm mt-2">
            Designed by{" "}
            <a
              href="https://example.com"
              className="text-blue-400 hover:underline"
            >
              You
            </a>
          </p>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
};

export default Footer;
