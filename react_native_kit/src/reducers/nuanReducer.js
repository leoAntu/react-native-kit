'use strict';
import * as actions from '../actions/actionTypes'

const initialState = {
    isLoading: true,
    junShiList: []
}

export default function nuan(state = initialState, action = {}) {
    switch (action.type) {
        case actions.FETCHJUNSHI:
            return {
                ...state,
                isLoading: true
            };
        case actions.REQUESTJUNSHI:
            return {
                ...state,
                junShiList: getList(action,state),
                isLoading: false
            };

        default:
            return state;
    }
}

const getList = (action, state) => {
    const list = action.list.filter( (item) => {
        return item.image && item.image.indexOf('http:') >= 0
    }).map((item)=>{
        item.image = item.image.indexOf('https') < 0 ? item.image.replace('http', 'https') : item.image
        item.url = item.url.indexOf('https') < 0 ? item.url.replace('http', 'https') : item.url

        return {
            key: item.itemid,
            data: [{...item}]
        }
    })

    return list
}