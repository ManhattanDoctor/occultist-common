import { ITarotSpreadDto } from './ITarotSpreadDto';
import { MaxLength, IsString } from 'class-validator';

export interface ITarotSpreadQuestionDto extends ITarotSpreadDto {
    question: string;
}

export const TAROT_SPREAD_QUESTION_MAX_LENGTH = 256;

export class TarotSpreadQuestionDto implements ITarotSpreadQuestionDto {
    @IsString()
    @MaxLength(TAROT_SPREAD_QUESTION_MAX_LENGTH)
    question: string;
}
