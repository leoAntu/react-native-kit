import React, {Component} from 'react';
import {NavigationActions} from 'react-navigation';

import {
    //AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import {connect} from 'react-redux';
const {width} = Dimensions.get('window');
class MainContainer extends Component {

    static navigationOptions = ({navigation}) => ({
        headerTitle:(
            <TouchableOpacity
                style={{width:width-55 * 2, alignItems:'center',alignSelf:'center'}}
            >
                <Text>第一个入栈的界面</Text>
            </TouchableOpacity>
        ),
        headerRight: (
            <View style={{height: 44,width: 55,justifyContent: 'center',paddingRight:15} }/>
        ),

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
        const { nav } = this.props;
        console.log(nav);
    }

    //即将消失
    componentWillUnmount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    goBack = () => {
        const { routes } = this.props.nav;
        // routes[0].routes[0].key
        // this.props.navigation.goBack(routes[0].routes[0].key);
        //如果routes[0].routes[1] 表示最外面的一层，退出到首页
        this.props.navigation.goBack(routes[0].routes[1].key);

        // const resetAction = NavigationActions.reset({
        //     index: 0,
        //     actions: [
        //         NavigationActions.navigate({routeName: 'Backa', params: { token: '123456' }})
        //     ]
        // })
        //
        // this.props.navigation.dispatch(resetAction);
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome} onPress={()=>{this.goBack()}}>点击使用goBack返回指定界面</Text>

                <Text style={styles.welcome} onPress={()=>{this.props.navigation.navigate('Backa')}}>接着push</Text>


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

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);

