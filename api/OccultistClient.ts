import { TransportHttp, ITransportHttpSettings } from '@ts-core/common/transport/http';
import { ILogger } from '@ts-core/common/logger';
import * as _ from 'lodash';
import { Destroyable } from '@ts-core/common';
import { ILoginDto, ILoginDtoResponse, ILoginInitDto, ILoginInitDtoResponse } from './login';
import { ITraceable, TraceUtil } from '@ts-core/common/trace';
import { TransformUtil } from '@ts-core/common/util';
import { User } from '../user';

export class OccultistClient extends Destroyable {
    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------

    protected _http: TransportHttp;

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

    public async init(data?: ILoginInitDto): Promise<ILoginInitDtoResponse> {
        let item = await this.http.call<ILoginInitDtoResponse, ILoginInitDto>(INIT_URL, { data: TraceUtil.addIfNeed(data) });
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

    public get http(): TransportHttp {
        return this._http;
    }

    public get headers(): any {
        return !_.isNil(this.settings) ? this.settings.headers : null;
    }

    public get url(): string {
        return !_.isNil(this.settings) ? this.settings.baseURL : null;
    }
    public set url(value: string) {
        if (!_.isNil(this.settings)) {
            this.settings.baseURL = value;
        }
    }

    public set sid(value: string) {
        if (!_.isNil(this.headers)) {
            this.headers.Authorization = `Bearer ${value}`;
        }
    }

    public get settings(): ITransportHttpSettings {
        return !_.isNil(this.http) ? this.http.settings : null;
    }
    public set settings(value: ITransportHttpSettings) {
        if (!_.isNil(this.http)) {
            this.http.settings = value;
        }
    }
}

export const PREFIX_URL = 'api/';

export const INIT_URL = PREFIX_URL + 'init';
export const LOGIN_URL = PREFIX_URL + 'login';
export const LOGOUT_URL = PREFIX_URL + 'logout';
