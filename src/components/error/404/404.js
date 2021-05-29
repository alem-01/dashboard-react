import React from "react";

import "./404.css";

const NotFoundPage = () => {
  //based on https://dribbble.com/shots/3913847-404-page

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
  // const ghostEyes = document.getElementsByClassName("box__ghost-eyes")
  // const ghostEyes = document.getElementsByClassName("box__eye-left")
  // const ghostEyes = document.getElementsByClassName("box__eye-right")
  const elementByClass = (className) =>
    document.getElementsByClassName(className);
  const ghostEyes = [
    elementByClass("box__eye-left"),
    elementByClass("box__eye-right"),
  ];
  console.log("ghost eyes: ", ghostEyes);
  // const body = document.getElementsByTagName("body");
  body.addEventListener("mousemove", (e) => {
    mouseX = e.offsetX;
    mouseY = e.offsetY;

    yAxis = ((pageY / 2 - mouseY) / pageY) * 300;
    // console.log("mouse Y: ", mouseY);
    //horizontalAxis
    mouseX = e.pageX / -pageX;
    xAxis = -mouseX * 100 - 100;

    ghostEyes.forEach((el) =>
    console.log("el:", el)
      // el.style.transform(`translate(${xAxis}%,-${yAxis}%)`)
    );
  });

  /* document.mousemove(function (event) {
    //verticalAxis
    mouseY = event.pageY;
    yAxis = ((pageY / 2 - mouseY) / pageY) * 300;
    console.log("mouse Y: ", mouseY);
    //horizontalAxis
    mouseX = event.pageX / -pageX;
    xAxis = -mouseX * 100 - 100;

    // $(".box__ghost-eyes").css({
    //   transform: "translate(" + xAxis + "%,-" + yAxis + "%)",
    // });

    //console.log('X: ' + xAxis);
  }); */

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
          <div className="box__ghost-eyes">
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
