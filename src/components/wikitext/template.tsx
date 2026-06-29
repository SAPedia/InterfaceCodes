import { Fragment, type ReactNode } from 'react';
import { CONVERT_TO_HTML } from '~/lib/config';

interface WikitextTemplateProps {
    /** 模板页面标题（不含 Template: 前缀） */
    title: string;
    /** 模板参数 */
    args?: Record<string, ReactNode> | ReactNode[];
}

function WikitextTemplate({ title, args }: WikitextTemplateProps) {
    let argsParts: ReactNode;
    if (!args) {
        argsParts = null;
    } else if (Array.isArray(args)) {
        argsParts = args.map((x, i) => <Fragment key={i}>|{x}</Fragment>);
    } else {
        argsParts = Object.entries(args).map(([k, v]) => (
            <Fragment key={k}>
                |{k}={v}
            </Fragment>
        ));
    }

    const wikitext = (
        <>
            {'{{'}
            {title}
            {argsParts}
            {'}}'}
        </>
    );

    if (CONVERT_TO_HTML) {
        return <code>{wikitext}</code>;
    }

    return wikitext;
}

export { WikitextTemplate };
