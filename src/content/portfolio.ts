import headingPostGrad from "@/assets/heading-post-graduation.webp";
import headingGrad from "@/assets/heading-graduation.webp";
import sihLogoBg from "@/assets/sih/logo-full.png";
import netfixlabLogo from "@/assets/netfixlab/logo.png";
import nookLogo from "@/assets/nook/logo.png";
import muLogoFull from "@/assets/mu-logo-full.png";
import muCampusBg from "@/assets/mu-campus.jpg";
import kcgCampusBg from "@/assets/kcg-campus.jpg";
import kvGardenBg from "@/assets/kv-garden.jpg";
import kvSchoolBg from "@/assets/kv-school.jpg";
import mastersUnionPhoto from "@/assets/masters-union.jpg";
import nookHero from "@/assets/nook/lamplit-lane.jpg";
import hvOverview from "@/assets/healvoy/overview.jpg";
import ciscoLogo from "@/assets/certs/cisco.png";
import googleLogo from "@/assets/certs/google.png";
import agilekbLogo from "@/assets/certs/agilekb.png";
import redhatLogo from "@/assets/certs/redhat.png";
import vmwareLogo from "@/assets/certs/vmware.png";
import school12thPhoto from "@/assets/school-12th.jpg";
import school10thPhoto from "@/assets/school-10th.jpg";
import muLogo from "@/assets/mu-logo.png";
import kcgLogo from "@/assets/kcg-logo.png";
import graduationPhoto from "@/assets/graduation.jpg";
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
  email: "jyoti.singh2027@mastersunion.org",
  phone: "+91-7010448420",
  availability: "Technology × Business × Problem Solving",
};

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Journey", href: "#journey" },
  { label: "Skills", href: "#skills" },
  { label: "Certifications", href: "#certifications" },
  { label: "My Work", href: "#projects" },
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
    cardBg: kvSchoolBg,
    photo: school10thPhoto,
    photoAlt: "Jyoti in her Kendriya Vidyalaya school uniform",
  },
  {
    step: "02",
    stage: "12th Standard",
    school: "Kendriya Vidyalaya Ashok Nagar",
    score: "CBSE Board",
    location: "Chennai",
    year: "2016",
    cardBg: kvGardenBg,
    cardBgNatural: true,
    photo: school12thPhoto,
    photoAlt: "Jyoti with her 12th standard classmates and teacher at Kendriya Vidyalaya",
    photoWide: true,
  },
  {
    step: "03",
    stage: "B.E. Computer Science",
    school: "K C G College of Technology, Anna University",
    score: "8.3 CGPA",
    location: "Chennai",
    year: "2016 – 2020",
    cardBg: kcgCampusBg,
    photoLeft: true,
    logo: kcgLogo,
    logoAlt: "KCG College of Technology logo",
    photo: graduationPhoto,
    photoAlt: "Jyoti at her Anna University graduation, holding her degree certificate",
  },
  {
    step: "04",
    stage: "Post Graduate Programme – Technology & Business Management",
    school: "Masters' Union University",
    score: "",
    logo: muLogo,
    logoAlt: "Masters' Union University logo",
    logoDark: true,
    logoFull: muLogoFull,
    cardBg: muCampusBg,
    cardBgNatural: true,
    cardBgSoft: true,
    photo: mastersUnionPhoto,
    photoAlt: "Jyoti in a black blazer at Masters' Union",
    award: "MU Scholarship for Technology Leader",
    location: "Gurugram, India",
    year: "2026 – Present",
  },
];

export const marqueeWords = [
  "Product Thinking",
  "Network Engineering",
  "Data Centre Infrastructure",
  "Software Development",
  "AI-Built Products",
  "Team Leadership",
  "Mentoring Engineers",
  "Customer Delivery",
  "Root-Cause Debugging",
  "Go-to-Market",
  "Market Research",
  "Stakeholder Alignment",
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
  },,
  {
    title: "AI Skills",
    blurb: "Using AI to build, automate and ship real products end to end.",
    groups: [
      {
        heading: "Product",
        items: [
          "AI Product Development",
          "Rapid Prototyping",
          "Prompt Design",
          "AI-Generated Visuals",
        ],
      },
      {
        heading: "Automation & ML",
        items: ["Workflow Automation (Make.com)", "Decision Tree Classifier", "Persona / Scoring Engines"],
      },
    ],
  }
];

export const certifications: {
  name: string;
  provider: string;
  date: string;
  /** Short issuer mark shown until an official logo file is added via `logo`. */
  mark: string;
  logo?: string;
}[] = [
  { name: "Cisco Certified Specialist – Data Center Core (DCCOR)", provider: "Cisco", date: "Mar’24", mark: "CISCO", logo: ciscoLogo },
  { name: "Google Project Management Certificate", provider: "Google", date: "Jun’23", mark: "G", logo: googleLogo },
  { name: "Agile Project Management Course", provider: "AgileKB via Udemy", date: "Feb’23", mark: "A", logo: agilekbLogo },
  { name: "Ansible for Network Automation (D0457)", provider: "Red Hat", date: "Jan’23", mark: "RH", logo: redhatLogo },
  { name: "VMware Certified Specialist", provider: "VMware", date: "Sep’22", mark: "VM", logo: vmwareLogo },
  { name: "Cisco Certified Network Associate (CCNA)", provider: "Cisco", date: "Jul’20", mark: "CISCO", logo: ciscoLogo },
  { name: "Cisco DevNet Associate (DEVASC)", provider: "Cisco", date: "Jun’20", mark: "CISCO", logo: ciscoLogo },
];

import sectorMapAsset from "@/assets/sector-map.pdf?url";
import sihWinners from "@/assets/sih/winners.jpg";
import sihProduct from "@/assets/sih/product.jpg";
import sihJury from "@/assets/sih/jury.jpg";
import sihNews from "@/assets/sih/news.jpg";
import sihAward from "@/assets/sih/award.jpg";
import chaosLanding from "@/assets/chaos/landing.jpg";
import chaosOnboarding from "@/assets/chaos/onboarding.jpg";
import chaosScenario from "@/assets/chaos/scenario.jpg";
import chaosAnalysis from "@/assets/chaos/analysis.jpg";
import chaosPersona from "@/assets/chaos/persona.jpg";

import nflVideo from "@/assets/netfixlab/launch.mp4";
import nflPoster from "@/assets/netfixlab/poster.jpg";
import nflHome from "@/assets/netfixlab/home.jpg";
import nflLessons from "@/assets/netfixlab/lessons.jpg";
import nflAbout from "@/assets/netfixlab/about.jpg";
import nflPricing from "@/assets/netfixlab/pricing.jpg";
import nflVideoLesson from "@/assets/netfixlab/video-lesson.jpg";

export type ProjectPhoto = { src: string; alt: string; caption: string; anchorTop?: boolean; hideCaption?: boolean };

export const projectGroups = [
  {
    heading: "Post-Graduation",
    headingImage: headingPostGrad,
    projects: [
      {
        index: "00",
        title: "NetFixLab",
        titleLogo: netfixlabLogo,
        sectionBg: "#faf4df",
        sectionPattern: "dots",
        sectionLight: true,
        category: "AI-Built EdTech Product",
        year: "2026",
        tagline:
          "An AI-built edtech product that teaches complete beginners home-network troubleshooting through comics and animated video lessons.",
        blurb:
          "NetFixLab teaches beginners how the internet reaches their devices and how to fix common problems themselves, one short comic lesson or animated video at a time.",
        highlightTags: ["AI Product Development", "EdTech", "Freemium"],
        tags: ["Supabase", "Dodo Payments", "Product Positioning", "Go-to-Market", "Comic-based Learning"],
        link: "https://netfixlab.tech/",
        linkLabel: "Visit NetFixLab",
        featureVideo: { src: nflVideo, poster: nflPoster, caption: "NetFixLab launch video" },
        channels: [
          { label: "LinkedIn", href: "https://www.linkedin.com/company/144128279/" },
          {
            label: "Reddit",
            href: "https://www.reddit.com/r/SideProject/comments/1xx0ag5/networking_finally_made_sense_to_my_friends_when/",
          },
          { label: "X (Twitter)", href: "https://x.com/jo4109fy8/status/2121964763525816498" },
          { label: "Product Hunt", href: "https://www.producthunt.com/products/netfixlab" },
        ],
        points: [
          {
            heading: "The product",
            items: [
              "Launched NetFixLab, an **AI-built edtech product** teaching beginners home-network troubleshooting via comics: 28 lessons across two parts, each ending with a takeaway, a try-it task and a quiz.",
              "Defined the target audience (**US beginners**) and positioned it as story-led learning, not study material.",
            ],
          },
          {
            heading: "Business model",
            items: [
              "Designed a **freemium model**: free starter lessons, then a one-time payment unlocks the full course via Dodo Payments.",
              "No subscription; purchases are saved to the learner's account so lessons open on any device.",
            ],
          },
          {
            heading: "Build",
            items: [
              "Built user accounts and **lesson progress tracking on Supabase**.",
              "Added guest engagement tracking to understand how visitors use the free lessons before signing up.",
            ],
          },
        ],
        gallery: [
          { src: nflHome, alt: "NetFixLab home page: Your home runs on a network. Learn it from a comic.", caption: "Home — learn networking from a comic" },
          { src: nflLessons, alt: "Course page showing comic-cover lesson cards in two parts", caption: "28 lessons, two parts" },
          { src: nflVideoLesson, alt: "An animated video lesson: Why do devices talk?", caption: "Animated video lessons" },
          { src: nflAbout, alt: "About section: the comic and the person behind it", caption: "The comic, and the person behind it" },
          { src: nflPricing, alt: "Pricing: start free, pay once for the rest, plus FAQs", caption: "Freemium pricing — pay once" },
        ] as ProjectPhoto[],
      },
      {
        index: "00b",
        title: "HealVoy",
        category: "Market Research · Medical Tourism in India",
        year: "2026",
        tagline:
          "A venture idea for one trusted, all-inclusive package for care in India: dental, surgical support and wellness for international patients and NRIs.",
        blurb:
          "Market research and venture design for medical tourism in India.",
        highlightTags: ["Market Research", "Venture Design", "B2B SaaS"],
        tags: ["Market Sizing", "Competitive Analysis", "Business Model", "Go-to-Market", "HealthTech"],
        link: "https://drive.google.com/file/d/15f3n_JZ2xIe6r8Vpp3q8s8TaGmS53xXF/view?usp=drive_link",
        linkLabel: "Read the research",
        awardPhoto: {
          src: hvOverview,
          alt: "HealVoy overview: medical tourism arrivals to India, treatment cost comparison and the patient journey",
          caption: "HealVoy — one trusted package for care in India",
        } as ProjectPhoto,
        points: [
          {
            heading: "The paradox",
            items: [
              "India is the **cheapest on all six procedures** benchmarked (a heart bypass costs 94% less than in the USA), yet medical arrivals fell 21% to 5.07 lakh in 2025 while Türkiye drew 13.99 lakh.",
              "Traced the gap to four causes: a fragmented patient journey, a trust and image problem, thin marketing and no national data or provider directory.",
            ],
          },
          {
            heading: "The idea",
            items: [
              "HealVoy: a **B2B SaaS platform with a human care team** that helps Indian hospitals, dental clinics and wellness centres build, price, market and deliver all-inclusive packages.",
              "Three packages (dental, surgical support, wellness and recovery) cover the whole trip, from visa and pickup to treatment, Ayurveda-led recovery and follow-up.",
            ],
          },
          {
            heading: "The opportunity",
            items: [
              "An **$8.7B market in 2025, projected at $16.2B by 2030**; arrivals from outside Bangladesh grew 12% in 2025.",
              "Benchmarked competitors (Vaidam, Lyfboat, hospital desks) and planned a Delhi NCR surgery + Rishikesh/Kerala recovery pilot.",
            ],
          },
        ],
        gallery: [
        ] as ProjectPhoto[],
      },
      {
        index: "00c",
        title: "Nook",
        titleLogo: nookLogo,
        sectionBg: "#2d1129",
        category: "macOS App · In development",
        year: "2026",
        tagline:
          "A cozy desktop overlay for macOS: seasonal weather and little toys live on top of your real desktop. Version 1 is winter.",
        blurb: "A cozy desktop overlay for macOS.",
        comingSoon: "Releasing soon…",
        highlightTags: ["Product Design", "Desktop App", "Swift"],
        tags: ["macOS", "SpriteKit", "SwiftUI", "AppKit", "Privacy-first"],
        link: "https://github.com/jyotisingh2027-art/Nook",
        linkLabel: "View on GitHub",
        awardPhoto: {
          src: nookHero,
          alt: "Nook winter wallpaper: a snowy lamplit village lane at dusk",
          caption: "Nook — Lamplit Lane wallpaper",
          hideCaption: true,
        } as ProjectPhoto,
        points: [
          {
            heading: "The product",
            items: [
              "A **cozy desktop overlay** that brings seasonal weather and small decorations onto your real Mac desktop, starting with winter.",
              "Free, with **no accounts and no tracking**; everything stays on the user's Mac.",
            ],
          },
          {
            heading: "Features",
            items: [
              "Snow settles on the tops of windows and the Dock; fling, resize or close a window and its snow flies off or tumbles down, while clicks still pass through to apps.",
              "Design your own desktop decorations (Christmas trees, snowmen, string lights, wreaths) and pick from cozy winter wallpapers or your own photos and videos.",
            ],
          },
          {
            heading: "Build",
            items: [
              "Native macOS app in **Swift** (AppKit, SpriteKit, SwiftUI), with new seasons plugging in through a shared Season design.",
              "Battery-aware: pauses for full-screen apps and when the screen sleeps, and shows fewer flakes on battery.",
            ],
          },
        ],
        gallery: [
        ] as ProjectPhoto[],
      },
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
        sectionBg: "#f1e6b2", // Pantone 7499 C "Wall Cream"
        sectionLight: true,
        category: "AI Game",
        year: "2026",
        blurb:
          "A satirical survival game for office life, built end to end with AI. Players register a corporate badge, survive ten workplace scenarios per level — from 52-minute ‘quick standups’ to inbox overload — while a live stress meter reacts to every choice. An AI analysis then scores their caffeine tolerance, meeting fatigue and email avoidance, and assigns an office persona such as ‘Task Juggler’. Three unlockable levels, sound effects and a PANIC button included.",
        highlightTags: ["AI Product Development", "Gamification", "Product Design"],
        tags: ["AI-Generated Visuals", "Prompt Design", "Persona Engine", "UX Writing", "Rapid Prototyping"],
        link: "https://corporate-chaos.lovable.app",
        linkLabel: "Play the Game",
        tagline: "Survive the corporate jungle — a satirical office-survival game, built end to end with AI.",
        awardPhoto: {
          src: chaosLanding,
          alt: "Corporate Chaos landing page: 'Survive the corporate jungle' with an Employee of the Month card",
          caption: "Landing — “Survive the corporate jungle.”",
          hideCaption: true,
        } as ProjectPhoto,
        gallery: [
          { src: chaosOnboarding, alt: "Employee onboarding screen to create a corporate badge ID", caption: "Onboarding — build your badge" },
          { src: chaosScenario, alt: "A workplace scenario question with four answer choices and a stress meter", caption: "10 scenarios per level" },
          { src: chaosAnalysis, alt: "Chaos Corp AI analysis showing survival rate and trait meters", caption: "AI analysis of your habits" },
          { src: chaosPersona, alt: "Office persona result: Task Juggler, with field readings", caption: "Your office persona" },
        ] as ProjectPhoto[],
      },
    ],
  },
  {
    heading: "Graduation",
    headingImage: headingGrad,
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
        awardDate: "Jul'19",
        sectionLogoBg: sihLogoBg,
        sectionBg: "#ffffff",
        sectionLight: true,
        awardDetail:
          "CSIR – Central Scientific Instruments Organization, Chandigarh",
        awardPhoto: {
          src: sihAward,
          alt: "Team Hack Six receiving the Smart India Hackathon 2019 first prize on stage at the Grand Finale",
          caption: "Receiving the first prize at the SIH 2019 Grand Finale",
        } as ProjectPhoto,
        points: [
          {
            heading: "The product",
            items: [
              "Water Quality Monitoring (WAQM): a sensor-based system that monitors the quality of water for agricultural use, measuring temperature, turbidity, pH and electrical conductivity.",
              "A **Decision Tree Classifier (Artificial Intelligence) algorithm** compares each observed value against its nominal range to classify whether the water is fit for use.",
              "Results can be viewed on the website and mobile app, which compares readings with World Health Organization guidelines, suggests corrective solutions and supports English, Tamil and Hindi readers.",
            ],
          },
          {
            heading: "My role",
            items: [
              "Project management: planned the build end to end, set milestones for the team of six, tracked progress through the five-day finale and owned the final presentation and documentation.",
              "Budgeting and procurement: managed the full project budget and handled all purchasing (sensors, hardware components and equipment), plus the team's travel to the Grand Finale in Chandigarh.",
              "Built the website using Python, HTML, CSS, Bootstrap and PHP.",
            ],
          },
          {
            heading: "Outcome",
            items: [
              "Team Hack Six won first prize (₹1 lakh) at the Grand Finale of the hardware edition, competing with 2,000+ students from 178 engineering colleges.",
            ],
          },
        ],
        gallery: [
          {
            src: sihWinners,
            alt: "Team Hack Six holding the Smart India Hackathon 2019 winner's cheque and trophy",
            caption: "Team Hack Six — winners, SIH 2019 Hardware Edition",
          },
          {
            src: sihProduct,
            alt: "The final water quality monitoring prototype: primary filter, sensing tank and control unit, with live readings on ThingSpeak",
            caption: "The final product — WAQM prototype",
          },
          {
            src: sihJury,
            alt: "Team presenting and demonstrating the prototype to the jury at the Grand Finale",
            caption: "Final presentation to the jury",
          },
          {
            src: sihNews,
            alt: "Newspaper clipping titled Hackathon winners about team Hack Six",
            caption: "In the news — “Hackathon winners”",
            anchorTop: true,
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
