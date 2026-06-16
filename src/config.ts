const base = import.meta.env.BASE_URL;

export const config = {
    developer: {
        name: "Redoyanul",
        fullName: "Redoyanul Haque",
    },
    social: {
        github: "red1-for-hek",
        email: "redoyanul1234@gmail.com",
        location: "Bangladesh",
    },
    contact: {
        email: "redoyanul1234@gmail.com",
        github: "https://github.com/red1-for-hek",
        linkedin: "https://linkedin.com/in/red1-for-hek",
        twitter: "https://x.com/red_1_ul",
        facebook: "https://www.facebook.com/redoyanulhaque.hacker.official",
        instagram: "https://www.instagram.com/red_1_ul",
    },
    experiences: [
        { period: "2025 - Present", location: "Bangladesh", technologies: ["Research", "Innovation", "Open Source", "New Tech"] },
        { period: "2025",           location: "Bangladesh", technologies: ["Python", "TensorFlow", "PyTorch", "LLMs", "NLP", "AI Agents"] },
        { period: "2024",           location: "Bangladesh", technologies: ["React", "Node.js", "MongoDB", "Express", "Next.js", "TypeScript"] },
        { period: "2023",           location: "Bangladesh", technologies: ["Python", "Automation", "Scripting", "Discord.py", "Problem Solving"] },
        { period: "2022",           location: "Bangladesh", technologies: ["Photoshop", "Illustrator", "Canva", "Figma", "Visual Design"] },
        { period: "2021",           location: "Bangladesh", technologies: ["MS Word", "MS Excel", "MS PowerPoint", "Computer Basics"] },
    ],
    projects: [
        { id: 1, title: "Drishti",                       image: `${base}images/drishti.png`,    technologies: "Python, PyTorch, Transformers, FastAPI, React, MongoDB" },
        { id: 2, title: "VoteChain",                     image: `${base}images/votechain.png`,  technologies: "Solidity, Web3.js, React, Ethereum, IPFS, MetaMask, Node.js" },
        { id: 3, title: "EIE - Earthquake Impact Estimator", image: `${base}images/eie.png`,   technologies: "Arduino, C++, IoT Sensors, Python, ML, React" },
        { id: 4, title: "GameKroy",                      image: `${base}images/gamekroy.png`,   technologies: "React, Node.js, MongoDB, Express, Stripe, TailwindCSS" },
        { id: 5, title: "RedxChess",                     image: `${base}images/redxchess.png`,  technologies: "Python, C++, Neural Networks, Bitboards, UCI Protocol" },
        { id: 6, title: "Floodhub",                      image: `${base}images/floodhub.png`,   technologies: "Python, TensorFlow, Pandas, React, FastAPI, GIS" },
        { id: 7, title: "Phoenix",                       image: `${base}images/phoenix.png`,    technologies: "Python, Speech Recognition, PyAutoGUI, OpenAI API, Tkinter" },
        { id: 8, title: "HekTools",                      image: `${base}images/hektools.png`,   technologies: "Kotlin, Android SDK, Firebase, Python, Encryption" },
    ],
    skills: {
        develop: {
            tools: ["Python", "TensorFlow", "PyTorch", "OpenCV", "Scikit-learn", "LLMs", "NLP", "Deep Learning", "Chatbots", "AI Agents"],
        },
        design: {
            tools: ["React", "Next.js", "Node.js", "TypeScript", "MongoDB", "PostgreSQL", "TailwindCSS", "REST APIs", "Docker", "Git"],
        },
    },
};
