import { View, Text, Touchable, Dimensions, TextInput, Keyboard, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import axios from 'axios';
import { ActivityIndicator } from 'react-native'
import { router } from 'expo-router'
import Spinner from '../assets/icons/Spinner'

const { width } = Dimensions.get('window')

const Search = () => {
    const [query, setQuery] = useState("");
    const [searchData, setSearchData] = useState([]);
    const [isIndicator, SetIndicator] = useState(true);
    const options = {
        method: 'GET',
        url: 'https://movies-api14.p.rapidapi.com/search',
        params: {
            query: query
        },
        headers: {
            'x-rapidapi-key': 'd911910580msh9bb0666717afb29p182f69jsn8b623df0d6c3',
            'x-rapidapi-host': 'movies-api14.p.rapidapi.com'
        }
    };

    const getSearchData = async () => {
        setSearchData([]);
        SetIndicator(false);
        Keyboard.dismiss();
        try {
            const response = await axios.request(options);
            setSearchData(response.data.contents);

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        SetIndicator(true);
    }, [])

    return (
        <View className="flex-1 bg-black space-y-2">
            <SafeAreaView style={{
                gap: width * 0.01
            }} className="px-1 flex-row items-center">
                <TouchableOpacity onPress={() => {
                    router.back()
                }}>
                    <Ionicons name='chevron-back' color={'white'} size={width * 0.1} />
                </TouchableOpacity>
                <View className="flex-1 mr-2 relative justify-center">
                    <TextInput style={{
                        fontFamily: 'BarlowSemiCondensed-Regular',
                    }} onChangeText={(text) => setQuery(text)} className=" bg-transparent border-[1px] border-white rounded-full py-2.5 pl-3 pr-14 text-white" placeholderTextColor={'rgba(255,255,255, 0.5)'} placeholder='Search' />
                    <TouchableOpacity onPress={() => {
                        query.length > 0 ? getSearchData() : console.log("input first")
                    }} className={`absolute right-1.5 ${query.length > 0 ? "bg-white " : "bg-white/[0.3]"} rounded-full p-2.5`}>
                        <Ionicons name='search-outline' size={width * 0.05} color={query.length > 0 ? '#000' : "#FFF"} />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
            <View className="flex-1">
                {
                    isIndicator ? <SearchICON /> : (searchData.length === 0 ? <BufferIcon /> : <Result data={searchData} />)
                }
            </View>
        </View>
    )
}

export default Search

const SearchICON = () => {
    return (
        <View className="flex-1 justify-center items-center">
            <Ionicons name='search-outline' size={width * 0.5} color={'#232323'} />
            <Text style={{
                fontFamily: 'BarlowSemiCondensed-Bold',
                fontSize: width * 0.21
            }} className="text-white/[0.15]">Search</Text>
        </View>
    )
}

const BufferIcon = () => {
    return (
        <View className="flex-1 justify-center items-center">
            {/* <ActivityIndicator size={50} color={'white'} /> */}
            <Spinner/>
        </View>
    )
}

const Result = ({ data }) => {
    return (
        <View className="items-center">
            <FlatList
                data={data}
                numColumns={2}
                renderItem={({ item, index }) => {
                    return (<MovieCard item={item} />)
                }}
            />
        </View>
    )
}

const MovieCard = ({ item }) => {
    return (
        <TouchableOpacity onPress={() => {
            router.push({
                pathname: '/MovieDetailsPage',
                params: { id: item._id }
            })
        }} style={{
            width: width * 0.45,
            margin: width * 0.01
        }} className="bg-white p-1 rounded-xl">
            <Image style={{
                width: '100%',
                aspectRatio: 526 / 789
            }} className="rounded-xl" source={{ uri: item.poster_path }} />
            <View className="flex-1 gap-0.5 px-2">
                <Text numberOfLines={1} style={{
                    fontFamily: 'BarlowSemiCondensed-SemiBold',
                    fontSize: width * 0.04
                }}>{item.original_title}</Text>
                <View className="flex-row items-center justify-between w-full">
                    <View className="flex-row justify-center">
                        {
                            [0, 0, 0, 0, 0].map((i, idx) => {
                                return (
                                    <View key={idx}>
                                        <Ionicons name='star' color={'red'} size={width * 0.03} />
                                    </View>
                                )
                            })
                        }
                    </View>
                    <Text style={{
                        fontFamily: 'BarlowSemiCondensed-Black'
                    }} className="text-black/[0.7]">{new Date(item.release_date).getFullYear()}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}