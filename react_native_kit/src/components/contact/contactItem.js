import React, {Component} from 'react';
import {
    //AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Image
} from 'react-native';


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
        const {item} = this.props

        return (
            <TouchableHighlight
                style={styles.content}
                underlayColor="#D8D8D8"
                key={item.key}
            >
                <View style={styles.info}>
                    <View>
                        <Image style={styles.thumb}
                               source={{url: 'https://gw.alipayobjects.com/zos/rmsportal/WXoqXTHrSnRcUwEaQgXJ.png'}}/>
                    </View>
                    <Text style={styles.name}>{item.username}</Text>
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({

    content: {
        backgroundColor: "white",
    },
    info: {
        height: 45,
        borderBottomWidth: .5,
        borderBottomColor: "rgb(240,241,241)",
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
    },
    thumb: {
        width: 30,
        height: 30
    },
    name:{
        paddingLeft:8
    }

});


export default NativeRNApp;
//AppRegistry.registerComponent('NativeRNApp', () => NativeRNApp);
