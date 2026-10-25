import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import configure from './Configure';
import index from './index';

const RootStack = createNativeStackNavigator({
    screens:{
        Home:{
            screen: index

        },
        Configuration:{
            screen: configure
        }
    }
})

const Navigation = createStaticNavigation(RootStack);

export default function App(){
    return <Navigation />
}