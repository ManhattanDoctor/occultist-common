import { TransportHttp, ITransportHttpSettings } from '@ts-core/common/transport/http';
import { ILogger } from '@ts-core/common/logger';
import * as _ from 'lodash';
import { ITraceable, TraceUtil } from '@ts-core/common/trace';
import { TransformUtil } from '@ts-core/common/util';
import { IClockDto, IClockDtoResponse } from './clock/IClockDto';
import { IInitDto, IInitDtoResponse, ILoginDto, ILoginDtoResponse } from './login';
import { User } from '../user';
import { ITarotSpreadAddDto, ITarotSpreadListDto, ITarotSpreadListDtoResponse, ITarotSpreadAddDtoResponse, ITarotSpreadDateDto, ITarotSpreadDtoResponse, ITarotSpreadAddCheckDto, ITarotSpreadEditDto, ITarotSpreadEditDtoResponse } from './tarot/spread';
import { IUserListDto, IUserListDtoResponse, IUserGetDtoResponse, IUserEditDto, IUserEditDtoResponse } from '../api/user';
import { IGeo } from '../geo';
import { ICommentAddDto, ICommentAddDtoResponse, ICommentEditDto, ICommentEditDtoResponse, ICommentGetDtoResponse, ICommentListDto, ICommentListDtoResponse, ICommentRemoveDtoResponse } from './comment';
import { Comment } from '../comment';
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
        return this.call<void, ITraceable>(LOGOUT_URL, { data: TraceUtil.addIfNeed({ traceId }), method: 'post', isHandleError: false });
    }

    // --------------------------------------------------------------------------
    //
    //  Tarot Methods
    //
    // --------------------------------------------------------------------------

    public async tarotSpreadGet(idOrUid: string | number): Promise<ITarotSpreadDtoResponse> {
        let item = await this.call<ITarotSpreadDtoResponse, void>(`${TAROT_SPREAD_URL}/${idOrUid}`);
        return TransformUtil.toClass(TarotSpread, item);
    }

    public async tarotSpreadRemove(uid: string): Promise<void> {
        return this.call<void, void>(`${TAROT_SPREAD_URL}/${uid}`, { method: 'delete' });
    }

    public async tarotSpreadAdd(data: ITarotSpreadAddDto): Promise<ITarotSpreadAddDtoResponse> {
        let item = await this.call<ITarotSpreadAddDtoResponse, ITarotSpreadAddDto>(`${TAROT_SPREAD_URL}`, { method: 'post', data: TraceUtil.addIfNeed(data) });
        return TransformUtil.toClass(TarotSpread, item);
    }

    public async tarotSpreadEdit(data: ITarotSpreadEditDto): Promise<ITarotSpreadEditDtoResponse> {
        let item = await this.call<ITarotSpreadEditDtoResponse, ITarotSpreadEditDto>(`${TAROT_SPREAD_URL}/${data.uid}`, { method: 'put', data: TraceUtil.addIfNeed(data) });
        return TransformUtil.toClass(TarotSpread, item);
    }

    public async tarotSpreadList(data: ITarotSpreadListDto): Promise<ITarotSpreadListDtoResponse> {
        let item = await this.call<ITarotSpreadListDtoResponse, ITarotSpreadListDto>(`${TAROT_SPREAD_URL}`, { data: TraceUtil.addIfNeed(data) });
        item.items = TransformUtil.toClassMany(TarotSpread, item.items);
        return item;
    }

    public async tarotSpreadAddCheck(data?: ITarotSpreadAddCheckDto): Promise<void> {
        return this.call<void, ITarotSpreadAddCheckDto>(`${TAROT_SPREAD_ADD_CHECK_URL}`, { data });
    }

    public async tarotSpreadDay(data: ITarotSpreadDateDto): Promise<ITarotSpreadDtoResponse> {
        return this.call<ITarotSpreadDtoResponse, ITarotSpreadDateDto>(`${TAROT_SPREAD_DAY_URL}`, { method: 'post', data: TraceUtil.addIfNeed(data) });
    }

    // --------------------------------------------------------------------------
    //
    //  User Methods
    //
    // --------------------------------------------------------------------------

    public async userGet(id: string | number): Promise<IUserGetDtoResponse> {
        let item = await this.call<IUserGetDtoResponse>(`${USER_URL}/${id}`);
        return TransformUtil.toClass(User, item);
    }

    public async userEdit(data: IUserEditDto): Promise<IUserEditDtoResponse> {
        let item = await this.call<IUserEditDtoResponse, IUserEditDto>(`${USER_URL}/${data.uid}`, { method: 'put', data: TraceUtil.addIfNeed(data) });
        return TransformUtil.toClass(User, item);
    }

    // --------------------------------------------------------------------------
    //
    //  Comment Methods
    //
    // --------------------------------------------------------------------------

    public async commentAdd(data: ICommentAddDto): Promise<ICommentAddDtoResponse> {
        let item = await this.call<ICommentAddDtoResponse, ICommentAddDto>(`${COMMENT_URL}`, { method: 'post', data: TraceUtil.addIfNeed(data) });
        return TransformUtil.toClass(Comment, item);
    }

    public async commentGet(id: number): Promise<ICommentGetDtoResponse> {
        let item = await this.call<ICommentGetDtoResponse>(`${COMMENT_URL}/${id}`);
        return TransformUtil.toClass(Comment, item);
    }

    public async commentEdit(data: ICommentEditDto): Promise<ICommentEditDtoResponse> {
        let item = await this.call<ICommentEditDtoResponse, ICommentEditDto>(`${COMMENT_URL}/${data.id}`, { data: TraceUtil.addIfNeed(data), method: 'put' });
        return TransformUtil.toClass(Comment, item);
    }

    public async commentList(data?: ICommentListDto): Promise<ICommentListDtoResponse> {
        let item = await this.call<ICommentListDtoResponse, ICommentListDto>(COMMENT_URL, { data: TraceUtil.addIfNeed(data) });
        item.items = TransformUtil.toClassMany(Comment, item.items);
        return item;
    }

    public async commentRemove(id: number): Promise<ICommentRemoveDtoResponse> {
        let item = await this.call<ICommentRemoveDtoResponse>(`${COMMENT_URL}/${id}`, { method: 'delete' });
        return TransformUtil.toClass(Comment, item);
    }

    //--------------------------------------------------------------------------
    //
    // 	Management Methods
    //
    //--------------------------------------------------------------------------

    public async managementUserList(data?: IUserListDto): Promise<IUserListDtoResponse> {
        let item = await this.call<IUserListDtoResponse, IUserListDto>(MANAGEMENT_USER_URL, { data: TraceUtil.addIfNeed(data) });
        item.items = TransformUtil.toClassMany(User, item.items);
        return item;
    }

    public async managementCommentList(data?: ICommentListDto): Promise<ICommentListDtoResponse> {
        let item = await this.call<ICommentListDtoResponse, ICommentListDto>(MANAGEMENT_COMMENT_URL, { data: TraceUtil.addIfNeed(data) });
        item.items = TransformUtil.toClassMany(Comment, item.items);
        return item;
    }

    public async managementTarotSpreadList(data: ITarotSpreadListDto): Promise<ITarotSpreadListDtoResponse> {
        let item = await this.call<ITarotSpreadListDtoResponse, ITarotSpreadListDto>(`${MANAGEMENT_TAROT_SPREAD_URL}`, { data: TraceUtil.addIfNeed(data) });
        item.items = TransformUtil.toClassMany(TarotSpread, item.items);
        return item;
    }

    // --------------------------------------------------------------------------
    //
    //  Other Methods
    //
    // --------------------------------------------------------------------------

    public async geo(): Promise<IGeo> {
        return this.call<IGeo, void>(GEO_URL);
    }

    public async locale(locale: string, version?: string): Promise<any> {
        return this.call<any>(`${LOCALE_URL}/${locale}`, { data: { version } });
    }

    public async clock(data: IClockDto): Promise<IClockDtoResponse> {
        let item = await this.call<IClockDtoResponse, IClockDto>(CLOCK_URL, { data: TraceUtil.addIfNeed(data), isHandleError: true });

        item.date = new Date(item.date);
        item.sunset = new Date(item.sunset);
        item.sunrise = new Date(item.sunrise);

        item.moon.date = new Date(item.moon.date);
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

export const COMMENT_URL = PREFIX_URL + 'comment';

export const TAROT_SPREAD_URL = PREFIX_URL + 'tarot/spread';
export const TAROT_SPREAD_DAY_URL = PREFIX_URL + 'tarot/spread-day';
export const TAROT_SPREAD_ADD_CHECK_URL = PREFIX_URL + 'tarot/spread-check';

export const MANAGEMENT_USER_URL = PREFIX_URL + 'management/user';
export const MANAGEMENT_COMMENT_URL = PREFIX_URL + 'management/comment';
export const MANAGEMENT_TAROT_SPREAD_URL = PREFIX_URL + 'management/tarot/spread';

export const USER_PICTURE_UPLOAD_URL = PREFIX_URL + 'user/picture/upload';
