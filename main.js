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
  e.d({}, { lA: () => m, UR: () => p, n1: () => h, hM: () => d, mO: () => v });
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
      e[n].addEventListener("click", d.playerMove);
  }
  function i() {
    for (
      var e = document.getElementsByClassName("square cSquare"), n = 0;
      n < e.length;
      n++
    )
      e[n].removeEventListener("click", d.playerMove);
  }
  function r() {
    document.getElementById("info").textContent =
      "Your move! Choose a square to attack.";
  }
  function o() {
    document.getElementById("info").textContent = "You have won!";
  }
  function s() {
    document.getElementById("info").textContent =
      "Computer has sunk all your ships! You lose!";
  }
  const u = function () {
    var e = function (e) {
        var n =
          p.availableMoves[Math.floor(Math.random() * p.availableMoves.length)];
        e.receiveAttack(n);
        var t = p.availableMoves.indexOf(n);
        t > -1 && p.availableMoves.splice(t, 1);
      },
      n = function (e) {
        d.attack(h, e.target.id.slice(1)),
          t(h),
          i(),
          !0 === h.allSunk()
            ? o()
            : !0 === v.allSunk()
            ? s()
            : ((document.getElementById("info").textContent =
                "Computer is taking their turn."),
              setTimeout(u, 1e3));
      },
      u = function () {
        e(v),
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
          })(v),
          !0 === h.allSunk()
            ? (o(), i())
            : !0 === v.allSunk()
            ? (s(), i())
            : (r(), a());
      };
    return {
      attack: function (e, a) {
        if (d.availableMoves.includes(a)) {
          e.receiveAttack(a);
          var r = d.availableMoves.indexOf(a);
          r > -1 && d.availableMoves.splice(r, 1);
        } else
          (document.getElementById("info").textContent =
            "That square has already been attacked!"),
            i(),
            t(h),
            n();
      },
      randomAttack: e,
      availableMoves: [
        "A1",
        "A2",
        "A3",
        "A4",
        "A5",
        "A6",
        "A7",
        "A8",
        "A9",
        "A10",
        "B1",
        "B2",
        "B3",
        "B4",
        "B5",
        "B6",
        "B7",
        "B8",
        "B9",
        "B10",
        "C1",
        "C2",
        "C3",
        "C4",
        "C5",
        "C6",
        "C7",
        "C8",
        "C9",
        "C10",
        "D1",
        "D2",
        "D3",
        "D4",
        "D5",
        "D6",
        "D7",
        "D8",
        "D9",
        "D10",
        "E1",
        "E2",
        "E3",
        "E4",
        "E5",
        "E6",
        "E7",
        "E8",
        "E9",
        "E10",
        "F1",
        "F2",
        "F3",
        "F4",
        "F5",
        "F6",
        "F7",
        "F8",
        "F9",
        "F10",
        "G1",
        "G2",
        "G3",
        "G4",
        "G5",
        "G6",
        "G7",
        "G8",
        "G9",
        "G10",
        "H1",
        "H2",
        "H3",
        "H4",
        "H5",
        "H6",
        "H7",
        "H8",
        "H9",
        "H10",
        "I1",
        "I2",
        "I3",
        "I4",
        "I5",
        "I6",
        "I7",
        "I8",
        "I9",
        "I10",
        "J1",
        "J2",
        "J3",
        "J4",
        "J5",
        "J6",
        "J7",
        "J8",
        "J9",
        "J10",
      ],
      playerMove: n,
      computerMove: u,
    };
  };
  var c = function () {
      for (var e = [], n = 0, t = 0; t < 10; t++) {
        e.push([]);
        for (var a = 0; a < 10 && n < 100; a++) e[t].push(n), n++;
      }
      return e;
    },
    l = function (e, n) {
      var t,
        a,
        i = parseInt(e / 10),
        r = n[i].findIndex(function (n) {
          return n === e;
        });
      return {
        right: n[i][r + 1],
        left: n[i][r - 1],
        bottom: null === (t = n[i - 1]) || void 0 === t ? void 0 : t[r],
        top: null === (a = n[i + 1]) || void 0 === a ? void 0 : a[r],
      };
    },
    d = u(),
    h = n(),
    p = u(),
    v = n();
  function m() {
    v.newShip(["G1", "G2", "G3", "G4", "G5"]),
      v.newShip(["B2", "C2", "D2", "E2"]),
      v.newShip(["I4", "I5", "I6", "I7"]),
      v.newShip(["A5", "A6", "A7"]),
      v.newShip(["D5", "D6", "D7"]),
      v.newShip(["H9", "I9", "J9"]),
      v.newShip(["J1", "J2"]),
      v.newShip(["C9", "D9"]),
      v.newShip(["A10", "B10"]),
      v.newShip(["E10", "F10"]),
      h.newShip(["A6", "A7", "A8", "A9", "A10"]),
      h.newShip(["H2", "H3", "H4", "H5"]),
      h.newShip(["F9", "G9", "H9", "I9"]),
      h.newShip(["C2", "D2", "E2"]),
      h.newShip(["J5", "J6", "J7"]),
      h.newShip(["D7", "D8", "D9"]),
      h.newShip(["A1", "A2"]),
      h.newShip(["J1", "J2"]),
      h.newShip(["E5", "F5"]),
      h.newShip(["B4", "C4"]),
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
      })(v),
      t(h),
      r(),
      a();
    var e = c();
    console.log(l(1, e));
  }
  document.getElementById("start").addEventListener("click", m),
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
    })(d);
})();
