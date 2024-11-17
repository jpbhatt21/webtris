import { useEffect, useState } from "react";
import { automateAnalyzer, automatic, newPiece, rotPiece } from "./Helper";
let inter: any = null;
let bag = [0, 1, 2, 3, 4, 5, 6];
let random = bag[Math.floor(Math.random() * bag.length)];
bag = bag.filter((val) => val !== random);
let nxt = bag[Math.floor(Math.random() * bag.length)];
let hld = -1;
let initTime = new Date().getTime();
let lclr = 0;
let lv = 0;
bag = bag.filter((val) => val !== nxt);
let activePos = [
  [
    [0, 3],
    [0, 4],
    [0, 5],
    [0, 6],
  ],
  [
    [0, 3],
    [1, 3],
    [1, 4],
    [1, 5],
  ],
  [
    [0, 5],
    [1, 5],
    [1, 4],
    [1, 3],
  ],
  [
    [0, 4],
    [0, 5],
    [1, 4],
    [1, 5],
  ],
  [
    [0, 4],
    [0, 5],
    [1, 4],
    [1, 3],
  ],
  [
    [0, 3],
    [0, 4],
    [1, 4],
    [1, 5],
  ],
  [
    [0, 4],
    [1, 3],
    [1, 4],
    [1, 5],
  ],
];
function App() {
  let bgcol = "#555";
  const [linesCleared, setLinesCleared] = useState(lclr);
  const [level, setLevel] = useState(lv);
  let ocp = "#ebcb8b";
  let act = "#a3be8c";
  let ghosCol = "#81a1c1";
  let [key, setKey] = useState(0);
  let [board, setBoard] = useState(
    Array.from({ length: 20 }, (_, i) =>
      Array.from({ length: 10 }, (_, j) => ({
        occupied: false,
        active: false,
        color: bgcol,
      }))
    )
  );
  const [pieceCount, setPieceCount] = useState(0);
  const [score, setScore] = useState(0);
  const [lcRect, setLcRect] = useState([0, 0, 0, 0]);
  const [active, setActive] = useState(
    JSON.parse(JSON.stringify(activePos[random]))
  );
  const [ghost, setGhost] = useState(
    JSON.parse(JSON.stringify(activePos[random]))
  );
  let shapesy = [
    "1111",
    "100 111",
    "001 111",
    "11 11",
    "011 110",
    "110 011",
    "1 111",
    "",
  ];
  let [nextShape, setNextShape] = useState(nxt);
  let [holdShape, setHoldShape] = useState(7);
  let timeDiff = (new Date().getTime() - initTime)/1000;
  let sec= Math.floor(timeDiff%60);
  let min= Math.floor(timeDiff/60);
  useEffect(() => {
    //   setBoard(newPiece(board,random));
    //   setKey(key+1);

    if (inter == null) {
      let act = JSON.parse(JSON.stringify(activePos[random]));
      let shape = random;
      let keys = {
        left: false,
        right: false,
        down: false,
        up: false,
        space: false,
        alt: false,
        shift: false,
      };
      let rot = 0;
      window.addEventListener("keydown", (e) => {
        if (e.code === "KeyA") {
          //setKeys((prev) => ({ ...prev, left: true }));
          keys.left = true;
        }
        if (e.code === "KeyD") {
          //setKeys((prev) => ({ ...prev, right: true }));
          keys.right = true;
        }
        if (e.code === "KeyS") {
          //setKeys((prev) => ({ ...prev, down: true }));
          keys.down = true;
        }
        if (e.code === "KeyW") {
          //setKeys((prev) => ({ ...prev, up: true }));
          keys.up = true;
        }
        if (e.code === "Space") {
          //setKeys((prev) => ({ ...prev, space: true }));
          keys.space = true;
        }
        if (e.code === "AltLeft") {
          //setKeys((prev) => ({ ...prev, alt: true }));
          keys.alt = true;
        }
        if (e.code === "ShiftLeft") {
          //setKeys((prev) => ({ ...prev, shift: true }));
          keys.shift = true;
        }
      });
      window.addEventListener("keyup", (e) => {
        if (e.code === "KeyA") {
          //setKeys((prev) => ({ ...prev, left: false }));
          keys.left = false;
          movClock = new Date().getTime() - lrSpeed;
        }
        if (e.code === "KeyD") {
          //setKeys((prev) => ({ ...prev, right: false }));
          keys.right = false;
          movClock = new Date().getTime() - lrSpeed;
        }
        if (e.code === "KeyS") {
          //setKeys((prev) => ({ ...prev, down: false }));
          keys.down = false;
        }
        if (e.code === "KeyW") {
          //setKeys((prev) => ({ ...prev, up: false }));
          keys.up = false;
        }
        if (e.code === "Space") {
          //setKeys((prev) => ({ ...prev, space: false }));
          keys.space = false;
          rotClock = new Date().getTime() - 150;
        }
        if (e.code === "AltLeft") {
          e.preventDefault();
          //setKeys((prev) => ({ ...prev, alt: false }));
          keys.alt = false;
          rotClock = new Date().getTime() - 150;
        }
        if (e.code === "ShiftLeft") {
          //setKeys((prev) => ({ ...prev, shift: false }));
          keys.shift = false;
        }
      });
      let held = false;
      function form(x) {
        return 1500 * Math.pow(0.76, x) + 2.21*x;
      }
      let movClock = new Date().getTime();
      let rotClock = new Date().getTime();
      let downClock = new Date().getTime();
      let upClock = new Date().getTime();
      let lcl=[0,0,0,0]
      let cur = new Date().getTime();
      let ghos = JSON.parse(JSON.stringify(activePos[random]));
      let speed = 1500; //smaller is faster, in ms
      let lrSpeed = 100; //smaller is faster, in ms
      let upSpeed = 250; //smaller is faster, in ms
      function createNewPiece(
        act: number[][],
        inter: number,
        hldr: boolean = true
      ) {
        if (hldr) {
          held = false;
          act.forEach((pos: number[]) => {
            board[pos[0]][pos[1]].occupied = true;
          });
          let lines = 0;
          board.forEach((row, i) => {
            if (row.every((cell) => cell.occupied)) {
              lines++;
              row.forEach((cell) => {
                cell.occupied = false;
              });
              board.splice(i, 1);
              board.unshift(
                Array.from({ length: 10 }, (_, j) => ({
                  occupied: false,
                  active: false,
                  color: bgcol,
                }))
              );
              setBoard(JSON.parse(JSON.stringify(board)));
            }
          });
          if (lines > 0) {
            lcl[lines-1]++;
            setLcRect(lcl);}
          lclr += lines;
          setScore((prev) => prev + [0, 40, 100, 300, 1200][lines] * (lv + 1));
          lv = Math.floor(lclr / 10);
          setLevel(lv);
          speed = (lv<20?form(lv):50);
          setLinesCleared(lclr);
          setBoard(board);
          
        }
        let random = nxt;
        nxt = bag[Math.floor(Math.random() * bag.length)];
        bag = bag.filter((val) => val !== nxt);
        if (bag.length === 0) {
          bag = [0, 1, 2, 3, 4, 5, 6];
        }
        for (let i = 0; i < 4; i++) {
          if (
            board[JSON.parse(JSON.stringify(activePos[random]))[i][0]][
              JSON.parse(JSON.stringify(activePos[random]))[i][1]
            ].occupied
          ) {
            setActive([
              [-10, -10],
              [-10, -10],
              [-10, -10],
              [-10, -10],
            ]);
            clearInterval(inter);
            inter = -0;
            break;
          }
        }
        setActive(JSON.parse(JSON.stringify(activePos[random])));
        setNextShape(nxt);
        shape = random;
        rot = 0;
        act = JSON.parse(
          JSON.stringify(JSON.parse(JSON.stringify(activePos[random])))
        );
        return [act, shape, rot];
        return automatic(JSON.parse(JSON.stringify(board)),JSON.parse(JSON.stringify(act)),JSON.parse(JSON.stringify(shape)),0);
       
      }
      let move=false
      let changehold=false;
      inter = setInterval(() => {
        cur = new Date().getTime();
        if(!move){
          
          changehold=automateAnalyzer(JSON.parse(JSON.stringify(board)),JSON.parse(JSON.stringify(act)),JSON.parse(JSON.stringify(shape)),JSON.parse(JSON.stringify(rot)),JSON.parse(JSON.stringify(nxt)),hld,hld>-1&&!held);
          if(!changehold){
          [act, shape, rot] = automatic(JSON.parse(JSON.stringify(board)),JSON.parse(JSON.stringify(act)),JSON.parse(JSON.stringify(shape)),rot);
          move=true;}
        }
        if (
          cur - movClock >= lrSpeed &&
          keys.left &&
          act[0][1] !== 0 &&
          act[1][1] !== 0 &&
          act[2][1] !== 0 &&
          act[3][1] !== 0 &&
          !board[act[0][0]][act[0][1] - 1].occupied &&
          !board[act[1][0]][act[1][1] - 1].occupied &&
          !board[act[2][0]][act[2][1] - 1].occupied &&
          !board[act[3][0]][act[3][1] - 1].occupied
        ) {
          act[0][1]--;
          act[1][1]--;
          act[2][1]--;
          act[3][1]--;
          movClock = new Date().getTime();
        } else if (
          cur - movClock >= lrSpeed &&
          keys.right &&
          act[0][1] !== 9 &&
          act[1][1] !== 9 &&
          act[2][1] !== 9 &&
          act[3][1] !== 9 &&
          !board[act[0][0]][act[0][1] + 1].occupied &&
          !board[act[1][0]][act[1][1] + 1].occupied &&
          !board[act[2][0]][act[2][1] + 1].occupied &&
          !board[act[3][0]][act[3][1] + 1].occupied
        ) {
          act[0][1]++;
          act[1][1]++;
          act[2][1]++;
          act[3][1]++;
          movClock = new Date().getTime();
        } else if (
          cur - movClock >= lrSpeed &&
          keys.down &&
          act[0][0] != 19 &&
          act[1][0] != 19 &&
          act[2][0] != 19 &&
          act[3][0] != 19 &&
          !board[act[0][0] + 1][act[0][1]].occupied &&
          !board[act[1][0] + 1][act[1][1]].occupied &&
          !board[act[2][0] + 1][act[2][1]].occupied &&
          !board[act[3][0] + 1][act[3][1]].occupied
        ) {
          act[0][0]++;
          act[1][0]++;
          act[2][0]++;
          act[3][0]++;
          movClock = new Date().getTime();
        }
        if (cur - rotClock >= 150 && keys.space) {
          let temp = JSON.parse(JSON.stringify(act));
          rotClock = cur;
          let prevRot = JSON.parse(JSON.stringify(rot));
          for (let i = 0; i < 5 && prevRot === rot; i++) {
            act = JSON.parse(JSON.stringify(temp));
            switch (shape) {
              case 0:
                switch (i) {
                  case 0:
                    [act, rot] = rotPiece(board, shape, rot, act);
                    break;
                  case 1:
                    switch (rot) {
                      case 0:
                        [act, rot] = rotPiece(
                          board,
                          shape,
                          rot,
                          act.map((pos) => [pos[0], pos[1] - 2])
                        );
                        break;
                      case 1:
                        [act, rot] = rotPiece(
                          board,
                          shape,
                          rot,
                          act.map((pos) => [pos[0], pos[1] - 1])
                        );
                        break;
                      case 2:
                        [act, rot] = rotPiece(
                          board,
                          shape,
                          rot,
                          act.map((pos) => [pos[0], pos[1] + 2])
                        );
                        break;
                      case 3:
                        
                        [act, rot] = rotPiece(
                          board,
                          shape,
                          rot,
                          act.map((pos) => [pos[0], pos[1] + 1])
                        );
                        break;
                    }
                    break;
                  case 2:
                    switch (rot) {
                      case 3:
                        [act, rot] = rotPiece(
                          board,
                          shape,
                          rot,
                          act.map((pos) => [pos[0], pos[1] - 2])
                        );
                        break;
                      case 2:
                        [act, rot] = rotPiece(
                          board,
                          shape,
                          rot,
                          act.map((pos) => [pos[0], pos[1] - 1])
                        );
                        break;
                      case 1:
                        [act, rot] = rotPiece(
                          board,
                          shape,
                          rot,
                          act.map((pos) => [pos[0], pos[1] + 2])
                        );
                        break;
                      case 0:
                        [act, rot] = rotPiece(
                          board,
                          shape,
                          rot,
                          act.map((pos) => [pos[0], pos[1] + 1])
                        );
                        break;
                    }
                    break;
                  case 3:
                    switch (rot) {
                      case 0:
                        [act, rot] = rotPiece(
                          board,
                          shape,
                          rot,
                          act.map((pos) => [pos[0] - 1, pos[1] - 2])
                        );
                        break;
                      case 1:
                        [act, rot] = rotPiece(
                          board,
                          shape,
                          rot,
                          act.map((pos) => [pos[0] + 2, pos[1] - 1])
                        );
                        break;
                      case 2:
                        [act, rot] = rotPiece(
                          board,
                          shape,
                          rot,
                          act.map((pos) => [pos[0] + 1, pos[1] + 2])
                        );
                        break;
                      case 3:
                        [act, rot] = rotPiece(
                          board,
                          shape,
                          rot,
                          act.map((pos) => [pos[0] - 2, pos[1] + 1])
                        );
                        break;
                    }
                    break;
                  case 4:
                    switch (rot) {
                      case 0:
                        [act, rot] = rotPiece(
                          board,
                          shape,
                          rot,
                          act.map((pos) => [pos[0] + 2, pos[1] + 1])
                        );
                        break;
                      case 1:
                        [act, rot] = rotPiece(
                          board,
                          shape,
                          rot,
                          act.map((pos) => [pos[0] - 1, pos[1] + 2])
                        );
                        break;
                      case 2:
                        [act, rot] = rotPiece(
                          board,
                          shape,
                          rot,
                          act.map((pos) => [pos[0] - 2, pos[1] - 1])
                        );
                        break;
                      case 3:
                        [act, rot] = rotPiece(
                          board,
                          shape,
                          rot,
                          act.map((pos) => [pos[0] + 1, pos[1] - 2])
                        );
                        break;
                    }
                    break;
                }
                break;
              default:
                switch (i) {
                  case 0:
                    [act, rot] = rotPiece(board, shape, rot, act);
                    break;
                  case 1:
                    if (rot == 0 || rot == 3) {
                      [act, rot] = rotPiece(
                        board,
                        shape,
                        rot,
                        act.map((pos) => [pos[0], pos[1] - 1])
                      );
                    } else {
                      [act, rot] = rotPiece(
                        board,
                        shape,
                        rot,
                        act.map((pos) => [pos[0], pos[1] + 1])
                      );
                    }
                    break;
                  case 2:
                    switch (rot) {
                      case 0:
                        [act, rot] = rotPiece(
                          board,
                          shape,
                          rot,
                          act.map((pos) => [pos[0] + 1, pos[1] - 1])
                        );
                        break;
                      case 1:
                        [act, rot] = rotPiece(
                          board,
                          shape,
                          rot,
                          act.map((pos) => [pos[0] - 1, pos[1] + 1])
                        );
                        break;
                      case 2:
                        [act, rot] = rotPiece(
                          board,
                          shape,
                          rot,
                          act.map((pos) => [pos[0] + 1, pos[1] + 1])
                        );
                        break;
                      case 3:
                        [act, rot] = rotPiece(
                          board,
                          shape,
                          rot,
                          act.map((pos) => [pos[0] - 1, pos[1] - 1])
                        );
                        break;
                    }
                    break;
                  case 3:
                    switch (rot) {
                      case 0:
                      case 2:
                        [act, rot] = rotPiece(
                          board,
                          shape,
                          rot,
                          act.map((pos) => [pos[0] - 2, pos[1]])
                        );
                        break;
                      case 1:
                      case 3:
                        [act, rot] = rotPiece(
                          board,
                          shape,
                          rot,
                          act.map((pos) => [pos[0] + 2, pos[1]])
                        );
                        break;
                    }
                    break;
                  case 4:
                    switch (rot) {
                      case 0:
                        [act, rot] = rotPiece(
                          board,
                          shape,
                          rot,
                          act.map((pos) => [pos[0] - 2, pos[1] - 1])
                        );
                        break;
                      case 1:
                        [act, rot] = rotPiece(
                          board,
                          shape,
                          rot,
                          act.map((pos) => [pos[0] + 2, pos[1] + 1])
                        );
                        break;
                      case 2:
                        [act, rot] = rotPiece(
                          board,
                          shape,
                          rot,
                          act.map((pos) => [pos[0] - 2, pos[1] + 1])
                        );
                        break;
                      case 3:
                        [act, rot] = rotPiece(
                          board,
                          shape,
                          rot,
                          act.map((pos) => [pos[0] + 2, pos[1] - 1])
                        );
                        break;
                    }
                }
            }
          }
          if (prevRot === rot) {
            act = JSON.parse(JSON.stringify(temp));
          }
          let wrong = false;
          act.forEach((pos) => {
            if (
              pos[0] < 0 ||
              pos[0] > 19 ||
              pos[1] < 0 ||
              pos[1] > 9 ||
              board[pos[0]][pos[1]].occupied
            ) {
              wrong = true;
            }
          });
          if (wrong) {
            act = JSON.parse(JSON.stringify(temp));
            rot = prevRot;
          }
        }
        if (cur - rotClock >= 150 && keys.alt) {
          rotClock = cur;
          [act, rot] = rotPiece(board, shape, rot, act);
          [act, rot] = rotPiece(board, shape, rot, act);
          [act, rot] = rotPiece(board, shape, rot, act);
        }
        if ((cur - rotClock >= 150 && keys.shift)||changehold) {
          if(changehold){
            changehold=false;
          }
          if (hld === -1) {
            held = true;
            hld = shape;
            [act, shape, rot] = createNewPiece(act, inter, false);
            setHoldShape(hld);
            setActive(JSON.parse(JSON.stringify(act)));
          } else if (!held) {
            held = true;
            let temp = hld;
            hld = shape;
            act = JSON.parse(JSON.stringify(activePos[temp]));
            shape = temp;
            rot = 0;
            setHoldShape(hld);
            setActive(JSON.parse(JSON.stringify(act)));
          }
          rotClock = cur;
        }

        if (
          cur - downClock >= speed &&
          act[0][0] !== 19 &&
          act[1][0] !== 19 &&
          act[2][0] !== 19 &&
          act[3][0] !== 19 &&
          !board[act[0][0] + 1][act[0][1]].occupied &&
          !board[act[1][0] + 1][act[1][1]].occupied &&
          !board[act[2][0] + 1][act[2][1]].occupied &&
          !board[act[3][0] + 1][act[3][1]].occupied
        ) {
          act[0][0]++;
          act[1][0]++;
          act[2][0]++;
          act[3][0]++;
          downClock = new Date().getTime();
        } else if (cur - downClock >= speed && cur - downClock >= 1000) {
          [act, shape, rot] = createNewPiece(act, inter);
          downClock = new Date().getTime();
        }
        if ((cur - upClock >= upSpeed && keys.up )||move) {
          move=false;
          while (
            act[0][0] !== 19 &&
            act[1][0] !== 19 &&
            act[2][0] !== 19 &&
            act[3][0] !== 19 &&
            !board[act[0][0] + 1][act[0][1]].occupied &&
            !board[act[1][0] + 1][act[1][1]].occupied &&
            !board[act[2][0] + 1][act[2][1]].occupied &&
            !board[act[3][0] + 1][act[3][1]].occupied
          ) {
            act[0][0]++;
            act[1][0]++;
            act[2][0]++;
            act[3][0]++;
          }
          [act, shape, rot] = createNewPiece(act, inter);
          upClock = new Date().getTime();
          downClock = new Date().getTime();
        }
        setActive(() => [...act]);
        ghos = JSON.parse(JSON.stringify(act));
        while (
          ghos[0][0] !== 19 &&
          ghos[1][0] !== 19 &&
          ghos[2][0] !== 19 &&
          ghos[3][0] !== 19 &&
          !board[ghos[0][0] + 1][ghos[0][1]].occupied &&
          !board[ghos[1][0] + 1][ghos[1][1]].occupied &&
          !board[ghos[2][0] + 1][ghos[2][1]].occupied &&
          !board[ghos[3][0] + 1][ghos[3][1]].occupied
        ) {
          ghos[0][0]++;
          ghos[1][0]++;
          ghos[2][0]++;
          ghos[3][0]++;
        }
        setGhost(() => JSON.parse(JSON.stringify(ghos)));
      }, 0);
    }
  }, []);

  return (
    <>
      <div className="fixed w-full h-full flex items-center justify-center">
        <div className="h-full flex flex-col justify-center items-center  text-white">
          <div className="h-full flex flex-col items-center justify-center text-white">
            <div className="w-[18vmin] aspect-square bord er flex flex-col items-center justify-center ">
              {shapesy[holdShape].split(" ").map((row, i) => {
                return (
                  <div className="w-full h-[4vmin] flex justify-center ">
                    {row
                      .split("")
                      .map((cell, j) =>
                        cell !== "0" ? (
                          <div
                            className="w-[4vmin] aspect-square rounded-[0.4vmin] border border-blank"
                            style={{ backgroundColor: act }}
                          ></div>
                        ) : (
                          <div className="w-[4vmin] aspect-square "></div>
                        )
                      )}
                  </div>
                );
              })}
            </div>
            Hold
          </div>
          <div className="h-full flex flex-col items-center justify-center text-white">
            <div>Level :{level}</div>
            <div>Lines :{linesCleared +"/"+((level+1)*10)}</div>
            {["Single","Double","Triple","Tetris"].map((val,i)=><div>{val} : {Math.floor(lcRect[i])}</div>)}
          </div>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className=" w-[45vmin] h-[90vmin]"
          viewBox="0 0 1060 2110"
          fill="none"
          key={key}
        >
          {board.map((row, i) =>
            row.map((cell, j) => (
              <rect
                width={100}
                className="duration-100 ease-in-out"
                height={100}
                rx={10}
                x={5 + j * 105}
                y={5 + i * 105}
                fill={cell.active ? act : cell.occupied ? ocp : bgcol}
                key={`${i}-${j}`}
              />
            ))
          )}
          {ghost.map((pos, ind) => (
            <rect
              className="duration-[25ms] ease-in-out"
              width={100}
              height={100}
              rx={10}
              x={5 + pos[1] * 105}
              y={5 + pos[0] * 105}
              fill={ghosCol}
              key={"ghos" + ind}
            />
          ))}
          {active.map((pos, ind) => (
            <rect
              className="duration-[25ms] ease-in-out"
              width={100}
              height={100}
              rx={10}
              x={5 + pos[1] * 105}
              y={5 + pos[0] * 105}
              fill={act}
              key={"act" + ind}
            />
          ))}
        </svg>
        <div className="h-full flex flex-col justify-center items-center  text-white">
          <div className="h-full flex flex-col items-center justify-center text-white">
            <div className="w-[18vmin] aspect-square bord er flex flex-col items-center justify-center ">
              {shapesy[nextShape].split(" ").map((row, i) => {
                return (
                  <div className="w-full h-[4vmin] flex justify-center ">
                    {row
                      .split("")
                      .map((cell, j) =>
                        cell !== "0" ? (
                          <div
                            className="w-[4vmin] aspect-square rounded-[0.4vmin] border border-blank"
                            style={{ backgroundColor: act }}
                          ></div>
                        ) : (
                          <div className="w-[4vmin] aspect-square "></div>
                        )
                      )}
                  </div>
                );
              })}
            </div>
            Next
          </div>
          <div className="h-full flex flex-col items-center justify-center text-white">
            <div>Score :{score}</div>
            <div>Time :{(min<10?"0":"")+min+":"+(sec<10?"0":"")+sec}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
