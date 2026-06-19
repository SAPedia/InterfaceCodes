interface GadgetConfig {
    ResourceLoader: boolean;
    hidden: boolean;
    default: boolean;
    supportsUrlLoad: boolean;
    skins: string[];
    actions: string[];
    categories: string[];
    namespaces: string[];
    contentModels: string[];
    type: 'styles' | 'general';
    package: boolean;
    rights: string[];
    peers: string[];
    dependencies: string[];
}

interface Variants {
    'zh-hans': string;
    'zh-hant'?: string;
    'zh-cn'?: string;
    'zh-hk'?: string;
    'zh-tw'?: string;
}

interface GadgetOption {
    enable: boolean;
    files: string[];
    description: string | Variants;
}

interface GadgetSetting {
    name: string;
    config: GadgetConfig;
    option: GadgetOption;
}

type GadgetList = Array<{
    section: string;
    gadgets: string[];
}>;

export type { GadgetConfig, Variants, GadgetOption, GadgetSetting, GadgetList };
