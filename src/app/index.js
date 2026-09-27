import { useState } from 'react';
import { StyleSheet, TextInput, Text, ScrollView, StatusBar, Pressable } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

const Main = () => {
    const [userGoal, setUserGoal] = useState('Set a goal for the day!')

    return (
        <SafeAreaProvider style={styles.container}>
            <SafeAreaView>
                <ScrollView>
                    <Pressable>
                        <TextInput 
                            style={styles.input}
                            onChangeText={setUserGoal}
                            value={userGoal}
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