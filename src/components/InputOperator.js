const isTwitch = (rawData) => {
  return rawData.includes("https://player.twitch.tv/?channel=")
}

const isFacebook = (rawData) => {
  return rawData.includes("https://www.facebook.com/plugins/video.php?")
}

const isYoutube = (rawData) => {
  return rawData.includes("https://www.youtube.com/embed/")
}

const replaceStyleWithFull = (element) => {
  element.removeAttribute("height");
  element.removeAttribute("width");
  element.setAttribute("style", "width:100%;height:100%");
  return
}

const twitchParser = (rawData) => {
  let el = document.createElement( 'div' );
  el.innerHTML = rawData;
  let linkElements = el.getElementsByTagName("a");
  let linkElement;
  if (linkElements.length === 1) {
    linkElement = linkElements[0];
  } 
  else {
    console.error(`invalid twitch rawData: ${rawData}`);
    return
  }
  linkElement.remove();

  let iframeElements = el.getElementsByTagName("iframe");
  let iframeElement;
  if (iframeElements.length === 1) {
    iframeElement = iframeElements[0];
  } 
  else {
    console.error(`invalid twitch rawData: ${rawData}`);
    return
  }
  replaceStyleWithFull(iframeElement);

  return el.innerHTML;
}

const facebookParser = (rawData) => {
  let el = document.createElement( 'div' );
  el.innerHTML = rawData;

  let iframeElements = el.getElementsByTagName("iframe");
  let iframeElement;
  if (iframeElements.length === 1) {
    iframeElement = iframeElements[0];
  } 
  else {
    console.error(`invalid facebook rawData: ${rawData}`);
    return
  }
  replaceStyleWithFull(iframeElement);

  return el.innerHTML;
}

const youtubeParser = (rawData) => {
  let el = document.createElement( 'div' );
  el.innerHTML = rawData;

  let iframeElements = el.getElementsByTagName("iframe");
  let iframeElement;
  if (iframeElements.length === 1) {
    iframeElement = iframeElements[0];
  } 
  else {
    console.error(`invalid facebook rawData: ${rawData}`);
    return
  }
  replaceStyleWithFull(iframeElement);

  return el.innerHTML;
}

const [twitch, facebook, youtube, unknown] = ["twitch", "facebook", "youtube", "unknown"];

const getType = (rawData) => {
  if (isTwitch(rawData)) {
    return twitch;
  }
  else if (isFacebook(rawData)) {
    return facebook;
  }
  else if (isYoutube(rawData)) {
    return youtube;
  }
  console.error("unknown input rawData");
  return unknown;
}

const parsers = {
  twitch: twitchParser,
  facebook: facebookParser,
  youtube: youtubeParser,
}


export const getEmbedData = (rawData) => {
  let type = getType(rawData);
  if (type === unknown) {
    return;
  }
  return parsers[type](rawData);
}