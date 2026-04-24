export function removeComments(code) {
    code = code.replace(/\/\*[\s\S]*?\*\//g, '');
    code = code.replace(/(^|[^:]|[^\\])\/\/.*$/gm, '$1');
    code = code.replace(/^[ \t]*\n/gm, '');
    code = code.replace(/\n{2,}/g, '\n');
    return code;
}