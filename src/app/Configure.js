import { DateTimePicker, Host } from '@expo/ui/jetpack-compose';
import { useNavigation } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { useState } from 'react';
import { Alert, Button, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { allRows, clearConfig, initDatabase } from '../../db_manager/configStorage';
import { clearDatabase } from '../../db_manager/goalsStorage';



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
    const [firstTime, setFirstTime] = useState();
    const [lastTime, setLastTime] = useState()
    const [buttonState, setButtonState] = useState(showPerce.toString());


    async function setUpNotification() {
  
        if (getNotified) {
            const firstN = firstTime.toTimeString().slice(0, 5);
            const lastN = lastTime.toTimeString().slice(0, 5);
            setNotif(firstN, lastN);

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

                    <Button
                        onPress={() => console.log("Determine notifications!")}
                        title="Get notified"
                    />

                    <Button
                        onPress={() => clearDatabase()}
                        title="Clear goals"
                    />

                    <Button
                        onPress={() => clearConfig()}
                        title="Clear notifications"
                    />

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
                                            setLastTime(date);
                                        }
                                    }}
                                    displayedComponents='hourAndMinute'
                                    initialDate={lastTime}
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
