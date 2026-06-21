import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { load } from 'js-yaml';
import OpenCC from 'opencc-js';
import type {
    GadgetConfig,
    Variants,
    GadgetOption,
    GadgetList,
    GadgetSetting,
} from '@/types/gadgets';
import { BANNER } from './utils';

const getDefinitions = async (): Promise<GadgetSetting[]> => {
    const basePath = resolve('src/gadgets');
    const entries = await readdir(basePath, { withFileTypes: true });

    const result = await Promise.all(
        entries
            .filter(e => e.isDirectory())
            .map(async dir => {
                const { name } = dir;
                const dirPath = join(basePath, name);

                try {
                    const yamlContent = await readFile(join(dirPath, 'definition.yaml'), 'utf8');
                    const content = load(yamlContent) as GadgetConfig & GadgetOption;
                    const { enable, files, description, ...config } = content;

                    return { name, config, option: { enable, files, description } };
                } catch (err) {
                    throw new Error(
                        `[Gadget:${name}] Failed to load definition: ${(err as Error).message}`,
                        { cause: err },
                    );
                }
            }),
    );

    return result.filter(Boolean);
};

const parseDefinitionLines = (definitions: GadgetSetting[]) => {
    const result: Record<string, string> = {};

    for (const { name, config, option } of definitions) {
        if (!option.enable) {
            continue;
        }

        const parts = Object.entries(config).flatMap(([key, value]) => {
            if (value === true) {
                return [key];
            }
            if (Array.isArray(value) && value.length) {
                return [`${key}=${value.join(',')}`];
            }
            if (typeof value === 'string') {
                return [`${key}=${value}`];
            }
            return [];
        });

        const files = option.files.map(file => file.replace(/^Gadget-/, '')).join('|');
        result[name] = `* ${name}[${parts.join('|')}]|${files}`;
    }

    return result;
};

const generateDescription = async (definitions: GadgetSetting[]) => {
    const result: Record<string, Required<Variants>> = {};
    const toTW = OpenCC.Converter({ from: 'cn', to: 'tw' }),
        toHK = OpenCC.Converter({ from: 'cn', to: 'hk' });
    for (const {
        name,
        option: { description },
    } of definitions) {
        if (!result[name]) {
            result[name] = {} as Required<Variants>;
        }
        if (typeof description === 'string') {
            Object.assign(result[name], {
                'zh-hans': description,
                'zh-cn': description,
                'zh-hant': toTW(description),
                'zh-tw': toTW(description),
                'zh-hk': toHK(description),
            });
        } else {
            Object.assign(result[name], {
                'zh-hans': description['zh-hans'],
                'zh-cn': description['zh-cn'] || description['zh-hans'],
                'zh-hant': description['zh-hant'] || toTW(description['zh-hans']),
                'zh-tw': description['zh-tw'] || toTW(description['zh-hans']),
                'zh-hk': description['zh-hk'] || toHK(description['zh-hans']),
            });
        }
    }

    await Promise.all(
        Object.entries(result).map(async ([name, variants]) => {
            const dir = `dist/gadgets/${name}/Gadget-${name}`;
            await mkdir(dir, { recursive: true });
            await Promise.all([
                ...Object.entries(variants).map(async ([variant, text]) => {
                    await writeFile(`${dir}/${variant}`, text);
                }),
                writeFile(`${dir}/_base`, variants['zh-hans']),
            ]);
        }),
    );
};

const generateDefinition = async () => {
    const definitions = await getDefinitions();
    const parsed = parseDefinitionLines(definitions);

    const list = load(
        await readFile(resolve('src/gadgets/Gadgets-definition-list.yaml'), 'utf8'),
    ) as GadgetList;

    let result = `${BANNER}\n\n`;
    for (const section of list) {
        result += `== ${section.section} ==\n`;
        for (const name of section.gadgets) {
            if (parsed[name]) {
                result += parsed[name] + '\n';
            }
        }
        result += '\n';
    }

    await generateDescription(definitions);
    await writeFile('dist/gadgets/Gadgets-definition', result);
};

export { generateDefinition };
