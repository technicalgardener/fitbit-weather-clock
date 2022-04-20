import { HeartRateSensor } from "heart-rate";
import { me as appbit } from "appbit";
import { BodyPresenceSensor } from "body-presence";
import { display } from "display";

let handleCallback;
let rate;

// Initialize Heart Rate Monitor
// This function starts the hr monitor service in the device
// and reads the live hr data to be displayed to the screen.
// If a body presence sensor exists on the device it will start and
// stop the service if the device is being worn or not.
export function initialize(callback) {
  handleCallback = callback;
  if (HeartRateSensor && appbit.permissions.granted("access_heart_rate")) {
    const hrm = new HeartRateSensor({ frequency: 1, batch: 10});
    hrm.addEventListener("reading", () => {
      rate = (hrm.heartRate ? hrm.heartRate : 0);
      if (typeof handleCallback === "function") {
        handleCallback({ hr: `${rate}` });
      }
    });
    
  display.addEventListener("change", () => {
    display.on ? hrm.start() : hrm.stop();
  });
  hrm.start();
  }

  if (BodyPresenceSensor) {
    const body = new BodyPresenceSensor();
    body.addEventListener("reading", () => {
    if (!body.present) {
      hrm.stop();
    } else {
      hrm.start();
      }
    });
    body.start();
  }
}