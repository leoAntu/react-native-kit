import React, {Component} from 'react';
import { addNavigationHelpers,NavigationActions} from 'react-navigation';
import {connect} from 'react-redux';
import  Routers from './routers/index'
import  CustomRouter from './routers/customTabBar'

import { BackHandler, ToastAndroid } from "react-native";

import {createReduxBoundAddListener} from 'react-navigation-redux-helpers';

const addListener = createReduxBoundAddListener('root');

class MainContainer extends Component {

    constructor(props) {
        //props 只读属性
        super(props);

    }
    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
        this.lastBackPressed = null
    }

    onBackPress = () => {
        const { dispatch, nav } = this.props;
        console.log(nav);

        const routes = nav.routes[0]
        console.log(routes);

        if (routes.index === 0) {
            if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
                return false;
            }
            this.lastBackPressed = Date.now();
            ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
        }
        dispatch(NavigationActions.back());
        return true;
    };

    render() {
        const { dispatch, nav } = this.props;
        //最新版本必须要加addListener，
        const navigation = addNavigationHelpers({
            dispatch,
            state: nav,
            addListener
        });
        return (
            <CustomRouter navigation={navigation}/>
        );
    }
}

const mapStateToProps = (state) => {
    const {nav} = state;
    return {
        nav
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);

