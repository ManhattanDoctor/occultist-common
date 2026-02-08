import { TransportHttp, ITransportHttpSettings, LoggerLevel, DateUtil, ExtendedError } from '@ts-core/common';
import { ILogger, TransformUtil, ITraceable, TraceUtil } from '@ts-core/common';
import * as _ from 'lodash';
import { IClockDto, IClockDtoResponse } from './clock';
import { IInitDto, IInitDtoResponse, ILoginDto, ILoginDtoResponse } from './login';
import { User } from '../user';
import { ITarotSpreadMeaningAddDto, ITarotSpreadMeaningEditDto, ITarotSpreadMeaningEditDtoResponse, ITarotSpreadAddDto, ITarotSpreadListDto, ITarotSpreadListDtoResponse, ITarotSpreadAddDtoResponse, ITarotSpreadDateDto, ITarotSpreadDtoResponse, ITarotSpreadEditDto, ITarotSpreadMeaningAddDtoResponse, ITarotSpreadMeaningRejectDto, ITarotSpreadMeaningRejectDtoResponse, ITarotSpreadMeaningRateDto, ITarotSpreadMeaningRateDtoResponse, ITarotSpreadMeaningApproveDto, ITarotSpreadMeaningApproveDtoResponse, ITarotSpreadMeaningDtoResponse, ITarotSpreadMeaningPriceDto, ITarotSpreadMeaningPriceDtoResponse, ITarotSpreadMeaningCancelDtoResponse, ITarotSpreadMeaningIsCanAddDto, ITarotSpreadShowcaseDto, ITarotSpreadShowcaseDtoResponse, TAROT_SPREAD_MEANING_TIMEOUT, ITarotSpreadMeaningAiDtoResponse, ITarotSpreadMeaningAiAddDto, ITarotSpreadMeaningAiAddDtoResponse, ITarotSpreadMeaningConversationMessageAddDto, ITarotSpreadMeaningConversationMessageAddDtoResponse, ITarotSpreadMeaningConversationMessageListDtoResponse, ITarotSpreadMeaningAiConversationDtoResponse, ITarotSpreadMeaningAiIsCanAddDto } from './tarot/spread';
import { AiConversationMessage } from '../ai';
import { IGeo } from '../geo';
import { ICommentAddDto, ICommentAddDtoResponse, ICommentEditDto, ICommentEditDtoResponse, ICommentGetDtoResponse, ICommentListDto, ICommentListDtoResponse, ICommentRemoveDtoResponse } from './comment';
import { Comment } from '../comment';
import { TarotSpread, TarotSpreadMeaning, TarotSpreadMeaningAi, TarotSpreadUID } from '../tarot';
import { IPeopleListDto, IPeopleListDtoResponse } from './people';
import { IManagementCoinAccountListDto, IManagementCoinAccountListDtoResponse, IManagementTarotSpreadListDto, IManagementTarotSpreadListDtoResponse, IManagementTarotSpreadMeaningAiListDto, IManagementTarotSpreadMeaningAiListDtoResponse, IManagementTarotSpreadMeaningListDto, IManagementTarotSpreadMeaningListDtoResponse } from './management';
import { IUserEditDto, IUserEditDtoResponse, IUserGetDtoResponse, IUserListDto, IUserListDtoResponse, IUserMasterListDto, IUserMasterListDtoResponse, UserUID } from './user';
import { IStatisticsGetDtoResponse } from './statistics';
import { IOAuthPopUpDto } from '@ts-core/oauth';
import { CoinBonusDto, CoinStatusGetDtoResponse, ICoinAccountsGetDto, ICoinBalanceEditDto, ICoinStatusGetDto } from './coin';
import { IPaymentListDto, IPaymentListDtoResponse, IPaymentTransactionListDto, IPaymentTransactionListDtoResponse } from './payment';
import { Payment, PaymentTransaction } from '../payment';
import { CoinAccount } from '../coin';
import { IVkDonatersCheckDto, IVkDonatersCheckDtoResponse } from './vk';
import { ITelegramAccountAddDto, ITelegramAccountAddDtoResponse, ITelegramAccountRemoveDtoResponse } from './telegram';

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
        item.bonus = TransformUtil.toClass(CoinBonusDto, item.bonus);
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

    public async tarotSpreadRecover(uid: TarotSpreadUID): Promise<void> {
        return this.call<void, void>(`${TAROT_SPREAD_URL}/${uid}`, { method: 'patch' });
    }

    public async tarotSpreadAdd(data: ITarotSpreadAddDto): Promise<ITarotSpreadAddDtoResponse> {
        let item = await this.call<ITarotSpreadAddDtoResponse, ITarotSpreadAddDto>(`${TAROT_SPREAD_URL}`, { method: 'post', data: TraceUtil.addIfNeed(data) });
        return TransformUtil.toClass(TarotSpread, item);
    }

    public async tarotSpreadEdit(data: ITarotSpreadEditDto): Promise<void> {
        return this.call<void, ITarotSpreadEditDto>(`${TAROT_SPREAD_URL}/${data.uid}`, { method: 'put', data: TraceUtil.addIfNeed(data) });
    }

    public async tarotSpreadDay(data: ITarotSpreadDateDto): Promise<ITarotSpreadDtoResponse> {
        let item = await this.call<ITarotSpreadDtoResponse, ITarotSpreadDateDto>(`${TAROT_SPREAD_DAY_URL}`, { method: 'post', data: TraceUtil.addIfNeed(data) });
        return TransformUtil.toClass(TarotSpread, item);
    }

    public async tarotSpreadList(data: ITarotSpreadListDto): Promise<ITarotSpreadListDtoResponse> {
        let item = await this.call<ITarotSpreadListDtoResponse, ITarotSpreadListDto>(`${TAROT_SPREAD_URL}`, { data: TraceUtil.addIfNeed(data) });
        item.items = TransformUtil.toClassMany(TarotSpread, item.items);
        return item;
    }

    public async tarotSpreadShowcaseGet(showcase: string): Promise<ITarotSpreadDtoResponse> {
        let item = await this.call<ITarotSpreadDtoResponse, void>(`${TAROT_SPREAD_SHOWCASE_URL}/${showcase}`);
        return this.tarotSpreadMeaningSpreadSet(TransformUtil.toClass(TarotSpread, item));
    }

    public async tarotSpreadShowcaseSet(data: ITarotSpreadShowcaseDto): Promise<ITarotSpreadShowcaseDtoResponse> {
        let item = await this.call<ITarotSpreadShowcaseDtoResponse, ITarotSpreadShowcaseDto>(`${TAROT_SPREAD_SHOWCASE_URL}`, { method: 'post', data: TraceUtil.addIfNeed(data) });
        return TransformUtil.toClass(TarotSpread, item);
    }

    public async tarotSpreadShowcaseList(data: ITarotSpreadListDto): Promise<ITarotSpreadListDtoResponse> {
        let item = await this.call<ITarotSpreadListDtoResponse, ITarotSpreadListDto>(`${TAROT_SPREAD_SHOWCASE_URL}`, { data: TraceUtil.addIfNeed(data) });
        item.items = TransformUtil.toClassMany(TarotSpread, item.items);
        return item;
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
        item.meaning = TransformUtil.toClass(TarotSpreadMeaning, item);
        return item;
    }

    public async tarotSpreadMeaningIsCanAdd(data?: ITarotSpreadMeaningIsCanAddDto): Promise<void> {
        return this.call<void, ITarotSpreadMeaningIsCanAddDto>(`${TAROT_SPREAD_MEANING_URL}/isCanAdd`, { data: TraceUtil.addIfNeed(data) });
    }

    public async tarotSpreadMeaningEdit(data: ITarotSpreadMeaningEditDto): Promise<ITarotSpreadMeaningEditDtoResponse> {
        let item = await this.call<ITarotSpreadMeaningEditDtoResponse, ITarotSpreadMeaningEditDto>(`${TAROT_SPREAD_MEANING_URL}/${data.id}`, { method: 'put', data: TraceUtil.addIfNeed(data) });
        return TransformUtil.toClass(TarotSpreadMeaning, item);
    }

    public async tarotSpreadMeaningPrice(data: ITarotSpreadMeaningPriceDto): Promise<ITarotSpreadMeaningPriceDtoResponse> {
        return this.call(`${TAROT_SPREAD_MEANING_URL}/${data.uid}/price`, { data: TraceUtil.addIfNeed(data) });
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

    public async tarotSpreadMeaningMean(id: number, isHandleError: boolean = true): Promise<ITarotSpreadMeaningDtoResponse> {
        let item = await this.call<ITarotSpreadMeaningDtoResponse, void>(`${TAROT_SPREAD_MEANING_URL}/${id}/mean`, { method: 'put', isHandleError }, { timeout: TAROT_SPREAD_MEANING_TIMEOUT });
        return TransformUtil.toClass(TarotSpreadMeaning, item);
    }

    public async tarotSpreadMeaningRemove(id: number): Promise<ITarotSpreadMeaningDtoResponse> {
        return this.call<ITarotSpreadMeaningDtoResponse, void>(`${TAROT_SPREAD_MEANING_URL}/${id}`, { method: 'delete' });
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
    //  Tarot Spread Meaning Ai Methods
    //
    // --------------------------------------------------------------------------

    public async tarotSpreadMeaningAiGet(id: number): Promise<ITarotSpreadMeaningAiDtoResponse> {
        let item = await this.call<ITarotSpreadMeaningAiDtoResponse, void>(`${TAROT_SPREAD_MEANING_AI_URL}/${id}`);
        return TransformUtil.toClass(TarotSpreadMeaningAi, item);
    }

    public async tarotSpreadMeaningAiAdd(data: ITarotSpreadMeaningAiAddDto): Promise<ITarotSpreadMeaningAiAddDtoResponse> {
        let item = await this.call<ITarotSpreadMeaningAiAddDtoResponse, ITarotSpreadMeaningAiAddDto>(`${TAROT_SPREAD_MEANING_AI_URL}`, { method: 'post', data: TraceUtil.addIfNeed(data) });
        return TransformUtil.toClass(TarotSpreadMeaningAi, item);
    }

    public async tarotSpreadMeaningAiPrice(data: ITarotSpreadMeaningPriceDto): Promise<ITarotSpreadMeaningPriceDtoResponse> {
        return this.call(`${TAROT_SPREAD_MEANING_AI_URL}/${data.uid}/price`, { data: TraceUtil.addIfNeed(data) });
    }

    public async tarotSpreadMeaningAiIsCanAdd(data?: ITarotSpreadMeaningAiIsCanAddDto): Promise<void> {
        return this.call<void, ITarotSpreadMeaningAiIsCanAddDto>(`${TAROT_SPREAD_MEANING_AI_URL}/isCanAdd`, { data: TraceUtil.addIfNeed(data) });
    }

    public async tarotSpreadMeaningAiRemove(id: number): Promise<ITarotSpreadMeaningAiDtoResponse> {
        return this.call<ITarotSpreadMeaningAiDtoResponse, void>(`${TAROT_SPREAD_MEANING_AI_URL}/${id}`, { method: 'delete' });
    }

    // --------------------------------------------------------------------------
    //
    //  Tarot Spread Meaning Conversation Methods
    //
    // --------------------------------------------------------------------------

    public async tarotSpreadMeaningConversationMessageAdd(id: number, text: string): Promise<ITarotSpreadMeaningConversationMessageAddDtoResponse> {
        let item = await this.call<ITarotSpreadMeaningConversationMessageAddDtoResponse, ITarotSpreadMeaningConversationMessageAddDto>(`${TAROT_SPREAD_MEANING_URL}/${id}/conversation/message`, { method: 'post', data: TraceUtil.addIfNeed({ id, text }) });
        return TransformUtil.toClass(AiConversationMessage, item);
    }

    public async tarotSpreadMeaningConversationMessageList(id: number): Promise<ITarotSpreadMeaningConversationMessageListDtoResponse> {
        let item = await this.call<ITarotSpreadMeaningConversationMessageListDtoResponse>(`${TAROT_SPREAD_MEANING_URL}/${id}/conversation/message`);
        return TransformUtil.toClassMany(AiConversationMessage, item);
    }

    public async tarotSpreadMeaningConversationGet(id: number): Promise<ITarotSpreadMeaningAiConversationDtoResponse> {
        return this.call<ITarotSpreadMeaningAiConversationDtoResponse, void>(`${TAROT_SPREAD_MEANING_URL}/${id}/conversation`);
    }

    // --------------------------------------------------------------------------
    //
    //  Tarot Spread Meaning Ai Conversation Methods
    //
    // --------------------------------------------------------------------------

    public async tarotSpreadMeaningAiConversationGet(id: number): Promise<ITarotSpreadMeaningAiConversationDtoResponse> {
        return this.call<ITarotSpreadMeaningAiConversationDtoResponse>(`${TAROT_SPREAD_MEANING_AI_URL}/${id}/conversation`);
    }

    public async tarotSpreadMeaningAiConversationMessageAdd(id: number, text: string): Promise<ITarotSpreadMeaningConversationMessageAddDtoResponse> {
        let item = await this.call<ITarotSpreadMeaningConversationMessageAddDtoResponse, ITarotSpreadMeaningConversationMessageAddDto>(`${TAROT_SPREAD_MEANING_AI_URL}/${id}/conversation/message`, { method: 'post', data: TraceUtil.addIfNeed({ id, text }) });
        return TransformUtil.toClass(AiConversationMessage, item);
    }

    public async tarotSpreadMeaningAiConversationMessageList(id: number): Promise<ITarotSpreadMeaningConversationMessageListDtoResponse> {
        let item = await this.call<ITarotSpreadMeaningConversationMessageListDtoResponse>(`${TAROT_SPREAD_MEANING_AI_URL}/${id}/conversation/message`);
        return TransformUtil.toClassMany(AiConversationMessage, item);
    }

    // --------------------------------------------------------------------------
    //
    //  User Methods
    //
    // --------------------------------------------------------------------------

    public async userGet(uid: UserUID): Promise<IUserGetDtoResponse> {
        let item = await this.call<IUserGetDtoResponse>(`${USER_URL}/${uid}`);
        return TransformUtil.toClass(User, item);
    }

    public async userEdit(data: IUserEditDto): Promise<IUserEditDtoResponse> {
        let item = await this.call<IUserEditDtoResponse, IUserEditDto>(`${USER_URL}/${data.uid}`, { method: 'put', data: TraceUtil.addIfNeed(data) });
        return TransformUtil.toClass(User, item);
    }

    public async userTarotSpreadList(data: ITarotSpreadListDto): Promise<ITarotSpreadListDtoResponse> {
        if (_.isNil(data.conditions) || !_.isNumber(data.conditions.userId)) {
            throw new ExtendedError(`Conditions "userId" must be number`);
        }
        let item = await this.call<ITarotSpreadListDtoResponse, ITarotSpreadListDto>(`${USER_URL}/${data.conditions.userId}/tarot/spread`, { data: TraceUtil.addIfNeed(data) });
        item.items = TransformUtil.toClassMany(TarotSpread, item.items);
        return item;
    }

    public async userMasterList(data?: IUserMasterListDto): Promise<IUserMasterListDtoResponse> {
        let items = await this.call<IUserMasterListDtoResponse, IUserMasterListDto>(`${USER_URL}`, { data: TraceUtil.addIfNeed(data) });
        return TransformUtil.toClassMany(User, items);
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
    // 	Coin Methods
    //
    //--------------------------------------------------------------------------

    public async coinStatusGet(data?: ICoinStatusGetDto): Promise<CoinStatusGetDtoResponse> {
        let item = await this.call<CoinStatusGetDtoResponse>(`${COIN_URL}/status`, { data: TraceUtil.addIfNeed(data) });
        return TransformUtil.toClass(CoinStatusGetDtoResponse, item);
    }

    public async coinAccountsGet(uid: UserUID): Promise<ICoinAccountsGetDto> {
        return this.call<ICoinAccountsGetDto>(`${COIN_URL}/${uid}/accounts`);
    }

    public async coinBalanceEdit(data: ICoinBalanceEditDto): Promise<void> {
        return this.call<void, ICoinBalanceEditDto>(`${COIN_URL}/balance`, { data: TraceUtil.addIfNeed(data), method: 'post' });
    }

    //--------------------------------------------------------------------------
    //
    // 	Payment Methods
    //
    //--------------------------------------------------------------------------

    public async paymentList(data?: IPaymentListDto): Promise<IPaymentListDtoResponse> {
        let item = await this.call<IPaymentListDtoResponse, IPaymentListDto>(PAYMENT_URL, { data: TraceUtil.addIfNeed(data) });
        item.items = TransformUtil.toClassMany(Payment, item.items);
        return item;
    }

    public async paymentTransactionList(data?: IPaymentTransactionListDto): Promise<IPaymentTransactionListDtoResponse> {
        let item = await this.call<IPaymentTransactionListDtoResponse, IPaymentTransactionListDto>(PAYMENT_TRANSACTION_URL, { data: TraceUtil.addIfNeed(data) });
        item.items = TransformUtil.toClassMany(PaymentTransaction, item.items);
        return item;
    }

    //--------------------------------------------------------------------------
    //
    // 	Telegram Methods
    //
    //--------------------------------------------------------------------------

    public async telegramAccountAdd(data: ITelegramAccountAddDto): Promise<ITelegramAccountAddDtoResponse> {
        return this.call<ITelegramAccountAddDtoResponse, ITelegramAccountAddDto>(`${TELEGRAM_URL}`, { method: 'post', data: TraceUtil.addIfNeed(data) });
    }

    public async telegramAccountRemove(): Promise<ITelegramAccountRemoveDtoResponse> {
        return this.call<ITelegramAccountRemoveDtoResponse, void>(`${TELEGRAM_URL}`, { method: 'delete' });
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

    public async managementCoinAccountList(data?: IManagementCoinAccountListDto): Promise<IManagementCoinAccountListDtoResponse> {
        let item = await this.call<IManagementCoinAccountListDtoResponse, IManagementCoinAccountListDto>(MANAGEMENT_COIN_ACCOUNT_URL, { data: TraceUtil.addIfNeed(data) });
        item.items = TransformUtil.toClassMany(CoinAccount, item.items);
        return item;
    }

    public async managementCommentList(data?: ICommentListDto): Promise<ICommentListDtoResponse> {
        let item = await this.call<ICommentListDtoResponse, ICommentListDto>(MANAGEMENT_COMMENT_URL, { data: TraceUtil.addIfNeed(data) });
        item.items = TransformUtil.toClassMany(Comment, item.items);
        return item;
    }

    public async managementPaymentList(data?: IPaymentListDto): Promise<IPaymentListDtoResponse> {
        let item = await this.call<IPaymentListDtoResponse, IPaymentListDto>(MANAGEMENT_PAYMENT_URL, { data: TraceUtil.addIfNeed(data) });
        item.items = TransformUtil.toClassMany(Payment, item.items);
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

    public async managementTarotSpreadMeaningAiList(data: IManagementTarotSpreadMeaningAiListDto): Promise<IManagementTarotSpreadMeaningAiListDtoResponse> {
        let item = await this.call<IManagementTarotSpreadMeaningAiListDtoResponse, IManagementTarotSpreadMeaningAiListDto>(`${MANAGEMENT_TAROT_SPREAD_MEANING_AI_URL}`, { data: TraceUtil.addIfNeed(data) });
        item.items = TransformUtil.toClassMany(TarotSpreadMeaningAi, item.items);
        return item;
    }

    // --------------------------------------------------------------------------
    //
    //  Vk Methods
    //
    // --------------------------------------------------------------------------

    public async vkDonatersCheck(token: string): Promise<IVkDonatersCheckDtoResponse> {
        return this.call<IVkDonatersCheckDtoResponse, IVkDonatersCheckDto>(`${VK_URL}/donaters/check`, { method: 'post', data: TraceUtil.addIfNeed({ token }) });
    }

    // --------------------------------------------------------------------------
    //
    //  Other Methods
    //
    // --------------------------------------------------------------------------

    public async geo(): Promise<IGeo> {
        return this.call<IGeo, void>(GEO_URL);
    }

    public async clock(data: IClockDto): Promise<IClockDtoResponse> {
        let item = await this.call<IClockDtoResponse, IClockDto>(CLOCK_URL, { data: TraceUtil.addIfNeed(data) });
        item.date = new Date(item.date);
        item.sunset = new Date(item.sunset);
        item.sunrise = new Date(item.sunrise);
        item.moon.date = new Date(item.moon.date);
        return item;
    }

    public async oauth(state: string): Promise<IOAuthPopUpDto> {
        return this.call<IOAuthPopUpDto>(`${OAUTH_URL}/${state}`, { data: TraceUtil.addIfNeed({}) });
    }

    public async language(project: string, locale: string, version?: string): Promise<any> {
        return this.call<any>(`${LANGUAGE_URL}/${project}/${locale}`, { data: { version } });
    }

    public async statistics(): Promise<IStatisticsGetDtoResponse> {
        return this.call<IStatisticsGetDtoResponse, void>(STATISTICS_URL);
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

    public set sid(value: string) {
        if (!_.isNil(this.headers)) {
            this.headers.Authorization = `Bearer ${value}`;
        }
    }

    public get oauthRedirectUrl(): string {
        return `${this.url}${OAUTH_URL}`;
    }
}

export const PREFIX_URL = 'api/';
export const VK_URL = PREFIX_URL + 'vk';
export const GEO_URL = PREFIX_URL + 'geo';
export const USER_URL = PREFIX_URL + 'user';
export const INIT_URL = PREFIX_URL + 'init';
export const LOGIN_URL = PREFIX_URL + 'login';
export const LOGOUT_URL = PREFIX_URL + 'logout';
export const LOGOUT_OTHERS_URL = PREFIX_URL + 'logoutOthers';

export const OAUTH_URL = PREFIX_URL + 'oauth';
export const CLOCK_URL = PREFIX_URL + 'clock';
export const PEOPLE_URL = PREFIX_URL + 'people';
export const LANGUAGE_URL = PREFIX_URL + 'locale';
export const STATISTICS_URL = PREFIX_URL + 'statistics';

export const COIN_URL = PREFIX_URL + 'coin';
export const VOICE_URL = PREFIX_URL + 'voice';
export const COMMENT_URL = PREFIX_URL + 'comment';
export const PAYMENT_URL = PREFIX_URL + 'payment';
export const TELEGRAM_URL = PREFIX_URL + 'telegram';
export const PAYMENT_TRANSACTION_URL = PREFIX_URL + 'paymentTransaction';

export const TAROT_SPREAD_URL = PREFIX_URL + 'tarot/spread';
export const TAROT_SPREAD_URL_ID = PREFIX_URL + 'tarot/spread-id';
export const TAROT_SPREAD_DAY_URL = PREFIX_URL + 'tarot/spread-day';
export const TAROT_SPREAD_MEANING_URL = PREFIX_URL + 'tarot/spread-meaning';
export const TAROT_SPREAD_SHOWCASE_URL = PREFIX_URL + 'tarot/spread-showcase';
export const TAROT_SPREAD_MEANING_AI_URL = PREFIX_URL + 'tarot/spread-meaning-ai';

export const MANAGEMENT_USER_URL = PREFIX_URL + 'management/user';
export const MANAGEMENT_COMMENT_URL = PREFIX_URL + 'management/comment';
export const MANAGEMENT_PAYMENT_URL = PREFIX_URL + 'management/payment';
export const MANAGEMENT_COIN_ACCOUNT_URL = PREFIX_URL + 'management/coinAccount';
export const MANAGEMENT_TAROT_SPREAD_URL = PREFIX_URL + 'management/tarot/spread';
export const MANAGEMENT_TAROT_SPREAD_MEANING_URL = PREFIX_URL + 'management/tarot/spread-meaning';
export const MANAGEMENT_TAROT_SPREAD_MEANING_AI_URL = PREFIX_URL + 'management/tarot/spread-meaning-ai';

export const PAYMENT_ORDER_INIT_URL = PREFIX_URL + 'payment/selfwork';
export const PAYMENT_CALLBACK_URL = PREFIX_URL + 'payment/callback/moneta';
