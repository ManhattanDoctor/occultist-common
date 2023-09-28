import * as _ from 'lodash';

export class UserMaster {
    voice: string;
    level: UserMasterLevel;
    status: string;
    photos: Array<string>;
    skills: Array<UserMasterSkill>;
    character: string;
    biography: string;

    video: string;
    videoSmall: string;

    picture: string;
    pictureSmall: string;
    
    pictureAnimated: string;
    pictureAnimatedSmall: string;
}
export enum UserMasterSkill {
    ART = 'ART',
    WICCA = 'WICCA',
    MAGIC = 'MAGIC',
    CRYSTALS = 'CRYSTALS',
    HEALING = 'HEALING',
    OCCULTISM = 'OCCULTISM',
    ASTROLOGY = 'ASTROLOGY',
    MYSTICISM = 'MYSTICISM',
    SYMBOLISM = 'SYMBOLISM',
    HERBALISM = 'HERBALISM',
    ORTHODOXY = 'ORTHODOXY',
    DARK_MAGIC = 'DARK_MAGIC',
    WHITE_MAGIC = 'WHITE_MAGIC',
    BLACK_MAGIC = 'BLACK_MAGIC',
    NATURAL_MAGIC = 'NATURAL_MAGIC',
    HISTORY = 'HISTORY',
    PSYCHOLOGY = 'PSYCHOLOGY',
    PHILOSOPHY = 'PHILOSOPHY',

    GESTALT_THERAPY = 'GESTALT_THERAPY',
    JUNGIAN_ANALYSIS = 'JUNGIAN_ANALYSIS',
    FREUDIAN_PSYCHOANALYSIS = 'FREUDIAN_PSYCHOANALYSIS',
}
export enum UserMasterLevel {
    MASTER = 'MASTER',
    BEGINNER = 'BEGINNER',
    ADVANCED = 'ADVANCED',
}
