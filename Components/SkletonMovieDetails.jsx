import { View, Text, Dimensions } from 'react-native'
import React from 'react'

const { width } = Dimensions.get('window')

const SkletonMovieDetails = () => {
    return (
        <View className="flex-1 bg-black justify-between py-10 px-5">
            <View className="flex-row justify-between">
                <View className="w-10 aspect-square bg-white/[0.2] rounded-md" />
                <View className="w-10 aspect-square bg-white/[0.2] rounded-md" />
            </View>
            <View className="space-y-5">
                <View className="space-y-2">
                    <View className="h-2 bg-white/[0.2]" />
                    <View className="h-2 w-[90%] bg-white/[0.2]" />
                </View>
                <View className="flex-row gap-x-5">
                    <View style={{ aspectRatio: 1 / 1.5, width: width * 0.3 }} className=" bg-white/[0.2] rounded-md" />
                    <View className="justify-between">
                        <View className="space-y-2">
                            <View style={{ width: width * 0.4 }} className="h-2 bg-white/[0.2]" />
                            <View style={{ width: width * 0.4 }} className="h-2 bg-white/[0.2]" />
                        </View>
                        <View className="space-y-2">
                            <View style={{ width: width * 0.4 }} className="h-2 bg-white/[0.2]" />
                            <View style={{ width: width * 0.4 }} className="h-2 bg-white/[0.2]" />
                            <View style={{ width: width * 0.3 }} className="h-2 bg-white/[0.2]" />
                        </View>
                        <View className="space-y-2">
                            <View style={{ width: width * 0.4 }} className="h-2 bg-white/[0.2]" />
                            <View style={{ width: width * 0.2 }} className="h-2 bg-white/[0.2]" />
                            <View style={{ width: width * 0.3 }} className="h-2 bg-white/[0.2]" />
                        </View>
                    </View>
                </View>
                <View className="space-y-2">
                    <View style={{ width: width * 0.9 }} className="h-2 bg-white/[0.2]" />
                    <View style={{ width: width * 0.9 }} className="h-2 bg-white/[0.2]" />
                    <View style={{ width: width * 0.9 }} className="h-2 bg-white/[0.2]" />
                    <View style={{ width: width * 0.9 }} className="h-2 bg-white/[0.2]" />
                </View>
            </View>
        </View>
    )
}

export default SkletonMovieDetails