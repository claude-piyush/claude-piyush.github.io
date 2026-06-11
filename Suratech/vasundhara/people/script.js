(() => {
    'use strict';

    // ---------- Mobile nav ----------
    const navToggle = document.getElementById('navToggle');
    const navMobile = document.getElementById('navMobile');

    const setNav = (open) => {
        navMobile.classList.toggle('open', open);
        navMobile.hidden = !open;
        navToggle.setAttribute('aria-expanded', String(open));
        navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
        navToggle.innerHTML = open
            ? '<i class="fa-solid fa-xmark" aria-hidden="true"></i>'
            : '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
    };

    navToggle.addEventListener('click', () => setNav(!navMobile.classList.contains('open')));
    navMobile.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setNav(false)));

    // ---------- Helpers ----------
    const escapeHtml = str => String(str ?? '').replace(/[&<>"']/g, c => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));

    const initials = name => {
        const parts = String(name || '').replace(/[^\w\s]/g, ' ').split(/\s+/).filter(Boolean);
        return parts.slice(0, 2).map(w => w[0] || '').join('').toUpperCase() || '?';
    };

    const socialIcon = (key) => ({
        linkedin: 'fa-brands fa-linkedin-in',
        twitter: 'fa-brands fa-x-twitter',
        facebook: 'fa-brands fa-facebook-f',
        github: 'fa-brands fa-github',
        instagram: 'fa-brands fa-instagram',
        youtube: 'fa-brands fa-youtube',
        website: 'fa-solid fa-globe'
    }[key] || 'fa-solid fa-link');

    const monthIdx = (m) => {
        const map = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };
        return map[m] ?? 0;
    };

    const calcTenure = (startDate) => {
        if (!startDate || !startDate.year) return null;
        const start = new Date(startDate.year, startDate.month ? monthIdx(startDate.month) : 0, 1);
        const now = new Date();
        const months = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
        if (months < 0) return 'New';
        if (months < 1) return 'Just joined';
        const yrs = Math.floor(months / 12);
        const mos = months % 12;
        if (yrs >= 1) return `${yrs} yr${yrs > 1 ? 's' : ''}${mos > 0 ? ` ${mos} mo` : ''}`;
        return `${mos} mo${mos > 1 ? 's' : ''}`;
    };

    const cleanName = name => String(name || '').replace(/[💫✨🚀]/g, '').trim();

    // Find Vasundhara position for each person
    const getVasundharaJob = (p) => {
        const all = p.experience || p.currentPosition || [];
        return all.find(j => j.companyId === '3327183' && (j.endDate?.text === 'Present' || !j.endDate?.month))
            || all.find(j => j.companyId === '3327183');
    };

    // ---------- Specialties cloud ----------
    const specialties = [
        { name: 'Mobile App Development', icon: 'fa-mobile-screen' },
        { name: 'Game Development', icon: 'fa-gamepad' },
        { name: 'Unity 3D Games', icon: 'fa-cube' },
        { name: 'Web Design & Development', icon: 'fa-code' },
        { name: 'UI/UX Design', icon: 'fa-pen-ruler' },
        { name: 'SEO', icon: 'fa-magnifying-glass-chart' },
        { name: 'QA Services', icon: 'fa-clipboard-check' },
        { name: 'NFT Development', icon: 'fa-link' },
        { name: 'AI Automation', icon: 'fa-robot' },
        { name: 'AI-Powered Apps', icon: 'fa-wand-magic-sparkles' },
        { name: 'Custom AI Software', icon: 'fa-microchip' },
        { name: 'AI Chatbots', icon: 'fa-comments' },
        { name: 'Machine Learning', icon: 'fa-brain' }
    ];

    document.getElementById('specialtyCloud').innerHTML = specialties.map(s =>
        `<span class="specialty-pill"><i class="fa-solid ${s.icon}" aria-hidden="true"></i>${escapeHtml(s.name)}</span>`
    ).join('');

    // ---------- Profile data ----------
    const people = [
        {
            id: 'ashish-narola', publicId: 'ashishnarola',
            name: 'Ashish Narola', cleanedName: 'Ashish Narola',
            title: 'Chief Executive Officer',
            subtitle: 'Helping Global Businesses Simplify, Scale & Grow with IT & AI',
            photo: 'https://media.licdn.com/dms/image/v2/D4D03AQEbu9Hiy1gD8A/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1666077155145?e=1782950400&v=beta&t=_M9BIYC5gr1LOx13mTSA7euwkcyr4PGew4ICvaW3s2E',
            location: 'Surat, GJ, IN', verified: true, leader: true,
            tenureStart: { month: 'Oct', year: 2005 },
            connections: 14731, followers: 17330,
            links: { linkedin: 'https://www.linkedin.com/in/ashishnarola', twitter: 'https://twitter.com/narolainfotech' },
            about: "Note: This profile appears to be cross-listed. Ashish Narola is the CEO & Co-founder of Narola Infotech, leading global IT and AI-driven business growth.",
            jobs: [
                { role: 'Chief Executive Officer', company: 'Vasundhara Infotech', start: 'Oct 2005', end: 'Present', current: true }
            ],
            education: ['Bachelor of Engineering · Lukhdhirji Engineering College, Morbi (1997–2001)'],
            skills: ['Global Business Development', 'Marketing', 'Entrepreneurship', 'Business Strategy', 'IT Consulting', 'Custom Software Development'],
            recommendationCount: 13
        }
    ];

    // Real Vasundhara profiles from data
    const rawProfiles = [
        {
            id: 'shruti-dodiya', name: 'Shruti Dodiya', title: 'Sr. MERN Stack Developer',
            subtitle: 'Expert in Next.js, Node.js, MongoDB, MySQL, Web3, Bootstrap',
            photo: 'https://media.licdn.com/dms/image/v2/D4D03AQF-1luHje9Q0A/profile-displayphoto-crop_800_800/B4DZ5qkIm4KUAI-/0/1779904322745?e=1782950400&v=beta&t=MzOqbhkj6Mj0G9D-jTrYtFvc5fPKI0V7QbAKdTG6YUQ',
            location: 'Surat, GJ, IN', openToWork: true,
            tenureStart: { month: 'Jun', year: 2025 },
            connections: 485, followers: 498,
            links: { linkedin: 'https://www.linkedin.com/in/shruti-dodiya' },
            about: "As a diligent and dedicated developer, I've built hands-on expertise in creating responsive, user-friendly, and high-performance web applications. Frontend: HTML5, CSS3, Bootstrap 5, TailwindCSS, React.js, Next.js. Backend: Node.js. Databases: MongoDB, MySQL. Web3: Blockchain smart contract integration using Wagmi, Web3.js, and Ethers.js.",
            jobs: [
                { role: 'Sr. MERN Stack Developer', company: 'Vasundhara Infotech', start: 'Jun 2025', end: 'Present', current: true },
                { role: 'Full-stack Developer', company: 'Rain Infotech Private Limited', start: 'Jun 2022', end: 'Apr 2025' }
            ],
            education: ['BCA Computer Software Engineering · Sutex Bank College (2019–2022)'],
            skills: ['React.js', 'Node.js', 'Next.js', 'MERN Stack', 'MySQL', 'MongoDB', 'TypeScript', 'Web3', 'Bootstrap', 'Tailwind CSS', 'REST APIs', 'JavaScript']
        },
        {
            id: 'chirag-pipaliya', name: 'Chirag Pipaliya', title: 'Board Member',
            subtitle: 'CEO @ Vehicleinfo · Co-Founder Vasundhara Infotech',
            photo: 'https://media.licdn.com/dms/image/v2/C5603AQHqIh75o40KYw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1662008170249?e=1782950400&v=beta&t=ToTwWowvafa-HlIz4WlIZMxslGDEA6Q5_-E06jqGBWM',
            location: 'Surat, GJ, IN', verified: true, leader: true, creator: true,
            tenureStart: { month: 'Oct', year: 2013 },
            connections: 29998, followers: 31060,
            links: { linkedin: 'https://www.linkedin.com/in/chiragpipaliya', website: 'https://vehicleinfo.app' },
            about: "Co-founder & former CEO of Vasundhara Infotech (2013-2025), currently CEO & Founder of VehicleInfo. Passionate about bringing transparency, accessibility, and trust to vehicle-related data across India and beyond.",
            jobs: [
                { role: 'Board Member', company: 'Vasundhara Infotech', start: 'Apr 2025', end: 'Present', current: true },
                { role: 'Chief Executive Officer', company: 'Vasundhara Infotech', start: 'Oct 2013', end: 'Mar 2025' },
                { role: 'Chief Executive Officer', company: 'Vehicleinfo', start: 'Apr 2025', end: 'Present', current: true },
                { role: 'iOS Developer', company: 'Dignizant Technologies', start: 'Sep 2012', end: 'Sep 2013' }
            ],
            education: ['Bachelor of Engineering · Bhagwan Mahavir College (2008–2012, Distinction)', 'HSC Science · Gajera Vidhyabhavan (2006–2008)'],
            skills: ['C++', 'iPhone', 'Objective-C', 'Xcode', 'Android', 'Android Development', 'Mobile Applications', 'iOS Development', 'Game Development'],
            languages: ['English (Professional)', 'Gujarati', 'Hindi'],
            recommendationCount: 4,
            honors: ['Computer Engineer · GTU (2012)']
        },
        {
            id: 'milan-lukhi', name: 'Milan Lukhi', title: 'Sr MERN Stack Developer',
            subtitle: 'Full-Stack Engineer · 3.9+ Years Delivering Business Solutions',
            photo: 'https://media.licdn.com/dms/image/v2/D4D03AQEg6bZ4rmjYtA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1718291183243?e=1782950400&v=beta&t=uBL7DpmLYcUMSp59lerGWvaoRneGaOk2HlBlhAMtnVk',
            location: 'Surat, GJ, IN', verified: true,
            tenureStart: { month: 'Mar', year: 2024 },
            connections: 1930, followers: 1931,
            links: { linkedin: 'https://www.linkedin.com/in/milan-lukhi-83556a14b' },
            about: "Senior web developer with 3+ years of experience working with mid-large-sized corporations around the world. Significant knowledge of web design from scratch and API development/customization.",
            jobs: [
                { role: 'Sr MERN Stack Developer', company: 'Vasundhara Infotech', start: 'Mar 2024', end: 'Present', current: true },
                { role: 'Web Developer', company: 'Nucleus Lab', start: 'Jan 2023', end: 'Dec 2023' },
                { role: 'Web Developer', company: 'WeeTech Solution Pvt Ltd', start: 'Aug 2021', end: 'Jan 2023' },
                { role: 'MERN Stack Developer (Intern)', company: 'WHITELION INFOSYSTEMS', start: 'Jan 2021', end: 'Jul 2021' }
            ],
            education: ['BTech Computer Engineering · Uka Tarsadia University (2018–2021)', 'Diploma Computer Engineering · Uka Tarsadia (2015–2017)'],
            skills: ['REST APIs', 'MERN Stack', 'React.js', 'JavaScript', 'Node.js', 'NestJS', 'MongoDB', 'TypeScript', 'Socket.io', 'GitHub', 'Team Leadership']
        },
        {
            id: 'prafull-shelke', name: 'Prafull Shelke', title: 'UI/UX Designer',
            subtitle: 'User-Centered Design · Research · Wireframing · Prototyping',
            photo: 'https://media.licdn.com/dms/image/v2/D5603AQHoTAVWgYl6WQ/profile-displayphoto-shrink_100_100/B56ZfqIiuTHoAU-/0/1751979803752?e=1782950400&v=beta&t=8fX4beSM5OfqvsY-TvMONqsyiFkDPW4-S9IkygtM6rM',
            location: 'Surat, GJ, IN',
            tenureStart: { month: 'Sep', year: 2025 },
            connections: 1435, followers: 1426,
            links: { linkedin: 'https://www.linkedin.com/in/uiux-designer-prafull-shelke' },
            about: "Seasoned UX Designer with expertise in creating stunning web, SaaS dashboards, Android, and iOS apps. Solid understanding of UI Design basics such as grids, typography, and visual hierarchy.",
            jobs: [
                { role: 'UI/UX Designer', company: 'Vasundhara Infotech', start: 'Sep 2025', end: 'Present', current: true },
                { role: 'UI/UX Designer', company: 'Vinaz Infotech', start: 'Jan 2024', end: 'Aug 2025' },
                { role: 'UI/UX Designer', company: 'Hexotix', start: 'Feb 2022', end: 'May 2023' },
                { role: 'UI Designer (Intern)', company: 'SpacECE India Foundation', start: 'Oct 2021', end: 'Jan 2022' }
            ],
            education: ["Bachelor's in Computer Science · North Maharashtra University (2014–2017)"],
            skills: ['Visual Design', 'Interaction Design', 'Information Architecture', 'User Research', 'Wireframing', 'Prototyping', 'Collaboration', 'User Testing']
        },
        {
            id: 'nihir-sangani', name: 'Nihir Sangani', title: 'UI/UX Designer',
            subtitle: 'Product Designer · Visual & Branding Specialist · Graphic Designer',
            photo: 'https://media.licdn.com/dms/image/v2/D4D03AQEyCu07L3ZTsA/profile-displayphoto-crop_800_800/B4DZhBPkIpGQAQ-/0/1753441256476?e=1782950400&v=beta&t=sJyYRJDHbn7xr57sxGIiddeouv570DawnlVaJLB9TUY',
            location: 'Surat, GJ, IN', verified: true, openToWork: true,
            tenureStart: { month: 'Jan', year: 2026 },
            connections: 2066, followers: 2072,
            links: { linkedin: 'https://www.linkedin.com/in/nihir-sangani-20b4b8201' },
            about: "UI/UX Designer specializing in creating user-centered, accessible, and visually captivating digital experiences. Currently pursuing a Master's in UI/UX and Graphic Design at Red & White Skill Education.",
            jobs: [
                { role: 'UI/UX Designer', company: 'Vasundhara Infotech', start: 'Jan 2026', end: 'Present', current: true },
                { role: 'UI/UX Designer', company: 'Semicolon Solution', start: 'Feb 2025', end: 'Jan 2026' },
                { role: 'UI/UX Designer (Intern)', company: 'Zidio Development', start: 'Dec 2024', end: 'Feb 2025' }
            ],
            education: ['Master In UI/UX & Graphic Design · Red & White Skill Education (2024–2025, A+)', '12th Commerce · GSEB'],
            skills: ['Figma', 'Adobe Photoshop', 'Adobe Illustrator', 'Adobe XD', 'After Effects', 'CorelDRAW', 'Design Thinking', 'Product Design', 'Wireframing & Prototyping', 'User Research', 'Branding & Identity', 'UI Design'],
            projects: ['HEALTH SYNC · Smart HealthCare App']
        },
        {
            id: 'agnesh-pipaliya', name: 'Agnesh Patel', title: 'COO',
            subtitle: 'Owner · Co-founder',
            photo: 'https://media.licdn.com/dms/image/v2/C4D03AQHrSTxiJfMKzA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1649931550339?e=1782950400&v=beta&t=yvJgEkviqd7Kz14n4m1nTWhch2HH_J5sdt4wxaK7M88',
            location: 'Surat, GJ, IN', leader: true,
            tenureStart: { month: 'Oct', year: 2012 },
            connections: 14190, followers: 15158,
            links: { linkedin: 'https://www.linkedin.com/in/agnesh-pipaliya' },
            about: "Co-founder at Vasundhara Infotech. We are providing Mobile App, Game and Web Development services. Team includes 35+ professional mobile developers, 15+ designers, 10+ web developers, 10+ game developers focused on delivering high-quality code, design, functionality, user-friendliness.",
            jobs: [
                { role: 'Owner', company: 'Vasundhara Infotech', start: 'Oct 2012', end: 'Present', current: true },
                { role: 'Owner', company: 'Vasundhara Vision', start: 'Oct 2012', end: 'Present', current: true }
            ],
            education: ['Bachelor of Engineering · Bhagvan Mahavir College of Engg & Tech (2008–2012)', 'HSC · Gajera Vidhyabhavn (2006–2008)'],
            skills: ['Mobile Applications', 'Android', 'iPhone', 'PHP', 'JSON', 'Web Development', 'iOS Development', 'Android SDK', 'Swift', 'Game Development', 'Augmented Reality (AR)', 'Virtual Reality (VR)', '3D Animation', '3D Modeling'],
            languages: ['English (Professional)', 'Gujarati (Native)', 'Hindi (Native)'],
            honors: ['Computer Engineer Graduation · GTU (2012)', 'Always Distinction · GHSEB (2008)'],
            projects: ['Car Racing On Impossible Tracks', 'Mountain Climb Jeep Simulator', 'Math Games - Maths Tricks', 'Highway Traffic Rider - 3D Bike Racing', '3D Rolling Ball', 'Car Crash Simulator', 'Tricky Bike Racing With Crazy Rider 3D']
        },
        {
            id: 'pinal-ratanpara', name: 'Pinal Ratanpara', title: 'Digital Marketing Executive',
            subtitle: 'Meta Ads · Google Ads · ASO',
            photo: 'https://media.licdn.com/dms/image/v2/D4D03AQFPGfuLiWx29g/profile-displayphoto-scale_100_100/B4DZmQ3KZ4JYAc-/0/1759072004915?e=1782950400&v=beta&t=Y5xdazNPBvMAEg7Iq5sdXJOgycbVDHZ93ExP2DY1cg4',
            location: 'Surat, GJ, IN', creator: true,
            tenureStart: { month: 'Dec', year: 2024 },
            connections: 1804, followers: 2149,
            links: { linkedin: 'https://www.linkedin.com/in/pinal-ratanpara' },
            jobs: [
                { role: 'Digital Marketing Executive', company: 'Vasundhara Infotech', start: 'Dec 2024', end: 'Present', current: true },
                { role: 'Digital Marketing Executive (Trainee)', company: 'Vasundhara Infotech', start: 'Sep 2024', end: 'Nov 2024' }
            ],
            education: ['MBA in Marketing · NMIMS CDOE (2025–2027)', 'Digital Marketing · Ahmedabad School of Digital Marketing (2024)'],
            certifications: ['Social Media Certified · HubSpot (2024)', 'Google Ads Expert (2024)', 'Meta Ads Expert (2024)', 'Social Media Expert (2024)'],
            skills: ['App Store Optimization', 'Social Media Marketing', 'Google Ads', 'Meta Ads']
        },
        {
            id: 'harsh-prajapati', name: 'Harsh Prajapati', title: 'Sr. Backend Team Leader & Server Specialist',
            subtitle: 'Python · Django · Node.js · React · AWS · AI',
            photo: 'https://media.licdn.com/dms/image/v2/D4D03AQEq3vRT66FcYw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1699789690975?e=1782950400&v=beta&t=81pC6NxlIgpPvZQVDfBufwch57LK30c9KQmgh9OA7Es',
            location: 'Surat, GJ, IN', creator: true,
            tenureStart: { month: 'Aug', year: 2020 },
            connections: 848, followers: 1160,
            links: { linkedin: 'https://www.linkedin.com/in/harsh-prajapati' },
            about: "Software engineer working as Python developer for Vasundhara Infotech. Currently exploring Gen AI and AI Workflows. Tech Stack: Python, PHP, Node JS, React JS, Django, Flask, REST API, MySQL, PostgreSQL, MongoDB, AWS.",
            jobs: [
                { role: 'Sr. Backend Team Leader & Server Specialist', company: 'Vasundhara Infotech', start: 'Nov 2023', end: 'Present', current: true },
                { role: 'Sr. Python & Node.js Developer | Team Leader', company: 'Vasundhara Infotech', start: 'Oct 2022', end: 'Oct 2023' },
                { role: 'Python Developer Executive & SUB Team Leader', company: 'Vasundhara Infotech', start: 'Oct 2021', end: 'Oct 2022' },
                { role: 'Jr. Python Developer', company: 'Vasundhara Infotech', start: 'Aug 2020', end: 'Oct 2021' },
                { role: 'PHP Web Developer', company: 'Andromedatech PVT. LTD.', start: 'Jun 2019', end: 'Jul 2019' }
            ],
            education: ['Bachelor of Engineering · GTU (2016–2020)'],
            certifications: ['Python With Data Science (2020)', 'AWS Cloud Platform Session (2022)', 'Python 3 Tutorial · Sololearn (2020)'],
            skills: ['AWS', 'Node.js', 'React.js', 'Amazon ECS', 'Python', 'Django', 'Django REST Framework', 'Nginx', 'DevOps', 'Machine Learning', 'Team Leadership', 'Web Development', 'Software Development', 'Git', 'GitHub'],
            languages: ['English (Professional)', 'Gujarati', 'Hindi'],
            recommendationCount: 3,
            projects: ['YouTube Playlist Download · Python', 'Keyboard Navigation Keys Control With OpenCV']
        },
        {
            id: 'akshay-roy', name: 'Akshay Roy', title: 'Flutter Developer',
            subtitle: 'Php · Java · C++ · Html · Css',
            photo: 'https://media.licdn.com/dms/image/v2/D4D03AQHDHVbNpxDoww/profile-displayphoto-crop_800_800/B4DZue7a2vG8AI-/0/1767897936515?e=1782950400&v=beta&t=YnXKL2fi-1Ssy-NZ_okeMxWgCekXslaCc3m-iX7N4pw',
            location: 'Surat, GJ, IN', openToWork: true,
            tenureStart: { month: 'Oct', year: 2025 },
            connections: 6252, followers: 6387,
            links: { linkedin: 'https://www.linkedin.com/in/akshay-roy-72a476255' },
            about: "Passionate Flutter Developer with 1+ years of experience in building high-performance cross-platform mobile applications. Proficient in Dart, Firebase, and state management solutions like Getx.",
            jobs: [
                { role: 'Flutter Developer', company: 'Vasundhara Infotech', start: 'Oct 2025', end: 'Present', current: true },
                { role: 'Flutter Developer', company: 'MTZINFOTECH', start: 'May 2024', end: 'Sep 2025' },
                { role: 'Flutter Developer (Intern)', company: 'Karon InfoTech', start: 'Nov 2023', end: 'Apr 2024' }
            ],
            education: ['BCA Computer Programming · VNSGU Surat (2021–2024)'],
            skills: ['Flutter', 'Dart', 'Firebase', 'Cloud Firestore', 'XAMPP', 'GitHub', 'Bitbucket', 'Xcode', 'Java', 'C++', 'PHP', 'CSS', 'HTML'],
            projects: ['AI Antique Identifier · Vintage Scanner', 'All In One Calculator App', 'Taller · Height Growth Prediction App']
        },
        {
            id: 'darshan-hirapara', name: 'Darshan Hirapara', title: 'Senior Flutter Developer',
            subtitle: 'Top Rated Freelancer · Firebase · Socket · Node.js · MongoDB',
            photo: 'https://media.licdn.com/dms/image/v2/D4D03AQFRTCobx_yWBg/profile-displayphoto-crop_800_800/B4DZfGEAtXGkAI-/0/1751374630325?e=1782950400&v=beta&t=CUNGSCSFWO-GxPrwAn2K5vsuQuZTTM8uLmlwEbRKYHQ',
            location: 'Ahmedabad, GJ, IN', verified: true, openToWork: true, creator: true,
            tenureStart: { month: 'Oct', year: 2025 },
            connections: 1446, followers: 1473,
            links: { linkedin: 'https://www.linkedin.com/in/darshan-hirapara-2356b5233' },
            about: "Experienced Flutter developer with over 3 years of expertise in delivering high-quality mobile applications and websites. Specializes in UX/UI, pixel-perfect layouts, and cross-platform development.",
            jobs: [
                { role: 'Senior Flutter Developer', company: 'Vasundhara Infotech', start: 'Oct 2025', end: 'Present', current: true },
                { role: 'Senior Flutter Developer', company: '28 Infotech', start: 'Oct 2023', end: 'Sep 2025' },
                { role: 'Flutter Developer', company: 'Rejoicehub LLP', start: 'May 2022', end: 'Oct 2023' },
                { role: 'Flutter Developer', company: 'XITIJ INFOTECH', start: 'Nov 2021', end: 'Apr 2022' }
            ],
            education: ['Bachelor of Applied Science · Bhagvan Mahavir Polytechnic (2018–2022)', 'Red & White Skill Education'],
            skills: ['Flutter', 'Dart', 'Firebase', 'Socket.io', 'Node.js', 'MongoDB', 'MySQL', 'Java', 'iOS', 'Swift', 'C++', 'C#', 'Project Management']
        },
        {
            id: 'dhvani-modi', name: 'Dhvani Modi', title: 'Human Resources Executive',
            subtitle: 'HR · Recruitment · Employee Engagement',
            photo: 'https://media.licdn.com/dms/image/v2/D4E03AQFYaL83fjNUMQ/profile-displayphoto-crop_800_800/B4EZvWGwYLI8Bo-/0/1768823655232?e=1782950400&v=beta&t=3aSQX0bDOvqggzHS2yVZ_bRPeF5QRmG7y_6lqSVvRPc',
            location: 'Surat, GJ, IN', hiring: true,
            tenureStart: { month: 'Jan', year: 2026 },
            connections: 2084, followers: 2467,
            links: { linkedin: 'https://www.linkedin.com/in/dhvani-modi-02a16b3a7' },
            jobs: [
                { role: 'Human Resources Executive', company: 'Vasundhara Infotech', start: 'Jan 2026', end: 'Present', current: true },
                { role: 'Human Resources Trainee', company: 'MULTIGRAIN FOOD PVT. LTD. (Atul Bakery)', start: 'May 2023', end: 'Jun 2023' }
            ],
            education: ['Masters in Human Resource Development · VNSGU Surat (2022–2024)', 'B.Com Accountancy · SPB English Medium College (2019–2022)'],
            skills: ['HR Management', 'Professional Skills', 'Business Communications', 'Human Resource Development', 'Problem Solving', 'Decision-Making', 'Leadership', 'Teamwork']
        },
        {
            id: 'somish-kakadiya', name: 'Somish Kakadiya', title: 'Chief Marketing Officer',
            subtitle: 'Co-Founder · Unity 3D · Android',
            photo: 'https://media.licdn.com/dms/image/v2/D5603AQHWeVLdm2uKjQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1662007817444?e=1782950400&v=beta&t=KKHmADOys2QpKTPUcu-GRjf5pLF2twffd5oy2WX6oyE',
            location: 'Surat, GJ, IN', leader: true,
            tenureStart: { month: 'Jul', year: 2014 },
            connections: 15197, followers: 15094,
            links: { linkedin: 'https://www.linkedin.com/in/somish-kakadiya' },
            jobs: [
                { role: 'Chief Marketing Officer', company: 'Vasundhara Infotech', start: 'Jul 2014', end: 'Present', current: true },
                { role: 'Unity 3D Developer', company: 'Vasundhara Infotech', start: 'Mar 2016', end: 'Jul 2021' },
                { role: 'Android Developer', company: 'Vasundhara Infotech (Vision)', start: 'Sep 2013', end: 'Mar 2016' },
                { role: 'Android Developer', company: 'Dignizant Technologies', start: 'Aug 2012', end: 'Sep 2013' }
            ],
            education: ["Bachelor's · Sarvajanik College of Engineering & Technology (2007–2011)", 'P V Modi Rajkot (2005–2007)'],
            skills: ['Android Development', 'IBM Mainframe', 'Java', 'C', 'C++', 'iPhone', 'Objective-C', 'Xcode', 'Microsoft SQL Server', 'Android', 'MySQL']
        },
        {
            id: 'parth-savaliya', name: 'Parth Savaliya', title: 'Flutter Developer',
            subtitle: 'Mobile Performance · AI Apps · Firebase',
            photo: 'https://media.licdn.com/dms/image/v2/D5603AQGXs16sbKkE9w/profile-displayphoto-crop_800_800/B56Z5k_EyYGoAI-/0/1779810717799?e=1782950400&v=beta&t=6TE7H2pCuSYJJnodezhZMWit6QIGjeux3HWW_RRLZSM',
            location: 'Surat, GJ, IN', verified: true,
            tenureStart: { month: 'Sep', year: 2025 },
            connections: 2512, followers: 2502,
            links: { linkedin: 'https://www.linkedin.com/in/parth-savaliya-598237274' },
            jobs: [
                { role: 'Flutter Developer', company: 'Vasundhara Infotech', start: 'Sep 2025', end: 'Present', current: true },
                { role: 'Flutter Developer', company: 'Smart Technica', start: 'Mar 2024', end: 'Aug 2025' }
            ],
            education: ['Flutter Training · Successoft Infotech (Dec 2022 – Jul 2023)'],
            skills: ['Flutter', 'Dart', 'Firebase', 'Cloud Firestore', 'Socket.io', 'Google Maps API', 'Cache Management', 'Memory Management', 'Razorpay', 'In App Purchase', 'OOP', 'REST APIs'],
            projects: ['AI Video Generator · PixaVerse']
        },
        {
            id: 'madhuri-p', name: 'Madhuri P.', title: 'Android Team Leader',
            subtitle: 'Android Apps & Games · Java · Kotlin · Jetpack',
            photo: 'https://media.licdn.com/dms/image/v2/D4D03AQHXV1cKWZeemg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1676961719561?e=1782950400&v=beta&t=FPoyo63MHGvyXPrP_VSDyMuUoGxX5wdZbCLxIobrCOw',
            location: 'Surat, GJ, IN',
            tenureStart: { month: 'Aug', year: 2023 },
            connections: 1816, followers: 1822,
            links: { linkedin: 'https://www.linkedin.com/in/madhuri-p-28260a1a4' },
            about: "Creative and dedicated Android Developer with experience over 5 years in games and applications development. Strong understanding of Java, Kotlin, Jetpack Compose, RxJava, Kotlin Coroutines, Koin, Dagger, Hilt.",
            jobs: [
                { role: 'Android Team Leader', company: 'Vasundhara Infotech', start: 'Sep 2023', end: 'Present', current: true },
                { role: 'Sr. Android Developer', company: 'Vasundhara Infotech', start: 'Aug 2023', end: 'Aug 2023' },
                { role: 'Android App Programmer', company: 'Third Rock Techkno', start: 'Jul 2022', end: 'Jun 2023' },
                { role: 'Senior Android Developer', company: 'Artoon Solutions Private Limited', start: 'May 2021', end: 'May 2022' },
                { role: 'Android Game & App Developer', company: 'Artoon Solutions Private Limited', start: 'May 2018', end: 'Apr 2021' }
            ],
            education: ['BCA · VNSGU Surat (2015–2018)'],
            skills: ['Firebase', 'Cloud Firestore', 'Bitbucket', 'GitHub', 'Kotlin Coroutines', 'Dagger', 'Jetpack', 'Java', 'Android SDK', 'XML', 'Kotlin', 'Koin', 'Jetpack Compose', 'Hilt', 'Game Development', 'Android Studio', 'Retrofit', 'MVVM']
        },
        {
            id: 'priyank-sojitra', name: 'Priyank Sojitra', title: 'Flutter Developer',
            subtitle: 'AI Mobile App Developer · MVPs for startups',
            photo: 'https://media.licdn.com/dms/image/v2/D4D03AQGUnd5Nr4TJFg/profile-displayphoto-crop_800_800/B4DZ1zAu7FJ0AM-/0/1775751071858?e=1782950400&v=beta&t=2STxegu_QQaI-84JzPVmMTFPrbQwQS-6b1nynPTrdYQ',
            location: 'Surat, GJ, IN', verified: true,
            tenureStart: { month: 'Aug', year: 2025 },
            connections: 1191, followers: 1222,
            links: { linkedin: 'https://www.linkedin.com/in/priyank-sojitra-10b4b3215' },
            about: "I help startups and businesses turn ideas into scalable, high-performance mobile apps. Build Android & iOS apps using Flutter, develop MVPs, integrate AI features.",
            jobs: [
                { role: 'Flutter Developer', company: 'Vasundhara Infotech', start: 'Aug 2025', end: 'Present', current: true },
                { role: 'Flutter Developer', company: 'Beetonz Infotech', start: 'Jul 2024', end: 'Jul 2025' },
                { role: 'Flutter Developer', company: 'Madvise Infotech', start: 'Dec 2023', end: 'Jul 2024' },
                { role: 'Flutter Developer (Intern)', company: 'EVENMORE INFOTECH', start: 'Jun 2023', end: 'Oct 2023' }
            ],
            education: [],
            skills: ['Flutter', 'Dart', 'Firebase', 'REST APIs', 'GetX', 'GitHub', 'Flutter Web', 'State Management', 'Mobile Application Development', 'OOP', 'C++', 'C']
        },
        {
            id: 'ronak-pipaliya', name: 'Ronak Pipaliya', title: 'Head of Technology (Game & Animation)',
            subtitle: 'Unity3D · AR/VR · Roblox · Project Management',
            photo: 'https://media.licdn.com/dms/image/v2/D4D03AQFB9F-Z1XrmFA/profile-displayphoto-crop_800_800/B4DZjrP1y9IEAI-/0/1756293455505?e=1782950400&v=beta&t=B1VwksZT0LshA7FEKmBASRXBZ4H4Benc6UJjX__q9V8',
            location: 'Surat, GJ, IN', verified: true, creator: true, leader: true,
            tenureStart: { month: 'Jun', year: 2017 },
            connections: 9110, followers: 9380,
            links: { linkedin: 'https://www.linkedin.com/in/ronak-pipaliya' },
            about: "IT Gaming Industry Expert with 7+ years of dedication. Head of Department managing development of numerous gaming products. 2.7 years experience in Project Management, AR/VR, Roblox games, Metaverse.",
            jobs: [
                { role: 'Head of Technology (Game & Animation)', company: 'Vasundhara Infotech', start: 'Dec 2019', end: 'Present', current: true },
                { role: 'Project Manager', company: 'Vasundhara Infotech', start: 'Jun 2017', end: 'Dec 2019' }
            ],
            education: ['Bachelor of Engineering Computer Science · GTU (2017–2021)'],
            skills: ['Problem Solving', 'Communication', 'Teamwork', 'Management', 'Game Development', 'Project Management', 'Engineering', 'Design'],
            recommendationCount: 1
        },
        {
            id: 'rajkumar-jain', name: 'Rajkumar M. Jain', title: 'Project Manager',
            subtitle: 'Scalable Tech Partner · MVPs · Growth-Ready Solutions',
            photo: 'https://media.licdn.com/dms/image/v2/D4D03AQHqTENbj59tKA/profile-displayphoto-scale_400_400/B4DZpdiV59GsAg-/0/1762505882232?e=1782950400&v=beta&t=CaBTTqGLtVCK2SJ6NenNrsZVWfuLmGuXFF6PmPIezIs',
            location: 'Surat, GJ, IN', premium: true,
            tenureStart: { month: 'Jul', year: 2019 },
            connections: 1674, followers: 1888,
            links: { linkedin: 'https://www.linkedin.com/in/rajkumar-m-jain' },
            about: "Helps industry leaders and startup CEOs turn ideas into profitable, investment-ready tech products. Started as Android Developer in 2019, grew into Project Management and Delivery Leadership. Led 50+ projects across HealthTech, FinTech, SaaS, Mobility, and Hospitality.",
            jobs: [
                { role: 'Project Manager', company: 'Vasundhara Infotech', start: 'Dec 2024', end: 'Present', current: true },
                { role: 'Assistant Project Manager', company: 'Vasundhara Infotech', start: 'Aug 2021', end: 'Dec 2024' },
                { role: 'Team Leader', company: 'Vasundhara Infotech', start: 'Sep 2020', end: 'Aug 2021' },
                { role: 'React Native Developer', company: 'Vasundhara Infotech', start: 'Jul 2020', end: 'Aug 2021' },
                { role: 'Android Developer', company: 'Vasundhara Infotech', start: 'Jul 2019', end: 'Jul 2020' }
            ],
            education: ['Bachelor of Engineering · Pacific School of Engineering (2015–2019)'],
            skills: ['Artificial Intelligence', 'Mobile Application Development', 'Kotlin', 'Agile Project Management', 'Team Leadership', 'B2B', 'Digital Transformation', 'Business Transformation', 'TypeScript', 'React Native', 'Android Development', 'Java', 'JavaScript', 'C++'],
            recommendationCount: 1
        },
        {
            id: 'jayesh-variya', name: 'Jayesh Variya', title: 'HR Executive',
            subtitle: 'IT Recruitment · Employee Retention · Culture-Fit Teams',
            photo: 'https://media.licdn.com/dms/image/v2/D4D03AQEqmTuB4kO5WA/profile-displayphoto-shrink_800_800/B4DZciHHFBGYAg-/0/1748623980699?e=1782950400&v=beta&t=q7wPFSwHADGSCk0PxEQ8OUlsoCD66BSPX8s4qbE4ifU',
            location: 'Surat, GJ, IN', verified: true, hiring: true,
            tenureStart: { month: 'Sep', year: 2023 },
            connections: 30000, followers: 35002,
            links: { linkedin: 'https://www.linkedin.com/in/jayesh-variya-8365b4197' },
            about: "Human Resources Executive at Vasundhara Infotech. Successfully hired 45 team members, each carefully selected to align with company values and long-term goals. Expert in IT recruitment, employee engagement, and organizational development.",
            jobs: [
                { role: 'Human Resources Executive', company: 'Vasundhara Infotech', start: 'Sep 2023', end: 'Present', current: true },
                { role: 'Recruitment Specialist (Freelance)', company: 'Freelance', start: 'May 2023', end: 'Aug 2023' },
                { role: 'HR Manager', company: 'BaruzoTech Pvt. Ltd.', start: 'Nov 2022', end: 'May 2023' }
            ],
            education: ['BBA Human Resources · B.R.C.M. College (2018–2021)', 'HSC Commerce · L.P. Savani High School (2017–2018)'],
            skills: ['Human Resources (HR)', 'Strategic HR Planning', 'Negotiation', 'Event Management', 'Operations Management', 'Performance Management', 'Team Management', 'End to End Recruitments', 'Employee Engagement', 'Payroll Management', 'Recruiting', 'Leadership'],
            languages: ['English (Professional)', 'Gujarati (Professional)', 'Hindi (Professional)']
        },
        {
            id: 'mehul-sapara', name: 'Mehul Sapara', title: 'Senior Network Engineer',
            subtitle: 'Network Configuration · Security Management · DevOps',
            photo: 'https://media.licdn.com/dms/image/v2/D5603AQFykCxY6WCUaQ/profile-displayphoto-scale_100_100/B56ZyT3ESeKYAc-/0/1772007214432?e=1782950400&v=beta&t=6Nmpp0FOim5Zx-SYRWOqMEcBhPdzm2KlPDQp_l0nEe8',
            location: 'Surat, GJ, IN',
            tenureStart: { month: 'Aug', year: 2022 },
            connections: 180, followers: 180,
            links: { linkedin: 'https://www.linkedin.com/in/mehul-sapara-6558b419a' },
            about: "Senior Network Engineer with 3+ years of experience in network configuration, troubleshooting, and security management. Strong knowledge of routing, switching, firewall configuration, and network monitoring.",
            jobs: [
                { role: 'Senior Network Engineer', company: 'Vasundhara Infotech', start: 'Aug 2022', end: 'Present', current: true }
            ],
            education: ['BCA · Shri V.S. Patel College of Arts & Science (2017–2020)', 'B.Com · Barfiwala College'],
            skills: ['Network Engineering', 'Network Services', 'Network Administration', 'DevOps']
        },
        {
            id: 'khushi-gujarati', name: 'Khushi Gujarati', title: 'UI/UX Designer',
            subtitle: 'Web Design · Figma · Adobe',
            photo: 'https://media.licdn.com/dms/image/v2/D4D03AQGbCKLWurGTwg/profile-displayphoto-shrink_100_100/B4DZYvT..XGkAU-/0/1744550491178?e=1782950400&v=beta&t=h1CY_p4LqccFjZmQc_IRBou6MqaSbCZdZiXrTq6Tksc',
            location: 'India',
            tenureStart: { month: 'Jul', year: 2025 },
            connections: 1520, followers: 1514,
            links: { linkedin: 'https://www.linkedin.com/in/khushi-gujarati-693b10244' },
            about: "Working on web design and UI/UX. Started career as UI/UX designer and growing step by step by working on different and latest design concepts.",
            jobs: [
                { role: 'UI/UX Designer', company: 'Vasundhara Infotech', start: 'Jul 2025', end: 'Present', current: true },
                { role: 'UI/UX Designer', company: 'Webiots Web Creators LLP', start: 'Jan 2024', end: 'Jun 2025' }
            ],
            education: ['Red & White Skill Education (2023–2024)', 'BCA · SSIU - Swarnim Startup & Innovation University'],
            skills: ['Adobe Photoshop', 'Figma', 'Adobe Illustrator']
        },
        {
            id: 'vimal-tarsaria', name: 'Vimal Tarsaria', title: 'Head of Department',
            subtitle: 'Tech Partner for SaaS & AI Startups · 500+ Projects',
            photo: 'https://media.licdn.com/dms/image/v2/D4D03AQF1oAeVhFIs1A/profile-displayphoto-crop_800_800/B4DZj1cV2zGgAI-/0/1756464509496?e=1782950400&v=beta&t=fniPWkYhXjYp3vW8nJapa0kgQlAWfEfYZvhxExM7JVs',
            location: 'Surat, GJ, IN', premium: true, leader: true,
            tenureStart: { month: 'Jun', year: 2022 },
            connections: 8447, followers: 8905,
            links: { linkedin: 'https://www.linkedin.com/in/vimaltarsariya' },
            about: "Head of Department at Vasundhara Infotech. 4+ years of experience with 500+ delivered projects across US, EU, and UAE. Outcome-based delivery focused on AI-assisted development, clean architecture, and modern cloud stacks.",
            jobs: [
                { role: 'Head of Department', company: 'Vasundhara Infotech', start: 'Jun 2022', end: 'Present', current: true },
                { role: 'Project Manager', company: 'Vasundhara Infotech', start: 'Jun 2019', end: 'Jun 2022' },
                { role: 'Mobile Application Developer', company: 'Vasundhara Infotech', start: 'May 2018', end: 'Jun 2019' }
            ],
            education: ['Bachelor of Engineering · Sarvajanik College (2014–2018)'],
            skills: ['API Development', 'GenAI Implementation', 'AI Integration', 'SaaS Development', 'Custom Software Development', 'Digital Transformation', 'MERN Stack', 'MongoDB', 'React.js', 'Node.js', 'iOS', 'Java', 'Android', 'Firebase', 'PHP', 'Python', 'Django', 'Unity', 'Flutter', 'React Native', 'Team Leadership', 'Project Management'],
            languages: ['English (Professional)', 'Gujarati (Native)', 'Hindi (Professional)'],
            recommendationCount: 2,
            projects: ['Clubmall · Social Shopping E-commerce', 'Music Booth · UAE Music Pods', 'RoofPair · Shingle Matching', 'Vinea · Healthcare CME Platform']
        },
        {
            id: 'dhruvi-davra', name: 'Dhruvi Davra', title: 'iOS Team Leader',
            subtitle: 'iOS Development · Flutter · Mobile Apps',
            photo: 'https://media.licdn.com/dms/image/v2/C4E03AQFqPDnffngxzQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1643305525177?e=1782950400&v=beta&t=ZrAGInzOikGlCQhoKhEqY6cPFU-2o4QO8h3fqoI5Vzo',
            location: 'Secaucus, NJ, US',
            tenureStart: { month: 'Jun', year: 2022 },
            connections: 1362, followers: 1397,
            links: { linkedin: 'https://www.linkedin.com/in/dhruvi-davra-60466820b' },
            jobs: [
                { role: 'iOS Team Leader', company: 'Vasundhara Infotech', start: 'Jun 2022', end: 'Present', current: true },
                { role: 'Flutter Developer', company: 'FOXBRAIN', start: 'Jan 2020', end: 'Jun 2022' },
                { role: 'Flutter Developer', company: 'Aagam Media', start: 'Jun 2019', end: 'Jan 2020' }
            ],
            education: ['Smt. Tanuben and Dr. Manubhai Trivedi College of Information Science', 'BCA Flutter Development · VNSGU Surat (2019–2021)'],
            skills: ['Dart', 'Management', 'Flutter', 'Mobile Application Development']
        }
    ];

    const people_data = rawProfiles;

    // ---------- Stats ----------
    const stats = {
        total: people_data.length,
        leaders: people_data.filter(p => p.leader).length,
        locations: new Set(people_data.map(p => (p.location || '').split(',')[0].trim()).filter(Boolean)).size,
        openToWork: people_data.filter(p => p.openToWork).length,
        hiring: people_data.filter(p => p.hiring).length
    };

    document.getElementById('summary').innerHTML = `
        <div class="summary-card"><div class="num">${stats.total}</div><div class="lbl">Profiles</div></div>
        <div class="summary-card"><div class="num">${stats.leaders}</div><div class="lbl">Leadership</div></div>
        <div class="summary-card"><div class="num">${stats.locations}</div><div class="lbl">Locations</div></div>
        <div class="summary-card"><div class="num good">${stats.openToWork}</div><div class="lbl">Open to Work</div></div>
        <div class="summary-card"><div class="num accent">${stats.hiring}</div><div class="lbl">Hiring</div></div>
    `;

    // ---------- Render ----------
    const grid = document.getElementById('peopleGrid');
    const resultsMeta = document.getElementById('resultsMeta');
    const emptyState = document.getElementById('emptyState');
    const searchInput = document.getElementById('searchInput');
    const searchClear = document.getElementById('searchClear');
    const sortSelect = document.getElementById('sortSelect');

    let activeFilter = 'all';
    const defaultOrder = people_data.map(p => p.id);

    const renderCards = (list) => {
        grid.hidden = list.length === 0;
        emptyState.hidden = list.length > 0;

        resultsMeta.textContent = list.length === 0
            ? '0 results'
            : `Showing ${list.length} of ${people_data.length} people`;

        if (list.length === 0) {
            grid.innerHTML = '';
            return;
        }

        grid.innerHTML = list.map(p => {
            const tenure = calcTenure(p.tenureStart);
            const skillChips = (p.skills || []).slice(0, 3).map(s => `<span class="skill-pill">${escapeHtml(s)}</span>`).join('');
            const moreSkills = (p.skills?.length > 3) ? `<span class="skill-pill more">+${p.skills.length - 3}</span>` : '';
            const displayName = cleanName(p.name);

            let ribbon = '';
            if (p.openToWork) ribbon = '<span class="ribbon ribbon-good">Open to Work</span>';
            else if (p.hiring) ribbon = '<span class="ribbon ribbon-accent">Hiring</span>';
            else if (p.leader) ribbon = '<span class="ribbon ribbon-gold">Leader</span>';
            else if (p.premium) ribbon = '<span class="ribbon ribbon-premium">Premium</span>';

            return `
                <article class="person-card" data-id="${escapeHtml(p.id)}" tabindex="0" role="button" aria-label="View ${escapeHtml(displayName)}'s profile">
                    ${ribbon}
                    <div class="person-head">
                        <div class="avatar">
                            ${p.photo
                    ? `<img src="${escapeHtml(p.photo)}" alt="" loading="lazy" decoding="async" onerror="this.remove(); this.parentElement.textContent='${escapeHtml(initials(displayName))}'">`
                    : escapeHtml(initials(displayName))}
                        </div>
                        <div class="person-info">
                            <div class="person-name">
                                ${escapeHtml(displayName)}
                                ${p.verified ? '<i class="fa-solid fa-circle-check verified-icon" title="Verified"></i>' : ''}
                            </div>
                            <div class="person-title">${escapeHtml(p.title)}</div>
                        </div>
                    </div>

                    <div class="person-meta">
                        ${p.location ? `<span class="chip"><i class="fa-solid fa-location-dot"></i>${escapeHtml(p.location)}</span>` : ''}
                        ${tenure ? `<span class="chip"><i class="fa-solid fa-clock"></i>${tenure}</span>` : ''}
                        ${p.recommendationCount ? `<span class="chip gold"><i class="fa-solid fa-star"></i>${p.recommendationCount} rec${p.recommendationCount > 1 ? 's' : ''}</span>` : ''}
                    </div>

                    ${skillChips ? `<div class="skill-row">${skillChips}${moreSkills}</div>` : ''}

                    <div class="person-foot">
                        <span class="foot-stat">
                            <i class="fa-solid fa-user-group"></i>
                            ${p.connections ? p.connections.toLocaleString('en-IN') : (p.jobs?.length || 0) + ' roles'}
                        </span>
                        <div class="social-links" data-stop>
                            ${Object.entries(p.links || {}).slice(0, 3).map(([k, u]) =>
                        `<a href="${escapeHtml(u)}" target="_blank" rel="noopener" title="${k}" aria-label="${displayName} on ${k}"><i class="${socialIcon(k)}" aria-hidden="true"></i></a>`
                    ).join('')}
                        </div>
                    </div>
                </article>
            `;
        }).join('');

        grid.querySelectorAll('.person-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (e.target.closest('[data-stop]') || e.target.closest('a')) return;
                openModal(card.dataset.id);
            });
            card.addEventListener('keydown', (e) => {
                if (e.target !== card) return;
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openModal(card.dataset.id);
                }
            });
        });
    };

    // ---------- Filter + sort ----------
    const applyAll = () => {
        const q = searchInput.value.toLowerCase().trim();
        searchClear.hidden = q.length === 0;

        let list = people_data.filter(p => {
            const haystack = [
                p.name, p.title, p.subtitle, p.location, p.about,
                ...(p.skills || []),
                ...(p.jobs || []).map(j => j.role + ' ' + j.company)
            ].join(' ').toLowerCase();

            const matchesQuery = !q || haystack.includes(q);

            const matchesFilter =
                activeFilter === 'all' ||
                (activeFilter === 'leader' && p.leader) ||
                (activeFilter === 'hiring' && p.hiring) ||
                (activeFilter === 'opentowork' && p.openToWork) ||
                (activeFilter === 'recommended' && p.recommendationCount > 0) ||
                (activeFilter === 'creator' && p.creator);

            return matchesQuery && matchesFilter;
        });

        const v = sortSelect.value;
        if (v === 'name') list.sort((a, b) => cleanName(a.name).localeCompare(cleanName(b.name)));
        else if (v === 'title') list.sort((a, b) => a.title.localeCompare(b.title));
        else if (v === 'recent') list.sort((a, b) => {
            const dateVal = (d) => (d?.year || 0) * 12 + (d?.month ? monthIdx(d.month) : 0);
            return dateVal(b.tenureStart) - dateVal(a.tenureStart);
        });
        else if (v === 'connections') list.sort((a, b) => (b.connections || 0) - (a.connections || 0));
        else if (v === 'tenure') list.sort((a, b) => {
            const dateVal = (d) => (d?.year || 9999) * 12 + (d?.month ? monthIdx(d.month) : 0);
            return dateVal(a.tenureStart) - dateVal(b.tenureStart);
        });
        else if (v === 'default') {
            list.sort((a, b) => defaultOrder.indexOf(a.id) - defaultOrder.indexOf(b.id));
        }

        renderCards(list);
    };

    let searchDebounce;
    searchInput.addEventListener('input', () => {
        clearTimeout(searchDebounce);
        searchDebounce = setTimeout(applyAll, 120);
    });
    searchClear.addEventListener('click', () => {
        searchInput.value = '';
        searchInput.focus();
        applyAll();
    });
    sortSelect.addEventListener('change', applyAll);

    document.querySelectorAll('.chip-filter').forEach(chip => {
        chip.addEventListener('click', () => {
            document.querySelectorAll('.chip-filter').forEach(c => {
                c.classList.remove('active');
                c.setAttribute('aria-pressed', 'false');
            });
            chip.classList.add('active');
            chip.setAttribute('aria-pressed', 'true');
            activeFilter = chip.dataset.filter;
            applyAll();
        });
    });

    document.getElementById('resetFilters').addEventListener('click', () => {
        searchInput.value = '';
        sortSelect.value = 'default';
        activeFilter = 'all';
        document.querySelectorAll('.chip-filter').forEach(c => {
            const isAll = c.dataset.filter === 'all';
            c.classList.toggle('active', isAll);
            c.setAttribute('aria-pressed', String(isAll));
        });
        applyAll();
    });

    // ---------- Modal ----------
    const modal = document.getElementById('modal');

    const openModal = (id) => {
        const p = people_data.find(x => x.id === id);
        if (!p) return;

        const tenure = calcTenure(p.tenureStart);
        const startStr = p.tenureStart ? `${p.tenureStart.month || ''} ${p.tenureStart.year}`.trim() : '—';
        const displayName = cleanName(p.name);

        modal.innerHTML = `
            <div class="modal-header">
                <div class="modal-avatar">
                    ${p.photo
                ? `<img src="${escapeHtml(p.photo)}" alt="" onerror="this.remove(); this.parentElement.textContent='${escapeHtml(initials(displayName))}'">`
                : escapeHtml(initials(displayName))}
                </div>
                <div class="modal-id">
                    <div class="modal-name" id="modalName">
                        ${escapeHtml(displayName)}
                        ${p.verified ? '<i class="fa-solid fa-circle-check verified-icon"></i>' : ''}
                    </div>
                    <div class="modal-role">${escapeHtml(p.title)}</div>
                    ${p.subtitle ? `<div class="modal-loc" style="font-style:italic;color:var(--muted);">${escapeHtml(p.subtitle)}</div>` : ''}
                    ${p.location ? `<div class="modal-loc"><i class="fa-solid fa-location-dot"></i>${escapeHtml(p.location)}</div>` : ''}
                    <div class="modal-badges">
                        ${p.openToWork ? '<span class="badge-pill good">Open to Work</span>' : ''}
                        ${p.hiring ? '<span class="badge-pill accent">Hiring</span>' : ''}
                        ${p.leader ? '<span class="badge-pill gold">Leader</span>' : ''}
                        ${p.creator ? '<span class="badge-pill">Creator</span>' : ''}
                        ${p.premium ? '<span class="badge-pill premium">Premium</span>' : ''}
                        ${p.verified ? '<span class="badge-pill">Verified</span>' : ''}
                    </div>
                </div>
                <button class="modal-close" type="button" aria-label="Close dialog">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>

            <div class="modal-body">
                ${p.about ? `
                    <div class="modal-section">
                        <h4>About</h4>
                        <p class="about-text">${escapeHtml(p.about)}</p>
                    </div>
                ` : ''}

                <div class="modal-stats">
                    ${p.connections ? `<div class="stat-pill"><strong>${p.connections.toLocaleString('en-IN')}</strong> connections</div>` : ''}
                    ${p.followers ? `<div class="stat-pill"><strong>${p.followers.toLocaleString('en-IN')}</strong> followers</div>` : ''}
                    ${tenure ? `<div class="stat-pill"><strong>${tenure}</strong> at Vasundhara · since ${startStr}</div>` : ''}
                </div>

                ${p.jobs && p.jobs.length ? `
                    <div class="modal-section">
                        <h4>Experience (${p.jobs.length})</h4>
                        <div class="modal-list">
                            ${p.jobs.map(j => `
                                <div class="job-item ${j.current ? 'is-current' : ''}">
                                    <div class="job-role">${escapeHtml(j.role)}</div>
                                    <div class="job-company">${escapeHtml(j.company)}</div>
                                    ${j.start ? `<div class="job-dates">${escapeHtml(j.start)} – ${escapeHtml(j.end || 'Present')}</div>` : ''}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                ${p.education && p.education.length ? `
                    <div class="modal-section">
                        <h4>Education</h4>
                        <div class="modal-list">
                            ${p.education.map(e => `<div class="modal-list-item">${escapeHtml(e)}</div>`).join('')}
                        </div>
                    </div>
                ` : ''}

                ${p.certifications && p.certifications.length ? `
                    <div class="modal-section">
                        <h4>Certifications (${p.certifications.length})</h4>
                        <div class="modal-list">
                            ${p.certifications.map(c => `<div class="modal-list-item"><i class="fa-solid fa-certificate"></i>${escapeHtml(c)}</div>`).join('')}
                        </div>
                    </div>
                ` : ''}

                ${p.honors && p.honors.length ? `
                    <div class="modal-section">
                        <h4>Honors & Awards (${p.honors.length})</h4>
                        <div class="modal-list">
                            ${p.honors.map(h => `<div class="modal-list-item"><i class="fa-solid fa-trophy"></i>${escapeHtml(h)}</div>`).join('')}
                        </div>
                    </div>
                ` : ''}

                ${p.projects && p.projects.length ? `
                    <div class="modal-section">
                        <h4>Notable Projects (${p.projects.length})</h4>
                        <div class="modal-list">
                            ${p.projects.map(pr => `<div class="modal-list-item"><i class="fa-solid fa-folder-open"></i>${escapeHtml(pr)}</div>`).join('')}
                        </div>
                    </div>
                ` : ''}

                ${p.skills && p.skills.length ? `
                    <div class="modal-section">
                        <h4>Skills (${p.skills.length})</h4>
                        <div class="skill-cloud">
                            ${p.skills.map(s => `<span class="skill-chip">${escapeHtml(s)}</span>`).join('')}
                        </div>
                    </div>
                ` : ''}

                ${p.languages && p.languages.length ? `
                    <div class="modal-section">
                        <h4>Languages</h4>
                        <div class="skill-cloud">
                            ${p.languages.map(l => `<span class="skill-chip lang"><i class="fa-solid fa-language"></i>${escapeHtml(l)}</span>`).join('')}
                        </div>
                    </div>
                ` : ''}

                ${p.recommendationCount ? `
                    <div class="modal-section">
                        <h4>Recommendations</h4>
                        <p class="about-text" style="font-style:italic;color:var(--muted);"><i class="fa-solid fa-quote-left" style="color:var(--accent);margin-right:6px;"></i>${p.recommendationCount} recommendation${p.recommendationCount > 1 ? 's' : ''} on LinkedIn</p>
                    </div>
                ` : ''}

                ${Object.keys(p.links || {}).length ? `
                    <div class="modal-section">
                        <h4>Profiles & Links</h4>
                        <div class="modal-socials">
                            ${Object.entries(p.links).map(([k, u]) =>
                    `<a href="${escapeHtml(u)}" target="_blank" rel="noopener" title="${k}" aria-label="${displayName} on ${k}"><i class="${socialIcon(k)}"></i></a>`
                ).join('')}
                        </div>
                    </div>
                ` : ''}
            </div>
        `;

        modal.querySelector('.modal-close').addEventListener('click', closeModal);

        if (typeof modal.showModal === 'function') {
            modal.showModal();
            setTimeout(() => modal.querySelector('.modal-close')?.focus(), 50);
        } else {
            modal.setAttribute('open', '');
        }
        document.body.classList.add('modal-open');
    };

    const closeModal = () => {
        if (typeof modal.close === 'function') modal.close();
        else modal.removeAttribute('open');
        document.body.classList.remove('modal-open');
    };

    modal.addEventListener('click', (e) => {
        const rect = modal.getBoundingClientRect();
        if (e.clientX < rect.left || e.clientX > rect.right ||
            e.clientY < rect.top || e.clientY > rect.bottom) {
            closeModal();
        }
    });
    modal.addEventListener('close', () => document.body.classList.remove('modal-open'));

    // ---------- Initial render ----------
    applyAll();

})();