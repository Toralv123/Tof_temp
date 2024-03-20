let RH_i_bakken = 0
let Temp = 0
let RH = 0
OLED.init(128, 64)
datalogger.setColumnTitles(
"Temp:",
"RH i Bakken:",
"RH:"
)
ESP8266ThingSpeak.connectWifi(
SerialPin.P8,
SerialPin.P12,
BaudRate.BaudRate115200,
"iPhone (34)",
"Toralv123"
)
if (ESP8266ThingSpeak.isWifiConnected()) {
    basic.showIcon(IconNames.Happy)
} else {
    basic.showIcon(IconNames.Sad)
}
basic.forever(function () {
    RH = Environment.dht11value(Environment.DHT11Type.DHT11_humidity, DigitalPin.P1)
    Temp = Environment.dht11value(Environment.DHT11Type.DHT11_temperature_C, DigitalPin.P1)
    RH_i_bakken = Environment.ReadSoilHumidity(AnalogPin.P2)
    datalogger.log(
    datalogger.createCV("RH:", RH),
    datalogger.createCV("Temp:", Temp),
    datalogger.createCV("RH i Bakken:", RH_i_bakken)
    )
    OLED.clear()
    if (ESP8266ThingSpeak.isWifiConnected()) {
        OLED.writeStringNewLine("Wife koblet til")
    } else {
        OLED.writeStringNewLine("Wife ikke koblet til")
    }
    if (ESP8266ThingSpeak.isThingSpeakConnected()) {
        OLED.writeStringNewLine("ThingsSpeak koblet til")
    } else {
        OLED.writeStringNewLine("ThingsSpeak ikke koblet til")
    }
    OLED.writeStringNewLine("Temp:" + Temp)
    OLED.writeStringNewLine("RH:" + RH)
    OLED.writeStringNewLine("RH i bakken:" + RH_i_bakken)
    basic.pause(7000)
    ESP8266ThingSpeak.connectThingSpeak(
    "https://api.thingspeak.com/channels/2435468/feeds.json?api_key=RQRSHMA3WW508MCB&results=2",
    "25YC8X8T5ITHGG2Y",
    Temp,
    RH,
    RH_i_bakken,
    0,
    0,
    0,
    0,
    0
    )
})
loops.everyInterval(86400000, function () {
	
})
