        // Mobile nav
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

        // Collapsible sections
        function toggleSection(id) {
            const el = document.getElementById(id);
            const btn = el.previousElementSibling;
            const isOpen = el.classList.toggle('open');
            const icon = btn.querySelector('i');
            if (isOpen) {
                icon.className = 'fa-solid fa-chevron-up';
                btn.innerHTML = btn.innerHTML.replace('Show', 'Hide');
            } else {
                icon.className = 'fa-solid fa-chevron-down';
                btn.innerHTML = btn.innerHTML.replace('Hide', 'Show');
            }
        }
