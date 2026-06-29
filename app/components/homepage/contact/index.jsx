// @flow strict
import { personalData } from '@/utils/data/personal-data';
import Link from 'next/link';
import { BiLogoLinkedin } from "react-icons/bi";
import { CgWebsite } from "react-icons/cg";
import { CiLocationOn } from "react-icons/ci";
import { IoLogoGithub, IoMdCall } from "react-icons/io";
import { MdAlternateEmail } from "react-icons/md";
import ContactShader from "../../helper/contact-shader";
import ContactForm from './contact-form';

function ContactSection() {
  return (
    <div id="contact" className="section-root my-12 lg:my-24 relative z-50 mt-24 text-content">
      {/* Animated shader background, scoped behind the contact content. Masked
          at the edges so it fades into the page instead of being a hard block. */}
      <div className="pointer-events-none absolute -inset-x-6 -inset-y-10 -z-10 overflow-hidden rounded-3xl [mask-image:radial-gradient(120%_90%_at_50%_50%,#000_55%,transparent_100%)]">
        <ContactShader className="absolute inset-0 h-full w-full opacity-60" />
      </div>
      <div className="hidden lg:flex flex-col items-center absolute top-24 -right-8">
        <span className="bg-label w-fit text-label-text rotate-90 p-2 px-5 text-xl rounded-md">
          CONTACT
        </span>
        <span className="h-36 w-[2px] bg-label"></span>
      </div>

      <p className="font-medium mb-5 text-[#16f2b3] text-xl uppercase">Contact with me</p>

      {/* One unified glass card: form on the left, details on the right. */}
      <div className="rounded-2xl border border-line-2 bg-surface/60 backdrop-blur-sm p-5 sm:p-7 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 lg:divide-x lg:divide-line-2">
          {/* Left: form */}
          <ContactForm />

          {/* Right: contact details + socials */}
          <div className="flex flex-col lg:pl-10">
            <p className="text-sm text-content-secondary">
              {"Prefer to reach out directly? Use any of the channels below — I usually reply within a day."}
            </p>

            <div className="mt-6 flex flex-col gap-3">
              {[
                { Icon: MdAlternateEmail, label: "Email", value: personalData.email, href: `mailto:${personalData.email}` },
                { Icon: IoMdCall, label: "Phone", value: personalData.phone, href: `tel:${personalData.phone}` },
                { Icon: CiLocationOn, label: "Location", value: personalData.address, href: null },
              ].map(({ Icon, label, value, href }) => {
                const Row = (
                  <>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-line-2 bg-surface-3 text-[#16f2b3] transition-colors duration-300 group-hover:border-[#16f2b3]">
                      <Icon size={18} />
                    </span>
                    <span className="flex flex-col">
                      <span className="text-[11px] uppercase tracking-wider text-content-muted">{label}</span>
                      <span className="text-sm md:text-base text-content-secondary break-all">{value}</span>
                    </span>
                  </>
                );
                return href ? (
                  <Link
                    key={label}
                    href={href}
                    className="group flex items-center gap-3 rounded-lg no-underline transition-colors duration-300 hover:text-[#16f2b3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16f2b3] focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                  >
                    {Row}
                  </Link>
                ) : (
                  <div key={label} className="group flex items-center gap-3">
                    {Row}
                  </div>
                );
              })}
            </div>

            <div className="mt-auto pt-8 flex items-center gap-3">
              {[
                { Icon: IoLogoGithub, label: "GitHub", href: personalData.github },
                { Icon: BiLogoLinkedin, label: "LinkedIn", href: personalData.linkedIn },
                { Icon: CgWebsite, label: "Website", href: personalData.twitter },
              ].map(({ Icon, label, href }) => (
                <Link
                  key={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  href={href}
                  aria-label={label}
                  title={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line-2 bg-surface-3 text-content-secondary transition-colors duration-300 hover:border-[#16f2b3] hover:text-[#16f2b3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16f2b3] focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                >
                  <Icon size={18} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;