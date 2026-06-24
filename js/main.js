/* ============================================================
   このファイルの役割：
   - ナビゲーションのスクロール追従（背景色変化）
   - スクロールアニメーション（フェードイン）
   - モバイルメニューの開閉
   ============================================================ */

/* ── ナビゲーション：スクロールで背景を出す ── */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* ── スクロールアニメーション（Intersection Observer） ── */
const fadeTargets = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      /* 一度表示したら監視を解除してパフォーマンスを保つ */
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15,
});

fadeTargets.forEach(el => observer.observe(el));

/* ── ヒーローは最初から表示する（スクロール前でも見えるように） ── */
const heroFade = document.querySelector('#hero .fade-in');
if (heroFade) heroFade.classList.add('visible');

/* ── モバイルメニューの開閉 ── */
const menuBtn    = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

menuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});

/* メニュー内リンクをタップしたら閉じる */
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
  });
});
