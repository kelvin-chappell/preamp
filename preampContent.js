function log(message) {
  console.log("PREAMP: " + message)
}

const zIndex = "5";
let detailBoxes = [];
let targetingIndex = 0;
let adDetailsIndex = 0;

const ads = document.body.getElementsByTagName("amp-ad");
for (let i = 0; i < ads.length; i++) {
  ads[i].style.border = "5px solid red";
  const btn = addChildElt("button", ads[i].parentNode);
  btn.style.width = "100px";
  btn.style.height = "20px";
  btn.textContent = "Show details";
  btn.onclick = function (event) {
    detailBoxes[i].style.display = "block"
  };
  detailBoxes.push(addDetailBox(ads[i], i));
}

function addDetailBox(adSlot, idx) {
  const adContainer = adSlot.parentNode;
  const newDiv = document.createElement("div");
  newDiv.id = "adDetails" + idx;
  newDiv.style.display = "none";
  newDiv.style.position = "absolute";
  newDiv.style.top = "auto";
  newDiv.style.left = "40px";
  newDiv.style.height = "250px";
  newDiv.style.width = "500px";
  newDiv.style.background = "#F8F8F8";
  newDiv.style.border = "5px solid #DFDFDF";
  newDiv.style.padding = "5px 5px 5px 5px";
  newDiv.style.lineHeight = "10px";
  newDiv.style.zIndex = zIndex;
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
    p.textContent = "No bids";
  }
}

function addTargeting(json, targetElt) {
  addBlock("Bids:", json, targetElt);
}

function addAdDetails(json, targetElt) {
  addBlock("Ad:", json, targetElt);
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
