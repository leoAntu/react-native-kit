'use strict';
import * as action from './actionTypes';
import RequesUrl from '../utils/RequestUtils'
const PARAMS = {
    channel_id: "c7",
    cstart: 1,
    cend: 50,
    infinite: true,
    refresh: 1,
    __from__: "wap",
    multi: 5,
    appid: "web_yidian",
}

export const requestJunShi = () => {
    return function (dispatch,getState) {
        dispatch(fetchJunshi())
        let url = 'https://www.yidianzixun.com/home/q/news_list_for_channel';
        RequesUrl.request(url,'get',PARAMS)
            .then((response)=>{
                console.log(response);
                dispatch({
                    type: action.REQUESTJUNSHI,
                    list: response.result
                })
            })

    }
}


export const fetchJunshi = () => {

    return {
        type: action.FETCHJUNSHI
    }
}