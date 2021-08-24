import { TransportHttp, ITransportHttpSettings } from '@ts-core/common/transport/http';
import { ILogger } from '@ts-core/common/logger';
import * as _ from 'lodash';
import { ILoginDto, ILoginDtoResponse, IInitDto, IInitDtoResponse } from './login';
import { ITraceable, TraceUtil } from '@ts-core/common/trace';
import { TransformUtil } from '@ts-core/common/util';
import { User } from '../user';
import { IClockDto, IClockDtoResponse } from './clock/IClockDto';
import { IGeo } from '../geo';

export class OccultistClient extends TransportHttp<ITransportHttpSettings> {
    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(logger: ILogger, url?: string) {
        super(logger, { method: 'get', isHandleError: true, isHandleLoading: true, headers: {} });
        this.url = url;
    }

    // --------------------------------------------------------------------------
    //
    //  Auth Methods
    //
    // --------------------------------------------------------------------------

    public async login(data: ILoginDto): Promise<ILoginDtoResponse> {
        return this.call<ILoginDtoResponse, ILoginDto>(LOGIN_URL, { data: TraceUtil.addIfNeed(data), method: 'post' });
    }

    public async init(data?: IInitDto): Promise<IInitDtoResponse> {
        let item = await this.call<IInitDtoResponse, IInitDto>(INIT_URL, { data: TraceUtil.addIfNeed(data) });
        item.user = TransformUtil.toClass(User, item.user);
        return item;
    }

    public async logout(traceId?: string): Promise<void> {
        return this.call<void, ITraceable>(LOGOUT_URL, { data: TraceUtil.addIfNeed({ traceId }), method: 'post' });
    }

    // --------------------------------------------------------------------------
    //
    //  Other Methods
    //
    // --------------------------------------------------------------------------

    public async geo(data: ITraceable): Promise<IGeo> {
        let item = await this.call<IGeo, ITraceable>(GEO_URL, { data: TraceUtil.addIfNeed(data), isHandleError: false });
        return TransformUtil.toClass(IGeo, item);
    }
    
    public async clock(data: IClockDto): Promise<IClockDtoResponse> {
        let item = await this.call<IClockDtoResponse, IClockDto>(GEO_URL, { data: TraceUtil.addIfNeed(data), isHandleError: false });
        return TransformUtil.toClass(IClockDtoResponse, item);
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    //--------------------------------------------------------------------------

    public set sid(value: string) {
        if (!_.isNil(this.headers)) {
            this.headers.Authorization = `Bearer ${value}`;
        }
    }
}

export const PREFIX_URL = 'api/';

export const GEO_URL = PREFIX_URL + 'geo';
export const INIT_URL = PREFIX_URL + 'init';
export const CLOCK_URL = PREFIX_URL + 'clock';
export const LOGIN_URL = PREFIX_URL + 'login';
export const LOGOUT_URL = PREFIX_URL + 'logout';
