/* splitter global variables */
let currentSplitter = null;
let splitterWidth = 8;

/* panel global variables */
let currentLeft = null;
let currentRight = null;

window.onload = function(){
    setPanels();
}

window.onresize = function(){
    updateHorizontalSplitters();
}

window.onmousemove = function(e){
    if(currentSplitter != null){
        let rightRect = currentRight.getBoundingClientRect();
        let leftRect = currentLeft.getBoundingClientRect();
        let maxWidth = ((rightRect.width + leftRect.width) / window.innerWidth) * 100;

        let rightW = maxWidth - ((e.x - leftRect.x) / window.innerWidth) * 100;
        let leftW = ((e.x - leftRect.x) / window.innerWidth) * 100;
        
        currentRight.style.width = rightW + "%";
        currentLeft.style.width = leftW + "%";
        updateCurrentSplitter();
    }
    
}

window.onmouseup = function(){
    if(currentSplitter != null){
        currentSplitter = null;
    }
}

function updateCurrentSplitter(){
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


function updateHorizontalSplitters(){
    let container = document.getElementsByClassName("panel-container")[0];

    removeOldSpliters(container);

    let horizontalPanels = document.getElementsByClassName("panel-horizontal");

    if(horizontalPanels.length >= 2){
        for(let i = 0; i < horizontalPanels.length; i++){

            let rect = horizontalPanels[i].getBoundingClientRect();
            //console.log(rect);

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
    for(let i = oldSplitters.length - 1; i >= 0; i--){
        parent.removeChild(oldSplitters[i]);
    }
}
