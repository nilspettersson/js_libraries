/* splitter global variables */
let currentSplitter = null;
let splitterWidth = 8;

/* panel global variables */
let currentLeft = null;
let currentRight = null;

window.onload = function(){
    let parent = document.getElementsByClassName("panel-horizontal")[0];
    setPanels(parent);
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


function getChildPanels(parent){
    var children = [];
    for (var i = 0; i < parent.childNodes.length; i++) {
        if(parent.childNodes[i].nodeType == Node.ELEMENT_NODE){
            if (parent.childNodes[i].className.includes("panel")) {
                children.push(parent.childNodes[i]);
            }  
        }      
    }
    return children;
}

function setPanels(parent){
    parent.style = "display: flex; width: 100vw; height: 100vh; position:relative;"

    removeOldSpliters(parent);
    
    let horizontalPanels = getChildPanels(parent);

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

                parent.append(splitter);
            }
            
        }
    }


    /*let VerticalPanels = document.getElementsByClassName("panel-vertical");

    if(VerticalPanels.length >= 2){
        for(let i = 0; i < VerticalPanels.length; i++){
            VerticalPanels[i].style.width = "100%"
            //VerticalPanels[i].style.height = 100 / VerticalPanels.length + "%";

            let rect = VerticalPanels[i].getBoundingClientRect();

            if(i > 0){
                let splitter = document.createElement("div");
                splitter.classList.add("panel-splitter");
                
                splitter.style = "background:red;  width: " + splitterWidth + "px; height: 100%; position: absolute;" + 
                "left: " + (rect.x - splitterWidth / 2) + "px; top: 0px;"
                
                let left = VerticalPanels[i - 1];
                let right = VerticalPanels[i];
                splitter.onmousedown = function(){
                    currentLeft = left;
                    currentRight = right;
                    currentSplitter = splitter;
                }


                parent.append(splitter);
            }
            

        }
    }*/

}


/*updates panel splitter on window resize*/
function updateHorizontalSplitters(){
    let container = document.getElementsByClassName("panel-horizontal")[0];

    removeOldSpliters(container);

    let horizontalPanels = container.getElementsByClassName("panel");
    console.log(horizontalPanels);
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
