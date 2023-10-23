const dropZone = document.querySelector('.content');
const itemList = document.querySelectorAll('.item__link');
const clearButton = document.querySelector("#clear-btn");
const saveButton =  document.querySelector('#save-btn');
let noOfElements=0
let inputArray=[];

function createElementFromLocalStroage(item){
    let element = document.createElement('input');
    element.classList.add(item.className);
    element.style.position = 'absolute'
    element.style.left =item.left;
    element.style.top = item.top;
    return element;
}

function createElement(event) {
    let leftValue,topValue = 0;
    let element = document.createElement('input');
    element.classList.add(`input${noOfElements}`);
    element.style.position = 'absolute'
    //270 denotes the sidenave width
    //50 denotes the headerr height
    //Use resize css property for the e
    leftValue = event.clientX-270;
    topValue= event.clientY - 60;
    element.style.left = leftValue+'px';
    element.style.top = topValue+'px';
    return element;
}



window.addEventListener("load",(e)=>{
    let prevElements  = JSON.parse(window.localStorage.getItem('positionOfElements'));
    if(prevElements){
        for(let item of prevElements) {
            dropZone.appendChild(createElementFromLocalStroage(item));
        }
    }
})

dropZone.addEventListener('dragover',(e)=>{
    e.preventDefault();    
})

dropZone.addEventListener("drop",(e)=>{
    e.preventDefault();
    noOfElements++;
    dropZone.appendChild( createElement(e));
})


saveButton.addEventListener('click',(e)=>{
    for(let index=1;index <= noOfElements; index++) {
    let className = `input${index}`;
    let element = document.querySelector(`.${className}`);
        let obj =   creataObjectOfDraggedElement(className,element.style.left, element.style.top);
        inputArray.push(obj);
    } 
    
    if(noOfElements >=1) {
        window.localStorage.setItem("positionOfElements", JSON.stringify(inputArray));
        alert("State Saved Sucessfully");

    } else {
        alert ("Nothing to Save");
    
    }
}
)

clearButton.addEventListener("click",()=>{
    dropZone.innerHTML = "";
    noOfElements = 0 ;
    inputArray = [];
    window.localStorage.setItem('positionOfElements',[]);
    alert("State Cleared Sucessfully");

})

function creataObjectOfDraggedElement( className, leftValue, topValue){
   return {
    className: className,  
    left: leftValue,
    top: topValue
   } 
}