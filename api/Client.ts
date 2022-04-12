import { TransportHttp, ITransportHttpSettings } from '@ts-core/common/transport/http';
import { ILogger } from '@ts-core/common/logger';
import * as _ from 'lodash';
import { ITraceable, TraceUtil } from '@ts-core/common/trace';
import { TransformUtil } from '@ts-core/common/util';
import { IClockDto, IClockDtoResponse } from './clock/IClockDto';
import { IInitDto, IInitDtoResponse, ILoginDto, ILoginDtoResponse } from './login';
import { User } from '../user';
import { ITarotSpreadAddDto, ITarotSpreadListDto, ITarotSpreadListDtoResponse, ITarotSpreadAddDtoResponse, ITarotSpreadDateDto, ITarotSpreadDtoResponse, ITarotSpreadAddCheckDto } from './tarot/spread';
import { IUserListDto, IUserListDtoResponse, IUserGetDtoResponse, IUserEditDto, IUserEditDtoResponse } from '../api/user';
import { IGeo } from '../geo';
import { TarotSpread } from '../tarot';

export class Client extends TransportHttp<ITransportHttpSettings> {
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
    //  Tarot Methods
    //
    // --------------------------------------------------------------------------

    public async tarotSpreadGet(uid: string): Promise<ITarotSpreadDtoResponse> {
        let item = await this.call<ITarotSpreadDtoResponse, void>(`${TAROT_SPREAD_URL}/${uid}`);
        return TransformUtil.toClass(TarotSpread, item);
    }

    public async tarotSpreadAdd(data: ITarotSpreadAddDto): Promise<ITarotSpreadAddDtoResponse> {
        let item = await this.call<ITarotSpreadAddDtoResponse, ITarotSpreadAddDto>(`${TAROT_SPREAD_URL}`, { method: 'post', data });
        return TransformUtil.toClass(TarotSpread, item);
    }

    public async tarotSpreadList(data: ITarotSpreadListDto): Promise<ITarotSpreadListDtoResponse> {
        let item = await this.call<ITarotSpreadListDtoResponse, ITarotSpreadListDto>(`${TAROT_SPREAD_URL}`, { data });
        item.items = TransformUtil.toClassMany(TarotSpread, item.items);
        return item;
    }

    public async tarotSpreadAddCheck(data?: ITarotSpreadAddCheckDto): Promise<void> {
        return this.call<void, ITarotSpreadAddCheckDto>(`${TAROT_SPREAD_ADD_CHECK_URL}`, { data });
    }

    public async tarotSpreadDay(data: ITarotSpreadDateDto): Promise<ITarotSpreadDtoResponse> {
        return this.call<ITarotSpreadDtoResponse, ITarotSpreadDateDto>(`${TAROT_SPREAD_DAY_URL}`, { method: 'post', data });
    }

    // --------------------------------------------------------------------------
    //
    //  Other Methods
    //
    // --------------------------------------------------------------------------

    public async geo(): Promise<IGeo> {
        return this.call<IGeo, void>(GEO_URL, { isHandleError: false });
    }

    public async locale(locale: string): Promise<any> {
        return this.call<any>(`${LOCALE_URL}/${locale}`);
    }

    public async clock(data: IClockDto): Promise<IClockDtoResponse> {
        let item = await this.call<IClockDtoResponse, IClockDto>(CLOCK_URL, { data: TraceUtil.addIfNeed(data), isHandleError: false });

        item.date = new Date(item.date);
        item.sunset = new Date(item.sunset);
        item.sunrise = new Date(item.sunrise);

        item.moon.date = new Date(item.moon.date);
        return item;
    }

    // --------------------------------------------------------------------------
    //
    //  User Methods
    //
    // --------------------------------------------------------------------------

    public async userGet(id: string | number): Promise<IUserGetDtoResponse> {
        let item = await this.call<User>(`${USER_URL}/${id}`);
        return TransformUtil.toClass(User, item);
    }

    public async userEdit(data: IUserEditDto): Promise<IUserEditDtoResponse> {
        let item = await this.call<IUserEditDtoResponse, IUserEditDto>(`${USER_URL}/${data.uid}`, { method: 'put', data });
        return TransformUtil.toClass(User, item);
    }

    public async userList(data?: IUserListDto): Promise<IUserListDtoResponse> {
        let item = await this.call<IUserListDtoResponse, IUserListDto>(USER_URL, { data: TraceUtil.addIfNeed(data) });
        item.items = TransformUtil.toClassMany(User, item.items);
        return item;
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
export const USER_URL = PREFIX_URL + 'user';
export const INIT_URL = PREFIX_URL + 'init';
export const LOGIN_URL = PREFIX_URL + 'login';
export const LOGOUT_URL = PREFIX_URL + 'logout';

export const MOON_URL = PREFIX_URL + 'moon';
export const CLOCK_URL = PREFIX_URL + 'clock';
export const LOCALE_URL = PREFIX_URL + 'locale';

export const TAROT_SPREAD_URL = PREFIX_URL + 'tarot/spread';
export const TAROT_SPREAD_DAY_URL = PREFIX_URL + 'tarot/spread-day';
export const TAROT_SPREAD_ADD_CHECK_URL = PREFIX_URL + 'tarot/spread-check';

export const USER_PICTURE_UPLOAD_URL = PREFIX_URL + 'user/picture/upload';
