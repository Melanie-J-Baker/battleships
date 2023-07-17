(() => {
  "use strict";
  const e = function () {
    var e = [],
      n = [],
      i = [],
      r = [];
    return {
      newShip: function (i) {
        if (
          !0 ===
          n.some(function (e) {
            return i.indexOf(e) >= 0;
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
        })(i);
        e.push(r);
        for (var t = 0; t < r.shipCoords.length; t++) n.push(r.shipCoords[t]);
      },
      receiveAttack: function (t) {
        if (!1 !== r.includes(t) || !1 !== i.includes(t))
          return "Square has already been attacked!";
        for (var a = 0; a < e.length; a++)
          for (var c = 0; c < e[a].shipCoords.length; c++)
            e[a].shipCoords[c] === t && (e[a].hit(c), r.push(t));
        !1 === n.includes(t) && i.push(t);
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
      hits: r,
      occupied: n,
    };
  };
  var n,
    i,
    r,
    t,
    a = document.getElementById("playerGrid"),
    c = document.getElementById("computerGrid");
  (i = {
    attack: function (e, i) {
      if (!n.includes(i)) return "That move is not available";
      e.receiveAttack(i);
      var r = n.indexOf(i);
      r > -1 && n.splice(r, 1);
    },
    randomAttack: function (e) {
      var i = n[Math.floor(Math.random() * n.length)];
      e.receiveAttack(i);
      var r = n.indexOf(i);
      r > -1 && n.splice(r, 1);
    },
    availableMoves: (n = [
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
  }),
    (r = e()),
    (t = e()),
    (function (e) {
      for (var n = 0; n < 100; n++) {
        var i = document.createElement("div"),
          r = document.createElement("div");
        (i.className = "square pSquare"),
          (i.id = "p" + "".concat(e.availableMoves[n])),
          (r.className = "square cSquare"),
          (r.id = "c" + "".concat(e.availableMoves[n])),
          a.appendChild(i),
          c.appendChild(r);
      }
    })(i),
    r.newShip(["G1", "G2", "G3", "G4", "G5"]),
    r.newShip(["B2", "C2", "D2", "E2"]),
    r.newShip(["I4", "I5", "I6", "I7"]),
    r.newShip(["A5", "A6", "A7"]),
    r.newShip(["D5", "D6", "D7"]),
    r.newShip(["H9", "I9", "J9"]),
    r.newShip(["J1", "J2"]),
    r.newShip(["C9", "D9"]),
    r.newShip(["A10", "B10"]),
    r.newShip(["E10", "F10"]),
    t.newShip(["A6", "A7", "A8", "A9", "A10"]),
    t.newShip(["H2", "H3", "H4", "H5"]),
    t.newShip(["F9", "G9", "H9", "I9"]),
    t.newShip(["C2", "D2", "E2"]),
    t.newShip(["J5", "J6", "J7"]),
    t.newShip(["D7", "D8", "D9"]),
    t.newShip(["A1", "A2"]),
    t.newShip(["J1", "J2"]),
    t.newShip(["E5", "F5"]),
    t.newShip(["B4", "C4"]),
    (function (e) {
      var n = document.getElementById("playerGrid").children;
      for (var i in (console.log(n), n)) {
        var r = n[i].id.slice(1);
        e.occupied.includes(r) && (n[i].className = "square pSquare occupied");
      }
    })(r);
})();
