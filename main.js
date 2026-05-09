/* ============================
   main.js — Автовозофф.рф
   ============================ */

console.log("22");

/* ============================
   МОБИЛЬНОЕ МЕНЮ
   ============================ */
document.querySelector('.mobile-toggle')?.addEventListener('click', function () {
    const nav = document.querySelector('.main-nav ul');
    nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
    nav.style.flexDirection = 'column';
    nav.style.position = 'absolute';
    nav.style.top = '100%';
    nav.style.left = '0';
    nav.style.right = '0';
    nav.style.background = '#fff';
    nav.style.padding = '20px';
    nav.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
});

/* ============================
   ПЛАВНАЯ ПРОКРУТКА К ЯКОРЯМ
   ============================ */
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

/* ============================
   HERO-СЛАЙДЕР
   ============================ */
(function () {
    const slides = document.querySelectorAll('.hero-slide');
    const dots   = document.querySelectorAll('.slider-dot');
    if (!slides.length) return;

    let current = 0;
    let timer;

    function goToSlide(n) {
        slides[current].classList.remove('active');
        if (dots[current]) dots[current].classList.remove('active');
        current = (n + slides.length) % slides.length;
        slides[current].classList.add('active');
        if (dots[current]) dots[current].classList.add('active');
    }

    function nextSlide() { goToSlide(current + 1); }
    function prevSlide() { goToSlide(current - 1); }

    function startAuto() { timer = setInterval(nextSlide, 5000); }
    function resetAuto()  { clearInterval(timer); startAuto(); }

    document.getElementById('sliderNext')?.addEventListener('click', () => { nextSlide(); resetAuto(); });
    document.getElementById('sliderPrev')?.addEventListener('click', () => { prevSlide(); resetAuto(); });

    dots.forEach(dot => dot.addEventListener('click', () => {
        goToSlide(+dot.dataset.slide);
        resetAuto();
    }));

    startAuto();
})();

/* ============================
   SCROLL-АНИМАЦИИ (главная + контакты)
   ============================ */
(function () {
    const animClasses = [
        '.anim-fade-up', '.anim-slide-l', '.anim-slide-r',
        '.anim-scale', '.anim-fade',
        '.fade-up', '.slide-left', '.slide-right'
    ].join(', ');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                observer.unobserve(e.target);
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll(animClasses).forEach(el => observer.observe(el));
})();

/* ============================
   АНИМИРОВАННЫЕ СЧЁТЧИКИ
   ============================ */
(function () {
    const statsSection = document.querySelector('.stats-section');
    if (!statsSection) return;

    function animateCounter(el) {
        const target = +el.dataset.count;
        let current = 0;
        const step = Math.ceil(target / 50);
        const interval = setInterval(() => {
            current = Math.min(current + step, target);
            el.textContent = current + (target >= 100 ? '+' : '');
            if (current >= target) clearInterval(interval);
        }, 30);
    }

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.querySelectorAll('.stat-num[data-count]').forEach(animateCounter);
                statsObserver.unobserve(e.target);
            }
        });
    }, { threshold: 0.3 });

    statsObserver.observe(statsSection);
})();

/* ============================
   ЛАЙТБОКС (галерея)
   ============================ */
function openLightbox(src) {
    const lb  = document.getElementById('lightbox');
    const img = document.getElementById('lightboxImg');
    if (!lb || !img) return;
    img.src = src;
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeLightbox(e) {
    const lb = document.getElementById('lightbox');
    if (!lb) return;
    if (!e || e.target !== document.getElementById('lightboxImg')) {
        lb.classList.remove('open');
        document.body.style.overflow = '';
    }
}

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox();
});

/* ============================
   ВОСПРОИЗВЕДЕНИЕ ВИДЕО
   (кастомная кнопка play поверх тега <video>)
   ============================ */
function playVideo(btn) {
    const video = btn.closest('.video-wrap').querySelector('video');
    btn.classList.add('gone');
    video.play();
}

function submitContactForm() {
    const nameEl  = document.getElementById('fname');
    const phoneEl = document.getElementById('fphone');
    if (!nameEl || !phoneEl) return;

    const name  = nameEl.value.trim();
    const phone = phoneEl.value.trim();
    let valid   = true;

    [nameEl, phoneEl].forEach(el => el.classList.remove('input-error'));

    if (!name)  { nameEl.classList.add('input-error');  valid = false; }
    if (!phone) { phoneEl.classList.add('input-error'); valid = false; }
    if (!valid) return;

    const btn = document.getElementById('submitBtn');
    if (btn) { btn.textContent = 'Отправляем...'; btn.disabled = true; }

    /* Имитация отправки — замените на реальный fetch/AJAX */
    setTimeout(() => {
        document.getElementById('formInner')?.classList.add('hidden');
        document.getElementById('successMsg')?.classList.remove('hidden');
    }, 1200);
}

function resetForm() {
    const fields = ['fname', 'fphone', 'femail', 'froute', 'fmsg'];
    fields.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
    });

    document.getElementById('formInner')?.classList.remove('hidden');
    document.getElementById('successMsg')?.classList.add('hidden');

    const btn = document.getElementById('submitBtn');
    if (btn) { btn.textContent = 'Отправить заявку'; btn.disabled = false; }
}