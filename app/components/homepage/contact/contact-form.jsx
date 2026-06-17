"use client";
// @flow strict
import { isValidEmail } from "@/utils/check-email";
import emailjs from "@emailjs/browser";
import { useState } from "react";
import { TbMailForward } from "react-icons/tb";
import { toast } from "react-toastify";

const EMAILJS = {
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
};

function ContactForm() {
  const [error, setError] = useState({ email: false, required: false });
  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    message: "",
  });

  const checkRequired = () => {
    if (userInput.email && userInput.message && userInput.name) {
      setError({ ...error, required: false });
    }
  };

  const handleSendMail = async (e) => {
    e.preventDefault();

    if (!userInput.email || !userInput.message || !userInput.name) {
      setError({ ...error, required: true });
      return;
    } else if (error.email) {
      return;
    } else {
      setError({ ...error, required: false });
    };

    if (!EMAILJS.publicKey || !EMAILJS.serviceId || !EMAILJS.templateId) {
      toast.error("Email is not configured. Please set the EmailJS keys in .env.local.");
      return;
    }

    try {
      setIsLoading(true);

      const templateParams = {
        from_name: userInput.name,
        name: userInput.name,
        user_name: userInput.name,
        from_email: userInput.email,
        user_email: userInput.email,
        email: userInput.email,
        reply_to: userInput.email,
        to_name: "Bibhash",
        to_email: "bibhash.reactjsdev@gmail.com",
        message: userInput.message,
      };

      await emailjs.send(
        EMAILJS.serviceId,
        EMAILJS.templateId,
        templateParams,
        { publicKey: EMAILJS.publicKey }
      );

      toast.success("Message sent successfully!");
      setUserInput({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error("EmailJS error:", error);
      toast.error(error?.text || "Could not send message. Please try again.");
    } finally {
      setIsLoading(false);
    };
  };

  return (
    <div className="flex flex-col text-content">
      <p className="text-sm text-content-secondary">{"Have a question or an opportunity in mind? Send me a message and I'll get back to you."}</p>
      <div className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="contact-name" className="text-base">Your Name: </label>
            <input
              id="contact-name"
              name="name"
              autoComplete="name"
              className="bg-input w-full border rounded-md border-line-2 focus:border-[#16f2b3] ring-0 outline-0 transition-all duration-300 px-3 py-2"
              type="text"
              maxLength="100"
              required={true}
              onChange={(e) => setUserInput({ ...userInput, name: e.target.value })}
              onBlur={checkRequired}
              value={userInput.name}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="contact-email" className="text-base">Your Email: </label>
            <input
              id="contact-email"
              name="email"
              autoComplete="email"
              className="bg-input w-full border rounded-md border-line-2 focus:border-[#16f2b3] ring-0 outline-0 transition-all duration-300 px-3 py-2"
              type="email"
              maxLength="100"
              required={true}
              aria-invalid={error.email}
              aria-describedby={error.email ? "contact-email-error" : undefined}
              value={userInput.email}
              onChange={(e) => setUserInput({ ...userInput, email: e.target.value })}
              onBlur={() => {
                checkRequired();
                setError({ ...error, email: !isValidEmail(userInput.email) });
              }}
            />
            {error.email && <p id="contact-email-error" role="alert" className="text-sm text-red-400">Please provide a valid email!</p>}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="contact-message" className="text-base">Your Message: </label>
            <textarea
              id="contact-message"
              className="bg-input w-full border rounded-md border-line-2 focus:border-[#16f2b3] ring-0 outline-0 transition-all duration-300 px-3 py-2"
              maxLength="500"
              name="message"
              required={true}
              onChange={(e) => setUserInput({ ...userInput, message: e.target.value })}
              onBlur={checkRequired}
              rows="4"
              value={userInput.message}
            />
          </div>
          <div className="flex flex-col items-center gap-3">
            {error.required && <p role="alert" className="text-sm text-red-400">
              All fields are required!
            </p>}
            <button
              type="submit"
              className="flex items-center gap-1 hover:gap-3 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 px-5 md:px-12 py-2.5 md:py-3 text-center text-xs md:text-sm font-medium uppercase tracking-wider text-white no-underline transition-all duration-200 ease-out hover:text-white hover:no-underline md:font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16f2b3] focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:opacity-70 disabled:cursor-not-allowed"
              onClick={handleSendMail}
              disabled={isLoading}
              aria-busy={isLoading}
            >
              {
                isLoading ?
                <span>Sending Message...</span>:
                <span className="flex items-center gap-1">
                  Send Message
                  <TbMailForward size={20} />
                </span>
              }
            </button>
          </div>
        </div>
    </div>
  );
};

export default ContactForm;