import React, {Component} from 'react';
import {
    //AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image
} from 'react-native';


class ListItem extends Component {
    //static propTypes = {
    //  };
    //static defaultProps = {
    // }
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
        const { image, title, category, summary, like } = this.props.data

        return (
            <TouchableOpacity style={styles.item} onPress={this.props.gopage}>
                <Image source={{ uri: image }} style={styles.image} />
                <View style={styles.right}>
                    <View style={styles.rightTop}>
                        <Text style={[styles.width50, styles.fontSize15, styles.black]} numberOfLines={1}>
                            {title}
                        </Text>
                        <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
                            <Text style={[styles.fontSize15, styles.red]}>{like}</Text>
                            <Text style={[styles.fontSize11, styles.red, { paddingBottom: 2 }]}>喜欢</Text>
                        </View>
                    </View>
                    <View style={styles.rightInfo}>
                        <Text style={styles.colorGray}>{category}</Text>
                        <Text style={[styles.colorGray, { paddingTop: 3 }]} numberOfLines={1}>
                            {summary}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
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

    item: {
        flexDirection: "row",
        borderBottomColor: "#e5e5e5",
        borderBottomWidth: 0.5,
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 10,
        alignItems: "center",
    },
    image: {
        marginLeft: 10,
        width: 66,
        height: 93,
    },
    right: {
        flex: 1,
        marginLeft: 10,
        flexDirection: "column",
        justifyContent: "space-between",
    },
    rightTop: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    rightInfo: {
        marginTop: 10,
    },
    colorGray: {
        color: "#666",
        width: "60%",
        fontSize: 12,
    },
    fontSize15: {
        fontSize: 15,
    },
    fontSize13: {
        fontSize: 13,
    },
    fontSize11: {
        fontSize: 11,
    },
    red: {
        color: "#FF5200",
    },
    black: {
        color: "#333",
    },
    width50: {
        width: "50%",
    },

});


export default ListItem;
