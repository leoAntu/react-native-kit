'use strict';
import React, {Component} from 'react';
import {
    //AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Alert
} from 'react-native';
import {connect} from 'react-redux';
import {Button, Grid} from 'antd-mobile'
import SnapCarousel from '../../components/snapCarousel/snapCarousel'

const data = [
    {
        icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
        text: `联系人`,
    },
    {
        icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
        text: `自定义头部图片&缩放`,
    },
    {
        icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
        text: `图片上传`,
    },
    {
        icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
        text: `model登录`,
    },
    {
        icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
        text: `图片瀑布流`,
    }
]

class MainContainer extends Component {

    static navigationOptions = ({navigation}) => ({
         headerLeft: null,
         gesturesEnabled:false,
         headerTitle: '组件',
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

    headerImageScrollView = () => {

        this.props.navigation.navigate('HeadScrollView')
    }

    contactVC = () => {
        this.props.navigation.navigate('Contact')
    }

    gridClickAction = (el, index) => {
        console.log(index);
        if (index == 0) {
            this.contactVC();
            return;
        } else if (index == 1) {
            this.headerImageScrollView()
            return
        } else  if (index == 2) {
            this.props.navigation.navigate('ImagePicker',)
            return
        } else if (index ==3) {
            // this.props.navigation.navigate('Login',{ transition: 'forVertical' })
            this.props.navigation.navigate('LoginModal')

            return;
        } else if (index == 4) {

            this.props.navigation.navigate('ImagePool')
            return;
        }
    }
    render() {
        return (
            <ScrollView style={styles.container}>


                <SnapCarousel></SnapCarousel>

                <Grid data={data} activeStyle={false} onClick={(el, index) => this.gridClickAction(el,index)}/>


            </ScrollView>
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
    headerButton: {
        margin: 10,
    },
    welcome: {
        fontSize: 20,
        textAlign: "center",
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

