import uuidv1 from 'uuid/v1'
import Counter from 'utility/counter'

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

const makeParserReturn = (platform, id, embedHtml) => {
  return {
    platform: platform,
    platformId: id,
    embedHtml: embedHtml,
    uid: uuidv1(),
    removed: false,
    zIndex: Counter.next()
  }
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

  let src = iframeElement.getAttribute("src");
  let id = src.replace("https://player.twitch.tv/?channel=", "");
  return makeParserReturn(twitch, id, el.innerHTML);
  //return el.innerHTML;
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

  let src = iframeElement.getAttribute("src");
  let idData = src.replace("https://www.facebook.com/plugins/video.php?href=", "");
  idData = idData.replace("&show_text=0&width=560", "");
  idData = unescape(idData);
  idData = idData.replace("https://www.facebook.com/", "");
  let id = idData.substr(0, idData.indexOf("/"));
  return makeParserReturn(facebook, id, el.innerHTML);
  //return el.innerHTML;
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

  let src = iframeElement.getAttribute("src");
  let id = src.replace("https://www.youtube.com/embed/", "");
  return makeParserReturn(youtube, id, el.innerHTML);
  //return el.innerHTML;
}

const [twitch, facebook, youtube, unknown] = ["Twitch", "Facebook", "Youtube", "Unknown"];

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
  Twitch: twitchParser,
  Facebook: facebookParser,
  Youtube: youtubeParser,
}


export const getEmbedData = (rawData) => {
  let type = getType(rawData);
  if (type === unknown) {
    return;
  }
  return parsers[type](rawData);
}