import moment, { Moment, MomentSetObject } from 'moment';

export interface ITimeRange {
    start: Moment;
    finish: Moment;
}
export class TimeRange implements ITimeRange {
    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(public start: Moment, public finish: Moment) { }
}

export class DayTimeRange extends TimeRange {
    //--------------------------------------------------------------------------
    //
    // 	Static Methods
    //
    //--------------------------------------------------------------------------

    public static isBetween(date: MomentSetObject | Date, range: ITimeRange): boolean {
        let item = moment(date);
        let start = range.start.clone();
        let finish = range.finish.clone();

        let startDayOfYear = start.dayOfYear();
        let itemDayOfYear = item.dayOfYear();
        let finishDayOfYear = finish.dayOfYear();

        if (finish.isBefore(start)) {
            return itemDayOfYear <= finishDayOfYear || itemDayOfYear >= startDayOfYear;
        }
        return itemDayOfYear >= startDayOfYear && itemDayOfYear <= finishDayOfYear;
    }

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(startSet: MomentSetObject, finishSet: MomentSetObject) {
        super(moment().set(startSet).startOf('day'), moment().set(finishSet).endOf('day'));
    }
}
