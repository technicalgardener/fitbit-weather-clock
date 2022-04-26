import { secondsPerHour } from "./constants";

export function zeroPad(i) {
    if (i < 10) {
        i = "0" + i;
    }

    return i;
}

export function toFahrenheit(data) {
    data.temp = Math.round((data.temp * 1.8) - 459.67);
    data.unit = "F";

    return data;
}

export function isSunrise(data) {
    if (data.currentTime <= (data.sunrise + 1 * secondsPerHour ) && data.currentTime >= data.sunrise) {
        return true;
    }

    return false;
}

export function isSunset(data) {
    if (data.currentTime >= (data.sunset - 1 * secondsPerHour ) && data.currentTime <= data.sunset) {
        return true;
    }

    return false;
}

export function isDay(data) {
    if (data.currentTime > data.sunrise && data.currentTime < data.sunset) {
        return true;
    }
    
    return false;
}