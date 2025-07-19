#include "SERVER.hpp"
// #include "funcs.cpp"

// ArduinoInStream cin(Serial, cinBuf, sizeof(cinBuf));


char cinBuf[40];
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
String ct = ""; //Content-Type
    while (client.connected()) {
      if (client.available()) {
        String HTTP_header = client.readStringUntil('\n');  // read the header line of HTTP request
        if (HTTP_header.startsWith("Accept: ")) {
          ct = HTTP_header.substring(8);
            ct.replace("\r","");
            int ffo = ct.indexOf(",");
            int to = ct.length();
            if (ffo > 0) {
              to = ffo;
            }
            ct = ct.substring(0,to);
            // ct = ct.readStringUntil(";");
        }
        if (HTTP_header.equals("\r"))  // the end of HTTP request
          break;
      }
    }

    // client.println("HTTP/1.1 404 Not Found");
    // client.println("HTTP/1.1 405 Method Not Allowed");
    // client.println("HTTP/1.1 200 OK");

    // if (HTTP_req.indexOf("GET ") == 0) {
      // client.println("Content-Type: text/html");
      // client.println("Connection: close");
      // client.println();    
      Serial.println(ct);
      header(client, 200, ct);
      writeFile(client, HTTP_req.substring(HTTP_req.indexOf("GET  ") + 5, HTTP_req.indexOf(" HTTP")), 0);

      client.stop();
    // }
  }
}
void header(EthernetClient client, int status,String ct) {
  client.print("HTTP/1.1 ");
  String a = retStat(status);
  Serial.println(a);
  client.println(a);
  client.println("Connection: close");
  client.println("Access-Control-Allow-Origin: *");
  client.println("Vary: Origin");
  if (ct != "") {
    client.print("Content-Type: ");
    client.println(ct);
  }
  client.println();
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

  if (!sd.begin(4, SPI_SPEED)) {
    // Serial.println("500");
    // return 500;
  }
  // SD.
  // Serial.println(use);
  FsFile dataFile = sd.open(use);

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

void printDirectory() {
// Serial.println("Files found (date time size name):");
  // sd.ls(LS_R | LS_DATE | LS_SIZE);
}
String retStat(int status) {

  String prefix = String(status) + " ";

  switch(status) {

//////////////// 2XX Success
    case 200:
    return prefix + "OK";

//////////////// 3XX rederect


//////////////// 4XX  Client Error
    case 400: //Bad Request
    return prefix + "Bad Request";
    
    case 401: //Unauthorized
    return prefix + "Unauthorized";
    
    case 403: // Forbidden
    return prefix + "Forbidden";
    
    case 404: //Not Found
    return prefix + "Not Found";
    

//////////////// 5XX Server Error
    case 0:
    return prefix + "ERR";

//////////////// not specified
    default:
    return prefix + "ERR";
  }
  }

