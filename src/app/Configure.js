import { DateTimePicker, Host } from '@expo/ui/jetpack-compose';
import { useNavigation } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { useState } from 'react';
import { Alert, Button, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
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
    // const dayTime = [{ label: "am", value: "am" }, { label: "pm", value: "pm" }]
    // const [timeOne, setTimeOne] = useState("");
    // const [timeTwo, setTimeTwo] = useState("");
    // const [firstNotification, setFirstNotification] = useState();
    const [firstTime, setFirstTime] = useState();
    // const [firstMinute, setFirstMinute] = useState();
    // const [lastNotification, setLastNotification] = useState();
    const [lastMinute, setLastMinute] = useState()
    // const [lastTime, setLastTime] = useState();
    const [buttonState, setButtonState] = useState(showPerce.toString());
    // const [modalVisible, setModalVisible] = useState(false);


    async function setUpNotification() {
        // console.log("Being called")
        console.log(firstTime)

        // console.log(firstTime.toISOstring().slice(11, 14))
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
        <SafeAreaProvider style={styles.container}>
            <SafeAreaView style={styles.container}>
                <ReturnHome />

                <View>
                    <Button
                        onPress={() => setGetNotified(true)}
                        title="Do you want notifications?"
                    />

                    <Button
                        onPress={() => setUpNotification()}
                        title="Set config"

                    />

                    <ShowPercentage />

                    <Modal
                        animationType='fade'
                        transparent={true}
                        visible={getNotified}
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
                            setGetNotified(!getNotified);
                        }}
                    >
                        <View>
                            <Pressable
                                onPress={() =>
                                    // navigation.navigate("index")
                                    setGetNotified(!getNotified)
                                }
                            >
                            <SymbolView
                                name={{ ios: 'arrow.backward', android: 'arrow_back', web: 'arrow_back' }}
                                tintColor="#36454F"
                                size={20}
                            />
                        </Pressable>

                        <Text>First notification of the day</Text>

                        <Host
                            matchContents={{ vertical: true }}
                            style={{ width: '70%' }}
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

                        <Text>Last notification of the day</Text>

                        <Host
                            matchContents={{ vertical: true }}
                            style={{ width: '70%' }}
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
                </View>


            </Modal>
        </View>

            </SafeAreaView >
        </SafeAreaProvider >

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scroll: {
        flex: 1,
        paddingBottom: 50,
    }
})


export default Configure;
