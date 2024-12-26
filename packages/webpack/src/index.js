import "@/style/reset.css";
import "@/style/theme.less";
import "@/style/style.less";
import ScarlettJohansson from "@/assets/Scarlett Johansson.jpeg";
import MirandaKerr from "@/assets/Miranda Kerr.jpeg";

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

const footer = document.createElement("div");
footer.className = "footer";
footer.innerText = AD;
app.append(footer);
