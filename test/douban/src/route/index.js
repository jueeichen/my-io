import {createAppContainer, createStackNavigator,} from "react-navigation";
import Home from "../pages/home/Home";
import Test from "../pages/test/Test";
import DetailsScreen from "../pages/details/DetailsScreen";
import WebPage from "../pages/webPage/WebPage";
// 让安卓实现push动画  引入:
import StackViewStyleInterpolator from "react-navigation-stack/src/views/StackView/StackViewStyleInterpolator";


const Route = createStackNavigator(
  {
    Home: Home,
    DetailsScreen: DetailsScreen,
    Test: Test,
    WebPage:WebPage
  },
  {
    initialRouteName: "DetailsScreen",
    transitionConfig: () => ({
      // 在StackNavigator配置headerMode的地方，使用transitionConfig添加
      //使两端动画一致
      screenInterpolator: StackViewStyleInterpolator.forHorizontal
    })
  }
);
export default createAppContainer(Route);