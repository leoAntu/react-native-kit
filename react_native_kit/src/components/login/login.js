'use strict';
import React, {Component} from 'react';
import {
    //AppRegistry,
    StyleSheet,
    Text,
    View,
    InteractionManager
} from 'react-native';
import {connect} from 'react-redux';

class MainContainer extends Component {

    static navigationOptions = ({navigation}) => ({
         headerLeft: null,
         gesturesEnabled:false,
         headerTitle: '登录',
         headerBackTitle: null
    })

    //static propTypes = {
    //  };
    //static defaultProps = {
    // }
    constructor(props) {
        //props 只读属性
        super(props);
        //state 支持读写
        // this.state = {date: new Date()};

    }

    //已经加载
    componentDidMount() {
        // InteractionManager.runAfterInteractions(() => {
        // })
    }

    //即将消失
    componentWillUnmount() {

    }

    componentWillReceiveProps(nextProps) {

    }


    render() {
        return (
            <View style={styles.container}>
                <Text>欢迎登录</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
         alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },

});

const mapStateToProps = (state) => {
    //counter 代表combineReducers中的关联的counter
    const {nav} = state;
    return {
        nav
    };
};

const mapDispatchToProps = (dispatch) => {
    // const actions = bindActionCreators(readActions, dispatch);
    // return {
    //     actions
    // };
    //如果不需要绑定方法，直接返回dispatch
    return {
      dispatch
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);

