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
  e.d({}, { lA: () => b, UR: () => h, n1: () => f, hM: () => p, mO: () => g });
  const t = function () {
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
        for (var i = 0; i < e.length; i++)
          for (var o = 0; o < e[i].shipCoords.length; o++)
            e[i].shipCoords[o] === r && (e[i].hit(o), n.push(r));
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
  function a(e) {
    e.dataTransfer.setData("text", e.target.id),
      e.dataTransfer.setData("text/class", e.target.classList);
  }
  function n(e) {
    e.preventDefault(), (e.dataTransfer.dropEffect = "move");
  }
  function r(e) {
    e.preventDefault(), alert(e.target.id);
    var t = e.dataTransfer.getData("text"),
      a = e.dataTransfer.getData("text/class"),
      n = document.getElementById(t),
      r = n.children.length,
      i = (function (e, t, a) {
        var n,
          r = t.slice(0, -1),
          i = e.slice(1),
          o = i.split(",")[0],
          l = i.split(",")[1];
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
          ? +l + n <= 10 && +l > 0
          : +o + n <= 10 && +o > 0;
      })(e.target.id, t, a);
    if (!1 === i) alert("Boat cannot be placed there!");
    else
      for (var o = 0; o < r; o++)
        if (a.includes("vertical")) {
          var l = e.target.id.slice(1),
            s = l.split(",")[0],
            c = l.split(",")[1],
            d = "p" + (+s + o).toString() + "," + c;
          alert(d), document.getElementById(d).appendChild(n.children[0]);
        } else {
          var u = e.target.id.slice(1),
            v = "p" + u.split(",")[0] + "," + (+u.split(",")[1] + o).toString();
          document.getElementById(v).appendChild(n.children[0]);
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
  function o() {
    for (
      var e = document.getElementsByClassName("square cSquare"), t = 0;
      t < e.length;
      t++
    )
      e[t].addEventListener("click", p.playerMove);
  }
  function l() {
    for (
      var e = document.getElementsByClassName("square cSquare"), t = 0;
      t < e.length;
      t++
    )
      e[t].removeEventListener("click", p.playerMove);
  }
  function s() {
    document.getElementById("info").textContent =
      "Your move! Choose a square to attack.";
  }
  function c() {
    document.getElementById("info").textContent = "You have won!";
  }
  function d() {
    document.getElementById("info").textContent =
      "Computer has sunk all your ships! You lose!";
  }
  var u = [
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
            h.availableMoves[
              Math.floor(Math.random() * h.availableMoves.length)
            ];
          t.receiveAttack(n), (e = t.hits.includes(n) ? u.indexOf(n) : null);
          var r = h.availableMoves.indexOf(n);
          r > -1 && h.availableMoves.splice(r, 1);
        } else if (null !== e) {
          var i = (function () {
              for (var e = [], t = 0, a = 0; a < 10; a++) {
                e.push([]);
                for (var n = 0; n < 10 && t < 100; n++) e[a].push(t), t++;
              }
              return e;
            })(),
            o = (function (e, t) {
              var a,
                n,
                r = parseInt(e / 10),
                i = t[r].findIndex(function (t) {
                  return t === e;
                }),
                o = t[r][i + 1],
                l = t[r][i - 1],
                s = null === (a = t[r - 1]) || void 0 === a ? void 0 : a[i];
              return {
                right: o,
                left: l,
                bottom: null === (n = t[r + 1]) || void 0 === n ? void 0 : n[i],
                top: s,
              };
            })(e, i),
            l = Object.values(o).filter(function (e) {
              return void 0 !== e;
            }),
            s = l[Math.floor(Math.random() * l.length)],
            c = u[s];
          t.receiveAttack(c),
            (e = t.hits.includes(c) ? u.indexOf(c) : null),
            (a = h.availableMoves.indexOf(c)) > -1 &&
              h.availableMoves.splice(a, 1);
        }
      },
      a = function (e) {
        p.attack(f, e.target.id.slice(1)),
          i(f),
          l(),
          !0 === f.allSunk()
            ? c()
            : !0 === g.allSunk()
            ? d()
            : ((document.getElementById("info").textContent =
                "Computer is taking their turn."),
              setTimeout(n, 1e3));
      },
      n = function () {
        t(g),
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
          })(g),
          !0 === f.allSunk()
            ? (c(), l())
            : !0 === g.allSunk()
            ? (d(), l())
            : (s(), o());
      };
    return {
      attack: function (e, t) {
        if (p.availableMoves.includes(t)) {
          e.receiveAttack(t);
          var n = p.availableMoves.indexOf(t);
          n > -1 && p.availableMoves.splice(n, 1);
        } else
          (document.getElementById("info").textContent =
            "That square has already been attacked!"),
            l(),
            i(f),
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
  var m,
    p = v(),
    f = t(),
    h = v(),
    g = t();
  function b() {
    if (
      ((function () {
        var e = document.getElementById("info"),
          t = document.getElementById("computerGrid"),
          a = [
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
          i = document.createElement("div");
        (i.id = "boatsDisplay"),
          (t.className = ""),
          t.appendChild(i),
          (function (e) {
            for (
              var t = document.getElementById("playerGrid"),
                a = document.getElementById("playerHeader"),
                i = 0;
              i < 100;
              i++
            ) {
              var o = document.createElement("div");
              (o.className = "square pSquare"),
                (o.id = "p" + "".concat(e.availableMoves[i])),
                o.addEventListener("dragover", n),
                o.addEventListener("drop", r),
                t.appendChild(o);
            }
            a.textContent = "Player";
          })(p),
          (e.textContent =
            "Please place the ships on your grid. Click to rotate");
        for (var o = 0; o < a.length; o++) {
          var l = document.createElement("div");
          switch (a[o][0]) {
            case "C":
              (l.className = "boat carrier"), (l.id = "carrier" + "".concat(o));
              for (var s = 0; s < a[o].length; s++) {
                var c = document.createElement("div");
                (c.className = "boatSquare carrierSquare"),
                  (c.draggable = !1),
                  l.appendChild(c);
              }
              break;
            case "B":
              (l.className = "boat battleship"),
                (l.id = "battleship" + "".concat(o));
              for (var d = 0; d < a[o].length; d++) {
                var u = document.createElement("div");
                (u.className = "boatSquare battleshipSquare"),
                  (u.draggable = !1),
                  l.appendChild(u);
              }
              break;
            case "D":
              (l.className = "boat destroyer"),
                (l.id = "destroyer" + "".concat(o));
              for (var v = 0; v < a[o].length; v++) {
                var m = document.createElement("div");
                (m.className = "boatSquare destroyerSquare"),
                  (m.draggable = !1),
                  l.appendChild(m);
              }
              break;
            case "P":
              (l.className = "boat patrolboat"),
                (l.id = "patrolboat" + "".concat(o));
              for (var f = 0; f < a[o].length; f++) {
                var h = document.createElement("div");
                (h.className = "boatSquare patrolboatSquare"),
                  (h.draggable = !1),
                  l.appendChild(h);
              }
              break;
            default:
              console.log("Something went wrong when creating boats!");
          }
          i.appendChild(l);
        }
      })(),
      (function () {
        for (
          var e = document.getElementsByClassName("boat"),
            t = function () {
              var t = e[n];
              (t.draggable = !0),
                t.addEventListener("dragstart", a),
                t.addEventListener("click", function () {
                  t.classList.contains("vertical")
                    ? t.classList.remove("vertical")
                    : t.classList.add("vertical");
                });
            },
            n = 0;
          n < e.length;
          n++
        )
          t();
      })(),
      f.newShip(["1,6", "1,7", "1,8", "1,9", "1,10"]),
      f.newShip(["8,2", "8,3", "8,4", "8,5"]),
      f.newShip(["6,9", "7,9", "8,9", "9,9"]),
      f.newShip(["3,2", "4,2", "5,2"]),
      f.newShip(["10,5", "10,6", "10,7"]),
      f.newShip(["4,7", "4,8", "4,9"]),
      f.newShip(["1,1", "1,2"]),
      f.newShip(["10,1", "10,2"]),
      f.newShip(["5,5", "6,5"]),
      f.newShip(["2,4", "3,4"]),
      30 === g.occupied.length)
    ) {
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
        })(p),
        (function (e) {
          for (
            var t = document.getElementById("playerGrid").children, a = 0;
            a < t.length;
            a++
          ) {
            var n = t[a].id.slice(1);
            e.occupied.includes(n) &&
              (t[a].className = "square pSquare occupied");
          }
        })(g),
        i(f),
        s(),
        o();
    }
  }
  (m = document.getElementById("start")).addEventListener("click", function () {
    "Start Game" === m.textContent
      ? ((m.textContent = "Restart Game"), b())
      : window.location.reload();
  });
})();
