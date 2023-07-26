import { TransportHttp, ITransportHttpSettings, LoggerLevel, DateUtil } from '@ts-core/common';
import { ILogger, TransformUtil, ITraceable, TraceUtil } from '@ts-core/common';
import * as _ from 'lodash';
import { IClockDto, IClockDtoResponse } from './clock';
import { IInitDto, IInitDtoResponse, ILoginDto, ILoginDtoResponse } from './login';
import { User } from '../user';
import { ITarotSpreadMeaningAddDto, ITarotSpreadMeaningEditDto, ITarotSpreadMeaningEditDtoResponse, ITarotSpreadAddDto, ITarotSpreadListDto, ITarotSpreadListDtoResponse, ITarotSpreadAddDtoResponse, ITarotSpreadDateDto, ITarotSpreadDtoResponse, ITarotSpreadAddCheckDto, ITarotSpreadEditDto, ITarotSpreadMeaningAddDtoResponse, ITarotSpreadMeaningRejectDto, ITarotSpreadMeaningRejectDtoResponse, ITarotSpreadMeaningRateDto, ITarotSpreadMeaningRateDtoResponse, ITarotSpreadMeaningApproveDto, ITarotSpreadMeaningApproveDtoResponse, ITarotSpreadMeaningDtoResponse, ITarotSpreadMeaningCancelDtoResponse } from './tarot/spread';
import { IGeo } from '../geo';
import { ICommentAddDto, ICommentAddDtoResponse, ICommentEditDto, ICommentEditDtoResponse, ICommentGetDtoResponse, ICommentListDto, ICommentListDtoResponse, ICommentRemoveDtoResponse } from './comment';
import { Comment } from '../comment';
import { TarotSpread, TarotSpreadMeaning, TarotSpreadUID } from '../tarot';
import { IPeopleListDto, IPeopleListDtoResponse } from './people';
import { IManagementTarotSpreadListDto, IManagementTarotSpreadListDtoResponse, IManagementTarotSpreadMeaningListDto, IManagementTarotSpreadMeaningListDtoResponse } from './management';
import { LocaleProject } from './locale';
import { IUserEditDto, IUserEditDtoResponse, IUserGetDtoResponse, IUserListDto, IUserListDtoResponse } from './user';
import { IStatisticsGetDtoResponse } from './statistics';
import { IOAuthPopUpDto } from '@ts-core/oauth';

export class Client extends TransportHttp<ITransportHttpSettings> {
    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(logger: ILogger, url?: string, level?: LoggerLevel) {
        super(logger, { method: 'get', isHandleError: true, isHandleLoading: true, headers: {} });

        if (!_.isNil(url)) {
            this.url = url;
        }
        if (!_.isNil(level)) {
            this.level = level;
        }
    }

    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------

    private tarotSpreadMeaningSpreadSet(item: TarotSpread): TarotSpread {
        let meaning = item.meaning;
        if (!_.isNil(meaning)) {
            meaning.spread = item;
        }
        return item;
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

    public async logoutOthers(traceId?: string): Promise<void> {
        return this.call<void, ITraceable>(LOGOUT_OTHERS_URL, { data: TraceUtil.addIfNeed({ traceId }), method: 'post', isHandleError: false });
    }

    // --------------------------------------------------------------------------
    //
    //  Tarot Spread Methods
    //
    // --------------------------------------------------------------------------

    public async tarotSpreadGet(uid: TarotSpreadUID): Promise<ITarotSpreadDtoResponse> {
        let item = await this.call<ITarotSpreadDtoResponse, void>(`${TAROT_SPREAD_URL}/${uid}`);
        return this.tarotSpreadMeaningSpreadSet(TransformUtil.toClass(TarotSpread, item));
    }

    public async tarotSpreadGetById(id: number): Promise<ITarotSpreadDtoResponse> {
        let item = await this.call<ITarotSpreadDtoResponse, void>(`${TAROT_SPREAD_URL_ID}/${id}`);
        return this.tarotSpreadMeaningSpreadSet(TransformUtil.toClass(TarotSpread, item));
    }

    public async tarotSpreadRemove(uid: TarotSpreadUID): Promise<void> {
        return this.call<void, void>(`${TAROT_SPREAD_URL}/${uid}`, { method: 'delete' });
    }

    public async tarotSpreadAdd(data: ITarotSpreadAddDto): Promise<ITarotSpreadAddDtoResponse> {
        let item = await this.call<ITarotSpreadAddDtoResponse, ITarotSpreadAddDto>(`${TAROT_SPREAD_URL}`, { method: 'post', data: TraceUtil.addIfNeed(data) });
        return TransformUtil.toClass(TarotSpread, item);
    }

    public async tarotSpreadEdit(data: ITarotSpreadEditDto): Promise<void> {
        return this.call<void, ITarotSpreadEditDto>(`${TAROT_SPREAD_URL}/${data.uid}`, { method: 'put', data: TraceUtil.addIfNeed(data) });
    }

    public async tarotSpreadList(data: ITarotSpreadListDto): Promise<ITarotSpreadListDtoResponse> {
        let item = await this.call<ITarotSpreadListDtoResponse, ITarotSpreadListDto>(`${TAROT_SPREAD_URL}`, { data: TraceUtil.addIfNeed(data) });
        item.items = TransformUtil.toClassMany(TarotSpread, item.items);
        // item.items.forEach(this.tarotSpreadMeaningSpreadSet);
        return item;
    }

    public async tarotSpreadDay(data: ITarotSpreadDateDto): Promise<ITarotSpreadDtoResponse> {
        return this.call<ITarotSpreadDtoResponse, ITarotSpreadDateDto>(`${TAROT_SPREAD_DAY_URL}`, { method: 'post', data: TraceUtil.addIfNeed(data) });
    }

    // --------------------------------------------------------------------------
    //
    //  Tarot Spread Meaning Methods
    //
    // --------------------------------------------------------------------------

    public async tarotSpreadMeaningGet(id: number): Promise<ITarotSpreadMeaningDtoResponse> {
        let item = await this.call<ITarotSpreadMeaningDtoResponse, void>(`${TAROT_SPREAD_MEANING_URL}/${id}`);
        return TransformUtil.toClass(TarotSpreadMeaning, item);
    }

    public async tarotSpreadMeaningAdd(data: ITarotSpreadMeaningAddDto): Promise<ITarotSpreadMeaningAddDtoResponse> {
        let item = await this.call<ITarotSpreadMeaningAddDtoResponse, ITarotSpreadMeaningAddDto>(`${TAROT_SPREAD_MEANING_URL}`, { method: 'post', data: TraceUtil.addIfNeed(data) });
        return TransformUtil.toClass(TarotSpreadMeaning, item);
    }

    public async tarotSpreadMeaningIsCanAdd(): Promise<void> {
        return this.call<void, void>(`${TAROT_SPREAD_MEANING_URL}/check`);
    }

    public async tarotSpreadMeaningEdit(data: ITarotSpreadMeaningEditDto): Promise<ITarotSpreadMeaningEditDtoResponse> {
        let item = await this.call<ITarotSpreadMeaningEditDtoResponse, ITarotSpreadMeaningEditDto>(`${TAROT_SPREAD_MEANING_URL}/${data.id}`, { method: 'put', data: TraceUtil.addIfNeed(data) });
        return TransformUtil.toClass(TarotSpreadMeaning, item);
    }

    public async tarotSpreadMeaningAwait(id: number): Promise<TarotSpreadMeaning> {
        let item = await this.call(`${TAROT_SPREAD_MEANING_URL}/${id}/awaitMean`, { method: 'put' });
        return TransformUtil.toClass(TarotSpreadMeaning, item);
    }

    public async tarotSpreadMeaningApprove(data: ITarotSpreadMeaningApproveDto): Promise<ITarotSpreadMeaningApproveDtoResponse> {
        let item = await this.call<ITarotSpreadMeaningApproveDtoResponse, ITarotSpreadMeaningApproveDto>(`${TAROT_SPREAD_MEANING_URL}/${data.id}/approve`, { method: 'put', data: TraceUtil.addIfNeed(data) });
        return TransformUtil.toClass(TarotSpreadMeaning, item);
    }

    public async tarotSpreadMeaningReject(data: ITarotSpreadMeaningRejectDto): Promise<ITarotSpreadMeaningRejectDtoResponse> {
        let item = await this.call<ITarotSpreadMeaningRejectDtoResponse, ITarotSpreadMeaningRejectDto>(`${TAROT_SPREAD_MEANING_URL}/${data.id}/reject`, { method: 'put', data: TraceUtil.addIfNeed(data) });
        return TransformUtil.toClass(TarotSpreadMeaning, item);
    }

    public async tarotSpreadMeaningMean(id: number): Promise<ITarotSpreadMeaningDtoResponse> {
        let item = await this.call<ITarotSpreadMeaningDtoResponse, void>(`${TAROT_SPREAD_MEANING_URL}/${id}/mean`, { method: 'put' }, { timeout: 3 * DateUtil.MILLISECONDS_MINUTE });
        return TransformUtil.toClass(TarotSpreadMeaning, item);
    }

    public async tarotSpreadMeaningRemove(id: number): Promise<void> {
        return this.call<void, void>(`${TAROT_SPREAD_MEANING_URL}/${id}`, { method: 'delete' });
    }

    public async tarotSpreadMeaningRate(data: ITarotSpreadMeaningRateDto): Promise<ITarotSpreadMeaningRateDtoResponse> {
        let item = await this.call<ITarotSpreadMeaningRateDtoResponse, ITarotSpreadMeaningRateDto>(`${TAROT_SPREAD_MEANING_URL}/${data.id}/rate`, { method: 'put', data: TraceUtil.addIfNeed(data) });
        return TransformUtil.toClass(TarotSpreadMeaning, item);
    }

    public async tarotSpreadMeaningCancel(id: number): Promise<ITarotSpreadMeaningCancelDtoResponse> {
        let item = await this.call<ITarotSpreadMeaningCancelDtoResponse, void>(`${TAROT_SPREAD_MEANING_URL}/${id}/cancel`, { method: 'put' });
        return TransformUtil.toClass(TarotSpreadMeaning, item);
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

    public async managementTarotSpreadList(data: IManagementTarotSpreadListDto): Promise<ITarotSpreadListDtoResponse> {
        let item = await this.call<IManagementTarotSpreadListDtoResponse, IManagementTarotSpreadListDto>(`${MANAGEMENT_TAROT_SPREAD_URL}`, { data: TraceUtil.addIfNeed(data) });
        item.items = TransformUtil.toClassMany(TarotSpread, item.items);
        return item;
    }

    public async managementTarotSpreadMeaningList(data: IManagementTarotSpreadMeaningListDto): Promise<IManagementTarotSpreadMeaningListDtoResponse> {
        let item = await this.call<IManagementTarotSpreadMeaningListDtoResponse, IManagementTarotSpreadMeaningListDto>(`${MANAGEMENT_TAROT_SPREAD_MEANING_URL}`, { data: TraceUtil.addIfNeed(data) });
        item.items = TransformUtil.toClassMany(TarotSpreadMeaning, item.items);
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

    public async oauth(state: string): Promise<IOAuthPopUpDto> {
        return this.call<IOAuthPopUpDto>(`${OAUTH_URL}/${state}`, { data: TraceUtil.addIfNeed({}) });
    }

    public async locale(project: LocaleProject, locale: string, version?: string): Promise<any> {
        return this.call<any>(`${LOCALE_URL}/${project}/${locale}`, { data: { version } });
    }

    public async statistics(): Promise<IStatisticsGetDtoResponse> {
        return this.call<IStatisticsGetDtoResponse, void>(STATISTICS_URL);
    }

    public async clock(data: IClockDto): Promise<IClockDtoResponse> {
        let item = await this.call<IClockDtoResponse, IClockDto>(CLOCK_URL, { data: TraceUtil.addIfNeed(data) });
        item.date = new Date(item.date);
        item.sunset = new Date(item.sunset);
        item.sunrise = new Date(item.sunrise);
        item.moon.date = new Date(item.moon.date);
        return item;
    }

    public async peopleList(data: IPeopleListDto): Promise<IPeopleListDtoResponse> {
        let item = await this.call<IPeopleListDtoResponse, IPeopleListDto>(`${PEOPLE_URL}`, { data: TraceUtil.addIfNeed(data) });
        item.items = TransformUtil.toClassMany(User, item.items);
        return item;
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    //--------------------------------------------------------------------------

    public get oauthRedirectUrl(): string {
        return `${this.url}${OAUTH_URL}`;
    }

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
export const LOGOUT_OTHERS_URL = PREFIX_URL + 'logoutOthers';

export const OAUTH_URL = PREFIX_URL + 'oauth';
export const CLOCK_URL = PREFIX_URL + 'clock';
export const LOCALE_URL = PREFIX_URL + 'locale';
export const PEOPLE_URL = PREFIX_URL + 'people';
export const STATISTICS_URL = PREFIX_URL + 'statistics';

export const COMMENT_URL = PREFIX_URL + 'comment';

export const TAROT_SPREAD_URL = PREFIX_URL + 'tarot/spread';
export const TAROT_SPREAD_URL_ID = PREFIX_URL + 'tarot/spread-id';
export const TAROT_SPREAD_DAY_URL = PREFIX_URL + 'tarot/spread-day';
export const TAROT_SPREAD_MEANING_URL = PREFIX_URL + 'tarot/spread-meaning';

export const MANAGEMENT_USER_URL = PREFIX_URL + 'management/user';
export const MANAGEMENT_COMMENT_URL = PREFIX_URL + 'management/comment';
export const MANAGEMENT_TAROT_SPREAD_URL = PREFIX_URL + 'management/tarot/spread';
export const MANAGEMENT_TAROT_SPREAD_MEANING_URL = PREFIX_URL + 'management/tarot/spread-meaning';

export const USER_PICTURE_UPLOAD_URL = PREFIX_URL + 'user/picture/upload';
