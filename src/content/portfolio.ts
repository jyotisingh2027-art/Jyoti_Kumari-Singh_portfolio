/**
 * All placeholder copy for the portfolio lives here.
 * Swap these values (and the hero media below) with real content later.
 */

export const profile = {
  brand: "Jyoti Kumari Singh",
  role: "meaningful solutions",
  greeting: "I turn technology, ideas and business problems into",
  tagline:
    "I work at the intersection of technology and business to solve complex problems and build the bridge to possibility.",
  location: "Gurugram, India",
  email: "jyoti.singh2027@gmail.com",
  phone: "+91-7010448420",
  availability: "Technology × Business × Problem Solving",
};

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Journey", href: "#journey" },
  { label: "Skills", href: "#skills" },
  { label: "Certifications", href: "#certifications" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const education = [
  {
    step: "01",
    stage: "10th Standard",
    school: "Kendriya Vidyalaya Ashok Nagar",
    score: "CBSE · 9.4 CGPA",
    location: "Chennai",
    year: "2014",
  },
  {
    step: "02",
    stage: "12th Standard",
    school: "Kendriya Vidyalaya Ashok Nagar",
    score: "CBSE Board",
    location: "Chennai",
    year: "2016",
  },
  {
    step: "03",
    stage: "B.E. Computer Science",
    school: "K C G College of Technology, Anna University",
    score: "8.3 CGPA",
    location: "Chennai",
    year: "2016 – 2020",
  },
  {
    step: "04",
    stage: "PGP – Technology & Business Management",
    school: "Masters' Union",
    score: "Post Graduate Programme",
    location: "Gurugram, India",
    year: "2026 – Present",
  },
];

export const marqueeWords = [
  "Web Development",
  "UI Engineering",
  "API Design",
  "Performance",
  "Motion",
  "Accessibility",
];

export const stats = [
  { value: "5+", label: "Years building" },
  { value: "7+", label: "Projects shipped" },
  { value: "5", label: "Happy clients" },
  { value: "100%", label: "On-time delivery" },
];

export const skills = [
  {
    title: "Business Skills",
    blurb: "Delivery-focused practices that keep people, process and outcomes aligned.",
    items: [
      "Stakeholder Management",
      "Agile Methodology",
      "Industry Standard Deliverables",
    ],
  },
  {
    title: "Technical Skills",
    blurb: "Hands-on expertise across networks, software and tooling.",
    groups: [
      {
        heading: "Networks",
        items: [
          "Routing & Switching",
          "Data Center & Cloud",
          "Network Simulator: CML, GNS3, Packet Tracer",
          "Products: Nexus, Arista, Catalyst",
        ],
      },
      {
        heading: "Software",
        items: [
          "SDLC",
          "HTML5",
          "Python",
          "JavaScript",
          "CSS3",
          "PHP",
          "Bootstrap",
          "Git",
          "REST API",
          "Postman",
        ],
      },
      {
        heading: "Tools",
        items: [
          "MS Office",
          "PowerPoint",
          "Visio",
          "SharePoint",
          "Jira",
          "Kanban",
          "Confluence",
        ],
      },
    ],
  },
];

export const certifications = [
  { name: "Cisco Certified Specialist – Data Center Core (DCCOR)", provider: "Cisco", date: "Mar’24" },
  { name: "Ansible for Network Automation (D0457)", provider: "RedHat", date: "Jan’23" },
  { name: "Google Project Management Certificate", provider: "Google", date: "Jun’23" },
  { name: "Agile Project Management Course", provider: "AgileKB via Udemy", date: "Feb’23" },
  { name: "VMware-certified specialist", provider: "VMware", date: "Sep’22" },
  { name: "Cisco Certified Network Associate (CCNA)", provider: "Cisco", date: "July’20" },
  { name: "Cisco Devnet Associate (DEVASEC)", provider: "Cisco", date: "June’20" },
];

import sectorMapAsset from "@/assets/sector-map.pdf?url";
import sihWinners from "@/assets/sih/winners.jpg";
import sihPresentation from "@/assets/sih/presentation.jpg";
import sihJudging from "@/assets/sih/judging.jpg";
import sihNews from "@/assets/sih/news.jpg";

export type ProjectPhoto = { src: string; alt: string; caption: string };

export const projectGroups = [
  {
    heading: "Post-Graduation Projects",
    projects: [
      {
        index: "01",
        title: "HR Tech & Staffing — Sector Map",
        category: "Sector Research",
        year: "2026",
        blurb:
          "A sector map of the HR Tech & Staffing landscape, mapping key segments, players and opportunities.",
        tags: ["HR Tech", "Staffing", "Sector Map"],
        link: sectorMapAsset,
        linkLabel: "View Sector Map",
      },
      {
        index: "02",
        title: "HR Tech & Staffing — Workflow",
        category: "Automation",
        year: "2026",
        blurb:
          "A workflow built on the HR Tech & Staffing theme: early burnout detection with weekly signals, automated on Make.com.",
        tags: ["Make.com", "Automation", "HR Tech"],
        link: "https://us2.make.com/public/shared-scenario/BYdmxZAJDTf/early-burnout-detection-weekly-signal",
        linkLabel: "View Workflow",
      },
      {
        index: "03",
        title: "Early Burnout Detection — Weekly Signal",
        category: "Automation",
        year: "2026",
        blurb:
          "An HR Tech & Staffing workflow that surfaces early burnout signals on a weekly cadence, built and shared via Make.com.",
        tags: ["Make.com", "HR Tech", "Workflow"],
        link: "https://us2.make.com/public/shared-scenario/BYdmxZAJDTf/early-burnout-detection-weekly-signal",
        linkLabel: "View Workflow",
      },
      {
        index: "04",
        title: "Corporate Chaos",
        category: "AI Game",
        year: "2026",
        blurb:
          "A game built using AI — Corporate Chaos. Play it live and see AI-assisted game building in action.",
        tags: ["AI", "Game", "Lovable"],
        link: "https://corporate-chaos.lovable.app",
        linkLabel: "Play the Game",
      },
    ],
  },
  {
    heading: "Graduation — Academic Project",
    projects: [
      {
        index: "01",
        title: "Sensor-Based Monitoring of Urban City Wastewater for Agriculture Use",
        category: "Smart India Hackathon",
        year: "Jul'19",
        blurb:
          "Smart India Hackathon project at CSIR – Central Scientific Instruments Organization, Chandigarh (team of 6). The product monitors the quality of urban city wastewater for agricultural use. Worked on planning, procuring equipment, budgeting, presentation and documentation. As a team member, developed a website using Python, HTML, CSS, Bootstrap and PHP that provided a detailed view of water quality, compared results with the World Health Organization report and suggested solutions — with multi-linguistic support for English, Tamil and Hindi readers.",
        tags: ["Python", "HTML", "CSS", "Bootstrap", "PHP", "IoT"],
        award:
          "National Hackathon Winner — Smart India Hackathon — Hardware Edition (Ministry of Agriculture)",
        gallery: [
          {
            src: sihWinners,
            alt: "Team Hack Six holding the Smart India Hackathon 2019 winner's cheque and trophy",
            caption: "Team Hack Six — winners, SIH 2019 Hardware Edition",
          },
          {
            src: sihPresentation,
            alt: "Team presenting the water quality monitoring prototype to the judging panel",
            caption: "Presenting the prototype to the jury",
          },
          {
            src: sihJudging,
            alt: "Judges reviewing the team's evaluation documents at CSIR-CSIO",
            caption: "Final evaluation at CSIR-CSIO, Chandigarh",
          },
          {
            src: sihNews,
            alt: "Newspaper clipping titled Hackathon winners about team Hack Six",
            caption: "In the news — “Hackathon winners”",
          },
        ] as ProjectPhoto[],
      },
    ],
  },
];

export const socials = [
  { label: "GitHub", href: "https://github.com/jyotisingh2027-art" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/jyoti-kumari-singh/" },
];

export const resumeUrl = `${import.meta.env.BASE_URL}jyoti-singh-resume.pdf`;

/**
 * Hero background video.
 * Set `heroVideoSrc` to your video URL once you upload it; until then the
 * hero shows the poster image.
 */
import heroVideoAsset from "@/assets/jyoti-portfolio-video.mp4";
export const heroVideoSrc: string | null = heroVideoAsset;
