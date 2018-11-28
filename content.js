document.body.style.border = "5px solid red";

// var list= document.body.getElementsByTagName("img");
//
// alert(list.length);
//
// for (var i = 0; i < list.length; i++) {
//     console.log(list[i].id);
// }

function showTargetingFromBid(targeting) {
    const newDiv = document.createElement("div");
    const newContent = document.createTextNode(targeting);
    newDiv.appendChild(newContent);
    const currentDiv = document.getElementsByClassName("main-body")[0];
    document.body.insertBefore(newDiv, currentDiv);
}

function logBid(targeting) {
    console.log('******************* 111');
    console.log(targeting);
    showTargetingFromBid(targeting);
    return true;
}

browser.runtime.onMessage.addListener(logBid);
