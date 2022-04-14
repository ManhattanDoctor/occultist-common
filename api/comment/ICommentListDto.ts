import { IPaginable, IPagination } from '@ts-core/common/dto';
import { ITraceable } from '@ts-core/common/trace';
import { Comment } from '../../comment';

export interface ICommentListDto extends IPaginable<Comment>, ITraceable {}

export interface ICommentListDtoResponse extends IPagination<Comment> { }
