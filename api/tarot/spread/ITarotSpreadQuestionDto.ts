import { Type } from 'class-transformer';
import { ITarotSpreadDateDto } from './ITarotSpreadDateDto';

export class ITarotSpreadQuestionDto extends ITarotSpreadDateDto {
    @Type(() => Date)
    public date: Date;
}
