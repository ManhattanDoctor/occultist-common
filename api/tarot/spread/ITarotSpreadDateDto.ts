import { ITraceable } from '@ts-core/common/trace';
import { Type } from 'class-transformer';

export class ITarotSpreadDateDto {
    @Type(() => Date)
    public date: Date;
}
