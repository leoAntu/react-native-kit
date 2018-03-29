'use strict';
import Icon from 'react-native-vector-icons/Ionicons'

const tabBarConfigs = (iconame, label) => {
    console.log('sdsssssssss');
    return {
        tabBarLabel: label,
        tabBarIcon: () => (
            <Icon name="md-planet" size={25}  />
        ),
    }
}

const TabNavigatorConfig = () => {
    return {
        lazy: true,
        initialRouteName: 'Chun',
        tabBarPosition: 'bottom',
        swipeEnabled: false,
        scrollEnabled: false,
        animationEnabled: false,
        backBehavior: 'none',
        tabBarOptions: {
            activeTintColor: '#3e9ce9',
            inactiveTintColor: '#999999',
            showIcon: true,
            showLabel: true,
            upperCaseLabel: false,
            style: {
                backgroundColor: '#fff',
            },
            //兼容安卓，要不然下面会有一条线
            indicatorStyle: {
                opacity: 0,
                height: 0
            },
            tabStyle: {
                padding: 0,
                height: 49
            },
            labelStyle: {
                fontSize: 12,
                paddingBottom: 2
            }
        }
    }
}

export default {
    tabBarConfigs,
    TabNavigatorConfig
}
