'use strict';
import React, { Component } from 'react';
import {
    AppRegistry,
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TouchableWithoutFeedback,
    NativeModules,
    ImageBackground,
    DeviceEventEmitter,
} from 'react-native';
import { Dimensions, } from 'react-native';
import {SafeAreaView} from 'react-navigation'
const {width,height,scale}= Dimensions.get('window');      //设备的宽度
const defaultPixel = 2;
function scaleSize(size: number) {
    size = Math.round(size * scale + 0.5);
    return size / defaultPixel;
}



export default class Tab extends Component {
    renderItem = (route, index) => {
        const {
            navigation,
            jumpToIndex,
        } = this.props;

        const focused = index === navigation.state.index;
        const color = focused ? this.props.activeTintColor : this.props.inactiveTintColor;
        let TabScene = {
            focused:focused,
            route:route,
            tintColor:color
        };

        if(index==2){
            return (<View
                    key={route.key}
                    style={[styles.tabItem,{backgroundColor:'transparent'}]}>
                </View>
            );
        }

        return (
            <TouchableWithoutFeedback
                key={route.key}
                style={styles.tabItem}
                onPress={() => {
                    DeviceEventEmitter.emit('refresh', true);
                    jumpToIndex(index)
                }}
            >
                <View
                    style={styles.tabItem}>
                    {this.props.renderIcon(TabScene)}
                    <Text style={{ ...styles.tabText,color }}>{this.props.getLabel(TabScene)}</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    };
    render(){
        const {navigation,jumpToIndex} = this.props;
        const {routes,} = navigation.state;
        const focused = 2 === navigation.state.index;
        const color = focused ? this.props.activeTintColor : this.props.inactiveTintColor;
        let TabScene = {
            focused:focused,
            route:routes[2],
            tintColor:color
        };

        return (
            <SafeAreaView>
                <View style={{width:width,height:49,position:'relative'}}>
                    <View style={styles.tab}>
                        {routes && routes.map((route,index) => this.renderItem(route, index))}
                    </View>
                    <TouchableWithoutFeedback
                        key={"centerView"}
                        // style={[styles.tabItem,{position:'absolute',top:0,left:width/2,height:120,zIndex:100}]}
                        onPress={() => {
                            jumpToIndex(2)
                        }}>
                        <View
                            style={[styles.tabItem,{position:'absolute',bottom:-15,left:width/2 - width/5/2,height:80,zIndex:100}]}>
                            {this.props.renderIcon(TabScene)}
                            <Text style={{ ...styles.tabText,color,marginTop:8 }}>{this.props.getLabel(TabScene)}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                 </View>
            </SafeAreaView>
        );
    }
}
const styles = {
    tab:{
        width:width,
        height: 49,
        backgroundColor:'transparent',
        flexDirection:'row',
        // justifyContent:'space-around',
        // alignItems:'flex-end'
    },
    tabItem:{
        flex: 1,
        // height:49,
        width:width/5,
        alignItems:'center',
        justifyContent:'center'
    },
    tabText:{
        marginTop:2,
        fontSize:13,
        color:'#7b7b7b'
    },
    tabTextChoose:{
        color:'f3474b'
    },
    // tabImage:{
    //     width:scaleSize(42),
    //     height:scaleSize(42),
    // },
}