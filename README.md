# RWG

or alternatively, RWebGame, is an `arduino project` + `web game` + `server software` that I had, and then tried to stuff as many programming languages

## Hardware needed

1. Arduino Board
1. Arduino Ethernet prototype board
1. Ethernet cable
1. Micro SD Card

## Setup

These are the steps to set up the thingy.

paste files into root and have root be `F:\\`

1. Load files onto an micro SD card
1. Run python file at `F:\\compile\run.py` to compile the typescript file (originaly I thought browsers could read TS files, then I got attatched to my TS file)
1. connect arduino board to computer and send the project in `F:\\SERVER\` to the board
1. press `eject` on the SD card, then eject it, the put it in the MSDC slot on the Ethernet board
1. disconnect board from computer and power
1. plug ethernet cable into the arduino board
1. connect power to Ardino board