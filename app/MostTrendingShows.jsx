import { View, Image, Dimensions, FlatList, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';

import Animated, { interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, Extrapolation } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

const MostTrendingShows = ({ data }) => {
    const [movieData, setMovieData] = useState(data.movies)
    useEffect(() => {
        setMovieData([...movieData.slice(0, 10)])
    }, [])

    const translateX = useSharedValue(0);
    const handleScroll = useAnimatedScrollHandler((event) => {
        translateX.value = event.contentOffset.x;
    });
    return (
        <View>
            <View>
                <Text style={{ fontFamily: 'BarlowSemiCondensed-Bold' }}
                    className=" ml-3 text-xl text-white">{data.title}</Text>
            </View>
            <View>
                <Animated.FlatList
                    data={movieData}
                    keyExtractor={(item) => item._id.toString()} // Add keyExtractor to avoid warnings
                    renderItem={({ item, index }) => (
                        <MovieThumbnail item={item} index={index} translateX={translateX} />
                    )}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={handleScroll}
                    scrollEventThrottle={16} // Improves performance
                    removeClippedSubviews={false}
                    snapToInterval={width}
                />
            </View>
        </View>
    )
}

export default MostTrendingShows


const MovieThumbnail = ({ item, index, translateX }) => {
    const ITEM_WIDTH = width;

    const rStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    scale: interpolate(
                        translateX.value,
                        [(index - 1) * ITEM_WIDTH, index * ITEM_WIDTH, (index + 1) * ITEM_WIDTH],
                        [0.85, 1, 0.85],
                        Extrapolation.CLAMP
                    )
                },
                {
                    translateX: interpolate(
                        translateX.value,
                        [(index - 1) * ITEM_WIDTH, index * ITEM_WIDTH, (index + 1) * ITEM_WIDTH],
                        [-ITEM_WIDTH * 0.25, 0, ITEM_WIDTH * 0.25],
                        Extrapolation.CLAMP
                    )
                },

            ]
        };
    });

    return (
        <TouchableOpacity onPress={() => {
            router.push({
                pathname : "/ShowDetailsPage",
                params : {id : item._id}
            })
        }}>
            <Animated.View
                key={item._id}
                style={[rStyle, { width: width, justifyContent: 'center', alignItems: 'start' }]}
            >
                <View style={{ width: width * 0.8 }} className="border-[1.5px] border-white bg-white p-0.5 m-2 rounded-xl relative">
                    <Image
                        style={{
                            width: '100%',
                            aspectRatio: 610 / 343,
                            borderRadius: 10,
                        }}
                        source={{ uri: item.backdrop_path }}
                    />
                    <View className="absolute w-full h-[85%] p-0.5  items-end justify-between">
                    </View>
                    <View className="flex-row items-center justify-between">
                        <Text style={{ fontFamily: 'BarlowSemiCondensed-SemiBold' }} className="text-black text-center">{item.original_title}</Text>
                        <View className="flex-row">
                            <Text className="text-xs bg-yellow-500 px-3 py-0.5 mt-1 rounded-sm">Show</Text>
                        </View>
                    </View>
                    <View className="flex-row items-center justify-between space-y-2">

                        <View className="flex-row space-x-1">
                            {
                                item.genres.map((item, index) => {
                                    return (
                                        <Text
                                            style={{ fontFamily: 'BarlowSemiCondensed-SemiBold', fontSize: 10 }}
                                            className="text-black  rounded-md" key={index}>{item} •</Text>
                                    )
                                })
                            }
                        </View>
                        <View className="">
                            <Text
                                style={{ fontFamily: 'BarlowSemiCondensed-SemiBold' }}
                                className="bg-white px-2 py-0.5 text-xs rounded-md text-black/[0.5]">Released in {new Date(item.first_aired).getFullYear()}</Text>
                        </View>
                    </View>
                </View>
            </Animated.View>
        </TouchableOpacity>
    );
};