import type { ComponentPropsWithoutRef } from 'react';
import { getWikiImageUrl } from '~/lib/wiki';

interface WikiImageProps extends Omit<ComponentPropsWithoutRef<'img'>, 'src'> {
    file: string;
}

function WikiImage({ file, alt, ...props }: WikiImageProps) {
    const src = getWikiImageUrl(file);
    const altText = alt ?? file.replace(/_/g, ' ');
    return <img loading="lazy" decoding="async" src={src} alt={altText} {...props} />;
}

export { WikiImage };
