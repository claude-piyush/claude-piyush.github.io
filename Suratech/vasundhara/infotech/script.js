// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navMobile = document.getElementById('navMobile');
navToggle.addEventListener('click', () => {
    const isOpen = navMobile.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
    navToggle.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
});
navMobile.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
        navMobile.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
});

// Specialties
const specialties = [
    { name: "Mobile Application Development", icon: "fa-mobile-screen" },
    { name: "Game Development", icon: "fa-gamepad" },
    { name: "Unity 3D Game Development", icon: "fa-cube" },
    { name: "Web Design & Development", icon: "fa-code" },
    { name: "UI/UX Graphics Designing", icon: "fa-pen-ruler" },
    { name: "Search Engine Optimisation", icon: "fa-magnifying-glass-chart" },
    { name: "Quality Assurance services", icon: "fa-clipboard-check" },
    { name: "NFT Development", icon: "fa-link" },
    { name: "AI Automation", icon: "fa-robot" },
    { name: "AI-Powered App Development", icon: "fa-wand-magic-sparkles" },
    { name: "Custom AI Software Development", icon: "fa-microchip" },
    { name: "AI Chatbots", icon: "fa-comments" },
    { name: "Machine Learning Integration", icon: "fa-brain" }
];

document.getElementById('specialtiesGrid').innerHTML = specialties.map(s => `
    <div class="specialty">
        <i class="fa-solid ${s.icon}"></i>
        <span>${s.name}</span>
    </div>
`).join('');

// Leadership
const team = [
    {
        name: "Chirag Pipaliya",
        role: "Co-Founder & Designated Partner",
        image: "https://serve.vasundhara.io/images/d8ef08e759ca9fa145bb64a429e08151_1727675647279_1734091639352.png",
        linkedin: "https://linkedin.com/in/chiragpipaliya/",
        twitter: "https://x.com/ChiragPipaliy"
    },
    {
        name: "Somish Kakadiya",
        role: "Co-Founder & Designated Partner",
        image: "https://serve.vasundhara.io/images/somish-kakadiya1706852502_1728549863612_1734091665134_1737363650910.jpeg",
        linkedin: "https://linkedin.com/in/somish-kakadiya/"
    },
    {
        name: "Agnesh Pipaliya",
        role: "Senior Leadership",
        image: "https://serve.vasundhara.io/images/agnesh-pipaliya1690780767_1730174490572_1734091692256.jpeg",
        linkedin: "https://linkedin.com/in/agnesh-pipaliya/"
    },
    {
        name: "Ronak Pipaliya",
        role: "Senior Leadership",
        image: "https://serve.vasundhara.io/images/ronak-pipaliya1690869359_1730174593615.jpeg",
        linkedin: "https://linkedin.com/in/ronak-pipaliya/"
    },
    {
        name: "Vimal Tarsariya",
        role: "Senior Leadership",
        image: "https://serve.vasundhara.io/images/vimal-tarsariya1690780794_1730436709106.png",
        linkedin: "https://www.linkedin.com/in/vimaltarsariya/"
    }
];

document.getElementById('peopleGrid').innerHTML = team.map(p => `
    <div class="person">
        <div class="person-avatar"><img src="${p.image}" alt="${p.name}" loading="lazy"></div>
        <div class="person-name">${p.name}</div>
        <div class="person-role">${p.role}</div>
        <div class="person-links">
            ${p.linkedin ? `<a href="${p.linkedin}" aria-label="${p.name} LinkedIn"><i class="fa-brands fa-linkedin"></i></a>` : ''}
            ${p.twitter ? `<a href="${p.twitter}" aria-label="${p.name} Twitter"><i class="fa-brands fa-x-twitter"></i></a>` : ''}
        </div>
    </div>
`).join('');

// Q&A
const qaData = [
    {
        q: "What is the promotion process like at Vasundhara Infotech?",
        asked: "Jan 24, 2024",
        answers: [
            { text: "Dry promotion", role: "Jr. QA Tester", location: "Surat", date: "Sep 25, 2024" },
            { text: "Based on Skills", role: "HR Generalist", location: "Surat", date: "Jan 24, 2024" }
        ]
    },
    {
        q: "What is Vasundhara Infotech's vacation policy? How many vacation days do you get per year?",
        asked: "Dec 3, 2021",
        answers: [
            { text: "12", role: "Jr. PHP Developer", location: "Surat", date: "Oct 1, 2023" },
            { text: "One vacation per year and there is no surety that it might happen as well.", role: "Team Lead (Former employee)", location: "Surat", date: "Dec 3, 2021" }
        ]
    },
    {
        q: "On average, how many hours do you work a day at Vasundhara Infotech?",
        asked: "Dec 3, 2021",
        answers: [
            { text: "9.5 hours including breaks", role: null, location: null, date: null }
        ]
    },
    {
        q: "What should you wear to an interview at Vasundhara Infotech?",
        asked: "May 22, 2017",
        answers: [
            { text: "Good Communication skills", role: null, location: null, date: null }
        ]
    }
];

document.getElementById('qaList').innerHTML = qaData.map(item => `
    <div class="qa-item">
        <div class="qa-question">
            <i class="fa-solid fa-circle-question"></i>
            <div>
                <div class="qa-q-text">${item.q}</div>
                <div class="qa-q-meta">Asked ${item.asked} · ${item.answers.length} answer${item.answers.length > 1 ? 's' : ''}</div>
            </div>
        </div>
        <div class="qa-answers">
            ${item.answers.map(a => `
                <div class="qa-answer">
                    <div class="qa-a-text">${a.text}</div>
                    ${a.role ? `<div class="qa-a-meta">${a.role}${a.location ? ` · ${a.location}` : ''}${a.date ? ` · ${a.date}` : ''}</div>` : ''}
                </div>
            `).join('')}
        </div>
    </div>
`).join('');

// Reviews
const reviews = [
    { a: "Junior Android Developer", r: 1, d: "Jun 29, 2024", t: "Internal politics held me back", x: "As a fresher I learned new things, but I would never recommend joining as a fresher — they don't treat you well, the staff isn't supportive, and there's a lot of internal politics.", loc: "Surat", div: "IT Support" },
    { a: "Digital Marketing Executive", r: 4, d: "Nov 11, 2023", t: "Productivity measured by hours spent", x: "Not much positive to say beyond the basics. Productivity is measured by how much time you spend at your desk rather than actual output.", loc: "Surat", div: "Digital Marketing" },
    { a: "Digital Marketing Executive", r: 4, d: "Jun 18, 2023", t: "Friendly environment for freshers", x: "In Vasundhara Infotech the work environment is friendly — they keep freshers motivated and give them a chance to grow. There is some office politics, which is why some people leave.", loc: "Surat", div: "Digital Marketing" },
    { a: "Digital Marketing Executive", r: 4, d: "May 9, 2023", t: "Great place to start your career", x: "Numerous opportunities available for freshers. Good place to start your career. Increments are good compared to other companies. The downside is limited learning of new technologies.", loc: "Surat", div: "Marketing" },
    { a: "QA Test Engineer", r: 4, d: "Jul 26, 2023", t: "Happy to work here", x: "I am happy to work with Vasundhara Infotech. Skill development opportunities are solid and the team culture is supportive.", loc: "Surat", div: "IT Network" },
    { a: "Jr Python Developer", r: 5, d: "Dec 14, 2022", t: "Best company in Surat", x: "Best company ever in Surat. Only complaint: when a public holiday falls in the week, Saturday becomes a working day.", loc: "Surat", div: "Software Development" },
    { a: "HR Generalist", r: 5, d: "May 23, 2023", t: "All good to work here", x: "All good to work here. Nothing to complain about across salary, culture, work-life balance, and growth.", loc: "Surat", div: "HR Operations" },
    { a: "HR Recruiter", r: 4, d: "Nov 10, 2022", t: "Good learning experience", x: "Learning experience and a good opportunity to expose yourself. The main downside is lack of communication across teams.", loc: "Surat", div: "HR Recruitment" },
    { a: "Jr. Unity Game Developer", r: 5, d: "Apr 26, 2022", t: "Great for freshers with good training", x: "Flexibility to work and good for freshers to start with proper training. A common language could help bring more talent from across Gujarat.", loc: "Surat", div: "Software Development" },
    { a: "Business Development Executive", r: 3, d: "Aug 22, 2018", t: "Good coordination, volatile policy", x: "Team coordination was very good at that time. The downside was a volatile policy environment that kept shifting expectations.", loc: "New Delhi", div: "Sales" },
    { a: "Software Developer", r: 5, d: "Mar 29, 2018", t: "Adopts new technology", x: "This company is good at adopting new technology, and teammates are very supportive. Honestly, I can't think of any dislikes.", loc: "Surat", div: "Software Development" }
];

const stars = r => {
    let s = '';
    for (let i = 1; i <= 5; i++) s += i <= r ? '★' : '<span class="empty">★</span>';
    return s;
};

const initials = name => name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();

const list = document.getElementById('reviewsList');
const btn = document.getElementById('showMoreBtn');
let expanded = false;
const INITIAL_COUNT = 4;

const render = (count) => {
    list.innerHTML = reviews.slice(0, count).map(r => `
      <div class="review ${r.r >= 4 ? 'positive' : 'negative'}">
        <div class="review-head">
          <div class="review-author">
            <div class="review-avatar">${initials(r.a)}</div>
            <div>
              <div class="review-name">${r.a}</div>
              <div class="review-date">${r.div} · ${r.loc} · ${r.d}</div>
            </div>
          </div>
          <div class="review-rating">${stars(r.r)}</div>
        </div>
        <div class="review-title">${r.t}</div>
        <div class="review-text">${r.x}</div>
      </div>
    `).join('');
};

render(INITIAL_COUNT);

btn.addEventListener('click', () => {
    expanded = !expanded;
    render(expanded ? reviews.length : INITIAL_COUNT);
    btn.innerHTML = expanded
        ? 'Show less <i class="fa-solid fa-arrow-up"></i>'
        : `Show all ${reviews.length} reviews <i class="fa-solid fa-arrow-down"></i>`;
});