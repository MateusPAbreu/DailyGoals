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

    //notifs first is inside [], so you need the index 0 to access the internal content, and the "firstNot" specify which value to take from. Parse int makes it a number
    var firstNotificationHour = parseInt(notifs[0]["firstNot"].slice(0,2));
    var firstNotificationMin = parseInt(notifs[0]["firstNot"].slice(3,5));

    console.log(firstNotificationHour + " " + firstNotificationMin)

    var lastNotificationHour = notifs[0]["lastNot"].slice(0, 2);
    var lastNotificationMin = notifs[0]["lastNot"].slice(3,5);

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
                hour: firstNotificationHour,
                minute: firstNotificationMin,
                repeats: true,
            }
        });
    }
}

export default Notify