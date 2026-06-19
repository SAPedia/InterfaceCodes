interface DeployFileEntry {
    content: string;
    hash: string;
    distPath: string;
}

type DeployFileMap = Record<string, DeployFileEntry>;

export type { DeployFileEntry, DeployFileMap };
