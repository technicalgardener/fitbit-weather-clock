import { me } from "appbit";
import { activityWakeTime } from "../common/constants";
import { today } from "user-activity";
import { display } from "display";

let handleCallback;
let intervalID;
const accessPermission = me.permissions.granted("access_activity");

// Initialize Activity
// This function starts and controls the peeking and return of step activity.
// The peeking of step activity data only occurs if the display is on at an
// interval of the value of activityWakeTime. When the display is off
// the call for step activity is stopped to conserve battery and prevent
// unnecessary updates.
export function initialize(callback) {
    handleCallback = callback;
  
    if (accessPermission) {
        display.addEventListener("change", () => {
            if (display.on) {
                activityHandler();
                intervalID = setInterval(activityHandler, activityWakeTime);
            } 
            
            else {
                clearInterval(intervalID);
            }
        });
    } 

    else {
        console.error(`Permission not granted for user activity`);
        callback({ steps: 0 });
    }
}

// Activity Handler
// Returns the step activity data to the callback function passed
// as a parameter to the initialize function.
function activityHandler() {
        handleCallback({ steps: (today.adjusted.steps || 0)});
}