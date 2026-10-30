import { SymbolView } from 'expo-symbols';
import { useEffect, useState } from 'react';
import { Button, FlatList, Pressable, ScrollView, StatusBar, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
// import { isEnabled } from 'react-native/Libraries/Performance/Systrace';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { getAccomplished, getAllGoalsDaily, getGoalWithDate, initDatabase, setAccomplished, setGoal } from '../../db_manager/goalsStorage';


const Main = () => {
    // const navigation = useNavigation(); //Broke the app, worry about it later
    // clearDatabase();
    initDatabase();
    const [userGoal, setUserGoal] = useState('Set a goal for the day!');
    const [accomp, setAccomp] = useState({});
    const [allGoals, setAllGoals] = useState();
    const [dailyPercent, setDailyPercent] = useState();
    //Use this new map use state to map each id to a switch
    const [dailyGoals, setDailyGoals] = useState([]);
    const day = new Date();
    let sqliteDay = day.toISOString().split('T')[0];
    const [sqlDay, setSqlDay] = useState();
    // const currentGoals = await getGoalWithDate(day);
    // setSqlDay(sqliteDay);
    //Need to learn why date is not transferring over...

    useEffect(() => {
        setSqlDay(sqliteDay);
        loadCurrentGoals();
        
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

    async function dailyGoalsPercentage(){
        // console.log(day);
        const allDailyGoals = await getAllGoalsDaily(sqlDay);
        setAllGoals(allDailyGoals);
        let percentage = 0;
        for(let i =0; i< allDailyGoals.length; i++){
            percentage += allDailyGoals[i];
        }
        percentage = percentage/allDailyGoals.length;
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


    async function loadCurrentGoals() {
        const currentGoals = await getGoalWithDate(sqliteDay);
        setDailyGoals(currentGoals);
    }

    async function loadDailyGoals() {
        await setGoal(userGoal, sqliteDay, false);
        const currentGoals = await getGoalWithDate(sqliteDay);
        setDailyGoals(currentGoals);
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

    return (

        <SafeAreaProvider style={styles.container}>
            <SafeAreaView>
                <ScrollView>

                    <NavigationContainer>
                        <ConfigureScreen />
                    </NavigationContainer>

                    <View>
                        <Text>{dailyPercent}</Text>
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

                    <Pressable>


                        <TextInput
                            style={styles.input}
                            onChangeText={setUserGoal}
                            // onKeyPress={e => handleKeyPress(e)}
                            value={userGoal}
                        />
                        <Button
                            onPress={() => {
                                loadDailyGoals();
                                dailyGoalsPercentage();
                            }
                            }
                            title="Enter"
                        />


                    </Pressable>

                </ScrollView>

                <FlatList
                    data={dailyGoals}
                    // renderItem={({ item }) => renderData(item)}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <GoalDisplay goalText={item.goalText}
                        id={item.id}
                        accomplished={item.accomplished} />}
                // extraData={dailyGoals}
                />

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