export function removeComments(code) {
    code = code.replace(/\/\*[\s\S]*?\*\//g, '');
    code = code.replace(/(^|[^:]|[^\\])\/\/.*$/gm, '$1');
    return code;
}