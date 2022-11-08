import * as _ from "lodash";
import { UserPreferences } from "../user";

export class LoginUser {
    id: string;
    preferences: Partial<UserPreferences>;
}

export class VkUser extends LoginUser {
    constructor(item: any) {
        super();
        this.id = item.id;
        this.preferences = { name: `${item.first_name} ${item.last_name}`, picture: item.photo_200 }

        let isMale = null;
        let location = '';
        let birthday = null;
        let description = null;

        // Geo
        if (!_.isNil(item.country)) {
            location += `${item.country.title}`;
        }
        if (!_.isNil(item.city)) {
            location += `, ${item.city.title}`;
        }
        location = location.trim();

        // Sex
        if (!_.isNil(item.sex) && item.sex !== 0) {
            isMale = item.sex === 2;
        }

        // Birthday
        if (!_.isNil(item.bdate)) {
            let array = String(item.bdate).split('.');
            if (array.length === 3) {
                birthday = new Date(Number(array[2]), Number(array[1]) - 1, Number(array[0]));
            }
            else if (array.length === 2) {
                birthday = new Date(1900, Number(array[1]) - 1, Number(array[0]));
            }
        }

        // Description
        if (!_.isNil(item.about)) {
            description = item.about;
        }
        else if (!_.isNil(item.status)) {
            description = item.status;
        }

        if (!_.isEmpty(isMale)) {
            this.preferences.isMale = isMale;
        }
        if (!_.isEmpty(birthday)) {
            this.preferences.birthday = birthday;
        }
        if (!_.isEmpty(location)) {
            this.preferences.location = location;
        }
        if (!_.isEmpty(description)) {
            this.preferences.description = description;
        }
    }
}

export class GoUser extends LoginUser {
    constructor(item: any) {
        super();
        this.id = item.sub;
        this.preferences = {
            name: item.name,
            email: item.email,
            locale: item.locale,
            picture: item.picture,
        }
    }
}

export class VkInternalUser extends LoginUser {
    params: string;
}