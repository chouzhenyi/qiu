import "./style.css";
import React from "react";

export default function Page() {
  return (
    <div className="wrapper">
      <h1 className="title">台账搭建界面</h1>
      <div className="designZone">
        <div className="designLeft">
          <div className="formZone"></div>
          <div className="buttonZone"></div>
          <div className="tableZone"></div>
        </div>
        <div className="designRight"></div>
      </div>
    </div>
  );
}
