import React, {Component} from 'react';

import {connect} from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

class Home extends Component {


    constructor(props) {
        //props 只读属性
        super(props);
        //state 支持读写
        // this.state = {date: new Date()};

    }

    componentDidMount() {
       const  routes = this.props.routes
        console.log(routes);
    }

    _toDetail() {
        this.props.navigation.navigate('App2')
    }

    _goBack() {
        const { routes } = this.props;

        this.props.navigation.goBack(routes[1].key);
    }
    render() {
        return (
            <View style={styles.container}>


                <TouchableOpacity style={styles.button} onPress={this._toDetail.bind(this)}>
                    <Text style={styles.instructions}>
                        To Detail Screen
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={this._goBack.bind(this)}>
                    <Text style={styles.instructions}>
                        BACK TO APP SCREEN
                    </Text>
                </TouchableOpacity>
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
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#fff',
    },
    button: {
        width: 200,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red'
    }
});

const mapStateToProps = (state) => {
    //counter 代表combineReducers中的关联的counter
    return {
        routes: state.nav.routes
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);

