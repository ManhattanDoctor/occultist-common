import { ITraceable } from '@ts-core/common/trace';
import { Type } from 'class-transformer';
import { IGeo } from '../../geo';

export interface IClockDto extends IGeo, ITraceable {}

export class IClockDtoResponse {
    @Type(() => Date)
    sunset: Date;
    @Type(() => Date)
    sunrise: Date;

    dayLength: number;
}
