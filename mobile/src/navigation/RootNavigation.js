import LoginScreen from "@screens/LoginScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { TransitionPresets } from "@react-navigation/stack";
import UserNavigation from "./UserNavigation";
const Stack = createStackNavigator();

const RootNavigation = ({navigation}) => {

    return (
      <Stack.Navigator
        screenOptions={TransitionPresets.SlideFromRightIOS}
        initialRouteName="FirstScreen"
      >
        
        <Stack.Screen
          name="LoginScreen"
          options={{
            headerStyle: { backgroundColor: "transparent" },
            headerShadowVisible: false,
            headerBackVisible: true,
            headerTransparent: true,
            headerTitle: "",
          }}
          component={LoginScreen}
        />
      
        {/* <Stack.Screen
          name="User"
          component={UserNavigation}
          options={{ headerShown: false }}
        /> */}
  
       
      </Stack.Navigator>
    );
  };
  
  export default RootNavigation;
  