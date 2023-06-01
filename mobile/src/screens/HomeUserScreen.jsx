import { Text, StyleSheet, View } from "react-native";
import React, { Component, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import JobCard from "@components/user/home/JobCard";
import { useState } from "react";
import { COLORS, SIZES, FONT } from "@constants/theme";
import { TextInput } from "react-native";
import stylesHome from "@components/user/home/stylesHome";
import { Icon } from "@rneui/themed";
import useFetchJobs from "@hooks/user/fetchJobs";
import axios from "axios";
import { FlatList } from "react-native";
import getUserinfo from "@hooks/user/getUserInfo";
import { backendURL } from "@config/config";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { clearUser } from "@features/user/userSlice";


export const HomeUserScreen = ({navigation}) => {
  const [searchWord, setSearchWord] = useState();
  const { data } = useFetchJobs();



  const dispatch = useDispatch();
  const user = useSelector((state) => state.infoUser);
  const tokenExpTime = useSelector((state) => state.exp);
  



  useEffect(() => {
          const checkTokenExpiration = async () => {
              const remainingTimeExpToken = tokenExpTime * 1000 - Date.now();

              if (remainingTimeExpToken <= 0 ) {
                try {
                  dispatch(clearUser());
                  navigation.popToTop();
                  
                } catch (error) {
                  navigation.popToTop();
                }
              }
            };
            checkTokenExpiration(); // Check the token expiration on component mount
            const interval = setInterval(checkTokenExpiration, 1000); // Check token expiration periodically (e.g., every minute)
            return () => clearInterval(interval); // 

    
    }, [tokenExpTime]);





  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }}>
  
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginHorizontal: 30,
          gap: 20,
        }}
      >
        <TextInput
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
          style={stylesHome.inputSearch}
          focusable={false}
          placeholder="Buscar puestos de trabajo"
          placeholderTextColor={COLORS.gray}
        />
        <TouchableOpacity>
          <Icon
            style={{
              borderWidth: 2,
              borderColor: COLORS.secondary,
              padding: 5,
              borderRadius: 5,
            }}
            name="search"
            type="material"
            color={COLORS.secondary}
          />
        </TouchableOpacity>
      </View>
      <View style={stylesHome.container}>
        <View style={stylesHome.header}>
          <Text style={stylesHome.headerTitle}>Nearby jobs sdasd</Text>
          <TouchableOpacity>
            <Text style={stylesHome.headerBtn}>Show all</Text>
          </TouchableOpacity>
        </View>

        <View style={stylesHome.cardsContainer}>
          <Text
            style={{
              paddingHorizontal: 20,
              fontSize: SIZES.large,
              fontWeight: FONT.medium,
              color: COLORS.gray,
              marginBottom: 10,
            }}
          >
            Trabajos recientes
          </Text>
        </View>
      </View>
      {data && user && (
        <View style={{ flex: 1 }}>
          <FlatList
            style={{ flex: 1 }}
            data={data.docs}
            showsVerticalScrollIndicator={true}
            onEndReachedThreshold={0.6}
            
            keyExtractor={(item) => String(item.id)}
            showsHorizontalScrollIndicator={true}
            renderItem={({ item }) => <JobCard userId={user.id} dataJob={item} />}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default HomeUserScreen;
