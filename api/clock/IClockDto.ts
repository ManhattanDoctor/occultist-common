import { ITraceable } from '@ts-core/common';
import { IGeo } from '../../geo';
import { IMoonDtoResponse } from '../moon';

export interface IClockDto extends IGeo, ITraceable {
    date: Date;
}

export interface IClockDtoResponse {
    date: Date;
    sunset: Date;
    sunrise: Date;
    dayLength: number;

    moon: IMoonDtoResponse;
}
