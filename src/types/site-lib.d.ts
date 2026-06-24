type wgULSType = typeof wgUXS extends (wg: string, ...args: infer P) => string
    ? (...args: P) => string
    : never;

declare global {
    type pageNames = {
        /**
         * 讨论页名称，若无讨论页则为 false
         */
        talkPage: string | false;
        /**
         * 当前页面的基础名称（不含名字空间前缀），若当前页面无基础名称则为 false
         */
        basePageName: string | false;
    };

    interface Window {
        wgUXS(
            wg: string,
            hans: string,
            ...rest: [
                hant?: string,
                cn?: string,
                tw?: string,
                hk?: string,
                sg?: string,
                zh?: string,
                mo?: string,
                my?: string,
            ]
        ): string;
        wgULS: wgULSType;
        wgUVS: wgULSType;
        libPrefixNumber(num: number | string, length?: number): string;
        libGetPageNames(): pageNames;
    }
}

export {};
