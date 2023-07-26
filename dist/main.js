(() => {
  "use strict";
  var e = {
    d: (t, a) => {
      for (var n in a)
        e.o(a, n) &&
          !e.o(t, n) &&
          Object.defineProperty(t, n, { enumerable: !0, get: a[n] });
    },
    o: (e, t) => Object.prototype.hasOwnProperty.call(e, t),
  };
  e.d(
    {},
    {
      lA: () => k,
      UR: () => y,
      n1: () => b,
      rH: () => E,
      hM: () => C,
      mO: () => S,
    },
  );
  const t = function (e) {
    for (var t, a, n = [], r = 0, o = 0; o < 10; o++) {
      n.push([]);
      for (var i = 0; i < 10 && r < 100; i++) n[o].push(r), r++;
    }
    var s = parseInt(e / 10),
      c = n[s].findIndex(function (t) {
        return t === e;
      }),
      l = n[s][c + 1],
      u = n[s][c - 1],
      d = null === (t = n[s - 1]) || void 0 === t ? void 0 : t[c];
    return {
      right: l,
      left: u,
      bottom: null === (a = n[s + 1]) || void 0 === a ? void 0 : a[c],
      top: d,
    };
  };
  function a(e) {
    var t = document.getElementById("info");
    e.dataTransfer.setData("text", e.target.id),
      e.dataTransfer.setData("text/class", e.target.classList),
      (t.textContent = "Place your ships on the grid. Click to rotate ship");
  }
  function n(e) {
    e.preventDefault(), (e.dataTransfer.dropEffect = "move");
  }
  function r(e) {
    e.preventDefault();
    var t = document.getElementById("info"),
      a = e.dataTransfer.getData("text"),
      n = e.dataTransfer.getData("text/class"),
      r = document.getElementById(a),
      c = r.children.length,
      l = (function (e, t, a) {
        var n,
          r = t.slice(0, -1),
          o = e.slice(1),
          i = o.split(",")[0],
          s = o.split(",")[1];
        switch (r) {
          case "carrier":
            n = 5;
            break;
          case "battleship":
            n = 4;
            break;
          case "destroyer":
            n = 3;
            break;
          case "patrolboat":
            n = 2;
        }
        return a.includes("vertical")
          ? +i + n <= 11 && +i > 0 && s > 0 && s <= 10
          : +s + n <= 11 && +s > 0 && i > 0 && i <= 10;
      })(e.target.id, a, n),
      u = [];
    if (!1 === l) t.textContent = "Boat cannot be placed there!";
    else
      for (var d = 0; d < c; d++)
        if (n.includes("vertical")) {
          var v = e.target.id.slice(1),
            m = v.split(",")[0],
            p = v.split(",")[1],
            h = (+m + d).toString(),
            f = "p" + h + "," + p,
            g = h + "," + p,
            b = C.availableMoves.indexOf(g);
          if (!0 === o(S, f) && !0 === i(b)) {
            u.push(g);
            var y = document.getElementById(f);
            (r.children[0].id = f), y.parentNode.replaceChild(r.children[0], y);
          } else t.textContent = "Boat cannot be placed there!";
        } else {
          var k = e.target.id.slice(1),
            B = k.split(",")[0],
            q = (+k.split(",")[1] + d).toString(),
            x = B + "," + q,
            M = "p" + B + "," + q,
            N = C.availableMoves.indexOf(x);
          if (!0 === o(S, M) && !0 === i(N)) {
            u.push(x);
            var I = document.getElementById(M);
            (r.children[0].id = M), I.parentNode.replaceChild(r.children[0], I);
          } else t.textContent = "Boat cannot be placed there!";
        }
    S.newShip(u), s(S), 30 === S.occupied.length && E();
  }
  function o(e, t) {
    return !e.occupied.includes(t);
  }
  function i(e) {
    for (
      var a = t(e),
        n = Object.values(a).filter(function (e) {
          return void 0 !== e;
        }),
        r = [],
        o = 0;
      o < n.length;
      o++
    )
      r.push(C.availableMoves[n[o]]);
    for (var i = 0; i < r.length; i++) return !S.occupied.includes(r[i]);
  }
  function s(e) {
    for (
      var t = document.getElementById("playerGrid").children, a = 0;
      a < t.length;
      a++
    ) {
      var n = t[a].id.slice(1);
      e.occupied.includes(n) && (t[a].className = "square pSquare occupied");
    }
  }
  function c(e) {
    for (
      var t = document.getElementsByClassName("square cSquare"), a = 0;
      a < t.length;
      a++
    )
      !0 === e.hits.includes(t[a].id.slice(1))
        ? (t[a].className = "square cSquare hit")
        : !0 === e.misses.includes(t[a].id.slice(1)) &&
          (t[a].className = "square cSquare miss");
  }
  function l() {
    for (
      var e = document.getElementsByClassName("square cSquare"), t = 0;
      t < e.length;
      t++
    )
      e[t].removeEventListener("click", C.playerMove),
        !1 === e[t].classList.contains("hit") &&
          !1 === e[t].classList.contains("miss") &&
          e[t].addEventListener("click", C.playerMove);
  }
  function u() {
    for (
      var e = document.getElementsByClassName("square cSquare"), t = 0;
      t < e.length;
      t++
    )
      e[t].removeEventListener("click", C.playerMove);
  }
  function d() {
    var e = document.getElementById("info");
    "Computer is taking their turn." !== e.textContent
      ? setTimeout(function () {
          e.textContent = "Your move! Choose a square to attack.";
        }, 2e3)
      : (e.textContent = "Your move! Choose a square to attack.");
  }
  function v(e, t) {
    var a = document.getElementById("info"),
      n = t.shipCoords.length;
    switch ((console.log(e), n)) {
      case 5:
        a.textContent = "".concat(e, "'s Carrier sunk!");
        break;
      case 4:
        a.textContent = "".concat(e, "'s Battleship sunk!");
        break;
      case 3:
        a.textContent = "".concat(e, "'s Destroyer sunk!");
        break;
      case 2:
        a.textContent = "".concat(e, "'s Patrol boat sunk!");
    }
  }
  const m = function (e) {
    var t = e,
      a = [],
      n = [],
      r = [],
      o = [];
    return {
      newShip: function (e) {
        if (
          !0 ===
          n.some(function (t) {
            return e.indexOf(t) >= 0;
          })
        )
          return "Coordinate(s) already occupied";
        var t = (function (e) {
          var t = [];
          return (
            e.map(function (e) {
              return t.push(e);
            }),
            {
              hit: function (e) {
                t[e] = "hit";
              },
              isSunk: function () {
                return t.every(function (e) {
                  return "hit" === e;
                });
              },
              shipCoords: t,
            }
          );
        })(e);
        a.push(t);
        for (var r = 0; r < t.shipCoords.length; r++) n.push(t.shipCoords[r]);
      },
      receiveAttack: function (e) {
        if (!1 !== o.includes(e) || !1 !== r.includes(e))
          return "Square has already been attacked!";
        for (var i = 0; i < a.length; i++)
          for (var s = 0; s < a[i].shipCoords.length; s++)
            a[i].shipCoords[s] === e &&
              (a[i].hit(s), o.push(e), a[i].isSunk() && v(t, a[i]));
        !1 === n.includes(e) && r.push(e);
      },
      allSunk: function () {
        return a
          .map(function (e) {
            return e.isSunk();
          })
          .every(function (e) {
            return !0 === e;
          });
      },
      shipCoordsBoard: a,
      misses: r,
      hits: o,
      occupied: n,
    };
  };
  var p = [
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
  const h = function () {
    var e = null,
      a = function (a) {
        var n;
        if (null === e) {
          var r =
            y.availableMoves[
              Math.floor(Math.random() * y.availableMoves.length)
            ];
          a.receiveAttack(r), (e = a.hits.includes(r) ? p.indexOf(r) : null);
          var o = y.availableMoves.indexOf(r);
          o > -1 && y.availableMoves.splice(o, 1);
        } else if (null !== e) {
          var i = t(e),
            s = Object.values(i).filter(function (e) {
              return void 0 !== e;
            }),
            c = s[Math.floor(Math.random() * s.length)],
            l = p[c];
          a.receiveAttack(l),
            (e = a.hits.includes(l) ? p.indexOf(l) : null),
            (n = y.availableMoves.indexOf(l)) > -1 &&
              y.availableMoves.splice(n, 1);
        }
      },
      n = function () {
        a(S),
          (function (e) {
            for (
              var t = document.getElementsByClassName("square pSquare"), a = 0;
              a < t.length;
              a++
            )
              !0 === e.hits.includes(t[a].id.slice(1))
                ? (t[a].className = "square pSquare hit")
                : !0 === e.misses.includes(t[a].id.slice(1)) &&
                  (t[a].className = "square pSquare miss");
          })(S),
          !0 === S.allSunk()
            ? ((document.getElementById("info").textContent =
                "Computer has sunk all your ships! You lose!"),
              u())
            : (d(), l());
      };
    return {
      attack: function (e, t) {
        e.receiveAttack(t);
        var a = C.availableMoves.indexOf(t);
        a > -1 && C.availableMoves.splice(a, 1);
      },
      randomAttack: a,
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
      playerMove: function (e) {
        var t,
          a = e.target.id.slice(1);
        C.availableMoves.includes(a) &&
          (C.attack(b, a),
          c(b),
          u(),
          !0 === b.allSunk()
            ? (document.getElementById("info").textContent = "You have won!")
            : ("Your move! Choose a square to attack." !==
              (t = document.getElementById("info")).textContent
                ? setTimeout(function () {
                    t.textContent = "Computer is taking their turn.";
                  }, 2e3)
                : (t.textContent = "Computer is taking their turn."),
              setTimeout(n, 1e3)));
      },
      computerMove: n,
      lastHitIndex: e,
    };
  };
  var f,
    g,
    C = h(),
    b = m("Computer"),
    y = h(),
    S = m("Player");
  function k() {
    (function () {
      var e = document.getElementById("info"),
        t = document.getElementById("computerGrid"),
        a = [
          ["C", "C", "C", "C", "C"],
          ["B", "B", "B", "B"],
          ["B", "B", "B", "B"],
          ["D", "D", "D"],
          ["D", "D", "D"],
          ["D", "D", "D"],
          ["P", "P"],
          ["P", "P"],
          ["P", "P"],
          ["P", "P"],
        ],
        o = document.createElement("div");
      (o.id = "boatsDisplay"),
        (t.className = ""),
        t.appendChild(o),
        (function (e) {
          for (
            var t = document.getElementById("playerGrid"),
              a = document.getElementById("playerHeader"),
              o = 0;
            o < 100;
            o++
          ) {
            var i = document.createElement("div");
            (i.className = "square pSquare"),
              (i.id = "p" + "".concat(e.availableMoves[o])),
              i.addEventListener("dragover", n),
              i.addEventListener("drop", r),
              t.appendChild(i);
          }
          a.textContent = "Player";
        })(C),
        (e.textContent = "Place your ships on the grid. Click to rotate ship");
      for (var i = 0; i < a.length; i++) {
        var s = document.createElement("div");
        switch (a[i][0]) {
          case "C":
            (s.className = "boat carrier"), (s.id = "carrier" + "".concat(i));
            for (var c = 0; c < a[i].length; c++) {
              var l = document.createElement("div");
              (l.className = "boatSquare carrierSquare"),
                (l.draggable = !1),
                s.appendChild(l);
            }
            break;
          case "B":
            (s.className = "boat battleship"),
              (s.id = "battleship" + "".concat(i));
            for (var u = 0; u < a[i].length; u++) {
              var d = document.createElement("div");
              (d.className = "boatSquare battleshipSquare"),
                (d.draggable = !1),
                s.appendChild(d);
            }
            break;
          case "D":
            (s.className = "boat destroyer"),
              (s.id = "destroyer" + "".concat(i));
            for (var v = 0; v < a[i].length; v++) {
              var m = document.createElement("div");
              (m.className = "boatSquare destroyerSquare"),
                (m.draggable = !1),
                s.appendChild(m);
            }
            break;
          case "P":
            (s.className = "boat patrolboat"),
              (s.id = "patrolboat" + "".concat(i));
            for (var p = 0; p < a[i].length; p++) {
              var h = document.createElement("div");
              (h.className = "boatSquare patrolboatSquare"),
                (h.draggable = !1),
                s.appendChild(h);
            }
            break;
          default:
            alert("Something went wrong when creating boats!");
        }
        o.appendChild(s);
      }
    })(),
      (function () {
        for (
          var e = document.getElementsByClassName("boat"),
            t = function () {
              var t = e[n];
              (t.draggable = !0),
                t.addEventListener("dragstart", a),
                t.addEventListener("click", function () {
                  t.classList.contains("vertical")
                    ? t.classList.remove("vertical")
                    : t.classList.add("vertical");
                });
            },
            n = 0;
          n < e.length;
          n++
        )
          t();
      })(),
      b.newShip(["1,6", "1,7", "1,8", "1,9", "1,10"]),
      b.newShip(["8,2", "8,3", "8,4", "8,5"]),
      b.newShip(["6,9", "7,9", "8,9", "9,9"]),
      b.newShip(["3,2", "4,2", "5,2"]),
      b.newShip(["10,5", "10,6", "10,7"]),
      b.newShip(["4,7", "4,8", "4,9"]),
      b.newShip(["1,1", "1,2"]),
      b.newShip(["10,1", "10,2"]),
      b.newShip(["5,5", "6,5"]),
      b.newShip(["2,4", "3,4"]);
  }
  function E() {
    var e = document.getElementById("computerGrid"),
      t = document.getElementById("boatsDisplay");
    e.removeChild(t),
      (e.className = "grid"),
      (function (e) {
        for (
          var t = document.getElementById("computerGrid"),
            a = document.getElementById("computerHeader"),
            n = 0;
          n < 100;
          n++
        ) {
          var r = document.createElement("div");
          (r.className = "square cSquare"),
            (r.id = "c" + "".concat(e.availableMoves[n])),
            t.appendChild(r);
        }
        a.textContent = "Computer";
      })(C),
      s(S),
      c(b),
      d(),
      l();
  }
  (f = document.getElementById("start")),
    (g = document.querySelector("h1")),
    f.addEventListener("click", function () {
      "Start Game" === f.textContent
        ? ((f.textContent = "Restart Game"), g.classList.remove("large"), k())
        : window.location.reload();
    });
})();
