console.log("DataQ");

function menuToggle() {
    console.log("Clicked");
    var navMenu = document.getElementById("js-menu");
    console.log(navMenu.className);
    navMenu.classList.toggle("hide");
}

document.addEventListener('DOMContentLoaded', function () {
    // Animate on scroll setup
    const animElements = document.querySelectorAll('.animate-on-scroll');

    const observerOptions = {
        root: null,
        threshold: 0,
        rootMargin: "0px 0px -20% 0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animElements.forEach(el => observer.observe(el));

    // Sidebar visibility logic: show when case-study-wrapper is 60% in view
    const sidebar = document.querySelector('.case-sidebar');
    const wrapper = document.querySelector('.case-study-wrapper');
    const triggerPoint = window.innerHeight * 0.2; // 40% down the viewport

    window.addEventListener('scroll', () => {
        if (!sidebar || sidebar.getAttribute('data-manual') || !wrapper) return;
        const wrapperTop = wrapper.getBoundingClientRect().top;
        if (wrapperTop < triggerPoint) {
            sidebar.classList.add('visible');
        } else {
            sidebar.classList.remove('visible');
        }
    });

    // Scroll spy (active section tracking)
    const sections = document.querySelectorAll(
        '.cg-section, .cg-section-special, #Objective, #Lessons'
    );
    const navLinks = document.querySelectorAll('.case-sidebar .side-button');

    const sectionObserverOptions = {
        root: null,
        rootMargin: '-80px 0px -40% 0px',
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const id = entry.target.getAttribute('id');
            const link = document.querySelector(`.case-sidebar .side-button[href="#${id}"]`);

            if (entry.isIntersecting && link) {
                navLinks.forEach(link => link.classList.remove('active'));
                link.classList.add('active');
            }
        });
    }, sectionObserverOptions);

    sections.forEach(section => sectionObserver.observe(section));

    // Sidebar manual trigger on click + smooth scroll fix
    document.querySelectorAll('.case-sidebar .side-button').forEach(link => {
        link.addEventListener('click', (e) => {
            if (!sidebar) return;

            sidebar.classList.add('visible');
            sidebar.setAttribute('data-manual', 'true');

            setTimeout(() => {
                sidebar.removeAttribute('data-manual');
            }, 1000);

            const targetId = link.getAttribute('href').substring(1);
            const targetEl = document.getElementById(targetId);
            if (targetEl) {
                e.preventDefault();
                const offset = 80; // header height
                const top = targetEl.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top, behavior: 'smooth' });
                history.pushState(null, null, `#${targetId}`);
            }
        });
    });
    // ======== ADDED SNIPPET START: Close TOP NAV (#js-menu) on click/hashchange ========
    const topNavMenu = document.getElementById('js-menu');
    if (topNavMenu) {
        // a) If the user clicks any <a> anywhere inside #js-menu, hide it immediately
        topNavMenu.addEventListener('click', (e) => {
            if (e.target.closest('a')) {
                topNavMenu.classList.add('hide');
            }
        });

        // b) Also listen for hash changes: if the URL’s hash changes, hide the menu
        window.addEventListener('hashchange', () => {
            topNavMenu.classList.add('hide');
        });
    }
});

// FAQ toggle
const toggles = document.querySelectorAll(".faq-toggle");

toggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
        toggle.parentNode.classList.toggle("active");
    });
});

// Carousel logic
(function () {
    const track = document.querySelector('.carousel-track');
    const items = Array.from(track.children);
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const dots = Array.from(document.querySelectorAll('.dot'));
    const perPage = 2;
    const pages = Math.ceil(items.length / perPage);
    let index = 0;

    function update() {
        const w = items[0].getBoundingClientRect().width + 24;
        track.style.transform = `translateX(${-index * perPage * w}px)`;

        prevBtn.disabled = index === 0;
        nextBtn.disabled = index === pages - 1;

        dots.forEach((d, i) => d.classList.toggle('active', i === index));
    }

    prevBtn.addEventListener('click', () => {
        if (index > 0) { index--; update(); }
    });
    nextBtn.addEventListener('click', () => {
        if (index < pages - 1) { index++; update(); }
    });
    dots.forEach((dot, i) => dot.addEventListener('click', () => {
        index = i; update();
    }));

    update();
})();