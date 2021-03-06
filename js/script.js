self.addEventListener(
  "notificationclick",
  function (event) {
    event.notification.close();

    if (event.action === "be") {
      alert("Thank You so much! 🤗");
    } else if (event.action === "happy") {
      alert("Thank You so much! 🤗");
    }
  },
  false
);

/* Game Script*/
function playGame() {
  // document.querySelector("input[type='checkbox']").disabled=true;
  const inputbox = document.querySelector("input[type='checkbox']");
  inputbox.disabled = true;
  const audio = new Audio(
    "https://raw.githubusercontent.com/InCarNaTeDuDe/dec03/master/media/audio.mp3"
  ).play();
  // audio.onended = function () { alert("end") }

  var playerBoy = document.querySelector("#player");
  var imgEle = document.querySelector("#player img");

  var GAME_AREA_WIDTH = document.getElementById("game").clientWidth - 40;

  var pos = 0;
  var frameInd = 0;
  var id = setInterval(frame, 100);

  function frame() {
    if (pos > GAME_AREA_WIDTH) {
      clearInterval(id);
      imgEle.src =
        "https://raw.githubusercontent.com/InCarNaTeDuDe/dec03/master/images/happyboy.png";
      imgEle.style.height = "90px";
      imgEle.style.filter = "inherit";
      imgEle.style.top = "-30px";
      imgEle.style.left = "-35px";
      imgEle.style.position = "relative";
      imgEle.style.transform = "skewY(10deg)";
      imgEle.classList.add("swirl");
      inputbox.disabled = false;
      doc.querySelector(".container").scrollIntoView({
        block: "start",
        behavior: "smooth",
      });
    } else if (pos < GAME_AREA_WIDTH) {
      if (!playerBoy.classList.value.includes("hang")) {
        // If boy is hanging the moon, dont increment pos
        pos += 5;
      }

      frameInd += 1;
      playerBoy.style.left = pos + "px";
      if (frameInd <= 5) {
        imgEle.src = `https://raw.githubusercontent.com/InCarNaTeDuDe/dec03/master/images/${frameInd}.png`;
      } else {
        frameInd = 0;
      }

      if (pos == 105 && pos <= 110) {
        // Catch the Moon

        playerBoy.style.top = "90px";
        playerBoy.classList.add("hang");

        var hung = setTimeout(function () {
          playerBoy.classList.remove("hang");

          let ropeTimer = setInterval(() => {
            pos = 110;
            playerBoy.style.left = pos + "px";
            let playerOnTopPos = +playerBoy.style.top.replace("px", "");
            if (playerOnTopPos == 390) {
              clearInterval(ropeTimer);
            } else {
              playerBoy.style.top = playerOnTopPos + 2 + "px";
            }
          }, 1000);

          playerBoy.style.left = pos + "px";

          document.querySelector(".rope").style.opacity = "1";
          $("#game>span").animate({ opacity: 1 });
          $(".bday_wish").css({ opacity: 1 });

          clearInterval(hung);
        }, 3e3);
      }

      if (pos == 110) {
        // pos += 5
        playerBoy.style.left = pos + "px";
      }
    }
  }

  // setInterval(() => {
  //   if (pos < GAME_AREA_WIDTH) {
  //     pos++;
  //     frameInd += 1;
  //     if (frameInd <= 5) {
  //       imgEle.src = `./images/${frameInd}.png`
  //     } else {
  //       frameInd = 0;
  //     }
  //     playerBoy.style.left = pos + 5 + "px";
  //   }
  // }, 100);
}
/* End */

document.getElementsByTagName("input")[0].addEventListener("change", () => {
  playGame();
});
const colors = ["#219653", "#e91e63", "#ffeb3b", "#74ff1d"];
var doc = document.documentElement;

function createSquare() {
  const section = document.querySelector("section");
  const square = document.createElement("span");

  var size = Math.random() * 50;

  square.style.width = 20 + size + "px";
  square.style.height = 20 + size + "px";

  square.style.top = Math.random() * innerHeight + "px";
  square.style.left = Math.random() * innerWidth + "px";

  const bg = colors[Math.floor(Math.random() * colors.length)];

  square.style.background = bg;

  section.appendChild(square);

  setTimeout(() => {
    square.remove();
  }, 5000);
}
setInterval(() => {
  createSquare();
}, 150);

doc.querySelector("body").addEventListener("mousemove", onMouseMove);

function onMouseMove(e) {
  // doc.style.setProperty("--x", e.clientX + "px")
  var eyes = doc.querySelectorAll(".eye");
  eyes.forEach((eye) => {
    let x = eye.getBoundingClientRect().left + eye.clientWidth / 2;
    let y = eye.getBoundingClientRect().top + eye.clientHeight / 2;
    let radian = Math.atan2(event.pageX - x, event.pageY - y);
    let rot = radian * (180 / Math.PI) * -1 + 0;
    eye.style.transform = "rotate(" + rot + "deg)";
  });
}

/* FireCrackers Snippet Start */

// when animating on canvas, it is best to use requestAnimationFrame instead of setTimeout or setInterval
// not supported in all browsers though and sometimes needs a prefix, so we need a shim
window.requestAnimFrame = (function () {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    }
  );
})();

// now we will setup our basic variables for the demo
var canvas = document.getElementById("canvas"),
  ctx = canvas.getContext("2d"),
  // full screen dimensions
  cw = window.innerWidth,
  ch = window.innerHeight,
  // firework collection
  fireworks = [],
  // particle collection
  particles = [],
  // starting hue
  hue = 120,
  // when launching fireworks with a click, too many get launched at once without a limiter, one launch per 5 loop ticks
  limiterTotal = 5,
  limiterTick = 0,
  // this will time the auto launches of fireworks, one launch per 80 loop ticks
  timerTotal = 80,
  timerTick = 0,
  mousedown = false,
  // mouse x coordinate,
  mx,
  // mouse y coordinate
  my;

// set canvas dimensions
canvas.width = cw;
canvas.height = ch;

// now we are going to setup our function placeholders for the entire demo

// get a random number within a range
function random(min, max) {
  return Math.random() * (max - min) + min;
}

// calculate the distance between two points
function calculateDistance(p1x, p1y, p2x, p2y) {
  var xDistance = p1x - p2x,
    yDistance = p1y - p2y;
  return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

// create firework
function Firework(sx, sy, tx, ty) {
  // actual coordinates
  this.x = sx;
  this.y = sy;
  // starting coordinates
  this.sx = sx;
  this.sy = sy;
  // target coordinates
  this.tx = tx;
  this.ty = ty;
  // distance from starting point to target
  this.distanceToTarget = calculateDistance(sx, sy, tx, ty);
  this.distanceTraveled = 0;
  // track the past coordinates of each firework to create a trail effect, increase the coordinate count to create more prominent trails
  this.coordinates = [];
  this.coordinateCount = 3;
  // populate initial coordinate collection with the current coordinates
  while (this.coordinateCount--) {
    this.coordinates.push([this.x, this.y]);
  }
  this.angle = Math.atan2(ty - sy, tx - sx);
  this.speed = 2;
  this.acceleration = 1.05;
  this.brightness = random(50, 70);
  // circle target indicator radius
  this.targetRadius = 1;
}

// update firework
Firework.prototype.update = function (index) {
  // remove last item in coordinates array
  this.coordinates.pop();
  // add current coordinates to the start of the array
  this.coordinates.unshift([this.x, this.y]);

  // cycle the circle target indicator radius
  if (this.targetRadius < 8) {
    this.targetRadius += 0.3;
  } else {
    this.targetRadius = 1;
  }

  // speed up the firework
  this.speed *= this.acceleration;

  // get the current velocities based on angle and speed
  var vx = Math.cos(this.angle) * this.speed,
    vy = Math.sin(this.angle) * this.speed;
  // how far will the firework have traveled with velocities applied?
  this.distanceTraveled = calculateDistance(
    this.sx,
    this.sy,
    this.x + vx,
    this.y + vy
  );

  // if the distance traveled, including velocities, is greater than the initial distance to the target, then the target has been reached
  if (this.distanceTraveled >= this.distanceToTarget) {
    createParticles(this.tx, this.ty);
    // remove the firework, use the index passed into the update function to determine which to remove
    fireworks.splice(index, 1);
  } else {
    // target not reached, keep traveling
    this.x += vx;
    this.y += vy;
  }
};

// draw firework
Firework.prototype.draw = function () {
  ctx.beginPath();
  // move to the last tracked coordinate in the set, then draw a line to the current x and y
  ctx.moveTo(
    this.coordinates[this.coordinates.length - 1][0],
    this.coordinates[this.coordinates.length - 1][1]
  );
  ctx.lineTo(this.x, this.y);
  ctx.strokeStyle = "hsl(" + hue + ", 100%, " + this.brightness + "%)";
  ctx.stroke();

  ctx.beginPath();
  // draw the target for this firework with a pulsing circle
  ctx.arc(this.tx, this.ty, this.targetRadius, 0, Math.PI * 2);
  ctx.stroke();
};

// create particle
function Particle(x, y) {
  this.x = x;
  this.y = y;
  // track the past coordinates of each particle to create a trail effect, increase the coordinate count to create more prominent trails
  this.coordinates = [];
  this.coordinateCount = 5;
  while (this.coordinateCount--) {
    this.coordinates.push([this.x, this.y]);
  }
  // set a random angle in all possible directions, in radians
  this.angle = random(0, Math.PI * 2);
  this.speed = random(1, 10);
  // friction will slow the particle down
  this.friction = 0.95;
  // gravity will be applied and pull the particle down
  this.gravity = 1;
  // set the hue to a random number +-50 of the overall hue variable
  this.hue = random(hue - 50, hue + 50);
  this.brightness = random(50, 80);
  this.alpha = 1;
  // set how fast the particle fades out
  this.decay = random(0.015, 0.03);
}

// update particle
Particle.prototype.update = function (index) {
  // remove last item in coordinates array
  this.coordinates.pop();
  // add current coordinates to the start of the array
  this.coordinates.unshift([this.x, this.y]);
  // slow down the particle
  this.speed *= this.friction;
  // apply velocity
  this.x += Math.cos(this.angle) * this.speed;
  this.y += Math.sin(this.angle) * this.speed + this.gravity;
  // fade out the particle
  this.alpha -= this.decay;

  // remove the particle once the alpha is low enough, based on the passed in index
  if (this.alpha <= this.decay) {
    particles.splice(index, 1);
  }
};

// draw particle
Particle.prototype.draw = function () {
  ctx.beginPath();
  // move to the last tracked coordinates in the set, then draw a line to the current x and y
  ctx.moveTo(
    this.coordinates[this.coordinates.length - 1][0],
    this.coordinates[this.coordinates.length - 1][1]
  );
  ctx.lineTo(this.x, this.y);
  ctx.strokeStyle =
    "hsla(" +
    this.hue +
    ", 100%, " +
    this.brightness +
    "%, " +
    this.alpha +
    ")";
  ctx.stroke();
};

// create particle group/explosion
function createParticles(x, y) {
  // increase the particle count for a bigger explosion, beware of the canvas performance hit with the increased particles though
  var particleCount = 30;
  while (particleCount--) {
    particles.push(new Particle(x, y));
  }
}

// main demo loop
function loop() {
  // this function will run endlessly with requestAnimationFrame
  requestAnimFrame(loop);

  // increase the hue to get different colored fireworks over time
  //hue += 0.5;

  // create random color
  hue = random(0, 360);

  // normally, clearRect() would be used to clear the canvas
  // we want to create a trailing effect though
  // setting the composite operation to destination-out will allow us to clear the canvas at a specific opacity, rather than wiping it entirely
  ctx.globalCompositeOperation = "destination-out";
  // decrease the alpha property to create more prominent trails
  ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
  ctx.fillRect(0, 0, cw, ch);
  // change the composite operation back to our main mode
  // lighter creates bright highlight points as the fireworks and particles overlap each other
  ctx.globalCompositeOperation = "lighter";

  // loop over each firework, draw it, update it
  var i = fireworks.length;
  while (i--) {
    fireworks[i].draw();
    fireworks[i].update(i);
  }

  // loop over each particle, draw it, update it
  var i = particles.length;
  while (i--) {
    particles[i].draw();
    particles[i].update(i);
  }

  // launch fireworks automatically to random coordinates, when the mouse isn't down
  if (timerTick >= timerTotal) {
    if (!mousedown) {
      // start the firework at the bottom middle of the screen, then set the random target coordinates, the random y coordinates will be set within the range of the top half of the screen
      fireworks.push(
        new Firework(cw / 2, ch, random(0, cw), random(0, ch / 2))
      );
      timerTick = 0;
    }
  } else {
    timerTick++;
  }

  // limit the rate at which fireworks get launched when mouse is down
  if (limiterTick >= limiterTotal) {
    if (mousedown) {
      // start the firework at the bottom middle of the screen, then set the current mouse coordinates as the target
      fireworks.push(new Firework(cw / 2, ch, mx, my));
      limiterTick = 0;
    }
  } else {
    limiterTick++;
  }
}

// mouse event bindings
// update the mouse coordinates on mousemove
canvas.addEventListener("mousemove", function (e) {
  mx = e.pageX - canvas.offsetLeft;
  my = e.pageY - canvas.offsetTop;
});

// toggle mousedown state and prevent canvas from being selected
canvas.addEventListener("mousedown", function (e) {
  e.preventDefault();
  mousedown = true;
});

canvas.addEventListener("mouseup", function (e) {
  e.preventDefault();
  mousedown = false;
});

// once the window loads, we are ready for some fireworks!
window.onload = loop;

/* Fire Crackers Snippet END */
