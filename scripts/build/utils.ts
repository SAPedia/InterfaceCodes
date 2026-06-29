import { extname, relative } from 'node:path';

const GADGETS_AND_GLOBAL_HEADER = `/**
 * -------------------------------------------------------------------------
 * !!! DON'T MODIFY THIS PAGE MANUALLY, YOUR CHANGES WILL BE OVERWRITTEN !!!
 * !!!     Repository URL: https://github.com/SAPedia/InterfaceCodes     !!!
 * -------------------------------------------------------------------------
 */

/* <nowiki> */`;

const GADGETS_AND_GLOBAL_FOOTER = '/* </nowiki> */';

const GADGETS_DEFINITION_TOP = '{{Gadgets-definition-top}}';

const TEMPLATE_BANNER = `{{Interface template}}`;

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

export {
    GADGETS_AND_GLOBAL_HEADER,
    GADGETS_AND_GLOBAL_FOOTER,
    GADGETS_DEFINITION_TOP,
    TEMPLATE_BANNER,
    toDest,
    globPath,
};
