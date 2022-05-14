import { actions, SETDATAUSER } from '../actions/session.action';

export const initialState = {};

// tslint:disable-next-line: typedef
export function sessionReducer(state = initialState, action: actions){
    switch ( action.type){
        case SETDATAUSER:
            return state = action.payload;
        default:
            return state;
    }
}
