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
      lA: () => S,
      UR: () => b,
      n1: () => C,
      rH: () => k,
      hM: () => g,
      mO: () => y,
    },
  );
  function t(e) {
    e.dataTransfer.setData("text", e.target.id),
      e.dataTransfer.setData("text/class", e.target.classList);
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
      for (var u = 0; u < s; u++)
        if (n.includes("vertical")) {
          var d = e.target.id.slice(1),
            v = d.split(",")[0],
            m = d.split(",")[1],
            p = (+v + u).toString(),
            h = "p" + p + "," + m;
          if (!0 === r(y, h)) {
            var f = p + "," + m;
            l.push(f);
            var g = document.getElementById(h);
            (i.children[0].id = h), g.parentNode.replaceChild(i.children[0], g);
          } else t.textContent = "Boat cannot be placed there!";
        } else {
          var C = e.target.id.slice(1),
            b = C.split(",")[0],
            S = (+C.split(",")[1] + u).toString(),
            E = "p" + b + "," + S;
          if (!0 === r(y, E)) {
            var B = b + "," + S;
            l.push(B);
            var q = document.getElementById(E);
            (i.children[0].id = E), q.parentNode.replaceChild(i.children[0], q);
          } else t.textContent = "Boat cannot be placed there!";
        }
    y.newShip(l), o(y), 30 === y.occupied.length && k();
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
      e[t].addEventListener("click", g.playerMove);
  }
  function c() {
    for (
      var e = document.getElementsByClassName("square cSquare"), t = 0;
      t < e.length;
      t++
    )
      e[t].removeEventListener("click", g.playerMove);
  }
  function l() {
    var e = document.getElementById("info");
    "Computer is taking their turn." !== e.textContent
      ? setTimeout(function () {
          e.textContent = "Your move! Choose a square to attack.";
        }, 2e3)
      : (e.textContent = "Your move! Choose a square to attack.");
  }
  function u() {
    document.getElementById("info").textContent = "You have won!";
  }
  function d() {
    document.getElementById("info").textContent =
      "Computer has sunk all your ships! You lose!";
  }
  function v(e) {
    console.log(e);
    var t = document.getElementById("info");
    switch (e.shipCoords.length) {
      case 5:
        t.textContent = "Carrier sunk!";
        break;
      case 4:
        t.textContent = "Battleship sunk!";
        break;
      case 3:
        t.textContent = "Destroyer sunk!";
        break;
      case 2:
        t.textContent = "Patrol boat sunk!";
    }
  }
  const m = function () {
    var e = [],
      t = [],
      a = [],
      n = [];
    return {
      newShip: function (a) {
        if (
          !0 ===
          t.some(function (e) {
            return a.indexOf(e) >= 0;
          })
        )
          return "Coordinate(s) already occupied";
        var n = (function (e) {
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
        })(a);
        e.push(n);
        for (var r = 0; r < n.shipCoords.length; r++) t.push(n.shipCoords[r]);
      },
      receiveAttack: function (r) {
        if (!1 !== n.includes(r) || !1 !== a.includes(r))
          return "Square has already been attacked!";
        for (var o = 0; o < e.length; o++)
          for (var i = 0; i < e[o].shipCoords.length; i++)
            if (e[o].shipCoords[i] === r) {
              e[o].hit(i), n.push(r);
              for (var s = 0; s < e.length; s++) e[s].isSunk() && v(e[s]);
            }
        !1 === t.includes(r) && a.push(r);
      },
      allSunk: function () {
        return e
          .map(function (e) {
            return e.isSunk();
          })
          .every(function (e) {
            return !0 === e;
          });
      },
      shipCoordsBoard: e,
      misses: a,
      hits: n,
      occupied: t,
    };
  };
  var p = [
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
  const h = function () {
    var e = null,
      t = function (t) {
        var a;
        if (null === e) {
          var n =
            b.availableMoves[
              Math.floor(Math.random() * b.availableMoves.length)
            ];
          t.receiveAttack(n), (e = t.hits.includes(n) ? p.indexOf(n) : null);
          var r = b.availableMoves.indexOf(n);
          r > -1 && b.availableMoves.splice(r, 1);
        } else if (null !== e) {
          var o = (function () {
              for (var e = [], t = 0, a = 0; a < 10; a++) {
                e.push([]);
                for (var n = 0; n < 10 && t < 100; n++) e[a].push(t), t++;
              }
              return e;
            })(),
            i = (function (e, t) {
              var a,
                n,
                r = parseInt(e / 10),
                o = t[r].findIndex(function (t) {
                  return t === e;
                }),
                i = t[r][o + 1],
                s = t[r][o - 1],
                c = null === (a = t[r - 1]) || void 0 === a ? void 0 : a[o];
              return {
                right: i,
                left: s,
                bottom: null === (n = t[r + 1]) || void 0 === n ? void 0 : n[o],
                top: c,
              };
            })(e, o),
            s = Object.values(i).filter(function (e) {
              return void 0 !== e;
            }),
            c = s[Math.floor(Math.random() * s.length)],
            l = p[c];
          t.receiveAttack(l),
            (e = t.hits.includes(l) ? p.indexOf(l) : null),
            (a = b.availableMoves.indexOf(l)) > -1 &&
              b.availableMoves.splice(a, 1);
        }
      },
      a = function (e) {
        var t;
        g.attack(C, e.target.id.slice(1)),
          i(C),
          c(),
          !0 === C.allSunk()
            ? u()
            : !0 === y.allSunk()
            ? d()
            : ("Your move! Choose a square to attack." !==
              (t = document.getElementById("info")).textContent
                ? setTimeout(function () {
                    t.textContent = "Computer is taking their turn.";
                  }, 2e3)
                : (t.textContent = "Computer is taking their turn."),
              setTimeout(n, 1e3));
      },
      n = function () {
        t(y),
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
          })(y),
          !0 === C.allSunk()
            ? (u(), c())
            : !0 === y.allSunk()
            ? (d(), c())
            : (l(), s());
      };
    return {
      attack: function (e, t) {
        if (g.availableMoves.includes(t)) {
          e.receiveAttack(t);
          var n = g.availableMoves.indexOf(t);
          n > -1 && g.availableMoves.splice(n, 1);
        } else
          (document.getElementById("info").textContent =
            "That square has already been attacked!"),
            c(),
            i(C),
            a();
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
      playerMove: a,
      computerMove: n,
      lastHitIndex: e,
    };
  };
  var f,
    g = h(),
    C = m(),
    b = h(),
    y = m();
  function S() {
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
        })(g),
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
            for (var u = 0; u < r[i].length; u++) {
              var d = document.createElement("div");
              (d.className = "boatSquare battleshipSquare"),
                (d.draggable = !1),
                s.appendChild(d);
            }
            break;
          case "D":
            (s.className = "boat destroyer"),
              (s.id = "destroyer" + "".concat(i));
            for (var v = 0; v < r[i].length; v++) {
              var m = document.createElement("div");
              (m.className = "boatSquare destroyerSquare"),
                (m.draggable = !1),
                s.appendChild(m);
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
      C.newShip(["1,6", "1,7", "1,8", "1,9", "1,10"]),
      C.newShip(["8,2", "8,3", "8,4", "8,5"]),
      C.newShip(["6,9", "7,9", "8,9", "9,9"]),
      C.newShip(["3,2", "4,2", "5,2"]),
      C.newShip(["10,5", "10,6", "10,7"]),
      C.newShip(["4,7", "4,8", "4,9"]),
      C.newShip(["1,1", "1,2"]),
      C.newShip(["10,1", "10,2"]),
      C.newShip(["5,5", "6,5"]),
      C.newShip(["2,4", "3,4"]);
  }
  function k() {
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
      })(g),
      o(y),
      i(C),
      l(),
      s();
  }
  (f = document.getElementById("start")).addEventListener("click", function () {
    "Start Game" === f.textContent
      ? ((f.textContent = "Restart Game"), S())
      : window.location.reload();
  });
})();
