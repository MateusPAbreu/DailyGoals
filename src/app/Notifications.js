import * as Notifications from 'expo-notifications';
import { lastRow } from '../../db_manager/configStorage';

function Notify() {
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldPlaySound: false,
            shouldSetBadge: true,
            shouldShowBanner: true,
            shouldShowList: true
        }),
    });
}

export async function getUserPermission(){
    const {status: existingStatus} = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted'){
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
    }
    if (finalStatus !== 'granted'){
        alert('Failed to get push token for push notification');
        return;
    }
}

export async function firstDailyReminder(){
    const info = lastRow();
    console.log(info)

    if (!info || info === null){
        console.log("Info is null");
    }else{
        const id = await Notifications.scheduleNotificationAsync({
            identifier: 'reminder',
            content: {
                title: "What's a goal for the day?",
                body: "Set a goal",
                sound: true,
            },
            trigger:{
                type: Notifications.SchedulableTriggerInputTypes.DAILY,
                hour: info.firstHour,
                minute: time.getMinutes(),
                repeats: true,
            }
        });
    }
}

export default Notify