import { View, Text, FlatList, Image, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');
const NewMovies = ({ data }) => {
    const [movieData, setMovieData] = useState(data.movies)
    if (!movieData) {
        return null;
    }
    return (
        <View>
            <View>
                <Text
                    style={{ fontFamily: 'BarlowSemiCondensed-Bold' }}
                    className=" ml-3 text-xl text-white"
                >New Movies</Text>
            </View>
            <View>
                <FlatList
                    horizontal
                    data={movieData}
                    renderItem={({ item }) => {
                        return (
                            <MovieCard item={item} />
                        )
                    }}
                />
            </View>
        </View>
    )
}

export default NewMovies


const MovieCard = ({ item }) => {
    return (
        <TouchableOpacity onPress={() => {
            router.push({
                pathname: '/MovieDetailsPage',
                params: { id: item._id }
            })
        }}>
            <View style={{
                width: width * 0.3
            }} className="mt-3 bg-white ml-2 rounded-xl items-center p-0.5 relative">
                <Image
                    className="w-full aspect-[526/790] rounded-xl"
                    source={{ uri: item.poster_path }}
                />
                <View style={{ width: width * 0.3 }} className="w-full px-0.5">
                    <Text numberOfLines={1} style={{ fontFamily: 'BarlowSemiCondensed-SemiBold' }} className="text-black text-center  text-sm line-clamp-1">{item.title}</Text>
                </View>
                <Text
                    style={{ fontFamily: 'BarlowSemiCondensed-SemiBold', fontSize: 10 }}
                    className=" text-black/[0.5] text-xs">Released in {new Date(item.release_date).getFullYear()}</Text>
            </View>
        </TouchableOpacity>
    )
}