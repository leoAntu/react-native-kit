'use strict';
import * as action from './actionTypes';
import RequesUrl from '../utils/RequestUtils'


export const  fetchListPool = () => {


    return {
        type: action.FETCHLISHPOOL,
    }
}

export const requestListPool = (page=1) => {
    return function (dispatch,getState) {
        const {listPool} = getState()
        if (page == 1) {
            listPool.imageList = []
        }

        dispatch(fetchListPool())
        let type = encodeURIComponent('福利')
        let url = `http://shitu.leanapp.cn/api/gank/listData?page=1&count=10&type=${type}`;
        RequesUrl.request(url,'get')
            .then((response)=>{
                console.log(response);
                dispatch({
                    type: action.REQUESTLISTPOOL,
                    list: listPool.imageList.concat(response.data.results)
                })
            })

    }
}