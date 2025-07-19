#include <SdFat.h>
#include <SPI.h>
#include <Ethernet.h>
#define SPI_SPEED SD_SCK_MHZ(50)

// #include "sdios.h"


///Root/ INDEX /index.html
String index = "webpage";

///mac adress to use
byte mac[] = { 0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };

///ip adress to use   192.168.1.177/index.html
IPAddress ip(192, 168, 1, 177);

///
EthernetServer server(80);