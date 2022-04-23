import { ITraceable } from '@ts-core/common/trace';
import { Comment } from '../../comment';

export interface ICommentEditDto extends ITraceable {
    id: number;
    text: string;
}
export declare type ICommentEditDtoResponse = Comment;
