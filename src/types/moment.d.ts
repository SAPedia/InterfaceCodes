import type { Moment as MomentBase } from 'moment';

interface Moment extends MomentBase {
    add(amount: number, unit: string): this;
}

declare global {
    const moment: () => Moment;
}
