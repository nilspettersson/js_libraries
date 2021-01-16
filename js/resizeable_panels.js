
window.onload = function(){
    setPanels()
}


window.onresize = function(){
    setPanels()
}


function setPanels(){
    let container = document.getElementsByClassName("panel-container")[0];

    let oldSplitters = container.getElementsByClassName("panel-splitter");
    for(let i = 0; i < oldSplitters.length; i++){
        container.removeChild(oldSplitters[i]);
        
    }

    container.style = "display: flex; width: 100vw; height: 100vh; position:relative;"
    
    let horizontalPanels = document.getElementsByClassName("panel-horizontal");

    if(horizontalPanels.length >= 2){
        for(let i = 0; i < horizontalPanels.length; i++){
            horizontalPanels[i].style.height = "100%"
            horizontalPanels[i].style.width = 100 / horizontalPanels.length + "%";

            let rect = horizontalPanels[i].getBoundingClientRect();
            console.log(rect);

            if(i > 0){
                let splitter = document.createElement("div");
                splitter.classList.add("panel-splitter");
                let splitterWidth = 4;
                splitter.style = "background:red;  width: " + splitterWidth + "px; height: 100%; position: absolute;" + 
                "left: " + (rect.x - splitterWidth / 2) + "px; top: 0px;"
    
                container.append(splitter);
            }
            

        }
    }
}
