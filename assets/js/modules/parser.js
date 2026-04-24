export function removeComments(code) {
    const lines = code.split('\n');
    const result = [];
    let inBlock = false;
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        let hadComment = false;
        let out = '';
        let j = 0;
        while (j < line.length) {
            if (inBlock) {
                const end = line.indexOf('*/', j);
                if (end === -1) {
                    hadComment = true;
                    j = line.length;
                } else {
                    hadComment = true;
                    j = end + 2;
                    inBlock = false;
                }
            } else {
                if (line[j] === '/' && line[j + 1] === '*') {
                    inBlock = true;
                    hadComment = true;
                    j += 2;
                } else if (line[j] === '/' && line[j + 1] === '/' && (j === 0 || line[j - 1] !== ':')) {
                    hadComment = true;
                    j = line.length;
                } else if ((line[j] === '"' || line[j] === "'") ) {
                    const q = line[j];
                    out += line[j++];
                    while (j < line.length && line[j] !== q) {
                        if (line[j] === '\\') out += line[j++];
                        out += line[j++];
                    }
                    if (j < line.length) out += line[j++];
                } else {
                    out += line[j++];
                }
            }
        }
        if (inBlock && !line.includes('/*')) {
            hadComment = true;
            out = '';
        }
        const trimmed = out.trim();
        if (trimmed === '' && hadComment) {
            continue;
        }
        result.push(out);
    }
    return result.join('\n');
}