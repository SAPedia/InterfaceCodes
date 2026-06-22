declare global {
    interface Window {
        libCachedCode: {
            getCachedCode: (url: string) => Promise<string>;
            getCachedCodeUrl: (url: string) => Promise<string>;
            injectCachedCode: (url: string, _type: string) => Promise<void>;
            batchInjectCachedCode: (urls: string[], type: string) => Promise<void[]>;
        };
    }
}

export {};
