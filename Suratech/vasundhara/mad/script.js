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

    // ---------- Collapsibles ----------
    document.querySelectorAll('[data-toggle]').forEach(btn => {
        const targetId = btn.dataset.toggle;
        const target = document.getElementById(targetId);
        if (!target) return;

        const label = btn.querySelector('.toggle-label');
        const icon = btn.querySelector('i');
        const originalText = label.textContent;
        const hideText = originalText.replace(/^Show/, 'Hide');

        btn.addEventListener('click', () => {
            const isOpen = target.classList.toggle('open');
            target.hidden = !isOpen;
            btn.setAttribute('aria-expanded', String(isOpen));
            label.textContent = isOpen ? hideText : originalText;
            icon.className = isOpen ? 'fa-solid fa-chevron-up' : 'fa-solid fa-chevron-down';
        });
    });

    // ---------- Credential reveal / copy ----------
    const maskValue = (str) => {
        if (str.length <= 8) return '••••••••';
        return str.slice(0, 4) + '•'.repeat(Math.min(str.length - 8, 32)) + str.slice(-4);
    };

    document.querySelectorAll('[data-credential]').forEach(block => {
        const valueEl = block.querySelector('[data-mask]');
        const revealBtn = block.querySelector('[data-action="reveal"]');
        const copyBtn = block.querySelector('[data-action="copy"]');
        if (!valueEl || !revealBtn || !copyBtn) return;

        const originalValue = valueEl.textContent.trim();
        valueEl.dataset.original = originalValue;
        valueEl.textContent = maskValue(originalValue);
        valueEl.classList.add('is-masked');

        revealBtn.addEventListener('click', () => {
            const isMasked = valueEl.classList.contains('is-masked');
            if (isMasked) {
                valueEl.textContent = originalValue;
                valueEl.classList.remove('is-masked');
                revealBtn.textContent = 'Hide';
            } else {
                valueEl.textContent = maskValue(originalValue);
                valueEl.classList.add('is-masked');
                revealBtn.textContent = 'Reveal';
            }
        });

        copyBtn.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(originalValue);
                const orig = copyBtn.textContent;
                copyBtn.textContent = 'Copied';
                copyBtn.classList.add('is-copied');
                setTimeout(() => {
                    copyBtn.textContent = orig;
                    copyBtn.classList.remove('is-copied');
                }, 1400);
            } catch (e) {
                copyBtn.textContent = 'Failed';
                setTimeout(() => { copyBtn.textContent = 'Copy'; }, 1400);
            }
        });
    });
})();