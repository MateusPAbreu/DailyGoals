import { useState } from 'react';
import { StyleSheet, TextInput, Text, ScrollView, StatusBar, Pressable, Button } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { setGoal, initDatabase } from '../../db_manager/goalsStorage';

const Main = () => {
    initDatabase();
    const [userGoal, setUserGoal] = useState('Set a goal for the day!')

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
                            onPress={() => console.log(userGoal)}
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