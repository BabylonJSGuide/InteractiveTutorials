# InteractiveTutorials
Using a version of the BJS playground to produce tutorials.

## Reverse Engineer Code

### Events
Events are set using `setToMultipleID = function (id, thingToDo, param)` line 5 index.js

button id consists of name and size, done for all sizes.

### Compile and Run

The editor section contains jsEditor whihc can be manipulated and styled by the monaco engine, code as text can be extracted using `jsEngine.getValue();`

the current script in the jsEditor is loaded using `loadScript` function line 95 index.js 

Also needed are the decoration rules and the hidden scripts for the tutorials.

two new folders and two new functions needed.

## Changes to Display

Only Button to display is Scene Choice.

All div of class 'category' have style visibility:hidden

the 'current version' button has been commented out in index.html lines 140 - 145 and in index.js lines 90 and 92.