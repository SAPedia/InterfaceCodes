import { writeFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';

const stylesURL =
    'https://saoaw.com/load.php?modules=skins.citizen.codex.styles%7Cskins.citizen.icons%2Cstyles%7Cskins.citizen.styles%7Cskins.citizen.tokens%7Cskins.citizen.tokens.new%7Cskins.citizen.preferences.codex&only=styles&skin=citizen';

const currentDir = import.meta.dirname;
const cacheDir = join(currentDir, 'site', '.cache');

const fetchStyles = async () => {
    try {
        console.time('获取样式');
        const styles = await (await fetch(stylesURL)).text();
        await writeFile(join(cacheDir, 'styles.css'), styles);
        console.timeEnd('获取样式');
    } catch (error) {
        console.log(`获取样式时发生错误：${String(error)}`);
    }
};

(async () => {
    await mkdir(cacheDir, { recursive: true });
    await fetchStyles();
})();
