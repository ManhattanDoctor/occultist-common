import { ITraceable } from '@ts-core/common/trace';
import { Comment, CommentTargetType } from '../../comment';

export interface ICommentAddDto extends ITraceable {
    text: string;
    targetId: number;
    targetType: CommentTargetType;
}
export declare type ICommentAddDtoResponse = Comment;
