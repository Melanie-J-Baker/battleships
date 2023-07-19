(() => {
  "use strict";
  var e = {
    d: (n, a) => {
      for (var r in a)
        e.o(a, r) &&
          !e.o(n, r) &&
          Object.defineProperty(n, r, { enumerable: !0, get: a[r] });
    },
    o: (e, n) => Object.prototype.hasOwnProperty.call(e, n),
  };
  e.d({}, { n1: () => u, hM: () => s, mO: () => c });
  const n = function () {
    var e = [],
      n = [],
      a = [],
      r = [];
    return {
      newShip: function (a) {
        if (
          !0 ===
          n.some(function (e) {
            return a.indexOf(e) >= 0;
          })
        )
          return "Coordinate(s) already occupied";
        var r = (function (e) {
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
        e.push(r);
        for (var i = 0; i < r.shipCoords.length; i++) n.push(r.shipCoords[i]);
      },
      receiveAttack: function (i) {
        if (!1 !== r.includes(i) || !1 !== a.includes(i))
          return "Square has already been attacked!";
        for (var t = 0; t < e.length; t++)
          for (var s = 0; s < e[t].shipCoords.length; s++)
            e[t].shipCoords[s] === i && (e[t].hit(s), r.push(i));
        !1 === n.includes(i) && a.push(i);
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
      hits: r,
      occupied: n,
    };
  };
  var a = document.getElementById("playerGrid"),
    r = document.getElementById("computerGrid");
  function i(e) {
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
        var a = e[Math.floor(Math.random() * e.length)];
        n.receiveAttack(a);
        var r = e.indexOf(a);
        r > -1 && e.splice(r, 1);
      },
      a = function () {
        n(c),
          (function (e) {
            for (
              var n = document.getElementsByClassName("square pSquare"), a = 0;
              a < n.length;
              a++
            )
              !0 === e.hits.includes(n[a].id.slice(1))
                ? (n[a].className = "square pSquare hit")
                : !0 === e.misses.includes(n[a].id.slice(1)) &&
                  (n[a].className = "square pSquare miss");
          })(c),
          s.playerMove();
      };
    return {
      attack: function (n, a) {
        if (!e.includes(a)) return "That move is not available";
        n.receiveAttack(a);
        var r = e.indexOf(a);
        r > -1 && e.splice(r, 1);
      },
      randomAttack: n,
      availableMoves: e,
      playerMove: function (e) {
        !(function () {
          for (
            var e = document.getElementsByClassName("square cSquare"), n = 0;
            n < e.length;
            n++
          )
            e[n].addEventListener("click", s.playerMove);
        })(),
          s.availableMoves.includes(e.target.id.slice(1))
            ? (s.attack(u, e.target.id.slice(1)), i(u))
            : alert("That square has already been attacked!"),
          (function () {
            for (
              var e = document.getElementsByClassName("square cSquare"), n = 0;
              n < e.length;
              n++
            )
              e[n].removeEventListener("click", s.playerMove);
          })(),
          setTimeout(a, 1e3);
      },
      computerMove: a,
    };
  };
  var s = t(),
    u = n(),
    c = (t(), n());
  !(function () {
    for (
      (function (e) {
        for (var n = 0; n < 100; n++) {
          var i = document.createElement("div"),
            t = document.createElement("div");
          (i.className = "square pSquare"),
            (i.id = "p" + "".concat(e.availableMoves[n])),
            (t.className = "square cSquare"),
            (t.id = "c" + "".concat(e.availableMoves[n])),
            a.appendChild(i),
            r.appendChild(t);
        }
      })(s),
        c.newShip(["G1", "G2", "G3", "G4", "G5"]),
        c.newShip(["B2", "C2", "D2", "E2"]),
        c.newShip(["I4", "I5", "I6", "I7"]),
        c.newShip(["A5", "A6", "A7"]),
        c.newShip(["D5", "D6", "D7"]),
        c.newShip(["H9", "I9", "J9"]),
        c.newShip(["J1", "J2"]),
        c.newShip(["C9", "D9"]),
        c.newShip(["A10", "B10"]),
        c.newShip(["E10", "F10"]),
        u.newShip(["A6", "A7", "A8", "A9", "A10"]),
        u.newShip(["H2", "H3", "H4", "H5"]),
        u.newShip(["F9", "G9", "H9", "I9"]),
        u.newShip(["C2", "D2", "E2"]),
        u.newShip(["J5", "J6", "J7"]),
        u.newShip(["D7", "D8", "D9"]),
        u.newShip(["A1", "A2"]),
        u.newShip(["J1", "J2"]),
        u.newShip(["E5", "F5"]),
        u.newShip(["B4", "C4"]),
        (function (e) {
          for (
            var n = document.getElementById("playerGrid").children, a = 0;
            a < n.length;
            a++
          ) {
            var r = n[a].id.slice(1);
            e.occupied.includes(r) &&
              (n[a].className = "square pSquare occupied");
          }
        })(c),
        i(u);
      !1 === c.allSunk() && !1 === u.allSunk();

    )
      s.playerMove();
    c.allSunk()
      ? alert("All your ships are sunk! Computer wins")
      : u.allSunk() &&
        alert("All opponent's ships have been sunk. Player wins!");
  })();
})();
