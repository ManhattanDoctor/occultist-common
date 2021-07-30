import { ITraceable } from '@ts-core/common/trace';
import { IGeo, IGeoDetails } from '../../geo';

export interface IGeoDto extends IGeo, ITraceable {}

export interface IGeoDtoResponse extends IGeoDetails {}
