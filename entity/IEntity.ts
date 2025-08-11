import { IDestroyable } from '@ts-core/common';
import * as _ from 'lodash';

export interface IEntity<T> {
    readonly name: T;
    readonly icon: string;
}

export class Entity<T = string> implements IEntity<T>, IDestroyable {
    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    public icon: string;

    protected _name: T;
    protected _links: Array<Entity>;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(name: T, icon?: string, links?: Array<Entity>) {
        this._name = name;

        this.icon = icon;
        if (!_.isEmpty(links)) {
            links.forEach(item => this.addLink(item));
        }
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    //--------------------------------------------------------------------------

    public addLink<T>(item: Entity<T>): void {
        if (!this.links.includes(item)) {
            this.links.push(item);
        }
        if (!item.links.includes(this)) {
            item.links.push(this);
        }
    }

    public addToItems<U extends Entity>(item: U, items: Array<U>): U {
        if (!items.includes(item)) {
            items.push(item);
        }
        item.links.push(this);
        return item;
    }

    public destroy(): void {
        this._links = null;
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    //--------------------------------------------------------------------------

    public get name(): T {
        return this._name;
    }

    public get links(): Array<Entity<any>> {
        if (_.isNil(this._links)) {
            this._links = new Array();
        }
        return this._links;
    }
}
