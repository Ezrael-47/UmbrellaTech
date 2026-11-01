document.getElementById('year').textContent = new Date().getFullYear();

// ===== ترمینال =====
const term = document.getElementById('terminal');
if (term) {
    const lines = [
        { text: '&gt; booting umbrella_core.sys ...', ok: false },
        { text: '&gt; developer: Armin', ok: true },
        { text: '&gt; skills: frontend, data, algo, ui/ux, devops, consulting', ok: true },
        { text: '&gt; status: <span class="cursor"></span>', ok: true }
    ];
    lines.forEach((l, i) => {
        const div = document.createElement('div');
        div.className = 'line' + (l.ok ? ' ok' : '');
        div.style.animationDelay = (i * 0.55) + 's';
        div.innerHTML = l.text;
        term.appendChild(div);
    });
}

// ===== منو =====
const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');
menuBtn.addEventListener('click', () => nav.classList.toggle('open'));
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

// ===== افکت محو =====
const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
}, { threshold: 0.15 });
document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));

// ===== پخش‌کننده موسیقی (اصلاح شده) =====
(function() {
    const audio = document.getElementById('audioPlayer');
    const btn = document.getElementById('playBtn');
    const icon = btn.querySelector('i');

    // --- تابع به‌روزرسانی آیکون بر اساس وضعیت ---
    function updateIcon() {
        if (audio.paused) {
            icon.className = 'fas fa-play';
        } else {
            icon.className = 'fas fa-pause';
        }
    }

    // --- تلاش برای پخش خودکار ---
    const playPromise = audio.play();
    if (playPromise !== undefined) {
        playPromise.then(() => {
            updateIcon();
        }).catch(() => {
            updateIcon();
            console.log('پخش خودکار امکان‌پذیر نیست. کاربر باید روی دکمه کلیک کند.');
        });
    }

    // --- دکمه پلی/مکث ---
    btn.addEventListener('click', function() {
        if (audio.paused) {
            audio.play().catch(() => {});
        } else {
            audio.pause();
        }
    });

    // --- رویدادهای play و pause برای به‌روزرسانی آیکون ---
    audio.addEventListener('play', updateIcon);
    audio.addEventListener('pause', updateIcon);
    audio.addEventListener('ended', function() {
        icon.className = 'fas fa-play';
    });

    audio.addEventListener('error', () => {
        console.warn('فایل صوتی پیدا نشد. لطفاً یک فایل music.mp3 در کنار فایل HTML قرار دهید.');
    });
})();

// ===== باران ماتریکسی =====
const canvas = document.getElementById('matrixRain');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (canvas && !reduceMotion) {
    const ctx = canvas.getContext('2d');
    let w, h, cols, drops;
    const fontSize = 15;

    function setup() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
        cols = Math.floor(w / fontSize);
        drops = new Array(cols).fill(0).map(() => Math.random() * -100);
    }
    setup();
    window.addEventListener('resize', setup);

    function draw() {
        ctx.fillStyle = 'rgba(35,31,32,0.14)';
        ctx.fillRect(0, 0, w, h);
        ctx.font = fontSize + 'px "Chakra Petch", monospace';
        for (let i = 0; i < cols; i++) {
            const char = Math.random() > 0.5 ? '1' : '0';
            const x = i * fontSize;
            const y = drops[i] * fontSize;
            const leading = Math.random() > 0.93;
            ctx.fillStyle = leading ? 'rgba(226,226,226,0.9)' : 'rgba(196,196,196,0.45)';
            ctx.fillText(char, x, y);
            if (y > h && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        }
        requestAnimationFrame(draw);
    }
    requestAnimationFrame(draw);
}