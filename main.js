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
  var n = document.getElementById("playerGrid"),
    i = document.getElementById("computerGrid");
  !(function () {
    var r,
      t = {
        attack: function (e, n) {
          if (!r.includes(n)) return "That move is not available";
          e.receiveAttack(n);
          var i = r.indexOf(n);
          i > -1 && r.splice(i, 1);
        },
        randomAttack: function (e) {
          var n = r[Math.floor(Math.random() * r.length)];
          e.receiveAttack(n);
          var i = r.indexOf(n);
          i > -1 && r.splice(i, 1);
        },
        availableMoves: (r = [
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
      a = e(),
      c = e();
    (function (e) {
      for (var r = 0; r < 100; r++) {
        var t = document.createElement("div"),
          a = document.createElement("div");
        (t.className = "square pSquare"),
          (t.id = "p" + "".concat(e.availableMoves[r])),
          (a.className = "square cSquare"),
          (a.id = "c" + "".concat(e.availableMoves[r])),
          n.appendChild(t),
          i.appendChild(a);
      }
    })(t),
      a.newShip(["G1", "G2", "G3", "G4", "G5"]),
      a.newShip(["B2", "C2", "D2", "E2"]),
      a.newShip(["I4", "I5", "I6", "I7"]),
      a.newShip(["A5", "A6", "A7"]),
      a.newShip(["D5", "D6", "D7"]),
      a.newShip(["H9", "I9", "J9"]),
      a.newShip(["J1", "J2"]),
      a.newShip(["C9", "D9"]),
      a.newShip(["A10", "B10"]),
      a.newShip(["E10", "F10"]),
      c.newShip(["A6", "A7", "A8", "A9", "A10"]),
      c.newShip(["H2", "H3", "H4", "H5"]),
      c.newShip(["F9", "G9", "H9", "I9"]),
      c.newShip(["C2", "D2", "E2"]),
      c.newShip(["J5", "J6", "J7"]),
      c.newShip(["D7", "D8", "D9"]),
      c.newShip(["A1", "A2"]),
      c.newShip(["J1", "J2"]),
      c.newShip(["E5", "F5"]),
      c.newShip(["B4", "C4"]);
    var o = document.getElementById("playerGrid").children;
    for (var u in (console.log(o), o)) {
      var s = o[u].id.slice(1);
      a.occupied.includes(s) && (o[u].className = "square pSquare occupied");
    }
  })();
})();
