let UV = 0
let Temp = 0
let RH = 0
OLED.init(128, 64)
basic.forever(function () {
    RH = smarthome.dht11Sensor(DigitalPin.P1, smarthome.DHT11_state.DHT11_humidity)
    basic.pause(2000)
    Temp = smarthome.dht11Sensor(DigitalPin.P1, smarthome.DHT11_state.DHT11_temperature_C)
    basic.pause(2000)
    UV = smarthome.UVLevel(AnalogPin.P3)
    basic.pause(2000)
    OLED.clear()
    OLED.writeStringNewLine("Temp:" + Temp)
    OLED.writeStringNewLine("RH:" + RH)
    OLED.writeStringNewLine("UV:" + UV)
})
