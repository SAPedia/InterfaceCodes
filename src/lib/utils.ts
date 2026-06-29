class TokenList {
    private tokens: Set<string>;

    constructor(...parts: (string | false | null | undefined)[]) {
        this.tokens = new Set(
            parts
                .filter((p): p is string => Boolean(p))
                .flatMap(s => s.split(/\s+/))
                .filter(Boolean),
        );
    }

    get length(): number {
        return this.tokens.size;
    }

    add(value: string): void {
        this.tokens.add(value);
    }

    toString(): string {
        return [...this.tokens].join(' ');
    }
}

export { TokenList };
