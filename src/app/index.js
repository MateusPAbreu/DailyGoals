import { useState } from 'react';
import { Button, Pressable, ScrollView, StatusBar, StyleSheet, TextInput } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { allRows, initDatabase, setGoal } from '../../db_manager/goalsStorage';

const Main = () => {
    initDatabase();
    const [userGoal, setUserGoal] = useState('Set a goal for the day!');
    const day = new Date();
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
                                setGoal(userGoal, day.toISOString, false);
                                allRows();
                                console.log(day.toISOString);
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