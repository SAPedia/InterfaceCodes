import type { ReactNode, ComponentPropsWithoutRef } from 'react';

interface ExternalLinkProps extends Omit<ComponentPropsWithoutRef<'a'>, 'target' | 'rel'> {
    href: string;
    children: ReactNode;
}

function ExternalLink({ children, ...props }: ExternalLinkProps) {
    return (
        <a target="_blank" rel="noreferrer noopener" {...props}>
            {children}
        </a>
    );
}

export { ExternalLink };
