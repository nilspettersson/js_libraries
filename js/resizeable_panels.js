
window.onload = function(){

    let container = document.getElementsByClassName("panel-container")[0];

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
                let splitterWidth = 4;
                splitter.style = "background:red;  width: " + splitterWidth + "px; height: 100%; position: absolute;" + 
                "left: " + (rect.x - splitterWidth / 2) + "px; top: 0px;"
    
                container.append(splitter);
            }
            

        }
    }


}
