import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import Animated, { BounceIn, FadeIn, FadeInDown, FadeInLeft, FadeInUp, FlipInXUp } from 'react-native-reanimated'
import { EvilIcons } from '@expo/vector-icons';
// import SvgSpinner from '../assets/icons/Spinner3';
// import Spinner from '../assets/icons/Spinner2';
// const isTrue = true;

const NAME = ["M", "o", "v", "i", "e", "W", "i", "z"]
const { width } = Dimensions.get('window');

const SplashScreen = () => {

    return (
        <View className="flex-1 bg-black justify-center items-center">
            <Animated.View className="flex-row items-center">
                {
                    NAME.map((item, index) => {
                        return (
                            <Animated.View key={index} entering={FadeInDown.springify().delay(100 * (index + 1))}>
                                <Animated.Text style={{ fontFamily: 'CyberCity', fontSize: width * 0.1 }} className={`${index > 4 ? "text-red-500" : "text-white"}`}>{item}</Animated.Text>
                            </Animated.View>
                        )
                    })
                }
                {/* <Animated.View entering={FadeIn.springify().delay(100)}>
                    <Animated.Text style={{ fontFamily: 'CyberCity' }} className="text-white text-5xl">M</Animated.Text>
                </Animated.View>
                <Animated.View entering={FadeIn.springify().delay(200)}>
                    <Animated.Text style={{ fontFamily: 'CyberCity' }} className="text-white text-2xl">o</Animated.Text>
                </Animated.View>
                <Animated.View entering={FadeIn.springify().delay(300)}>
                    <Animated.Text style={{ fontFamily: 'CyberCity' }} className="text-white text-2xl">v</Animated.Text>
                </Animated.View>
                <Animated.View entering={FadeIn.springify().delay(400)}>
                    <Animated.Text style={{ fontFamily: 'CyberCity' }} className="text-white text-2xl">i</Animated.Text>
                </Animated.View>
                <Animated.View entering={FadeIn.springify().delay(500)}>
                    <Animated.Text style={{ fontFamily: 'CyberCity' }} className="text-white text-2xl">e</Animated.Text>
                </Animated.View>
                <Animated.View entering={FadeIn.springify().delay(600)}>
                    <Animated.Text style={{ fontFamily: 'CyberCity' }} className="text-red-500 text-5xl">W</Animated.Text>
                </Animated.View>
                <Animated.View entering={FadeIn.springify().delay(700)} >
                    <Animated.Text style={{ fontFamily: 'CyberCity' }} className="text-red-500 text-2xl">i</Animated.Text>
                </Animated.View>
                <Animated.View entering={FadeIn.springify().delay(800)} >
                    <Animated.Text style={{ fontFamily: 'CyberCity' }} className="text-red-500 text-2xl">z</Animated.Text>
                </Animated.View> */}
            </Animated.View>

            {/* <View className=" h-10 w-10">
                <SvgSpinner/>
            </View> */}
            {/* <View className=" h-10 w-10">
                <Spinner/>
            </View> */}
        </View>
    )
}

export default SplashScreen