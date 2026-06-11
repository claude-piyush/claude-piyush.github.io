(() => {
    'use strict';

    // ---------- Mobile nav toggle ----------
    const navToggle = document.getElementById('navToggle');
    const navMobile = document.getElementById('navMobile');

    const setNavState = (open) => {
        navMobile.classList.toggle('open', open);
        navMobile.hidden = !open;
        navToggle.setAttribute('aria-expanded', String(open));
        navToggle.innerHTML = open
            ? '<i class="fa-solid fa-xmark" aria-hidden="true"></i>'
            : '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
        navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };

    navToggle.addEventListener('click', () => {
        setNavState(!navMobile.classList.contains('open'));
    });

    navMobile.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => setNavState(false));
    });

    // ---------- Reviews data ----------
    const reviews = [
        { a: "Edwin Prada", r: 1, d: "Oct 17, 2025", t: "Lack of accountability and transparency", x: "Although individual tasks were generally completed satisfactorily, the project as a whole seemed more like a set of unrelated features than a unified system. Narola Infotech did not handle underlying issues with transparency; instead, they continued billing us without disclosing that some of the problems had originated from their own work." },
        { a: "allen macias", r: 2, d: "Oct 16, 2025", t: "Not Quite What We Hoped For", x: "The team was friendly and responsive at first, but the execution didn't match the initial enthusiasm. The app worked, but it didn't feel intuitive or well-tested. We expected more attention to detail." },
        { a: "Francisco Mejia", r: 1, d: "Oct 16, 2025", t: "Inflexible and Rigid", x: "Narola Infotech was unwilling to adapt to our changing requirements. Even minor tweaks were met with resistance or extra charges. There was no clear roadmap, and they didn't share sprint reports or milestones. It felt like we were flying blind." },
        { a: "Vianey Lopez", r: 1, d: "Oct 15, 2025", t: "Misleading Portfolio", x: "Their portfolio looked impressive, but the actual work we received was nowhere near that standard. There was no dedicated project manager, and tasks were passed around without accountability. Deadlines were missed, and we had to constantly chase updates." },
        { a: "Jaime Mejia", r: 1, d: "Oct 15, 2025", t: "Amateur Coding and Zero Quality Control", x: "What I got was a barely functional prototype with frequent crashes and data mismatches. Their code was a mess — outdated frameworks, no error handling, and zero documentation. Their so-called QA process missed basic bugs like input validation errors, which surfaced during live operations." },
        { a: "Clik", r: 1, d: "Oct 3, 2025", t: "Worst experience", x: "Worked with Narola via Upwork for over two years and spent more than $20,000, only to end up with a broken API backend. No security: anyone with my domain URL could access files on my server. Poor coding practices, raw SQL queries over sockets, and the API crashed when just 3–4 users made requests." },
        { a: "Aaron Ormerod", r: 1, d: "Oct 1, 2025", t: "Nothing was delivered after 9 months", x: "After almost 9 months nothing was delivered and/or working, and their poor business practices left us having to deal with two serious security breaches — including all our codebases being stolen. They will promise everything, minimise your concerns, consistently attempt to add more resource (at a cost) and never actually deliver." },
        { a: "Pascal Tournaire", r: 1, d: "Jul 31, 2025", t: "Deeply disappointing", x: "Despite promising high-quality software solutions, they delivered a bug-riddled website and app that were barely functional. Once payment was made, their team became virtually unresponsive. It came across as a company focused more on revenue than on delivering value." },
        { a: "Putra Muhammad", r: 1, d: "Jul 8, 2025", t: "Communication was a major issue", x: "Updates were vague and infrequent, and I had to follow up multiple times just to get basic answers. It felt like my project was not a priority for them. I would not recommend this company." },
        { a: "Léonard Anthony", r: 1, d: "Jul 8, 2025", t: "Failed to deliver", x: "Bugs were everywhere, and they ignored all requests for fixes once the payment was made. Their communication was inconsistent, vague, and unhelpful." },
        { a: "Iqu Iqee", r: 1, d: "Jul 7, 2025", t: "Frustrating experience", x: "They delivered an incomplete website and app, despite multiple assurances that everything would be finished. After receiving payment, communication became inconsistent." },
        { a: "Shameer Khan", r: 1, d: "Jul 7, 2025", t: "Disappointing experience", x: "I hired them to develop a website and mobile app, but they failed to deliver a complete product. Several important features were missing, despite being clearly outlined in our agreement." },
        { a: "Maggie Mwangi", r: 1, d: "Jul 1, 2025", t: "Talks big but fails to deliver", x: "Their team lacks professionalism, and once they get your money, they stop caring. Totally unreliable and disappointing experience." },
        { a: "Kyle", r: 1, d: "Jul 1, 2025", t: "This company is a scam", x: "They promise quality software but deliver broken code and ignore your concerns. Don't waste your time or money with Narola Infotech — you've been warned." },
        { a: "Leandro Munoz", r: 1, d: "Dec 29, 2024", t: "Disappointing Quality of Work", x: "The level of professionalism at Narola Infotech left much to be desired. The work was riddled with errors, and their team lacked the expertise they claimed to have." },
        { a: "Reshmi amaya", r: 1, d: "Dec 29, 2024", t: "Poor Communication and Delivery", x: "Their team was uncooperative, and communication was a constant struggle. The project took much longer than promised, and the end product still had major flaws." },
        { a: "Auro Chung Lam", r: 5, d: "Feb 9, 2021", t: "Highly recommended for Web & App development", x: "Highly recommended for any customer for website development." }
    ];

    // Sort by date descending (newest first)
    reviews.sort((a, b) => new Date(b.d) - new Date(a.d));

    // ---------- Helpers ----------
    const initials = name =>
        name.trim().split(/\s+/).slice(0, 2).map(w => w[0]).join('').toUpperCase();

    const stars = r => {
        let html = '';
        for (let i = 1; i <= 5; i++) {
            html += i <= r
                ? '<i class="fa-solid fa-star" aria-hidden="true"></i>'
                : '<i class="fa-regular fa-star empty" aria-hidden="true"></i>';
        }
        return html;
    };

    const escapeHtml = str => str.replace(/[&<>"']/g, c => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));

    // ---------- Sentiment bar ----------
    const renderSentimentBar = () => {
        const total = reviews.length;
        const positive = reviews.filter(r => r.r >= 4).length;
        const neutral = reviews.filter(r => r.r === 3).length;
        const negative = reviews.filter(r => r.r <= 2).length;
        const avg = (reviews.reduce((s, r) => s + r.r, 0) / total).toFixed(1);

        const pct = n => (n / total * 100).toFixed(1);

        document.getElementById('sentimentBar').innerHTML = `
            <div class="sentiment-summary">
                <div><span class="sentiment-avg">${avg}</span><span class="sentiment-sub">/5 average across ${total} reviews</span></div>
                <div class="sentiment-counts">
                    <span class="sc-good">${positive} positive</span>
                    <span class="sc-neutral">${neutral} neutral</span>
                    <span class="sc-bad">${negative} negative</span>
                </div>
            </div>
            <div class="sentiment-track" role="img" aria-label="${negative} negative, ${neutral} neutral, ${positive} positive">
                ${negative ? `<div class="sentiment-seg seg-bad" style="width:${pct(negative)}%"></div>` : ''}
                ${neutral ? `<div class="sentiment-seg seg-neutral" style="width:${pct(neutral)}%"></div>` : ''}
                ${positive ? `<div class="sentiment-seg seg-good" style="width:${pct(positive)}%"></div>` : ''}
            </div>
        `;
    };

    // ---------- Reviews render ----------
    const list = document.getElementById('reviewsList');
    const btn = document.getElementById('showMoreBtn');
    const showMoreLabel = document.getElementById('showMoreLabel');
    const INITIAL_COUNT = 4;

    let expanded = false;
    let activeFilter = 'all';

    const getFiltered = () =>
        activeFilter === 'all' ? reviews : reviews.filter(r => r.r === Number(activeFilter));

    const render = () => {
        const filtered = getFiltered();
        const count = expanded ? filtered.length : Math.min(INITIAL_COUNT, filtered.length);
        const slice = filtered.slice(0, count);

        if (slice.length === 0) {
            list.innerHTML = `<div class="reviews-empty">No reviews match this filter.</div>`;
        } else {
            list.innerHTML = slice.map(r => `
                <article class="review ${r.r >= 4 ? 'positive' : 'negative'}">
                    <div class="review-head">
                        <div class="review-author">
                            <div class="review-avatar" aria-hidden="true">${escapeHtml(initials(r.a))}</div>
                            <div>
                                <div class="review-name">${escapeHtml(r.a)}</div>
                                <div class="review-date">${escapeHtml(r.d)}</div>
                            </div>
                        </div>
                        <div class="review-rating" aria-label="${r.r} out of 5 stars">${stars(r.r)}</div>
                    </div>
                    <h3 class="review-title">${escapeHtml(r.t)}</h3>
                    <p class="review-text">${escapeHtml(r.x)}</p>
                </article>
            `).join('');
        }

        // Button visibility/state
        const total = filtered.length;
        if (total <= INITIAL_COUNT) {
            btn.parentElement.style.display = 'none';
        } else {
            btn.parentElement.style.display = '';
            showMoreLabel.textContent = expanded ? 'Show less' : `Show all ${total} reviews`;
            btn.querySelector('i').className = expanded
                ? 'fa-solid fa-arrow-up'
                : 'fa-solid fa-arrow-down';
            btn.setAttribute('aria-expanded', String(expanded));
        }
    };

    btn.addEventListener('click', () => {
        expanded = !expanded;
        render();
    });

    // Filter pills
    document.querySelectorAll('.filter-pill').forEach(pill => {
        pill.addEventListener('click', () => {
            document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            activeFilter = pill.dataset.filter;
            expanded = false;
            render();
        });
    });

    renderSentimentBar();
    render();
})();