import style from "./style.module.less";
import { CSSTransition } from "react-transition-group";
import React, { useState } from "react";

const TransitionGroup = () => {
  const [show, setShow] = useState(true);
  return (
    <div className={style.wrapper}>
      <div className={style.title}>动画</div>
      <div>
        <button type="button" onClick={() => setShow(!show)}>
          动起来
        </button>
      </div>
      <div className={style.transitionWrapper}>
        <CSSTransition
          in={show}
          timeout={500}
          classNames={{
            enter: style.fadeEnter,
            enterActive: style.fadeEnterActive,
            enterDone: style.fadeEnterDone,
            exit: style.fadeExit,
            exitActive: style.fadeExitActive,
            exitDone: style.fadeExitDone,
          }}
        >
          <div className={style.box}></div>
        </CSSTransition>
      </div>
    </div>
  );
};

export default TransitionGroup;
