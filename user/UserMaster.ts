import * as _ from 'lodash';

export class UserMaster {
    level: UserMasterLevel;
    voice: string;
    status: string;
    photos: Array<string>;
    skills: Array<UserMasterSkill>;
    biography: string;

    role: string;
    manner: string;

    video: string;
    videoSmall: string;

    picture: string;
    pictureSmall: string;
    
    pictureAnimated: string;
    pictureAnimatedSmall: string;
}
export enum UserMasterSkill {
    ART = 'ART',
    YOGA = 'YOGA',
    MEDITATION = 'MEDITATION',
    WICCA = 'WICCA',
    MAGIC = 'MAGIC',
    CRYSTALS = 'CRYSTALS',
    HEALING = 'HEALING',
    OCCULTISM = 'OCCULTISM',
    ASTROLOGY = 'ASTROLOGY',
    MYSTICISM = 'MYSTICISM',
    SYMBOLISM = 'SYMBOLISM',
    HERBALISM = 'HERBALISM',
    CHRISTIAN = 'CHRISTIAN',
    DARK_MAGIC = 'DARK_MAGIC',
    WHITE_MAGIC = 'WHITE_MAGIC',
    BLACK_MAGIC = 'BLACK_MAGIC',
    NATURAL_MAGIC = 'NATURAL_MAGIC',
    HUMAN_DESIGN = 'HUMAN_DESIGN',
    SUFISM = 'SUFISM',
    MEDIUM = 'MEDIUM',
    PSYCHIC = 'PSYCHIC',
    CLAIRVOYANCE = 'CLAIRVOYANCE',
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
