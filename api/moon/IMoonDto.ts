import { ITraceable } from '@ts-core/common/trace';
import { IGeo } from '../../geo';

export interface IMoonDto extends IGeo, ITraceable {
    date: Date;
}

export interface IMoonDtoResponse {
    phase: string;
    phaseEmoji: string;
}
