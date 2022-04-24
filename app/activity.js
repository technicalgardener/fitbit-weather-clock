import { me } from "appbit";
import { activityWakeTime } from "../common/constants";
import { today } from "user-activity";
import { display } from "display";

let handleCallback;
let intervalID;
const accessPermission = me.permissions.granted("access_activity");

export function initialize(callback) {
    handleCallback = callback;
  
    if (accessPermission) {
        display.addEventListener("change", () => {
            if (display.on) {
                activityHandler();
                intervalID = setInterval(activityHandler, activityWakeTime);
            } else {
                clearInterval(intervalID);
            }
        });
        
    } else {
        console.error(`Permission not granted for user activity`);
        callback({ steps: 0 });
    }
}


function activityHandler() {
        handleCallback({ steps: (today.adjusted.steps || 0)});
}