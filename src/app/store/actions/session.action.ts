import { Action } from '@ngrx/store';

export const SETDATAUSER = '[Session User] SetDataUser';

export class SetDataUser implements Action{
    readonly type = SETDATAUSER;
    constructor(public payload: object){}
}

export type actions = SetDataUser;
