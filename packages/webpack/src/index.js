import "~@/style/reset.css";
import "~@/style/theme.less";
import "~@/style/style.less";
import ScarlettJohansson from "~@/assets/Scarlett Johansson.jpeg";
import MirandaKerr from "~@/assets/Miranda Kerr.jpeg";
import { habsburgList } from "~@/common/appDoc";
import { RenderUserInfo } from "./react";
import reactDom from "react-dom/client";
import React from "react";

const app = document.querySelector("#app");
const creatImg = (src) => {
  const img = new Image();
  img.src = src;
  return img;
};

const imgWrapper = document.createElement("div");
imgWrapper.className = "img-wrapper";
imgWrapper.append(creatImg(ScarlettJohansson));
imgWrapper.append(creatImg(MirandaKerr));
app.append(imgWrapper);

const docWrapper = document.createElement("div");
docWrapper.className = "doc-wrapper";
const fragment = document.createDocumentFragment();
habsburgList.forEach((el) => {
  const text = document.createElement("div");
  text.className = "doc-item";
  text.innerHTML = `<span>${el.index}</span>|<span>${el.text}</span>`;
  fragment.append(text);
});
docWrapper.append(fragment);
app.append(docWrapper);
const footer = document.createElement("div");
footer.className = "footer";
footer.innerText = AD;
app.append(footer);
const reactRoot = reactDom.createRoot(document.querySelector("#react-root"));
reactRoot.render(
  <React.StrictMode>
    <RenderUserInfo />
  </React.StrictMode>
);
