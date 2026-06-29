interface CategoryBaseProps {
    title: string;
    imageUrl?: string;
    bgColor?: string;
}

const CategoryBase: React.FC<CategoryBaseProps> = ({
    title,
    imageUrl,
    bgColor = 'bg-neutral-800',
}) => (
    <div
        className={`group relative flex min-h-12 w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:ring-1 hover:ring-white/15 ${bgColor}`}
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
        <span className="relative z-10 text-center text-[14px] font-semibold text-white drop-shadow-md">
            {title}
        </span>
    </div>
);

interface CategoryItem {
    title: string;
    image?: string;
    bgColor?: string;
}

const categoryList: CategoryItem[] = [
    {
        title: '角色',
    },
    {
        title: '物品',
    },
    {
        title: '事件',
    },
    {
        title: '地点',
    },
    {
        title: '组织',
    },
    {
        title: '动画',
    },
    {
        title: '漫画',
    },
    {
        title: '小说',
    },
    {
        title: '游戏',
    },
    {
        title: '音乐',
    },
    {
        title: '衍生作',
    },
    {
        title: '时间线',
    },
];

export const Categories: React.FC = () => (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(9rem,1fr))] gap-x-3 gap-y-2 p-6 sm:gap-x-4 sm:gap-y-3 lg:gap-x-5">
        {categoryList.map(item => (
            <CategoryBase
                key={item.title}
                title={item.title}
                {...(item.image ? { imageUrl: item.image } : {})}
                {...(item.bgColor ? { bgColor: item.bgColor } : {})}
            />
        ))}
    </div>
);
