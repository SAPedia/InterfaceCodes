export const Header = () => (
    <div className="w-full px-4 pb-4 pt-4">
        <div className="mx-auto flex w-full max-w-xl flex-col items-center justify-center gap-6 sm:max-w-2xl lg:max-w-3xl">
            <div className="flex flex-col items-center gap-2">
                <span className="text-2xl font-extrabold tracking-tight text-slate-800 md:text-3xl lg:text-4xl dark:text-white">
                    欢迎来到 SAPedia
                </span>
                <span className="max-sm:hidden text-xs text-slate-500 sm:text-sm dark:text-white/50">
                    这虽然是游戏，但可不是闹着玩的。——「刀剑神域」设计者·茅场晶彦
                </span>
            </div>

            <div className="w-full">
                <div className="citizen-search-trigger group flex w-full cursor-pointer items-center justify-between rounded-xl bg-white/80 px-4 py-3 shadow-sm ring-1 ring-slate-200 backdrop-blur-sm transition-all duration-300 hover:shadow-md hover:ring-blue-400/50 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500/60 sm:px-5 sm:py-3.5 dark:bg-white/6 dark:ring-white/8 dark:backdrop-blur-xl dark:hover:bg-white/10 dark:hover:ring-blue-400/40 dark:focus-within:ring-blue-400/60 dark:focus-within:shadow-blue-900/30">
                    <div className="flex items-center gap-3 text-slate-400 transition-colors group-hover:text-blue-500 dark:text-white/40 dark:group-hover:text-blue-400">
                        {/* <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="h-5 w-5"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                            />
                        </svg> */}
                        <span className="text-xs font-medium sm:text-sm md:text-base dark:text-white/80">
                            点击搜索全站内容
                        </span>
                    </div>
                    <kbd className="max-sm:hidden inline-flex h-5 w-5 items-center justify-center rounded border border-slate-300 bg-slate-100 text-xs font-semibold text-slate-400 shadow-sm dark:border-white/12 dark:bg-white/10 dark:text-white/40">
                        /
                    </kbd>
                </div>
            </div>
        </div>
    </div>
);
