import { View, Text, Dimensions, Image } from 'react-native'
import React from 'react'
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer'

const {width : WIDTH} = Dimensions.get('window');
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
                <View style={{
                    justifyContent:'center', alignItems:'center', gap:5,
                    paddingBottom:20
                }}>
                    <View style={{
                        width : WIDTH * 0.3,
                        aspectRatio:1,
                        borderRadius:150,
                        borderWidth:3, borderColor:'#FFF'
                    }}>
                        <Image style={{
                            width:'100%',
                            height:'100%',
                            objectFit:'cover',
                            borderRadius:150,
                        }} source={{uri : "https://i.pinimg.com/474x/6d/ec/3b/6dec3b6efc62fd280404fc5e4d71207b.jpg"}}/>
                    </View>
                    <Text style={{fontSize:WIDTH * 0.05, color:'#FFF'}}>USERNAME</Text>
                    <Text style={{fontSize:WIDTH * 0.03, color:'#FFF'}}>useremailid@gmail.com</Text>
                </View>
                <DrawerItemList {...props} />
                <DrawerItem label={'LogOut'} />
            </DrawerContentScrollView>
        </View>
    )
}

export default CustomDrawerComponent