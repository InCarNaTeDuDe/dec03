/* Game Script*/
function playGame() {
  const audio = new Audio("./media/audio.mp3").play();
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
    } else if (pos < GAME_AREA_WIDTH) {
      if (!playerBoy.classList.value.includes("hang")) {
        // If boy is hanging the moon, dont increment pos
        pos += 5;
      }

      frameInd += 1;
      playerBoy.style.left = pos + "px";
      if (frameInd <= 5) {
        imgEle.src = `./images/${frameInd}.png`;
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
