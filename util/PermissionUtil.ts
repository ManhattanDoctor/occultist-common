import * as _ from 'lodash';
import { TarotSpread, TarotSpreadPrivacy, TarotSpreadStatus } from '../tarot';
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
        if (user.account.type === UserAccountType.ADMINISTRATOR) {
            return true;
        }
        if (!_.isNil(params) && (!_.isNil(params.account) || !_.isNil(params.status))) {
            return false;
        }
        return item.id === user.id;
    }

    //--------------------------------------------------------------------------
    //
    // 	Spread Methods
    //
    //--------------------------------------------------------------------------

    public static spreadIsCanGet(item: TarotSpread, user: User): boolean {
        if (item.status === TarotSpreadStatus.REMOVED) {
            return !_.isNil(user) && user.account.type === UserAccountType.ADMINISTRATOR;
        }
        if (item.privacy !== TarotSpreadPrivacy.PRIVATE) {
            return true;
        }
        return PermissionUtil.spreadIsCanEdit(item, user);
    }

    public static spreadIsCanEdit(item: TarotSpread, user: User): boolean {
        if (_.isNil(user)) {
            return false;
        }
        return user.account.type === UserAccountType.ADMINISTRATOR || item.userId === user.id;
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
        return user.account.type === UserAccountType.ADMINISTRATOR || item.userId === user.id;
    }

    public static commentIsCanRemove(item: Comment, user: User): boolean {
        return PermissionUtil.commentIsCanEdit(item, user);
    }
}
