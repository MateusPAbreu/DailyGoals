import { useEffect, useState } from 'react';
import { Button, FlatList, Pressable, ScrollView, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { getGoalWithDate, initDatabase, setGoal } from '../../db_manager/goalsStorage';

{/*
    TODO:
    So the array length first gave me 0 then undefined for every following addition... figure it out.
*/}

const GoalDisplay = ({ goalText }) => (
    <View>
        <Text>{goalText}</Text>
        {/* Insert button to say if accomplished or not here */}
    </View>
);

const Main = () => {
    // clearDatabase();
    initDatabase();
    const [userGoal, setUserGoal] = useState('Set a goal for the day!');
    const [dailyGoals, setDailyGoals] = useState([]);
    const day = new Date();
    // const currentGoals = await getGoalWithDate(day);
    let sqliteDay = day.toISOString().split('T')[0];
    //Need to learn why date is not transferring over...

    useEffect(() => {
        loadCurrentGoals();
    }, []);

    //Database issues solved, trying to get this to load properly now... https://www.dbpro.app/blog/expo-sqlite
    async function loadCurrentGoals() {
        const currentGoals = await getGoalWithDate(day);
        setDailyGoals(currentGoals);
        console.log(dailyGoals);
    }

    return (
        <SafeAreaProvider style={styles.container}>
            <SafeAreaView>
                <ScrollView>

                    <View>
                        <Text> {sqliteDay} </Text>

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
                                setGoal(userGoal, sqliteDay, false);
                                // allRows();
                                // loadCurrentGoals();
                                // console.log(sqliteDay);
                            }
                            }
                            title="Enter"
                        />


                    </Pressable>

                </ScrollView>
                <FlatList
                    data={dailyGoals}
                    renderItem={({ item }) => <GoalDisplay goalText={item.goalText} />}
                    keyExtractor={(item) => item.id.toString()}
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
    }
})

export default Main;