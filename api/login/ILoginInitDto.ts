import { ITraceable } from '@ts-core/common/trace';
import { User } from '../../user';

export interface ILoginInitDto extends ITraceable {}

export interface ILoginInitDtoResponse {
    user: User;
}
