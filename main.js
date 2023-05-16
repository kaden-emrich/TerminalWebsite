var terminal = document.getElementById("terminal");
var cursor = document.getElementById("cursor");
var firstLine = document.getElementById("firstLine");


var currentLine = firstLine;
var numLines = 0;
var inputValue = "";

var inputOpen = false;
var updateInterval;
var inputHandler;

/*----- Settings -----*/

var prompter = " >> ";
var defaultStyle = "greenGlow";

/*----- Settings End -----*/

function updateSize() {
    terminal.style.width = window.innerWidth + "px";
    terminal.style.height = window.innerHeight + "px";
}// updateSize()

function openInput() {
    print(prompter);
    inputOpen = true;
    cursor.style.animation = "blink 1s linear infinite";
}// openInput()

function closeInput() {
    inputOpen = false;
    cursor.style.animation = "hide .2s ease forwards";
}// closeInput()

function print(value) {
    currentLine.innerText += value;
}// print(value)
function println(value) {
    if(value) {
        print(value);
        newLine();
    }
    else {
        newLine();
    }
}// println(value)

function newLine() {
    var next = document.createElement("p");
    next.innerHTML = "<br>";
    next.className = defaultStyle;
    cursor.parentNode.insertBefore(next, cursor);
    currentLine = next;
    terminal.scrollTo(0,currentLine.offsetTop);
    numLines ++;
    return next;
}// newLine()

/*------ commands ------*/

function helloWorld() {
    println("Hello World!");
    openInput();
}// helloWorld()

function unknownInput(arg) {
    println("ERROR: Unknown input \"" + arg + "\"");
    openInput();
}// unknownInput(arg)

function repeater(argument) {
    println(argument);
    inputHandler = command;
    openInput();
}// repeater(argument)

function repeat() {
    inputHandler = repeater;
    print("Ok! Enter a value:");
    openInput();
}// repeat()

function command(arg) {
    switch(arg) {
        case "helloWorld":
            helloWorld();
            break;

        case "repeatAfterMe":
            repeat();
            break;

        default:
            unknownInput(arg);
            break;
    }
}// command(arg)

/*------ commands end ------*/

document.addEventListener("keypress", function(event){
    if(inputOpen) {
        
        if(event.keyCode == 13) {
            closeInput();
            newLine();
            inputHandler(inputValue);
            inputValue = "";
        }
        else {
            inputValue += event.key;
            currentLine.innerText += event.key;
        }
    }
});// keypress

document.addEventListener("keydown", function(event) {
    if(event.keyCode == 8) {
        if(inputValue.length != 0) {
            var temp = "";
            for(let i = 0; i < inputValue.length -1; i++) {
                temp += inputValue[i];
            }
            inputValue = temp;
            temp = "";
            for(let i = 0; i < currentLine.innerText.length -1; i++) {
                temp += currentLine.innerText[i];
            }
            currentLine.innerText = temp;
        }
    }
});

function createFirstLine() {
    var next = document.createElement("p");
    next.className = defaultStyle;
    cursor.parentNode.insertBefore(next, cursor);
    currentLine = next;
    terminal.scrollTo(0,currentLine.offsetTop);
    numLines ++;
    return next;
}// createFirstLine()

function init() {
    updateInterval = setInterval(updateSize, 1000/30);
    inputHandler = command;
    createFirstLine();
    closeInput();
    openInput();
}// init()

init();