const input = document.getElementById('input');
const outputContent = document.getElementById('outputContent');
const removeBtn = document.getElementById('removeBtn');
const copyBtn = document.getElementById('copyBtn');
const copyText = document.getElementById('copyText');
const body = document.body;

function setInitialTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        body.classList.add('dark');
    } else {
        body.classList.remove('dark');
    }
}

setInitialTheme();

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    if (event.matches) {
        body.classList.add('dark');
    } else {
        body.classList.remove('dark');
    }
});

function removeCommentsSafe(code) {
  code = code.replace(/\/\*[\s\S]*?\*\//g, '');
  
  code = code.replace(/(^|[^:]|[^\\])\/\/.*$/gm, '$1');

  return code;
}

removeBtn.addEventListener('click', () => {
  const cleanCode = removeCommentsSafe(input.value);
  outputContent.textContent = cleanCode || 'No code or only comments were found.';
  
  copyBtn.classList.remove('copied');
  copyText.textContent = 'Copy Code';
});

copyBtn.addEventListener('click', () => {
  const codeToCopy = outputContent.textContent;
  
  if (codeToCopy && codeToCopy !== 'Clean code will appear here...' && codeToCopy !== 'No code or only comments were found.') {
    navigator.clipboard.writeText(codeToCopy).then(() => {
      copyBtn.classList.add('copied');
      copyText.textContent = 'Copied!';
      
      setTimeout(() => {
        copyBtn.classList.remove('copied');
        copyText.textContent = 'Copy Code';
      }, 2000);
    }).catch(err => {
      console.error('Could not copy text: ', err);
      fallbackCopy(codeToCopy);
    });
  }
});

function fallbackCopy(text) {
  const tempTextArea = document.createElement('textarea');
  tempTextArea.value = text;
  document.body.appendChild(tempTextArea);
  tempTextArea.select();
  try {
    document.execCommand('copy');
    copyBtn.classList.add('copied');
    copyText.textContent = 'Copied!';
    setTimeout(() => {
      copyBtn.classList.remove('copied');
      copyText.textContent = 'Copy Code';
    }, 2000);
  } catch (err) {
    alert('Failed to copy: Please copy the code manually.');
  }
  document.body.removeChild(tempTextArea);
}
