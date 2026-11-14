import { DateTimePicker } from '@expo/ui/jetpack-compose';
import { useNavigation } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { useState } from 'react';
import { Button, Pressable, Text, TextInput, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { allRows, initDatabase, setNotif } from '../../db_manager/configStorage';



var showPerce = false;

function changeShowPerc() {
    // console.log("Before " + showPerce)
    showPerce = !showPerce;
    // console.log("After " + showPerce)
}

export function showPercent() {
    return showPerce;
}

function Configure() {

    initDatabase();
    allRows();
    const getNotified = false;
    const dayTime = [{ label: "am", value: "am" }, { label: "pm", value: "pm" }]
    const [timeOne, setTimeOne] = useState("");
    const [timeTwo, setTimeTwo] = useState("");
    const [firstNotification, setFirstNotification] = useState();
    const [firstTime, setFirstTime] = useState();
    const [firstMinute, setFirstMinute] = useState();
    const [lastNotification, setLastNotification] = useState();
    const [lastMinute, setLastMinute] = useState()
    const [lastTime, setLastTime] = useState();
    const [buttonState, setButtonState] = useState(showPerce.toString());


    async function setUpNotification() {
        // console.log("Being called")

        if (getNotified) {
            if (firstTime > 12 || firstTime < 0 && lastTime > 12 || lastTime < 0) {
                console.log("Numbers not acceptable")
            } else {
                const firstN = firstNotification + " " + firstTime;
                const lastN = lastNotification + " " + lastTime;
                setNotif(firstN, lastN);
            }
        }
    }

    function configureTime() {
        if(getNotified){
            <DateTimePicker
                onDateSelected={date =>{
                    if (date !== null){
                        setFirstTime(date);
                    }
                }}
                displayedComponents='hourAndMinute'
                initialDate={firstTime}
                variant='picker'
            />
        } else{
            <View></View>
        }
    }

    const ShowPercentage = () => {
        return (

            <Button
                onPress={
                    () => {
                        allRows();

                        changeShowPerc();
                        setButtonState(showPerce.toString());
                    }
                }
                title={buttonState}
            />

        )

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
                    <Text>:</Text>
                    <TextInput
                        inputMode='numeric'
                        onChangeText={setFirstMinute}
                        text={firstMinute}
                    >
                    </TextInput>
                    <Dropdown
                        data={dayTime}
                        labelField="label"
                        valueField="value"
                        onChange={item => {
                            setFirstTime(item.value);
                            setTimeOne(firstTime);
                        }}
                    />
                    <Text>{timeOne}</Text>
                </View>

                <View>
                    <Text>Last notification of the day</Text>
                    <TextInput
                        inputMode='numeric'
                        onChangeText={setLastNotification}
                        text={lastNotification}
                    >
                    </TextInput>

                    <Text>:</Text>

                    <TextInput
                        inputMode='numeric'
                        onChangeText={setLastMinute}
                        text={lastMinute}
                    >
                    </TextInput>
                    <Dropdown
                        data={dayTime}
                        labelField="label"
                        valueField="value"
                        onChange={item => {
                            setLastTime(item.value);
                            setTimeTwo(lastTime);
                        }}
                    />
                    <Text>{lastTime}</Text>
                </View>

                <View>
                    <Button
                        onPress={() => setUpNotification()}
                        title="Set config"

                    />

                    <ShowPercentage />

                    <Button
                        onPress={() => getNotified = !getNotified}
                        title="Do you want notifications?"
                    />
                </View>

            </SafeAreaView>
        </SafeAreaProvider>

    );
}


export default Configure;
