/**
 * Created by Roc on 2017/6/13.
 */
import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { View,
    Platform,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
// import Home from '../containers/home';
import Chun from '../containers/chun'
import Luan from '../containers/luan'
import Hua from '../containers/hua'
import Kai from '../containers/kai'
import Backa from '../containers/demo/backa'
import Icon from 'react-native-vector-icons/Ionicons'
import Configs from './routerConfigs'
import Web from '../containers/demo/web'
import HeadScrollView from '../components/HeaderImageScrollView'
import CardStackStyleInterpolator from "react-navigation/src/views/CardStack/CardStackStyleInterpolator"
import Zujian from '../containers/zujian'
import Contact from  '../components/contact/contact'
import ImagePicker from '../components/imagePicker/imagePiker'
import Login from '../components/login/login'
import ImagePool from '../components/listPool/listPool'
import ImageDetail from '../components/listPool/imageDetail'

const TabBarText = {
    chun: '春',
    nuan: '暖',
    hua: '花',
    kai: '开',
    zujina: '组件'
}

const styles = StyleSheet.create({
    iconStyle: {
        width:40,
        height:40,
        borderRadius:45,
        // borderWidth:0.5,
        margin:0,
        padding:0,
        // overflow:'hidden',
        alignItems:'center',
        // borderColor:'red',
        backgroundColor:"#fff",
        marginTop:-20,

    }
});
const tabBarConfigs = (iconame, label) => {

    return {
        tabBarLabel: label,
        visible: false,
        //安卓上超过tab会裁剪，只能自定义tabBar
        tabBarIcon: ({tintColor}) => {
            return label === '组件' ?
                <View style={styles.iconStyle}>
                    <Icon name={iconame} size={40}  color={tintColor} />
                </View>
                : <Icon name={iconame} size={25}  color={tintColor}/>

        },
    }
}


const  tabNav = TabNavigator(
    {
        Chun: {
            screen: Chun,
            navigationOptions:tabBarConfigs('md-home',TabBarText.chun)
        },
        Luan: {
            screen: Luan,
            navigationOptions:tabBarConfigs('md-planet',TabBarText.nuan),
        },
        Zujian: {
            screen: Zujian,
            navigationOptions:tabBarConfigs('md-flower',TabBarText.zujina),
        },
        Hua: {
            screen: Hua,
            navigationOptions:tabBarConfigs('md-analytics',TabBarText.hua),
        },
        Kai: {
            screen: Kai,
            navigationOptions:tabBarConfigs('md-contacts',TabBarText.kai),
        },

    },
    Configs.TabNavigatorConfig()
)



/**
 * 路由配置中心
 */


/**
 * 自定义 StackNavigator，可以选择 screen 进入方式
 * 默认状态为 card，只需要输入对应页面，比如 ..navigate('ScreenSome1')
 * 如果要使某个页面进入方式为 modal 只需要在路径上加上 Modal
 * 比如：..navigate('LoginModal')
 */
const StackModalNavigator = (routeConfigs, navigatorConfig) => {
    const CardStackNavigator = StackNavigator(routeConfigs, navigatorConfig);
    const modalRouteConfig = {};
    const routeNames = Object.keys(routeConfigs);

    for (let i = 0; i < routeNames.length; i++) {
        modalRouteConfig[`${routeNames[i]}Modal`] = routeConfigs[routeNames[i]];
    }

    const ModalStackNavigator = StackNavigator(
        {
            CardStackNavigator: { screen: CardStackNavigator },
            ...modalRouteConfig,
        },
        {
            // 如果页面进入方式为 modal，需要自定义 header（默认 header 样式失效，都叠在一块了）
            mode: 'modal',
            headerMode: 'none',
        },
    );

    return ModalStackNavigator;
};


const Routers = StackModalNavigator({
    Home: {
        screen: tabNav,

    },
    Backa: {
        screen: Backa,
        navigationOptions:({navigation}) => stackOptions({navigation})


    },
    Web: {
        screen: Web,
        navigationOptions:({navigation}) => stackOptions({navigation})

    },
    HeadScrollView: {
        screen: HeadScrollView,
        navigationOptions:({navigation}) => stackOptions({navigation})

    },
    Contact: {
        screen: Contact,
        navigationOptions:({navigation}) => stackOptions({navigation})

    },
    ImagePicker: {
        screen: ImagePicker,
        navigationOptions:({navigation}) => stackOptions({navigation})
    },
    Login: {
        screen: Login,
        navigationOptions:({navigation}) => stackOptions({navigation})
    },
    ImagePool: {
        screen: ImagePool,
        navigationOptions:({navigation}) => stackOptions({navigation})
    },
    ImageDetail: {
        screen: ImageDetail,
        navigationOptions:({navigation}) => stackOptions({navigation})
    }

}, {
    headerMode: 'screen',
    mode: "card",
    // cardStyle: { backgroundColor: "#F5FCFF" },
    transitionConfig:()=>({
        screenInterpolator:CardStackStyleInterpolator.forHorizontal,
    })
});



const stackOptions = ({navigation}) => {
    const {state,goBack} = navigation
    return {
        gesturesEnabled:true,
        gestureResponseDistance:{horizontal:300},
        headerStyle: {
            backgroundColor: '#fff' ,
            //安卓隐藏导航栏下面的一条线
            // elevation: 0,
            //ios隐藏到导航栏的一条线
            // shadowOpacity: 0
        },
        headerTitleStyle: { color: '#333', alignSelf: 'center' ,flex: 1},
        headerTintColor: '#999',
        headerBackTitle: null,
        headerRight: (
            <View style={{height: 44,width: 55,justifyContent: 'center',paddingRight:15} }/>
        ),

        headerLeft:(
            <TouchableOpacity
               onPress={()=>{goBack()}}
            >

                <View style={{height: 44,width: 55,justifyContent: 'center',paddingLeft:12} }>
                    <Icon
                        name='md-arrow-back'
                        size={30}
                        color='red'
                    />
                </View>

            </TouchableOpacity>

        )
    }
}

export default Routers;






