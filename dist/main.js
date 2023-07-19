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
  e.d({}, { UR: () => u, n1: () => o, hM: () => c, mO: () => l });
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
        for (var r = 0; r < i.shipCoords.length; r++) n.push(i.shipCoords[r]);
      },
      receiveAttack: function (r) {
        if (!1 !== i.includes(r) || !1 !== a.includes(r))
          return "Square has already been attacked!";
        for (var t = 0; t < e.length; t++)
          for (var s = 0; s < e[t].shipCoords.length; s++)
            e[t].shipCoords[s] === r && (e[t].hit(s), i.push(r));
        !1 === n.includes(r) && a.push(r);
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
  var a = document.getElementById("playerGrid"),
    i = document.getElementById("computerGrid");
  function r(e) {
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
  const t = function () {
      !0 === l.allSunk()
        ? alert("All your ships are sunk! Computer wins")
        : !0 === o.allSunk() &&
          alert("All opponent's ships have been sunk. Player wins!");
    },
    s = function () {
      var e = [
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
        n = function (n) {
          var a = u.availableMoves[Math.floor(Math.random() * e.length)];
          n.receiveAttack(a);
          var i = u.availableMoves.indexOf(a);
          i > -1 && u.availableMoves.splice(i, 1);
        },
        a = function (e) {
          !(function () {
            for (
              var e = document.getElementsByClassName("square cSquare"), n = 0;
              n < e.length;
              n++
            )
              e[n].addEventListener("click", c.playerMove);
          })(),
            c.attack(o, e.target.id.slice(1)),
            r(o),
            t(),
            setTimeout(i, 500);
        },
        i = function () {
          n(l),
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
            })(l),
            t(),
            c.playerMove();
        };
      return {
        attack: function (e, n) {
          if (c.availableMoves.includes(n)) {
            e.receiveAttack(n);
            var i = c.availableMoves.indexOf(n);
            i > -1 && c.availableMoves.splice(i, 1);
          } else
            alert("You have already attacked that square"),
              (function () {
                for (
                  var e = document.getElementsByClassName("square cSquare"),
                    n = 0;
                  n < e.length;
                  n++
                )
                  e[n].removeEventListener("click", c.playerMove);
              })(),
              r(o),
              a();
        },
        randomAttack: n,
        availableMoves: e,
        playerMove: a,
        computerMove: i,
      };
    };
  var c = s(),
    o = n(),
    u = s(),
    l = n();
  (function (e) {
    for (var n = 0; n < 100; n++) {
      var r = document.createElement("div"),
        t = document.createElement("div");
      (r.className = "square pSquare"),
        (r.id = "p" + "".concat(e.availableMoves[n])),
        (t.className = "square cSquare"),
        (t.id = "c" + "".concat(e.availableMoves[n])),
        a.appendChild(r),
        i.appendChild(t);
    }
  })(c),
    l.newShip(["G1", "G2", "G3", "G4", "G5"]),
    l.newShip(["B2", "C2", "D2", "E2"]),
    l.newShip(["I4", "I5", "I6", "I7"]),
    l.newShip(["A5", "A6", "A7"]),
    l.newShip(["D5", "D6", "D7"]),
    l.newShip(["H9", "I9", "J9"]),
    l.newShip(["J1", "J2"]),
    l.newShip(["C9", "D9"]),
    l.newShip(["A10", "B10"]),
    l.newShip(["E10", "F10"]),
    o.newShip(["A6", "A7", "A8", "A9", "A10"]),
    o.newShip(["H2", "H3", "H4", "H5"]),
    o.newShip(["F9", "G9", "H9", "I9"]),
    o.newShip(["C2", "D2", "E2"]),
    o.newShip(["J5", "J6", "J7"]),
    o.newShip(["D7", "D8", "D9"]),
    o.newShip(["A1", "A2"]),
    o.newShip(["J1", "J2"]),
    o.newShip(["E5", "F5"]),
    o.newShip(["B4", "C4"]),
    (function (e) {
      for (
        var n = document.getElementById("playerGrid").children, a = 0;
        a < n.length;
        a++
      ) {
        var i = n[a].id.slice(1);
        e.occupied.includes(i) && (n[a].className = "square pSquare occupied");
      }
    })(l),
    r(o),
    c.playerMove();
})();
