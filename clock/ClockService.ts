import { ILogger } from '@ts-core/common/logger';
import { TransportHttp } from '@ts-core/common/transport/http';
import { DateUtil } from '@ts-core/common/util';
import * as _ from 'lodash';
import { IGeo } from '../geo';

export class ClockService extends TransportHttp {
    //--------------------------------------------------------------------------
    //
    // 	Static Methods
    //
    //--------------------------------------------------------------------------

    private static toCamelCase(item: any, fields: Array<string>): void {
        for (let field of fields) {
            item[_.camelCase(field)] = item[field];
            delete item[field];
        }
    }

    public static formatDate(date: Date): string {
        let month = (date.getMonth() + 1).toString();
        let day = date.getDate().toString();
        let year = date.getFullYear().toString();
        if (month.length < 2) {
            month = '0' + month;
        }
        if (day.length < 2) {
            day = '0' + day;
        }
        return [year, month, day].join('-');
    }

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(logger: ILogger) {
        super(logger, { method: 'get', headers: {}, isHandleError: false, isHandleLoading: false });
        this.url = `https://api.sunrise-sunset.org/`;
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    //--------------------------------------------------------------------------

    public async get(geo: IGeo, date: Date): Promise<IClockDetails> {
        let data = {} as any;

        data.lat = geo.latitude;
        data.lng = geo.longitude;
        data.date = ClockService.formatDate(date);
        data.formatted = 0;

        let item = await this.call(`json`, { data });
        ClockService.toCamelCase(item.results, [
            'solar_noon',
            'day_length',
            'civil_twilight_begin',
            'civil_twilight_end',
            'nautical_twilight_begin',
            'nautical_twilight_end',
            'astronomical_twilight_begin',
            'astronomical_twilight_end'
        ]);
        item = item.results;
        if (!_.isNil(item.sunrise)) {
            item.sunrise = new Date(item.sunrise);
        }
        if (!_.isNil(item.sunset)) {
            item.sunset = new Date(item.sunset);
        }
        if (!_.isNil(item.solarNoon)) {
            item.solarNoon = new Date(item.solarNoon);
        }
        if (!_.isNil(item.civilTwilightBegin)) {
            item.civilTwilightBegin = new Date(item.civilTwilightBegin);
        }
        if (!_.isNil(item.civilTwilightEnd)) {
            item.civilTwilightEnd = new Date(item.civilTwilightEnd);
        }
        if (!_.isNil(item.nauticalTwilightBegin)) {
            item.nauticalTwilightBegin = new Date(item.nauticalTwilightBegin);
        }
        if (!_.isNil(item.nauticalTwilightEnd)) {
            item.nauticalTwilightEnd = new Date(item.nauticalTwilightEnd);
        }
        if (!_.isNil(item.astronomicalTwilightBegin)) {
            item.astronomicalTwilightBegin = new Date(item.astronomicalTwilightBegin);
        }
        if (!_.isNil(item.astronomicalTwilightEnd)) {
            item.astronomicalTwilightEnd = new Date(item.astronomicalTwilightEnd);
        }
        if (!_.isNil(item.dayLength)) {
            item.dayLength = item.dayLength * DateUtil.MILISECONDS_SECOND;
        }
        return item;
    }
}

export interface IClockDetails {
    sunset: Date;
    sunrise: Date;
    solarNoon: Date;
    dayLength: number;
    civilTwilightEnd: Date;
    civilTwilightBegin: Date;
    nauticalTwilightEnd: Date;
    nauticalTwilightBegin: Date;
    astronomicalTwilightEnd: Date;
    astronomicalTwilightBegin: Date;
}
