import React, { useEffect, useRef } from "react";
import '../App.css';

function Background() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationId;
    let width, height;
    let points = [];
    const totalPoints = 90;

    function setCanvasSize() {
      width = canvas.width = window.innerWidth * window.devicePixelRatio;
      height = canvas.height = window.innerHeight * window.devicePixelRatio;
    }

    function createPoints() {
      points = [];
      for (let i = 0; i < totalPoints; i++) {
        points.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 1 + 0.3,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
        });
      }
    }

    setCanvasSize();
    createPoints();

    window.addEventListener("resize", setCanvasSize);

    function connectPoints() {
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dx = points[i].x - points[j].x;
          const dy = points[i].y - points[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 160 * window.devicePixelRatio;

          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.25;
            ctx.strokeStyle = `rgba(232, 73, 47, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(points[i].x, points[i].y);
            ctx.lineTo(points[j].x, points[j].y);
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      connectPoints();

      points.forEach((point) => {
        point.x += point.speedX;
        point.y += point.speedY;

        if (point.x < 0 || point.x > width) point.speedX *= -1;
        if (point.y < 0 || point.y > height) point.speedY *= -1;

        ctx.beginPath();
        ctx.arc(point.x, point.y, point.size * 1.8 * window.devicePixelRatio, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232, 73, 47, ${0.5 * point.size})`;
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", setCanvasSize);
    };
  }, []);

  return <canvas ref={canvasRef} className="app-background"></canvas>;
}

export default Background;
