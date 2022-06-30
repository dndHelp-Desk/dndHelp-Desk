import { FC } from "react";

const Footer: FC = () => {
  //Component =============================
  return (
    <>
      <footer className="bg-gradient-to-b from-slate-300 via-slate-700 to-slate-900">
        <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
          <div className="lg:flex lg:gap-8">
            <div className="grid grid-cols-2 gap-8 mt-8 lg:mt-0 lg:grid-cols-5 lg:gap-y-16">
              <div className="col-span-2">
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    Get the latest news!
                  </h2>

                  <p className="mt-6 text-gray-200">
                    A business absolutely devoted to Customer Service Excellence
                    will have only one worry about profits. The purpose of
                    business is to create and keep a customer.
                  </p>
                </div>
              </div>

              <div className="col-span-2 lg:col-span-3 lg:flex lg:items-end">
                <form className="w-full text-white">
                  <label htmlFor="email" className="sr-only">
                    {" "}
                    Email{" "}
                  </label>

                  <div className="p-2 border sm:flex sm:items-center border-slate-300">
                    <input
                      className="w-full h-12 p-3 text-sm font-medium tracking-widest placeholder-gray-300 uppercase bg-transparent border-none"
                      type="email"
                      id="email"
                      placeholder="Enter your email"
                    />

                    <button
                      className="w-full h-12 px-6 py-3 mt-1 text-sm font-bold tracking-wide uppercase bg-blue-600 sm:ml-4 sm:flex-shrink-0 sm:w-auto sm:mt-0"
                      type="submit"
                    >
                      Sign Up
                    </button>
                  </div>
                </form>
              </div>

              <div className="col-span-2 pt-6 border-t sm:col-span-1 border-white/10">
                <p className="font-bold text-white"> Services </p>

                <nav className="flex flex-col mt-6 space-y-4 text-sm text-gray-300">
                  <a
                    className="inline-block"
                    href="https://www.dndhelp-desk.co.za/"
                    rel="noreferrer"
                  >
                    {" "}
                    1on1 Coaching{" "}
                  </a>
                  <a
                    className="inline-block"
                    href="https://www.dndhelp-desk.co.za/"
                    rel="noreferrer"
                  >
                    {" "}
                    Company Review{" "}
                  </a>
                  <a
                    className="inline-block"
                    href="https://www.dndhelp-desk.co.za/"
                    rel="noreferrer"
                  >
                    {" "}
                    Accounts Review{" "}
                  </a>
                  <a
                    className="inline-block"
                    href="https://www.dndhelp-desk.co.za/"
                    rel="noreferrer"
                  >
                    {" "}
                    HR Consulting{" "}
                  </a>
                  <a
                    className="inline-block"
                    href="https://www.dndhelp-desk.co.za/"
                    rel="noreferrer"
                  >
                    {" "}
                    SEO Optimisation{" "}
                  </a>
                </nav>
              </div>

              <div className="col-span-2 pt-6 border-t sm:col-span-1 border-white/10">
                <p className="font-bold text-white"> Company </p>

                <nav className="flex flex-col mt-6 space-y-4 text-sm text-gray-300">
                  <a
                    className="inline-block"
                    href="https://www.dndhelp-desk.co.za/"
                    rel="noreferrer"
                  >
                    {" "}
                    About{" "}
                  </a>
                  <a
                    className="inline-block"
                    href="https://www.dndhelp-desk.co.za/"
                    rel="noreferrer"
                  >
                    {" "}
                    Meet the Team{" "}
                  </a>
                  <a
                    className="inline-block"
                    href="https://www.dndhelp-desk.co.za/"
                    rel="noreferrer"
                  >
                    {" "}
                    History{" "}
                  </a>
                  <a
                    className="inline-block"
                    href="https://www.dndhelp-desk.co.za/"
                    rel="noreferrer"
                  >
                    {" "}
                    Careers{" "}
                  </a>
                </nav>
              </div>

              <div className="col-span-2 pt-6 border-t sm:col-span-1 border-white/10">
                <p className="font-bold text-white"> Helpful Links </p>

                <nav className="flex flex-col mt-6 space-y-4 text-sm text-gray-300">
                  <a
                    className="inline-block"
                    href="https://www.dndhelp-desk.co.za/"
                    rel="noreferrer"
                  >
                    {" "}
                    Contact{" "}
                  </a>
                  <a
                    className="inline-block"
                    href="https://www.dndhelp-desk.co.za/"
                    rel="noreferrer"
                  >
                    {" "}
                    FAQs{" "}
                  </a>
                  <a
                    className="inline-block"
                    href="https://www.dndhelp-desk.co.za/"
                    rel="noreferrer"
                  >
                    {" "}
                    Live Chat{" "}
                  </a>
                </nav>
              </div>

              <div className="col-span-2 pt-6 border-t sm:col-span-1 border-white/10">
                <p className="font-bold text-white"> Legal </p>

                <nav className="flex flex-col mt-6 space-y-4 text-sm text-gray-300">
                  <a
                    className="inline-block"
                    href="https://www.dndhelp-desk.co.za/"
                    rel="noreferrer"
                  >
                    {" "}
                    Accessibility{" "}
                  </a>
                  <a
                    className="inline-block"
                    href="https://www.dndhelp-desk.co.za/"
                    rel="noreferrer"
                  >
                    {" "}
                    Returns Policy{" "}
                  </a>
                  <a
                    className="inline-block"
                    href="https://www.dndhelp-desk.co.za/"
                    rel="noreferrer"
                  >
                    {" "}
                    Refund Policy{" "}
                  </a>
                  <a
                    className="inline-block"
                    href="https://www.dndhelp-desk.co.za/"
                    rel="noreferrer"
                  >
                    {" "}
                    Hiring Statistics{" "}
                  </a>
                </nav>
              </div>

              <div className="col-span-2 pt-6 border-t sm:col-span-1 border-white/10">
                <p className="font-bold text-white"> Downloads </p>

                <nav className="flex flex-col mt-6 space-y-4 text-sm text-gray-300">
                  <a
                    className="inline-block"
                    href="https://www.dndhelp-desk.co.za/"
                    rel="noreferrer"
                  >
                    {" "}
                    Marketing Calendar{" "}
                  </a>
                  <a
                    className="inline-block"
                    href="https://www.dndhelp-desk.co.za/"
                    rel="noreferrer"
                  >
                    {" "}
                    SEO Infographics{" "}
                  </a>
                </nav>
              </div>

              <div className="flex col-span-2 space-x-4 text-gray-500 lg:col-span-5">
                <a
                  className="hover:opacity-75"
                  href="https://www.instagram.com/dndhelpdesk/"
                  rel="noreferrer"
                  target="_blank"
                >
                  <span className="sr-only"> Instagram </span>

                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>

                <a
                  className="hover:opacity-75"
                  href="https://twitter.com/dndhelp_desk"
                  rel="noreferrer"
                  target="_blank"
                >
                  <span className="sr-only"> Twitter </span>

                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>

                <a
                  className="hover:opacity-75"
                  href="https://github.com/dndHelp-Desk"
                  rel="noreferrer"
                  target="_blank"
                >
                  <span className="sr-only"> GitHub </span>

                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>

                <a
                  className="hover:opacity-75"
                  href="https://www.linkedin.com/company/dndhelp-desk/"
                  rel="noreferrer"
                  target="_blank"
                >
                  <span className="sr-only"> Linkedin </span>

                  <svg
                    className="w-7 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="#666f7d"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <rect x="4" y="4" width="16" height="16" rx="2" />
                    <line x1="8" y1="11" x2="8" y2="16" />
                    <line x1="8" y1="8" x2="8" y2="8.01" />
                    <line x1="12" y1="16" x2="12" y2="11" />
                    <path d="M16 16v-3a2 2 0 0 0 -4 0" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 mt-12 border-t border-white/10">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <p className="text-xs text-center text-gray-400 lg:text-left">
                Copyright &copy; {new Date().getFullYear()}. dndHelp-Desk. All
                rights reserved.
              </p>

              <nav className="flex justify-center space-x-4 text-xs text-gray-400 lg:justify-end">
                <a href="https://www.dndhelp-desk.co.za/" rel="noreferrer">
                  {" "}
                  Terms & Conditions{" "}
                </a>
                <a href="https://www.dndhelp-desk.co.za/" rel="noreferrer">
                  {" "}
                  Privacy Policy{" "}
                </a>
                <a href="https://www.dndhelp-desk.co.za/" rel="noreferrer">
                  {" "}
                  Cookies{" "}
                </a>
              </nav>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
