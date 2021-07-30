import { TransportHttp, ITransportHttpSettings } from '@ts-core/common/transport/http';
import { ILogger } from '@ts-core/common/logger';
import * as _ from 'lodash';
import { Destroyable } from '@ts-core/common';
import { ILoginDto, ILoginDtoResponse, IInitDto, IInitDtoResponse } from './login';
import { IGeoDto, IGeoDtoResponse } from './geo';
import { ITraceable, TraceUtil } from '@ts-core/common/trace';
import { TransformUtil } from '@ts-core/common/util';
import { User } from '../user';
import { IGeo, IGeoDetails } from '../geo';

export class OccultistClient extends Destroyable {
    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------

    protected _http: TransportHttp<ITransportHttpSettings>;

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(logger: ILogger, url?: string) {
        super();
        this._http = new TransportHttp(logger, { method: 'get', isHandleError: true, isHandleLoading: true, headers: {} });
        if (!_.isNil(url)) {
            this.url = url;
        }
    }

    // --------------------------------------------------------------------------
    //
    //  Auth Methods
    //
    // --------------------------------------------------------------------------

    public async login(data: ILoginDto): Promise<ILoginDtoResponse> {
        return this.http.call<ILoginDtoResponse, ILoginDto>(LOGIN_URL, { data: TraceUtil.addIfNeed(data), method: 'post' });
    }

    public async init(data?: IInitDto): Promise<IInitDtoResponse> {
        let item = await this.http.call<IInitDtoResponse, IInitDto>(INIT_URL, { data: TraceUtil.addIfNeed(data) });
        item.user = TransformUtil.toClass(User, item.user);
        return item;
    }

    public async logout(traceId?: string): Promise<void> {
        return this.http.call<void, ITraceable>(LOGOUT_URL, { data: TraceUtil.addIfNeed({ traceId }), method: 'post' });
    }

    // --------------------------------------------------------------------------
    //
    //  Other Methods
    //
    // --------------------------------------------------------------------------

    public async geo(data: IGeoDto): Promise<IGeoDtoResponse> {
        let item = await this.http.call<IGeoDtoResponse, IGeoDto>(GEO_URL, { data: TraceUtil.addIfNeed(data) });
        return TransformUtil.toClass(IGeoDetails, item);
    }

    public destroy(): void {
        if (this.isDestroyed) {
            return;
        }
        super.destroy();
        this._http.destroy();
        this._http = null;
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    //--------------------------------------------------------------------------

    public get http(): TransportHttp<ITransportHttpSettings> {
        return this._http;
    }

    public get headers(): any {
        return !_.isNil(this.http) ? this.http.headers : null;
    }

    public get url(): string {
        return !_.isNil(this.http) ? this.http.url : null;
    }
    public set url(value: string) {
        if (!_.isNil(this.http)) {
            this.http.url = value;
        }
    }

    public set sid(value: string) {
        if (!_.isNil(this.headers)) {
            this.headers.Authorization = `Bearer ${value}`;
        }
    }
}

export const PREFIX_URL = 'api/';

export const GEO_URL = PREFIX_URL + 'geo';
export const INIT_URL = PREFIX_URL + 'init';
export const LOGIN_URL = PREFIX_URL + 'login';
export const LOGOUT_URL = PREFIX_URL + 'logout';
