        const orgData = {
            name: "Ashish Narola", role: "Chief Executive Officer (CEO)", dept: "exec", badge: "CEO",
            children: [
                { name: "Nilesh Paladiya", role: "Chief Technology Officer (CTO)", dept: "tech", badge: "CTO", children: [] },
                {
                    name: "Paresh Paladiya", role: "Chief Information Officer (CIO)", dept: "infra", badge: "CIO", children: [
                        { name: "Chirag Mistry", role: "Lead Network Administrator", dept: "infra" }
                    ]
                },
                {
                    name: "Urvish Narola", role: "Chief Sales Officer (CSO)", dept: "exec", badge: "CSO", children: [
                        {
                            name: "Krunal Kantharia", role: "Sr. Business Development Manager", dept: "sales", children: [
                                {
                                    name: "Raj Chauhan", role: "Business Development Manager", dept: "sales", children: [
                                        { name: "Himanshu Mistry", role: "Business Development Executive", dept: "sales" },
                                        { name: "Shivam Desai", role: "Business Development Executive", dept: "sales" },
                                        { name: "Madhu Varma", role: "Business Development Executive", dept: "sales" },
                                        { name: "Mohammed Godil", role: "Business Development Executive", dept: "sales" },
                                        { name: "Mahir Shaikh", role: "Business Development Executive", dept: "sales" },
                                        { name: "Bhumi Shah", role: "Business Development Executive", dept: "sales" },
                                        { name: "Drashti Joshi", role: "Business Development Executive", dept: "sales" },
                                        { name: "Manoj Parmar", role: "Business Development Executive", dept: "sales" },
                                        { name: "Uvais Saiyed", role: "Business Development Associate", dept: "sales" },
                                        { name: "Priyanshi Jariwala", role: "Jr. Business Development Executive", dept: "sales" },
                                        { name: "Shaymabegum Saiyed", role: "Jr. Business Development Associate", dept: "sales" },
                                        { name: "Priyanka Nayak", role: "Jr. Business Development Executive", dept: "sales" },
                                        { name: "Mital Saliya", role: "Business Development Associate", dept: "sales" }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    name: "Prerna Gupta", role: "Director of Operations", dept: "exec", badge: "Director", children: [
                        {
                            name: "Nitesh Gujar", role: "Team Leader", dept: "ops", children: [
                                { name: "Priyank Gandhi", role: "Assistant Team Leader", dept: "ops" },
                                { name: "Akhil Ise", role: "Mobile Application Developer", dept: "ops" },
                                { name: "Micky Shah", role: "Android Developer", dept: "ops" },
                                { name: "Bhaven Shah", role: "Sr. Android Developer", dept: "ops" },
                                { name: "Jay Patel", role: "iOS Developer", dept: "ops" }
                            ]
                        },
                        {
                            name: "Viral Patel", role: "Project Manager", dept: "ops", children: [
                                {
                                    name: "Zaid Saiyad", role: "Technical Team Lead", dept: "ops", children: [
                                        { name: "Divyang Vaghela", role: "Trainee Software Engineer", dept: "ops" },
                                        { name: "Atul Sable", role: "Software Trainee", dept: "ops" },
                                        { name: "Nisarg Patil", role: "Trainee Software Engineer", dept: "ops" },
                                        { name: "Jyot Paghdal", role: "Trainee Software Engineer", dept: "ops" },
                                        { name: "Prachi Deore", role: "Trainee Software Engineer", dept: "ops" },
                                        { name: "Daraksha A.", role: "Trainee Software Engineer", dept: "ops" }
                                    ]
                                },
                                {
                                    name: "Milan Gupta", role: "Team Lead", dept: "ops", children: [
                                        { name: "Kaushik Patel", role: "Software Tester", dept: "ops" },
                                        { name: "Hansraj Darekar", role: "PHP Developer Intern", dept: "ops" },
                                        { name: "Kishan Rathod", role: "Ruby On Rails Developer", dept: "ops" },
                                        { name: "Hardik Vekaiya", role: "Full Stack Developer", dept: "ops" },
                                        { name: "Nisha Rao", role: "Sr. QA Engineer", dept: "ops" },
                                        { name: "Pooja Patil", role: "Sr. Wordpress Developer", dept: "ops" },
                                        { name: "Ankit Prajapati", role: "Wordpress Developer", dept: "ops" },
                                        { name: "Krisha Patel", role: "Software Engineer Trainee", dept: "ops" },
                                        { name: "Adnan Shaikh", role: "Software Engineer Intern", dept: "ops" },
                                        { name: "Rushikesh Bhavsar", role: "Software Engineer Intern", dept: "ops" },
                                        { name: "Saurav Patel", role: "Jr. Software Engineer", dept: "ops" },
                                        { name: "Vaishvi Vaidya", role: "Software Engineer Trainee", dept: "ops" },
                                        { name: "Priti Ladda", role: "Software Engineer Trainee", dept: "ops" }
                                    ]
                                },
                                { name: "Shubham Gadhe", role: "PHP Developer", dept: "ops" }
                            ]
                        },
                        {
                            name: "Winsun Michael", role: "HR Manager", dept: "hr", badge: "Manager", children: [
                                { name: "Komal Patil", role: "Talent Acquisition Manager", dept: "hr" },
                                { name: "Dhwani Dixit", role: "Human Resources Executive", dept: "hr" }
                            ]
                        },
                        { name: "Maitri Visariya", role: "Sr. Implementation Consultant", dept: "ops" },
                        { name: "Harshal Bhatt", role: "Sr. Software Consultant", dept: "ops" },
                        { name: "Jay Jariwala", role: "Senior Consultant", dept: "ops" },
                        { name: "Riya Shastri", role: "Senior Consultant", dept: "ops" },
                        { name: "Krishna Gondaliya", role: "Senior Consultant", dept: "ops" },
                        { name: "Mahesh Trapasiya", role: "Senior Consultant", dept: "ops" }
                    ]
                }
            ]
        };

        // Helpers
        const initials = name => name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
        const deptLabels = {
            exec: 'Executive', tech: 'Technology', ops: 'Operations',
            sales: 'Sales', hr: 'Human Resources', infra: 'Infrastructure'
        };
        const deptColors = {
            exec: 'var(--exec)', tech: 'var(--tech)', ops: 'var(--ops)',
            sales: 'var(--sales)', hr: 'var(--hr)', infra: 'var(--infra)'
        };
        const levelLabels = ['C-Suite', 'Director / VP', 'Manager / Lead', 'Senior / Specialist', 'Executive / Engineer', 'Trainee / Intern'];

        // Registry & tree assembly
        let registry = [];
        let idCounter = 0;

        // Count total descendants (recursive team size)
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
                parent: parentName, directReports, totalTeam, level
            };

            const li = document.createElement('li');
            li.className = 'org-node';

            // Card
            const card = document.createElement('div');
            card.className = 'node-card';
            card.dataset.dept = node.dept;
            card.dataset.id = id;

            // Toggle
            const toggle = document.createElement('button');
            toggle.className = 'node-toggle' + (directReports === 0 ? ' leaf' : '');
            toggle.setAttribute('aria-label', directReports > 0 ? 'Expand' : '');
            toggle.innerHTML = directReports > 0 ? '<i class="fa-solid fa-chevron-right"></i>' : '';

            // Avatar
            const avatar = document.createElement('div');
            avatar.className = 'node-avatar';
            avatar.textContent = initials(node.name);

            // Info
            const info = document.createElement('div');
            info.className = 'node-info';
            info.innerHTML = `<div class="node-name">${node.name}</div><div class="node-role">${node.role}</div>`;

            // Meta (badge + count)
            const meta = document.createElement('div');
            meta.className = 'node-meta';
            if (node.badge) {
                meta.innerHTML += `<span class="node-badge">${node.badge}</span>`;
            }
            if (totalTeam > 0) {
                meta.innerHTML += `<span class="node-count" title="${directReports} direct · ${totalTeam} total"><i class="fa-solid fa-user-group"></i>${totalTeam}</span>`;
            }

            card.appendChild(toggle);
            card.appendChild(avatar);
            card.appendChild(info);
            card.appendChild(meta);
            li.appendChild(card);

            // Open modal on card click (excluding toggle)
            card.addEventListener('click', (e) => {
                if (e.target.closest('.node-toggle')) return;
                openModal(id);
            });

            // Children
            if (node.children && node.children.length) {
                const childUl = document.createElement('ul');
                childUl.className = 'org-children collapsed';
                for (const child of node.children) {
                    childUl.appendChild(buildNode(child, node.name, level + 1));
                }
                li.appendChild(childUl);

                // Toggle behaviour
                toggle.addEventListener('click', (e) => {
                    e.stopPropagation();
                    toggleNode(childUl, toggle);
                });
            }

            return li;
        };

        const toggleNode = (childUl, toggle) => {
            const isCollapsed = childUl.classList.contains('collapsed');
            if (isCollapsed) {
                childUl.classList.remove('collapsed');
                // measure target height
                childUl.style.maxHeight = 'none';
                const target = childUl.scrollHeight;
                childUl.style.maxHeight = '0px';
                requestAnimationFrame(() => {
                    childUl.style.maxHeight = target + 'px';
                });
                childUl.addEventListener('transitionend', function handler() {
                    childUl.style.maxHeight = 'none';
                    childUl.removeEventListener('transitionend', handler);
                    // Recompute parent heights
                    propagateHeight(childUl);
                });
                toggle.classList.add('expanded');
                toggle.setAttribute('aria-label', 'Collapse');
            } else {
                childUl.style.maxHeight = childUl.scrollHeight + 'px';
                requestAnimationFrame(() => {
                    childUl.style.maxHeight = '0px';
                    childUl.classList.add('collapsed');
                });
                toggle.classList.remove('expanded');
                toggle.setAttribute('aria-label', 'Expand');
            }
        };

        const propagateHeight = (el) => {
            let parent = el.parentElement;
            while (parent) {
                if (parent.classList && parent.classList.contains('org-children') && !parent.classList.contains('collapsed')) {
                    parent.style.maxHeight = 'none';
                }
                parent = parent.parentElement;
            }
        };

        // Build initial tree
        const tree = document.getElementById('orgTree');
        tree.appendChild(buildNode(orgData));

        // Auto-expand the root (CEO) so user sees the top-level reports
        const rootToggle = tree.querySelector('.node-toggle');
        const rootChildren = tree.querySelector('.org-children');
        if (rootToggle && rootChildren) {
            rootChildren.classList.remove('collapsed');
            rootChildren.style.maxHeight = 'none';
            rootToggle.classList.add('expanded');
        }

        // Expand / Collapse all
        document.getElementById('expandAll').addEventListener('click', () => {
            document.querySelectorAll('.org-children').forEach(ul => {
                ul.classList.remove('collapsed');
                ul.style.maxHeight = 'none';
            });
            document.querySelectorAll('.node-toggle').forEach(t => {
                if (!t.classList.contains('leaf')) t.classList.add('expanded');
            });
        });
        document.getElementById('collapseAll').addEventListener('click', () => {
            document.querySelectorAll('.org-children').forEach(ul => {
                ul.classList.add('collapsed');
                ul.style.maxHeight = '0px';
            });
            document.querySelectorAll('.node-toggle').forEach(t => t.classList.remove('expanded'));
        });

        // Modal
        const openModal = (id) => {
            const n = registry[id];
            const avatar = document.getElementById('modalAvatar');
            avatar.textContent = initials(n.name);
            avatar.style.background = getComputedStyle(document.documentElement).getPropertyValue('--' + n.dept).trim();
            document.getElementById('modalName').textContent = n.name;
            document.getElementById('modalRole').textContent = n.role;
            document.getElementById('modalDept').innerHTML =
                `<span class="modal-dept-tag"><span class="dot" style="background:${deptColors[n.dept]}"></span>${deptLabels[n.dept]}</span>`;
            document.getElementById('modalReports').textContent = n.parent || '—';
            document.getElementById('modalDirects').textContent = n.directReports > 0 ? n.directReports + ' people' : 'None';
            document.getElementById('modalTotal').textContent = n.totalTeam > 0 ? n.totalTeam + ' people' : 'Individual contributor';
            document.getElementById('modalLevel').textContent = levelLabels[Math.min(n.level, levelLabels.length - 1)];
            document.getElementById('modal').classList.add('show');
            document.body.style.overflow = 'hidden';
        };
        window.closeModal = () => {
            document.getElementById('modal').classList.remove('show');
            document.body.style.overflow = '';
        };
        document.getElementById('modal').addEventListener('click', e => {
            if (e.target.id === 'modal') closeModal();
        });
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') closeModal();
        });

        // Departments
        const deptMembers = {
            ops: ["Nitesh Gujar", "Priyank Gandhi", "Viral Patel", "Zaid Saiyad", "Milan Gupta", "Shubham Gadhe", "Maitri Visariya", "Harshal Bhatt", "Jay Jariwala", "Riya Shastri", "Krishna Gondaliya", "Mahesh Trapasiya", "Divyang Vaghela", "Atul Sable", "Nisarg Patil", "Jyot Paghdal", "Prachi Deore", "Daraksha A.", "Kaushik Patel", "Hansraj Darekar", "Kishan Rathod", "Hardik Vekaiya", "Nisha Rao", "Pooja Patil", "Ankit Prajapati", "Krisha Patel", "Adnan Shaikh", "Rushikesh Bhavsar", "Saurav Patel", "Vaishvi Vaidya", "Priti Ladda", "Akhil Ise", "Micky Shah", "Bhaven Shah", "Jay Patel"],
            sales: ["Krunal Kantharia", "Raj Chauhan", "Himanshu Mistry", "Shivam Desai", "Madhu Varma", "Mohammed Godil", "Mahir Shaikh", "Bhumi Shah", "Drashti Joshi", "Manoj Parmar", "Uvais Saiyed", "Priyanshi Jariwala", "Shaymabegum Saiyed", "Priyanka Nayak", "Mital Saliya"],
            hr: ["Winsun Michael", "Komal Patil", "Dhwani Dixit"],
            infra: ["Paresh Paladiya", "Chirag Mistry"],
            tech: ["Nilesh Paladiya"]
        };
        for (const [dept, members] of Object.entries(deptMembers)) {
            const el = document.getElementById('dept-' + dept);
            if (el) el.innerHTML = members.map(m => `<span class="dept-member">${m}</span>`).join('');
        }
