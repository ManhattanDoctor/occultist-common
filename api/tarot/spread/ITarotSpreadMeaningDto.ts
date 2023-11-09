import { DateUtil } from '@ts-core/common';
import { TarotSpreadMeaning } from '../../../tarot';

export type ITarotSpreadMeaningDtoResponse = TarotSpreadMeaning;

export const TAROT_SPREAD_MEANING_TIMEOUT = 5 * DateUtil.MILLISECONDS_MINUTE;

