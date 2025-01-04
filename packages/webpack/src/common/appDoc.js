import habsburgText from "../assets/docment/habsburg.txt";
export const habsburgList = habsburgText.split(/\n/).map((text, index) => {
  return {
    text,
    index,
  };
});
