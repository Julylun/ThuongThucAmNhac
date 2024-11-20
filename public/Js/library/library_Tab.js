document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('[role="tab"]');
    const tabContents = document.querySelectorAll('[role="tabpanel"]');

    tabs.forEach((tab) => {
        if (tab.getAttribute('aria-selected') === 'true') {
            tab.classList.add('text-[#9b4de0]', 'border-[#9b4de0]');
            const target = document.querySelector(tab.getAttribute('data-tabs-target'));
            if (target) {
                target.classList.remove('hidden');
            }
        } else {
            tab.classList.add('border-transparent');
        }
    });

    tabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            tabs.forEach((t) => {
                t.classList.remove('text-[#9b4de0]', 'border-[#9b4de0]');
                t.classList.add('border-transparent');
                t.setAttribute('aria-selected', 'false');
            });

            tabContents.forEach((content) => {
                content.classList.add('hidden');
            });

            tab.classList.add('text-[#9b4de0]', 'border-[#9b4de0]');
            tab.classList.remove('border-transparent');
            tab.setAttribute('aria-selected', 'true');

            const target = document.querySelector(tab.getAttribute('data-tabs-target'));
            if (target) {
                target.classList.remove('hidden');
            }
        });
    });
});