/* splitter global variables */
let currentSplitter = null;
let splitterWidth = 8;
let currentSplitterType = "";

/* panel global variables */
let currentLeft = null;
let currentRight = null;
let currentParent = null;

window.onload = function(){
    let parent = document.getElementsByClassName("panel")[0];
    if(parent.className.includes("panel-horizontal")){
        setPanels(parent, "horizontal");
    }
    else if(parent.className.includes("panel-vertical")){
        setPanels(parent, "vertical");
    }
}

window.onresize = function(){
    let parent = document.getElementsByClassName("panel")[0];
    if(parent.className.includes("panel-horizontal")){
        updateSplitters(parent, "horizontal");
    }
    else if(parent.className.includes("panel-vertical")){
        updateSplitters(parent, "vertical");
    }
    
}

window.onmousemove = function(e){
    if(currentSplitter == null){
        return;
    }
    if(currentSplitterType == "horizontal"){
        let rightRect = currentRight.getBoundingClientRect();
        let leftRect = currentLeft.getBoundingClientRect();
        let parentRect = currentParent.getBoundingClientRect();
        let maxWidth = /*Math.round*/(((rightRect.width + leftRect.width) / parentRect.width) * 100);

        let leftW = ((e.x - leftRect.x) / parentRect.width) * 100;
        let rightW = maxWidth - leftW;
        
        currentRight.style.width = rightW + "%";
        currentLeft.style.width = leftW + "%";
        updateCurrentSplitter();
    }
    else if(currentSplitterType == "vertical"){
        let rightRect = currentRight.getBoundingClientRect();
        let leftRect = currentLeft.getBoundingClientRect();
        let parentRect = currentParent.getBoundingClientRect();
        let maxHeight = /*Math.round*/(((rightRect.height + leftRect.height) / parentRect.height) * 100);

        let leftW = ((e.y - leftRect.y) / parentRect.height) * 100;
        let rightW = maxHeight - leftW;

        console.log(leftRect.y);
        
        currentRight.style.height = rightW + "%";
        currentLeft.style.height = leftW + "%";
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
    if(currentSplitterType == "horizontal"){
        currentSplitter.style.left = (rect.x - splitterWidth / 2) + "px";
    }
    else if(currentSplitterType == "vertical"){
        currentSplitter.style.top = (rect.y - splitterWidth / 2) + "px";
    }
    
}

//gets the children with class
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
parentType: horizontal or vertical
*/
function setPanels(parent, parentType){
    parent.style.position = "relative";

    removeOldSpliters(parent);
    
    let panels = getChildPanels(parent, "panel");

    if(panels.length >= 2 && parentType == "horizontal"){
        parent.style.display = "flex";
        let firstPanelOffset = 0;
        for(let i = 0; i < panels.length; i++){
            panels[i].style.height = "100%"
            panels[i].style.width = 100 / panels.length + "%";

            let rect = panels[i].getBoundingClientRect();

            /*splitter position is relative to parent but bounding rect is relative to the top corner.
            * So we get the offset using the first panel position.
            */
            if(i == 0){
                firstPanelOffset = rect.y;
            }

            //add splitters to panels.
            if(i > 0){
                let splitter = document.createElement("div");
                splitter.classList.add("panel-splitter");
                splitter.classList.add("splitter-horizontal");
                
                splitter.style = "width: " + splitterWidth + "px; height: 100%; position: absolute;" + 
                "left: " + (rect.x - splitterWidth / 2) + "px; top: 0px;"
                
                let left = panels[i - 1];
                let right = panels[i];
                splitter.onmousedown = function(){
                    currentLeft = left;
                    currentRight = right;
                    currentParent = parent;
                    currentSplitter = splitter;
                    currentSplitterType = "horizontal";
                }

                parent.append(splitter);
            }

            if(panels[i].className.includes("panel-horizontal")){
                setPanels(panels[i], "horizontal");
            }
            else if(panels[i].className.includes("panel-vertical")){
                setPanels(panels[i], "vertical");
            }
            
        }
    }

    else if(panels.length >= 2 && parentType == "vertical"){
        let firstPanelOffset = 0;
        for(let i = 0; i < panels.length; i++){
            panels[i].style.height = 100 / panels.length + "%";
            panels[i].style.width = "100%"
            
            let rect = panels[i].getBoundingClientRect();

            /*splitter position is relative to parent but bounding rect is relative to the top corner.
            * So we get the offset using the first panel position.
            */
            if(i == 0){
                firstPanelOffset = rect.y;
            }
            
            //add splitters to panels.
            if(i > 0){
                let splitter = document.createElement("div");
                splitter.classList.add("panel-splitter");
                splitter.classList.add("splitter-vertical");
                
                splitter.style = "height: " + splitterWidth + "px; width: 100%; position: absolute;" + 
                "top: " + (rect.y - firstPanelOffset - splitterWidth / 2) + "px; left: 0px;" +
                "panel-splitter:hover{ cursor: e-resize; }";
                
                let left = panels[i - 1];
                let right = panels[i];
                splitter.onmousedown = function(){
                    currentLeft = left;
                    currentRight = right;
                    currentParent = parent;
                    currentSplitter = splitter;
                    currentSplitterType = "vertical";
                }

                parent.append(splitter);
            }

            if(panels[i].className.includes("panel-horizontal")){
                setPanels(panels[i], "horizontal");
            }
            else if(panels[i].className.includes("panel-vertical")){
                setPanels(panels[i], "vertical");
            }
        }
    }
}


/*updates panel splitter on window resize*/
function updateSplitters(parent, parentType){
    removeOldSpliters(parent);

    let panels = getChildPanels(parent, "panel");

    if(panels.length >= 2 && parentType == "horizontal"){
        for(let i = 0; i < panels.length; i++){

            let rect = panels[i].getBoundingClientRect();

            //add splitters to panels.
            if(i > 0){
                let splitter = document.createElement("div");
                splitter.classList.add("panel-splitter");
                
                splitter.style = "width: " + splitterWidth + "px; height: 100%; position: absolute;" + 
                "left: " + (rect.x - splitterWidth / 2) + "px; top: 0px;"
                
                let left = panels[i - 1];
                let right = panels[i];
                splitter.onmousedown = function(){
                    currentLeft = left;
                    currentRight = right;
                    currentParent = parent;
                    currentSplitter = splitter;
                }

                parent.append(splitter);
            }

            if(panels[i].className.includes("panel-horizontal")){
                updateSplitters(panels[i], "horizontal");
            }
            else if(panels[i].className.includes("panel-vertical")){
                updateSplitters(panels[i], "vertical");
            }
            
        }
    }

    else if(panels.length >= 2 && parentType == "vertical"){
        for(let i = 0; i < panels.length; i++){
            let rect = panels[i].getBoundingClientRect();

            //add splitters to panels.
            if(i > 0){
                let splitter = document.createElement("div");
                splitter.classList.add("panel-splitter");
                splitter.classList.add("splitter-vertical");
                
                splitter.style = "height: " + splitterWidth + "px; width: 100%; position: absolute;" + 
                "top: " + (rect.y - splitterWidth / 2) + "px; left: 0px;" +
                "panel-splitter:hover{ cursor: e-resize; }";
                
                let left = panels[i - 1];
                let right = panels[i];
                splitter.onmousedown = function(){
                    currentLeft = left;
                    currentRight = right;
                    currentParent = parent;
                    currentSplitter = splitter;
                    currentSplitterType = "vertical";
                }

                parent.append(splitter);
            }

            if(panels[i].className.includes("panel-horizontal")){
                updateSplitters(panels[i], "horizontal");
            }
            else if(panels[i].className.includes("panel-vertical")){
                updateSplitters(panels[i], "vertical");
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
