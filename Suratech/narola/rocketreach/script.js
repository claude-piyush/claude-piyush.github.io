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
        const parts = String(name || '').split(/\s+/).filter(Boolean);
        return parts.slice(0, 2).map(w => w[0] || '').join('').toUpperCase() || '?';
    };

    const socialIcon = (key) => ({
        linkedin: 'fa-brands fa-linkedin-in',
        twitter: 'fa-brands fa-x-twitter',
        facebook: 'fa-brands fa-facebook-f',
        github: 'fa-brands fa-github',
        instagram: 'fa-brands fa-instagram',
        youtube: 'fa-brands fa-youtube'
    }[key] || 'fa-solid fa-link');

    // Calculate tenure at current company in years/months
    const calcTenure = (startDate) => {
        if (!startDate || !startDate.year) return null;
        const start = new Date(startDate.year, (startDate.month ? monthIdx(startDate.month) : 0), 1);
        const now = new Date();
        const months = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
        const yrs = Math.floor(months / 12);
        const mos = months % 12;
        if (yrs >= 1) return `${yrs} yr${yrs > 1 ? 's' : ''}${mos > 0 ? ` ${mos} mo` : ''}`;
        return `${mos} mo${mos > 1 ? 's' : ''}`;
    };

    const monthIdx = (m) => {
        const map = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };
        return map[m] ?? 0;
    };

    // ---------- Profile data ----------
    // Merged RocketReach + LinkedIn profiles (deduplicated)
    const people = [
        {
            id: 'ashish-narola', name: 'Ashish Narola', leader: true,
            title: 'Chief Executive Officer', subtitle: 'Helping Global Businesses Simplify, Scale & Grow with IT & AI',
            photo: 'https://media.licdn.com/dms/image/v2/D4D03AQEbu9Hiy1gD8A/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1666077155145?e=1782950400&v=beta&t=_M9BIYC5gr1LOx13mTSA7euwkcyr4PGew4ICvaW3s2E',
            location: 'Surat, GJ, IN', verified: true,
            tenureStart: { month: 'Oct', year: 2005 },
            connections: 14731, followers: 17330,
            links: { linkedin: 'https://www.linkedin.com/in/ashishnarola', twitter: 'https://twitter.com/narolainfotech' },
            about: "As the Co-founder & CEO of Narola Infotech, I am passionate about enabling digital transformation and AI-driven business growth for businesses across the globe. What started in 2005 with a 200 sq. ft. office and two team members has grown into 250+ professionals serving 1500+ clients in 15+ countries.",
            jobs: [
                { role: 'Chief Executive Officer', company: 'Narola Infotech', start: 'Oct 2005', end: 'Present', current: true },
                { role: 'Director', company: 'Narola AI Studio', start: 'Nov 2020', end: 'Present', current: true },
                { role: 'Technology Partner & Seed Investor', company: 'Vijya Fintech Pvt. Ltd.', start: 'Mar 2022', end: 'Present', current: true },
                { role: 'Senior Software Engineer', company: 'Prescient Infotech Inc.', start: 'Jun 2001', end: 'Sep 2005' }
            ],
            education: ['Bachelor of Engineering · Lukhdhirji Engineering College, Morbi (1997–2001)'],
            certifications: ['B2B Marketing · IIM Ahmedabad (2024)'],
            skills: ['Global Business Development', 'Marketing', 'Entrepreneurship', 'Business Strategy', 'Outsourcing', 'Start-ups', 'Strategic Partnerships', 'IT Consulting', 'Custom Software Development'],
            languages: ['English'],
            recommendationCount: 13,
            emailDomains: ['narola.ai', 'gmail.com'],
            phones: [{ number: '+91 261 645 XXXX' }, { number: '+1 415-604-XXXX', premium: true }, { number: '+91 99251 1XXXX', premium: true }]
        },
        {
            id: 'urvish-narola', name: 'Urvish Narola', leader: true,
            title: 'Chief Partnerships & Solutions Officer', subtitle: 'Co-Founder · Building Products & Teams That Drive Success',
            photo: 'https://media.licdn.com/dms/image/v2/D4D03AQECDpVEo7pHrw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1723700318830?e=1782950400&v=beta&t=9TKLfTk_bKJ2PIIgP1iEHeqIR2GkalwqSzgVIYpF6i8',
            location: 'Surat, GJ, IN', verified: true,
            tenureStart: { month: 'Mar', year: 2010 },
            connections: 2905, followers: 3338,
            links: { linkedin: 'https://www.linkedin.com/in/urvishnarola' },
            about: "For the past 16 years, I have been passionate about helping businesses build exceptional software products and scale their teams effectively. My focus is on creating long-lasting partnerships by understanding unique business needs.",
            jobs: [
                { role: 'Chief Partnerships & Solutions Officer', company: 'Narola Infotech', start: 'Mar 2010', end: 'Present', current: true }
            ],
            education: ['M.B.A. in Marketing · Savitribai Phule Pune University (2007–2009)', 'B.Com in Commerce · South Gujarat University (2003–2006)'],
            skills: ['Customer Success', 'IT Services', 'Product Engineering', 'Software Development', 'Custom Software Development', 'Sales Management', 'Customer Relationship Management', 'Business Development'],
            languages: ['English'],
            recommendationCount: 1,
            emailDomains: ['gmail.com'],
            phones: [{ number: '+91 81412 6XXXX' }]
        },
        {
            id: 'nilesh-paladiya', name: 'Nilesh Paladiya', leader: true,
            title: 'CTO and Co-Founder',
            photo: null,
            location: 'Surat, GJ, IN',
            tenureStart: { month: 'Oct', year: 2005 },
            links: { linkedin: 'https://www.linkedin.com/in/nileshpaladiya', twitter: 'https://www.twitter.com/standqa' },
            jobs: [
                { role: 'CTO and Co-Founder', company: 'Narola Infotech', start: 'Oct 2005', end: 'Present', current: true },
                { role: 'Software Engineer', company: 'Prescient Infotech, Inc.', end: 'Oct 2005' }
            ],
            education: ['Sardar Patel University (2000–2004)', 'P P Savani School (1998–2000)'],
            skills: ['Android Development', 'J2EE', 'HTML', 'AJAX', 'Team Management', 'Mobile Applications', 'Java', 'XML', 'PHP', 'Technical Leadership', 'iOS development', 'ASP.NET', 'jQuery', 'Project Management'],
            emailDomains: ['gmail.com', 'yahoo.com'],
            phones: [{ number: '+91 261 645 XXXX', premium: true }]
        },
        {
            id: 'dhara-narola', name: 'Dhara Narola', leader: true,
            title: 'Digital Marketing Director',
            photo: null,
            location: 'Surat, GJ, IN',
            tenureStart: { month: 'Oct', year: 2011 },
            links: { linkedin: 'https://www.linkedin.com/in/dhara-narola-73376a121', twitter: 'https://twitter.com/narolainfotech', facebook: 'https://facebook.com/100012474078296' },
            jobs: [
                { role: 'Digital Marketing Director', company: 'Narola Infotech', start: 'Oct 2011', end: 'Present', current: true }
            ],
            education: ['B.Tech. in Computer Engineering · Sardar Vallabhbhai National Institute of Technology, Surat (2007–2011)'],
            skills: [],
            phones: [{ number: '+91 89800 0XXXX' }]
        },
        {
            id: 'urvesh-sojitra', name: 'Urvesh Sojitra',
            title: 'Assistant Director of Sales Marketing', subtitle: 'Software Development Strategist · Helping businesses automate operations using AI',
            photo: 'https://media.licdn.com/dms/image/v2/D4D03AQFpN9V5Fw2S8g/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1665577222599?e=1782950400&v=beta&t=IuDl6nydIol1pI4cgCX3Eaer2mlsuHXoLivWEb_x2F0',
            location: 'Surat, GJ, IN',
            tenureStart: { month: 'Apr', year: 2014 },
            connections: 5000, followers: 5145,
            links: { linkedin: 'https://www.linkedin.com/in/sojitraurvesh' },
            about: "I started as a Java developer before moving into sales and business development. So when a CTO tells me their architecture is 'complicated', I actually understand what that means. Today I lead sales and business development at Narola Infotech.",
            jobs: [
                { role: 'Assistant Director of Sales Marketing', company: 'Narola Infotech', start: 'Apr 2014', end: 'Present', current: true },
                { role: 'Java Developer Trainee', company: 'Tata Consultancy Services', start: 'Oct 2013', end: 'Apr 2014' }
            ],
            education: ['BE in Computer Science · Gujarat Technological University (2009–2013)', 'MBA in e-Commerce · Annamalai University (2015)'],
            skills: ['Customer Satisfaction', 'Business Strategy', 'New Business Development', 'Customer Service', 'Business Development', 'IT Outsourcing', 'B2B', 'B2C', 'PHP', 'JavaScript', 'MySQL', 'Start-ups'],
            recommendationCount: 14,
            honors: ['Unmatched Dedication (2021)', 'Guiding Star Of The Year (2020)', 'Recognition Award & Loyalty Award (2019)', 'Achiever of the year (2017, 2018)', 'Customer Buddy Award (2016)', 'Constant Learner (2015)'],
            languages: ['English (Native)', 'Gujarati', 'Hindi']
        },
        {
            id: 'jitendra-makwana', name: 'Jitendra Makwana',
            title: 'Senior Manager – Business Development', subtitle: 'IT Services & Software Solutions · International Sales & Client Success',
            photo: 'https://media.licdn.com/dms/image/v2/D4D03AQFnOEvQy_5M2Q/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1703669359349?e=1782950400&v=beta&t=Zf013KfySJMrs2Gst8kW1wcxU7c5Ke8Rl1-_FjZ8OCU',
            location: 'Surat, GJ, IN', verified: true, creator: true,
            tenureStart: { month: 'Jul', year: 2013 },
            connections: 7955, followers: 8047,
            links: { linkedin: 'https://www.linkedin.com/in/jitendramakwana' },
            about: "12+ years of experience in IT and software development. I help businesses convert ideas into the right technology solutions by aligning business objectives with practical technical execution.",
            jobs: [
                { role: 'Senior Business Development Manager', company: 'Narola Infotech', start: 'Jul 2018', end: 'Present', current: true },
                { role: 'Business Development Manager', company: 'Narola Infotech', start: 'Jul 2016', end: 'Jun 2018' },
                { role: 'Senior Business Development Executive', company: 'Narola Infotech', start: 'Jan 2014', end: 'Jun 2016' },
                { role: 'Jr. Business Development Associate', company: 'Narola Infotech', start: 'Jul 2013', end: 'Dec 2014' },
                { role: 'Android Developer', company: 'Xion Software solution', start: 'Jun 2012', end: 'Jun 2013' }
            ],
            education: ["Bachelor's in Computer Engineering · A. D. Patel Institute Of Technology (2008–2012)"],
            skills: ['Sales and Marketing', 'Client Relations', 'Strategic Partnerships', 'Leadership', 'Negotiation', 'Business Development', 'IT Consulting', 'International Sales', 'B2B Marketing Strategy', 'Strategic Planning'],
            recommendationCount: 8,
            honors: ['Team Contribution & Loyalty Excellence Award (2016)', 'Achiever of the year (2015)', 'Achiever of the Year (2014)'],
            emailDomains: ['gmail.com'],
            phones: [{ number: '+91 90334 3XXXX' }]
        },
        {
            id: 'mohammed-saiyed', name: 'Mohammed Saiyed',
            title: 'Senior Manager - Business Development', subtitle: 'B2B Sales · Client Acquisition · Revenue Growth',
            photo: 'https://media.licdn.com/dms/image/v2/D4D03AQFJ25nfwZ6fiw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1726124149255?e=1782950400&v=beta&t=FSTmxFLgAqI6ia-LqLWvbmIyA39wNw4zyL7qAdy2OpU',
            location: 'Surat, GJ, IN', verified: true, openToWork: true, creator: true,
            tenureStart: { month: 'Apr', year: 2014 },
            connections: 1156, followers: 1282,
            links: { linkedin: 'https://www.linkedin.com/in/mohammed-saiyed-63954844' },
            about: "Business Development and Sales Professional with 12+ years of experience driving business growth through client acquisition, lead generation, negotiation, and deal closure.",
            jobs: [
                { role: 'Senior Manager - Business Development', company: 'Narola Infotech', start: 'Jun 2021', end: 'Present', current: true },
                { role: 'Business Development Manager', company: 'Narola Infotech', start: 'Jun 2018', end: 'May 2021' },
                { role: 'Senior Business Development Executive', company: 'Narola Infotech', start: 'Jun 2017', end: 'May 2018' },
                { role: 'Business Development Executive', company: 'Narola Infotech', start: 'Jun 2016', end: 'May 2017' },
                { role: 'Jr. Business Development Associate', company: 'Narola Infotech', start: 'Jun 2015', end: 'May 2016' },
                { role: 'Marketing Executive', company: 'Narola Infotech', start: 'Apr 2014', end: 'May 2015' }
            ],
            education: ['M.B.A. in Marketing · Annamalai University (2015–2017)', 'BBA in Marketing · Navnirman Institute of Management (2011–2014)'],
            skills: ['Digital Transformation', 'Sales and Marketing', 'Customer Satisfaction', 'Client Relations', 'Team Leadership', 'B2B Sales', 'Lead Generation', 'Sales Strategy', 'Negotiation'],
            recommendationCount: 6,
            languages: ['English (Native)', 'Gujarati (Native)', 'Hindi (Native)']
        },
        {
            id: 'chirag-limbachiya', name: 'Chirag Limbachiya',
            title: 'Sr. Project Manager', subtitle: 'PRINCE2 Practitioner · PSM I · Microsoft Certified',
            photo: 'https://media.licdn.com/dms/image/v2/C4E03AQHC_1g4l_bt_g/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1638178170775?e=1782950400&v=beta&t=WAljMdypp_Lj7iDlq-ygfwFBcgN9X2Xw6w52IYej8YU',
            location: 'Surat, GJ, IN', verified: true,
            tenureStart: { month: 'Dec', year: 2019 },
            connections: 2957, followers: 2932,
            links: { linkedin: 'https://www.linkedin.com/in/limbachiyachirag' },
            about: "Certified Prince 2 practitioner with 16+ years of IT experience in complete project life cycle. Working on AI concept in organization. Microsoft Certified Professional.",
            jobs: [
                { role: 'Sr. Project Manager', company: 'Narola Infotech', start: 'Apr 2023', end: 'Present', current: true },
                { role: 'Project Manager', company: 'Narola Infotech', start: 'Dec 2019', end: 'Apr 2023' },
                { role: 'Project Manager', company: 'SSM InfoTech Solutions', start: 'May 2019', end: 'Nov 2019' },
                { role: 'Technology Officer', company: 'JZero Solutions', start: 'Apr 2018', end: 'May 2019' },
                { role: 'Project Manager', company: 'JZero Solutions', start: 'Oct 2015', end: 'May 2019' },
                { role: 'Sr. Team Lead', company: 'JZero Solutions', start: 'Apr 2013', end: 'Sep 2015' },
                { role: 'Jr. Team Leader', company: 'JZero Solutions', start: 'Jun 2010', end: 'Jul 2013' },
                { role: 'Asp.Net Developer', company: 'V3+ Web Solutions', start: 'Jul 2009', end: 'Jun 2010' }
            ],
            education: ['M.Sc. (I.T) · Veer Narmad South Gujarat University (2007–2009)', 'B.Sc. (I.T) · Veer Narmad South Gujarat University (2004–2007)'],
            certifications: ['Microsoft Certified: Power Platform Fundamentals (2024)', 'Project Management Essentials (2021)', 'PRINCE2® 2017 Practitioner (2018)', 'Professional Scrum Master I (2018)', 'MS: Developing Microsoft Azure Solutions (2017)', 'MS: Programming in C# (2015)'],
            skills: ['Project Management', 'Program Management', 'Technical Project Leadership', 'Agile Methodologies', 'Scrum', 'PRINCE2', 'Spring Framework', 'JavaScript', '.NET', 'ASP.NET', 'C#', 'Microsoft SQL Server', 'Leadership'],
            recommendationCount: 16,
            honors: ['Role Model Of The Year (2022)', 'Agile Leader of the Year (2021)', 'PHENOMENAL LEADERSHIP (2020)', 'Thinking outside the box Award (2016)'],
            languages: ['English', 'Gujarati', 'Hindi']
        },
        {
            id: 'prashant-patel', name: 'Prashant Patel',
            title: 'Sr. Team Leader · Technical Team Lead', subtitle: 'Java · Spring Boot · Upskilling AI/ML',
            photo: 'https://media.licdn.com/dms/image/v2/D4D03AQEJlIyTHPNJxg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1718228760011?e=1782950400&v=beta&t=v0skqBpHzDMHYoP1rCw5UOqyY9fPmO3YwpNZ9L5hA6Y',
            location: 'Gujarat, IN', verified: true,
            tenureStart: { month: 'Nov', year: 2020 },
            connections: 337, followers: 346,
            links: { linkedin: 'https://www.linkedin.com/in/prashant-patel-6597494a' },
            about: "Senior Software Engineer (Backend) with 10+ years of experience in Java-based technologies. Currently leading a team of 15 developers and expanding into AI/ML.",
            jobs: [
                { role: 'Technical Team Lead', company: 'Narola Infotech', start: 'Jul 2022', end: 'Present', current: true },
                { role: 'Senior Software Engineer', company: 'Narola Infotech', start: 'Nov 2020', end: 'Jul 2022' },
                { role: 'Freelance Software Engineer', company: 'Self Employed - Upwork', start: 'Jan 2020', end: 'Nov 2020' },
                { role: 'Java Software Engineer', company: 'iFocus Systec (India) Pvt Ltd', start: 'Jan 2019', end: 'Oct 2019' },
                { role: 'Java/J2EE Engineer', company: 'Shootcash.com', start: 'Oct 2016', end: 'Mar 2018' },
                { role: 'Java/J2EE Engineer', company: 'Fastticket.in', start: 'Oct 2014', end: 'Sep 2016' },
                { role: 'Jr. Java Developer', company: 'Webashlar Pvt Ltd', start: 'Oct 2013', end: 'Mar 2014' }
            ],
            education: ["Master's in Software Application · Dr.Moonje Institute (2011–2013)", 'BCA · Shri Manilal Kadakia College (2007–2010)'],
            skills: ['RESTful WebServices', 'Spring Security', 'Spring Boot', 'Java Enterprise Edition', 'AIML', 'Microservices', 'Apache Kafka', 'RabbitMQ', 'Spring Framework', 'Spring MVC', 'Core Java', 'MySQL', 'Hibernate', 'Payment Gateways', 'Software as a Service'],
            recommendationCount: 1,
            languages: ['English', 'Hindi', 'Marathi'],
            projects: ['SiteWorker · Skilled Workforce Platform', 'KumoShip · E-Commerce Shipping Platform', 'Evgeny E-Commerce Platform', 'Shipping Adaptor · Multi-Carrier Integration', 'Xendit Java SDK', 'BarodaKisan · Agri Platform']
        },
        {
            id: 'mahesh-trapasiya', name: 'Mahesh Trapasiya',
            title: 'Senior Consultant · Full Stack Product Engineer', subtitle: 'Building SaaS across HealthTech, FinTech & EdTech',
            photo: 'https://media.licdn.com/dms/image/v2/D4D03AQEkjx-2N_jJFA/profile-displayphoto-crop_800_800/B4DZ2WKA6cIEAI-/0/1776340702259?e=1782950400&v=beta&t=2QydLlYfG-sD0jt8W2H3fWFpCo8KckaXLg-SNaOOkkY',
            location: 'Surat, GJ, IN', verified: true,
            tenureStart: { month: 'Jan', year: 2020 },
            connections: 2843, followers: 2833,
            links: { linkedin: 'https://www.linkedin.com/in/mahesh-trapasiya' },
            about: "Full Stack Product Engineer with 6+ years of experience. I work with React.js, Next.js, Node.js and TypeScript. I build SaaS products from start to finish across HealthTech, FinTech, EdTech and Energy.",
            jobs: [
                { role: 'Senior Consultant', company: 'Narola Infotech', start: 'Oct 2023', end: 'Present', current: true },
                { role: 'Senior Software Engineer', company: 'Narola Infotech', start: 'Apr 2022', end: 'Oct 2023' },
                { role: 'Software Engineer', company: 'Narola Infotech', start: 'Jan 2020', end: 'Apr 2022' }
            ],
            education: ['MCA · Veer Narmad South Gujarat University (2018–2020)', 'BCA · S V Patel College (2015–2018)'],
            skills: ['React.js', 'Node.js', 'MongoDB', 'Express.js', 'TypeScript', 'Agile Software Development', 'Front-End Development', 'Webpack', 'Redux.js', 'Cloud Firestore', 'HTML5', 'CSS', 'Git', 'REST API', 'Generative AI']
        },
        {
            id: 'hitesh-zope', name: 'Hitesh Zope',
            title: 'Principal Software Engineer', subtitle: 'AI First Software Engineer · Not Language Bound',
            photo: 'https://media.licdn.com/dms/image/v2/D5603AQHahOODrt7sbQ/profile-displayphoto-crop_800_800/B56Z2M83WdKcAM-/0/1776186298318?e=1782950400&v=beta&t=emDFA54i6zQp0m3fGxYrYdpebiFwSWTS_8jINshaFCk',
            location: 'Surat, GJ, IN', verified: true,
            tenureStart: { month: 'Jun', year: 2020 },
            connections: 563, followers: 576,
            links: { linkedin: 'https://www.linkedin.com/in/hitesh-zope' },
            about: "Moving toward becoming an AI Generalist. Strong foundation in PHP (Laravel), Angular and React. Familiar with AI code editors like Cursor, vibe coding platforms like Bolt and Lovable, and prompt engineering.",
            jobs: [
                { role: 'Principal Software Engineer', company: 'Narola Infotech', start: 'Jun 2023', end: 'Present', current: true },
                { role: 'Senior Consultant', company: 'Narola Infotech', start: 'May 2022', end: 'Present' },
                { role: 'Senior Software Engineer', company: 'Narola Infotech', start: 'Jun 2021', end: 'Feb 2022' },
                { role: 'Software Engineer', company: 'Narola Infotech', start: 'Jun 2020', end: 'Jun 2021' },
                { role: 'Project Manager', company: 'SurveyBackOffice', start: 'May 2019', end: 'Jun 2020' }
            ],
            education: ['Computer Programming · Veer Narmad South Gujarat University (2010–2012)'],
            skills: ['Generative AI', 'PHP', 'MySQL', 'Prompt Engineering', 'JavaScript', 'Laravel', 'CakePHP', 'HTML5', 'LLM Integration', 'CodeIgniter', 'AWS', 'Angular', 'Full-Stack Development', 'AI Workflow Automation', 'AI-Assisted Development', 'REST APIs', 'Git']
        },
        {
            id: 'shreya-modi', name: 'Shreya Modi Pancholi',
            title: 'Principle Software Engineer',
            photo: 'https://media.licdn.com/dms/image/v2/C5603AQFVBIRmPgkGAg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1609924917850?e=1782950400&v=beta&t=ilf_iKHeEUeOYvjiAX1qaVdfIBXXKHiK4C3eH3cqhOk',
            location: 'Surat, GJ, IN',
            tenureStart: { month: 'Jan', year: 2017 },
            connections: 126, followers: 129,
            links: { linkedin: 'https://www.linkedin.com/in/shreya-modi-pancholi-0825a010b' },
            jobs: [
                { role: 'Principle Software Engineer', company: 'Narola Infotech', start: 'Apr 2023', end: 'Present', current: true },
                { role: 'Sr. Consultant', company: 'Narola Infotech', start: 'Jul 2019', end: 'Mar 2023' },
                { role: 'Sr. Software Engineer', company: 'Narola Infotech', start: 'Jan 2017', end: 'Jun 2019' }
            ],
            education: ['B.Sc.(IT) · Veer Narmad South Gujarat University (2012–2015)'],
            skills: ['iOS Development', 'React Native', 'Node.js', 'Swift', 'PHP', 'MySQL', 'C++', 'C#', 'JavaScript', 'jQuery', '.NET', 'JSP', 'Oracle']
        },
        {
            id: 'krishna-patel', name: 'Krishna Patel',
            title: 'Principal Software Engineer · Sr. iOS Full Stack Developer', subtitle: 'Swift · Objective C · PHP · Node.js · Socket.io',
            photo: null,
            location: 'Surat, GJ, IN',
            tenureStart: { month: 'Jan', year: 2020 },
            connections: 1005, followers: 998,
            links: { linkedin: 'https://www.linkedin.com/in/krishna-patel-47613789' },
            about: "Highly skilled iOS developer with 6+ years of experience in mobile development, server-side development, and real-time communication technologies.",
            jobs: [
                { role: 'Principal Software Engineer', company: 'Narola Infotech', start: 'Jan 2022', end: 'Present', current: true },
                { role: 'Senior Consultant', company: 'Narola Infotech', start: 'Jan 2021', end: 'Dec 2022' },
                { role: 'Sr. iOS Developer', company: 'Narola Infotech', start: 'Jan 2020', end: 'Dec 2021' },
                { role: 'Sr. iOS Developer', company: 'Leocan Technologies', start: 'Oct 2018', end: 'Nov 2019' },
                { role: 'iOS Developer', company: 'EbizzInfotech', start: 'Sep 2017', end: 'Sep 2018' },
                { role: 'iOS Developer', company: 'VUE Solution', start: 'Feb 2016', end: 'Aug 2017' }
            ],
            education: ['M.Sc. (ICT) · J.P. Dawer College (2014–2016)', 'BCA · Smt. T & MT College (2011–2014)'],
            skills: ['Swift', 'Objective-C', 'iOS Development', 'Node.js', 'PHP', 'MySQL', 'Firebase', 'Socket.io', 'Stripe', 'Apple Pay', 'Google Pay', 'API Development', 'Payment Gateways', 'CodeIgniter', 'REST APIs'],
            recommendationCount: 1,
            languages: ['English', 'Gujarati', 'Hindi'],
            projects: ['GroupPunch', 'Earlibird Immo', 'Idol - Kpop Visual Bias Finder', 'Go Local First', 'GOFER Delivery', 'Campsite Notifier', 'SCL Campus', 'Spyfall - Find the spy']
        },
        {
            id: 'sandip-pethani', name: 'Sandip Pethani',
            title: 'Principal UI and UX Designer | 2D Animator',
            photo: 'https://d2gjqh9j26unp0.cloudfront.net/profilepic/ca819d8e8dc86fe81f0c5280b97b7894',
            location: 'India',
            tenureStart: { month: 'May', year: 2019 },
            links: { linkedin: 'https://www.linkedin.com/in/sandip-pethani-105ba1134' },
            jobs: [
                { role: 'Principal UI and UX Designer | 2D Animator', company: 'Narola Infotech', start: 'May 2019', end: 'Present', current: true },
                { role: 'Sr. UI and UX Designer', company: 'Tripix infotech pvt ltd' },
                { role: 'UIUX and Graphics Designer', company: 'BOW SOLUTIONS LTD' }
            ],
            education: ['B.C.A in Computer Science · AISECT UNIVERSITY Bhopal (2015–2018)', 'Advance web designer · Red&White institute (2014–2015)'],
            skills: [],
            emailDomains: ['narolainfotech.com']
        },
        {
            id: 'pankaj-sonvane', name: '💫 Pankaj Sonvane',
            title: 'Sr. UI/UX Designer', subtitle: 'Freelancer · 97+ Satisfied clients · Founder @ superior_ux/ui',
            photo: 'https://media.licdn.com/dms/image/v2/D4D03AQGpkyoy0SrQVQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1681276339470?e=1782950400&v=beta&t=_oW3Gk2aUoE9YQ4VEhOz-wm3sjjw2FmHWKALiLuONr8',
            location: 'Surat, GJ, IN', openToWork: true,
            tenureStart: { month: 'Jul', year: 2023 },
            connections: 1914, followers: 1907,
            links: { linkedin: 'https://www.linkedin.com/in/💫-pankaj-sonvane-10bb28206' },
            about: "5+ years of experience in UX/UI & graphic designing. Expertise in Figma, Adobe Photoshop, Adobe Illustrator, and Adobe XD.",
            jobs: [
                { role: 'Sr. UI/UX Designer', company: 'Narola Infotech', start: 'Jul 2023', end: 'Present', current: true },
                { role: 'Senior UX/UI Designer', company: 'Codezee Solutions', start: 'May 2022', end: 'May 2023' },
                { role: 'Senior Design Manager', company: 'Codezee Solutions Pvt Ltd', start: 'May 2021', end: 'Sep 2022' },
                { role: 'Senior Graphic Web Designer', company: 'Narola Infotech', start: 'Jun 2019', end: 'Apr 2021' },
                { role: 'Graphic Web Designer', company: 'TemplateMela', start: 'May 2017', end: 'Jun 2019' }
            ],
            education: ['BCA in Computer Engineering · Rabindranath Tagore University (2016–2019)'],
            skills: ['Figma', 'User Interface Design', 'Wireframing', 'Web Design', 'Adobe Photoshop', 'Adobe XD', 'Adobe Illustrator', 'Webflow', 'Canva', 'After Effects', 'Sketch App', 'Mockups', 'Prototyping', 'Branding', 'Logo Design', 'SaaS products']
        },
        {
            id: 'abhay-patel', name: 'Abhay Patel',
            title: 'Principal Software Engineer',
            photo: null,
            location: 'Ridgefield, NJ, US',
            tenureStart: { month: 'Jul', year: 2024 },
            links: { linkedin: 'https://www.linkedin.com/in/abhay-patel-a0a929a8' },
            jobs: [
                { role: 'Principal Software Engineer', company: 'Narola Infotech', start: 'Jul 2024', end: 'Present', current: true },
                { role: 'Senior Software Engineer', company: 'Narola Infotech' },
                { role: 'Junior Software Developer', company: 'Narola Infotech' }
            ],
            education: ['Msc ICT · J.P. Dawer Institute (2013–2016)', 'BCA · Sutex Bank College (2011–2013)', '12 commerce · M.M.P high school surat (2008–2011)'],
            skills: ['Web Development', 'CSS', 'jQuery', 'ASP.NET Web API', 'ASP.NET MVC', 'C#', 'C++', 'Web Design', 'Responsive Web Design', '.NET Framework', 'MVC', 'JavaScript', 'SQL', 'Microsoft SQL Server', 'HTML', '.net core', 'AngularJS'],
            emailDomains: ['narolainfotech.co', 'yahoo.in'],
            phones: [{ number: '+1 846-053-XXXX' }]
        },
        {
            id: 'sneha-p', name: 'Sneha P',
            title: 'RPA Developer',
            photo: 'https://d2gjqh9j26unp0.cloudfront.net/profilepic/9a18e7239a64c37af9eb97d0dad94abc',
            location: 'Alexandria, OH, US',
            tenureStart: { month: 'Jan', year: 2020 },
            links: { linkedin: 'https://www.linkedin.com/in/sneha-p-38a196213' },
            jobs: [
                { role: 'RPA Developer', company: 'Narola Infotech', start: 'Jan 2020', end: 'Present', current: true }
            ],
            education: [],
            skills: []
        },
        {
            id: 'vedant-goti', name: 'Vedant Goti',
            title: 'President - Narola USA Inc.',
            photo: 'https://media.licdn.com/dms/image/v2/D4E03AQGxP1leOQkEyQ/profile-displayphoto-crop_800_800/B4EZ4svET0JgAI-/0/1778866997224?e=1782950400&v=beta&t=jDhIikcekaCof0D20xISF1NkahSHxM33K0VuFl0gi0A',
            location: 'New York, NY, US', verified: true, premium: true,
            tenureStart: { month: 'Dec', year: 2019 },
            connections: 629, followers: 637,
            links: { linkedin: 'https://www.linkedin.com/in/vedant-goti-012167177' },
            about: "Expertise in Sales, planning and executing business strategies, master in developing new market channels and building strong relationships with sales managers, customers and industry leaders.",
            jobs: [
                { role: 'President', company: 'Narola USA Inc', start: 'Jan 2025', end: 'Present', current: true },
                { role: 'Sales Head - USA', company: 'Narola', start: 'Dec 2019', end: 'Present', current: true }
            ],
            education: ['Vibrant International Academy'],
            skills: ['Client Relations', 'Luxury Sales', 'Business Strategy', 'Sales Management', 'International Sales', 'International Business', 'Customer Relationship Management', 'Sales', 'Business Development', 'Negotiation', 'Communication']
        },
        {
            id: 'komal-patil', name: 'Komal Patil',
            title: 'Talent Acquisition Manager',
            photo: 'https://media.licdn.com/dms/image/v2/D4D03AQE1xe9zd_nu_Q/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1685684310590?e=1782950400&v=beta&t=tWJMrDj6vNlkQSvIKL6ssBgB3B4DdlCvYI2KobAm7iY',
            location: 'Nashik, MH, IN', hiring: true,
            tenureStart: { month: 'Sep', year: 2018 },
            connections: 16699, followers: 16785,
            links: { linkedin: 'https://www.linkedin.com/in/komal-patil-068aa8135' },
            jobs: [
                { role: 'Talent Acquisition Manager', company: 'Narola Infotech', start: 'Sep 2018', end: 'Present', current: true },
                { role: 'Assistant HR Manager', company: 'Narola Infotech', start: 'Sep 2018', end: 'Present', current: true },
                { role: 'HR Executive', company: 'D V Das Manpower', start: 'Jul 2016', end: 'Aug 2018' }
            ],
            education: ['MBA in Human Resources Development · Sandip Foundations (2014–2016)'],
            certifications: ['Keka HR Katalyst (2023)'],
            skills: [],
            emailDomains: ['gmail.com'],
            phones: [{ number: '+91 99093 6XXXX' }]
        },
        {
            id: 'virendrasinh-padhiar', name: 'Virendrasinh Padhiar',
            title: 'Project Manager',
            photo: 'https://media.licdn.com/dms/image/v2/D4D03AQH6o4C-4f9NZA/profile-displayphoto-crop_800_800/B4DZhBs3xnGgAI-/0/1753448939521?e=1782950400&v=beta&t=hyYXHFM3XNwshYyBvXuYZCuIgDY1OqAUJ8_COz9IU0I',
            location: 'Surat, GJ, IN', verified: true,
            tenureStart: { month: 'Apr', year: 2023 },
            connections: 773, followers: 775,
            links: { linkedin: 'https://www.linkedin.com/in/virendrasinh-padhiar-377803112' },
            about: "If I can understand the scenario, define a workaround, provide solutions, simplify understanding, be a mentor, be trustworthy and loyal — that's about my skills.",
            jobs: [
                { role: 'Project Manager', company: 'Narola Infotech', start: 'Apr 2023', end: 'Present', current: true },
                { role: 'Sr. Team Leader', company: 'Narola Solutions', start: 'Jan 2019', end: 'Present', current: true },
                { role: 'Team Leader', company: 'Narola Infotech', start: 'Jan 2018', end: 'Jan 2018' },
                { role: 'iOS Developer', company: 'Narola Infotech', start: 'Jul 2015', end: 'Dec 2017' }
            ],
            education: ['MSCIT · Veer Narmad South Gujarat University (2009–2014)'],
            certifications: ['Blockchain Developer Training · Simplilearn (2021)'],
            skills: ['Cocoa Touch', 'Mobile Application Development', 'Core Data', 'UIKit', 'MySQL', 'Objective-C', 'Xcode', 'Swift', 'Cocoa']
        },
        {
            id: 'saloni-nayi', name: 'Saloni Nayi',
            title: 'Business Analyst', subtitle: 'Agile & Waterfall · SQL · Python · Power BI · Jira',
            photo: 'https://media.licdn.com/dms/image/v2/D4E03AQFRvi0S-8IqOQ/profile-displayphoto-crop_800_800/B4EZ22bGEUGkAQ-/0/1776882053581?e=1782950400&v=beta&t=uBrFcVXpFV5BctubCaTCmM6DUNl5uqPG9zPl8sfB-3I',
            location: 'Brampton, ON, CA', openToWork: true,
            tenureStart: { month: 'May', year: 2023 },
            connections: 226, followers: 326,
            links: { linkedin: 'https://www.linkedin.com/in/saloni-nayi-4664a0122' },
            about: "I turn complex business problems into clear, actionable solutions that actually get built and delivered. 3 years as a Business Analyst working on 5–7 concurrent projects.",
            jobs: [
                { role: 'Business Analyst', company: 'Narola Infotech', start: 'May 2023', end: 'Present', current: true },
                { role: 'Operator/Technician', company: 'CTDI', start: 'Sep 2019', end: 'Apr 2023' },
                { role: 'Software Intern', company: 'Ganpati Computers', start: 'Sep 2018', end: 'Dec 2018' }
            ],
            education: ["Master's in Information Technology · Polish-Japanese Academy (2019–2023, Grade 4/5)", "K.J.Institute of Engineering (2015–2018, 8.6/10)"],
            skills: ['Business Analysis', 'Requirements Gathering', 'Jira', 'Agile & Waterfall Methodologies', 'SQL', 'Microsoft Power BI', 'Python', 'Cross-functional Team Leadership', 'Microsoft Office', 'C#', 'JavaScript', 'HTML', '.NET Framework']
        },
        {
            id: 'roshan-rathod', name: 'Roshan Rathod',
            title: 'Technical Team Leader',
            photo: 'https://media.licdn.com/dms/image/v2/D4D03AQGRHcJXzsy5tg/profile-displayphoto-crop_800_800/B4DZely6vkH4AM-/0/1750833280700?e=1782950400&v=beta&t=FZQVI8OsGK4VZvN5VWJuIwjExCa-V8NoNHFpet3Jl4s',
            location: 'Surat, GJ, IN',
            tenureStart: { month: 'Jan', year: 2017 },
            connections: 673, followers: 672,
            links: { linkedin: 'https://www.linkedin.com/in/roshan-rathod-26638218a' },
            about: "Skilled WordPress web developer with 6+ years of expertise in website creation, design, and database management. Master's degree in MCA.",
            jobs: [
                { role: 'Technical Team Lead', company: 'Narola Infotech', start: 'Jan 2022', end: 'Present', current: true },
                { role: 'Senior Consultant', company: 'Narola Infotech', start: 'Jul 2020', end: 'Jan 2022' },
                { role: 'Senior Software Engineer', company: 'Narola Infotech', start: 'Jul 2018', end: 'Jul 2020' },
                { role: 'Software Engineer', company: 'Narola Infotech', start: 'Jun 2017', end: 'Jul 2018' },
                { role: 'Software Engineering Trainee', company: 'Narola Infotech', start: 'Jan 2017', end: 'Jun 2017' }
            ],
            education: ['MCA · Uka Tarsadia University (2015–2017)', 'BCA · Smt. Z.S. Patel College (2012–2015)'],
            skills: ['WordPress', 'WooCommerce', 'PSD to WordPress', 'CodeIgniter', 'PHP', 'MySQL', 'PhpMyAdmin', 'Theme Development', 'WordPress Design', 'SEO', 'Responsive Web Design', 'Full-Stack Development']
        },
        {
            id: 'milan-gupta', name: 'Milan Gupta',
            title: 'Implementation Lead', subtitle: 'Syndigo PIM/MDM Expert · Product Data',
            photo: 'https://media.licdn.com/dms/image/v2/C4D03AQG_kLYpv2tU0Q/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1644937254185?e=1782950400&v=beta&t=gVFR6K8ahwc0rcSbhjw4y3ZZ20sD6trRjcmQ0oQBUIA',
            location: 'Surat, GJ, IN',
            tenureStart: { month: 'Nov', year: 2014 },
            connections: 400, followers: 462,
            links: { linkedin: 'https://www.linkedin.com/in/milan-gupta-800a3b7a' },
            about: "Implementation lead with over 10+ years of experience in IT. Solution-oriented mindset with strong focus on building meaningful relationships and teamwork.",
            jobs: [
                { role: 'Implementation Lead', company: 'ThoughtSpark', start: 'Jul 2023', end: 'Present', current: true },
                { role: 'Senior Team Lead', company: 'Narola Solutions', start: 'Nov 2014', end: 'Present', current: true },
                { role: 'Implementation Lead', company: 'Narola Infotech', start: 'Feb 2022', end: 'Sep 2023' },
                { role: 'Team Lead', company: 'Narola Infotech', start: 'Mar 2018', end: 'Nov 2021' },
                { role: 'Assistant Team Leader', company: 'Narola Infotech', start: 'Mar 2017', end: 'Mar 2018' },
                { role: 'Software Engineer', company: 'Narola Infotech', start: 'Nov 2014', end: 'Mar 2017' }
            ],
            education: ["Master's in Information Technology · Veer Narmad South Gujarat University (2011–2015)"],
            skills: ['Master Data Management', 'iOS Development', 'Agile Project Management', 'Object-Oriented Programming', 'Requirements Gathering', 'Agile Methodologies', 'Project Management', 'Swift', 'Objective-C', 'Xcode', 'MySQL', 'PHP', 'AWS', 'SQL', 'REST API'],
            languages: ['English', 'Gujarati', 'Hindi']
        },
        {
            id: 'priyanka-nayak', name: 'Priyanka Nayak',
            title: 'Junior Business Development Executive', subtitle: 'Helping Businesses Turn Ideas into Real Tech Solutions',
            photo: 'https://media.licdn.com/dms/image/v2/D5603AQHIaSmop2SQgg/profile-displayphoto-crop_800_800/B56Z2vWxXLIUAI-/0/1776763480129?e=1782950400&v=beta&t=MKciptXe-eyxFN62WrTyUI7JrQY7MLDcQ1muPAaljL4',
            location: 'Surat, GJ, IN', verified: true,
            tenureStart: { month: 'Oct', year: 2025 },
            connections: 1935, followers: 1938,
            links: { linkedin: 'https://www.linkedin.com/in/priyanka-nayak-7a4b0026a' },
            about: "Business Development Associate with a technical background. Bridge the gap between business needs and technical execution.",
            jobs: [
                { role: 'Junior Business Development Executive', company: 'Narola Infotech', start: 'Oct 2025', end: 'Present', current: true },
                { role: 'Business Development Executive', company: 'Narola Infotech', start: 'Oct 2025', end: 'Present', current: true },
                { role: 'Technical Project Manager', company: '10turtle.ai', start: 'Jun 2025', end: 'Nov 2025' },
                { role: 'Flutter Developer', company: 'CoderKube Technologies', start: 'Dec 2024', end: 'Jun 2025' },
                { role: 'Java Developer Intern', company: 'CodSoft', start: 'May 2024', end: 'Aug 2024' }
            ],
            education: ['BTech in Computer Software Engineering · Uka Tarsadia University (2022–2025)', 'Diploma in Computer Engineering · Gujarat Technological University (2019–2022)'],
            skills: ['Business Development', 'Lead Generation', 'IT Sales & Business Development', 'CRM', 'B2B', 'Customer Acquisition', 'Java', 'JavaScript', 'HTML5', 'CSS', 'SQL', 'Web Development']
        },
        {
            id: 'priyanshi-jariwala', name: 'Priyanshi Jariwala',
            title: 'Business Development Associate',
            photo: 'https://media.licdn.com/dms/image/v2/D4D03AQEIQnlL_aEH1w/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1684665257834?e=1782950400&v=beta&t=42Dmx38Uz7Hm3utpkgRKxrqgqKVbNjPt5R-bJkoRX6E',
            location: 'Surat, GJ, IN', verified: true,
            tenureStart: { month: 'Jan', year: 2025 },
            connections: 1292, followers: 1288,
            links: { linkedin: 'https://www.linkedin.com/in/priyanshi-jariwala-a81520251' },
            about: "Sales-driven professional focused on helping businesses grow with the right technology solutions.",
            jobs: [
                { role: 'Business Development Associate', company: 'Narola Infotech', start: 'Jan 2025', end: 'Present', current: true },
                { role: 'Social Media Manager', company: 'Par Solution', start: 'May 2024', end: 'Dec 2024' },
                { role: 'Recruitment & Development Manager', company: 'Kotak Life', start: 'Jun 2023', end: 'Aug 2023' }
            ],
            education: ['MBA in Marketing · Sarvajanik College of Engineering (2022–2024)'],
            skills: ['Communication', 'Business Development', 'Social Media Marketing']
        },
        {
            id: 'himanshu-mistry', name: 'Himanshu Mistry',
            title: 'Business Development Executive', subtitle: 'Helping Business Grow with Digital Solutions',
            photo: 'https://media.licdn.com/dms/image/v2/D4D03AQEoRA30h4izNw/profile-displayphoto-crop_800_800/B4DZ2WbzK6JgAI-/0/1776345365969?e=1782950400&v=beta&t=bFgNrvGWl2WCValJEZbUUZf3AYMaWCqjY-Orr-KG1Gw',
            location: 'Surat, GJ, IN',
            tenureStart: { month: 'May', year: 2023 },
            connections: 1126, followers: 1123,
            links: { linkedin: 'https://www.linkedin.com/in/himanshu-mistry-8ab8681a1' },
            jobs: [
                { role: 'Business Development Executive', company: 'Narola Infotech', start: 'May 2023', end: 'Present', current: true },
                { role: 'Senior Person', company: 'Reliance Digital Retail', start: 'Aug 2019', end: 'Jan 2023' },
                { role: 'Deputy Manager', company: 'HDFC Bank', start: 'Feb 2023', end: '2023' }
            ],
            education: ['BBA in Accounting and Finance · Madhav University (2016–2019)', 'Bakery · Navsari Agricultural University'],
            skills: ['Negotiation', 'Lead Generation', 'CRM', 'Sales Strategy', 'Business Development', 'CCNA', 'Computer Networking', 'Account Management']
        },
        {
            id: 'shivam-desai', name: 'Shivam Desai',
            title: 'Business Development Executive', subtitle: 'Business Strategy & Growth Consulting',
            photo: 'https://media.licdn.com/dms/image/v2/D4D03AQHVpKWqp_ZuDw/profile-displayphoto-shrink_800_800/B4DZP0lDXwGgAg-/0/1734975176432?e=1782950400&v=beta&t=RZCzd4NHCXUvKbBc7x-c71IDdwvFL9qPYireWRD0x2g',
            location: 'Surat, GJ, IN',
            tenureStart: { month: 'Aug', year: 2024 },
            connections: 319, followers: 321,
            links: { linkedin: 'https://www.linkedin.com/in/shivam-desai-144667269' },
            about: "Focused on identifying business opportunities, building strong client relationships, and driving strategic growth.",
            jobs: [
                { role: 'Business Development Executive', company: 'Narola Infotech', start: 'Aug 2024', end: 'Present', current: true },
                { role: 'Data Analyst', company: 'Xtreme Thoughts SoftTech', start: 'Jan 2024', end: 'Jul 2024' }
            ],
            education: ['MBA in International Business · Padmashree Dr. D.Y. Patil Vidyapeeth (2024–2026)', 'BTech in IT · G H Patel College of Engineering (2020–2024, 8.0 CGPA)'],
            certifications: ['Lean Six Sigma White Belt · Amazon', 'Initiating and Planning Projects · UC Irvine (2022)'],
            skills: ['Negotiation', 'Business Analysis', 'Business Consulting', 'CRM', 'Business Development', 'Data Visualization', 'Microsoft Power BI', 'Microsoft SQL Server', 'Project Management', 'Analytical Skills']
        },
        {
            id: 'mahir-shaikh', name: 'Mahir Shaikh',
            title: 'Sr. Business Development Associate',
            photo: 'https://media.licdn.com/dms/image/v2/D4D03AQHq9f1acgGTHg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1706802495453?e=1782950400&v=beta&t=HEIkoycqGT92E77LFT5BaKAhjBv_HV_fZfzm_z7bDcc',
            location: 'Surat, GJ, IN',
            tenureStart: { month: 'Mar', year: 2024 },
            connections: 606, followers: 606,
            links: { linkedin: 'https://www.linkedin.com/in/mahir-shaikh-330a69252' },
            jobs: [
                { role: 'Business Development Executive', company: 'Narola Infotech', start: 'Mar 2024', end: 'Present', current: true },
                { role: 'Business Development Executive', company: 'Alita Infotech', start: 'May 2023', end: 'Feb 2024' }
            ],
            education: ['BE in Mechanical Engineering · Mahavir Swami College (2018–2021)', 'Diploma in Mechanical · Mahavir Swami Polytechnic (2015–2018)'],
            skills: ['Business Development', 'Lead Generation', 'HTML', 'HTML5', 'CSS', 'jQuery', 'Bootstrap', 'AngularJS', 'PHP', 'Laravel']
        },
        {
            id: 'mansi-tailor', name: 'Mansi Tailor',
            title: 'Business Development Executive',
            photo: null,
            location: 'Surat, GJ, IN', verified: true,
            tenureStart: { month: 'Aug', year: 2024 },
            connections: 1197, followers: 1231,
            links: { linkedin: 'https://www.linkedin.com/in/mansi-tailor-8124601b7' },
            jobs: [
                { role: 'Business Development Executive', company: 'Narola Infotech', start: 'Aug 2024', end: 'Present', current: true },
                { role: 'Business Development Executive', company: 'EbizzInfotech', start: 'Feb 2023', end: 'May 2024' },
                { role: 'Salesforce Developer', company: 'Narola Infotech', start: 'Feb 2022', end: 'Oct 2022' },
                { role: 'Salesforce Internship Trainee', company: 'Narola Infotech', start: 'Feb 2022', end: 'Aug 2022' }
            ],
            education: ['MCA · Veer Narmad South Gujarat University (2020–2022)', 'BCA · SDJ International College (2018–2020, Distinction)'],
            certifications: ['Salesforce Certified Administrator (2020)'],
            skills: ['Salesforce', 'Salesforce Lightning', 'Web Design', 'Painting', 'Drawing', 'CSS', 'HTML', 'C++', 'ASP.NET', 'Microsoft SQL Server', 'PHP', 'C#']
        },
        {
            id: 'jayesh-badgujar', name: 'Jayesh Badgujar',
            title: 'Business Development Associate', subtitle: 'HTML · CSS · JavaScript · React · Java · SpringBoot',
            photo: 'https://media.licdn.com/dms/image/v2/D4D03AQHWhQh57mQ5JQ/profile-displayphoto-crop_800_800/B4DZ6cNij6KUAc-/0/1780737257148?e=1782950400&v=beta&t=Kv8KQqLUIadbaVT6R8HfVSfKvjc_4hYkAd1uV5lEPkY',
            location: 'Pune, MH, IN', creator: true,
            tenureStart: { month: 'Nov', year: 2025 },
            connections: 1101, followers: 1123,
            links: { linkedin: 'https://www.linkedin.com/in/jayesh-badgujar-9a8763210' },
            jobs: [
                { role: 'Business Development Associate', company: 'Narola Infotech', start: 'Nov 2025', end: 'Present', current: true },
                { role: 'Java Software Engineer', company: 'Zplus Cyber Secure Technologies', start: 'Jul 2025', end: 'Jan 2026' },
                { role: 'Member of Technical Staff', company: 'Vendekin Technologies', start: 'Jan 2024', end: 'Jul 2024' },
                { role: 'JavaScript Developer', company: 'Vendekin Technologies', start: 'Jan 2024', end: 'Jul 2024' },
                { role: 'Full Stack Engineer', company: 'HefShine Softwares', start: 'Jul 2023', end: 'Dec 2023' }
            ],
            education: ['BCA in Information Technology · RCPETs Institute (2020–2023, 92.05%)'],
            skills: ['Spring Boot', 'Java', 'JavaScript', 'React.js', 'React Native', 'Firebase', 'Unit Testing', 'Test Automation', 'Git', 'IntelliJ IDEA', 'Spring Framework', 'API Testing', 'Full-Stack Development']
        }
    ];

    // ---------- Stats ----------
    const stats = {
        total: people.length,
        leaders: people.filter(p => p.leader).length,
        locations: new Set(people.map(p => (p.location || '').split(',')[0].trim()).filter(Boolean)).size,
        withPhoto: people.filter(p => p.photo).length,
        openToWork: people.filter(p => p.openToWork).length,
        hiring: people.filter(p => p.hiring).length
    };

    document.getElementById('summary').innerHTML = `
        <div class="summary-card"><div class="num">${stats.total}</div><div class="lbl">Total People</div></div>
        <div class="summary-card"><div class="num">${stats.leaders}</div><div class="lbl">Leadership</div></div>
        <div class="summary-card"><div class="num">${stats.locations}</div><div class="lbl">Locations</div></div>
        <div class="summary-card"><div class="num good">${stats.openToWork}</div><div class="lbl">Open to Work</div></div>
        <div class="summary-card"><div class="num accent">${stats.hiring}</div><div class="lbl">Hiring</div></div>
    `;

    // ---------- Render cards ----------
    const grid = document.getElementById('peopleGrid');
    const resultsMeta = document.getElementById('resultsMeta');
    const emptyState = document.getElementById('emptyState');
    const searchInput = document.getElementById('searchInput');
    const searchClear = document.getElementById('searchClear');
    const sortSelect = document.getElementById('sortSelect');

    let activeFilter = 'all';

    const renderCards = (list) => {
        grid.hidden = list.length === 0;
        emptyState.hidden = list.length > 0;

        resultsMeta.textContent = list.length === 0
            ? '0 results'
            : `Showing ${list.length} of ${people.length} people`;

        if (list.length === 0) {
            grid.innerHTML = '';
            return;
        }

        grid.innerHTML = list.map(p => {
            const tenure = calcTenure(p.tenureStart);
            const skillChips = (p.skills || []).slice(0, 3).map(s => `<span class="skill-pill">${escapeHtml(s)}</span>`).join('');
            const moreSkills = (p.skills?.length > 3) ? `<span class="skill-pill more">+${p.skills.length - 3}</span>` : '';

            return `
                <article class="person-card" data-id="${escapeHtml(p.id)}" tabindex="0" role="button" aria-label="View ${escapeHtml(p.name)}'s profile">
                    ${p.openToWork ? '<span class="ribbon ribbon-good">Open to Work</span>' : ''}
                    ${p.hiring ? '<span class="ribbon ribbon-accent">Hiring</span>' : ''}
                    ${p.leader && !p.openToWork && !p.hiring ? '<span class="ribbon ribbon-gold">Leader</span>' : ''}

                    <div class="person-head">
                        <div class="avatar">
                            ${p.photo
                                ? `<img src="${escapeHtml(p.photo)}" alt="" loading="lazy" onerror="this.style.display='none'; this.parentElement.dataset.fallback='${escapeHtml(initials(p.name))}'">`
                                : `<span class="avatar-initials">${escapeHtml(initials(p.name))}</span>`}
                        </div>
                        <div class="person-info">
                            <div class="person-name">
                                ${escapeHtml(p.name)}
                                ${p.verified ? '<i class="fa-solid fa-circle-check verified-icon" title="Verified" aria-label="Verified profile"></i>' : ''}
                            </div>
                            <div class="person-title">${escapeHtml(p.title)}</div>
                        </div>
                    </div>

                    <div class="person-meta">
                        ${p.location ? `<span class="chip"><i class="fa-solid fa-location-dot" aria-hidden="true"></i>${escapeHtml(p.location)}</span>` : ''}
                        ${tenure ? `<span class="chip"><i class="fa-solid fa-clock" aria-hidden="true"></i>${tenure} tenure</span>` : ''}
                        ${p.recommendationCount ? `<span class="chip gold"><i class="fa-solid fa-star" aria-hidden="true"></i>${p.recommendationCount} rec${p.recommendationCount > 1 ? 's' : ''}</span>` : ''}
                    </div>

                    ${skillChips ? `<div class="skill-row">${skillChips}${moreSkills}</div>` : ''}

                    <div class="person-foot">
                        <span class="foot-stat" title="${p.connections || 0} connections · ${p.followers || 0} followers">
                            <i class="fa-solid fa-user-group" aria-hidden="true"></i>
                            ${p.connections ? p.connections.toLocaleString('en-IN') : (p.jobs?.length || 0) + ' role' + ((p.jobs?.length || 0) > 1 ? 's' : '')}
                        </span>
                        <div class="social-links" data-stop>
                            ${Object.entries(p.links || {}).slice(0, 3).map(([k, u]) => `<a href="${escapeHtml(u)}" target="_blank" rel="noopener" title="${k}" aria-label="${p.name} on ${k}"><i class="${socialIcon(k)}" aria-hidden="true"></i></a>`).join('')}
                        </div>
                    </div>
                </article>
            `;
        }).join('');

        // Card click → modal
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

        let list = people.filter(p => {
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
                (activeFilter === 'photo' && p.photo);

            return matchesQuery && matchesFilter;
        });

        const v = sortSelect.value;
        if (v === 'name') list.sort((a, b) => a.name.localeCompare(b.name));
        else if (v === 'title') list.sort((a, b) => a.title.localeCompare(b.title));
        else if (v === 'recent') list.sort((a, b) => {
            const da = a.tenureStart?.year || 0, db = b.tenureStart?.year || 0;
            return db - da;
        });
        else if (v === 'connections') list.sort((a, b) => (b.connections || 0) - (a.connections || 0));
        else if (v === 'tenure') list.sort((a, b) => (a.tenureStart?.year || 9999) - (b.tenureStart?.year || 9999));

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
        const p = people.find(x => x.id === id);
        if (!p) return;

        const tenure = calcTenure(p.tenureStart);
        const startStr = p.tenureStart ? `${p.tenureStart.month || ''} ${p.tenureStart.year}`.trim() : '—';

        modal.innerHTML = `
            <div class="modal-header">
                <div class="modal-avatar">
                    ${p.photo
                        ? `<img src="${escapeHtml(p.photo)}" alt="" onerror="this.outerHTML='<span class=\\'avatar-initials\\'>${escapeHtml(initials(p.name))}</span>'">`
                        : `<span class="avatar-initials">${escapeHtml(initials(p.name))}</span>`}
                </div>
                <div class="modal-id">
                    <div class="modal-name" id="modalName">
                        ${escapeHtml(p.name)}
                        ${p.verified ? '<i class="fa-solid fa-circle-check verified-icon" aria-label="Verified"></i>' : ''}
                    </div>
                    <div class="modal-role">${escapeHtml(p.title)}</div>
                    ${p.subtitle ? `<div class="modal-sub">${escapeHtml(p.subtitle)}</div>` : ''}
                    ${p.location ? `<div class="modal-loc"><i class="fa-solid fa-location-dot" aria-hidden="true"></i>${escapeHtml(p.location)}</div>` : ''}
                    <div class="modal-badges">
                        ${p.openToWork ? '<span class="badge-pill good">Open to Work</span>' : ''}
                        ${p.hiring ? '<span class="badge-pill accent">Hiring</span>' : ''}
                        ${p.leader ? '<span class="badge-pill gold">Leader</span>' : ''}
                        ${p.creator ? '<span class="badge-pill">Creator</span>' : ''}
                        ${p.premium ? '<span class="badge-pill premium">Premium</span>' : ''}
                    </div>
                </div>
                <button class="modal-close" type="button" aria-label="Close dialog">
                    <i class="fa-solid fa-xmark" aria-hidden="true"></i>
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
                    ${tenure ? `<div class="stat-pill"><strong>${tenure}</strong> at Narola · since ${startStr}</div>` : ''}
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
                            ${p.certifications.map(c => `<div class="modal-list-item"><i class="fa-solid fa-certificate" aria-hidden="true"></i>${escapeHtml(c)}</div>`).join('')}
                        </div>
                    </div>
                ` : ''}

                ${p.honors && p.honors.length ? `
                    <div class="modal-section">
                        <h4>Honors &amp; Awards (${p.honors.length})</h4>
                        <div class="modal-list">
                            ${p.honors.map(h => `<div class="modal-list-item"><i class="fa-solid fa-trophy" aria-hidden="true"></i>${escapeHtml(h)}</div>`).join('')}
                        </div>
                    </div>
                ` : ''}

                ${p.projects && p.projects.length ? `
                    <div class="modal-section">
                        <h4>Notable Projects (${p.projects.length})</h4>
                        <div class="modal-list">
                            ${p.projects.map(pr => `<div class="modal-list-item"><i class="fa-solid fa-folder-open" aria-hidden="true"></i>${escapeHtml(pr)}</div>`).join('')}
                        </div>
                    </div>
                ` : ''}

                ${(p.emailDomains?.length || p.phones?.length) ? `
                    <div class="modal-section">
                        <h4>Contact Teasers</h4>
                        <div class="contact-table">
                            ${(p.emailDomains || []).map(e => `<div class="contact-row"><span class="key">Email domain</span><span class="val">@${escapeHtml(e)}</span></div>`).join('')}
                            ${(p.phones || []).map(ph => `<div class="contact-row"><span class="key">Phone${ph.premium ? ' · premium' : ''}</span><span class="val">${escapeHtml(ph.number)}</span></div>`).join('')}
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
                            ${p.languages.map(l => `<span class="skill-chip lang"><i class="fa-solid fa-language" aria-hidden="true"></i>${escapeHtml(l)}</span>`).join('')}
                        </div>
                    </div>
                ` : ''}

                ${p.recommendationCount ? `
                    <div class="modal-section">
                        <h4>Recommendations</h4>
                        <p class="muted-note"><i class="fa-solid fa-quote-left" aria-hidden="true"></i> ${p.recommendationCount} recommendation${p.recommendationCount > 1 ? 's' : ''} on LinkedIn</p>
                    </div>
                ` : ''}

                ${Object.keys(p.links || {}).length ? `
                    <div class="modal-section">
                        <h4>Profiles</h4>
                        <div class="modal-socials">
                            ${Object.entries(p.links).map(([k, u]) => `<a href="${escapeHtml(u)}" target="_blank" rel="noopener" title="${k}" aria-label="${p.name} on ${k}"><i class="${socialIcon(k)}" aria-hidden="true"></i></a>`).join('')}
                        </div>
                    </div>
                ` : ''}
            </div>
        `;

        modal.querySelector('.modal-close').addEventListener('click', closeModal);

        if (typeof modal.showModal === 'function') {
            modal.showModal();
        } else {
            modal.setAttribute('open', '');
        }
        document.body.classList.add('modal-open');
    };

    const closeModal = () => {
        if (typeof modal.close === 'function') {
            modal.close();
        } else {
            modal.removeAttribute('open');
        }
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