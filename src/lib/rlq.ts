declare global {
    interface Window {
        RLQ?: [string | string[], () => unknown][];
    }
}

export const depend = (dependency: string | string[], func: () => unknown) => {
    (window.RLQ ||= []).push([dependency, func]);
};
