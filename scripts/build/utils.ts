import { extname, relative } from 'node:path';

const HEADER = `/**
 * -------------------------------------------------------------------------
 * !!! DON'T MODIFY THIS PAGE MANUALLY, YOUR CHANGES WILL BE OVERWRITTEN !!!
 * !!!     Repository URL: https://github.com/SAPedia/InterfaceCodes     !!!
 * -------------------------------------------------------------------------
 */

/* <nowiki> */`;

const FOOTER = '/* </nowiki> */';

const BANNER = '{{Gadgets-definition-top}}';

const toDest = (entry: string) => {
    const rel = relative('src', entry);
    const ext = extname(entry);
    return ext === '.scss'
        ? rel.replace(/\.scss$/, '.css')
        : ext === '.ts'
          ? rel.replace(/\.ts$/, '.js')
          : rel;
};

const globPath = (pat: string) => pat.replace(/\\/g, '/');

export { HEADER, FOOTER, BANNER, toDest, globPath };
