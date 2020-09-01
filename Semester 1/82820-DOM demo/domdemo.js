window.onload=examples;

function examples(){

// create a couple of elements in an otherwise empty HTML page
var heading = document.createElement("h1");
var heading_text = document.createTextNode("");

// places heading in node tree as child of body
document.body.appendChild(heading);

// places heading_text in node tree as child of heading
heading.appendChild(heading_text);

}
