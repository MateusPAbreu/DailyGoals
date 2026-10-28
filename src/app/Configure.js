import { useNavigation } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


const Configure = () => {

    const [firstNotification, setFirstNotification] = useState();
    const dayTime = [ {label: "am", value: "am"}, {label: "pm", value:"pm"}]
    const [firstTime, setFirstTime] = useState();
    const [lastNotification, setLastNotification] = useState();
    const [lastTime, setLastTime] = useState();

    
    // const hourTime = [
    //     {label: pm, value: }
    // ];


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
                <ReturnHome />


                <View>
                    <Text>First notification of the day</Text>
                    <TextInput
                        inputMode='numeric'
                        onChangeText={setFirstNotification}
                        text={firstNotification}
                    >
                    </TextInput>
                    <Dropdown
                        data={dayTime}
                        labelField="label"
                        valueField="value"
                        onChange={item => {
                            setFirstTime(item.value);
                        }}
                    />
                </View>

                <View>
                    <Text>Last notification of the day</Text>
                    <TextInput
                        inputMode='numeric'
                        onChangeText={setLastNotification}
                        text={lastNotification}
                    >
                    </TextInput>
                     <Dropdown
                        data={dayTime}
                        labelField="label"
                        valueField="value"
                        onChange={item => {
                            setLastTime(item.value);
                        }}
                    />
                </View>



            </SafeAreaView>
        </SafeAreaProvider>

    );
}

export default Configure;
