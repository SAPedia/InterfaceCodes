import { WikitextLink } from '~/components';

interface CategoryBaseProps {
    title: string;
    imageUrl?: string;
    bgColor?: string;
    link?: string;
}

const CategoryBase: React.FC<CategoryBaseProps> = ({
    title,
    link,
    imageUrl,
    bgColor = 'bg-neutral-800',
}) => (
    <div
        className={`group relative flex min-h-12 w-full items-center justify-center overflow-hidden rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:ring-1 hover:ring-white/15 [&_a]:absolute [&_a]:inset-0 [&_a]:z-10 [&_a]:flex [&_a]:items-center [&_a]:justify-center [&_a]:text-center [&_a]:text-[14px] [&_a]:font-semibold [&_a:link]:text-white [&_a:visited]:text-white [&_a.new]:text-white [&_a:hover]:text-white [&_a:active]:text-white [&_a]:drop-shadow-md ${bgColor}`}
    >
        {imageUrl && (
            <>
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url(${imageUrl})` }}
                />
                <div className="absolute inset-0 bg-black/50 transition-opacity group-hover:bg-black/60" />
            </>
        )}
        <WikitextLink page={link}>{title}</WikitextLink>
    </div>
);

interface CategoryItem {
    title: string;
    link: string;
    image?: string;
    bgColor?: string;
}

const categoryList: CategoryItem[] = [
    {
        title: '角色',
        link: 'Portal:角色',
    },
    {
        title: '物品',
        link: 'Portal:物品',
    },
    {
        title: '事件',
        link: 'Portal:事件',
    },
    {
        title: '地点',
        link: 'Portal:地点',
    },
    {
        title: '组织',
        link: 'Portal:组织',
    },
    {
        title: '动画',
        link: 'Portal:动画',
    },
    {
        title: '漫画',
        link: 'Portal:漫画',
    },
    {
        title: '小说',
        link: 'Portal:小说',
    },
    {
        title: '游戏',
        link: 'Portal:游戏',
    },
    {
        title: '音乐',
        link: 'Portal:音乐',
    },
    {
        title: '衍生作',
        link: 'Portal:衍生作',
    },
    {
        title: '时间线',
        link: 'Portal:时间线',
    },
];

export const Categories: React.FC = () => (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(9rem,1fr))] gap-x-3 gap-y-2 p-6 sm:gap-x-4 sm:gap-y-3 lg:gap-x-5">
        {categoryList.map(item => (
            <CategoryBase
                key={item.title}
                title={item.title}
                link={item.link}
                {...(item.image ? { imageUrl: item.image } : {})}
                {...(item.bgColor ? { bgColor: item.bgColor } : {})}
            />
        ))}
    </div>
);
