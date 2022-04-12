import { User } from '@project/common/user';
import { Type } from 'class-transformer';

export class Comment {
    public id: number;
    public user: User;
    public text: string;

    public targetId: number;
    public targetType: CommentTargetType;

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

