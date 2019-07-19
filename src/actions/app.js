export const ADD_EMBED = "ADD_EMBED";

export const AddEmbed = (newEmbed) => {
  const action = {
    type: ADD_EMBED,
    newEmbed: newEmbed
  }
  return action;
}