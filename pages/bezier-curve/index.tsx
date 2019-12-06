import React, { useState, useEffect } from "react";
import "./index.css";

interface point {
  x: number;
  y: number;
}

let controlPoints: Array<point> = new Array();

function bezierCurve(ctx, controlPoints: Array<point>) {
  let cp: point;
  let from: number = 0;
  let step: number = 0.01;
  ctx.beginPath();
  if (controlPoints.length == 2) {
    ctx.moveTo(controlPoints[0].x, controlPoints[0].y);
    ctx.lineTo(controlPoints[1].x, controlPoints[1].y);
    ctx.strokeStyle = "rgba(0, 0, 0, 1)";
    ctx.stroke();
  } else if (controlPoints.length > 2) {
    ctx.moveTo(controlPoints[0].x, controlPoints[0].y);
    while (from <= 1) {
      from += step;
      cp = bezierPoint(controlPoints, from);
      ctx.lineTo(cp.x, cp.y);
      ctx.stroke();
    }
  }
}

function bezierPoint(controlPoints, from) {
  let degree: number = controlPoints.length;
  let bp: Array<point> = new Array();
  let i: number, j: number;

  // initialize
  for (i = 0; i < degree; i++) {
    bp[i] = {
      x: controlPoints[i].x,
      y: controlPoints[i].y
    };
  }
  // core
  for (j = 1; j <= degree; j++) {
    for (i = 0; i < degree - j; i++) {
      bp[i].x = (1.0 - from) * bp[i].x + from * bp[i + 1].x;
      bp[i].y = (1.0 - from) * bp[i].y + from * bp[i + 1].y;
    }
  }
  return bp[0];
}

function resizeCanvas(canvas) {
  let canvasBox = document.getElementById("canvas-box");
  let width = canvasBox.clientWidth;
  let height = window.innerHeight - 200;
  canvas.width = width;
  canvas.height = height;

  // clean data
  controlPoints = [];
}

const App: React.FC = props => {
  const [degree, setDegree] = useState(2);

  useEffect(() => {
    const bCanvas = document.getElementById("bezier-canvas");
    resizeCanvas(bCanvas);
    window.onresize = resizeCanvas;
  });

  function handleClick(e) {
    e.preventDefault();
    console.log(e);
    const bCanvas: any = document.getElementById("bezier-canvas");
    let ctx = bCanvas.getContext("2d");
    ctx.strokeStyle = "rgba(100,100,100,0.3)";

    // Transform coordinates
    let bBox = bCanvas.getBoundingClientRect();
    let curPoint: point = {
      x: e.clientX - bBox.left,
      y: e.clientY - bBox.top
    };

    // store
    controlPoints.push({
      x: curPoint.x,
      y: curPoint.y
    });

    ctx.beginPath();
    ctx.arc(curPoint.x, curPoint.y, 5, 0, Math.PI * 2);
    ctx.stroke();

    let cpLen = controlPoints.length;
    if (cpLen >= 2) {
      ctx.beginPath();
      ctx.moveTo(controlPoints[cpLen - 2].x, controlPoints[cpLen - 2].y);
      ctx.lineTo(curPoint.x, curPoint.y);
      ctx.stroke();
    }

    if (cpLen == degree + 1) {
      bezierCurve(ctx, controlPoints);
      controlPoints = [];
    }
  }

  return (
    <div className="container">
      <h2 className="text-center">Bézier curve</h2>
      <div className="text-center">
        <input
          id="bezier-degree"
          className="text-center"
          type="number"
          min="1"
          value={degree}
          style={{ width: 50 }}
          onChange={(event: any) => {
            setDegree(event.target.value);
          }}
        />
        阶贝塞尔曲线（需要 n+1 个控制点）
        {/* 阶的贝兹曲线，即双阶贝兹曲线之间的插值。 */}
        <br />
        <button className="button" onClick={resizeCanvas}>
          清除画布
        </button>
      </div>
      <hr />
      <div id="canvas-box" className="text-center">
        <canvas
          id="bezier-canvas"
          className="demo-canvas"
          onMouseDown={e => {
            handleClick(e);
          }}
        ></canvas>
      </div>
      <h6 className="text-center copyright">@YunYouJun</h6>
    </div>
  );
};

export default App;
