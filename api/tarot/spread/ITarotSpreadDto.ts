import { ITraceable } from '@ts-core/common/trace';
import { IsOptional, MaxLength, IsString } from 'class-validator';
import { TAROT_SPREAD_COMMENT_MAX_LENGTH } from '../../../tarot';

export interface ITarotSpreadDto extends ITraceable {
    comment?: string;
    querent?: string;
}

export class TarotSpreadDto implements ITarotSpreadDto {
    @IsString()
    @IsOptional()
    @MaxLength(TAROT_SPREAD_COMMENT_MAX_LENGTH)
    comment?: string;
}


