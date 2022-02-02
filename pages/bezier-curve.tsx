import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import { Button, Box } from "@mui/material";
import styles from "../styles/bezier-curve.module.css";

interface point {
  x: number;
  y: number;
}

let controlPoints: Array<point> = new Array();

function bezierCurve(ctx: any, controlPoints: Array<point>) {
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

function bezierPoint(controlPoints: Array<point>, from: number) {
  let degree: number = controlPoints.length;
  let bp: Array<point> = new Array();
  let i: number, j: number;
  // initialize
  for (i = 0; i < degree; i++) {
    bp[i] = {
      x: controlPoints[i].x,
      y: controlPoints[i].y,
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

function resizeCanvas() {
  let canvasBox: any = document.getElementById("canvas-box");
  let width = canvasBox.clientWidth;
  let height = window.innerHeight - 250;
  const canvas: any = document.getElementById("bezier-canvas");
  canvas.width = width;
  canvas.height = height;
  // clean data
  controlPoints = [];
}

function BezierCurve() {
  const [degree, setDegree] = useState(2);

  useEffect(() => {
    resizeCanvas();
    window.onresize = resizeCanvas;
  }, []);

  function handleClick(e: any) {
    e.preventDefault();
    const bCanvas: any = document.getElementById("bezier-canvas");
    let ctx = bCanvas.getContext("2d");
    ctx.strokeStyle = "rgba(100,100,100,0.3)";

    // Transform coordinates
    let bBox = bCanvas.getBoundingClientRect();
    let curPoint: point = {
      x: e.clientX - bBox.left,
      y: e.clientY - bBox.top,
    };

    // store
    controlPoints.push({
      x: curPoint.x,
      y: curPoint.y,
    });

    ctx.beginPath();
    ctx.arc(curPoint.x, curPoint.y, 5, 0, Math.PI * 2);
    ctx.stroke();

    let cpLen: number = controlPoints.length;
    if (cpLen >= 2) {
      ctx.beginPath();
      ctx.moveTo(controlPoints[cpLen - 2].x, controlPoints[cpLen - 2].y);
      ctx.lineTo(curPoint.x, curPoint.y);
      ctx.stroke();
    }

    if (cpLen - 1 == degree) {
      bezierCurve(ctx, controlPoints);
      controlPoints = [];
    }
  }

  return (
    <Layout title="Bézier curve">
      <Box textAlign="center">
        <h5>
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
        </h5>
        {/* 阶的贝兹曲线，即双阶贝兹曲线之间的插值。 */}
        <Button variant="contained" onClick={resizeCanvas}>
          清除画布
        </Button>
      </Box>
      <hr style={{ opacity: 0.2 }} />
      <Box id="canvas-box" textAlign="center">
        <canvas
          id="bezier-canvas"
          className={styles["demo-canvas"]}
          onMouseDown={(e) => {
            handleClick(e);
          }}
        ></canvas>
      </Box>
    </Layout>
  );
}

export default BezierCurve;
