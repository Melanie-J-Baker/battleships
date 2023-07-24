(() => {
  "use strict";
  var e = {
    d: (n, t) => {
      for (var a in t)
        e.o(t, a) &&
          !e.o(n, a) &&
          Object.defineProperty(n, a, { enumerable: !0, get: t[a] });
    },
    o: (e, n) => Object.prototype.hasOwnProperty.call(e, n),
  };
  e.d({}, { lA: () => p, UR: () => v, n1: () => d, hM: () => c, mO: () => h });
  const n = function () {
    var e = [],
      n = [],
      t = [],
      a = [];
    return {
      newShip: function (t) {
        if (
          !0 ===
          n.some(function (e) {
            return t.indexOf(e) >= 0;
          })
        )
          return "Coordinate(s) already occupied";
        var a = (function (e) {
          var n = [];
          return (
            e.map(function (e) {
              return n.push(e);
            }),
            {
              hit: function (e) {
                n[e] = "hit";
              },
              isSunk: function () {
                return n.every(function (e) {
                  return "hit" === e;
                });
              },
              shipCoords: n,
            }
          );
        })(t);
        e.push(a);
        for (var i = 0; i < a.shipCoords.length; i++) n.push(a.shipCoords[i]);
      },
      receiveAttack: function (i) {
        if (!1 !== a.includes(i) || !1 !== t.includes(i))
          return "Square has already been attacked!";
        for (var r = 0; r < e.length; r++)
          for (var o = 0; o < e[r].shipCoords.length; o++)
            e[r].shipCoords[o] === i && (e[r].hit(o), a.push(i));
        !1 === n.includes(i) && t.push(i);
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
      misses: t,
      hits: a,
      occupied: n,
    };
  };
  function t(e) {
    for (
      var n = document.getElementsByClassName("square cSquare"), t = 0;
      t < n.length;
      t++
    )
      !0 === e.hits.includes(n[t].id.slice(1))
        ? (n[t].className = "square cSquare hit")
        : !0 === e.misses.includes(n[t].id.slice(1)) &&
          (n[t].className = "square cSquare miss");
  }
  function a() {
    for (
      var e = document.getElementsByClassName("square cSquare"), n = 0;
      n < e.length;
      n++
    )
      e[n].addEventListener("click", c.playerMove);
  }
  function i() {
    for (
      var e = document.getElementsByClassName("square cSquare"), n = 0;
      n < e.length;
      n++
    )
      e[n].removeEventListener("click", c.playerMove);
  }
  function r() {
    document.getElementById("info").textContent =
      "Your move! Choose a square to attack.";
  }
  function o() {
    document.getElementById("info").textContent = "You have won!";
  }
  function u() {
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
  const l = function () {
    var e = null,
      n = function (n) {
        var t;
        if (null === e) {
          var a =
            v.availableMoves[
              Math.floor(Math.random() * v.availableMoves.length)
            ];
          n.receiveAttack(a), (e = n.hits.includes(a) ? s.indexOf(a) : null);
          var i = v.availableMoves.indexOf(a);
          i > -1 && v.availableMoves.splice(i, 1);
        } else if (null !== e) {
          var r = (function () {
              for (var e = [], n = 0, t = 0; t < 10; t++) {
                e.push([]);
                for (var a = 0; a < 10 && n < 100; a++) e[t].push(n), n++;
              }
              return e;
            })(),
            o = (function (e, n) {
              var t,
                a,
                i = parseInt(e / 10),
                r = n[i].findIndex(function (n) {
                  return n === e;
                }),
                o = n[i][r + 1],
                u = n[i][r - 1],
                s = null === (t = n[i - 1]) || void 0 === t ? void 0 : t[r];
              return {
                right: o,
                left: u,
                bottom: null === (a = n[i + 1]) || void 0 === a ? void 0 : a[r],
                top: s,
              };
            })(e, r),
            u = Object.values(o).filter(function (e) {
              return void 0 !== e;
            }),
            l = u[Math.floor(Math.random() * u.length)],
            c = s[l];
          n.receiveAttack(c),
            (e = n.hits.includes(c) ? s.indexOf(c) : null),
            (t = v.availableMoves.indexOf(c)) > -1 &&
              v.availableMoves.splice(t, 1);
        }
      },
      l = function (e) {
        c.attack(d, e.target.id.slice(1)),
          t(d),
          i(),
          !0 === d.allSunk()
            ? o()
            : !0 === h.allSunk()
            ? u()
            : ((document.getElementById("info").textContent =
                "Computer is taking their turn."),
              setTimeout(p, 1e3));
      },
      p = function () {
        n(h),
          (function (e) {
            for (
              var n = document.getElementsByClassName("square pSquare"), t = 0;
              t < n.length;
              t++
            )
              !0 === e.hits.includes(n[t].id.slice(1))
                ? (n[t].className = "square pSquare hit")
                : !0 === e.misses.includes(n[t].id.slice(1)) &&
                  (n[t].className = "square pSquare miss");
          })(h),
          !0 === d.allSunk()
            ? (o(), i())
            : !0 === h.allSunk()
            ? (u(), i())
            : (r(), a());
      };
    return {
      attack: function (e, n) {
        if (c.availableMoves.includes(n)) {
          e.receiveAttack(n);
          var a = c.availableMoves.indexOf(n);
          a > -1 && c.availableMoves.splice(a, 1);
        } else
          (document.getElementById("info").textContent =
            "That square has already been attacked!"),
            i(),
            t(d),
            l();
      },
      randomAttack: n,
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
      playerMove: l,
      computerMove: p,
      lastHitIndex: e,
    };
  };
  var c = l(),
    d = n(),
    v = l(),
    h = n();
  function p() {
    h.newShip(["7,1", "7,2", "7,3", "7,4", "7,5"]),
      h.newShip(["2,1", "3,1", "4,1", "5,1"]),
      h.newShip(["9,4", "9,5", "9,6", "9,7"]),
      h.newShip(["1,5", "1,6", "1,7"]),
      h.newShip(["4,5", "4,6", "4,7"]),
      h.newShip(["8,9", "9,9", "10,9"]),
      h.newShip(["10,1", "10,2"]),
      h.newShip(["3,3", "4,3"]),
      h.newShip(["1,10", "2,10"]),
      h.newShip(["5,10", "6,10"]),
      d.newShip(["1,6", "1,7", "1,8", "1,9", "1,10"]),
      d.newShip(["8,2", "8,3", "8,4", "8,5"]),
      d.newShip(["6,9", "7,9", "8,9", "9,9"]),
      d.newShip(["3,2", "4,2", "5,2"]),
      d.newShip(["10,5", "10,6", "10,7"]),
      d.newShip(["4,7", "4,8", "4,9"]),
      d.newShip(["1,1", "1,2"]),
      d.newShip(["10,1", "10,2"]),
      d.newShip(["5,5", "6,5"]),
      d.newShip(["2,4", "3,4"]),
      (function (e) {
        for (
          var n = document.getElementById("playerGrid").children, t = 0;
          t < n.length;
          t++
        ) {
          var a = n[t].id.slice(1);
          e.occupied.includes(a) &&
            (n[t].className = "square pSquare occupied");
        }
      })(h),
      t(d),
      r(),
      a();
  }
  document.getElementById("start").addEventListener("click", p),
    (function (e) {
      for (
        var n = document.getElementById("playerGrid"),
          t = document.getElementById("computerGrid"),
          a = 0;
        a < 100;
        a++
      ) {
        var i = document.createElement("div"),
          r = document.createElement("div");
        (i.className = "square pSquare"),
          (i.id = "p" + "".concat(e.availableMoves[a])),
          (r.className = "square cSquare"),
          (r.id = "c" + "".concat(e.availableMoves[a])),
          n.appendChild(i),
          t.appendChild(r);
      }
    })(c);
})();
