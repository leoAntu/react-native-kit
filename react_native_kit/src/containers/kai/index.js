import React, {Component} from 'react';
import {
    //AppRegistry,
    StyleSheet,
    Text,
    View,
    DeviceEventEmitter
} from 'react-native';
import {connect} from 'react-redux';
import Placeholder from 'rn-placeholder'
import CustomPlaceholder from  './customPlaceholder'
class MainContainer extends Component {
    static navigationOptions = ({navigation}) => ({
        headerLeft: null,
        headerTitle: '开',
        tabBarOnPress:(obj)=> {
            console.log(obj);
            // navigation.state.params.tabBarOnPress()
            DeviceEventEmitter.emit('refresh', true);

            obj.jumpToIndex(obj.scene.index)
        }
    })

    //static propTypes = {
    //  };
    //static defaultProps = {
    // }
    constructor(props) {
        //props 只读属性
        super(props);
        //state 支持读写
        this.state = {
            isReady: false,
        }
    }

    //已经加载
    componentDidMount() {
        this.props.navigation.setParams({
            handleCheck: this.onActionSelected,
        });

        //监听tab 添加事件，可以做刷新等其他操作
        DeviceEventEmitter.addListener('refresh',(obj)=>{
            console.log(obj);
            this.setState({
                isReady: false
            })
            this.startTimer()
        })


        this.startTimer()
    }

    startTimer = ()=> {
        setTimeout(()=>{
            this.setState({
                isReady: true
            })
        },2000)
    }

    //即将消失
    componentWillUnmount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    renderView = () => {
        if (!this.state.isReady) {
            return (
                <View>
                    <View style={styles.box}>
                        <Text style={styles.box}>左边图右内容布局</Text>
                        <Placeholder.ImageContent
                            size={60}
                            animate="fade"
                            lineNumber={4}
                            lineSpacing={5}
                            lastLineWidth="70%"
                            onReady={this.state.isReady}
                        >
                            <Text>左边图右内容布局</Text>
                        </Placeholder.ImageContent>
                    </View>
                    <View style={styles.box}>
                        <Text style={styles.box}>一行直线的布局</Text>
                        <Placeholder.Line
                            size={60}
                            animate="fade"
                            lineNumber={4}
                            lineSpacing={5}
                            lastLineWidth="30%"
                            onReady={this.state.isReady}
                        >
                            <Text>一行直线的布局</Text>
                        </Placeholder.Line>
                    </View>
                    <View style={styles.box}>
                        <Text style={styles.box}>只有图片的布局</Text>
                        <Placeholder.Media
                            size={60}
                            animate="fade"
                            lineNumber={4}
                            lineSpacing={5}
                            lastLineWidth="30%"
                            onReady={this.state.isReady}
                        >
                            <Text>只有图片的布局</Text>
                        </Placeholder.Media>
                    </View>
                    <View style={styles.box}>
                        <Text style={styles.box}>段落布局</Text>
                        <Placeholder.Paragraph
                            size={60}
                            animate="fade"
                            lineNumber={4}
                            lineSpacing={5}
                            lastLineWidth="30%"
                            onReady={this.state.isReady}
                        >
                            <Text>段落布局</Text>
                        </Placeholder.Paragraph>
                    </View>
                    <View style={styles.box}>
                        <Text style={styles.box}>这是自定义demo</Text>
                        <CustomPlaceholder animate="fade" bgColor="yellow" onReady={this.state.isReady}
                        />
                    </View>
                </View>
            )
        } else  {
            return (
                <Text>渲染完毕</Text>
            )
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderView()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    box: {
        width: '90%',
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

