import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import {connect} from 'react-redux';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import Plug from './plug'
import UI from './ui'
const {width} = Dimensions.get('window');
const activeTabColor = '#42c02e';
const defaultTabColor = '#949494';

class MainContainer extends Component {
    static navigationOptions = ({navigation}) => ({
        headerBackTitle: null,
        //安卓下title居中
        headerTitle:(
            <TouchableOpacity
                style={{flex:1,alignItems:'center',alignSelf:'center'}}
            >
                <Text style={{fontSize: 20,color: '#333'}}>春</Text>
            </TouchableOpacity>
        ),
        headerLeft: null


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

        const routes = this.props.nav.routes
        console.log(routes);
    }

    //即将消失
    componentWillUnmount() {

    }

    componentWillReceiveProps(nextProps) {

    }


    render() {
        const {navigation} = this.props
        return (
            <View style={styles.container}>
                <ScrollableTabView
                    scrollWithoutAnimation={false}
                    locked={false}
                    initialPage={0}
                    tabBarUnderlineStyle={styles.underline}
                    tabBarInactiveTextColor={defaultTabColor}
                    tabBarActiveTextColor={activeTabColor}
                    renderTabBar={() => <DefaultTabBar style={styles.border} />}
                >

                    <Plug tabLabel={'依赖'} navigation={navigation}></Plug>
                    <UI tabLabel={'组件'} navigation={navigation}></UI>
                    <Text tabLabel={'规范'}></Text>


                </ScrollableTabView>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },

    underline: {
        height: 3,
        backgroundColor: '#42c02e',
        alignItems: 'center',
    },
    border: {
        borderBottomWidth: 1,
        borderBottomColor: '#fcfcfc',
        backgroundColor: 'white',
        // marginBottom: -0.5,
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
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);

