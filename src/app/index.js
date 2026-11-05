import { SymbolView } from 'expo-symbols';
import { useCallback, useEffect, useState } from 'react';
import { Button, FlatList, Pressable, ScrollView, StatusBar, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
// import { isEnabled } from 'react-native/Libraries/Performance/Systrace';
import { NavigationContainer } from '@react-navigation/native';
import { useFocusEffect, useNavigation } from 'expo-router';
import { getAccomplished, getAllGoalsDaily, getGoalWithDate, initDatabase, setAccomplished, setGoal } from '../../db_manager/goalsStorage';
import { showPercent } from './Configure';

const Main = () => {
    // const navigation = useNavigation(); //Broke the app, worry about it later
    // clearDatabase();
    initDatabase();
    const [userGoal, setUserGoal] = useState();
    const [accomp, setAccomp] = useState({});
    const [allGoals, setAllGoals] = useState();
    const [dailyPercent, setDailyPercent] = useState();

    //Use this new map use state to map each id to a switch
    const [dailyGoals, setDailyGoals] = useState([]);

    const day = new Date();

    let sqliteDay = day.toISOString().split('T')[0];
    let countPrev = 0;
    let countNext = 0;
    const [sqlDay, setSqlDay] = useState();
    const [showPerc, setShowPerc] = useState();

    const yesterday = new Date();
    const tomorrow = new Date();

    useFocusEffect(
        useCallback(
            () => {
                loadDailyGoals();
                dailyGoalsPercentage();
                GoalsList();
            }, [])
    )

    useEffect(() => {
        setSqlDay(sqliteDay);
        supportPercent();
        () => {
            loadCurrentGoals();
        }

        // prevDay();
    }, []);

    function prevDay() {
        countPrev = countPrev + 1;
        yesterday.setDate(day.getDate() - countPrev);
        //need to do some research on how to go back to past month without breaking
        setSqlDay(yesterday.toISOString().split('T')[0]);
        console.log(yesterday.toISOString().split('T')[0])
        // setSqlDay(yesterday.toISOString().split('T')[0]);
    }

    function nextDay() {
        countNext = countNext + 1;
        tomorrow.setDate(day.getDate() + countNext);
        setSqlDay(tomorrow.toISOString().split('T')[0]);
        console.log(tomorrow.toISOString().split('T')[0])
    }

    async function dailyGoalsPercentage() {

        const allDailyGoals = await getAllGoalsDaily(sqlDay);
        setAllGoals(allDailyGoals);
        let percentage = 0;
        for (let i = 0; i < allDailyGoals.length; i++) {
            percentage += allDailyGoals[i];
        }
        percentage = percentage / allDailyGoals.length;

        if (isNaN(percentage)) {
            percentage = 0;
        }

        setDailyPercent(percentage);
    }

    async function setGoalTrue(goalText, id) {
        setAccomplished(goalText, id);
        const accomplishment = await getAccomplished(id);
        setAccomp(prevState => ({
            ...prevState,
            [id]: accomplishment
        }));
        dailyGoalsPercentage();

        return accomp[id];

    }

    const GoalDisplay = ({ goalText, id, accomplished }) => {

        if (sqlDay != sqliteDay) {
            return (
                <View style={[accomp[id] ? styles.goalAccomp : styles.goalNotAccomp]}>
                    <Text>{goalText}</Text>
                </View>
            )
        } else {

            return (
                <View style={[accomp[id] ? styles.goalAccomp : styles.goalNotAccomp]}>
                    <Text>{goalText}</Text>
                    <Switch

                        value={accomp[id] === 1}
                        trackColor={{ false: '#757577', true: '#91b0ff' }}
                        thumbColor={'#f5dd4b'}
                        onValueChange={() => setGoalTrue(goalText, id)}

                    />
                </View>
            )
        }
    }

    //Since there's no goal on the first time, there'll be an uncaught promise
    async function loadCurrentGoals() {
        const currentGoals = await getGoalWithDate(sqliteDay);
        setDailyGoals(currentGoals);
    }

    async function settingGoal() {
        if (userGoal != null) {
            await setGoal(userGoal, sqliteDay, false);
        }
    }

    async function loadDailyGoals() {
        // await setGoal(userGoal, sqliteDay, false);
        const currentGoals = await getGoalWithDate(sqliteDay);
        setDailyGoals(currentGoals);

    }

    function supportPercent() {
        const percentValue = showPercent();
        setShowPerc(percentValue);

    }

    function Percent() {
        // supportPercent()

        if (showPerc && dailyGoals.length > 0) {
            return (<Text>{dailyPercent}</Text>)

        } else {
            return (<View></View>)
        }

    }

    function ConfigureScreen() {
        const navigation = useNavigation();

        return (
            <Pressable
                onPress={() =>
                    navigation.navigate("Configure")
                }>
                <SymbolView
                    name={{ ios: 'settings', android: 'settings', web: 'settings' }}
                    size={40}
                />
            </Pressable>
        )
    }

    function GoalsList() {
        if (dailyGoals == null) {
            return <View></View>
        } else {

            return (
                <FlatList
                    data={dailyGoals}
                    // renderItem={({ item }) => renderData(item)}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <GoalDisplay goalText={item.goalText}
                        id={item.id}
                        accomplished={item.accomplished} />}
                />
            )
        }
    }



    return (

        <SafeAreaProvider style={styles.container}>
            <SafeAreaView>
                <ScrollView>

                    <NavigationContainer>
                        <ConfigureScreen />
                    </NavigationContainer>

                    <View>
                        <Percent />
                    </View>

                    <View style={styles.header}>
                        <Pressable
                            onPress={() => prevDay()}
                        >
                            <SymbolView
                                name={{ ios: 'arrow.backward', android: 'arrow_back', web: 'arrow_back' }}
                                tintColor="#36454F"
                                size={20}
                            />
                        </Pressable>
                        <Text> {sqlDay} </Text>

                        <Pressable
                            onPress={() => nextDay()}
                        >
                            <SymbolView
                                name={{ ios: 'arrow.forward', android: 'arrow_forward', web: 'arrow_forward' }}
                                tintColor="#36454F"
                                size={20}
                            />
                        </Pressable>

                    </View>

                    <View><Text>Set your goal:</Text></View>
                    <Pressable>


                        <TextInput
                            style={styles.input}
                            onChangeText={setUserGoal}
                            // onKeyPress={e => handleKeyPress(e)}
                            value={userGoal}
                        />
                        <Button
                            onPress={() => {
                                if (userGoal == "" || userGoal == null) {
                                    console.log("Empty input")
                                } 
                                else if(sqlDay < sqliteDay){
                                    console.log("Can't add goals to previous days")
                                }
                                else {
                                    settingGoal();
                                    loadDailyGoals();
                                    dailyGoalsPercentage();
                                }
                            }
                            }
                            title="Enter"
                        />


                    </Pressable>

                </ScrollView>

                <GoalsList />
                {/* <FlatList
                    data={dailyGoals}
                    // renderItem={({ item }) => renderData(item)}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <GoalDisplay goalText={item.goalText}
                        id={item.id}
                        accomplished={item.accomplished} />}
                // extraData={dailyGoals}
                /> */}

            </SafeAreaView>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: StatusBar.currentHeight,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    header: {
        flexDirection: 'row',
    },
    goalNotAccomp: {
        backgroundColor: '#ff4500'
    },
    goalAccomp: {
        backgroundColor: '#adff2f'
    }
})

export default Main;