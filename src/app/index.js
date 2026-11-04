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
    const [sqlDay, setSqlDay] = useState();
    const [showPerc, setShowPerc] = useState();


    useEffect(() => {
        setSqlDay(sqliteDay);
        () => {
            loadCurrentGoals();
           
        }

        // prevDay();
    }, []);

    function prevDay() {
        let previousDay = sqliteDay.slice(-2);
        let previousDayNum = parseInt(previousDay) - 1;
        // console.log("Prev day " + previousDay)
        sqliteDay = sqliteDay.replace(previousDay, previousDayNum.toString());
        setSqlDay(sqliteDay);
        // console.log("SQL day " + sqliteDay);
    }

    function nextDay() {

    }

    async function dailyGoalsPercentage() {

        const allDailyGoals = await getAllGoalsDaily(sqlDay);
        setAllGoals(allDailyGoals);
        let percentage = 0;
        for (let i = 0; i < allDailyGoals.length; i++) {
            percentage += allDailyGoals[i];
        }
        percentage = percentage / allDailyGoals.length;
        // console.log(percentage);

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
        // console.log(accomplishment)
        return accomp[id];

    }

    const GoalDisplay = ({ goalText, id, accomplished }) => {


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

    //Since there's no goal on the first time, there'll be an uncaught promise
    async function loadCurrentGoals() {
        const currentGoals = await getGoalWithDate(sqliteDay);
        setDailyGoals(currentGoals);
    }

    async function settingGoal(){
        if(userGoal != null){
            await setGoal(userGoal, sqliteDay, false);
        }
    }

    async function loadDailyGoals() {
        // await setGoal(userGoal, sqliteDay, false);
        const currentGoals = await getGoalWithDate(sqliteDay);
        setDailyGoals(currentGoals);
        console.log("Daily goals second " + dailyGoals)
    }

    function supportPercent() {
        setShowPerc(showPercent());
    }

    function Percent() {
        supportPercent()
        // console.log("Inside percent " + showPerc + " " + dailyPercent)

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
        if (dailyGoals == null){
            return <View></View>
        }else{
        console.log(dailyGoals.length)
     //this is kinda useless for the rendering problem, but keep it for check
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

    useFocusEffect(
        useCallback(
            () => {
                loadDailyGoals();
                dailyGoalsPercentage();
                GoalsList();
            }, [])
    )

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
                        // onPress={() => prevDay()}
                        >
                            <SymbolView
                                name={{ ios: 'arrow.backward', android: 'arrow_back', web: 'arrow_back' }}
                                tintColor="#36454F"
                                size={20}
                            />
                        </Pressable>
                        <Text> {sqlDay} </Text>
                        <SymbolView
                            name={{ ios: 'arrow.forward', android: 'arrow_forward', web: 'arrow_forward' }}
                            tintColor="#36454F"
                            size={20}
                        />

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
                                } else {
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