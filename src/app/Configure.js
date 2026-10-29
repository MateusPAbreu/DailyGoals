import { useNavigation } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { useState } from 'react';
import { Button, Pressable, Text, TextInput, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { setNot } from '../../db_manager/configStorage';


const Configure = () => {

    const getNotified = false;
    const dayTime = [ {label: "am", value: "am"}, {label: "pm", value:"pm"}]
    const [firstNotification, setFirstNotification] = useState();
    const [firstTime, setFirstTime] = useState();
    const [lastNotification, setLastNotification] = useState();
    const [lastTime, setLastTime] = useState();

    
    // const hourTime = [
    //     {label: pm, value: }
    // ];
    async function setUpNotification(){
        if(getNotified){
            if(firstTime > 12 || firstTime < 0 && lastTime > 12 || lastTime < 0){
                console.log("Numbers not acceptable")
            }else{
                const firstN = firstTime + " " + firstNotification;
                const lastN = lastTime + " " + lastNotification;
                setNot(firstN, lastN);
            }
        }
    }


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

                <View>
                    <Button
                        onPress={() => setUpNotification()}
                        title="Set config"
                        
                    />
                </View>

            </SafeAreaView>
        </SafeAreaProvider>

    );
}

export default Configure;
