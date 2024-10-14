import { View, Text, Image, StyleSheet, ScrollView, Dimensions, TouchableOpacity, FlatList, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { router, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { Ionicons } from '@expo/vector-icons';
import { A } from '@expo/html-elements';
import Animated, { useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, interpolate, Extrapolation } from 'react-native-reanimated';

import SkletonMovieDetails from '../Components/SkletonMovieDetails';
import YoutubeIframe from 'react-native-youtube-iframe';


const { width, height } = Dimensions.get('window');

const platform_icons = {
    android: "https://i.pinimg.com/474x/a7/95/70/a795700f8f27b176f7e6c6817e716b89.jpg",
    android_tv: "https://i.pinimg.com/474x/c9/6c/69/c96c69d94a6e12288fb5c8c97f4626e7.jpg",
    ios: "https://cdn.iconscout.com/icon/free/png-256/free-ios-apple-logo-icon-download-in-svg-png-gif-file-formats--operating-system-browser-and-pack-logos-icons-572947.png?f=webp&w=256",
    web: "https://i.pinimg.com/474x/ee/8e/9a/ee8e9a2f918d1ca2d0fabb011ce1934f.jpg"
}

const ShowDetailsPage = () => {
    const { id } = useLocalSearchParams();
    const [data, setData] = useState([]);
    const [seasons, setSeasons] = useState([]);
    const options = {
        method: 'GET',
        url: `https://movies-api14.p.rapidapi.com/show/${id}`,
        headers: {
            'x-rapidapi-key': 'd911910580msh9bb0666717afb29p182f69jsn8b623df0d6c3',
            'x-rapidapi-host': 'movies-api14.p.rapidapi.com'
        }
    };
    const getShowsData = async () => {
        try {
            const response = await axios.request(options);
            setData(response.data.show);
            setSeasons(response.data.seasons);
            // console.log(response.data.seasons);

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getShowsData();
    }, []);

    const translateY = useSharedValue(0);
    const handleScroll = useAnimatedScrollHandler((e) => {
        translateY.value = (e.contentOffset.y);

    })

    const imageStyle = useAnimatedStyle(() => {
        const opacity = interpolate(
            translateY.value,
            [0, height * 0.5],
            [1, 0],
            Extrapolation.CLAMP
        );

        return {
            opacity: opacity
        };
    });


    if (data.length === 0) {
        return <SkletonMovieDetails />;
    }
    return (
        <View className="flex-1 bg-black relative">
            <StatusBar backgroundColor={'transparent'} />
            <Animated.Image style={[StyleSheet.absoluteFillObject, imageStyle,]} source={{ uri: data.poster_path }} />
            <LinearGradient style={{ flex: 1, position: 'absolute', width: '100%', height: '100%' }} colors={["transparent", "rgba(0,0,0,0.8)", "#000"]} />
            <View className="flex-1 ">
                <Animated.ScrollView onScroll={handleScroll}>

                    <View style={{
                        width: width, height: height,
                        marginTop: getStatusBarHeight()
                    }} className=" justify-between p-5">
                        <View className="flex-row justify-between">
                            <TouchableOpacity  onPress={() =>{
                                router.back()
                            }} className="p-2 rounded-md bg-black/[0.5]">
                                <Ionicons name='chevron-back' color={'white'} size={30} />
                            </TouchableOpacity>
                            <TouchableOpacity className="p-2 rounded-full bg-black/[0.5]">
                                <Ionicons name='heart-outline' color={'white'} size={30} />
                            </TouchableOpacity>
                        </View>
                        <View className="space-y-3">
                            <View>
                                <Text style={{
                                    fontFamily: 'PROCIRCUIT'
                                }} className="text-white text-5xl">{data.title}</Text>
                            </View>
                            <View className="flex-row space-x-5">
                                <View style={{ width: width * 0.3, aspectRatio: 526 / 789, }} className="rounded-xl overflow-hidden border-2 border-white">
                                    <Image style={{
                                        width: '100%', height: '100%',
                                    }} source={{ uri: data.poster_path }} />
                                </View>
                                <View className="justify-between">
                                    <View className="flex-row">
                                        <Ionicons name='star' color={'yellow'} />
                                        <Ionicons name='star' color={'yellow'} />
                                        <Ionicons name='star' color={'yellow'} />
                                        <Ionicons name='star' color={'yellow'} />
                                        <Ionicons name='star-half' color={'yellow'} />
                                        <Ionicons name='star-outline' color={'yellow'} />
                                        <Ionicons name='star-outline' color={'yellow'} />
                                        <Ionicons name='star-outline' color={'yellow'} />
                                        <Ionicons name='star-outline' color={'yellow'} />
                                        <Ionicons name='star-outline' color={'yellow'} />
                                    </View>
                                    <View>
                                        <View className="flex-row items-center">
                                            <Text style={{ fontFamily: 'BarlowSemiCondensed-Regular' }} className="text-white text-xl">Release Date : </Text>
                                            <Text style={{ fontFamily: 'BarlowSemiCondensed-Regular' }} className="text-white text-xl">{new Date(data.release_date).getFullYear()}</Text>
                                        </View>
                                        <View className="flex-row items-center">
                                            <Text style={{ fontFamily: 'BarlowSemiCondensed-Regular' }} className="text-white ">IMDB Rating : </Text>
                                            <Text style={{ fontFamily: 'BarlowSemiCondensed-Regular' }} className="text-white ">{data.vote_average} / 10</Text>
                                        </View>
                                    </View>
                                    <View>
                                        {
                                            data.genres.map((item, index) => {
                                                return (
                                                    <Text className="text-white" key={index}>{item}</Text>
                                                )
                                            })
                                        }
                                    </View>
                                </View>
                            </View>
                            <View>
                                <Text style={{
                                    fontFamily: 'BarlowSemiCondensed-Regular'
                                }} className="text-white">{data.overview}</Text>
                            </View>
                        </View>
                    </View>

                    <View className="mb-5 mt-3">
                        <Text style={{ fontFamily: 'BarlowSemiCondensed-Bold' }} className="text-white ml-3 text-xl">Trailer</Text>
                        <View>
                            <Trailer data={data} />
                        </View>
                    </View>




                    <View>
                        <Text
                            style={{ fontFamily: 'BarlowSemiCondensed-SemiBold' }}
                            className=" ml-4 pb-3 text-xl text-yellow-500">SOURCES</Text>
                        <FlatList
                            horizontal
                            data={data.sources}
                            renderItem={({ item }) => {
                                return (
                                    <SourceCard item={item} />
                                )
                            }}
                        />
                    </View>



                    <View className="py-5 space-y-3">
                        <Text style={{
                            fontFamily : 'BarlowSemiCondensed-Bold'
                        }} className="text-white ml-3 text-xl">SEASONS & EPISODES</Text>
                        <FlatList
                            horizontal
                            data={seasons}
                            renderItem={({ item, index }) => {
                                return (
                                    <SeasonsName season={item} index={index} />
                                )
                            }}
                        />
                    </View>

                    <View>
                        <FlatList
                            pagingEnabled
                            horizontal
                            data={seasons}
                            renderItem={({ item, index }) => {
                                return (
                                    <Seasons season={item} index={index} />
                                )
                            }}
                        />
                    </View>


                    {/* <View className="py-5">
                    <Text style={{ fontFamily: 'BarlowSemiCondensed-Bold' }} className="text-white py-3 ml-3 text-xl">Similar Movies</Text>
                    <View>
                        <FlatList
                            horizontal
                            data={similarMovies}
                            renderItem={({ item }) => {
                                // console.log(item);
                                return (
                                    <SimilarMovie movie={item} />
                                )
                            }}
                        />
                    </View>
                </View> */}



                </Animated.ScrollView>
            </View>
        </View>
    )
}

export default ShowDetailsPage


const SourceCard = ({ item, index }) => {
    const platforms = Object.keys(item.platform);
    return (
        <View style={{ width: width * 0.40 }} className="bg-white/[1] p-2 ml-3 space-y-3 rounded-xl justify-between" key={index}>
            <View>
                <Text style={{ fontFamily: 'BarlowSemiCondensed-Bold' }} className="text-black text-2xl text-center">{item.display_name}</Text>
                <Text style={{
                    fontFamily: 'BarlowSemiCondensed-Regular'
                }} className="text-balck text-center">{item.type}</Text>
            </View>
            <View className="w-full py-2">
                <Text style={{
                    fontFamily: 'BarlowSemiCondensed-Bold'
                }} className="text-sm py-1">Platforms</Text>
                <View className="flex-row flex-wrap gap-x-1">
                    {
                        platforms.map((p, ind) => {
                            return (
                                <A key={ind} href={`${item.platform[p]}`}>
                                    <TouchableOpacity>
                                        <Image className="w-7 h-7 object-cover" source={{ uri: platform_icons[p] }} />
                                    </TouchableOpacity>
                                </A>
                            )
                        })
                    }
                </View>
            </View>
            <TouchableOpacity className="bg-yellow-500 items-center py-2 rounded-md">
                <A href={`${item.link}`}>
                    <Text
                        style={{
                            fontFamily: 'BarlowSemiCondensed-Bold'
                        }}
                        className="text-black w-full">Go To Website
                    </Text>
                </A>
            </TouchableOpacity>
        </View>
    )
}


const SeasonsName = ({ season, index }) => {
    // console.log(index);

    return (
        <TouchableOpacity className="px-3 bg-white/[0.2] ml-3 py-1 rounded-md" key={index}>
            <Text style={{
                fontFamily: 'BarlowSemiCondensed-SemiBold'
            }} className="text-white">season {index + 1}</Text>
        </TouchableOpacity>
    )
}


const Seasons = ({ season, index }) => {
    // console.log(index);
    // console.log(season);


    return (
        <View className='space-y-2' key={index}>
            {
                season.episodes.map((item, index) => {
                    return (
                        <View style={{
                            width: width
                        }} className="px-2" key={index}>
                            <View className="bg-white p-1 rounded-xl flex-row space-x-5">
                                <View style={{ width: width * 0.3, }}>
                                    <Image style={{
                                        width: '100%',
                                        aspectRatio: 1 / 1,
                                        objectFit: 'cover'
                                    }} className="rounded-xl" source={{ uri: item.thumbnail_path }} />
                                </View>
                                <View className="justify-between flex-1">
                                    <View>
                                        <Text numberOfLines={1} style={{
                                            fontFamily: 'BarlowSemiCondensed-Bold',
                                            fontSize: width * 0.05
                                        }} className="text-yellow-500">{item.title}</Text>
                                        <Text style={{
                                            fontFamily: 'BarlowSemiCondensed-SemiBold'
                                        }} className="text-xs">Episode {item.episode_number}</Text>
                                    </View>
                                    <Text style={{
                                        fontFamily: 'BarlowSemiCondensed-SemiBold',
                                        fontSize : width * 0.035
                                    }} className="text-xs">Released date : {item.first_aired}</Text>
                                    <View >
                                        <Text style={{
                                            fontFamily: 'BarlowSemiCondensed-Bold'
                                        }} className="text-black/[0.5]">Sources</Text>
                                        <View className="flex-row flex-wrap gap-x-1">
                                            {
                                                item.sources.map((source, i) => {
                                                    return (
                                                        <View className="rounded-sm" key={i}>
                                                            <Text style={{
                                                                fontFamily: 'BarlowSemiCondensed-SemiBold'
                                                            }} className="text-red-500 text-xs px-1 py-0.5">{source.display_name}</Text>
                                                        </View>
                                                    )
                                                })
                                            }
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    )
                })
            }
        </View>
    )
}


const Trailer = ({ data }) => {
    const getVideoId = (youtubeURL) => {
        const urlParams = new URLSearchParams(new URL(youtubeURL).search);
        const videoId = urlParams.get('v');
        return (videoId);
    }
    return (
        <YoutubeIframe
            width={width}
            height={width * (9 / 16)}
            videoId={getVideoId(data.youtube_trailer)}
            play={false}
        />
    )
}



