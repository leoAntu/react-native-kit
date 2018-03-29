'use strict';
import React, {Component} from 'react';
import {
    //AppRegistry,
    StyleSheet,
    Text,
    View,
    InteractionManager,
    Modal
} from 'react-native';
import {connect} from 'react-redux';
//import {bindActionCreators} from 'redux';
//import * as readActions from '../actions/readActions';
//import Main from '../pages/main/main'
//import Icon from 'react-native-vector-icons/Ionicons'
//import PropTypes from 'prop-types';
import { Dimensions, } from 'react-native';
const {width, height,} = Dimensions.get('window');
import ActionSheet from 'react-native-actionsheet'
import Img from 'react-native-image-progress'
import ImageViewer from "react-native-image-zoom-viewer"


const images = [
    {
        url: "https://avatars2.githubusercontent.com/u/7970947?v=3&s=460"
    },
    {
        url: "https://avatars2.githubusercontent.com/u/7970947?v=3&s=460"
    },
    {
        url: "https://avatars2.githubusercontent.com/u/7970947?v=3&s=460"
    }
]

class MainContainer extends Component {

    static navigationOptions = ({navigation}) => ({
         headerLeft: null,
         gesturesEnabled:false,
         headerTitle: '图片详情',
         headerBackTitle: null,
        isVisible: true
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
            visible: true
        }
    }

    //已经加载
    componentDidMount() {
        // InteractionManager.runAfterInteractions(() => {
        // })
        // this.props.navigation.setParams({isVisible:true});

    }

    //即将消失
    componentWillUnmount() {

    }

    componentWillReceiveProps(nextProps) {

    }


    render() {
        return (
            <View style={styles.container}>
                {/*<Img*/}
                    {/*source={{uri: this.props.navigation.state.params.url}}*/}
                    {/*style={{height: height, width: width, backgroundColor:'#e3e3e3'}}*/}
                {/*/>*/}
                <Modal visible={this.state.visible} transparent={true}>
                    <ImageViewer
                        imageUrls={images}
                        onCancel={() => {
                            this.setState({ visible: false })
                        }}
                        onClick={()=>{
                            this.setState({ visible: false })
                        }}
                        renderFooter={() => (
                            <View>
                                <Text style={{ color: "white" }}>Render footer</Text>
                            </View>
                        )}
                        failImageSource={{
                            url: "https://avatars2.githubusercontent.com/u/7970947?v=3&s=460",
                            width: Dimensions.get("window").width,
                            height: Dimensions.get("window").width
                        }}
                    />
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

        backgroundColor: '#F5FCFF',
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
