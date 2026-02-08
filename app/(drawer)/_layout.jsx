import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import CustomDrawerComponent from '../../Components/CustomDrawerComponent';

export default function Layout() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer
                drawerContent={CustomDrawerComponent}
                screenOptions={{
                    drawerActiveBackgroundColor: "#FFFFFF",
                    drawerActiveTintColor: '#000',
                    drawerContentStyle:{
                        backgroundColor:'black'
                    },
                    drawerInactiveTintColor : '#FFF',
                    // drawerHideStatusBarOnOpen : true
                }}
            >
                <Drawer.Screen
                    name="index" // This is the name of the page and must match the url from root
                    options={{
                        drawerLabel: '',
                        // title: 'overview',
                        headerShown: false,
                        drawerIcon: ({ size, color, focused }) => {
                            return (
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: "center",
                                    gap: 10
                                }}>
                                    <Ionicons name='home' color={color} size={size} />
                                    <Text style={{
                                        color: color,
                                        fontFamily: 'BarlowSemiCondensed-SemiBold',
                                        fontSize: 15
                                    }}>Home</Text>
                                </View>
                            )
                        }
                    }}
                />
                <Drawer.Screen
                    name="Favourite" // This is the name of the page and must match the url from root
                    options={{
                        drawerLabel: '',
                        // headerShown: false,
                        drawerIcon: ({ size, color, focused }) => {
                            return (
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: "center",
                                    gap: 10
                                }}>
                                    <Ionicons name='heart' color={color} size={size} />
                                    <Text style={{
                                        color: color,
                                        fontFamily: 'BarlowSemiCondensed-SemiBold',
                                        fontSize: 15
                                    }}>Favourites</Text>
                                </View>
                            )
                        }
                    }}
                />
                <Drawer.Screen
                    name="Settings" // This is the name of the page and must match the url from root
                    options={{
                        drawerLabel: '',
                        // headerShown: false,
                        drawerIcon: ({ size, color, focused }) => {
                            return (
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: "center",
                                    gap: 10
                                }}>
                                    <Ionicons name='settings' color={color} size={size} />
                                    <Text style={{
                                        color: color,
                                        fontFamily: 'BarlowSemiCondensed-SemiBold',
                                        fontSize: 15
                                    }}>Settings</Text>
                                </View>
                            )
                        }
                    }}
                />
            </Drawer>
        </GestureHandlerRootView>
    );
}
