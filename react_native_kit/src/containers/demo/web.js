import React, {Component} from 'react';
import {
    //AppRegistry,
    StyleSheet,
    Text,
    View,
    WebView,
    ActivityIndicator
} from 'react-native';

class Web extends Component {

    static navigationOptions = ({navigation}) => ({
         title: navigation.state.params.title,
    })
    constructor(props) {
        //props 只读属性
        super(props);
        //state 支持读写
        this.state = {canGoBack: false};

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
    onNavigationStateChange = (navState) => {
        console.log(navState);
        //canGoBack  如果跳转多层web，就会返回true ,主要用于安卓按返回按钮
        this.setState({
            canGoBack: navState.canGoBack
        });
    };

    onShouldStartLoadWithRequest = (event) => {
        return true;

    }

    loading = () => {
        return <ActivityIndicator style={styles.indicator} size="small" color="#aa00aa" />
    }

    render() {
        return (
            <View style={styles.container}>
                <WebView
                    ref={(ref)=>{
                        this.webView = ref;
                    }}
                    automaticallyAdjustContentInsets={false}
                    style={styles.base}
                    source={{uri: this.props.navigation.state.params.url}}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    decelerationRate="normal"
                    onNavigationStateChange={this.onNavigationStateChange}
                    onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
                    startInLoadingState={true}
                    scalesPageToFit={true}
                    renderLoading={() => {
                        return this.loading()
                    }}
                />
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

    base: {
        flex: 1
    },
    indicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});


export default Web;
