const COPY_RESET_DELAY = 2000;

function resetCopyBtn(btn, textEl) {
    btn.classList.remove('copied');
    textEl.textContent = 'Copy Code';
}

function markCopied(btn, textEl) {
    btn.classList.add('copied');
    textEl.textContent = 'Copied!';
    setTimeout(() => resetCopyBtn(btn, textEl), COPY_RESET_DELAY);
}

function fallbackCopy(text, btn, textEl) {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    try {
        document.execCommand('copy');
        markCopied(btn, textEl);
    } catch {
        alert('Failed to copy — please copy manually.');
    }
    document.body.removeChild(ta);
}

export function copyToClipboard(text, btn, textEl) {
    if (!text) return;
    navigator.clipboard.writeText(text)
        .then(() => markCopied(btn, textEl))
        .catch(() => fallbackCopy(text, btn, textEl));
}