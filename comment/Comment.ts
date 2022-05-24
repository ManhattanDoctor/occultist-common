
import { Type } from 'class-transformer';
import { User } from '../user';

export class Comment {
    public id: number;
    public text: string;
    public targetId: number;
    public targetType: CommentTargetType;

    public user: User;
    public userId: number;

    @Type(() => Date)
    public createdDate: Date;

    @Type(() => Date)
    public updatedDate: Date;
}

export enum CommentTargetType {
    TAROT_SPREAD = 'TAROT_SPREAD',
}

export const COMMENT_TEXT_MIN_LENGTH = 1;
export const COMMENT_TEXT_MAX_LENGTH = 2048;

