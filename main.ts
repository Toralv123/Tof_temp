let RH_i_bakken = 0
let RH = 0
let Temp = 0
OLED.init(128, 64)
datalogger.setColumnTitles(
"Temp:",
"RH i Bakken:",
"RH:"
)
ESP8266_IoT.initWIFI(SerialPin.P8, SerialPin.P12, BaudRate.BaudRate115200)
ESP8266_IoT.connectWifi("Helios", "Toralv2110")
ESP8266_IoT.connectThingSpeak()
ESP8266_IoT.setData(
"25YC8X8T5ITHGG2Y",
Temp,
RH,
RH_i_bakken
)
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
    if (ESP8266_IoT.wifiState(true)) {
        OLED.writeStringNewLine("Wife koblet til")
    } else {
        OLED.writeStringNewLine("Wife ikke koblet til")
    }
    if (ESP8266_IoT.thingSpeakState(true)) {
        OLED.writeStringNewLine("ThingsSpeak koblet til")
    } else {
        OLED.writeStringNewLine("ThingsSpeak ikke koblet til")
    }
    OLED.writeStringNewLine("Temp:" + Temp)
    OLED.writeStringNewLine("RH:" + RH)
    OLED.writeStringNewLine("RH i bakken:" + RH_i_bakken)
    ESP8266_IoT.uploadData()
    basic.pause(7000)
})
loops.everyInterval(86400000, function () {
	
})
