'use strict';
import React, {Component} from 'react';
import {
    //AppRegistry,
    StyleSheet,
    Text,
    View,
    InteractionManager,
    TouchableOpacity,
    FlatList,
    Image,
    Modal,
    ScrollView,
    CameraRoll,
    Platform,
    Alert
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as listPoolActions from '../../actions/listPoolActions';
import AutoResponisve from 'autoresponsive-react-native';
import Img from 'react-native-image-progress'
import {Button,ActivityIndicator,Toast} from 'antd-mobile'
//import Main from '../pages/main/main'
//import Icon from 'react-native-vector-icons/Ionicons'
//import PropTypes from 'prop-types';
import { Dimensions, } from 'react-native';
const {width, height,} = Dimensions.get('window');
import ImageViewer from "react-native-image-zoom-viewer"
import RNFetchBlob from 'react-native-fetch-blob'


let selectedIndex = 0;
let currentIndex = 0;

class MainContainer extends Component {

    static navigationOptions = ({navigation}) => ({
         headerLeft: null,
         gesturesEnabled:false,
         headerTitle: '图片瀑布流',
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
            defaultData : [],
            visible: false,

        };
        this.page = 1;

    }

    //已经加载
    componentDidMount() {
        const {listPool, actions} = this.props

        actions.requestListPool(1)
    }

    //即将消失
    componentWillUnmount() {

    }

    componentWillReceiveProps(nextProps) {
        const {listPool} = this.props
        if (listPool.imageList.length > 0 ) {
            this.setState({
                defaultData: [{
                    _id: 'test'
                }]
            })
        }
    }

    fetchMoreData = () => {
        console.log('fetchMoreData');
        const {listPool, actions} = this.props

        if (listPool.isLoading) {
            return;
        }
        this.page = this.page + 1;
        actions.requestListPool(this.page)

    }
    fetchData = () => {
        console.log('fetchData');
        const {listPool, actions} = this.props
        if (listPool.isLoading) {
            return;
        }
        this.page = 1
        actions.requestListPool(this.page)
    }

    getAutoResponsiveProps = () => {
        return {
            itemMargin: 8,
        };
    }
    renderItem = () => {
        const {listPool} = this.props

        console.log('12313123');
        return (
            <AutoResponisve {...this.getAutoResponsiveProps()}>
                {listPool.imageList.map((item, i)=>{

                    return (
                        <TouchableOpacity key = {i}
                                          onPress={()=> {
                                                selectedIndex = i;
                                                this.setState({
                                                    visible: true,
                                                })
                                          }}
                                          style={{height: item.imageHeight, width: item.imageWidth,
                                              marginHorizontal:8,
                                              marginVertical:8,
                                          }}
                        >
                            <Img source={{uri:item.url}}
                                  // indicator={Progress.Bar}
                                    resizeMode={Image.resizeMode.cover}
                                   style={{
                                       height:item.imageHeight,
                                       width:item.imageWidth,
                                       backgroundColor: '#e3e3e3'
                                   }}
                            />
                        </TouchableOpacity>
                    )
                })}
            </AutoResponisve>
        )
    }

    saveImage= () => {
        const {listPool} = this.props
        const url = listPool.imageList[currentIndex].url
        console.log(url);
        Platform.OS == 'ios' ? this.iosSaveImage(url) : this.androidSaveImage(url)
    }

    iosSaveImage = (url) => {
        CameraRoll.saveToCameraRoll(url,'photo')
            .then((data)=>{
                console.log('2222222222222')
                Alert.alert('保存成功！')
            })
            .catch((error)=>{
                console.log(error);
                Alert.alert('保存失败！')
            });
    }

    androidSaveImage = (url) => {
        // let AndroidURL = 'file:///storage/emulated/0/Pictures/image.jpg'
        // let dirs = RNFetchBlob.fs.dirs

        RNFetchBlob
            .config({
                fileCache : true,
                // by adding this option, the temp files will have a file extension
                appendExt : 'jpeg'
            })
            .fetch('GET', url, {
                //some headers ..
            })
            .then((res) => {
                // the temp file path with file extension `png`
                console.log('The file saved to ','file://' + res.path())
                const url = 'file://' + res.path();
                this.iosSaveImage(url)
                // Beware that when using a file path as Image source on Android,
                // you must prepend "file://"" before the file path
            })
    }


    render() {
        const {listPool} = this.props

        return (
            <View style={styles.container}>
                <FlatList
                     data={this.state.defaultData}
                     style={{backgroundColor:'white',flex:1}}
                     keyExtractor={item => item._id}
                     // numColumns={2}
                     initialNumToRender={6}
                     onRefresh={()=>this.fetchData(1)}
                     refreshing={listPool.isLoading}
                     renderItem={()=>this.renderItem()}
                      onEndReached={()=>this.fetchMoreData()}
                      onEndReachedThreshold={0.2}
                     removeClippedSubviews={false}
                     //按自己需求使用，安卓不需要
                     // ListFooterComponent={()=>{
                     //     return( listPool.isLoading  &&
                     //         (<View style={styles.loadDataStyle}><ActivityIndicator text="正在加载" size="large" /></View>))
                     // }}
                />
                <Modal visible={this.state.visible}
                       transparent={true}
                       onRequestClose={() => {}}
                >
                    <ImageViewer
                        imageUrls={listPool.imageList}
                        isShowMenu={true}
                        index={selectedIndex}
                        onCancel={() => {
                            this.setState({ visible: false })
                        }}
                        onChange={(index) => {
                            // this.setState({
                            //     currentIndex: index
                            // })
                            currentIndex = index
                        }}
                        onClick={()=>{
                            this.setState({ visible: false })
                        }}
                         // renderFooter={() => (
                         //     <View style={{left: width/2 - 50}}>
                         //         <Text style={{ color: "white",width:100 }}>保存图片</Text>
                         //     </View>
                         // )}
                        loadingRender = {() => {
                            return (
                                <View style={{position:'absolute',zIndex:9999, top:height/2, left:width/2}}>
                                    <ActivityIndicator size="large" color="white"/>
                                 </View>
                        )
                        }}
                        failImageSource={{
                            url: "https://avatars2.githubusercontent.com/u/7970947?v=3&s=460",
                            width: Dimensions.get("window").width,
                            height: Dimensions.get("window").width
                        }}
                    />
                    <View
                        style={[
                            { bottom: 10, position: "absolute", zIndex: 9999000,left: width/2 - 40 , backgroundColor: '#e3e3e3'},
                        ]}
                    >
                        <TouchableOpacity onPress={()=>{
                            this.saveImage()
                        }}>
                            <Text style={{ color: "black",width:80,textAlign:'center',height:40, lineHeight: 40}}>保存图片</Text>
                        </TouchableOpacity>

                    </View>
                </Modal>
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

    loadDataStyle: {
        marginVertical:20,
        marginTop:20
    },

});

const mapStateToProps = (state) => {
    //counter 代表combineReducers中的关联的counter
    const {nav,listPool} = state;
    return {
        nav,
        listPool
    };
};

const mapDispatchToProps = (dispatch) => {
    const actions = bindActionCreators(listPoolActions, dispatch);
    return {
        actions
    };
    // //如果不需要绑定方法，直接返回dispatch
    // return {
    //   dispatch
    // }
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);

