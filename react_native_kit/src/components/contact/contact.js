'use strict';
import React, {Component} from 'react';
import {
    //AppRegistry,
    StyleSheet,
    Text,
    View,
    Animated,
    SectionList
} from 'react-native';
import {connect} from 'react-redux';
import ContactItem from './contactItem'
import SearchBox from  '../SearchBox'
import ContactIndexList from  '../contactIndexList/ContactIndexList'

const AnimatedSectionList = Animated.createAnimatedComponent(SectionList);

class MainContainer extends Component {
    constructor(props, context) {
        super(props, context)
        this._scrollPos = new Animated.Value(0);
        this._scrollSinkY = Animated.event([{
                nativeEvent: {
                    contentOffset: {y: this._scrollPos}
                }
            }],
            {useNativeDriver: true});

        this.state= {
            section: ''
        }

        this.data = [
            {key: 'a',data:[{_id: '1',key: 'a',username: 'adfds'}]},
            {key: 'b',data:[{_id: '2',key: 'b',username: 'bdfds'}]},
            {key: 'c',data:[{_id: '3',key: 'c',username: 'cdfds'}]},
            {key: 'd',data:[{_id: '4',key: 'd',username: 'ddfds'}]},
            {key: 'e',data:[{_id: '5',key: 'e',username: 'edfds'}]},
            {key: 'f',data:[{_id: '6',key: 'e',username: 'edfds'}]},
            {key: 'g',data:[{_id: '7',key: 'e',username: 'edfds'}]},
            {key: 'h',data:[{_id: '8',key: 'e',username: 'edfds'}]},
            {key: 'i',data:[{_id: '9',key: 'e',username: 'edfds'}]},
            {key: 'j',data:[{_id: '10',key: 'e',username: 'edfds'}]},
            {key: 'k',data:[{_id: '11',key: 'e',username: 'edfds'}]},
            {key: 'l',data:[{_id: '12',key: 'e',username: 'edfds'}]},
            {key: 'm',data:[{_id: '13',key: 'e',username: 'edfds'}]},
            {key: 'n',data:[{_id: '14',key: 'e',username: 'edfds'}]},
            {key: 'o',data:[{_id: '15',key: 'e',username: 'edfds'}]},
            {key: 'p',data:[{_id: '16',key: 'e',username: 'edfds'}]},
            {key: 'q',data:[{_id: '17',key: 'e',username: 'edfds'}]},
            {key: 'r',data:[{_id: '18',key: 'e',username: 'edfds'}]},
            {key: 's',data:[{_id: '19',key: 'e',username: 'edfds'}]},
            {key: 't',data:[{_id: '20',key: 'e',username: 'edfds'}]},
            {key: 'u',data:[{_id: '21',key: 'e',username: 'edfds'}]},
            {key: 'v',data:[{_id: '22',key: 'e',username: 'edfds'}]},
            {key: 'w',data:[{_id: '23',key: 'e',username: 'edfds'}]},
            {key: 'x',data:[{_id: '24',key: 'e',username: 'edfds'}]},
            {key: 'y',data:[{_id: '25',key: 'e',username: 'edfds'}]},
            {key: 'z',data:[{_id: '26',key: 'e',username: 'edfds'}]},

        ]
    }

    static navigationOptions = ({navigation}) => ({
        headerTitle: '联系人'
    })
    componentDidMount() {

    }
    _scrollToSection = (sectionIndex, itemIndex) => {
        this.setState({
            section: this.data[sectionIndex].key
        })
        this._sectionView.getNode().scrollToLocation({sectionIndex, itemIndex});
    }

     sectionListArr = (arr) => {
        return arr.map(i => i.key)
     }

     sectionHeader = (section) => {
        return (
            <View style={styles.info}>
                <Text style={styles.letter}>{section.key}</Text>
            </View>
        )
    }

    render() {

        return (
            <View style={styles.contentContainer}>
                <AnimatedSectionList
                    ref={el => this._sectionView = el}
                    onRefresh={() => console.log('onRefresh: nothing to refresh :P')}
                    onScroll={this._scrollSinkY}
                    refreshing={false}
                    showsVerticalScrollIndicator={false}//隐藏竖直滚动条
                    renderItem={({item}) => <ContactItem item={item}/>}
                    renderSectionHeader={({section}) => this.sectionHeader(section)}
                    ListHeaderComponent={<SearchBox/>}
                    stickySectionHeadersEnabled
                    sections={this.data || []}
                    enableEmptySections={true}
                    removeClippedSubviews={false}
                    keyExtractor={item => item._id}
                    viewabilityConfig={{
                        minimumViewTime: 3000,
                        viewAreaCoveragePercentThreshold: 100,
                        waitForInteraction: true,
                    }}
                />
                <ContactIndexList letters={this.sectionListArr(this.data)} scrollToSection={this._scrollToSection} section={this.state.section}/>
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

    contentContainer: {
        flex: 1,
        backgroundColor: "rgb(240,241,241)"
    },

    letter:{
        lineHeight:20,
        paddingLeft:10,
        color:"#f2645d"
    },
    info: {
        padding: 5,
        backgroundColor: "rgb(240,241,241)"
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

