import { ITraceable } from '@ts-core/common';
import { IGeo } from '../../geo';

export interface IGeoDto extends ITraceable {
    locale?: string;
}

export interface IGeoDtoResponse extends IGeo {}
