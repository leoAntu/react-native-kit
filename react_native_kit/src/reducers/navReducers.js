import Routers from '../routers/index';

const recentlyVisitedRoutes = new Set();//防止連點，多次navigate，增加此判斷
const navReducers = (state, action) => {
    if (action.type === 'Navigation/NAVIGATE') {
        if (recentlyVisitedRoutes.has(action.routeName)) {
            return state;
        }
        recentlyVisitedRoutes.add(action.routeName);
        setTimeout(() => {
            recentlyVisitedRoutes.delete(action.routeName);
        }, 400);
    }

    //如果使用goback返回到指定界面，并且使用了自定义的StackNavigator,需要自己去实现
    //在StackRouter.js 435行改成如下代码
    // let backRoute = null;
    // state.routes.find(route => {
    //     if (route.key == key) {
    //         backRoute = route;
    //     }
    // });
    //
    // backRouteIndex = state.routes.indexOf(backRoute) + 1;
    // if (action.type === 'Navigation/BACK') {
    // }

    const newState = Routers.router.getStateForAction(action, state);
    return newState || state;
};

export default navReducers;