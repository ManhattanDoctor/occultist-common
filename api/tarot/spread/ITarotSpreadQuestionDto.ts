import { ITarotSpreadDto } from './ITarotSpreadDto';
import { MaxLength, IsString } from 'class-validator';
import { TAROT_SPREAD_QUESTION_MAX_LENGTH } from '../../../tarot';

export interface ITarotSpreadQuestionDto extends ITarotSpreadDto {
    question: string;
}

export class TarotSpreadQuestionDto implements ITarotSpreadQuestionDto {
    @IsString()
    @MaxLength(TAROT_SPREAD_QUESTION_MAX_LENGTH)
    question: string;
}
