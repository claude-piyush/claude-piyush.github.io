        // Mobile nav toggle
        const navToggle = document.getElementById('navToggle');
        const navMobile = document.getElementById('navMobile');
        navToggle.addEventListener('click', () => {
            navMobile.classList.toggle('open');
            const isOpen = navMobile.classList.contains('open');
            navToggle.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
        });
        navMobile.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => {
                navMobile.classList.remove('open');
                navToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
            });
        });

        // Reviews
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

        const initials = name => name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
        const stars = r => {
            let s = '';
            for (let i = 1; i <= 5; i++) s += i <= r ? '★' : '<span class="empty">★</span>';
            return s;
        };

        const list = document.getElementById('reviewsList');
        const btn = document.getElementById('showMoreBtn');
        let expanded = false;

        const render = (count) => {
            list.innerHTML = reviews.slice(0, count).map(r => `
      <div class="review ${r.r >= 4 ? 'positive' : 'negative'}">
        <div class="review-head">
          <div class="review-author">
            <div class="review-avatar">${initials(r.a)}</div>
            <div>
              <div class="review-name">${r.a}</div>
              <div class="review-date">${r.d}</div>
            </div>
          </div>
          <div class="review-rating">${stars(r.r)}</div>
        </div>
        <div class="review-title">${r.t}</div>
        <div class="review-text">${r.x}</div>
      </div>
    `).join('');
        };

        render(4);

        btn.addEventListener('click', () => {
            expanded = !expanded;
            render(expanded ? reviews.length : 4);
            btn.innerHTML = expanded
                ? 'Show less <i class="fa-solid fa-arrow-up"></i>'
                : 'Show all 17 reviews <i class="fa-solid fa-arrow-down"></i>';
        });
