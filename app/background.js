import { isDay, isSunrise, isSunset, isNight } from "../common/util";
import document from "document";

let currentCondition;
let lastCondition;
let currentStatus;
let lastStatus = {
  isDay: false,
  isNight: false,
  isSunrise: false,
  isSunset: false
};

const img = document.getElementById("img");

// Change Background Image
// Evaluates time of day status and current weather conditions to control which
// background image is chosen to display. If there is no change in status or
// conditions from the last poll, then the display is not updated to prevent
// an unnecessary call to redraw the same background image.
export function changeBackgroundImg(data) {
    //console.log(`Performing background image check`);
    
    currentCondition = data.conditionCode;
    currentStatus = {
        isDay:     isDay(data),
        isNight:   isNight(data),
        isSunrise: isSunrise(data),
        isSunset:  isSunset(data)
    };
  
    //console.log(`Status changed? ` + statusChanged());
    //console.log(`Condition changed? ` + conditionChanged());

    if (statusChanged() && conditionChanged()) {
        if(currentStatus.isDay) {
            console.log(`Condition: ${currentCondition}`);
            if (currentStatus.isSunrise) {
                switch (currentCondition) {
                  case 0: img.href = "images/SunriseClear.png";
                    break;
                  case 1: img.href = "images/SunriseScatteredClouds.png";
                    break;
                  case 2: img.href = "images/SunrisetScatteredClouds.png";
                    break;
                  case 3: img.href = "images/SunriseOvercast.png";
                    break;
                  case 4: img.href = "images/SunriseOvercast.png";
                    break;
                  case 8: img.href = "images/SunriseScatteredClouds.png";
                    break;
                  default: img.href = "images/SunriseOvercast.png"
                    break;
                }
            }

            else if (currentStatus.isSunset) {
                switch (currentCondition) {
                  case 0: img.href = "images/SunsetClear.png";
                    break;
                  case 1: img.href = "images/SunsetFewClouds.png";
                    break;
                  case 2: img.href = "images/SunsetScatteredClouds.png";
                    break;
                  case 3: img.href = "images/SunsetOvercast.png";
                    break;
                  case 4: img.href = "images/SunsetOvercast.png";
                    break;
                  case 8: img.href = "images/SunsetScatteredClouds.png";
                    break;
                  default: img.href = "images/SunsetOvercast.png";
                    break;
                }
            }

            else {
                switch (currentCondition) {
                  case 0: img.href = "images/DayClear.png";
                    break;
                  case 1: img.href = "images/DayFewClouds.png";
                    break;
                  case 2: img.href = "images/DayScatteredClouds.png";
                    break;
                  case 3: img.href = "images/DayBrokenClouds.png";
                    break;
                  case 4: img.href = "images/DayOvercast.png";
                    break;
                  case 5: img.href = "images/DayRain.png";
                    break;
                  case 6: img.href = "images/NightOvercast.png";
                    break;
                  case 7: img.href = "images/DayRain.png";
                    break;
                  case 8: img.href = "images/DayAtmosphere.jpg";
                    break;
                  default: img.href = "images/DayFewClouds.png";
                    break;
                }
            }
        }

        else {
            switch (currentCondition) {
              case 0: img.href = "images/NightClear.png";
                break;
              case 1: img.href = "images/NightFewClouds.png";
                break;
              case 2: img.href = "images/NightScatteredClouds.png";
                break;
              case 3: img.href = "images/NightOvercast.png";
                break;
              case 4: img.href = "images/NightOvercast.png";
                break;
              case 5: img.href = "images/NightRain.png";
                break;
              case 6: img.href = "images/NightRain.png";
                break;
              case 7: img.href = "images/NightRain.png";
                break;
              case 8: img.href = "images/NightAtmosphere.png";
                break;
              default: img.href = "images/NightFewClouds.png";
                break;
            }
        }

        lastStatus = currentStatus;
        lastCondition = currentCondition
    }
}


// Status Changed
// Helper function for changeBackgroundImg
function statusChanged() {
    if (currentStatus.isDay !== lastStatus.isDay || currentStatus.isSunrise !== lastStatus.isSunrise || currentStatus.isSunset !== lastStatus.isSunset || currentStatus.isNight !== lastStatus.isNight) {
        return true;
    }

    return false;
}

// Condition Changed
// Helper function for changeBackgroundImg
function conditionChanged() {
    if (currentCondition !== lastCondition) {
        return true;
    }
    
    return false;
}