#include <SPI.h>
#include <Ethernet.h>
#include <SD.h>


String index = "webpage";
byte mac[] = { 0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };
IPAddress ip(192, 168, 1, 177);
EthernetServer server(80);


File root;
void setup() {
  Serial.begin(9600);
  Serial.println("");
  Ethernet.begin(mac, ip);
  if (Ethernet.hardwareStatus() == EthernetNoHardware)
    Serial.println("Ethernet shield was not found");
  if (Ethernet.linkStatus() == LinkOFF)
    Serial.println("Ethernet cable is not connected.");
  server.begin();
  SD.begin(4);
  root = SD.open("/");

  printDirectory(root, 0);
  // test("webpage/global.css");
  // test("webpage/wheel/index.htm");
  // test("webpage/index.htm");
  // test("README.md");
}

void test(String lo) {
  File f = SD.open(lo);
  if (f) {
     while (f.available()) {
        Serial.write(f.read());
      }
    Serial.println("lo");
    f.close();
  } else {
    Serial.println("nope");
  }
}
void loop() {
  // put your main code here, to run repeatedly:
  EthernetClient client = server.available();

  if (client) {
    // read the first line of HTTP request header
    String HTTP_req = "";
    while (client.connected()) {
      if (client.available()) {
        Serial.println("New HTTP Request");
        HTTP_req = client.readStringUntil('\n');  // read the first line of HTTP request
        Serial.print("<< ");
        Serial.println(HTTP_req);  // print HTTP request to Serial Monitor
        break;
      }
    }

    // read the remaining lines of HTTP request header
    while (client.connected()) {
      if (client.available()) {
        String HTTP_header = client.readStringUntil('\n');  // read the header line of HTTP request

        if (HTTP_header.equals("\r"))  // the end of HTTP request
          break;

        //Serial.print("<< ");
        //Serial.println(HTTP_header);  // print HTTP request to Serial Monitor
      }
    }

    // client.println("HTTP/1.1 404 Not Found");
    // client.println("HTTP/1.1 405 Method Not Allowed");
    // client.println("HTTP/1.1 200 OK");

    // if (HTTP_req.indexOf("GET ") == 0) {
      // client.println("Content-Type: text/html");
      // client.println("Connection: close");
      // client.println();    
      header(client, 200);
      writeFile(client, HTTP_req.substring(HTTP_req.indexOf("GET  ") + 5, HTTP_req.indexOf(" HTTP")), 0);

      client.flush();
      client.flush();
      delay(10);
      client.stop();
    // }
  }
}
void header(EthernetClient client, int status) {
  client.print("HTTP/1.1 ");
  client.print(status);
  // client.print("HTTP/1.1 200 ERR");
  client.println(" ERR");
  client.println("Connection: close");  // the connection will be closed after completion of the response
  client.println("Access-Control-Allow-Origin: *");
  client.println("Vary: Origin");
  client.println();                     // the separator between HTTP header and body
}

//write to client from file
void writeFile(EthernetClient client, String location, int isIndex) {
  //0:ok
  //1:not found
  //2:no MSDC
  // char *smthn = strtok(location,".");
  // Serial.println(smthn);

  String use = location;

  if (isIndex == 0) {
    use = index + use;
  }

  if (!SD.begin(4)) {
    return 500;
  }
  // SD.
  Serial.println(use);
  File dataFile = SD.open(use);

  if (dataFile) {

    while (dataFile.available()) {
      client.write(dataFile.read());
    }
    dataFile.close();
  }// else {
  //   if (isIndex == -1) {
  //     if (isIndex == 0) {
  //       writeFile(client, use + "\\index.html", true);
  //     }
  //     // header(400)
  //     writeFile(client, "404.html", -1);
  //   // }
  //   // return 404;
  // }
  // return 200;
}

void printDirectory(File dir, int numTabs) {

  while (true) {

    File entry = dir.openNextFile();

    if (!entry) {

      // no more files

      break;
    }

    for (uint8_t i = 0; i < numTabs; i++) {

      Serial.print('\t');
    }

    Serial.print(entry.name());

    if (entry.isDirectory()) {

      Serial.println("/");

      printDirectory(entry, numTabs + 1);

    } else {

      // files have sizes, directories do not

      Serial.print("\t\t");

      Serial.println(entry.size(), DEC);
    }

    entry.close();
  }
}
