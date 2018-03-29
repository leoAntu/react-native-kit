'use strict';
import * as actions from '../actions/actionTypes'
import { Dimensions } from 'react-native';
let {height, width} = Dimensions.get('window');

const initialState = {
    isLoading: true,
    imageList: [],
}

export default function listPool(state = initialState, action = {}) {
    switch (action.type) {
        case actions.FETCHLISHPOOL:
            return {
                ...state,
                isLoading: true
            };
        case actions.REQUESTLISTPOOL:
            return {
                ...state,
                imageList: newList(action),
                isLoading: false
            };

        default:
            return state;

    }
}

const imageArr = [
                    'http://www.taopic.com/uploads/allimg/140320/235013-14032020515270.jpg',
                    'http://f0.topitme.com/0/7a/63/113144393585b637a0o.jpg',
                    'http://pic21.nipic.com/20120528/7487615_092947555158_2.jpg',
                    'http://himg2.huanqiu.com/attachment2010/2017/0831/13/43/20170831014327280.jpg',
                    'http://pic.7y7.com/Uploads/Former/201211/2012112937642625_550_0.jpg',
                    'http://img.tupianzj.com/uploads/allimg/170716/9-1FG6164A2-50.jpg',
                    'http://img.tupianzj.com/uploads/allimg/20151229/pbovne5t13p202.jpg',
                    'http://img.tupianzj.com/uploads/allimg/20170708/0GM6QQmMaH19.jpeg',
                    'http://img.tupianzj.com/uploads/allimg/170320/0956032G9-0.jpg',
                    'http://p0.ifengimg.com/pmop/2017/0905/1A6D64B6AA12FA3313D3C962FB1A6E94E053E575_size86_w690_h1227.jpeg',
                    'http://himg2.huanqiu.com/attachment2010/2015/0723/06/50/20150723065059701.jpg'
                 ]

const rnd =  (n, m) => {
    const random = Math.floor(Math.random()*(m-n+1)+n);
    return random;
}

const newList = (action) => {

    let arr = Array.from(action.list).map((item,i)=>{
        let imageW = (width - 8 * 3) / 2 ;
        let imageH = imageW * 1.15;
        imageH = parseInt(Math.random() * 100 + imageH)
        item.imageHeight = imageH;
        item.imageWidth = imageW;

        //服务端图片会出错，替换图片url
        let index = rnd(0, imageArr.length-1)
        let url = imageArr[index];

        item.largeUrl = url;
        item.url = url

        return item
    })


    return arr
}