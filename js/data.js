const portfolioData = {
    meta: {
        // Shared UI copy used across all cards.
        closeAriaLabel: "Close card",
    },

    hero: {
        name: "Simon Curran",
        alias: "@SimoSultan",
        tagline: "Software Consultant",
        ariaLabel: "Simon Curran hero card, press Enter to expand",
        avatarAlt: "Portrait of Simon Curran made with CSS",
    },

    about: {
        label: "Who am I",
        title: "My Story",
        accordionLabel: "About",
        summary:
            "Someone who is passionate about building solutions to solve problems.",
        full: "Started as a self taught programmer, ended up in a bootcamp with a Certificate IV in IT, to leading a team of engineers to deliver products and features for Entain. With the presence of quality AI in society, I am able to use my limited time to get the ideas in my head into real hands. Piquing the interest of my community to now develop theirs.",
        ariaLabel: "About me card, press Enter to expand",
    },

    projects: {
        label: "Some old and new ideas",
        title: "My Projects",
        accordionLabel: "Projects",
        summary: "A mix of older builds and newer AI-assisted work.",
        ariaLabel: "Projects card, press Enter to expand",
        listAriaLabel: "Selected projects",
        linkLabels: {
            github: "GitHub",
            live: "Live",
            reference: "Reference",
        },
        notMaintainedLabel: "Not maintained",
        withoutAI: [
            {
                name: "XLR8 Booking System",
                what: "A booking and admin system for my driving school business — the first thing I ever built, and from scratch. But knowing what I do now, I am very happy this never saw the light of day!",
                stack: ["HTML", "CSS", "JavaScript", "Firebase"],
                maintained: false,
            },
            {
                name: "CSS Avatar",
                what: "My developer account profile picture, created entirely from CSS during my studies.",
                stack: ["HTML", "SASS"],
                links: {
                    github: "https://github.com/SimoSultan/profile_avatar",
                    live: "https://codepen.io/simo_sultan/pen/JjGKBBj",
                },
                maintained: false,
            },
            {
                name: "PPMv1",
                what: "Finds common artists and songs between friends' Spotify playlists and builds a new playlist from them, before Spotify made this a thing. Built during my studies for a competition, which resulted in first place. ",
                stack: ["HTML", "CSS", "Bootstrap", "JavaScript"],
                links: {
                    github: "https://github.com/SimoSultan/spotify-party-playlist",
                    live: "https://spotify-party-playlist-maker.netlify.app/",
                },
                maintained: false,
            },
            {
                name: "Portfolio V2",
                what: "My most recent, but old, portfolio that was built during my studies to better understand React.",
                stack: ["React", "MaterialUI", "SASS"],
                links: {
                    github: "https://github.com/SimoSultan/portfolio_v2",
                    live: "https://simosultan2.netlify.app/",
                },
                maintained: false,
            },
            {
                name: "The Curtain Co",
                what: "An e-commerce app built for a client as our final assessment during my education.",
                stack: ["MongoDB", "Express", "React", "Node", "AWS", "PayPal"],
                links: {
                    github: "https://github.com/curtainCo/curtain_co_fe_prod",
                    live: "https://thecurtainco.netlify.app/",
                },
                maintained: false,
            },
        ],
        withAI: [
            {
                name: "Home Server",
                what: "My first foray into building a home server network. Took an old Windows Mini PC and converted it to a headless Ubuntu server running docker containers. Handling my media, privately built apps, local LLMs all via remote networking.",
                stack: ["Linux", "Docker", "OpenCode", "AI-assisted"],
                links: {
                    github: "https://github.com/SimoSultan/mini-server",
                    private: true,
                },
            },
            {
                name: "Body Corp Manager",
                what: "An internal app that I built for our apartment so we can track the ongoings of our body corp.",
                stack: ["NextJS", "Supabase", "Gemini API", "AI-assisted"],
                links: {
                    github: "https://github.com/SimoSultan/body-corp-manager",
                    private: true,
                },
            },
            {
                name: "Stock Analyzer",
                what: "Software that analyses all tickers, whether stocks or ETFs on your chosen stock market, against a predefined, but customisable rating system.",
                stack: ["Astro", "Python", "GHCR", "AI-assisted"],
                links: {
                    github: "https://github.com/SimoSultan/stock-analyzer",
                    private: true,
                },
            },
            {
                name: "Sixty6",
                what: "An exercise habit tracker ",
                stack: [
                    "React Native - Expo",
                    "Go",
                    "Postgres",
                    "OAuth",
                    "Amplitude",
                    "PostHog",
                    "AI-assisted"
                ],
                links: {
                    github: "https://github.com/SimoSultan/sixty6",
                    private: true,
                },
            },
            {
                name: "Portfolio Chatbot",
                what: "Working on another portfolio which has a chatbot in it.",
                stack: ["HTML", "CSS", "JavaScript", "Gemini API", "AI-assisted"],
                links: {
                    github: "https://github.com/SimoSultan/portfolio-chatbot",
                    private: true,
                },
            },
            {
                name: "Portfolio V3",
                what: "An updated portfolio for my recent work — designed and built as an interactive bento-grid experience. Simple but fun was the goal.",
                stack: ["HTML", "CSS", "JavaScript", "GSAP", "AI-assisted"],
                links: {
                    github: "https://github.com/SimoSultan/portfolio-v3",
                    live: "https://simoncurran.dev",
                },
            },
        ],
    },

    experience: {
        label: "career / education / AI",
        title: "Experience",
        accordionLabel: "Experience",
        summary:
            "Self taught, coding bootcamp, to leading a team of engineers, consultancy and developer.",
        ariaLabel: "Work experience card, press Enter to expand",
        listAriaLabel: "Work history",
        items: [
            {
                role: "Software and AI Consultant - Sole Trader",
                period: "2026 – Present",
                detail: "Gaining knowledge from building my home server allowed me the opportunity to design and build local AI solutions for businesses.",
            },
            {
                role: "App Developer - Sole Trader",
                period: "2026 – Present",
                detail: "Using the home server I just built, I was able to build out web and native apps for publishing on Google Play Store and Apple App Store",
            },
            {
                role: "AI - Personal",
                period: "May 2026 – Oct 2026",
                detail: "During my parental leave, when I had time, I built a home server for media, node networking, installed local LLMs for personal development which aided me to build out the software from this year.",
            },
            {
                role: "AI - Entain",
                period: "2025 – Present",
                detail: "Within the comapany's tech team I tested and built out AI software infrastructure. Trained and upskilled my product teams' processes.",
            },
            {
                role: "Senior Engineer - Entain",
                period: "2025 - Present",
                detail: "Led complex features end-to-end, built core and racing design-system for web. Mentored engineers across web and native platforms. Trialled ",
            },
            {
                role: "Mid-level Frontend Engineer - Entain",
                period: "2022 – 2025",
                detail: "Delivered core features for high-traffic consumer products, built reusable components, and improved E2E test quality.",
            },
            {
                role: "Junior / Graduate Engineer",
                period: "2021 – 2022",
                detail: "Started in a technical support rotation, moved into product teams, and rapidly upskilled in React Native and TypeScript.",
            },
            {
                role: "Student",
                period: "2021",
                detail: "Graduated Coder Academy bootcamp with a Certificate IV in IT.",
            },
            {
                role: "Student",
                period: "2014",
                detail: "Graduated UQ with a Bachelor of Civil Engineering.",
            },
        ],
    },

    contact: {
        label: "Contact",
        title: "Let's Talk",
        accordionLabel: "Contact",
        summary: "Have a project, role or idea? I would love to hear from you.",
        email: "simosultan2020@gmail.com",
        github: "https://github.com/SimoSultan",
        ariaLabel: "Contact card, press Enter to expand",
        // {{email}} is replaced at render time with the email address above.
        fullText: "Email me at {{email}} or find me on GitHub.",
        actions: [
            {
                label: "Email me",
                ariaLabel: "Send Simon an email",
                key: "email",
            },
            {
                label: "GitHub",
                ariaLabel: "Visit Simon's GitHub",
                key: "github",
                external: true,
            },
        ],
    },
};
