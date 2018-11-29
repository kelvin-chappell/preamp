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

function addDetailBox(adSlot) {
  const adContainer = adSlot.parentNode;
  const newDiv = document.createElement("div");
  newDiv.style.position = "absolute";
  newDiv.style.top = "auto";
  newDiv.style.left = "40px";
  newDiv.style.height = "250px";
  newDiv.style.width = "500px";
  newDiv.style.background = "#F8F8F8";
  newDiv.style.border = "5px solid #DFDFDF";
  newDiv.style.padding = "5px 5px 5px 5px";
  newDiv.style.lineHeight = "10px";
  newDiv.style.zIndex = "5";
  adContainer.insertBefore(newDiv, null);
  return newDiv;
}

function addChildElt(type, parentElt) {
  const newElt = document.createElement(type);
  parentElt.insertBefore(newElt, null);
  return newElt;
}

function addTitle(title, targetElt) {
  const p = addChildElt("p", targetElt);
  p.style.fontSize = "14px";
  p.style.fontWeight = "bold";
  p.textContent = title;
}

function addProperty(name, value, targetElt) {
  const p = addChildElt("p", targetElt);
  p.style.fontSize = "14px";
  p.textContent = name + " = " + value;
}

function addBlock(title, json, targetElt) {
  const div = addChildElt("div", targetElt);
  div.style.padding = "5px 5px 5px 5px";
  addTitle(title, div);
  for (let prop in json) {
    if (json.hasOwnProperty(prop)) {
      addProperty(prop, json[prop], div);
    }
  }
  if (Object.keys(json).length === 0) {
    const p = addChildElt("p", div);
    p.style.fontSize = "14px";
    p.textContent = "No values";
  }
}

function addTargeting(json, targetElt) {
  addBlock("Targeting from bids:", json, targetElt);
}

function addAdDetails(json, targetElt) {
  addBlock("Showing ad:", json, targetElt);
}

function showMessage(message) {
  log("Received message");
  console.log(message);
  if (message.targeting) {
    addTargeting(message.targeting, detailBoxes[targetingIndex++]);
  }
  if (message.adDetails) {
    addAdDetails(message.adDetails, detailBoxes[adDetailsIndex++]);
  }
  return true;
}

browser.runtime.onMessage.addListener(showMessage);
