import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import configure from './Configure';
import index from './index';

//https://stackoverflow.com/questions/45388957/how-to-pass-parameters-to-screen-in-stacknavigator


const RootStack = createNativeStackNavigator({
    screens: {
        Home: {
            screen: index,

        },
        Configuration: {
            screen: configure,
            initialParams: {userDailyGoals: ""},
        }
    }
})

const Navigation = createStaticNavigation(RootStack);

export default function App() {
    return (
       
            <Navigation />
        
        )
}