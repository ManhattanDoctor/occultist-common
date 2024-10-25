import { DateUtil } from '@ts-core/common';
import { TarotSpreadMeaningAi } from '../../../tarot';

export type ITarotSpreadMeaningAiDtoResponse = TarotSpreadMeaningAi;

export const TAROT_SPREAD_MEANING_AI_TIMEOUT = 5 * DateUtil.MILLISECONDS_MINUTE;

