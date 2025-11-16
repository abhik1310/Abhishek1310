// script.js — cleaned and modular
const PASSWORD = 'ThanksAbhishek'; // change if you want


// DOM
const passwordInput = document.getElementById('password-input');
const submitBtn = document.getElementById('submit-btn');
const errorMsg = document.getElementById('error-msg');
const passwordScreen = document.getElementById('password-screen');
const mainContent = document.getElementById('main-content');


function showMain() {
// hide password overlay accessibly
passwordScreen.classList.add('hidden');
passwordScreen.setAttribute('aria-hidden', 'true');
// reveal main
mainContent.classList.remove('hidden');
mainContent.setAttribute('aria-hidden', 'false');
// start interactions
startTypewriterEffect();
enableClickHearts();
}


function checkPassword() {
const val = passwordInput.value || '';
if (val === PASSWORD) {
showMain();
// clear input for security
passwordInput.value = '';
} else {
errorMsg.textContent = 'Wrong password!Abhi Ne Jo Bataya Wo Dalo🐱';
passwordInput.value = '';
passwordInput.focus();
// small shake using class to avoid inline styles
passwordInput.classList.add('shake');
setTimeout(()=> passwordInput.classList.remove('shake'), 500);
}
}


submitBtn.addEventListener('click', checkPassword);
passwordInput.addEventListener('keydown', (e)=>{
if (e.key === 'Enter') checkPassword();
});


// Typewriter effect (sequential)
function startTypewriterEffect() {
const items = Array.from(document.querySelectorAll('.typewriter-text'));
let i = 0;
function type(el, text, idx) {
if (idx <= text.length) {
el.textContent = text.slice(0, idx);
setTimeout(()=> type(el, text, idx + 1), 28);
} else {
el.classList.add('complete');
i++;
if (i < items.length) setTimeout(()=> type(items[i], items[i].getAttribute('data-text'), 0), 350);
}
}
if (items.length) setTimeout(()=> type(items[0], items[0].getAttribute('data-text'), 0), 800);
}


// Click-to-create floating hearts (lightweight)
function enableClickHearts() {
const hearts = ['💜','💖','💕','💗','💝','💓'];
document.addEventListener('click', function (e) {
// ignore clicks on inputs/buttons
if (e.target.closest('button') || e.target.closest('input')) return;
const el = document.createElement('div');
el.textContent = hearts[Math.floor(Math.random()*hearts.length)];
Object.assign(el.style, {
position: 'fixed', left: `${e.clientX - 8}px`, top: `${e.clientY - 8}px`, fontSize: '26px', pointerEvents: 'none', zIndex: 9999, transformOrigin: 'center'
});
el.classList.add('float-up');
document.body.appendChild(el);
setTimeout(()=> el.remove(), 1900);
});
}


// Optional: add minimal CSS for the 'shake' + 'float-up' as runtime-safe styles
const runtimeStyles = `
@keyframes shakeX {0%{transform:translateX(0)}25%{transform:translateX(-8px)}75%{transform:translateX(8px)}100%{transform:translateX(0)}}
.shake {animation: shakeX .45s ease}
@keyframes floatUpAnim {0%{opacity:1;transform:translateY(0) scale(1)}100%{opacity:0;transform:translateY(-80px) scale(1.35)}}
.float-up{animation:floatUpAnim 1.9s ease forwards}
`;
const rs = document.createElement('style'); rs.textContent = runtimeStyles; document.head.appendChild(rs);
window.addEventListener('load', ()=>{ passwordInput && passwordInput.focus(); });
