import { Type } from 'class-transformer';
import { ITarotSpreadDto } from './ITarotSpreadDto';
import { IsDate } from 'class-validator';

export interface ITarotSpreadDateDto extends ITarotSpreadDto {
    date: Date;
}

export class TarotSpreadDateDto implements ITarotSpreadDateDto {
    @Type(() => Date)
    @IsDate()
    date: Date;
}
