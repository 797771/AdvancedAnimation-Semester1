function GameArea(){
    // //  create Wrapper Div
    let wrapperDiv = document.createElement("div");
    wrapperDiv.id = "wrapperDiv";   // wrapperDiv gets its style from mystyles.css
    document.body.appendChild(wrapperDiv);  // child of the document body

    // create canvasDiv
    let canvasDiv = document.createElement("div");
    wrapperDiv.appendChild(canvasDiv);  // canvasDiv is child of wrapperDiv
    canvasDiv.setAttribute("style", " background-color:black; width:1100px; height:700px;float:left;");

    // create canvas
    let canvas =  document.createElement("canvas");
    canvas.id = 'canvas'; // gets its style from mystyles.css
    canvas.width = 1096;  // 800 - 4 for the border
    canvas.height = 696; // 700 - 4 for the border
    canvasDiv.appendChild(canvas);  // canvas is child of canvasDiv

}
