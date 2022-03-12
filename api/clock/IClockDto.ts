import { ITraceable } from '@ts-core/common/trace';
import { IGeo } from '../../geo';
import { IMoonDto, IMoonDtoResponse } from '../moon';

export interface IClockDto extends IGeo, ITraceable {
    date: Date;
}

export interface IClockDtoResponse {
    sunset: Date;
    sunrise: Date;
    dayLength: number;

    moon: IMoonDtoResponse;
}
