import { Type } from 'class-transformer';
import { IsDate } from 'class-validator';
import { ITraceable } from '@ts-core/common/trace';

export interface ITarotSpreadDateDto extends ITraceable {
    date: Date;
}

export class TarotSpreadDateDto implements ITarotSpreadDateDto {
    @Type(() => Date)
    @IsDate()
    date: Date;
}
