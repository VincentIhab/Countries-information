export function addEvent(element, event, callback) {
  if (element && typeof element.addEventListener === "function") {
    element.addEventListener(event, callback);
  } else {
    console.error("Invalid element provided:", element);
  }
}
