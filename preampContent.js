function log(message) {
  console.log("PREAMP: " + message)
}

const zIndex = "5";
const lineItemLink =
  "https://admanager.google.com/59666047#delivery/LineItemDetail/lineItemId=";
const creativeLink =
  "https://admanager.google.com/59666047#delivery/CreativeDetail/creativeId=";

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

function addPara(text, targetElt) {
  const p = addChildElt("p", targetElt);
  p.style.fontSize = "14px";
  p.textContent = text;
  return p;
}

function addProperty(name, value, targetElt) {
  addPara(name + " = " + value, targetElt);
}

function addLink(url, label, targetElt) {
  const link = addChildElt("a", targetElt);
  link.href = url;
  link.target = "_blank";
  link.textContent = label;
  return link;
}

function addTargetingBlock(json, targetElt) {
  const targetingDiv = addChildElt("div", targetElt);
  targetingDiv.style.padding = "5px 5px 5px 5px";
  addTitle("Bids:", targetingDiv);
  for (let prop in json) {
    if (json.hasOwnProperty(prop)) {
      addProperty(prop, json[prop], targetingDiv);
    }
  }
  if (Object.keys(json).length === 0) {
    addPara("No bids", targetingDiv);
  }
}

function addAdDetailBlock(json, targetElt) {
  const adDetailDiv = addChildElt("div", targetElt);
  adDetailDiv.style.padding = "5px 5px 5px 5px";
  addTitle("Ad:", adDetailDiv);
  const lineItemP = addPara("Line item = ", adDetailDiv);
  addLink(lineItemLink + json.lineItemId, json.lineItemId, lineItemP);
  const creativeP = addPara("Creative = ", adDetailDiv);
  addLink(creativeLink + json.creativeId, json.creativeId, creativeP);
}

function showMessage(message) {
  log("Received message");
  console.log(message);
  if (message.targeting) {
    addTargetingBlock(message.targeting, detailBoxes[targetingIndex++]);
  }
  if (message.adDetails) {
    addAdDetailBlock(message.adDetails, detailBoxes[adDetailsIndex++]);
  }
  return true;
}

browser.runtime.onMessage.addListener(showMessage);
