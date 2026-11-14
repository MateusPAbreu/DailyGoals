import { DateTimePicker, Host } from '@expo/ui/jetpack-compose';
import { useNavigation } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { useState } from 'react';
import { Button, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { allRows, initDatabase } from '../../db_manager/configStorage';



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
    const [getNotified, setGetNotified] = useState(false);
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
        console.log(firstTime)
        if (getNotified) {
            // if (firstTime > 12 || firstTime < 0 && lastTime > 12 || lastTime < 0) {
            //     console.log("Numbers not acceptable")
            // } else {
            //     const firstN = firstNotification + " " + firstTime;
            //     const lastN = lastNotification + " " + lastTime;
            //     setNotif(firstN, lastN);
            // }
        }
    }

    function ConfigureFirstTime() {
        if (getNotified) {
            return (
                <Host
                    matchContents={{ vertical: true }}
                    style={{ width: '100%' }}
                >
                    <DateTimePicker
                        onDateSelected={date => {
                            if (date !== null) {
                                setFirstTime(date);
                            }
                        }}
                        displayedComponents='hourAndMinute'
                        initialDate={firstTime}
                        variant='picker'
                    />
                </Host>
            )
        } else {
            return (
                <View></View>
            )
        }
    }

    function ConfigureLastTime() {
        if (getNotified) {
            return (
                <Host
                    matchContents={{ vertical: true }}
                    style={{ width: '100%' }}
                >
                    <DateTimePicker
                        onDateSelected={date => {
                            if (date !== null) {
                                setLastMinute(date);
                            }
                        }}
                        displayedComponents='hourAndMinute'
                        initialDate={lastMinute}
                        variant='picker'
                    />
                </Host>
            )
        } else {
            return (
                <View></View>
            )
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
        // https://stackoverflow.com/questions/34698616/react-native-scrollview-snapping-back-to-top-after-release
        <SafeAreaProvider>
            <SafeAreaView>
                <ReturnHome />
                <ScrollView>

                    <View>
                        <Text>First notification of the day</Text>

                        <ConfigureFirstTime></ConfigureFirstTime>
                    </View>

                    <View>
                        <Text>Last notification of the day</Text>

                        <ConfigureLastTime></ConfigureLastTime>
                    </View>

                    <View>
                        <Button
                            onPress={() => setUpNotification()}
                            title="Set config"

                        />

                        <ShowPercentage />

                        <Button
                            onPress={() => setGetNotified(!getNotified)}
                            title="Do you want notifications?"
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>

    );
}


export default Configure;
