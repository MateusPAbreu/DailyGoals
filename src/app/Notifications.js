import * as Notifications from 'expo-notifications';
import { getNotificationTime } from '../../db_manager/configStorage';

export function Notify() {
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
    const info = await getNotificationTime();
    console.log("Test")
    console.log(JSON.stringify(info, null, 2))
    // console.log(JSON.stringify(info.pop()));
    const notifs = JSON.parse(JSON.stringify(info));
    
    for(var key in notifs){
        console.log(key)
    }

    // if (!info || info === null){
    //     console.log("Info is null");
    // }else{
    //     const id = await Notifications.scheduleNotificationAsync({
    //         identifier: 'reminder',
    //         content: {
    //             title: "What's a goal for the day?",
    //             body: "Set a goal",
    //             sound: true,
    //         },
    //         trigger:{
    //             type: Notifications.SchedulableTriggerInputTypes.DAILY,
    //             hour: info.firstHour,
    //             minute: time.getMinutes(),
    //             repeats: true,
    //         }
    //     });
    // }
}

export default Notify