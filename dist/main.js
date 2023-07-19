(() => {
  "use strict";
  var e = {
    d: (n, a) => {
      for (var i in a)
        e.o(a, i) &&
          !e.o(n, i) &&
          Object.defineProperty(n, i, { enumerable: !0, get: a[i] });
    },
    o: (e, n) => Object.prototype.hasOwnProperty.call(e, n),
  };
  e.d({}, { lA: () => u, UR: () => c, n1: () => s, hM: () => r, mO: () => o });
  const n = function () {
    var e = [],
      n = [],
      a = [],
      i = [];
    return {
      newShip: function (a) {
        if (
          !0 ===
          n.some(function (e) {
            return a.indexOf(e) >= 0;
          })
        )
          return "Coordinate(s) already occupied";
        var i = (function (e) {
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
        })(a);
        e.push(i);
        for (var t = 0; t < i.shipCoords.length; t++) n.push(i.shipCoords[t]);
      },
      receiveAttack: function (t) {
        if (!1 !== i.includes(t) || !1 !== a.includes(t))
          return "Square has already been attacked!";
        for (var r = 0; r < e.length; r++)
          for (var s = 0; s < e[r].shipCoords.length; s++)
            e[r].shipCoords[s] === t && (e[r].hit(s), i.push(t));
        !1 === n.includes(t) && a.push(t);
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
      hits: i,
      occupied: n,
    };
  };
  function a(e) {
    for (
      var n = document.getElementsByClassName("square cSquare"), a = 0;
      a < n.length;
      a++
    )
      !0 === e.hits.includes(n[a].id.slice(1))
        ? (n[a].className = "square cSquare hit")
        : !0 === e.misses.includes(n[a].id.slice(1)) &&
          (n[a].className = "square cSquare miss");
  }
  const i = function () {
      !0 === o.allSunk()
        ? alert("All your ships are sunk! Computer wins")
        : !0 === s.allSunk() &&
          alert("All opponent's ships have been sunk. Player wins!");
    },
    t = function () {
      var e = function (e) {
          var n =
            c.availableMoves[
              Math.floor(Math.random() * c.availableMoves.length)
            ];
          e.receiveAttack(n);
          var a = c.availableMoves.indexOf(n);
          a > -1 && c.availableMoves.splice(a, 1);
        },
        n = function (e) {
          !(function () {
            for (
              var e = document.getElementsByClassName("square cSquare"), n = 0;
              n < e.length;
              n++
            )
              e[n].addEventListener("click", r.playerMove);
          })(),
            r.attack(s, e.target.id.slice(1)),
            a(s),
            i(),
            setTimeout(t, 500);
        },
        t = function () {
          e(o),
            (function (e) {
              for (
                var n = document.getElementsByClassName("square pSquare"),
                  a = 0;
                a < n.length;
                a++
              )
                !0 === e.hits.includes(n[a].id.slice(1))
                  ? (n[a].className = "square pSquare hit")
                  : !0 === e.misses.includes(n[a].id.slice(1)) &&
                    (n[a].className = "square pSquare miss");
            })(o),
            i(),
            r.playerMove();
        };
      return {
        attack: function (e, i) {
          if (r.availableMoves.includes(i)) {
            e.receiveAttack(i);
            var t = r.availableMoves.indexOf(i);
            t > -1 && r.availableMoves.splice(t, 1);
          } else
            alert("You have already attacked that square"),
              (function () {
                for (
                  var e = document.getElementsByClassName("square cSquare"),
                    n = 0;
                  n < e.length;
                  n++
                )
                  e[n].removeEventListener("click", r.playerMove);
              })(),
              a(s),
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
        computerMove: t,
      };
    };
  var r = t(),
    s = n(),
    c = t(),
    o = n();
  function u() {
    o.newShip(["G1", "G2", "G3", "G4", "G5"]),
      o.newShip(["B2", "C2", "D2", "E2"]),
      o.newShip(["I4", "I5", "I6", "I7"]),
      o.newShip(["A5", "A6", "A7"]),
      o.newShip(["D5", "D6", "D7"]),
      o.newShip(["H9", "I9", "J9"]),
      o.newShip(["J1", "J2"]),
      o.newShip(["C9", "D9"]),
      o.newShip(["A10", "B10"]),
      o.newShip(["E10", "F10"]),
      s.newShip(["A6", "A7", "A8", "A9", "A10"]),
      s.newShip(["H2", "H3", "H4", "H5"]),
      s.newShip(["F9", "G9", "H9", "I9"]),
      s.newShip(["C2", "D2", "E2"]),
      s.newShip(["J5", "J6", "J7"]),
      s.newShip(["D7", "D8", "D9"]),
      s.newShip(["A1", "A2"]),
      s.newShip(["J1", "J2"]),
      s.newShip(["E5", "F5"]),
      s.newShip(["B4", "C4"]),
      (function (e) {
        for (
          var n = document.getElementById("playerGrid").children, a = 0;
          a < n.length;
          a++
        ) {
          var i = n[a].id.slice(1);
          e.occupied.includes(i) &&
            (n[a].className = "square pSquare occupied");
        }
      })(o),
      a(s),
      r.playerMove();
  }
  document.getElementById("start").addEventListener("click", u),
    (function (e) {
      for (
        var n = document.getElementById("playerGrid"),
          a = document.getElementById("computerGrid"),
          i = 0;
        i < 100;
        i++
      ) {
        var t = document.createElement("div"),
          r = document.createElement("div");
        (t.className = "square pSquare"),
          (t.id = "p" + "".concat(e.availableMoves[i])),
          (r.className = "square cSquare"),
          (r.id = "c" + "".concat(e.availableMoves[i])),
          n.appendChild(t),
          a.appendChild(r);
      }
    })(r);
})();
