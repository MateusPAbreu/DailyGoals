import { SymbolView } from 'expo-symbols';
import { useEffect, useState } from 'react';
import { Button, FlatList, Pressable, ScrollView, StatusBar, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { isEnabled } from 'react-native/Libraries/Performance/Systrace';
import { getGoalWithDate, initDatabase, setGoal } from '../../db_manager/goalsStorage';

{/*
    TODO:
    So the array length first gave me 0 then undefined for every following addition... figure it out.
*/}

const GoalDisplay = ({ goalText }) => (
    <View>
        <Text>{goalText}</Text>
        <Switch
            trackColor={{false:'#757577', true: '#91b0ff'}}
            thumbColor={isEnabled ?  '#f5dd4b' : '#f4f3f4'}
            // onValueChange={}
        />
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
    // async function loadCurrentGoals() {
    //     const currentGoals = await getGoalWithDate(sqliteDay);
    //     setDailyGoals(currentGoals);
    //     console.log(dailyGoals);
    // }

    async function loadDailyGoals(){                  
        await  setGoal(userGoal, sqliteDay, false);
        const currentGoals = await getGoalWithDate(sqliteDay);
        setDailyGoals(currentGoals);
    }

    return (
        <SafeAreaProvider style={styles.container}>
            <SafeAreaView>
                <ScrollView>

                    <View style={styles.header}>
                        <SymbolView
                            name={{ ios: 'arrow.backward', android: 'arrow_back', web: 'arrow_back' }}
                            tintColor="#36454F"
                            size={20}
                        />
                        <Text> {sqliteDay} </Text>
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
                                loadDailyGoals()
                                
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
                    renderItem={({ item }) => <GoalDisplay goalText={item.goalText} />}
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
    }
})

export default Main;