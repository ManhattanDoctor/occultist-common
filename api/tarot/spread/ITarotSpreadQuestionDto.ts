import { ITraceable } from '@ts-core/common/trace';
import { Type } from 'class-transformer';
import { ITarotSpreadDateDto } from '.';

export class ITarotSpreadQuestionDto extends ITarotSpreadDateDto {
    @Type(() => Date)
    public date: Date;
}
