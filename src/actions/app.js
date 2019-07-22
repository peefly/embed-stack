export const ADD_EMBED = "ADD_EMBED";
export const REMOVE_EMBED = "REMOVE_EMBED";
export const TOP_EMBED = "TOP_EMBED";
export const SET_EMBED_HTML = "SET_EMBED_HTML";
export const SET_EMBED_INPUT_RAW = "SET_EMBED_INPUT_RAW";
export const REPLACE_EMBED = "REPLACE_EMBED";

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

export const SetEmbedInputRaw = (embedInputRaw) => {
  const action = {
    type: SET_EMBED_INPUT_RAW,
    embedInputRaw: embedInputRaw
  }
  return action;
}

export const ReplaceEmbed = (uid) => {
  const action = {
    type: REPLACE_EMBED,
    uid: uid
  }
  return action;
}