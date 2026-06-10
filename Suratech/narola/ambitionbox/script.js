        // Mobile nav
        const navToggle = document.getElementById('navToggle');
        const navMobile = document.getElementById('navMobile');
        navToggle.addEventListener('click', () => {
            navMobile.classList.toggle('open');
            navToggle.innerHTML = navMobile.classList.contains('open') ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
        });
        navMobile.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
            navMobile.classList.remove('open');
            navToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
        }));

        // Data
        const jobProfiles = [
            { name: "Software Engineer", avgCtc: 358157, minCtc: 181800, maxCtc: 520000, dataPoints: 51, minExp: 0, maxExp: 3 },
            { name: "Senior Software Engineer", avgCtc: 535075, minCtc: 345000, maxCtc: 750000, dataPoints: 49, minExp: 2, maxExp: 4 },
            { name: "Senior QA Engineer", avgCtc: 480620, minCtc: 275000, maxCtc: 672000, dataPoints: 16, minExp: 3, maxExp: 6 },
            { name: "QA Engineer", avgCtc: 283296, minCtc: 200000, maxCtc: 390450, dataPoints: 14, minExp: 1, maxExp: 3 },
            { name: "Principal Software Engineer", avgCtc: 1003669, minCtc: 752752, maxCtc: 1200000, dataPoints: 13, minExp: 5, maxExp: 8 },
            { name: "Senior Software Developer", avgCtc: 561257, minCtc: 420000, maxCtc: 800000, dataPoints: 8, minExp: 2, maxExp: 8 },
            { name: "Technical Lead", avgCtc: 694037, minCtc: 535000, maxCtc: 910000, dataPoints: 8, minExp: 2, maxExp: 9 },
            { name: "Business Development Executive", avgCtc: 266476, minCtc: 180000, maxCtc: 360000, dataPoints: 7, minExp: 0, maxExp: 4 },
            { name: "Senior iOS Developer", avgCtc: 423226, minCtc: 300000, maxCtc: 600000, dataPoints: 7, minExp: 1, maxExp: 5 },
            { name: "Laravel Developer", avgCtc: 588333, minCtc: 505000, maxCtc: 880000, dataPoints: 6, minExp: 3, maxExp: 3 },
            { name: "Project Manager", avgCtc: 1033680, minCtc: 840000, maxCtc: 1300000, dataPoints: 5, minExp: 10, maxExp: 13 },
            { name: "Senior Graphic Designer", avgCtc: 379692, minCtc: 186154, maxCtc: 600000, dataPoints: 5, minExp: 1, maxExp: 7 },
            { name: "Network Administrator", avgCtc: 237367, minCtc: 170000, maxCtc: 340000, dataPoints: 5, minExp: 1, maxExp: 3 },
            { name: "Software Developer", avgCtc: 345163, minCtc: 300000, maxCtc: 372000, dataPoints: 5, minExp: 1, maxExp: 2 },
            { name: "Web Designer", avgCtc: 390942, minCtc: 290400, maxCtc: 528000, dataPoints: 5, minExp: 2, maxExp: 6 },
            { name: "Content Writer", avgCtc: 482392, minCtc: 438000, maxCtc: 535000, dataPoints: 4, minExp: 4, maxExp: 7 },
            { name: "Android Mobile App Developer", avgCtc: 660000, minCtc: 600000, maxCtc: 744000, dataPoints: 4, minExp: 4, maxExp: 6 },
            { name: "Accounts & Finance Manager", avgCtc: 825000, minCtc: 800000, maxCtc: 850000, dataPoints: 4, minExp: 10, maxExp: 13 },
            { name: "Team Lead", avgCtc: 837848, minCtc: 705000, maxCtc: 1000000, dataPoints: 4, minExp: 5, maxExp: 8 },
            { name: "React Native Developer", avgCtc: 504504, minCtc: 360000, maxCtc: 732000, dataPoints: 4, minExp: 1, maxExp: 6 }
        ];

        const fmt = v => '₹' + (v / 100000).toFixed(1) + 'L';
        const fmtShort = v => (v / 100000).toFixed(1) + 'L';
        const maxCTC = Math.max(...jobProfiles.map(j => j.maxCtc));

        // Salary Table
        let currentSort = { key: 'dataPoints', dir: 'desc' };
        function renderSalaryTable() {
            const search = document.getElementById('salarySearch').value.toLowerCase();
            const group = document.getElementById('salaryGroup').value;
            const sortVal = document.getElementById('salarySort').value;
            const [sortKey, sortDir] = sortVal.split('-');

            let filtered = jobProfiles.filter(j => j.name.toLowerCase().includes(search));
            if (group === 'high') filtered = filtered.filter(j => j.avgCtc > 700000);
            else if (group === 'mid') filtered = filtered.filter(j => j.avgCtc >= 350000 && j.avgCtc <= 700000);
            else if (group === 'low') filtered = filtered.filter(j => j.avgCtc < 350000);

            filtered.sort((a, b) => {
                let va, vb;
                if (sortKey === 'name') { va = a.name; vb = b.name; return sortDir === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va); }
                if (sortKey === 'avgCtc') { va = a.avgCtc; vb = b.avgCtc; }
                else if (sortKey === 'dataPoints') { va = a.dataPoints; vb = b.dataPoints; }
                else if (sortKey === 'exp') { va = a.maxExp; vb = b.maxExp; }
                else { va = a.avgCtc; vb = b.avgCtc; }
                return sortDir === 'asc' ? va - vb : vb - va;
            });

            document.getElementById('salaryCount').textContent = `${filtered.length} of ${jobProfiles.length} roles`;
            const pct = v => Math.round((v / maxCTC) * 100);
            const color = v => v > 700000 ? 'var(--good)' : v > 350000 ? 'var(--accent)' : 'var(--warn)';

            document.getElementById('salaryBody').innerHTML = filtered.map(j => `
        <tr>
            <td style="font-weight:600;">${j.name}</td>
            <td style="color:${color(j.avgCtc)}; font-weight:600;">${fmt(j.avgCtc)}</td>
            <td class="mono">${fmt(j.minCtc)}</td>
            <td class="mono">${fmt(j.maxCtc)}</td>
            <td>
                <div class="range-bar">
                    <div class="range-track">
                        <div class="range-fill" style="width:${pct(j.avgCtc)}%; background:${color(j.avgCtc)};"></div>
                    </div>
                </div>
            </td>
            <td>${j.minExp}–${j.maxExp} yr</td>
            <td style="font-weight:600;">${j.dataPoints}</td>
        </tr>
    `).join('');
        }

        window.sortTable = (key) => {
            const sel = document.getElementById('salarySort');
            const map = { name: 'name', avgCtc: 'avgCtc', minCtc: 'avgCtc', maxCtc: 'avgCtc', exp: 'exp', dataPoints: 'dataPoints' };
            const k = map[key] || 'dataPoints';
            const current = sel.value;
            const [ck, cd] = current.split('-');
            if (ck === k) sel.value = `${k}-${cd === 'desc' ? 'asc' : 'desc'}`;
            else sel.value = `${k}-desc`;
            renderSalaryTable();
        };

        document.getElementById('salarySearch').addEventListener('input', renderSalaryTable);
        document.getElementById('salarySort').addEventListener('change', renderSalaryTable);
        document.getElementById('salaryGroup').addEventListener('change', renderSalaryTable);
        renderSalaryTable();

        // Salary Chart
        const sorted = [...jobProfiles].sort((a, b) => b.avgCtc - a.avgCtc);
        document.getElementById('salaryChart').innerHTML = sorted.map(j => {
            const pct = Math.round((j.avgCtc / sorted[0].avgCtc) * 100);
            const color = j.avgCtc > 700000 ? 'var(--good)' : j.avgCtc > 350000 ? 'var(--accent)' : 'var(--warn)';
            return `<div class="bar-row">
        <div class="bar-label" title="${j.name}">${j.name}</div>
        <div class="bar-track"><div class="bar-fill" style="width:${pct}%; background:${color};">${fmtShort(j.avgCtc)}</div></div>
        <div class="bar-value">${j.dataPoints} pts</div>
    </div>`;
        }).join('');

        // Ratings
        const ratings = [
            { name: 'Work-life balance', val: 3.56 },
            { name: 'Overall rating', val: 3.37 },
            { name: 'Company culture', val: 3.18 },
            { name: 'Skill development', val: 3.11 },
            { name: 'Career growth', val: 3.04 },
            { name: 'Work satisfaction', val: 3.01 },
            { name: 'Job security', val: 2.89 },
            { name: 'Compensation', val: 2.87 }
        ];
        document.getElementById('ratingsChart').innerHTML = ratings.map(r => {
            const pct = (r.val / 5 * 100);
            const color = r.val >= 3.5 ? 'var(--good)' : r.val >= 3 ? 'var(--gold)' : 'var(--warn)';
            return `<div class="rating-bar-row">
        <div class="rating-bar-label">${r.name}</div>
        <div class="rating-bar-track"><div class="rating-bar-fill" style="width:${pct}%; background:${color};"></div></div>
        <div class="rating-bar-val" style="color:${color}">${r.val}</div>
    </div>`;
        }).join('');

        // Star distribution
        const dist = [{ r: 5, p: 36.25, c: 29 }, { r: 4, p: 27.5, c: 22 }, { r: 3, p: 10, c: 8 }, { r: 2, p: 11.25, c: 9 }, { r: 1, p: 15, c: 12 }];
        document.getElementById('distChart').innerHTML = dist.map(d => {
            const color = d.r >= 4 ? 'var(--good)' : d.r === 3 ? 'var(--gold)' : 'var(--warn)';
            return `<div class="rating-bar-row">
        <div class="rating-bar-label">${'★'.repeat(d.r)}${'<span style="color:var(--line)">★</span>'.repeat(5 - d.r)} (${d.c})</div>
        <div class="rating-bar-track"><div class="rating-bar-fill" style="width:${d.p}%; background:${color};"></div></div>
        <div class="rating-bar-val">${d.p}%</div>
    </div>`;
        }).join('');

        // Reviews
        const reviewsData = [
            {
                id: 1, rating: 4, date: '2025-07-03', role: 'Principal Software Engineer', loc: 'Surat', type: 'fulltime', policy: 'WFO',
                likes: 'Comfortable work environment. Annual increments. Flexible working hours. Good work-life balance. Regular celebration of events and functions.',
                dislikes: 'Salary partiality among employees. Low salary hikes. Lack of job security. Limited opportunities for skill development. Existing skills are not properly utilized.',
                verified: true, ratings: [{ n: 'Salary', v: 3 }, { n: 'Skill dev', v: 1 }, { n: 'Job security', v: 4 }, { n: 'Promotions', v: 4 }, { n: 'Work satisfaction', v: 3 }, { n: 'Culture', v: 5 }, { n: 'WLB', v: 5 }]
            },
            {
                id: 2, rating: 1, date: '2025-09-11', role: 'Software Engineer Trainee', loc: 'Surat', type: 'intern', policy: 'WFO',
                likes: 'Salary on time.',
                dislikes: 'Lots of politics, Deserving candidates are ignored and Bootlickers are preferred. Fights among 2 teams working for same companies. If you are talented don\'t waste your time here.',
                verified: true, ratings: [{ n: 'Salary', v: 1 }, { n: 'Skill dev', v: 1 }, { n: 'Job security', v: 1 }, { n: 'Promotions', v: 1 }, { n: 'Work satisfaction', v: 1 }, { n: 'Culture', v: 1 }, { n: 'WLB', v: 3 }]
            },
            {
                id: 3, rating: 4, date: '2019-01-14', role: 'Senior Software Engineer', loc: 'Surat', type: 'fulltime', policy: null,
                likes: 'Started as trainee, got promoted to senior software engineer. If you work hard they appreciate your efforts. Company gives high pay scale as Surat wise and bonus for extra efforts.',
                dislikes: 'High work pressure and poor management is only bad quality of this company.',
                verified: true, ratings: [{ n: 'Salary', v: 4 }, { n: 'Skill dev', v: 5 }, { n: 'Job security', v: 5 }, { n: 'Promotions', v: 4 }, { n: 'Work satisfaction', v: 4 }, { n: 'Culture', v: 4 }, { n: 'WLB', v: 3 }]
            },
            {
                id: 4, rating: 2, date: '2025-02-02', role: 'Software Engineer', loc: 'Pune', type: 'fulltime', policy: 'WFO',
                likes: 'Good team building activity.',
                dislikes: 'The HR here consider themselves the boss of the company. The policies are very biased towards management — they make sure to exploit employees in every way possible. The Manager and team leader are very toxic and non-supportive.',
                verified: true, ratings: [{ n: 'Salary', v: 1 }, { n: 'Skill dev', v: 3 }, { n: 'Job security', v: 1 }, { n: 'Promotions', v: 2 }, { n: 'Work satisfaction', v: 1 }, { n: 'Culture', v: 1 }, { n: 'WLB', v: 1 }]
            },
            {
                id: 5, rating: 4, date: '2024-11-30', role: 'Senior Software Engineer', loc: 'Surat', type: 'fulltime', policy: 'Hybrid',
                likes: 'It\'s very friendly about their employees. Some culture activities and work life balance.',
                dislikes: 'They don\'t have transparency with employees. Inner political circle and company policy gets updated as per requirement.',
                verified: true, ratings: [{ n: 'Salary', v: 3 }, { n: 'Skill dev', v: 3 }, { n: 'Job security', v: 2 }, { n: 'Promotions', v: 2 }, { n: 'Work satisfaction', v: 3 }, { n: 'Culture', v: 2 }, { n: 'WLB', v: 3 }]
            }
        ];

        function renderReviews() {
            const filter = document.getElementById('reviewFilter').value;
            const sort = document.getElementById('reviewSort').value;
            const loc = document.getElementById('reviewLocFilter').value;

            let f = [...reviewsData];
            if (filter === 'positive') f = f.filter(r => r.rating >= 4);
            else if (filter === 'negative') f = f.filter(r => r.rating <= 2);
            else if (filter === 'neutral') f = f.filter(r => r.rating === 3);
            if (loc !== 'all') f = f.filter(r => r.loc === loc);

            if (sort === 'date-desc') f.sort((a, b) => b.date.localeCompare(a.date));
            else if (sort === 'date-asc') f.sort((a, b) => a.date.localeCompare(b.date));
            else if (sort === 'rating-desc') f.sort((a, b) => b.rating - a.rating);
            else if (sort === 'rating-asc') f.sort((a, b) => a.rating - b.rating);

            document.getElementById('reviewCount').textContent = `${f.length} of ${reviewsData.length} reviews`;
            const stars = r => { let s = ''; for (let i = 1; i <= 5; i++) s += i <= r ? '★' : '<span class="empty">★</span>'; return s; };
            const cls = r => r >= 4 ? 'positive' : r <= 2 ? 'negative' : 'neutral';
            const dateStr = d => new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

            document.getElementById('reviewsList').innerHTML = f.map(r => `
        <div class="review-card ${cls(r.rating)}">
            <div class="review-head">
                <div class="review-meta">
                    <span class="review-stars">${stars(r.rating)}</span>
                    <span class="review-badge role">${r.role}</span>
                    <span class="review-badge loc">${r.loc}</span>
                    ${r.verified ? '<span class="review-badge verified"><i class="fa-solid fa-check" style="margin-right:3px;"></i>Verified</span>' : ''}
                    ${r.policy ? '<span class="tag" style="font-size:11px; padding:3px 8px;">' + r.policy + '</span>' : ''}
                </div>
                <span class="review-date">${dateStr(r.date)}</span>
            </div>
            <div class="review-pros"><strong><i class="fa-solid fa-thumbs-up" style="margin-right:4px;"></i>Likes</strong>${r.likes}</div>
            <div class="review-cons"><strong><i class="fa-solid fa-thumbs-down" style="margin-right:4px;"></i>Dislikes</strong>${r.dislikes}</div>
            <div class="review-ratings-grid">${r.ratings.map(rt => `<span class="review-rating-chip">${rt.n} <span class="chip-val" style="color:${rt.v >= 4 ? 'var(--good)' : rt.v >= 3 ? 'var(--gold)' : 'var(--warn)'}">${rt.v}/5</span></span>`).join('')}</div>
        </div>
    `).join('');
        }
        document.getElementById('reviewFilter').addEventListener('change', renderReviews);
        document.getElementById('reviewSort').addEventListener('change', renderReviews);
        document.getElementById('reviewLocFilter').addEventListener('change', renderReviews);
        renderReviews();

        // Benefits
        const benefits = [
            { name: 'Job/Soft skill training', count: 3, icon: 'fa-graduation-cap' },
            { name: 'Cafeteria', count: 3, icon: 'fa-mug-hot' },
            { name: 'Professional degree assistance', count: 1, icon: 'fa-certificate' },
            { name: 'Retirement benefits', count: 0, icon: 'fa-piggy-bank' },
            { name: 'Office cab/shuttle', count: 0, icon: 'fa-van-shuttle' },
            { name: 'Health insurance', count: 0, icon: 'fa-heart-pulse' },
            { name: 'Performance bonus', count: 0, icon: 'fa-trophy' },
            { name: 'Annual health checkup', count: 0, icon: 'fa-stethoscope' },
            { name: 'Stock options', count: 0, icon: 'fa-chart-line' },
            { name: 'WFH setup', count: 0, icon: 'fa-house-laptop' },
            { name: 'Life insurance', count: 0, icon: 'fa-shield-halved' },
            { name: 'Mental health wellbeing', count: 0, icon: 'fa-brain' },
            { name: 'Maternity leaves', count: 0, icon: 'fa-baby' },
            { name: 'Paternity leaves', count: 0, icon: 'fa-person-breastfeeding' },
            { name: 'Gym membership', count: 0, icon: 'fa-dumbbell' }
        ];
        document.getElementById('benefitsGrid').innerHTML = benefits.map(b => `
    <div class="benefit-card">
        <div class="benefit-icon ${b.count > 0 ? 'has' : 'none'}"><i class="fa-solid ${b.icon}"></i></div>
        <div>
            <div class="benefit-name">${b.name}</div>
            <div class="benefit-count">${b.count > 0 ? b.count + ' reported' : 'Not reported'}</div>
        </div>
    </div>
`).join('');

        // Notice period
        const notice = [{ l: '1 Month', p: 47, c: 72 }, { l: '15 days or less', p: 26, c: 40 }, { l: '2 Months', p: 23, c: 35 }, { l: '3 Months', p: 3, c: 5 }, { l: 'More than 3 months', p: 1, c: 1 }];
        document.getElementById('noticeChart').innerHTML = notice.map(n => {
            const color = n.p > 30 ? 'var(--accent)' : n.p > 15 ? 'var(--gold)' : 'var(--muted)';
            return `<div class="bar-row" style="margin-bottom:6px;">
        <div class="bar-label" style="width:140px;" title="${n.l}">${n.l}</div>
        <div class="bar-track"><div class="bar-fill" style="width:${n.p}%; background:${color};">${n.p}%</div></div>
        <div class="bar-value" style="width:50px;">${n.c}</div>
    </div>`;
        }).join('');

        // Latest salaries
        const latest = [
            { role: 'Software Developer', ctc: 372000, exp: '2y', time: '1w ago' },
            { role: 'Senior Software Engineer', ctc: 648000, exp: '3y', time: '2w ago' },
            { role: 'Software Engineer', ctc: 408000, exp: '2y', time: '3w ago' },
            { role: 'Business Dev Executive', ctc: 312000, exp: '2y', time: '4w ago' },
            { role: 'Software Engineer Trainee', ctc: 260000, exp: '5m', time: '1mo ago' },
            { role: 'QA Engineer', ctc: 265800, exp: '2y', time: '1mo ago' },
            { role: 'Team Leader (Technical)', ctc: 500000, exp: '4y', time: '1mo ago' },
            { role: 'Senior QA Engineer', ctc: 672000, exp: '5y', time: '2mo ago' },
            { role: 'Web Designer', ctc: 528000, exp: '6y', time: '2mo ago' },
            { role: 'Principal Software Engineer', ctc: 960000, exp: '6y', time: '3mo ago' },
            { role: 'Assistant Team Leader', ctc: 600000, exp: '4y', time: '3mo ago' },
            { role: 'Marketing Executive', ctc: 420000, exp: '4y', time: '5mo ago' },
            { role: 'Accounts & Finance Manager', ctc: 850000, exp: '13y', time: '5mo ago' },
            { role: 'React Native Developer', ctc: 360000, exp: '1y', time: '7mo ago' },
            { role: 'Desktop Support Engineer', ctc: 264000, exp: '1y', time: '7mo ago' },
            { role: 'DevOps Engineer', ctc: 450000, exp: '2y', time: '7mo ago' },
            { role: 'Content Writer', ctc: 535000, exp: '7y', time: '8mo ago' },
            { role: 'Team Lead', ctc: 1000000, exp: '8y', time: '9mo ago' },
            { role: 'Network Administrator', ctc: 340000, exp: '3y', time: '9mo ago' },
            { role: 'Senior Consultant', ctc: 720000, exp: '6y', time: '9mo ago' },
            { role: 'Web & Graphics Designer', ctc: 600000, exp: '6y', time: '9mo ago' },
            { role: 'Business Dev Associate', ctc: 180000, exp: '1y', time: '10mo ago' }
        ];
        document.getElementById('latestGrid').innerHTML = latest.map(l => `
    <div class="latest-card">
        <div class="latest-info">
            <div class="latest-role">${l.role}</div>
            <div class="latest-detail">${l.exp} experience · ${l.time}</div>
        </div>
        <div class="latest-ctc">${fmt(l.ctc)}</div>
    </div>
`).join('');
