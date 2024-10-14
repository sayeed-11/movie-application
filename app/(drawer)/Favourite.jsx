import { View, Text } from 'react-native'
import React from 'react'
import { router, useNavigation } from 'expo-router'
import { DrawerActions } from '@react-navigation/native'

const Favourite = () => {
    const navigate = useNavigation();
  return (
    <View style={{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }}>
      <Text>Favourite</Text>
    </View>
  )
}

export default Favourite