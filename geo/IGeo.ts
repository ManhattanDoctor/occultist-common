import { TransformUtil } from '@ts-core/common/util';
import { Type } from 'class-transformer';
import * as _ from 'lodash';

export class IGeo {
    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    @Type(() => Date)
    public date: Date;

    public location: string;
    public latitude: number;
    public longitude: number;

    //--------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    //--------------------------------------------------------------------------

    public copy?(): IGeo {
        return TransformUtil.toClass(IGeo, TransformUtil.fromClass(this));
    }
}
