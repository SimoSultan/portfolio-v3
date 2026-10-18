const portfolioData = {
  hero: {
    name: 'Simon Curran',
    alias: 'SimoSultan',
    tagline: 'Software Consultant',
  },
  about: {
    label: 'my story',
    title: 'Who I Am',
    summary: 'Easy! For the creativity and problem solving.',
    full: `<p>Why did I become a developer you ask? Easy! For the creativity and problem solving. Coding is like a Maxibon — it's better than the sum of its parts, where each part is creativity and problem solving.</p>
           <p>I love the highs, learn a lot from the lows, and find the community and diversity surrounding tech to be like home.</p>
           <p>Check out my work on <a href="https://github.com/SimoSultan" target="_blank" rel="noopener noreferrer">GitHub</a>.</p>`,
  },
  projects: {
    label: 'some projects',
    title: 'My Works',
    summary: 'A mix of older builds and newer AI-assisted work.',
    withoutAI: [
      {
        name: 'XLR8 Booking System',
        what: 'A booking and admin system for my business — the first thing I ever built from scratch.',
        stack: ['HTML5', 'CSS3', 'JavaScript', 'Firebase'],
      },
      {
        name: 'DLM',
        what: 'A two-way marketplace web-app for learners and driving instructors to book driving lessons.',
        stack: ['Rails', 'Bootstrap', 'PostgreSQL', 'AWS'],
        links: { github: 'https://github.com/SimoSultan/dlm', live: 'https://driving-lesson-marketplace.herokuapp.com/' },
      },
      {
        name: 'CSS Avatar',
        what: 'My developer account profile picture, created entirely from CSS.',
        stack: ['HTML5', 'SASS'],
        links: { github: 'https://github.com/SimoSultan/profile_avatar', live: 'https://codepen.io/simo_sultan/pen/JjGKBBj' },
      },
      {
        name: 'Calculator',
        what: 'A simple calculator built to understand how a computer handles basic arithmetic.',
        stack: ['HTML5', 'CSS3', 'JavaScript'],
        links: { github: 'https://github.com/SimoSultan/calculator', live: 'https://simosultan-calculator.netlify.app/' },
      },
      {
        name: 'PPMv1',
        what: 'Finds common artists and songs between friends\' Spotify playlists and builds a new playlist from them.',
        stack: ['HTML5', 'CSS3', 'Bootstrap', 'JavaScript'],
        links: { live: 'https://spotify-party-playlist-maker.netlify.app/' },
      },
      {
        name: 'PPMv2',
        what: 'The MERN-stack remake of PPMv1, adding Spotify authentication and rewriting the guest experience.',
        stack: ['MongoDB', 'Express', 'React', 'Node'],
        links: { github: 'https://github.com/SimoSultan/PPMv2', live: 'https://ppmv2.netlify.app/' },
      },
      {
        name: 'Portfolio V2',
        what: 'My long-time-in-the-making React portfolio, predecessor to the site you are looking at now.',
        stack: ['React', 'MaterialUI', 'SASS'],
        links: { github: 'https://github.com/SimoSultan/portfolio_v2' },
      },
      {
        name: 'The Curtain Co',
        what: 'An e-commerce app built for a real client in a team of two over a Christmas break.',
        stack: ['MongoDB', 'Express', 'React', 'Node', 'AWS', 'PayPal'],
        links: { github: 'https://github.com/curtainCo/curtain_co_fe_prod', live: 'https://thecurtainco.netlify.app/' },
      },
    ],
    withAI: [
      {
        name: 'Portfolio V3',
        what: 'An updated portfolio for updated works — designed and built as an interactive bento-grid experience with AI assistance.',
        stack: ['HTML5', 'CSS3', 'JavaScript', 'GSAP', 'AI-assisted'],
        links: { github: 'https://github.com/SimoSultan/portfolio-v3' },
      },
    ],
  },
  experience: {
    label: 'career / education / AI',
    title: 'Experience',
    summary: 'Senior frontend engineer with a path that started in support and grew into product engineering.',
    items: [
      {
        role: 'Software Consultant',
        period: 'Present',
        detail: 'Helping teams ship reliable frontend products, design systems and testing infrastructure.',
      },
      {
        role: 'Senior Frontend Engineer',
        period: '2025',
        detail: 'Led complex features end-to-end, became a core design-system reviewer, and mentored engineers across web and native platforms.',
      },
      {
        role: 'Mid-level Frontend Engineer',
        period: '2022 – 2025',
        detail: 'Delivered core features for high-traffic consumer products, built reusable components, and improved E2E test quality.',
      },
      {
        role: 'Junior / Graduate Engineer',
        period: '2021 – 2022',
        detail: 'Started in a technical support rotation, moved into product teams, and rapidly upskilled in React Native and TypeScript.',
      },
    ],
  },
  contact: {
    label: 'Contact',
    title: "Let's Talk",
    summary: 'Have a project, role or idea? I would love to hear from you.',
    email: 'simosultan2020@gmail.com',
    github: 'https://github.com/SimoSultan',
  },
};
