import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { useFonts } from 'expo-font'

const _layout = () => {
    const [loaded, error] = useFonts({
        'BarlowSemiCondensed-Regular': require('../assets/fonts/BarlowSemiCondensed/BarlowSemiCondensed-Regular.ttf'),
        'BarlowSemiCondensed-SemiBold': require('../assets/fonts/BarlowSemiCondensed/BarlowSemiCondensed-SemiBold.ttf'),
        'BarlowSemiCondensed-SemiBoldItalic': require('../assets/fonts/BarlowSemiCondensed/BarlowSemiCondensed-SemiBoldItalic.ttf'),
        'BarlowSemiCondensed-Thin': require('../assets/fonts/BarlowSemiCondensed/BarlowSemiCondensed-Thin.ttf'),
        'BarlowSemiCondensed-ThinItalic': require('../assets/fonts/BarlowSemiCondensed/BarlowSemiCondensed-ThinItalic.ttf'),
        'BarlowSemiCondensed-Medium': require('../assets/fonts/BarlowSemiCondensed/BarlowSemiCondensed-Medium.ttf'),
        'BarlowSemiCondensed-MediumItalic': require('../assets/fonts/BarlowSemiCondensed/BarlowSemiCondensed-MediumItalic.ttf'),
        'BarlowSemiCondensed-Light': require('../assets/fonts/BarlowSemiCondensed/BarlowSemiCondensed-Light.ttf'),
        'BarlowSemiCondensed-LightItalic': require('../assets/fonts/BarlowSemiCondensed/BarlowSemiCondensed-LightItalic.ttf'),
        'BarlowSemiCondensed-Italic': require('../assets/fonts/BarlowSemiCondensed/BarlowSemiCondensed-Italic.ttf'),
        'BarlowSemiCondensed-ExtraLight': require('../assets/fonts/BarlowSemiCondensed/BarlowSemiCondensed-ExtraLight.ttf'),
        'BarlowSemiCondensed-ExtraLightItalic': require('../assets/fonts/BarlowSemiCondensed/BarlowSemiCondensed-ExtraLightItalic.ttf'),
        'BarlowSemiCondensed-Bold': require('../assets/fonts/BarlowSemiCondensed/BarlowSemiCondensed-Bold.ttf'),
        'BarlowSemiCondensed-BoldItalic': require('../assets/fonts/BarlowSemiCondensed/BarlowSemiCondensed-BoldItalic.ttf'),
        'BarlowSemiCondensed-ExtraBold': require('../assets/fonts/BarlowSemiCondensed/BarlowSemiCondensed-ExtraBold.ttf'),
        'BarlowSemiCondensed-ExtraBoldItalic': require('../assets/fonts/BarlowSemiCondensed/BarlowSemiCondensed-ExtraBoldItalic.ttf'),
        'BarlowSemiCondensed-Black': require('../assets/fonts/BarlowSemiCondensed/BarlowSemiCondensed-Black.ttf'),
        'BarlowSemiCondensed-BlackItalic': require('../assets/fonts/BarlowSemiCondensed/BarlowSemiCondensed-BlackItalic.ttf'),
        'CyberCity': require('../assets/fonts/Cyber/Cyber City.otf'),
        'PROCIRCUIT': require('../assets/fonts/Cyber/PROCIRCUIT.ttf'),
    });
    if (!loaded) {
        return null; // Or a loading spinner
    }
    return (
        <Stack>
            <Stack.Screen
                name='(drawer)'
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='MovieDetailsPage'
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='ShowDetailsPage'
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='Search'
                options={{ headerShown: false }}
            />
        </Stack>
    )
}

export default _layout