#include "SERVER.hpp"
// #include "funcs.cpp"

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

  printDirectory();
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
    header(client, 200, fileName);
    writeFile(client, fileName, 0);

    client.stop();
    // }
  }
}

//write to client from file
void writeFile(EthernetClient client, String location, int isIndex) {
  //0:ok
  //1:not found
  //2:no MSDC
  // char *smthn = strtok(location,".");
  // Serial.println(smthn);

  // String use = location;

  // if (isIndex == 0) {
  //   use = index + use;
  // }

  if (!sd.begin(4, SPI_SPEED)) {
    // Serial.println("500");
    // return 500;
  }
  // SD.
  // Serial.println(use);
  FsFile dataFile = sd.open(index + location);

  if (dataFile) {

    while (dataFile.available()) {
      client.write(dataFile.read());
    }
    dataFile.close();
  }  // else {
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

void printDirectory() {
  // Serial.println("Files found (date time size name):");
  // sd.ls(LS_R | LS_DATE | LS_SIZE);
}
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
void header(EthernetClient client, int status, String fileName) {
  client.print("HTTP/1.1 ");
  char* a = retStat(status).c_str();
  Serial.println(a);
  client.println(a);
  int HEADERS = 6;
  char* blank[2] = { "", "" };
  char* Attributes[HEADERS][2] = {
    { "Connection", "close" }, //0
    { "Access-Control-Allow-Origin", "*" }, //1
    { "Vary", "Origin" }, //2
    { "", "" }, //3
    {"X-Content-Type-Options", "no-sniff"}, //4
    {"Cache-Control", "max-age=120"} //5
    };
  int lastDot = fileName.lastIndexOf(".");
  Serial.println(lastDot);
  if (lastDot != -1) {
    String fileType = fileName.substring(lastDot + 1);
    char* ct = "*/*";
    Serial.println(fileType);

    if (fileType == "ico") {
      ct = "image/vnd.microsoft.icon";
    } else if (fileType == "js") {
      ct = "text/javascript; charset=utf-8";
    } else if (fileType == "html") {
      ct = "text/html";
    }
    Attributes[3][0] = "Content-Type";
    Attributes[3][1] = ct;
    // Attributes.
  }
  for (int i = 0; i < HEADERS; i++) {
    if (!(Attributes[i][0] == "" || Attributes[i][1] == "")) {
      client.print(Attributes[i][0]);
      client.print(": ");
      // Serial.println(Attributes[i][0]);
      // Serial.println(Attributes[i][1]);
      client.println(Attributes[i][1]);
    } //else {
    //   Serial.print("X => ");
    //   Serial.print(Attributes[i][0]);
    //   Serial.print(": ");
    //   Serial.println(Attributes[i][1]);
    // }
  }
  client.println();
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
