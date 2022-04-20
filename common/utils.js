// Zero Padding
// adds a zero to all 1 digit hours for 24h clock
export function zeroPad(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

// Convert to Celsius
// kelvin -> celsius
export function toCelsius(data) {
   data.temp =  Math.round(data.temp - 273.15);
   data.unit = "C";
  
  return data
}

// Convert to Fahrenheit
// kelvin -> fahrenheit
export function toFahrenheit(data) {
   data.temp =  Math.round((data.temp * 1.8) - 459.67);
   data.unit = "F";
  
  return data
}