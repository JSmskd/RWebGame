#include <SPI.h>
#include <Ethernet.h>
#include <SD.h>

byte mac[] = { 0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };
IPAddress ip(192, 168, 1, 177);

void setup() {
  Serial.begin(9600);
  
  Ethernet.begin(mac, ip);
    if (Ethernet.hardwareStatus() == EthernetNoHardware)
      Serial.println("Ethernet shield was not found");
    if (Ethernet.linkStatus() == LinkOFF)
      Serial.println("Ethernet cable is not connected.");
  writeFile("plans.md");
}
void loop() {
  // put your main code here, to run repeatedly:


}
int writeFile(char location[]) {
  // char *smthn = strtok(location,".");
  // Serial.println(smthn);
if (!SD.begin(4)) {
    Serial.println(F("no sd card"));
    while (1);
  }

  Serial.println(F("sd card :)"));
  File dataFile = SD.open(location);

  if (dataFile) {

    while (dataFile.available()) {
       Serial.write(dataFile.read());
    }
    dataFile.close();
  } else {
    Serial.println(":(");
  }
  return 0;
}
