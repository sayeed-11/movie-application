import { View, Image, Dimensions, FlatList, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';

import Animated, { interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, Extrapolation } from 'react-native-reanimated';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

const TrendingMovies = ({ data }) => {
    const [movieData, setMovieData] = useState(data.movies)
    useEffect(() => {
        setMovieData(movieData.slice(0, 10))
    }, [])
    const translateX = useSharedValue(0);

    const handleScroll = useAnimatedScrollHandler((event) => {
        translateX.value = event.contentOffset.x;
    });


    if (!movieData) {
        return null;
    }

    return (
        <View style={{
            width: width,
            aspectRatio: 1 / 1.7,
        }} className="relative">
            <View className="sticky top-0">
                <Animated.FlatList
                    data={movieData}
                    keyExtractor={(item) => item._id.toString()}
                    renderItem={({ item, index }) => (
                        <MoviePoster item={item} index={index} translateX={translateX} />
                    )}
                    scrollEnabled={false}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={16} // Improves performance
                    removeClippedSubviews={false}
                    snapToInterval={width}
                />
            </View>
            <LinearGradient
                style={{
                    position: 'absolute',
                    width: width,
                    height: '100%'
                }}
                colors={['transparent', '#121212', '#121212']}
            />

            <View className="absolute bottom-0" style={{ paddingVertical: 15 }}>
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
    );
};

export default TrendingMovies;

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
                        [-ITEM_WIDTH * 0.45, 0, ITEM_WIDTH * 0.45],
                        Extrapolation.CLAMP
                    )
                },


            ],
        };
    });

    return (
        <TouchableOpacity onPress={() => {
            router.push({
                pathname: '/MovieDetailsPage',
                params: { id: item._id }
            })
        }}>
            <Animated.View
                key={item._id}
                style={[rStyle, { width: width, justifyContent: 'center', alignItems: 'center' }]}
            >
                <View className="bg-[#FFFFFF] p-1.5 rounded-xl overflow-hidden">
                    <Image
                        style={[{
                            width: width * 0.6,
                            aspectRatio: 526 / 789,
                            borderRadius: 10
                        }]}
                        source={{ uri: item.poster_path }}
                    />
                    <View style={{ width: width * 0.6, }}>
                        <Text
                            numberOfLines={1}
                            style={{ fontFamily: 'BarlowSemiCondensed-Black', fontSize: width * 0.05 }}
                            className="text-center text-black">{item.title}</Text>
                        <Text style={{ fontFamily: 'BarlowSemiCondensed-SemiBold' }} className="text-center text-xs text-black/[0.5]">Released in {new Date(item.release_date).getFullYear()}</Text>
                        <View className="flex-row justify-center flex-wrap gap-[1px] p-0.5">
                            {
                                item.genres.map((name, idx) => {
                                    return (
                                        <Text style={{
                                            fontSize: width * 0.02,
                                            borderRadius: 2,
                                            fontFamily: 'BarlowSemiCondensed-SemiBold'
                                        }} className="text-xs bg-black/[1] text-white px-1.5" key={idx}>{name}
                                        </Text>
                                    )
                                })
                            }
                        </View>
                    </View>
                </View>
            </Animated.View>
        </TouchableOpacity>
    );
};


const MoviePoster = ({ item, index, translateX }) => {
    const ITEM_WIDTH = width;

    const rStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: -translateX.value
                },

            ]
        };
    });

    const iStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: interpolate(
                        translateX.value,
                        [(index - 1) * ITEM_WIDTH, index * ITEM_WIDTH, (index + 1) * ITEM_WIDTH],
                        [-ITEM_WIDTH, 0, ITEM_WIDTH],
                        Extrapolation.CLAMP
                    )
                },

            ],
            opacity: interpolate(
                translateX.value,
                [(index - 1) * ITEM_WIDTH, index * ITEM_WIDTH, (index + 1) * ITEM_WIDTH],
                [0, 1, 0],
                Extrapolation.CLAMP
            )
        };
    });


    return (
        <Animated.View
            key={item._id}
            style={[rStyle, { width: width, justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }]}
        >
            <Animated.Image style={[{
                width: width,
                aspectRatio: 1 / 1.3,
                // aspectRatio: 610 / 342,
                objectFit: 'cover'
            }, iStyle]} source={{ uri: item.backdrop_path }} />
        </Animated.View>
    )
}