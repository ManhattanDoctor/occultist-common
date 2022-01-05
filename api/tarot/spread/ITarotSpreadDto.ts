import { ITraceable } from '@ts-core/common/trace';
import { IsOptional, MaxLength, IsString } from 'class-validator';

export interface ITarotSpreadDto extends ITraceable {
    comment?: string;
}

export const TAROT_SPREAD_COMMENT_MAX_LENGTH = 256;

export class TarotSpreadDto implements ITarotSpreadDto {
    @IsString()
    @IsOptional()
    @MaxLength(TAROT_SPREAD_COMMENT_MAX_LENGTH)
    comment?: string;
}


