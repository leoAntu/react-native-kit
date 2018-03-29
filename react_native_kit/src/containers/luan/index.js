import React, {Component} from 'react';
import {
    //AppRegistry,
    StyleSheet,
    Text,
    View,
    SectionList,
    InteractionManager,
    RefreshControl
} from 'react-native';
import {connect} from 'react-redux';
import ListParagraph from '../../components/ListParagraph'
import {bindActionCreators} from 'redux';
import * as nuanActions from '../../actions/nuanActions'
import ListItem from  '../../components/ListItem/listItem'
import { Dimensions, } from 'react-native';
const {width, height,} = Dimensions.get('window');

class MainContainer extends Component {

    static navigationOptions = ({navigation}) => ({
        headerLeft: null,
        headerTitle: '暖',
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
        this.state = {
            isRefreshing: false
        }

    }

    //已经加载
    componentDidMount() {

       this.requestData();

    }

    requestData = () => {
        const {actions} = this.props
        actions.requestJunShi()
    }

    //即将消失
    componentWillUnmount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    onRefresh = () => {
        this.requestData();
    }

    renderHeader = (item) => {

        return (
            <View style={styles.sectionHead}>
                <Text style={styles.sectionHeadText}>{item.section.data[0].source}</Text>
            </View>
        )
    }

    gopage = (url,title)=> {
        console.log(url);
        this.props.navigation.navigate('Web',{title: title, url:url})
    }

    renderItem = (item) => {
        const {url,title} = item.item
        return (
            <ListItem
                data={item.item}
                gopage={()=>{this.gopage(url,title)}}
            />
        )
    }

    onScroll = (e) => {

        console.log(e.nativeEvent);
    }

    sectionList = ()=> {
        const {nuan} = this.props
        return (
            <SectionList
                style={styles.container}
                onScroll={(e) => {
                    this.onScroll(e)
                }}
                stickySectionHeadersEnabled={false} // 安卓粘性头部需要开启这个，ios是默认开启
                initialNumToRender={6}
                sections={nuan.junShiList}
                renderItem={item => {
                    return this.renderItem(item)
                }}
                renderSectionHeader={item => {
                    return this.renderHeader(item)
                }}
                 keyExtractor={ (item ,index) => {
                     return item + 'key' + index
                 }}
                refreshControl={
                    <RefreshControl
                        onRefresh={this.onRefresh}
                        refreshing={this.state.isRefreshing}
                        title="努力加载中..."
                        tintColor="#FF5200"
                        titleColor="#FF5200"
                        progressBackgroundColor="#FF5200"
                    />
                }
            />
        )
    }


    render() {
        const {nuan} = this.props
        return (
            <View style={styles.container}>
                <ListParagraph ParagraphLength={6} isLoading={nuan.isLoading} hasTitle={true} list={this.sectionList}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    sectionHead: {
        height: 30,
        paddingTop: 6,
        paddingLeft: 10,
        backgroundColor: "#F7F7F7",
        shadowColor: "#666666",
        shadowOffset: { height: 2, width: 0 },
        shadowRadius: 3,
        shadowOpacity: 0.3,
    },
    sectionHeadText: {
        fontSize: 12,
        color: "#666666",
    },

});

const mapStateToProps = (state) => {
    //counter 代表combineReducers中的关联的counter
    const {nav, nuan} = state;
    return {
        nav,
        nuan
    };
};

const mapDispatchToProps = (dispatch) => {
    const actions = bindActionCreators(nuanActions, dispatch);
    return {
        actions
    };
    //如果不需要绑定方法，直接返回dispatch
    // return {
    //   dispatch
    //}
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);

