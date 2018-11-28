function log(message) {
  console.log("PREAMP: " + message)
}

let detailBoxes = [];
let targetingIndex = 0;
let adDetailsIndex = 0;

const ads = document.body.getElementsByTagName("amp-ad");
for (let i = 0; i < ads.length; i++) {
  ads[i].style.border = "5px solid red";
  detailBoxes.push(addDetailBox(ads[i]));
}

function addChildren(obj, parentElt) {
  for (let property in obj) {
    if (obj.hasOwnProperty(property)) {
      if (typeof obj[property] == "object") {
        addChildDiv(property, parentElt);
        addChildren(obj[property], parentElt);
      } else {
        addChildDiv(property + " = " + obj[property], parentElt);
      }
    }
  }
}

function addChildDiv(text, parentElt) {
  const newDiv = document.createElement("div");
  const newContent = document.createTextNode(text);
  newDiv.appendChild(newContent);
  parentElt.insertBefore(newDiv, null);
}

function addDetailBox(adSlot) {
  const adContainer = adSlot.parentNode;
  const newDiv = document.createElement("div");
  const newContent = document.createTextNode("*** testing 123 ***");
  newDiv.appendChild(newContent);
  newDiv.style.background = "#F8F8F8";
  newDiv.style.border = "5px solid #DFDFDF";
  newDiv.style.color = "#717171";
  newDiv.style.fontSize = "13px";
  newDiv.style.height = "250px";
  newDiv.style.width = "310px";
  newDiv.style.letterSpacing = "1px";
  newDiv.style.lineHeight = "20px";
  newDiv.style.position = "absolute";
  newDiv.style.textAlign = "center";
  newDiv.style.textTransform = "uppercase";
  newDiv.style.top = "auto";
  newDiv.style.left = "auto";
//  newDiv.style.display = "none";
  newDiv.style.padding = "0 0px";
  adContainer.insertBefore(newDiv, null);
  return newDiv;
}

function addTargeting(json, targetElt) {
  targetElt.textContent += JSON.stringify(json);
}

function addAdDetails(json, targetElt) {
  targetElt.textContent += JSON.stringify(json);
}

function showMessage(message) {
  log("Received message");
  console.log(message);
  if (message.targeting)
    addTargeting(message, detailBoxes[targetingIndex++]);
  if (message.adDetails)
    addAdDetails(message, detailBoxes[adDetailsIndex++]);
  return true;
}

browser.runtime.onMessage.addListener(showMessage);
