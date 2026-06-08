// Flat list used by the scrolling marquee — only names that have an icon in
// utils/skill-image.js (verified). Do not add a skill here without an icon.
export const skillsData = [
  'React',
  'Next JS',
  'Javascript',
  'Typescript',
  'HTML',
  'CSS',
  'Tailwind',
  'Bootstrap',
  'MaterialUI',
  'MongoDB',
  'Graphql',
  'Firebase',
  'Docker',
  'AWS',
  'Nginx',
  'Figma',
  'Git'
]

// Categorized skills used by the grouped Skills grid (text chips — no icon needed).
export const skillCategories = [
  {
    id: 1,
    title: "Frontend & UI",
    skills: [
      "React.js", "TypeScript", "JavaScript (ES6+)", "Vite", "React Router",
      "Tailwind CSS", "Radix UI", "shadcn/ui", "Material UI", "Joy UI",
      "Chakra UI", "Bootstrap", "Styled Components", "SASS", "Framer Motion",
    ],
  },
  {
    id: 2,
    title: "Backend & APIs",
    skills: [
      "Node.js", "Express.js", "Hapi.js", "REST API Design", "JWT",
      "Joi", "MVC / Service Layer", "Swagger / hapi-swagger", "Winston", "node-cron",
    ],
  },
  {
    id: 3,
    title: "State & Data",
    skills: [
      "Redux Toolkit", "redux-persist", "Zustand", "TanStack React Query",
      "MongoDB", "Mongoose",
    ],
  },
  {
    id: 4,
    title: "Forms & Validation",
    skills: ["React Hook Form", "Formik", "Zod", "Yup"],
  },
  {
    id: 5,
    title: "Integrations & Services",
    skills: [
      "OAuth 2.0 (Google / Gmail)", "Clerk", "Stripe", "Twilio", "Razorpay",
      "AWS S3", "Google Maps API", "Superfluid", "Trigger.dev", "Resend",
    ],
  },
  {
    id: 6,
    title: "Testing & Delivery",
    skills: [
      "Vitest", "Playwright", "Docker (basics)", "CI/CD (Vercel, Netlify, Railway)",
      "Agile / Scrum",
    ],
  },
  {
    id: 7,
    title: "Tools & Workflow",
    skills: [
      "Git & GitHub", "Postman", "ClickUp", "ESLint", "Prettier",
      "Figma", "VS Code", "Cursor", "npm / Yarn",
    ],
  },
];
