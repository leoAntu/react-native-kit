import React, {Component} from 'react';
import {
    //AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
import {connect} from 'react-redux';
//import {bindActionCreators} from 'redux';
//import * as readActions from '../actions/readActions';
//import Main from '../pages/main/main'
//import Icon from 'react-native-vector-icons/Ionicons'
//import PropTypes from 'prop-types';
//import { Dimensions, Animated } from 'react-native';
//const {width, height, scale} = Dimensions.get('window');

class Plug extends Component {


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

    }

    //即将消失
    componentWillUnmount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    goBack = () => {
        const { navigation } = this.props;
        navigation.navigate('Backa');
    };

    render() {
        return (
            <View style={styles.container}>
                <Text
                    style={styles.welcome}
                    onPress={() => {
                        this.goBack();
                    }}
                >
                    返回到指定页面Demo!
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        //  alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
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
    return {
        dispatch
    };
    //如果不需要绑定方法，直接返回dispatch
    // return {
    //   dispatch
    //}
};

export default connect(mapStateToProps, mapDispatchToProps)(Plug);

