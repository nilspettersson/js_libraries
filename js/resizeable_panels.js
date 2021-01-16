/* splitter global variables */
let currentSplitter = null;
let splitterWidth = 8;

/* panel global variables */
let currentLeft = null;
let currentRight = null;

window.onload = function(){
    setPanels()
}

window.onresize = function(){
    setPanels()
}

window.onmousemove = function(e){
    if(currentSplitter != null){
        let rightW = 100 - (e.x / window.innerWidth) * 100;
        let leftW = (e.x / window.innerWidth) * 100;

        currentRight.style.width = rightW + "%";
        currentLeft.style.width = leftW + "%";
        updateSplitter();
    }
    
}

window.onmouseup = function(){
    if(currentSplitter != null){
        currentSplitter = null;
    }
}

function updateSplitter(){
    let rect = currentRight.getBoundingClientRect();
    currentSplitter.style.left = (rect.x - splitterWidth / 2) + "px";
}

function setPanels(){
    let container = document.getElementsByClassName("panel-container")[0];
    container.style = "display: flex; width: 100vw; height: 100vh; position:relative;"

    removeOldSpliters(container);
    
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
                
                splitter.style = "background:red;  width: " + splitterWidth + "px; height: 100%; position: absolute;" + 
                "left: " + (rect.x - splitterWidth / 2) + "px; top: 0px;"
                
                let left = horizontalPanels[i - 1];
                let right = horizontalPanels[i];
                splitter.onmousedown = function(){
                    currentLeft = left;
                    currentRight = right;
                    currentSplitter = splitter;
                }


                container.append(splitter);
            }
            

        }
    }
}

function removeOldSpliters(parent){
    let oldSplitters = parent.getElementsByClassName("panel-splitter");
    for(let i = 0; i < oldSplitters.length; i++){
        parent.removeChild(oldSplitters[i]);
        
    }
}
