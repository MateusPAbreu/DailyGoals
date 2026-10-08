import { useState } from 'react';
import { Button, Pressable, ScrollView, StatusBar, StyleSheet, TextInput } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { getGoalWithDate, initDatabase, setGoal } from '../../db_manager/goalsStorage';

{/*
    TODO:

    - Implement dynamic rendering with flatlist
*/}
const Main = () => {
    initDatabase();
    const [userGoal, setUserGoal] = useState('Set a goal for the day!');
    const [dailyGoals, setDailyGoals] = useState([]);
    const day = new Date();
    let sqliteDay = day.toISOString().split('T')[0];
    //Need to learn why date is not transferring over...

    return (
        <SafeAreaProvider style={styles.container}>
            <SafeAreaView>
                <ScrollView>
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
                                setDailyGoals(getGoalWithDate(sqliteDay));
                                console.log(dailyGoals);
                            }
                            }
                            title="Enter"
                        />
                        
                    </Pressable>
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    container:{
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