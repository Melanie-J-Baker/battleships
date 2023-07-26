(() => {
  "use strict";
  var e = {
    d: (t, a) => {
      for (var n in a)
        e.o(a, n) &&
          !e.o(t, n) &&
          Object.defineProperty(t, n, { enumerable: !0, get: a[n] });
    },
    o: (e, t) => Object.prototype.hasOwnProperty.call(e, t),
  };
  e.d(
    {},
    {
      lA: () => y,
      UR: () => C,
      n1: () => g,
      rH: () => S,
      hM: () => f,
      mO: () => b,
    },
  );
  function t(e) {
    var t = document.getElementById("info");
    e.dataTransfer.setData("text", e.target.id),
      e.dataTransfer.setData("text/class", e.target.classList),
      (t.textContent = "Place your ships on the grid. Click to rotate ship");
  }
  function a(e) {
    e.preventDefault(), (e.dataTransfer.dropEffect = "move");
  }
  function n(e) {
    e.preventDefault();
    var t = document.getElementById("info"),
      a = e.dataTransfer.getData("text"),
      n = e.dataTransfer.getData("text/class"),
      i = document.getElementById(a),
      s = i.children.length,
      c = (function (e, t, a) {
        var n,
          r = t.slice(0, -1),
          o = e.slice(1),
          i = o.split(",")[0],
          s = o.split(",")[1];
        switch (r) {
          case "carrier":
            n = 5;
            break;
          case "battleship":
            n = 4;
            break;
          case "destroyer":
            n = 3;
            break;
          case "patrolboat":
            n = 2;
        }
        return a.includes("vertical")
          ? +i + n <= 11 && +i > 0 && s > 0 && s <= 10
          : +s + n <= 11 && +s > 0 && i > 0 && i <= 10;
      })(e.target.id, a, n),
      l = [];
    if (!1 === c) t.textContent = "Boat cannot be placed there!";
    else
      for (var d = 0; d < s; d++)
        if (n.includes("vertical")) {
          var u = e.target.id.slice(1),
            m = u.split(",")[0],
            v = u.split(",")[1],
            p = (+m + d).toString(),
            h = "p" + p + "," + v,
            f = p + "," + v;
          if (!0 === r(b, h)) {
            l.push(f);
            var g = document.getElementById(h);
            (i.children[0].id = h), g.parentNode.replaceChild(i.children[0], g);
          } else t.textContent = "Boat cannot be placed there!";
        } else {
          var C = e.target.id.slice(1),
            y = C.split(",")[0],
            k = (+C.split(",")[1] + d).toString(),
            E = y + "," + k,
            B = "p" + y + "," + k;
          if (!0 === r(b, B)) {
            l.push(E);
            var q = document.getElementById(B);
            (i.children[0].id = B), q.parentNode.replaceChild(i.children[0], q);
          } else t.textContent = "Boat cannot be placed there!";
        }
    b.newShip(l), o(b), 30 === b.occupied.length && S();
  }
  function r(e, t) {
    return !e.occupied.includes(t);
  }
  function o(e) {
    for (
      var t = document.getElementById("playerGrid").children, a = 0;
      a < t.length;
      a++
    ) {
      var n = t[a].id.slice(1);
      e.occupied.includes(n) && (t[a].className = "square pSquare occupied");
    }
  }
  function i(e) {
    for (
      var t = document.getElementsByClassName("square cSquare"), a = 0;
      a < t.length;
      a++
    )
      !0 === e.hits.includes(t[a].id.slice(1))
        ? (t[a].className = "square cSquare hit")
        : !0 === e.misses.includes(t[a].id.slice(1)) &&
          (t[a].className = "square cSquare miss");
  }
  function s() {
    for (
      var e = document.getElementsByClassName("square cSquare"), t = 0;
      t < e.length;
      t++
    )
      e[t].removeEventListener("click", f.playerMove),
        !1 === e[t].classList.contains("hit") &&
          !1 === e[t].classList.contains("miss") &&
          e[t].addEventListener("click", f.playerMove);
  }
  function c() {
    for (
      var e = document.getElementsByClassName("square cSquare"), t = 0;
      t < e.length;
      t++
    )
      e[t].removeEventListener("click", f.playerMove);
  }
  function l() {
    var e = document.getElementById("info");
    "Computer is taking their turn." !== e.textContent
      ? setTimeout(function () {
          e.textContent = "Your move! Choose a square to attack.";
        }, 2e3)
      : (e.textContent = "Your move! Choose a square to attack.");
  }
  function d(e, t) {
    var a = document.getElementById("info"),
      n = t.shipCoords.length;
    switch ((console.log(e), n)) {
      case 5:
        a.textContent = "".concat(e, "'s Carrier sunk!");
        break;
      case 4:
        a.textContent = "".concat(e, "'s Battleship sunk!");
        break;
      case 3:
        a.textContent = "".concat(e, "'s Destroyer sunk!");
        break;
      case 2:
        a.textContent = "".concat(e, "'s Patrol boat sunk!");
    }
  }
  const u = function (e) {
    var t = e,
      a = [],
      n = [],
      r = [],
      o = [];
    return {
      newShip: function (e) {
        if (
          !0 ===
          n.some(function (t) {
            return e.indexOf(t) >= 0;
          })
        )
          return "Coordinate(s) already occupied";
        var t = (function (e) {
          var t = [];
          return (
            e.map(function (e) {
              return t.push(e);
            }),
            {
              hit: function (e) {
                t[e] = "hit";
              },
              isSunk: function () {
                return t.every(function (e) {
                  return "hit" === e;
                });
              },
              shipCoords: t,
            }
          );
        })(e);
        a.push(t);
        for (var r = 0; r < t.shipCoords.length; r++) n.push(t.shipCoords[r]);
      },
      receiveAttack: function (e) {
        if (!1 !== o.includes(e) || !1 !== r.includes(e))
          return "Square has already been attacked!";
        for (var i = 0; i < a.length; i++)
          for (var s = 0; s < a[i].shipCoords.length; s++)
            a[i].shipCoords[s] === e &&
              (a[i].hit(s), o.push(e), a[i].isSunk() && d(t, a[i]));
        !1 === n.includes(e) && r.push(e);
      },
      allSunk: function () {
        return a
          .map(function (e) {
            return e.isSunk();
          })
          .every(function (e) {
            return !0 === e;
          });
      },
      shipCoordsBoard: a,
      misses: r,
      hits: o,
      occupied: n,
    };
  };
  var m = [
    "1,1",
    "1,2",
    "1,3",
    "1,4",
    "1,5",
    "1,6",
    "1,7",
    "1,8",
    "1,9",
    "1,10",
    "2,1",
    "2,2",
    "2,3",
    "2,4",
    "2,5",
    "2,6",
    "2,7",
    "2,8",
    "2,9",
    "2,10",
    "3,1",
    "3,2",
    "3,3",
    "3,4",
    "3,5",
    "3,6",
    "3,7",
    "3,8",
    "3,9",
    "3,10",
    "4,1",
    "4,2",
    "4,3",
    "4,4",
    "4,5",
    "4,6",
    "4,7",
    "4,8",
    "4,9",
    "4,10",
    "5,1",
    "5,2",
    "5,3",
    "5,4",
    "5,5",
    "5,6",
    "5,7",
    "5,8",
    "5,9",
    "5,10",
    "6,1",
    "6,2",
    "6,3",
    "6,4",
    "6,5",
    "6,6",
    "6,7",
    "6,8",
    "6,9",
    "6,10",
    "7,1",
    "7,2",
    "7,3",
    "7,4",
    "7,5",
    "7,6",
    "7,7",
    "7,8",
    "7,9",
    "7,10",
    "8,1",
    "8,2",
    "8,3",
    "8,4",
    "8,5",
    "8,6",
    "8,7",
    "8,8",
    "8,9",
    "8,10",
    "9,1",
    "9,2",
    "9,3",
    "9,4",
    "9,5",
    "9,6",
    "9,7",
    "9,8",
    "9,9",
    "9,10",
    "10,1",
    "10,2",
    "10,3",
    "10,4",
    "10,5",
    "10,6",
    "10,7",
    "10,8",
    "10,9",
    "10,10",
  ];
  const v = function () {
    var e = null,
      t = function (t) {
        var a;
        if (null === e) {
          var n =
            C.availableMoves[
              Math.floor(Math.random() * C.availableMoves.length)
            ];
          t.receiveAttack(n), (e = t.hits.includes(n) ? m.indexOf(n) : null);
          var r = C.availableMoves.indexOf(n);
          r > -1 && C.availableMoves.splice(r, 1);
        } else if (null !== e) {
          var o = (function (e) {
              for (var t, a, n = [], r = 0, o = 0; o < 10; o++) {
                n.push([]);
                for (var i = 0; i < 10 && r < 100; i++) n[o].push(r), r++;
              }
              var s = parseInt(e / 10),
                c = n[s].findIndex(function (t) {
                  return t === e;
                }),
                l = n[s][c + 1],
                d = n[s][c - 1],
                u = null === (t = n[s - 1]) || void 0 === t ? void 0 : t[c];
              return {
                right: l,
                left: d,
                bottom: null === (a = n[s + 1]) || void 0 === a ? void 0 : a[c],
                top: u,
              };
            })(e),
            i = Object.values(o).filter(function (e) {
              return void 0 !== e;
            }),
            s = i[Math.floor(Math.random() * i.length)],
            c = m[s];
          t.receiveAttack(c),
            (e = t.hits.includes(c) ? m.indexOf(c) : null),
            (a = C.availableMoves.indexOf(c)) > -1 &&
              C.availableMoves.splice(a, 1);
        }
      },
      a = function () {
        t(b),
          (function (e) {
            for (
              var t = document.getElementsByClassName("square pSquare"), a = 0;
              a < t.length;
              a++
            )
              !0 === e.hits.includes(t[a].id.slice(1))
                ? (t[a].className = "square pSquare hit")
                : !0 === e.misses.includes(t[a].id.slice(1)) &&
                  (t[a].className = "square pSquare miss");
          })(b),
          !0 === b.allSunk()
            ? ((document.getElementById("info").textContent =
                "Computer has sunk all your ships! You lose!"),
              c())
            : (l(), s());
      };
    return {
      attack: function (e, t) {
        e.receiveAttack(t);
        var a = f.availableMoves.indexOf(t);
        a > -1 && f.availableMoves.splice(a, 1);
      },
      randomAttack: t,
      availableMoves: [
        "1,1",
        "1,2",
        "1,3",
        "1,4",
        "1,5",
        "1,6",
        "1,7",
        "1,8",
        "1,9",
        "1,10",
        "2,1",
        "2,2",
        "2,3",
        "2,4",
        "2,5",
        "2,6",
        "2,7",
        "2,8",
        "2,9",
        "2,10",
        "3,1",
        "3,2",
        "3,3",
        "3,4",
        "3,5",
        "3,6",
        "3,7",
        "3,8",
        "3,9",
        "3,10",
        "4,1",
        "4,2",
        "4,3",
        "4,4",
        "4,5",
        "4,6",
        "4,7",
        "4,8",
        "4,9",
        "4,10",
        "5,1",
        "5,2",
        "5,3",
        "5,4",
        "5,5",
        "5,6",
        "5,7",
        "5,8",
        "5,9",
        "5,10",
        "6,1",
        "6,2",
        "6,3",
        "6,4",
        "6,5",
        "6,6",
        "6,7",
        "6,8",
        "6,9",
        "6,10",
        "7,1",
        "7,2",
        "7,3",
        "7,4",
        "7,5",
        "7,6",
        "7,7",
        "7,8",
        "7,9",
        "7,10",
        "8,1",
        "8,2",
        "8,3",
        "8,4",
        "8,5",
        "8,6",
        "8,7",
        "8,8",
        "8,9",
        "8,10",
        "9,1",
        "9,2",
        "9,3",
        "9,4",
        "9,5",
        "9,6",
        "9,7",
        "9,8",
        "9,9",
        "9,10",
        "10,1",
        "10,2",
        "10,3",
        "10,4",
        "10,5",
        "10,6",
        "10,7",
        "10,8",
        "10,9",
        "10,10",
      ],
      playerMove: function (e) {
        var t,
          n = e.target.id.slice(1);
        f.availableMoves.includes(n) &&
          (f.attack(g, n),
          i(g),
          c(),
          !0 === g.allSunk()
            ? (document.getElementById("info").textContent = "You have won!")
            : ("Your move! Choose a square to attack." !==
              (t = document.getElementById("info")).textContent
                ? setTimeout(function () {
                    t.textContent = "Computer is taking their turn.";
                  }, 2e3)
                : (t.textContent = "Computer is taking their turn."),
              setTimeout(a, 1e3)));
      },
      computerMove: a,
      lastHitIndex: e,
    };
  };
  var p,
    h,
    f = v(),
    g = u("Computer"),
    C = v(),
    b = u("Player");
  function y() {
    (function () {
      var e = document.getElementById("info"),
        t = document.getElementById("computerGrid"),
        r = [
          ["C", "C", "C", "C", "C"],
          ["B", "B", "B", "B"],
          ["B", "B", "B", "B"],
          ["D", "D", "D"],
          ["D", "D", "D"],
          ["D", "D", "D"],
          ["P", "P"],
          ["P", "P"],
          ["P", "P"],
          ["P", "P"],
        ],
        o = document.createElement("div");
      (o.id = "boatsDisplay"),
        (t.className = ""),
        t.appendChild(o),
        (function (e) {
          for (
            var t = document.getElementById("playerGrid"),
              r = document.getElementById("playerHeader"),
              o = 0;
            o < 100;
            o++
          ) {
            var i = document.createElement("div");
            (i.className = "square pSquare"),
              (i.id = "p" + "".concat(e.availableMoves[o])),
              i.addEventListener("dragover", a),
              i.addEventListener("drop", n),
              t.appendChild(i);
          }
          r.textContent = "Player";
        })(f),
        (e.textContent = "Place your ships on the grid. Click to rotate ship");
      for (var i = 0; i < r.length; i++) {
        var s = document.createElement("div");
        switch (r[i][0]) {
          case "C":
            (s.className = "boat carrier"), (s.id = "carrier" + "".concat(i));
            for (var c = 0; c < r[i].length; c++) {
              var l = document.createElement("div");
              (l.className = "boatSquare carrierSquare"),
                (l.draggable = !1),
                s.appendChild(l);
            }
            break;
          case "B":
            (s.className = "boat battleship"),
              (s.id = "battleship" + "".concat(i));
            for (var d = 0; d < r[i].length; d++) {
              var u = document.createElement("div");
              (u.className = "boatSquare battleshipSquare"),
                (u.draggable = !1),
                s.appendChild(u);
            }
            break;
          case "D":
            (s.className = "boat destroyer"),
              (s.id = "destroyer" + "".concat(i));
            for (var m = 0; m < r[i].length; m++) {
              var v = document.createElement("div");
              (v.className = "boatSquare destroyerSquare"),
                (v.draggable = !1),
                s.appendChild(v);
            }
            break;
          case "P":
            (s.className = "boat patrolboat"),
              (s.id = "patrolboat" + "".concat(i));
            for (var p = 0; p < r[i].length; p++) {
              var h = document.createElement("div");
              (h.className = "boatSquare patrolboatSquare"),
                (h.draggable = !1),
                s.appendChild(h);
            }
            break;
          default:
            alert("Something went wrong when creating boats!");
        }
        o.appendChild(s);
      }
    })(),
      (function () {
        for (
          var e = document.getElementsByClassName("boat"),
            a = function () {
              var a = e[n];
              (a.draggable = !0),
                a.addEventListener("dragstart", t),
                a.addEventListener("click", function () {
                  a.classList.contains("vertical")
                    ? a.classList.remove("vertical")
                    : a.classList.add("vertical");
                });
            },
            n = 0;
          n < e.length;
          n++
        )
          a();
      })(),
      g.newShip(["1,6", "1,7", "1,8", "1,9", "1,10"]),
      g.newShip(["8,2", "8,3", "8,4", "8,5"]),
      g.newShip(["6,9", "7,9", "8,9", "9,9"]),
      g.newShip(["3,2", "4,2", "5,2"]),
      g.newShip(["10,5", "10,6", "10,7"]),
      g.newShip(["4,7", "4,8", "4,9"]),
      g.newShip(["1,1", "1,2"]),
      g.newShip(["10,1", "10,2"]),
      g.newShip(["5,5", "6,5"]),
      g.newShip(["2,4", "3,4"]);
  }
  function S() {
    var e = document.getElementById("computerGrid"),
      t = document.getElementById("boatsDisplay");
    e.removeChild(t),
      (e.className = "grid"),
      (function (e) {
        for (
          var t = document.getElementById("computerGrid"),
            a = document.getElementById("computerHeader"),
            n = 0;
          n < 100;
          n++
        ) {
          var r = document.createElement("div");
          (r.className = "square cSquare"),
            (r.id = "c" + "".concat(e.availableMoves[n])),
            t.appendChild(r);
        }
        a.textContent = "Computer";
      })(f),
      o(b),
      i(g),
      l(),
      s();
  }
  (p = document.getElementById("start")),
    (h = document.querySelector("h1")),
    p.addEventListener("click", function () {
      "Start Game" === p.textContent
        ? ((p.textContent = "Restart Game"), h.classList.remove("large"), y())
        : window.location.reload();
    });
})();
