(() => {
  "use strict";
  var e = {
    d: (n, i) => {
      for (var a in i)
        e.o(i, a) &&
          !e.o(n, a) &&
          Object.defineProperty(n, a, { enumerable: !0, get: i[a] });
    },
    o: (e, n) => Object.prototype.hasOwnProperty.call(e, n),
  };
  e.d({}, { n: () => s, h: () => c });
  const n = function () {
    var e = [],
      n = [],
      i = [],
      a = [];
    return {
      newShip: function (i) {
        if (
          !0 ===
          n.some(function (e) {
            return i.indexOf(e) >= 0;
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
        })(i);
        e.push(a);
        for (var r = 0; r < a.shipCoords.length; r++) n.push(a.shipCoords[r]);
      },
      receiveAttack: function (r) {
        if (!1 !== a.includes(r) || !1 !== i.includes(r))
          return "Square has already been attacked!";
        for (var t = 0; t < e.length; t++)
          for (var c = 0; c < e[t].shipCoords.length; c++)
            e[t].shipCoords[c] === r && (e[t].hit(c), a.push(r));
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
      hits: a,
      occupied: n,
    };
  };
  var i = document.getElementById("playerGrid"),
    a = document.getElementById("computerGrid");
  function r(e) {
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
  var t,
    c = {
      attack: function (e, n) {
        if (!t.includes(n)) return "That move is not available";
        e.receiveAttack(n);
        var i = t.indexOf(n);
        i > -1 && t.splice(i, 1);
      },
      randomAttack: function (e) {
        var n = t[Math.floor(Math.random() * t.length)];
        e.receiveAttack(n);
        var i = t.indexOf(n);
        i > -1 && t.splice(i, 1);
      },
      availableMoves: (t = [
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
      playerMove: function (e) {
        c.availableMoves.includes(e.target.id.slice(1))
          ? (c.attack(s, e.target.id.slice(1)), r(s))
          : alert("That square has already been attacked!");
      },
    },
    s = n(),
    o = n();
  (function (e) {
    for (var n = 0; n < 100; n++) {
      var r = document.createElement("div"),
        t = document.createElement("div");
      (r.className = "square pSquare"),
        (r.id = "p" + "".concat(e.availableMoves[n])),
        (t.className = "square cSquare"),
        (t.id = "c" + "".concat(e.availableMoves[n])),
        i.appendChild(r),
        a.appendChild(t);
    }
  })(c),
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
        var n = document.getElementById("playerGrid").children, i = 0;
        i < n.length;
        i++
      ) {
        var a = n[i].id.slice(1);
        e.occupied.includes(a) && (n[i].className = "square pSquare occupied");
      }
    })(o),
    r(s),
    (function () {
      for (
        var e = document.getElementsByClassName("square cSquare"), n = 0;
        n < e.length;
        n++
      )
        e[n].addEventListener("click", c.playerMove);
    })();
})();
