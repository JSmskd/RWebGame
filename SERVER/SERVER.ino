#include <SdFat.h>
#include <SPI.h>
#include <Ethernet.h>
#define SPI_SPEED SD_SCK_MHZ(50)

// #include "sdios.h"


///Root/ INDEX /index.html
String index = "webpage";

///mac adress to use
byte mac[6] = { 0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };

///ip adress to use   192.168.1.177/index.html
IPAddress ip(192, 168, 1, 177);

///
EthernetServer server(80);

// ArduinoInStream cin(Serial, cinBuf, sizeof(cinBuf));


// char cinBuf[40];
SdFs sd;
// int chipSelect;
void setup() {
  Serial.begin(9600);
  Serial.println("");
  Ethernet.begin(mac, ip);
  if (Ethernet.hardwareStatus() == EthernetNoHardware)
    Serial.println("Ethernet shield was not found");
  if (Ethernet.linkStatus() == LinkOFF)
    Serial.println("Ethernet cable is not connected.");
  server.begin();

  // printDirectory();
  // test("webpage/global.css");
  // test("webpage/wheel/index.htm");
  // test("webpage/index.htm");
  // test("README.md");
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

    // client.println("HTTP/1.1 404 Not Found");
    // client.println("HTTP/1.1 405 Method Not Allowed");
    // client.println("HTTP/1.1 200 OK");

    // if (HTTP_req.indexOf("GET ") == 0) {
    // client.println("Content-Type: text/html");
    // client.println("Connection: close");
    // client.println();


    String fileName = HTTP_req.substring(HTTP_req.indexOf("GET  ") + 5, HTTP_req.indexOf(" HTTP"));
    serv(client, fileName);

    client.stop();
    // }
  }
}

// void printDirectory() {
//   // Serial.println("Files found (date time size name):");
//   // sd.ls(LS_R | LS_DATE | LS_SIZE);
// }
String retStat(int status) {

  String prefix = String(status) + " ";

  switch (status) {

      //////////////// 2XX Success
    case 200:
      return prefix + "OK";

      //////////////// 3XX rederect


      //////////////// 4XX  Client Error
    case 400:  //Bad Request
      return prefix + "Bad Request";

    case 401:  //Unauthorized
      return prefix + "Unauthorized";

    case 403:  // Forbidden
      return prefix + "Forbidden";

    case 404:  //Not Found
      return prefix + "Not Found";


      //////////////// 5XX Server Error
    case 0:
      return prefix + "ERR";

      //////////////// not specified
    default:
      return prefix + "ERR";
  }
}

void serv(EthernetClient client, String fileName) {
  if (!sd.begin(4, SPI_SPEED)) {
    // Serial.println("500");
    // return 500;
  }
  // SD.
  // Serial.println(use);
  //sd.open(index + location);
  String location = fileName;
  FsFile dataFile = sd.open(index + location);

  Serial.println(fileName);
  if (dataFile.isFile()) {
    Serial.println("reg");

  } else {
    dataFile.close();
    dataFile = sd.open(index + fileName + "index.html");
    if (dataFile.isFile()) {
      Serial.println("ind");
      location = fileName + "index.html";
    } else {
      dataFile.close();
      dataFile = sd.open(index + fileName + "/index.html");
      if (dataFile.isFile()) {
        Serial.println("/ind");
        location = fileName + "/index.html";

      } else {
        dataFile.close();
        Serial.println("ERRRR");
        location = "/404.html";
        dataFile = sd.open(index + location);
      }
    }
  }

  //////////////////////////////

  client.print("HTTP/1.1 ");
  // char* a = retStat(status).c_str();
  // Serial.println(a);
  // client.println(a);
  int HEADERS = 1;
  char* blank[2] = { "", "" };
  char* Attributes[HEADERS][2] = {
    { "Content-Type", "*/*" },
    { "Cache-Control", "max-age=120" }
  };
  int lastDot = fileName.lastIndexOf(".");
  // Serial.println(lastDot);
  if (lastDot != -1 || lastDot < fileName.lastIndexOf("/")) {
    String fileType = fileName.substring(lastDot + 1);
    // Serial.println(fileName.substring(fileName.lastIndexOf("/")));

    if (fileType == "ico") {
      Attributes[0][1] = "image/vnd.microsoft.icon";
      Attributes[1][1] = "max-age=31556926";

      // } else if (fileType == "webp") {
      //   Attributes[0][1] = "image/webp";

    } else if (fileType == "svg") {
      Attributes[0][1] = "image/svg+xml";


    } else if (fileType == "html" || fileType == "htm") {
      Attributes[0][1] = "text/html";

    } else if (fileType == "js") {
      Attributes[0][1] = "text/javascript";

      // } else if (fileType == "json") {
      //   Attributes[0][1] = "application/json";

    } else if (fileType == "css") {
      Attributes[0][1] = "text/css";


      // } else if (fileType == "webmanifest") {
      //   Attributes[0][1] = "application/manifest+json";


    } else if (fileType == "txt") {
      Attributes[0][1] = "text/plain";

      // } else if (fileType == "md") {
      //   Attributes[0][1] = "text/markdown";
      //
      // } else if (fileType == "") {
      //   Attributes[0][1] = "";

    } else {
      Attributes[0][1] = "text/html; charset=utf-8";
    }
  }
  defHeadder(client);
  for (int i = 0; i < HEADERS; i++) {
    outputHeadder(client, Attributes[i][0], Attributes[i][1]);
  }
  client.println();  //end of headers

  // dataFile = sd.open(index + "/" + location);
  if (dataFile) {
    while (dataFile.available())
      client.write(dataFile.read());

    dataFile.close();
  }
}

// String ct = "";  //Content-Type
//     while (client.connected()) {
//       if (client.available()) {
//         String HTTP_header = client.readStringUntil('\n');  // read the header line of HTTP request
//         if (HTTP_header.startsWith("Accept: ")) {
//           ct = HTTP_header.substring(8);
//           ct.replace("\r", "");
//           int ffo = ct.indexOf(",");
//           int to = ct.length();
//           if (ffo > 0) {
//             to = ffo;
//           }
//           ct = ct.substring(0, to);
//           // ct = ct.readStringUntil(";");
//         }
//         if (HTTP_header.equals("\r"))  // the end of HTTP request
//           break;
//       }
//     }
void defHeadder(EthernetClient client) {
  outputHeadder(client, "Connection", "close");
  outputHeadder(client, "Access-Control-Allow-Origin", "*");
  outputHeadder(client, "Vary", "Origin");
  outputHeadder(client, "X-Content-Type-Options", "no-sniff");
  // outputHeadder(client, "Cache-Control", "max-age=120");
}
void outputHeadder(EthernetClient client, char* key, char* value) {
  if (key != "" && value != "") {
    client.print(key);
    client.print(": ");
    client.println(value);
  }  //else {
     //   Serial.print("X => ");
     //   Serial.print(Attributes[i][0]);
     //   Serial.print(": ");
     //   Serial.println(Attributes[i][1]);
     // }
}

//void listDir(fs::FS& fs, const char* dirname, uint8_t levels) {
// void listDir(SdFat audio_SD, const char* dirname, uint8_t levels) {
// Serial.printf("Listing directory: %s\n", dirname);

// 	File root = audio_SD.open(dirname);
// 	if (!root) {
// 		Serial.println("Failed to open directory");
// 		return;
// 	}
// 	if (!root.isDirectory()) {
// 		Serial.println("Not a directory");
// 		return;
// 	}

// 	File file = root.openNextFile();

// 	while (file) {
// 		if (file.isDirectory()) {
// 			Serial.print("  DIR : ");
// 			Serial.println(file.name());
// 			if (levels) {
// 				listDir(audio_SD, file.name(), levels - 1);
// 			}
// 		}
// 		else {
// 			Serial.print("  FILE: ");
// 			Serial.print(file.name());
// 			Serial.print("  SIZE: ");
// 			Serial.print(file.size());
// 		}
// 		file = root.openNextFile();
// 	}
// }