import { conditions } from "./constants";
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

export let mapCode = {
    200: conditions.thunderstorm,
    201: conditions.thunderstorm,
    202: conditions.thunderstorm,
    210: conditions.thunderstorm,
    211: conditions.thunderstorm,
    212: conditions.thunderstorm,
    221: conditions.thunderstorm,
    230: conditions.thunderstorm,
    231: conditions.thunderstorm,
    232: conditions.thunderstorm,

    300: conditions.rain,
    301: conditions.rain,
    302: conditions.rain,
    310: conditions.rain,
    311: conditions.rain,
    312: conditions.rain,
    313: conditions.rain,
    314: conditions.rain,
    321: conditions.rain,
    500: conditions.rain,
    501: conditions.rain,
    502: conditions.rain,
    503: conditions.rain,
    504: conditions.rain,
    511: conditions.rain,
    520: conditions.rain,
    521: conditions.rain,
    522: conditions.rain,
    531: conditions.rain,

    600: conditions.snow,
    601: conditions.snow,
    602: conditions.snow,
    611: conditions.snow,
    612: conditions.snow,
    613: conditions.snow,
    615: conditions.snow,
    616: conditions.snow,
    620: conditions.snow,
    621: conditions.snow,
    622: conditions.snow,

    701: conditions.atmosphere,
    711: conditions.atmosphere,
    721: conditions.atmosphere,
    731: conditions.atmosphere,
    741: conditions.atmosphere,
    751: conditions.atmosphere,
    761: conditions.atmosphere,
    762: conditions.atmosphere,
    771: conditions.atmosphere,
    781: conditions.atmosphere,

    800: conditions.clear,

    801: conditions.scatteredClouds,
    802: conditions.scatteredClouds,
    803: conditions.scatteredClouds,

    804: conditions.cloudy
}