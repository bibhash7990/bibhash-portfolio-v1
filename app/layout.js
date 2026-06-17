import { GoogleTagManager } from "@next/third-parties/google";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/footer";
import CursorGlow from "./components/helper/cursor-glow";
import ScrollProgress from "./components/helper/scroll-progress";
import ScrollToTop from "./components/helper/scroll-to-top";
// import TubesCursor from "./components/helper/tubes-cursor"; // disabled for now — using CursorGlow
import { ThemeProvider } from "./components/helper/theme-provider";
import Navbar from "./components/navbar";
import "./css/card.scss";
import "./css/globals.scss";
const inter = Inter({ subsets: ["latin"] });

// Dark-only for now (the light-mode toggle has been removed). Force dark before
// first paint and ignore any previously saved 'light' preference.
const themeScript = `
(function() {
  try {
    document.documentElement.setAttribute('data-theme', 'dark');
  } catch (e) {}
})();
`;

export const metadata = {
  title: "Portfolio of Bibhash Lenka - MERN Stack Developer",
  description:
    "This is the portfolio of Bibhash Lenka. I am a MERN / full-stack developer with 4.5+ years of experience shipping production web applications across B2B SaaS, operations, and fintech. Core stack: React.js, TypeScript, Node.js (Express.js, Hapi.js), and MongoDB, with REST API design, multi-tenant architecture, OAuth 2.0 integrations, and automated testing.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider>
          <ScrollProgress />
          {/* <TubesCursor /> disabled for now — restored the subtle cursor-glow */}
          <CursorGlow />
          <ToastContainer />
          <main className="min-h-screen relative mx-auto w-full px-5 sm:px-8 lg:px-12 xl:px-16 max-w-[120rem] text-content">
            <Navbar />
            {children}
            <ScrollToTop />
          </main>
          <Footer />
        </ThemeProvider>
      </body>
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM} />
    </html>
  );
}
