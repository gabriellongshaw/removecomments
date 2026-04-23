const mq = window.matchMedia('(prefers-color-scheme: dark)');

function applyTheme(dark) {
    document.body.classList.toggle('dark', dark);
}

export function initTheme() {
    applyTheme(mq.matches);
    mq.addEventListener('change', e => applyTheme(e.matches));
}