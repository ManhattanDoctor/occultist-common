import { ITraceable } from '@ts-core/common';
import { IGeo } from '../../geo';

export interface IMoonDto extends IGeo, ITraceable {
    date: Date;
}

export interface IMoonDtoResponse {
    date: Date;
    phase: string;
    phaseEmoji: string;
    isWaning: boolean;
    isWaxing: boolean;
    hemisphere: string;

    age: number;
    ageMax: number;
    ageItem: number;
    agePercent: number;
}
