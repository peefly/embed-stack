export const ADD_EMBED = "ADD_EMBED";
export const REMOVE_EMBED = "REMOVE_EMBED";
export const TOP_EMBED = "TOP_EMBED";
export const SET_EMBED_HTML = "SET_EMBED_HTML";

export const AddEmbed = (newEmbed) => {
  const action = {
    type: ADD_EMBED,
    newEmbed: newEmbed
  }
  return action;
}

export const RemoveEmbed = (uid) => {
  const action = {
    type: REMOVE_EMBED,
    uid: uid
  }
  return action;
}

export const TopEmbed = (uid) => {
  const action = {
    type: TOP_EMBED,
    uid: uid
  }
  return action;
}

export const SetEmbedHtml = (uid, embedHtml) => {
  const action = {
    type: SET_EMBED_HTML,
    uid: uid,
    embedHtml: embedHtml
  }
  return action;
}