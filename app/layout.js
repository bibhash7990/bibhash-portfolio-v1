import { GoogleTagManager } from "@next/third-parties/google";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/footer";
import ScrollToTop from "./components/helper/scroll-to-top";
import { ThemeProvider } from "./components/helper/theme-provider";
import Navbar from "./components/navbar";
import "./css/card.scss";
import "./css/globals.scss";
const inter = Inter({ subsets: ["latin"] });

// Runs before first paint to set the theme (no flash of the wrong theme).
// Default is ALWAYS dark; only a previously saved choice overrides it.
const themeScript = `
(function() {
  try {
    var stored = localStorage.getItem('theme');
    var theme = (stored === 'light' || stored === 'dark') ? stored : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
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
          <ToastContainer />
          <main className="min-h-screen relative mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] text-content">
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
