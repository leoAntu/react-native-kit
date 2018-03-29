import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Platform,
    Animated
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as nuanActions from '../../actions/nuanActions'
import ListParagraph from '../../components/ListParagraph'
import ListItem from  '../../components/ListItem/listItem'

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

class MainContainer extends Component {

     static navigationOptions = ({navigation}) => ({
         headerLeft: null,
         headerTitle: '花',
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
        this._scrollPos = new Animated.Value(0);
        this._scrollSinkY = Animated.event([{
                nativeEvent: {
                    contentOffset: {y: this._scrollPos}
                }
            }],
            {useNativeDriver: true});

    }

    //已经加载
    componentDidMount() {

         this.requestData()
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

    headerImageScrollView = () => {

         this.props.navigation.navigate('HeadScrollView')
    }

    // _scrollToSection = (sectionIndex, itemIndex) => {
    //     this._sectionView.getNode().scrollToLocation({sectionIndex, itemIndex});
    // }

    renderHeader = () => {
        return (
            <View style={styles.headerButton}>
                <Text style={styles.welcome} onPress={()=>{this.headerImageScrollView()}}>
                    自定义头部图片 & 缩放!
                </Text>
            </View>
        )
    }
    gopage = (url,title)=> {
        console.log(url);
        this.props.navigation.navigate('Web',{title: title, url:url})
    }

    renderItem= (item)=> {
        const {url, title} = item.item.data[0];
        return (
            <ListItem
                data={item.item.data[0]}
                gopage={()=>{this.gopage(url,title)}}
            />
        )
    }

    flatList = () => {
        const { nuan } = this.props
        return (
            <AnimatedFlatList
                ref={el => this._sectionView = el}
                initialNumToRender={8}
                style={styles.container}
                keyExtractor={item => item.data[0].itemid}
                ListHeaderComponent={() => {
                    return this.renderHeader()
                }}
                renderItem={item => {
                    return this.renderItem(item)
                }}
                data={nuan.junShiList}
                onScroll={this._scrollSinkY}

            />
        )
    }

    render() {
         const {nuan} = this.props
        return (
            <View style={styles.container}>
                <ListParagraph ParagraphLength={8} isLoading={nuan.isLoading} hasTitle={false} list={this.flatList}/>
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

    headerButton: {
        borderRadius: 5,
        borderWidth: 3,
        borderColor: "#B0B0B0",
        backgroundColor: "#B0B0B0",
        margin: 10,
        padding: 10,
    },
    welcome: {
        fontSize: 20,
        textAlign: "center",
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

