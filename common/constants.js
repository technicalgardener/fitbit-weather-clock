const millisecondsPerSecond   = 1000;
const millisecondsPerMinute   = 1000 * 60;
export const secondsPerHour   = 60 * 60;
export const weatherWakeTime  = 30 * millisecondsPerMinute;
export const activityWakeTime = 15 * millisecondsPerSecond;
export const locationTimeout  = 60 * millisecondsPerSecond;

export const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
export const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

export const conditions = {
    clear:           0,
    scatteredClouds: 1,
    cloudy:          2,
    rain:            3,
    thunderstorm:    4,
    snow:            5,
    atmosphere:      6,
    undef:           9
}