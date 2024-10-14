import { View, Text, ScrollView, Dimensions } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Bars from '../../assets/icons/Bars'
import { Ionicons } from '@expo/vector-icons'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Animated, { useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import { getStatusBarHeight } from 'react-native-status-bar-height'

import TrendingMovies from '../TrendingMovies'
import NewMovies from '../NewMovies'
import MostTrendingShows from '../MostTrendingShows'
import SplashScreen from '../../Components/SplashScreen'
import { TouchableOpacity } from 'react-native'
import { router, useNavigation } from 'expo-router'
import { DrawerActions } from '@react-navigation/native'

console.disableYellowBox = true;

const index = () => {
    const navigate = useNavigation();
    const [data, setData] = useState([]);
    // const [opacity, setOpacity] = useState(0);
    const translateY = useSharedValue(0);
    const handleScroll = useAnimatedScrollHandler((e) => {
        translateY.value = e.contentOffset.y;
        // setOpacity(translateY.value/90);

    })
    const bgStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: `rgba(0,0,0,${translateY.value / 150})`
        }
    })
    const options = {
        method: 'GET',
        url: 'https://movies-api14.p.rapidapi.com/home',
        headers: {
            'x-rapidapi-key': 'd911910580msh9bb0666717afb29p182f69jsn8b623df0d6c3',
            'x-rapidapi-host': 'movies-api14.p.rapidapi.com'
        }
    };

    const getTrendingMovieData = async () => {
        try {
            const response = await axios.request(options);
            setData(response.data);

        } catch (error) {
            // console.error(error);
        }
    };
    useEffect(() => {
        getTrendingMovieData();
    }, []);

    const isTrue = true;
    if (data.length === 0) {
        return <SplashScreen />;
    }
    return (
        <View className="flex-1 bg-[#121212] relative">
            <SafeAreaView className="absolute z-50">
            <Animated.View style={[{ paddingTop: getStatusBarHeight(), width:Dimensions.get('window').width }, bgStyle]} className="justify-between w-full flex-row px-5 py-3 absolute z-50  items-center">
                <TouchableOpacity onPress={() => {
                    navigate.dispatch(DrawerActions.openDrawer())
                }} className="p-2 border-[1px] border-white rounded-md bg-black">
                    <Bars fill={"#FFF"} width={24} height={24} />
                </TouchableOpacity>
                <View className="flex-row items-center">
                    <Text style={{ fontFamily: 'CyberCity' }} className="text-white text-xl">Movie</Text>
                    <Text style={{ fontFamily: 'CyberCity' }} className="text-red-500 text-xl">Wiz</Text>
                </View>
                <TouchableOpacity onPress={() => {
                    router.push({
                        pathname: '/Search'
                    })
                }} className="p-2 border-[1px] border-white rounded-md bg-black">
                    <Ionicons name='search-outline' size={24} color={'#FFF'} />
                </TouchableOpacity>
            </Animated.View>

            </SafeAreaView>
             <Animated.ScrollView onScroll={handleScroll} contentContainerStyle={{ gap: 30 }}>
                <TrendingMovies data={data[0]} />
                <NewMovies data={data[1]} />
                <MostTrendingShows data={data[5]} />
            </Animated.ScrollView>
        </View>
    )
}

export default index