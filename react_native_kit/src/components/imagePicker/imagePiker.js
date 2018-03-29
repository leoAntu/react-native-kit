'use strict';
import React, {Component} from 'react';
import {
    //AppRegistry,
    StyleSheet,
    Text,
    View,
    InteractionManager,
    Image
} from 'react-native';
import {connect} from 'react-redux';
import ImagePicker from 'react-native-image-picker';

// 底部弹出框文字
let photoOptions = {
    title: '选择照片',
    cancelButtonTitle:'取消',
    takePhotoButtonTitle:'拍照',
    chooseFromLibraryButtonTitle:'选择相册',
    quality:0.75,
    allowsEditing:true,
    noData:false,
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};

class MainContainer extends Component {

    static navigationOptions = ({navigation}) => ({
         headerLeft: null,
         gesturesEnabled:false,
         headerTitle: '图片选择',
         headerBackTitle: null
    })

    constructor(props) {
        //props 只读属性
        super(props);
        //state 支持读写
        this.state = {imageUri: ''};

    }

    //已经加载
    componentDidMount() {
        // InteractionManager.runAfterInteractions(() => {
        // })

        let type = encodeURIComponent('福利');

        console.log(type);
        console.log('11111111111111111');
    }

    //即将消失
    componentWillUnmount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    onPress = () => {
        ImagePicker.showImagePicker(photoOptions, (response) => {
            if (response.didCancel) {
                console.log('点击了取消按钮');
                return;
            }
            if(!response.error) {
                console.log(response);
                this.setState({
                    imageUri: response.uri
                })
            }

        });

    }

    render() {
        return (
            <View style={styles.container}>
                <Text onPress={()=>this.onPress()}>上传图片</Text>
                <Image source={{uri: this.state.imageUri}} style={styles.imageStyle}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
         alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    imageStyle: {
        width:200,
        height:200,
        marginTop:20
    }

});

const mapStateToProps = (state) => {
    //counter 代表combineReducers中的关联的counter
    const {nav} = state;
    return {
        nav
    };
};

const mapDispatchToProps = (dispatch) => {
    // const actions = bindActionCreators(readActions, dispatch);
    // return {
    //     actions
    // };
    //如果不需要绑定方法，直接返回dispatch
    return {
      dispatch
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);

