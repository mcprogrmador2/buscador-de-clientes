import LogoutSection from "@components/user/profile/LogoutSection";
import React, { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Button,
} from "react-native";

import { useSelector } from "react-redux";
import userImage from "@assets/images/user.png";
import { COLORS, FONT, SIZES } from "@constants/theme";
import { useDispatch } from "react-redux";
import { StatusBar } from "expo-status-bar";
import axios from "axios";
import { setOnlyUserInfo, setUser } from "@features/user/userSlice";
import { backendURL } from "@config/config";
import { launchImageLibrary } from "react-native-image-picker";
import { Platform } from "react-native";

const createFormData = (photo, body = {}) => {
  const data = new FormData();

  data.append("profile", {
    name: photo.fileName,
    type: photo.type,
    uri: Platform.OS === "ios" ? photo.uri.replace("file://", "") : photo.uri,
  });

  Object.keys(body).forEach((key) => {
    data.append(key, body[key]);
  });

  return data;
};

export const ProfileUserScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.infoUser);
  const tokenExpTime = useSelector((state) => state.exp);

  const [userInfo, setUserInfo] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [photo, setPhoto] = useState(null);

  const formData = new FormData();
  const fetchData = async () => {
    try {
      const response = await axios.get(`${backendURL}api/applicants/me`, {
        withCredentials: "include",
      });
      console.log(response);
      setUserInfo(response.data.user);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setError(error.message);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [user]);

  const handleChoosePhoto = () => {
    launchImageLibrary({ mediaType: "photo" }, (response) => {
      console.log(response);
      if (response) {
        setPhoto(response);
      }
    });
  };

  const handleUploadPhoto = () => {
    axios
      .put(
        `${backendURL}api/applicants/${userInfo.id}`,
        { method: "PUT", body: createFormData(photo.assets) },
        { withCredentials: "include" }
      )

      .then(({data}) => setUserInfo(data.doc))
      .then(()=>dispatch(setOnlyUserInfo(data.doc)))
      .then((response) => {
        console.log("response", response);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  console.log(userInfo);
  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <StatusBar />
        {userInfo && (
          <View>
            <View
              style={{
                marginHorizontal: "auto",
                flex: 1,
                flexDirection: "column",
                rowGap: 10,
              }}
            >
              <Image
                resizeMode="cover"
                style={{ width: 100, height: 100, borderRadius: 50 }}
                source={
                  userInfo.profile
                    ? userInfo.profile.sizes.thumbnail.url
                    : userImage
                }
              />
            </View>
            <Text
              style={{
                fontFamily: FONT.regular,
                fontSize: SIZES.small,
                color: COLORS.gray800,
                textAlign: "center",
              }}
            >
              {userInfo.name}
            </Text>

            {photo && (
              <>
                <Image
                  source={{ uri: photo.uri }}
                  style={{ width: 300, height: 300 }}
                />
                <Button title="Upload Photo" onPress={handleUploadPhoto} />
              </>
            )}

            <Button title="Choose Photo" onPress={handleChoosePhoto} />

            <Text
              style={{
                fontFamily: FONT.regular,
                fontSize: SIZES.xSmall,
                color: COLORS.gray600,
                textAlign: "center",
              }}
            >
              {userInfo.email}
            </Text>
          </View>
        )}

        <LogoutSection />
      </SafeAreaView>
    </>
  );
};

export default ProfileUserScreen;
