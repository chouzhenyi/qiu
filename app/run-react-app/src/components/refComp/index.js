import { Component, createRef, useRef } from "react";
import styles from "./styles.module.css";

class ObjComp extends Component {
  myRef = createRef();
  render() {
    const onRefClick = (e) => {
      console.log("this.myRef => e =>", e);
      console.log("this.myRef =>", this.myRef.current);
      this.myRef.current.innerText = `${Math.ceil(
        Math.random() * 1e3
      )} => 对象ref组件`;
    };
    return (
      <div
        className={styles.refButton}
        ref={this.myRef}
        onClick={(e) => onRefClick(e)}
      >
        对象ref组件
      </div>
    );
  }
}

class FuncComp extends Component {
  myRef = createRef();
  render() {
    const onRefClick = (e) => {
      console.log("this.myRef => e =>", e);
      console.log("this.myRef =>", this.myRef);
      this.myRef.innerText = `${Math.ceil(Math.random() * 1e3)} => 函数ref组件`;
    };
    return (
      <div
        className={styles.refButton}
        ref={(element) => (this.myRef = element)}
        onClick={(e) => onRefClick(e)}
      >
        函数ref组件
      </div>
    );
  }
}

const HookComp = () => {
  const myRef = useRef();
  const text = "Hook ref组件";
  const onRefClick = (e) => {
    console.log("hook myRef => e =>", e);
    console.log("hook myRef =>", myRef.current);
    myRef.current.innerText = `${Math.ceil(Math.random() * 1e3)} => ${text}`;
  };
  return (
    <div
      className={styles.refButton}
      ref={myRef}
      onClick={(e) => onRefClick(e)}
    >
      {text}
    </div>
  );
};

export const RefComp = () => {
  return (
    <>
      <ObjComp />
      <FuncComp />
      <HookComp />
    </>
  );
};
