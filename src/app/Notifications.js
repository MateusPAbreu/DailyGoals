import * as Notifications from 'expo-notifications';

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

export function getUserPermission(){
    
}

export default Notify