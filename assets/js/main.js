import { initTheme } from './modules/theme.js';
import { removeComments } from './modules/parser.js';
import { copyToClipboard } from './modules/clipboard.js';

const input = document.getElementById('input');
const outputContent = document.getElementById('outputContent');
const removeBtn = document.getElementById('removeBtn');
const copyBtn = document.getElementById('copyBtn');
const copyText = document.getElementById('copyText');

const PLACEHOLDER_TEXT = 'Clean code will appear here...';
const EMPTY_RESULT_TEXT = 'No code or only comments were found.';

initTheme();

removeBtn.addEventListener('click', () => {
    const result = removeComments(input.value);
    const text = result.trim() ? result : EMPTY_RESULT_TEXT;
    outputContent.textContent = text;
    outputContent.classList.toggle('has-output', !!result.trim());
    copyBtn.classList.remove('copied');
    copyText.textContent = 'Copy Code';
});

copyBtn.addEventListener('click', () => {
    const text = outputContent.textContent;
    if (!text || text === PLACEHOLDER_TEXT || text === EMPTY_RESULT_TEXT) return;
    copyToClipboard(text, copyBtn, copyText);
});