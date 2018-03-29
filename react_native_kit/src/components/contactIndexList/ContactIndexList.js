import React, {Component} from 'react';
import {
    //AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
//import {
//  NativeModules,
//NativeAppEventEmitter
//} from 'react-native';
//import PropTypes from 'prop-types';
import { Dimensions } from 'react-native';
const { height } = Dimensions.get('window');


class NativeRNApp extends Component {

    constructor(props) {
        //props 只读属性
        super(props);
        //state 支持读写
        // this.state = {date: new Date()};

        // 监听事件 ES6 类中函数必须手动绑定
        // this.handleChange = this.handleChange.bind(this);
    }

    //已经加载
    componentDidMount() {

    }

    //即将消失
    componentWillUnmount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    render() {
        const {section, scrollToSection, letters} = this.props

        return (
            <View pointerEvents='box-none' style={styles.container}>
                {
                    letters.map((item, index) =>
                        <TouchableOpacity
                            onPress={() => scrollToSection(index, 0)}
                            key={index}
                        >
                            <View style={section === item ? styles.activeLetter : styles.letterInfo}>
                                <Text style={styles.letter}>{item}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        right:0,
        width: 20,
        height: height - 100
        // backgroundColor: '#F5FCFF',
    },
    letterInfo:{
        width:14,
        height:14,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:14,
        overflow:'hidden',
        marginBottom:1
    },
    activeLetter:{
        width:14,
        height:14,
        alignItems:'center',
        justifyContent:'center',
        borderWidth:.5,
        borderColor:'red',
        borderRadius:14,
        backgroundColor:'#f2645d',
        overflow:'hidden',
        marginBottom:1
    },
    letter:{
        lineHeight:14,
        fontSize:9,
        // color:'#fff',

    },

});


export default NativeRNApp;
//AppRegistry.registerComponent('NativeRNApp', () => NativeRNApp);
