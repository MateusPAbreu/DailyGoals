import { useNavigation } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { Pressable } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


const Configure = () => {

    const ReturnHome = () => {
        const navigation = useNavigation();

        return (
            <Pressable
                onPress={() =>
                    navigation.navigate("index")
                }
            >
                <SymbolView
                    name={{ ios: 'arrow.backward', android: 'arrow_back', web: 'arrow_back' }}
                    tintColor="#36454F"
                    size={20}
                />
            </Pressable>
        );
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView>
                <ReturnHome/>

            </SafeAreaView>
        </SafeAreaProvider>

    );
}

export default Configure;
