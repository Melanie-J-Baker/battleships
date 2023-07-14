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
          for (var r = 0; r < t.shipCoords.length; r++) n.push(t.shipCoords[r]);
        },
        receiveAttack: function (r) {
          if (!1 !== t.includes(r) || !1 !== i.includes(r))
            return "Square has already been attacked!";
          for (var a = 0; a < e.length; a++)
            for (var o = 0; o < e[a].shipCoords.length; o++)
              e[a].shipCoords[o] === r && (e[a].hit(o), t.push(r));
          !1 === n.includes(r) && i.push(r);
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
      };
    },
    n = function () {
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
      ];
      return {
        attack: function (n, i) {
          if (!e.includes(i)) return "That move is not available";
          n.receiveAttack(i);
          var t = e.indexOf(i);
          t > -1 && e.splice(t, 1);
        },
        randomAttack: function (n) {
          var i = e[Math.floor(Math.random() * e.length)];
          n.receiveAttack(i);
          var t = e.indexOf(i);
          t > -1 && e.splice(t, 1);
        },
        availableMoves: e,
      };
    };
  window.onload = (function () {
    for (
      var i = n(),
        t = (n(), e()),
        r = e(),
        a = document.getElementById("playerGrid"),
        o = document.getElementById("computerGrid"),
        u = 0;
      u < i.availableMoves.length;
      u++
    )
      (a.appendChild(document.createElement("div")).className = "square"),
        (o.appendChild(document.createElement("div")).className = "square");
    t.newShip(["G1", "G2", "G3", "G4", "G5"]),
      t.newShip(["B2", "C2", "D2", "E2"]),
      t.newShip(["I4", "I5", "I6", "I7"]),
      t.newShip(["A5", "A6", "A7"]),
      t.newShip(["D5", "D6", "D7"]),
      t.newShip(["H9", "I9", "J9"]),
      t.newShip(["J1", "J2"]),
      t.newShip(["C9", "D9"]),
      t.newShip(["A10", "B10"]),
      t.newShip(["E10", "F10"]),
      r.newShip(["A6", "A7", "A8", "A9", "A10"]),
      r.newShip(["H2", "H3", "H4", "H5"]),
      r.newShip(["F9", "G9", "H9", "I9"]),
      r.newShip(["C2", "D2", "E2"]),
      r.newShip(["J5", "J6", "J7"]),
      r.newShip(["D7", "D8", "D9"]),
      r.newShip(["A1", "A2"]),
      r.newShip(["J1", "J2"]),
      r.newShip(["E5", "F5"]),
      r.newShip(["B4", "C4"]);
  })();
})();
