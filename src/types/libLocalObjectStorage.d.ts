interface Transformer {
    type: string;
    match: (value: unknown) => boolean;
    encode: (value: unknown) => string;
    decode: (value: string) => unknown;
}

declare class LocalObjectStorage {
    constructor(prefix?: string, options?: { expires?: [number, string] });

    get _keyPrefix(): string;

    getAllKeys(): string[];
    readonly length: number;
    getItem(key: string, fallback?: unknown): unknown;
    setItem(key: string, value: unknown, options?: { expires?: [number, string] }): void;
    removeItem(key: string): void;
    clear(): void;
    key(index: number): string | undefined;

    static plugins: {
        transformers: {
            readonly list: Transformer[];
            add: (transformer: Transformer) => boolean;
        };
    };
}

interface Window {
    LocalObjectStorage: typeof LocalObjectStorage;
}
