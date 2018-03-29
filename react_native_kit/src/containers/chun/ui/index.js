import React, {Component} from 'react';
import {
    //AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
import {connect} from 'react-redux';

class UI extends Component {

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

    goTab = () => {
        const { navigation } = this.props;
        navigation.navigate('Hua');
    };

    render() {
        return (
            <View style={styles.container}>
                <Text onPress={()=>{this.goTab()}}>跳转到指定tab栏</Text>
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
    return {
        dispatch
    };
    //如果不需要绑定方法，直接返回dispatch
    // return {
    //   dispatch
    //}
};

export default connect(mapStateToProps, mapDispatchToProps)(UI);

