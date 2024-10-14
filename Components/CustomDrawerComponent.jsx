import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer'

const CustomDrawerComponent = (props) => {
    return (
        <View style={{
            flex:1,
            // width : Dimensions.get('window').width * 2
        }} className="bg-black">
            <DrawerContentScrollView {...props}
                contentContainerStyle={{
                    // backgroundColor: 'yellow'
                }}
            >
                <View>
                    <Text className="text-white">SAYEED</Text>
                </View>
                <DrawerItemList {...props} />
                <DrawerItem label={'LogOut'} />
            </DrawerContentScrollView>
        </View>
    )
}

export default CustomDrawerComponent