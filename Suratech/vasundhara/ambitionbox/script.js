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
    const escapeHtml = str => String(str).replace(/[&<>"']/g, c => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));

    const fmt = v => '₹' + (v / 100000).toFixed(1) + 'L';
    const fmtShort = v => (v / 100000).toFixed(1) + 'L';
    const ctcColor = v => v > 500000 ? 'var(--good)' : v > 250000 ? 'var(--accent)' : 'var(--warn)';
    const ratingColor = v => v >= 4 ? 'var(--good)' : v >= 3 ? 'var(--gold)' : 'var(--warn)';

    // ---------- Job profiles ----------
    const jobProfiles = [
        { name: "Android Developer", avgCtc: 459087, minCtc: 240000, maxCtc: 700000, dataPoints: 8, minExp: 2, maxExp: 5 },
        { name: "Senior IOS Developer", avgCtc: 429400, minCtc: 300000, maxCtc: 684000, dataPoints: 5, minExp: 2, maxExp: 4 },
        { name: "Digital Marketing Executive", avgCtc: 221278, minCtc: 168000, maxCtc: 300000, dataPoints: 4, minExp: 0, maxExp: 1 },
        { name: "Python Developer", avgCtc: 260000, minCtc: 180000, maxCtc: 400000, dataPoints: 4, minExp: 1, maxExp: 2 },
        { name: "Software Tester", avgCtc: 385250, minCtc: 100000, maxCtc: 516000, dataPoints: 4, minExp: 1, maxExp: 6 },
        { name: "Jr Python Developer", avgCtc: 117500, minCtc: 100000, maxCtc: 150000, dataPoints: 4, minExp: 0, maxExp: 1 },
        { name: "React Native Developer", avgCtc: 257542, minCtc: 128771, maxCtc: 360000, dataPoints: 4, minExp: 1, maxExp: 2 },
        { name: "Assistant Project Manager", avgCtc: 573000, minCtc: 540000, maxCtc: 612000, dataPoints: 4, minExp: 1, maxExp: 5 },
        { name: "Flutter Developer", avgCtc: 259616, minCtc: 175000, maxCtc: 420000, dataPoints: 4, minExp: 1, maxExp: 2 },
        { name: "IOS Developer", avgCtc: 212487, minCtc: 106080, maxCtc: 285000, dataPoints: 4, minExp: 1, maxExp: 4 },
        { name: "Team Lead", avgCtc: 490000, minCtc: 270000, maxCtc: 800000, dataPoints: 3, minExp: 3, maxExp: 6 },
        { name: "3D Artist", avgCtc: 256000, minCtc: 216000, maxCtc: 336000, dataPoints: 3, minExp: 0, maxExp: 2 },
        { name: "Web Designer", avgCtc: 206667, minCtc: 100000, maxCtc: 260000, dataPoints: 3, minExp: 0, maxExp: 4 },
        { name: "Android Dev Team Lead", avgCtc: 446667, minCtc: 240000, maxCtc: 600000, dataPoints: 3, minExp: 2, maxExp: 5 },
        { name: "MERN Full Stack Developer", avgCtc: 300000, minCtc: 270000, maxCtc: 345000, dataPoints: 3, minExp: 0, maxExp: 1 },
        { name: "Relationship Wealth Manager", avgCtc: 333333, minCtc: 300000, maxCtc: 350000, dataPoints: 3, minExp: 5, maxExp: 8 },
        { name: "Quality Assurance Tester", avgCtc: 206000, minCtc: 180000, maxCtc: 230000, dataPoints: 2, minExp: 1, maxExp: 3 },
        { name: "Cloud DevOps Engineer", avgCtc: 473800, minCtc: 414000, maxCtc: 529000, dataPoints: 2, minExp: 0, maxExp: 3 },
        { name: "PHP Developer", avgCtc: 365650, minCtc: 319500, maxCtc: 408250, dataPoints: 2, minExp: 1, maxExp: 4 },
        { name: "Android App Developer", avgCtc: 512940, minCtc: 448200, maxCtc: 572700, dataPoints: 2, minExp: 2, maxExp: 4 }
    ];

    const maxCTC = Math.max(...jobProfiles.map(j => j.maxCtc));

    // ---------- Salary Table ----------
    const salarySearch = document.getElementById('salarySearch');
    const salarySort = document.getElementById('salarySort');
    const salaryGroup = document.getElementById('salaryGroup');
    const salaryBody = document.getElementById('salaryBody');
    const salaryCount = document.getElementById('salaryCount');

    const updateSortHeaders = () => {
        const [key, dir] = salarySort.value.split('-');
        document.querySelectorAll('.salary-table thead th').forEach(th => {
            const btn = th.querySelector('.sort-btn');
            const icon = th.querySelector('.sort-icon');
            if (!btn || !icon) return;
            const thKey = btn.dataset.sort;
            if (thKey === key) {
                th.setAttribute('aria-sort', dir === 'asc' ? 'ascending' : 'descending');
                icon.textContent = dir === 'asc' ? '▲' : '▼';
                th.classList.add('is-sorted');
            } else {
                th.setAttribute('aria-sort', 'none');
                icon.textContent = '↕';
                th.classList.remove('is-sorted');
            }
        });
    };

    const renderSalaryTable = () => {
        const search = salarySearch.value.toLowerCase().trim();
        const group = salaryGroup.value;
        const [sortKey, sortDir] = salarySort.value.split('-');

        let filtered = jobProfiles.filter(j => j.name.toLowerCase().includes(search));
        if (group === 'high') filtered = filtered.filter(j => j.avgCtc > 500000);
        else if (group === 'mid') filtered = filtered.filter(j => j.avgCtc >= 250000 && j.avgCtc <= 500000);
        else if (group === 'low') filtered = filtered.filter(j => j.avgCtc < 250000);

        filtered.sort((a, b) => {
            if (sortKey === 'name') {
                return sortDir === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
            }
            const keyMap = { avgCtc: 'avgCtc', minCtc: 'minCtc', maxCtc: 'maxCtc', exp: 'maxExp', dataPoints: 'dataPoints' };
            const k = keyMap[sortKey] || 'dataPoints';
            return sortDir === 'asc' ? a[k] - b[k] : b[k] - a[k];
        });

        salaryCount.textContent = `${filtered.length} of ${jobProfiles.length} roles`;

        if (filtered.length === 0) {
            salaryBody.innerHTML = `<tr><td colspan="7" class="empty-cell">No roles match your search.</td></tr>`;
            return;
        }

        const pct = v => Math.round((v / maxCTC) * 100);

        salaryBody.innerHTML = filtered.map(j => `
            <tr>
                <td class="role-cell" title="${escapeHtml(j.name)}">${escapeHtml(j.name)}</td>
                <td class="avg-cell" style="color:${ctcColor(j.avgCtc)}">${fmt(j.avgCtc)}</td>
                <td class="mono hide-sm">${fmt(j.minCtc)}</td>
                <td class="mono hide-sm">${fmt(j.maxCtc)}</td>
                <td class="hide-md">
                    <div class="range-bar" aria-label="Average ${fmt(j.avgCtc)} of max ${fmt(maxCTC)}">
                        <div class="range-track">
                            <div class="range-fill" style="width:${pct(j.avgCtc)}%; background:${ctcColor(j.avgCtc)};"></div>
                        </div>
                    </div>
                </td>
                <td class="hide-sm">${j.minExp}–${j.maxExp} yr</td>
                <td class="dp-cell">${j.dataPoints}</td>
            </tr>
        `).join('');

        updateSortHeaders();
    };

    document.querySelectorAll('.salary-table .sort-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const key = btn.dataset.sort;
            const [ck, cd] = salarySort.value.split('-');
            salarySort.value = ck === key ? `${key}-${cd === 'desc' ? 'asc' : 'desc'}` : `${key}-desc`;
            renderSalaryTable();
        });
    });

    salarySearch.addEventListener('input', renderSalaryTable);
    salarySort.addEventListener('change', renderSalaryTable);
    salaryGroup.addEventListener('change', renderSalaryTable);
    renderSalaryTable();

    // ---------- Salary Chart ----------
    const sortedForChart = [...jobProfiles].sort((a, b) => b.avgCtc - a.avgCtc);
    document.getElementById('salaryChart').innerHTML = sortedForChart.map(j => {
        const pct = Math.round((j.avgCtc / sortedForChart[0].avgCtc) * 100);
        return `<div class="bar-row" role="listitem" aria-label="${escapeHtml(j.name)}: average CTC ${fmt(j.avgCtc)}, based on ${j.dataPoints} data points">
            <div class="bar-label" title="${escapeHtml(j.name)}">${escapeHtml(j.name)}</div>
            <div class="bar-track"><div class="bar-fill" style="width:${pct}%; background:${ctcColor(j.avgCtc)};">${fmtShort(j.avgCtc)}</div></div>
            <div class="bar-value">${j.dataPoints} pts</div>
        </div>`;
    }).join('');

    // ---------- Rating trends ----------
    const trends = [
        { name: 'Overall', vals: [3.42, 3.42, 3.41, 3.41, 3.41, 3.41] },
        { name: 'Company culture', vals: [3.30, 3.30, 3.30, 3.30, 3.30, 3.30] },
        { name: 'Work-life balance', vals: [3.26, 3.26, 3.26, 3.26, 3.26, 3.26] },
        { name: 'Skill development', vals: [3.18, 3.18, 3.18, 3.18, 3.18, 3.18] },
        { name: 'Job security', vals: [3.05, 3.05, 3.05, 3.05, 3.05, 3.05] },
        { name: 'Work satisfaction', vals: [3.00, 3.00, 2.99, 2.99, 2.99, 2.99] },
        { name: 'Compensation', vals: [2.89, 2.89, 2.89, 2.89, 2.89, 2.89] },
        { name: 'Career growth', vals: [2.87, 2.87, 2.87, 2.87, 2.87, 2.87] }
    ];

    document.getElementById('trendsBody').innerHTML = trends.map(t => {
        const change = (t.vals[5] - t.vals[0]).toFixed(2);
        const changeClass = change > 0 ? 'good-text' : change < 0 ? 'warn-text' : 'muted-text';
        const changeSign = change > 0 ? '+' : '';
        const cells = t.vals.map(v => `<td style="color:${ratingColor(v)}; font-weight:600;">${v.toFixed(2)}</td>`).join('');
        return `<tr>
            <th scope="row">${escapeHtml(t.name)}</th>
            ${cells}
            <td class="${changeClass}">${changeSign}${change}</td>
        </tr>`;
    }).join('');

    // ---------- Category ratings ----------
    const ratings = [
        { name: 'Overall rating', val: 3.4 },
        { name: 'Company culture', val: 3.3 },
        { name: 'Work-life balance', val: 3.3 },
        { name: 'Skill development', val: 3.2 },
        { name: 'Job security', val: 3.1 },
        { name: 'Work satisfaction', val: 3.0 },
        { name: 'Compensation', val: 2.9 },
        { name: 'Career growth', val: 2.9 }
    ];
    document.getElementById('ratingsChart').innerHTML = ratings.map(r => {
        const pct = r.val / 5 * 100;
        const color = ratingColor(r.val);
        return `<div class="rating-bar-row" role="listitem" aria-label="${escapeHtml(r.name)}: ${r.val} out of 5">
            <div class="rating-bar-label">${escapeHtml(r.name)}</div>
            <div class="rating-bar-track"><div class="rating-bar-fill" style="width:${pct}%; background:${color};"></div></div>
            <div class="rating-bar-val" style="color:${color}">${r.val}</div>
        </div>`;
    }).join('');

    // ---------- Star distribution ----------
    const dist = [
        { r: 5, p: 33.3, c: 7 },
        { r: 4, p: 38.1, c: 8 },
        { r: 3, p: 19.0, c: 4 },
        { r: 2, p: 0, c: 0 },
        { r: 1, p: 9.5, c: 2 }
    ];
    document.getElementById('distChart').innerHTML = dist.map(d => {
        const color = d.r >= 4 ? 'var(--good)' : d.r === 3 ? 'var(--gold)' : 'var(--warn)';
        const stars = '★'.repeat(d.r) + '<span class="empty-star" aria-hidden="true">' + '★'.repeat(5 - d.r) + '</span>';
        return `<div class="rating-bar-row" role="listitem" aria-label="${d.r} star rating: ${d.p}% (${d.c} reviews)">
            <div class="rating-bar-label">${stars} (${d.c})</div>
            <div class="rating-bar-track"><div class="rating-bar-fill" style="width:${d.p}%; background:${color};"></div></div>
            <div class="rating-bar-val">${d.p}%</div>
        </div>`;
    }).join('');

    // ---------- Peers ----------
    const largePeers = [
        { name: 'TCS', rating: 3.3, reviews: 115592, salaries: 1023423, jobs: 4489 },
        { name: 'Wipro', rating: 3.6, reviews: 65732, salaries: 491436, jobs: 317 },
        { name: 'Cognizant', rating: 3.7, reviews: 62061, salaries: 606800, jobs: 713 },
        { name: 'Capgemini', rating: 3.6, reviews: 54059, salaries: 492379, jobs: 2195 },
        { name: 'Tech Mahindra', rating: 3.3, reviews: 43774, salaries: 287040, jobs: 589 },
        { name: 'IBM', rating: 3.9, reviews: 25987, salaries: 216902, jobs: 1163 },
        { name: 'LTIMindtree', rating: 3.6, reviews: 26756, salaries: 201073, jobs: 516 },
        { name: 'DXC Technology', rating: 3.6, reviews: 12123, salaries: 75313, jobs: 204 }
    ];

    const allPeers = [
        { name: 'AuroIN', rating: 4.1, salaries: 87, benefits: 9 },
        { name: 'Kaavian Systems', rating: 4.0, salaries: 164, benefits: 3 },
        { name: 'Essel Shyam Comm.', rating: 4.0, salaries: 54, benefits: 3 },
        { name: 'Enerji Systems', rating: 4.0, salaries: 135, benefits: 1 },
        { name: 'CoreCompete', rating: 3.8, salaries: 146, benefits: 3 },
        { name: 'KS Technologies', rating: 3.6, salaries: 174, benefits: 6 },
        { name: 'U Software Systems', rating: 3.6, salaries: 113, benefits: 0 },
        { name: 'Techsture Tech', rating: 3.6, salaries: 88, benefits: 0 },
        { name: 'Vasundhara Infotech', rating: 3.4, salaries: 145, benefits: 2, isSelf: true },
        { name: 'Brainworks BS', rating: 3.2, salaries: 86, benefits: 1 },
        { name: 'IS Global Web', rating: 3.2, salaries: 100, benefits: 4 },
        { name: 'Logiciel Solutions', rating: 2.9, salaries: 194, benefits: 1 },
        { name: 'Aryavrat Infotech', rating: 2.7, salaries: 112, benefits: 1 },
        { name: 'Omniism Tech', rating: 2.5, salaries: 133, benefits: 7 },
        { name: 'NeoTech Global', rating: 2.4, salaries: 133, benefits: 1 },
        { name: 'Eateam', rating: 2.3, salaries: 169, benefits: 1 },
        { name: 'Handygo Tech', rating: 1.7, salaries: 145, benefits: 2 },
        { name: 'Libsys Corporation', rating: 1.6, salaries: 101, benefits: 0 }
    ];

    const ratingPill = r => `<span class="rating-pill" style="color:${ratingColor(r)}">${r}</span>`;

    document.getElementById('largePeersGrid').innerHTML = largePeers.map(p => `
        <div class="peer-card">
            <div class="peer-card-head">
                <div class="peer-card-name">${escapeHtml(p.name)}</div>
                ${ratingPill(p.rating)}
            </div>
            <div class="peer-card-stats">
                <span><strong>${p.reviews.toLocaleString('en-IN')}</strong> reviews</span>
                <span><strong>${p.salaries.toLocaleString('en-IN')}</strong> salaries</span>
                <span><strong>${p.jobs.toLocaleString('en-IN')}</strong> jobs</span>
            </div>
        </div>
    `).join('');

    document.getElementById('allPeersGrid').innerHTML = allPeers.map(p => `
        <div class="peer-card ${p.isSelf ? 'is-self' : ''}">
            <div class="peer-card-head">
                <div class="peer-card-name">${escapeHtml(p.name)}${p.isSelf ? ' <span class="self-tag">YOU</span>' : ''}</div>
                ${ratingPill(p.rating)}
            </div>
            <div class="peer-card-stats">
                <span><strong>${p.salaries}</strong> salaries</span>
                <span><strong>${p.benefits}</strong> benefits</span>
            </div>
        </div>
    `).join('');

    // ---------- Interview questions ----------
    const interviews = [
        {
            type: 'coding',
            role: 'ReactJS Developer',
            question: 'Can you provide a JavaScript example to solve a problem?',
            answers: 1,
            summary: 'Example of a JavaScript function to reverse a string.',
            approach: [
                'Define a function that takes a string input',
                'Split the string into an array of characters',
                'Reverse the array',
                'Join the reversed array back into a string',
                'Return the reversed string'
            ],
            complexity: { time: 'O(n) where n is the length of the string', space: 'O(n) for the array of characters' },
            code: "function reverseString(str) {\n  return str.split('').reverse().join('');\n}"
        },
        {
            type: 'theory',
            role: 'Unity Developer',
            question: 'What methods are used in Photon?',
            answers: 2,
            bullets: [
                '<strong>Connection:</strong> Connect(), Disconnect(), Reconnect(), Authenticate to manage client-server sessions.',
                '<strong>Room management:</strong> CreateRoom(), JoinRoom(), JoinOrCreateRoom(), JoinRandomRoom(), LeaveRoom(), GetRoomList(); plus SetCustomProperties / GetCustomProperties.',
                '<strong>Player management:</strong> JoinLobby(), LeaveLobby(), SetPlayerName(), SetPlayerCustomProperties(), GetPlayerList().',
                '<strong>Realtime events:</strong> RaiseEvent() / OpRaiseEvent() for custom events; OnEvent() callback; reliable/unreliable delivery.',
                '<strong>RPCs:</strong> OpCustom() and PhotonView.RPC (in PUN) for remote procedure calls.',
                '<strong>State sync &amp; matchmaking:</strong> FindFriends, JoinRandomRoom with filters, PhotonTransformView, state batching.'
            ]
        },
        {
            type: 'theory',
            role: 'ReactJS Developer',
            question: 'Can you explain how React works from a logical and JavaScript coding perspective?',
            answers: 1,
            bullets: [
                '<strong>Concept:</strong> React is a declarative, component-based UI library — you describe the UI for a given state and React figures out how to update the DOM.',
                '<strong>JSX &amp; Components:</strong> JSX compiles to <code>React.createElement(...)</code>. Components return elements; props are read-only inputs, state is local mutable data.',
                '<strong>Virtual DOM:</strong> React diffs the new virtual DOM against the previous tree and applies the minimum set of real-DOM operations (reconciliation).',
                '<strong>Rendering flow:</strong> On state/prop change, schedule update → re-render to virtual DOM → diff → patch real DOM.',
                '<strong>Hooks:</strong> useState/useEffect manage state and side-effects in functional components. Effects run after render; updates are batched.',
                '<strong>Optimizations:</strong> Synthetic events; React.memo, useMemo, useCallback; correct <code>key</code> usage for lists.'
            ]
        },
        {
            type: 'theory',
            role: 'Unity Developer',
            question: 'How many types of loops are there in C#?',
            answers: 2,
            bullets: [
                '<strong>Count:</strong> Four main loop types in C# commonly used for iteration and control flow.',
                '<strong>For loop:</strong> Best when iteration count is known. <code>for(init; condition; increment)</code>.',
                '<strong>Foreach loop:</strong> Designed for enumerating collections. <code>foreach(var item in collection)</code>.',
                '<strong>While loop:</strong> Repeats while a condition is true; condition checked before each iteration.',
                '<strong>Do-while loop:</strong> Executes body at least once, then checks the condition.',
                '<strong>Notes:</strong> Infinite loops via <code>for(;;)</code> or <code>while(true)</code>; <code>break</code>/<code>continue</code> for control; LINQ and <code>yield return</code> as alternatives.'
            ]
        }
    ];

    document.getElementById('interviewsList').innerHTML = interviews.map(q => {
        const body = q.type === 'coding'
            ? `<div class="iv-section">
                <div class="iv-label">Approach</div>
                <ol class="iv-approach">${q.approach.map(s => `<li>${escapeHtml(s)}</li>`).join('')}</ol>
              </div>
              <div class="iv-section">
                <div class="iv-label">Complexity</div>
                <div class="iv-complex">
                    <span><strong>Time:</strong> ${escapeHtml(q.complexity.time)}</span>
                    <span><strong>Space:</strong> ${escapeHtml(q.complexity.space)}</span>
                </div>
              </div>
              <div class="iv-section">
                <div class="iv-label">Sample code</div>
                <pre class="iv-code"><code>${escapeHtml(q.code)}</code></pre>
              </div>`
            : `<div class="iv-section">
                <div class="iv-label">Answer notes</div>
                <ul class="iv-bullets">${q.bullets.map(b => `<li>${b}</li>`).join('')}</ul>
              </div>`;

        return `<article class="iv-card">
            <div class="iv-head">
                <div class="iv-q-meta">
                    <span class="iv-type ${q.type}">${q.type === 'coding' ? 'Coding' : 'Theory'}</span>
                    <span class="iv-role">${escapeHtml(q.role)}</span>
                    <span class="iv-answers">${q.answers} answer${q.answers > 1 ? 's' : ''}</span>
                </div>
            </div>
            <h3 class="iv-q">${escapeHtml(q.question)}</h3>
            ${q.type === 'coding' && q.summary ? `<p class="iv-summary">${escapeHtml(q.summary)}</p>` : ''}
            ${body}
        </article>`;
    }).join('');

    // ---------- Benefits ----------
    const benefits = [
        { name: 'Job/Soft skill training', count: 2, icon: 'fa-graduation-cap' },
        { name: 'Health insurance', count: 1, icon: 'fa-heart-pulse' },
        { name: 'Professional degree assistance', count: 1, icon: 'fa-certificate' },
        { name: 'Retirement benefits', count: 0, icon: 'fa-piggy-bank' },
        { name: 'Office cab/shuttle', count: 0, icon: 'fa-van-shuttle' },
        { name: 'Stock options', count: 0, icon: 'fa-chart-line' },
        { name: 'Annual health checkup', count: 0, icon: 'fa-stethoscope' },
        { name: 'Performance bonus', count: 0, icon: 'fa-trophy' },
        { name: 'Free meal', count: 0, icon: 'fa-utensils' },
        { name: 'Joining bonus', count: 0, icon: 'fa-gift' },
        { name: 'Mental health wellbeing', count: 0, icon: 'fa-brain' },
        { name: 'Paternity leaves', count: 0, icon: 'fa-person-breastfeeding' },
        { name: 'Maternity leaves', count: 0, icon: 'fa-baby' },
        { name: 'WFH setup', count: 0, icon: 'fa-house-laptop' },
        { name: 'Life insurance', count: 0, icon: 'fa-shield-halved' },
        { name: 'Gym membership', count: 0, icon: 'fa-dumbbell' },
        { name: 'Office gym', count: 0, icon: 'fa-person-running' },
        { name: 'Cafeteria', count: 0, icon: 'fa-mug-hot' },
        { name: 'Rewards & recognition', count: 0, icon: 'fa-award' },
        { name: 'Career break/Sabbatical', count: 0, icon: 'fa-umbrella-beach' }
    ];
    document.getElementById('benefitsGrid').innerHTML = benefits.map(b => `
        <div class="benefit-card ${b.count > 0 ? 'has-benefit' : 'no-benefit'}">
            <div class="benefit-icon ${b.count > 0 ? 'has' : 'none'}" aria-hidden="true"><i class="fa-solid ${b.icon}"></i></div>
            <div>
                <div class="benefit-name">${escapeHtml(b.name)}</div>
                <div class="benefit-count">${b.count > 0 ? b.count + ' reported' : 'Not reported'}</div>
            </div>
        </div>
    `).join('');

    // ---------- FAQs ----------
    const faqs = [
        {
            q: 'Does Vasundhara Infotech have good work-life balance?',
            a: 'Vasundhara Infotech has a work-life balance rating of <strong>3.3 out of 5</strong> based on 20+ employee reviews. 29% of employees rated it 3 or below, while 71% rated it 4 or above for work-life balance. This rating suggests that while some employees recognize efforts towards work-life balance, there is scope for improvement based on employee feedback.'
        },
        {
            q: 'Is Vasundhara Infotech good for career growth?',
            a: 'Career growth at Vasundhara Infotech is rated as <strong class="warn-text">poor</strong>, with a promotions and appraisal rating of <strong>2.9</strong>. 29% of employees rated it 3 or below on promotions and appraisal. This rating reflects a negative sentiment among employees for career growth.'
        },
        {
            q: 'What are the cons of working at Vasundhara Infotech?',
            a: 'Working at Vasundhara Infotech does have some drawbacks. The company is poorly rated for <strong>salary &amp; benefits, promotions / appraisal, and work satisfaction</strong>, based on 20+ employee reviews on AmbitionBox.'
        }
    ];

    document.getElementById('faqList').innerHTML = faqs.map(f => `
        <details class="faq-item">
            <summary class="faq-q"><span>${escapeHtml(f.q)}</span><i class="fa-solid fa-chevron-down" aria-hidden="true"></i></summary>
            <div class="faq-a">${f.a}</div>
        </details>
    `).join('');

})();