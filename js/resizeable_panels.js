/* splitter global variables */
let currentSplitter = null;
let splitterWidth = 8;

/* panel global variables */
let currentLeft = null;
let currentRight = null;
let currentParent = null;

window.onload = function(){
    let parent = document.getElementsByClassName("panel-horizontal")[0];
    setPanels(parent, "horizontal");
}

window.onresize = function(){
    let parent = document.getElementsByClassName("panel-horizontal")[0];
    updateHorizontalSplitters(parent, "horizontal");
}

window.onmousemove = function(e){
    if(currentSplitter != null){
        let rightRect = currentRight.getBoundingClientRect();
        let leftRect = currentLeft.getBoundingClientRect();
        let parentRect = currentParent.getBoundingClientRect();
        let maxWidth = Math.round(((rightRect.width + leftRect.width) / parentRect.width) * 100);

        //let rightW = maxWidth - ((e.x - leftRect.x) / window.innerWidth) * 100;
        let leftW = ((e.x - leftRect.x) / parentRect.width) * 100;
        let rightW = maxWidth - leftW;

        console.log(leftW + "  " + rightW + "   " + maxWidth + "  " + e.x + "   " + parentRect.width);
        
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

/* gets the children with class */
function getChildPanels(parent, className){
    var children = [];
    for (var i = 0; i < parent.childNodes.length; i++) {
        if(parent.childNodes[i].nodeType == Node.ELEMENT_NODE){
            if (parent.childNodes[i].className.includes(className)) {
                children.push(parent.childNodes[i]);
            }  
        }      
    }
    return children;
}
/*
set the panels of all panels goes through all children of a parent and checks the type of the parent 
parentType: "horizontal" or "vertical"
*/
function setPanels(parent, parentType){
    parent.style.display = "flex";
    parent.style.position = "relative";

    removeOldSpliters(parent);
    
    let panels = getChildPanels(parent, "panel");

    if(panels.length >= 2 && parentType == "horizontal"){
        for(let i = 0; i < panels.length; i++){
            panels[i].style.height = "100%"
            panels[i].style.width = 100 / panels.length + "%";

            let rect = panels[i].getBoundingClientRect();

            //add splitters to panels.
            if(i > 0){
                let splitter = document.createElement("div");
                splitter.classList.add("panel-splitter");
                
                splitter.style = "background:red;  width: " + splitterWidth + "px; height: 100%; position: absolute;" + 
                "left: " + (rect.x - splitterWidth / 2) + "px; top: 0px;"
                
                let left = panels[i - 1];
                let right = panels[i];
                splitter.onmousedown = function(){
                    currentLeft = left;
                    currentRight = right;
                    currentParent = parent;
                    currentSplitter = splitter;
                }

                document.getElementsByClassName("panel")[0].append(splitter);
            }

            if(panels[i].className.includes("panel-horizontal")){
                setPanels(panels[i], "horizontal");
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
function updateHorizontalSplitters(parent, parentType){
    removeOldSpliters(parent);

    let panels = getChildPanels(parent, "panel");

    if(panels.length >= 2 && parentType == "horizontal"){
        for(let i = 0; i < panels.length; i++){

            let rect = panels[i].getBoundingClientRect();

            //add splitters to panels.
            if(i > 0){
                let splitter = document.createElement("div");
                splitter.classList.add("panel-splitter");
                
                splitter.style = "background:red;  width: " + splitterWidth + "px; height: 100%; position: absolute;" + 
                "left: " + (rect.x - splitterWidth / 2) + "px; top: 0px;"
                
                let left = panels[i - 1];
                let right = panels[i];
                splitter.onmousedown = function(){
                    currentLeft = left;
                    currentRight = right;
                    currentParent = parent;
                    currentSplitter = splitter;
                }

                document.getElementsByClassName("panel")[0].append(splitter);
            }

            if(panels[i].className.includes("panel-horizontal")){
                updateHorizontalSplitters(panels[i], "horizontal");
            }
            
        }
    }
}


function removeOldSpliters(parent){
    let oldSplitters = getChildPanels(parent, "panel-splitter");
    for(let i = oldSplitters.length - 1; i >= 0; i--){
        parent.removeChild(oldSplitters[i]);
    }
}
