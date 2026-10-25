import { SymbolView } from 'expo-symbols';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';



const Configure = () => {

    const returnHome = () => {
        
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView>
                <SymbolView
                    name={{ ios: 'arrow.backward', android: 'arrow_back', web: 'arrow_back' }}
                    tintColor="#36454F"
                    size={20}
                />

            </SafeAreaView>
        </SafeAreaProvider>

    );
}

export default Configure;
