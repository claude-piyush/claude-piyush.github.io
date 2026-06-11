(() => {
    'use strict';

    // ---------- Data ----------
    const orgData = {
        name: "Chirag Pipaliya", role: "Board Member", dept: "exec", badge: "Board",
        children: [
            {
                name: "Agnesh Pipaliya", role: "Chief Operating Officer", dept: "exec", badge: "COO",
                children: [
                    { name: "Sachin Dungrani", role: "Product Quality Assurance Manager", dept: "ops" },
                    {
                        name: "Tarun Bariya", role: "Human Resources Manager", dept: "hr", badge: "Manager",
                        children: [
                            {
                                name: "Tarun Bariya", role: "Human Resources Team Lead", dept: "hr",
                                note: "Same individual also listed as HR Manager — appears twice in the source data.",
                                children: [
                                    { name: "Heni Lapsiwala", role: "Jr. Human Resources Executive", dept: "hr" },
                                    { name: "Sailor Arti", role: "Human Resources Specialist", dept: "hr" },
                                    { name: "Dharini Gohil", role: "Human Resources Executive", dept: "hr" },
                                    { name: "Sanjana Asodariya", role: "Human Resources Executive", dept: "hr" },
                                    { name: "Ayushi Hr", role: "Human Resources Executive", dept: "hr" },
                                    { name: "Jayesh Variya", role: "Human Resources Executive", dept: "hr" },
                                    { name: "Vimal Tarsariya", role: "Head of Department", dept: "hr" }
                                ]
                            }
                        ]
                    },
                    { name: "Ronak Pipaliya", role: "Head of Technology (Game & Animation)", dept: "tech", badge: "Head" }
                ]
            },
            {
                name: "Somish Kakadiya", role: "Chief Marketing Officer", dept: "marketing", badge: "CMO",
                children: [
                    {
                        name: "Vasundhara Infotech", role: "Marketing Head", dept: "marketing",
                        note: "Corporate placeholder account in The Org's data — not an individual person.",
                        isPlaceholder: true,
                        children: [
                            {
                                name: "Gaurav Das", role: "Digital Marketing Manager", dept: "marketing", badge: "Manager",
                                children: [
                                    { name: "Vivek Gamit", role: "Search Engine Optimization Team Lead", dept: "marketing" },
                                    { name: "Raj More", role: "Sr. SEO Executive", dept: "marketing" },
                                    { name: "Dhruvi Satasiya", role: "ASO Executive", dept: "marketing" },
                                    { name: "Sojitra Ankit", role: "App Store Optimization", dept: "marketing" },
                                    { name: "Divyesh Patil", role: "Digital Marketing Executive", dept: "marketing" },
                                    { name: "Pinal Ratanpara", role: "Digital Marketing Executive", dept: "marketing" },
                                    { name: "Arihant Rakhecha", role: "Digital Marketing Executive", dept: "marketing" },
                                    { name: "Atul Parmar", role: "Search Engine Optimization Executive", dept: "marketing" },
                                    { name: "Yankit Gayakvad", role: "Search Engine Optimization Executive", dept: "marketing" },
                                    { name: "Shivani Patel", role: "Search Engine Optimization Executive", dept: "marketing" }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    };

    // ---------- Constants ----------
    const deptLabels = {
        exec: 'Executive', marketing: 'Marketing', hr: 'Human Resources',
        tech: 'Technology', ops: 'Quality Assurance'
    };
    const levelLabels = ['Board', 'C-Suite', 'Manager / Lead', 'Senior / Specialist', 'Executive', 'Junior / Trainee'];

    // ---------- Helpers ----------
    const escapeHtml = str => String(str).replace(/[&<>"']/g, c => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));

    const initials = name => {
        const parts = name.split(' ').filter(Boolean);
        return parts.slice(0, 2).map(w => w[0]).join('').toUpperCase();
    };

    const pluralize = (n, singular, plural) => `${n} ${n === 1 ? singular : (plural || singular + 's')}`;

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

    // ---------- Build tree ----------
    const registry = [];
    let idCounter = 0;

    const countDescendants = (node) => {
        if (!node.children || !node.children.length) return 0;
        let total = node.children.length;
        for (const c of node.children) total += countDescendants(c);
        return total;
    };

    const buildNode = (node, parentName = null, level = 0) => {
        const id = idCounter++;
        const directReports = node.children ? node.children.length : 0;
        const totalTeam = countDescendants(node);
        registry[id] = {
            id, name: node.name, role: node.role, dept: node.dept,
            parent: parentName, directReports, totalTeam, level,
            note: node.note || null, isPlaceholder: !!node.isPlaceholder
        };

        const li = document.createElement('li');
        li.className = 'org-node';
        li.setAttribute('role', 'treeitem');

        const card = document.createElement('div');
        card.className = 'node-card';
        if (node.isPlaceholder) card.classList.add('is-placeholder');
        card.dataset.dept = node.dept;
        card.dataset.id = String(id);
        card.id = `person-${id}`;
        card.tabIndex = 0;
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `${node.name}, ${node.role}. Tap for details.`);

        const toggle = document.createElement('button');
        toggle.type = 'button';
        toggle.className = 'node-toggle' + (directReports === 0 ? ' leaf' : '');
        if (directReports > 0) {
            toggle.setAttribute('aria-label', `Expand ${node.name}'s reports`);
            toggle.setAttribute('aria-expanded', 'false');
            toggle.setAttribute('aria-controls', `children-${id}`);
            toggle.innerHTML = '<i class="fa-solid fa-chevron-right" aria-hidden="true"></i>';
        } else {
            toggle.setAttribute('aria-hidden', 'true');
            toggle.tabIndex = -1;
        }

        const avatar = document.createElement('div');
        avatar.className = 'node-avatar';
        avatar.textContent = node.isPlaceholder ? 'V' : initials(node.name);
        avatar.setAttribute('aria-hidden', 'true');

        const info = document.createElement('div');
        info.className = 'node-info';
        const nameHtml = node.isPlaceholder
            ? `<div class="node-name">${escapeHtml(node.name)} <span class="node-flag" title="Corporate placeholder, not an individual"><i class="fa-solid fa-circle-info" aria-hidden="true"></i></span></div>`
            : `<div class="node-name">${escapeHtml(node.name)}</div>`;
        info.innerHTML = `${nameHtml}<div class="node-role">${escapeHtml(node.role)}</div>`;

        const meta = document.createElement('div');
        meta.className = 'node-meta';
        if (node.badge) {
            meta.innerHTML += `<span class="node-badge">${escapeHtml(node.badge)}</span>`;
        }
        if (totalTeam > 0) {
            meta.innerHTML += `<span class="node-count" title="${directReports} direct · ${totalTeam} total"><i class="fa-solid fa-user-group" aria-hidden="true"></i>${totalTeam}</span>`;
        }

        card.appendChild(toggle);
        card.appendChild(avatar);
        card.appendChild(info);
        card.appendChild(meta);
        li.appendChild(card);

        card.addEventListener('click', (e) => {
            if (e.target.closest('.node-toggle')) return;
            openModal(id);
        });
        card.addEventListener('keydown', (e) => {
            if (e.target !== card) return;
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openModal(id);
            }
        });

        if (node.children && node.children.length) {
            const childUl = document.createElement('ul');
            childUl.id = `children-${id}`;
            childUl.className = 'org-children collapsed';
            childUl.setAttribute('role', 'group');
            for (const child of node.children) {
                childUl.appendChild(buildNode(child, node.name, level + 1));
            }
            li.appendChild(childUl);

            toggle.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleNode(childUl, toggle);
            });
        }

        return li;
    };

    const toggleNode = (childUl, toggle, forceState) => {
        const isCollapsed = childUl.classList.contains('collapsed');
        const shouldExpand = forceState !== undefined ? forceState : isCollapsed;

        if (shouldExpand && isCollapsed) {
            childUl.classList.remove('collapsed');
            toggle.classList.add('expanded');
            toggle.setAttribute('aria-expanded', 'true');
            const lbl = toggle.getAttribute('aria-label');
            if (lbl) toggle.setAttribute('aria-label', lbl.replace('Expand', 'Collapse'));
        } else if (!shouldExpand && !isCollapsed) {
            childUl.classList.add('collapsed');
            toggle.classList.remove('expanded');
            toggle.setAttribute('aria-expanded', 'false');
            const lbl = toggle.getAttribute('aria-label');
            if (lbl) toggle.setAttribute('aria-label', lbl.replace('Collapse', 'Expand'));
        }
    };

    const tree = document.getElementById('orgTree');
    tree.appendChild(buildNode(orgData));

    // Auto-expand the top two levels (Board → COO + CMO)
    const rootToggle = tree.querySelector('.node-toggle');
    const rootChildren = tree.querySelector('.org-children');
    if (rootToggle && rootChildren && !rootToggle.classList.contains('leaf')) {
        toggleNode(rootChildren, rootToggle, true);
        // Also expand level-2 (COO and CMO) so user immediately sees the structure
        rootChildren.querySelectorAll(':scope > li > .node-card > .node-toggle:not(.leaf)').forEach(t => {
            const ul = document.getElementById(t.getAttribute('aria-controls'));
            if (ul) toggleNode(ul, t, true);
        });
    }

    // ---------- Expand / collapse all ----------
    document.getElementById('expandAll').addEventListener('click', () => {
        document.querySelectorAll('.org-children').forEach(ul => ul.classList.remove('collapsed'));
        document.querySelectorAll('.node-toggle:not(.leaf)').forEach(t => {
            t.classList.add('expanded');
            t.setAttribute('aria-expanded', 'true');
        });
    });
    document.getElementById('collapseAll').addEventListener('click', () => {
        document.querySelectorAll('.org-children').forEach(ul => ul.classList.add('collapsed'));
        document.querySelectorAll('.node-toggle:not(.leaf)').forEach(t => {
            t.classList.remove('expanded');
            t.setAttribute('aria-expanded', 'false');
        });
    });

    // ---------- Modal ----------
    const modal = document.getElementById('modal');
    const modalClose = document.getElementById('modalClose');
    const modalLocate = document.getElementById('modalLocate');
    let currentModalId = null;

    const cssVar = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

    const openModal = (id) => {
        const n = registry[id];
        if (!n) return;
        currentModalId = id;

        const avatar = document.getElementById('modalAvatar');
        avatar.textContent = n.isPlaceholder ? 'V' : initials(n.name);
        avatar.style.background = cssVar(`--${n.dept}`);

        document.getElementById('modalName').textContent = n.name;
        document.getElementById('modalRole').textContent = n.role;
        document.getElementById('modalDept').innerHTML =
            `<span class="modal-dept-tag"><span class="dot ${n.dept}-dot" aria-hidden="true"></span>${deptLabels[n.dept]}</span>`;
        document.getElementById('modalReports').textContent = n.parent || '—';
        document.getElementById('modalDirects').textContent = n.directReports > 0 ? pluralize(n.directReports, 'person', 'people') : 'None';
        document.getElementById('modalTotal').textContent = n.totalTeam > 0 ? pluralize(n.totalTeam, 'person', 'people') : 'Individual contributor';
        document.getElementById('modalLevel').textContent = levelLabels[Math.min(n.level, levelLabels.length - 1)];

        // Show note if present
        let noteRow = modal.querySelector('.modal-note');
        if (noteRow) noteRow.remove();
        if (n.note) {
            const note = document.createElement('div');
            note.className = 'modal-note';
            note.innerHTML = `<i class="fa-solid fa-circle-info" aria-hidden="true"></i><span>${escapeHtml(n.note)}</span>`;
            modal.querySelector('.modal-body').appendChild(note);
        }

        history.replaceState(null, '', `#person-${id}`);

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
        if (location.hash.startsWith('#person-')) {
            history.replaceState(null, '', location.pathname + location.search);
        }
        currentModalId = null;
    };

    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('close', () => document.body.classList.remove('modal-open'));
    modal.addEventListener('click', (e) => {
        const rect = modal.getBoundingClientRect();
        if (e.clientX < rect.left || e.clientX > rect.right ||
            e.clientY < rect.top || e.clientY > rect.bottom) {
            closeModal();
        }
    });

    modalLocate.addEventListener('click', () => {
        if (currentModalId === null) return;
        const id = currentModalId;
        closeModal();
        expandAncestors(id);
        const card = document.getElementById(`person-${id}`);
        if (card) {
            requestAnimationFrame(() => {
                card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                highlightCard(card);
            });
        }
    });

    const highlightCard = (card) => {
        document.querySelectorAll('.node-card.is-highlighted').forEach(c => c.classList.remove('is-highlighted'));
        card.classList.add('is-highlighted');
        setTimeout(() => card.classList.remove('is-highlighted'), 2400);
    };

    const expandAncestors = (id) => {
        const card = document.getElementById(`person-${id}`);
        if (!card) return;
        let parent = card.parentElement?.parentElement;
        while (parent) {
            if (parent.classList && parent.classList.contains('org-children')) {
                parent.classList.remove('collapsed');
                const parentLi = parent.parentElement;
                const parentToggle = parentLi?.querySelector(':scope > .node-card > .node-toggle');
                if (parentToggle && !parentToggle.classList.contains('leaf')) {
                    parentToggle.classList.add('expanded');
                    parentToggle.setAttribute('aria-expanded', 'true');
                }
            }
            parent = parent.parentElement;
        }
    };

    // ---------- Search + dept filter ----------
    const searchInput = document.getElementById('orgSearch');
    const searchClear = document.getElementById('searchClear');
    const searchStatus = document.getElementById('searchStatus');
    const orgEmpty = document.getElementById('orgEmpty');
    const legendChips = document.querySelectorAll('.legend-chip');
    let activeDept = 'all';

    const applyFilters = () => {
        const query = searchInput.value.trim().toLowerCase();
        searchClear.hidden = query.length === 0;

        let matchedIds = [];
        registry.forEach(p => {
            const matchesQuery = !query || p.name.toLowerCase().includes(query) || p.role.toLowerCase().includes(query);
            const matchesDept = activeDept === 'all' || p.dept === activeDept;
            const card = document.getElementById(`person-${p.id}`);
            if (!card) return;
            if (matchesQuery && matchesDept) {
                card.classList.remove('is-dimmed');
                card.classList.toggle('is-match', !!query);
                matchedIds.push(p.id);
            } else {
                card.classList.add('is-dimmed');
                card.classList.remove('is-match');
            }
        });

        if (query || activeDept !== 'all') {
            document.querySelectorAll('.org-children').forEach(ul => ul.classList.remove('collapsed'));
            document.querySelectorAll('.node-toggle:not(.leaf)').forEach(t => {
                t.classList.add('expanded');
                t.setAttribute('aria-expanded', 'true');
            });
        }

        if (query) {
            const count = registry.filter(p => p.name.toLowerCase().includes(query) || p.role.toLowerCase().includes(query)).length;
            const filtered = matchedIds.length;
            searchStatus.hidden = false;
            searchStatus.textContent = activeDept === 'all'
                ? `${pluralize(count, 'match', 'matches')} for "${searchInput.value.trim()}"`
                : `${filtered} of ${count} matches (filtered by ${deptLabels[activeDept]})`;
        } else if (activeDept !== 'all') {
            searchStatus.hidden = false;
            searchStatus.textContent = `Showing ${deptLabels[activeDept]} only`;
        } else {
            searchStatus.hidden = true;
            searchStatus.textContent = '';
        }

        const noMatches = matchedIds.length === 0 && (query || activeDept !== 'all');
        orgEmpty.hidden = !noMatches;
        tree.hidden = noMatches;

        if (query && matchedIds.length > 0) {
            const firstCard = document.getElementById(`person-${matchedIds[0]}`);
            if (firstCard) {
                requestAnimationFrame(() => firstCard.scrollIntoView({ behavior: 'smooth', block: 'center' }));
            }
        }
    };

    searchInput.addEventListener('input', applyFilters);
    searchClear.addEventListener('click', () => {
        searchInput.value = '';
        searchInput.focus();
        applyFilters();
    });

    legendChips.forEach(chip => {
        chip.addEventListener('click', () => {
            legendChips.forEach(c => {
                c.classList.remove('active');
                c.setAttribute('aria-pressed', 'false');
            });
            chip.classList.add('active');
            chip.setAttribute('aria-pressed', 'true');
            activeDept = chip.dataset.dept;
            applyFilters();
        });
    });

    document.getElementById('resetSearch').addEventListener('click', () => {
        searchInput.value = '';
        activeDept = 'all';
        legendChips.forEach(c => {
            const isAll = c.dataset.dept === 'all';
            c.classList.toggle('active', isAll);
            c.setAttribute('aria-pressed', String(isAll));
        });
        applyFilters();
    });

    // ---------- Departments grid ----------
    // Build dept member lists from registry — using ids so we can deep-link
    const deptMembersByDept = {};
    registry.forEach(p => {
        if (!deptMembersByDept[p.dept]) deptMembersByDept[p.dept] = [];
        deptMembersByDept[p.dept].push(p);
    });

    for (const [dept, members] of Object.entries(deptMembersByDept)) {
        const el = document.getElementById('dept-' + dept);
        if (!el) continue;
        el.innerHTML = members.map(p => {
            const placeholderClass = p.isPlaceholder ? ' is-placeholder-chip' : '';
            return `<button type="button" class="dept-member${placeholderClass}" data-id="${p.id}" title="${escapeHtml(p.role)}">${escapeHtml(p.name)}</button>`;
        }).join('');
    }

    document.querySelectorAll('.dept-member[data-id]').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = parseInt(btn.dataset.id, 10);
            expandAncestors(id);
            const card = document.getElementById(`person-${id}`);
            if (card) {
                card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                setTimeout(() => {
                    highlightCard(card);
                    openModal(id);
                }, 400);
            }
        });
    });

    // ---------- Headcount distribution bars ----------
    const deptCounts = [
        { dept: 'marketing', count: 14 },
        { dept: 'hr', count: 10 },
        { dept: 'exec', count: 2 },
        { dept: 'tech', count: 1 },
        { dept: 'ops', count: 1 }
    ];
    const totalCount = 34;
    document.getElementById('deptBars').innerHTML = deptCounts.map(d => {
        const pct = (d.count / totalCount * 100).toFixed(1);
        return `<div class="dept-bar-row">
            <div class="dept-bar-label"><span class="dot ${d.dept}-dot" aria-hidden="true"></span>${deptLabels[d.dept]}</div>
            <div class="dept-bar-track">
                <div class="dept-bar-fill ${d.dept}-fill" style="width:${pct}%">${d.count}</div>
            </div>
            <div class="dept-bar-pct">${pct}%</div>
        </div>`;
    }).join('');

    // ---------- Deep-link on initial load ----------
    if (location.hash.startsWith('#person-')) {
        const id = parseInt(location.hash.replace('#person-', ''), 10);
        if (!Number.isNaN(id) && registry[id]) {
            requestAnimationFrame(() => {
                expandAncestors(id);
                const card = document.getElementById(`person-${id}`);
                if (card) {
                    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    setTimeout(() => openModal(id), 500);
                }
            });
        }
    }

})();