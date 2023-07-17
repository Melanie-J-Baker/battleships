(() => {
  "use strict";
  const e = function () {
    var e = [],
      n = [],
      i = [],
      t = [];
    return {
      newShip: function (i) {
        if (
          !0 ===
          n.some(function (e) {
            return i.indexOf(e) >= 0;
          })
        )
          return "Coordinate(s) already occupied";
        var t = (function (e) {
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
        })(i);
        e.push(t);
        for (var a = 0; a < t.shipCoords.length; a++) n.push(t.shipCoords[a]);
      },
      receiveAttack: function (a) {
        if (!1 !== t.includes(a) || !1 !== i.includes(a))
          return "Square has already been attacked!";
        for (var r = 0; r < e.length; r++)
          for (var c = 0; c < e[r].shipCoords.length; c++)
            e[r].shipCoords[c] === a && (e[r].hit(c), t.push(a));
        !1 === n.includes(a) && i.push(a);
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
      misses: i,
      hits: t,
      occupied: n,
    };
  };
  var n = document.getElementById("playerGrid"),
    i = document.getElementById("computerGrid");
  function t(e) {
    for (
      var n = document.getElementsByClassName("square cSquare"), i = 0;
      i < n.length;
      i++
    )
      !0 === e.hits.includes(n[i].id.slice(1))
        ? (n[i].className = "square cSquare hit")
        : !0 === e.misses.includes(n[i].id.slice(1)) &&
          (n[i].className = "square cSquare miss");
  }
  !(function () {
    var a,
      r = {
        attack: function (e, n) {
          if (!a.includes(n)) return "That move is not available";
          e.receiveAttack(n);
          var i = a.indexOf(n);
          i > -1 && a.splice(i, 1);
        },
        randomAttack: function (e) {
          var n = a[Math.floor(Math.random() * a.length)];
          e.receiveAttack(n);
          var i = a.indexOf(n);
          i > -1 && a.splice(i, 1);
        },
        availableMoves: (a = [
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
        ]),
      },
      c = e(),
      s = e();
    !(function (e) {
      for (var t = 0; t < 100; t++) {
        var a = document.createElement("div"),
          r = document.createElement("div");
        (a.className = "square pSquare"),
          (a.id = "p" + "".concat(e.availableMoves[t])),
          (r.className = "square cSquare"),
          (r.id = "c" + "".concat(e.availableMoves[t])),
          n.appendChild(a),
          i.appendChild(r);
      }
    })(r),
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
          var n = document.getElementById("playerGrid").children, i = 0;
          i < n.length;
          i++
        ) {
          var t = n[i].id.slice(1);
          e.occupied.includes(t) &&
            (n[i].className = "square pSquare occupied");
        }
      })(c),
      t(s);
    for (
      var u = document.getElementsByClassName("square cSquare"), o = 0;
      o < u.length;
      o++
    )
      u[o].addEventListener("click", function (e) {
        r.attack(s, e.target.id.slice(1)), t(s);
      });
  })();
})();
