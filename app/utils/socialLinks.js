import { FiGithub, FiLinkedin, FiMail, FiTwitter } from "react-icons/fi";

// Profile links shared by the hero and the footer, so each address is written
// once. Each section picks the links it shows, in its own order.
export const githubLink = {
  label: "GitHub",
  href: "https://github.com/Dev-BhoneAK",
  Icon: FiGithub,
};

export const linkedinLink = {
  label: "LinkedIn",
  href: "https://www.linkedin.com/in/dev-bhoneak",
  Icon: FiLinkedin,
};

// Also used by the "Request a demo" links in Projects.
export const emailAddress = "bhoneak@outlook.com";

export const emailLink = {
  label: "Email",
  href: `mailto:${emailAddress}`,
  Icon: FiMail,
};

export const xLink = {
  label: "X",
  href: "https://x.com/bhone_ak",
  Icon: FiTwitter,
};
