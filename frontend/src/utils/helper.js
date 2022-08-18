export function strPadLeft(string, pad, length) {
  return (new Array(length + 1).join(pad) + string).slice(-length);
}

export function getMinuteFromSecond(seconds) {
  return Math.floor(seconds / 60);
}

export function getSecondFromSecond(seconds) {
  return seconds - getMinuteFromSecond(seconds) * 60;
}

/**
 *
 * @param {*} value
 * @returns {Boolean}
 */
export function isString(value) {
  return typeof value === "string" || value instanceof String;
}

export function postDataToNativeApp(functionName, data) {
  const jsonstr = JSON.stringify(data);
  const ua = window.navigator.userAgent.toLowerCase();
  const isIOS =
    ua.includes("iphone") || ua.includes("ipod") || ua.includes("ipad");
  if (isIOS) {
    if (jsonstr) {
      window.webkit.messageHandlers[functionName].postMessage(jsonstr);
    } else {
      window.webkit.messageHandlers[functionName].postMessage();
    }
  } else {
    if (jsonstr) {
      window.android_app[functionName](jsonstr);
    } else {
      window.android_app[functionName]();
    }
  }
}
