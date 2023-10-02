import * as _ from 'lodash';
import { TarotSpread, TarotSpreadMeaning, TarotSpreadMeaningStatus, TarotSpreadPrivacy, TarotSpreadStatus } from '../tarot';
import { Comment } from '../comment';
import { User, UserAccountType } from '../user';
import { IUserEditDto } from '../api/user';

export class PermissionUtil {

    //--------------------------------------------------------------------------
    //
    // 	User Methods
    //
    //--------------------------------------------------------------------------

    public static userIsCanEdit(item: User, user: User, params?: IUserEditDto): boolean {
        if (_.isNil(user)) {
            return false;
        }
        if (PermissionUtil.userIsAdministrator(user)) {
            return true;
        }
        if (!_.isNil(params) && (!_.isNil(params.account) || !_.isNil(params.status) || !_.isNil(params.master))) {
            return false;
        }
        return item.id === user.id;
    }

    public static userIsCanCoinAccountsGet(item: User, user: User): boolean {
        if (_.isNil(user)) {
            return false;
        }
        if (PermissionUtil.userIsAdministrator(user)) {
            return true;
        }
        return item.id === user.id;
    }

    public static userIsMaster(item: User): boolean {
        if (PermissionUtil.userIsAdministrator(item)) {
            return true;
        }
        return !_.isNil(item) ? item.account.type === UserAccountType.MASTER : false;
    }

    public static userIsAdministrator(item: User): boolean {
        return !_.isNil(item) ? item.account.type === UserAccountType.ADMINISTRATOR : false;
    }

    //--------------------------------------------------------------------------
    //
    // 	Tarot Spread Methods
    //
    //--------------------------------------------------------------------------

    public static spreadIsCanGet(item: TarotSpread, user: User): boolean {
        if (item.status === TarotSpreadStatus.REMOVED) {
            return PermissionUtil.userIsAdministrator(user);
        }
        if (item.privacy !== TarotSpreadPrivacy.PRIVATE) {
            return true;
        }
        return PermissionUtil.spreadIsCanEdit(item, user);
    }

    public static spreadIsCanEdit(item: TarotSpread, user: User): boolean {
        if (_.isNil(item) || _.isNil(user)) {
            return false;
        }
        return item.userId === user.id || PermissionUtil.userIsAdministrator(user);
    }

    public static spreadIsCanShare(item: TarotSpread): boolean {
        return item.privacy !== TarotSpreadPrivacy.PRIVATE;
    }

    public static spreadIsCanRemove(item: TarotSpread, user: User): boolean {
        return PermissionUtil.spreadIsCanEdit(item, user);
    }

    //--------------------------------------------------------------------------
    //
    // 	Tarot Spread Meaning
    //
    //--------------------------------------------------------------------------

    public static spreadMeaningIsCanAdd(item: TarotSpread, user: User): boolean {
        if (!PermissionUtil.spreadIsCanEdit(item, user)) {
            return false;
        }
        if (item.privacy === TarotSpreadPrivacy.PRIVATE) {
            return false;
        }
        if (!_.isNil(item.meaning) && item.meaning.status !== TarotSpreadMeaningStatus.CANCELED) {
            return false;
        }
        return true;
    }

    public static spreadMeaningIsCanMean(item: TarotSpreadMeaning, user: User): boolean {
        if (_.isNil(item) || !PermissionUtil.userIsAdministrator(user)) {
            return false;
        }
        return item.status === TarotSpreadMeaningStatus.ERROR || item.status === TarotSpreadMeaningStatus.PREPARED;
    }

    public static spreadMeaningIsCanAwaitMean(item: TarotSpreadMeaning, user: User): boolean {
        if (_.isNil(item) || !PermissionUtil.userIsAdministrator(user)) {
            return false;
        }
        return item.status === TarotSpreadMeaningStatus.PENDING || item.status === TarotSpreadMeaningStatus.ERROR || item.status === TarotSpreadMeaningStatus.IN_PROGRESS;
    }

    public static spreadMeaningIsCanApprove(item: TarotSpreadMeaning, user: User): boolean {
        if (_.isNil(item) || !PermissionUtil.userIsAdministrator(user)) {
            return false;
        }
        return item.status === TarotSpreadMeaningStatus.PREPARED;
    }

    public static spreadMeaningIsCanReject(item: TarotSpreadMeaning, user: User): boolean {
        if (_.isNil(item) || !PermissionUtil.userIsAdministrator(user)) {
            return false;
        }
        return item.status === TarotSpreadMeaningStatus.PENDING || item.status === TarotSpreadMeaningStatus.AWAITING_MEAN || item.status === TarotSpreadMeaningStatus.PREPARED;
    }

    public static spreadMeaningIsCanRate(item: TarotSpreadMeaning, user: User): boolean {
        if (_.isNil(item) || _.isNil(item.spread) || _.isNil(user)) {
            return false;
        }
        return item.status === TarotSpreadMeaningStatus.APPROVED && item.spread.userId === user.id;
    }

    public static spreadMeaningIsCanCancel(item: TarotSpreadMeaning, user: User): boolean {
        if (_.isNil(item) || _.isNil(item.spread) || _.isNil(user)) {
            return false;
        }
        return item.status === TarotSpreadMeaningStatus.PENDING && item.spread.userId === user.id;
    }

    //--------------------------------------------------------------------------
    //
    // 	Comment Methods
    //
    //--------------------------------------------------------------------------

    public static commentIsCanEdit(item: Comment, user: User): boolean {
        if (_.isNil(user)) {
            return false;
        }
        return PermissionUtil.userIsAdministrator(user) || item.userId === user.id;
    }

    public static commentIsCanRemove(item: Comment, user: User): boolean {
        return PermissionUtil.commentIsCanEdit(item, user);
    }
}
