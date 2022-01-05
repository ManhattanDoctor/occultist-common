import { TransportHttp, ITransportHttpSettings } from '@ts-core/common/transport/http';
import { ILogger } from '@ts-core/common/logger';
import * as _ from 'lodash';
import { ITraceable, TraceUtil } from '@ts-core/common/trace';
import { TransformUtil } from '@ts-core/common/util';
import { IClockDto, IClockDtoResponse } from './clock/IClockDto';
import { IInitDto, IInitDtoResponse, ILoginDto, ILoginDtoResponse } from './login';
import { User } from '../user';
import { ITarotSpreadDateDto, ITarotSpreadQuestionDto, ITarotSpreadDtoResponse } from './tarot/spread';
import { RandomGenerator } from '../util';
import { IUserListDto, IUserListDtoResponse, IUserGetDtoResponse, IUserEditDto, IUserEditDtoResponse } from '../api/user';
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
    //  Tarot Methods
    //
    // --------------------------------------------------------------------------

    public async tarotSpreadDay(data: ITarotSpreadDateDto): Promise<ITarotSpreadDtoResponse> {
        return this.call<ITarotSpreadDtoResponse, ITarotSpreadDateDto>(`${TAROT_SPREAD_DAY}`, { method: 'post', data });
    }

    public async tarotSpreadThree(data: ITarotSpreadQuestionDto): Promise<ITarotSpreadDtoResponse> {
        let item = await this.tarotIndexes(new Date().getTime().toString());
        item.indexes = item.indexes.slice(0, 3);
        return item;
    }

    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------

    private async tarotIndexes(seed: string): Promise<ITarotSpreadDtoResponse> {
        let length = 78;
        let generator = new RandomGenerator(seed);
        let indexes: Array<number> = [];
        while (indexes.length < length) {
            let index = generator.integerFromZeroTo(length);
            if (!indexes.includes(index)) {
                indexes.push(index);
            }
        }
        return { indexes };
    }

    // --------------------------------------------------------------------------
    //
    //  Other Methods
    //
    // --------------------------------------------------------------------------

    public async locale(locale: string): Promise<any> {
        return this.call<any>(`${LOCALE_URL}/${locale}`);
    }

    public async clock(data: IClockDto): Promise<IClockDtoResponse> {
        let item = await this.call<IClockDtoResponse, IClockDto>(CLOCK_URL, { data: TraceUtil.addIfNeed(data), isHandleError: false });
        return TransformUtil.toClass(IClockDtoResponse, item);
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
export const USER_URL = PREFIX_URL + 'user';
export const INIT_URL = PREFIX_URL + 'init';
export const LOGIN_URL = PREFIX_URL + 'login';
export const LOGOUT_URL = PREFIX_URL + 'logout';
export const CLOCK_URL = PREFIX_URL + 'clock';
export const LOCALE_URL = PREFIX_URL + 'locale';

export const TAROT_SPREAD_DAY = PREFIX_URL + 'tarot/spread/day';
export const TAROT_SPREAD_QUESTION = PREFIX_URL + 'tarot/spread/question';

export const USER_PICTURE_UPLOAD_URL = PREFIX_URL + 'user/picture/upload';
