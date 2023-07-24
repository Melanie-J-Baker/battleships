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
  e.d({}, { lA: () => p, UR: () => v, n1: () => m, hM: () => d, mO: () => h });
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
        for (var o = 0; o < e.length; o++)
          for (var i = 0; i < e[o].shipCoords.length; i++)
            e[o].shipCoords[i] === r && (e[o].hit(i), n.push(r));
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
  function n() {
    for (
      var e = document.getElementsByClassName("square cSquare"), t = 0;
      t < e.length;
      t++
    )
      e[t].addEventListener("click", d.playerMove);
  }
  function r() {
    for (
      var e = document.getElementsByClassName("square cSquare"), t = 0;
      t < e.length;
      t++
    )
      e[t].removeEventListener("click", d.playerMove);
  }
  function o() {
    document.getElementById("info").textContent =
      "Your move! Choose a square to attack.";
  }
  function i() {
    document.getElementById("info").textContent = "You have won!";
  }
  function l() {
    document.getElementById("info").textContent =
      "Computer has sunk all your ships! You lose!";
  }
  var s = [
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
  const c = function () {
    var e = null,
      t = function (t) {
        var a;
        if (null === e) {
          var n =
            v.availableMoves[
              Math.floor(Math.random() * v.availableMoves.length)
            ];
          t.receiveAttack(n), (e = t.hits.includes(n) ? s.indexOf(n) : null);
          var r = v.availableMoves.indexOf(n);
          r > -1 && v.availableMoves.splice(r, 1);
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
                l = t[r][o - 1],
                s = null === (a = t[r - 1]) || void 0 === a ? void 0 : a[o];
              return {
                right: i,
                left: l,
                bottom: null === (n = t[r + 1]) || void 0 === n ? void 0 : n[o],
                top: s,
              };
            })(e, o),
            l = Object.values(i).filter(function (e) {
              return void 0 !== e;
            }),
            c = l[Math.floor(Math.random() * l.length)],
            u = s[c];
          t.receiveAttack(u),
            (e = t.hits.includes(u) ? s.indexOf(u) : null),
            (a = v.availableMoves.indexOf(u)) > -1 &&
              v.availableMoves.splice(a, 1);
        }
      },
      c = function (e) {
        d.attack(m, e.target.id.slice(1)),
          a(m),
          r(),
          !0 === m.allSunk()
            ? i()
            : !0 === h.allSunk()
            ? l()
            : ((document.getElementById("info").textContent =
                "Computer is taking their turn."),
              setTimeout(u, 1e3));
      },
      u = function () {
        t(h),
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
          })(h),
          !0 === m.allSunk()
            ? (i(), r())
            : !0 === h.allSunk()
            ? (l(), r())
            : (o(), n());
      };
    return {
      attack: function (e, t) {
        if (d.availableMoves.includes(t)) {
          e.receiveAttack(t);
          var n = d.availableMoves.indexOf(t);
          n > -1 && d.availableMoves.splice(n, 1);
        } else
          (document.getElementById("info").textContent =
            "That square has already been attacked!"),
            r(),
            a(m),
            c();
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
      playerMove: c,
      computerMove: u,
      lastHitIndex: e,
    };
  };
  var u,
    d = c(),
    m = t(),
    v = c(),
    h = t();
  function p() {
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
          n = document.createElement("div");
        (n.id = "boatsDisplay"),
          (t.className = ""),
          t.appendChild(n),
          (function (e) {
            for (
              var t = document.getElementById("playerGrid"), a = 0;
              a < 100;
              a++
            ) {
              var n = document.createElement("div");
              (n.className = "square pSquare"),
                (n.id = "p" + "".concat(e.availableMoves[a])),
                t.appendChild(n);
            }
          })(d),
          (e.textContent =
            "Please place the ships on your grid. Click to rotate");
        for (var r = 0; r < a.length; r++) {
          var o = document.createElement("div");
          switch (a[r][0]) {
            case "C":
              o.className = "boat carrier";
              for (var i = 0; i < a[r].length; i++) {
                var l = document.createElement("div");
                (l.className = "boatSquare carrierSquare"), o.appendChild(l);
              }
              break;
            case "B":
              o.className = "boat battleship";
              for (var s = 0; s < a[r].length; s++) {
                var c = document.createElement("div");
                (c.className = "boatSquare battleshipSquare"), o.appendChild(c);
              }
              break;
            case "D":
              o.className = "boat destroyer";
              for (var u = 0; u < a[r].length; u++) {
                var m = document.createElement("div");
                (m.className = "boatSquare destroyerSquare"), o.appendChild(m);
              }
              break;
            case "P":
              o.className = "boat patrolboat";
              for (var v = 0; v < a[r].length; v++) {
                var h = document.createElement("div");
                (h.className = "boatSquare patrolboatSquare"), o.appendChild(h);
              }
              break;
            default:
              console.log("Something went wrong when creating boats!");
          }
          n.appendChild(o);
        }
      })(),
      (function () {
        for (
          var e = document.getElementsByClassName("boat"),
            t = function () {
              var t = e[a];
              t.addEventListener("click", function () {
                t.classList.contains("vertical")
                  ? t.classList.remove("vertical")
                  : t.classList.add("vertical");
              });
            },
            a = 0;
          a < e.length;
          a++
        )
          t();
      })(),
      m.newShip(["1,6", "1,7", "1,8", "1,9", "1,10"]),
      m.newShip(["8,2", "8,3", "8,4", "8,5"]),
      m.newShip(["6,9", "7,9", "8,9", "9,9"]),
      m.newShip(["3,2", "4,2", "5,2"]),
      m.newShip(["10,5", "10,6", "10,7"]),
      m.newShip(["4,7", "4,8", "4,9"]),
      m.newShip(["1,1", "1,2"]),
      m.newShip(["10,1", "10,2"]),
      m.newShip(["5,5", "6,5"]),
      m.newShip(["2,4", "3,4"]),
      30 === h.occupied.length)
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
        })(d),
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
        })(h),
        a(m),
        o(),
        n();
    }
  }
  (u = document.getElementById("start")).addEventListener("click", function () {
    "Start Game" === u.textContent
      ? ((u.textContent = "Restart Game"), p())
      : window.location.reload();
  });
})();
