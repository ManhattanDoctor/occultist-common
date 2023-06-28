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
        if (!_.isNil(params) && (!_.isNil(params.account) || !_.isNil(params.status))) {
            return false;
        }
        return item.id === user.id;
    }

    public static userIsAdministrator(item: User): boolean {
        return !_.isNil(item) ? item.account.type === UserAccountType.ADMINISTRATOR : false;
    }

    //--------------------------------------------------------------------------
    //
    // 	Spread Methods
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

    public static spreadIsCanAskMeaning(item: TarotSpread, user: User): boolean {
        if (PermissionUtil.spreadIsCanEdit(item, user)) {
            return false;
        }
        if (_.isNil(item.meaning)) {
            return true;
        }
        if (item.meaning.status === TarotSpreadMeaningStatus.IN_PROGRESS) {
            return false;
        }
        return PermissionUtil.userIsAdministrator(user);
    }

    public static spreadIsCanEdit(item: TarotSpread, user: User): boolean {
        if (_.isNil(user)) {
            return false;
        }
        return item.userId === user.id || PermissionUtil.userIsAdministrator(user);
    }

    public static spreadIsCanRemove(item: TarotSpread, user: User): boolean {
        return PermissionUtil.spreadIsCanEdit(item, user);
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
