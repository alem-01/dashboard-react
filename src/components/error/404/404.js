import React, { useEffect, useState } from "react";

import "./404.css";

const NotFoundPage = () => {
  const [translator, setTranslator] = useState(null);
  let win = window,
    doc = document,
    docElem = doc.documentElement,
    body = doc.getElementsByTagName("body")[0],
    pageX = win.innerWidth || docElem.clientWidth || body.clientWidth,
    pageY = win.innerHeight || docElem.clientHeight || body.clientHeight;

  let mouseY = 0,
    mouseX = 0,
    xAxis = 0,
    yAxis = 0;

  useEffect(
    () =>
      document.addEventListener("mousemove", (e) => {
        mouseY = e.pageY
        yAxis = ((pageY / 2 - mouseY) / pageY) * 300;
        mouseX = e.pageX / -pageX;
        xAxis = -mouseX * 100 - 100;
        setTranslator(`translate(${xAxis}%,-${yAxis}%)`);
      }),
    []
  );

  return (
    <div className="box">
      <div className="box__ghost">
        <div className="symbol"></div>
        <div className="symbol"></div>
        <div className="symbol"></div>
        <div className="symbol"></div>
        <div className="symbol"></div>
        <div className="symbol"></div>

        <div className="box__ghost-container">
          <div className="box__ghost-eyes" style={{ transform: translator }}>
            <div className="box__eye-left"></div>
            <div className="box__eye-right"></div>
          </div>
          <div className="box__ghost-bottom">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        <div className="box__ghost-shadow"></div>
      </div>

      <div className="box__description">
        <div className="box__description-container">
          <div className="box__description-title">Whoops!</div>
          <div className="box__description-text">
            It seems like we couldn't find the page you were looking for
          </div>
        </div>

        <a href="/leaderboard" className="box__button">
          Go back
        </a>
      </div>
    </div>
  );
};

export default NotFoundPage;
