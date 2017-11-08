# InteractiveTutorials
Using a version of the BJS Playground to produce tutorials. This version is not to be seen as a replacement for the Playground. The Playground files have be copied not forked and have been adapted. 

Features not being used have been commented out rather than deleted so that if required they can easily be restored.

## Events
Events are set using `setToMultipleID = function (id, thingToDo, param)` line 5 js/index.js

button id consists of name and size, done for all sizes.

## Compile and Run

In the original playground code the editor section contains jsEditor which can be manipulated and styled by the monaco engine, code as text is extracted using `jsEngine.getValue();` and eval is applied to run the code.

The current script in the jsEditor is loaded using `loadScript` function line 95 index.js.

In this adaptation the text of the code for the editor is loaded from files in the **scripts** folder, the actual code run is in the **codes** folder. Any editing by the user of the code in the editor will not affect the running code but will affect the decoration of the code in the editor so readOnly editor option is set to true.


## Changes to Display

User choices have been limited.

Decoration of the text in the editor is controlled in js/index.js lines 59 to 110. The css code linked to this is at the end of node_modules/min/vs/editor/editor.main.css

Issue - when opacity is set to 1 cannot return it to 0.5.

Only Button to display is Scene Choice.

All div of class 'category' have style visibility:hidden

the 'current version' button has been commented out in index.html lines 140 - 145 and in index.js lines 90 and 92.