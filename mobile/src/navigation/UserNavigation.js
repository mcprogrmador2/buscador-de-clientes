import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ProfileUserScreen from "@screens/ProfileUserScreen";

import { Icon } from "@rneui/themed";
import { COLORS } from "@constants/theme";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { refreshUserToken } from "@features/user/userSlice";
import axios from "axios";
import { backendURL } from "@config/config";
import { useNavigation } from "@react-navigation/native";
import HomeUserScreen from "@screens/HomeUserScreen";


import getUserinfo from "@hooks/user/getUserInfo";

const Tab = createBottomTabNavigator();

const UserNavigation = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.infoUser);
  const tokenExpTime = useSelector((state) => state.exp);

  const navigation = useNavigation();

  useEffect(() => {
    const checkTokenExpiration = async () => {
      const remainingTimeExpToken = tokenExpTime * 1000 - Date.now();
      const fiveSecInMiliseconds = 1000 * 10;
      if (remainingTimeExpToken <= fiveSecInMiliseconds) {
        await axios
          .post(
            `${backendURL}api/trabajadores/refresh-token`,
            {},
            { withCredentials: "include" }
          )
          .then(({ data }) => dispatch(refreshUserToken(data)))
          .catch((e) => console.log(e));
      }
    };
    checkTokenExpiration(); // Check the token expiration on component mount
    const interval = setInterval(checkTokenExpiration, 1000); // Check token expiration periodically (e.g., every minute)
    return () => clearInterval(interval); //
  }, [navigation, dispatch, tokenExpTime]);

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeUser"
        component={HomeUserScreen}
        options={{
          headerBackVisible: true,
          headerTransparent: true,
          headerTitle: "",  
          title: "Inicio",
          tabBarIcon: ({ color = COLORS.primary, focused }) => (
            <Icon
              name="search"
              type="font-awesome"
              color={focused ? color : COLORS.secondary}
            />
          ),
        }}
      />

      <Tab.Screen
        name="ProfileUser"
        component={ProfileUserScreen}
        options={{
          headerBackVisible: true,
          headerTransparent: true,
          headerTitle: "",
          title: "Perfil",

          tabBarIcon: ({ color = COLORS.primary, focused }) => (
            <Icon
              name="user-circle-o"
              type="font-awesome"
              color={focused ? color : COLORS.secondary}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default UserNavigation;
