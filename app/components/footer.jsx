// @flow strict
import { personalData } from "@/utils/data/personal-data";
import Link from 'next/link';
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { CgWebsite } from "react-icons/cg";

const SOCIALS = [
  { label: "GitHub", href: personalData.github, Icon: BsGithub },
  { label: "LinkedIn", href: personalData.linkedIn, Icon: BsLinkedin },
  { label: "Website", href: personalData.twitter, Icon: CgWebsite },
];

function Footer() {
  return (
    <footer className="relative border-t bg-surface border-divider text-content">
      {/* top accent line */}
      <div className="pointer-events-none flex justify-center">
        <div className="absolute top-0 h-[1px] w-1/2 bg-gradient-to-r from-transparent via-violet-500 to-transparent" />
      </div>

      <div className="mx-auto w-full px-5 sm:px-8 lg:px-12 xl:px-16 max-w-[120rem] py-8 lg:py-10">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          <div className="flex flex-col items-center gap-1 md:items-start">
            <Link
              href="/"
              className="text-xl font-bold tracking-tight text-[#16f2b3] no-underline rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16f2b3] focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
            >
              {personalData.name}
            </Link>
            <p className="text-sm text-content-muted">
              © 2026 {personalData.name}. All rights reserved.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {SOCIALS.map(({ label, href, Icon }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line-2 bg-surface-3 text-content-secondary no-underline transition-colors duration-300 hover:border-[#16f2b3] hover:text-[#16f2b3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16f2b3] focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              >
                <Icon size={18} />
              </Link>
            ))}
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-content-muted md:text-left">
          Designed &amp; built with Next.js, Tailwind CSS and a bit of WebGL.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
