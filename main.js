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
      lA: () => w,
      UR: () => M,
      n1: () => B,
      rH: () => D,
      hM: () => x,
      mO: () => N,
    },
  );
  var t = document.getElementById("playerGrid"),
    a = document.getElementById("playerHeader"),
    n = document.getElementById("computerGrid"),
    r = document.getElementById("computerHeader"),
    o = document.getElementById("start"),
    i = document.querySelector("h1"),
    s = document.getElementById("info"),
    l = document.createElement("div"),
    c = document.getElementById("winner");
  function d(e) {
    for (var t = 0; t < 100; t++) {
      var a = document.createElement("div");
      (a.className = "square cSquare"),
        (a.id = "c" + "".concat(e.availableMoves[t])),
        n.appendChild(a);
    }
    r.textContent = "Computer";
  }
  function u(e) {
    e.dataTransfer.setData("text", e.target.id),
      e.dataTransfer.setData("text/class", e.target.classList),
      (s.textContent = "Place your ships on the grid. Click to rotate ship");
  }
  function v(e) {
    e.preventDefault(), (e.dataTransfer.dropEffect = "move");
  }
  function p(e) {
    e.preventDefault();
    var t,
      a = e.dataTransfer.getData("text"),
      n = e.dataTransfer.getData("text/class"),
      r = document.getElementById(a),
      o = r.children.length,
      i = (function (e, t, a) {
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
      l = [];
    if (!1 === i || !1 === t)
      (s.textContent = "Boat cannot be placed there!"),
        (t = !1),
        (l = []),
        (r.draggable = !1),
        (r.draggable = !0);
    else
      for (var c = 0; c < o; c++)
        if (n.includes("vertical")) {
          var d = e.target.id.slice(1),
            u = d.split(",")[0],
            v = d.split(",")[1],
            p = (+u + c).toString(),
            m = "p" + p + "," + v,
            f = p + "," + v;
          if (!0 === h(N, m) && !1 === k.includes(f) && !1 !== t) {
            l.push(f);
            var g = document.getElementById(m);
            (r.children[0].id = m), g.parentNode.replaceChild(r.children[0], g);
          } else
            (s.textContent = "Boat cannot be placed there!"),
              (l = []),
              (t = !1),
              (r.draggable = !1),
              (r.draggable = !0);
        } else {
          var b = e.target.id.slice(1),
            C = b.split(",")[0],
            y = (+b.split(",")[1] + c).toString(),
            S = C + "," + y,
            q = "p" + C + "," + y;
          if (!0 === h(N, q) && !1 === k.includes(S) && !1 !== t) {
            l.push(S);
            var E = document.getElementById(q);
            (r.children[0].id = q), E.parentNode.replaceChild(r.children[0], E);
          } else
            (s.textContent = "Boat cannot be placed there!"),
              (l = []),
              (t = !1),
              (r.draggable = !1),
              (r.draggable = !0);
        }
    !1 ===
      l.some(function (e) {
        return k.includes(e);
      }) &&
      (N.newShip(l),
      (function (e) {
        for (
          var t = document.getElementById("playerGrid").children, a = 0;
          a < t.length;
          a++
        ) {
          var n = t[a].id.slice(1);
          e.occupied.includes(n) &&
            (t[a].className = "square pSquare occupied");
        }
      })(N),
      30 === N.occupied.length && D());
  }
  function h(e, t) {
    return !e.occupied.includes(t);
  }
  function m(e) {
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
  function f() {
    for (
      var e = document.getElementsByClassName("square cSquare"), t = 0;
      t < e.length;
      t++
    )
      e[t].removeEventListener("click", x.playerMove),
        !1 === e[t].classList.contains("hit") &&
          !1 === e[t].classList.contains("miss") &&
          e[t].addEventListener("click", x.playerMove);
  }
  function g() {
    for (
      var e = document.getElementsByClassName("square cSquare"), t = 0;
      t < e.length;
      t++
    )
      e[t].removeEventListener("click", x.playerMove);
  }
  function b() {
    "Computer is taking their turn." !== s.textContent
      ? setTimeout(function () {
          s.textContent = "Your move! Choose a square to attack.";
        }, 2e3)
      : (s.textContent = "Your move! Choose a square to attack.");
  }
  function C(e, t) {
    var a = t.shipCoords.length;
    switch ((console.log(e), a)) {
      case 5:
        s.textContent = "".concat(e, "'s Carrier sunk!");
        break;
      case 4:
        s.textContent = "".concat(e, "'s Battleship sunk!");
        break;
      case 3:
        s.textContent = "".concat(e, "'s Destroyer sunk!");
        break;
      case 2:
        s.textContent = "".concat(e, "'s Patrol boat sunk!");
    }
  }
  const y = function (e) {
    for (var t, a, n, r, o, i, s = [], l = 0, c = 0; c < 10; c++) {
      s.push([]);
      for (var d = 0; d < 10 && l < 100; d++) s[c].push(l), l++;
    }
    var u = parseInt(e / 10),
      v = s[u].findIndex(function (t) {
        return t === e;
      });
    return {
      right: s[u][v + 1],
      left: s[u][v - 1],
      top: null === (t = s[u - 1]) || void 0 === t ? void 0 : t[v],
      bottom: null === (a = s[u + 1]) || void 0 === a ? void 0 : a[v],
      topleft: null === (n = s[u - 1]) || void 0 === n ? void 0 : n[v - 1],
      topright: null === (r = s[u - 1]) || void 0 === r ? void 0 : r[v + 1],
      bottomleft: null === (o = s[u + 1]) || void 0 === o ? void 0 : o[v - 1],
      bottomright: null === (i = s[u + 1]) || void 0 === i ? void 0 : i[v + 1],
    };
  };
  var k = [],
    S = function (e) {
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
          for (var r = 0; r < t.shipCoords.length; r++) {
            n.push(t.shipCoords[r]);
            for (
              var o = x.availableMoves.indexOf(t.shipCoords[r]),
                i = y(o),
                s = Object.values(i).filter(function (e) {
                  return void 0 !== e;
                }),
                l = 0;
              l < s.length;
              l++
            )
              !1 === k.includes(x.availableMoves[s[l]]) &&
                k.push(x.availableMoves[s[l]]);
          }
          console.log(n);
        },
        receiveAttack: function (e) {
          if (!1 !== o.includes(e) || !1 !== r.includes(e))
            return "Square has already been attacked!";
          for (var i = 0; i < a.length; i++)
            for (var s = 0; s < a[i].shipCoords.length; s++)
              a[i].shipCoords[s] === e &&
                (a[i].hit(s), o.push(e), a[i].isSunk() && C(t, a[i]));
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
    },
    q = [
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
  const E = function () {
    var e = null,
      t = function (t) {
        var a;
        if (null === e) {
          var n =
            M.availableMoves[
              Math.floor(Math.random() * M.availableMoves.length)
            ];
          t.receiveAttack(n), (e = t.hits.includes(n) ? q.indexOf(n) : null);
          var r = M.availableMoves.indexOf(n);
          r > -1 && M.availableMoves.splice(r, 1);
        } else if (null !== e) {
          for (var o = y(e), i = Object.values(o), s = [], l = 0; l < 4; l++)
            s.push(i[l]);
          var c = s.filter(function (e) {
              return void 0 !== e;
            }),
            d = c[Math.floor(Math.random() * c.length)],
            u = q[d];
          t.receiveAttack(u),
            (e = t.hits.includes(u) ? q.indexOf(u) : null),
            (a = M.availableMoves.indexOf(u)) > -1 &&
              M.availableMoves.splice(a, 1);
        }
      },
      a = function () {
        t(N),
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
          })(N),
          !0 === N.allSunk()
            ? ((s.textContent = "Computer has sunk all your ships! You lose!"),
              g())
            : (b(), f());
      };
    return {
      attack: function (e, t) {
        e.receiveAttack(t);
        var a = x.availableMoves.indexOf(t);
        a > -1 && x.availableMoves.splice(a, 1);
      },
      randomAttack: t,
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
        var t = e.target.id.slice(1);
        x.availableMoves.includes(t) &&
          (x.attack(B, t),
          m(B),
          g(),
          !0 === B.allSunk()
            ? ((c.style.display = "block"),
              (s.textContent =
                "All of Computer's ships have been sunk! You have won!"))
            : ("Your move! Choose a square to attack." !== s.textContent
                ? setTimeout(function () {
                    s.textContent = "Computer is taking their turn.";
                  }, 2e3)
                : (s.textContent = "Computer is taking their turn."),
              setTimeout(a, 1e3)));
      },
      computerMove: a,
      lastHitIndex: e,
    };
  };
  var x = E(),
    B = S("Computer"),
    M = E(),
    N = S("Player");
  function w() {
    (function () {
      var e = [
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
      ];
      (l.id = "boatsDisplay"),
        (n.className = ""),
        n.appendChild(l),
        (function (e) {
          for (var n = 0; n < 100; n++) {
            var r = document.createElement("div");
            (r.className = "square pSquare"),
              (r.id = "p" + "".concat(e.availableMoves[n])),
              r.addEventListener("dragover", v),
              r.addEventListener("drop", p),
              t.appendChild(r);
          }
          a.textContent = "Player";
        })(x),
        (s.textContent = "Place your ships on the grid. Click to rotate ship");
      for (var r = 0; r < e.length; r++) {
        var o = document.createElement("div");
        switch (e[r][0]) {
          case "C":
            (o.className = "boat carrier"), (o.id = "carrier" + "".concat(r));
            for (var i = 0; i < e[r].length; i++) {
              var c = document.createElement("div");
              (c.className = "boatSquare carrierSquare"),
                (c.draggable = !1),
                o.appendChild(c);
            }
            break;
          case "B":
            (o.className = "boat battleship"),
              (o.id = "battleship" + "".concat(r));
            for (var d = 0; d < e[r].length; d++) {
              var u = document.createElement("div");
              (u.className = "boatSquare battleshipSquare"),
                (u.draggable = !1),
                o.appendChild(u);
            }
            break;
          case "D":
            (o.className = "boat destroyer"),
              (o.id = "destroyer" + "".concat(r));
            for (var h = 0; h < e[r].length; h++) {
              var m = document.createElement("div");
              (m.className = "boatSquare destroyerSquare"),
                (m.draggable = !1),
                o.appendChild(m);
            }
            break;
          case "P":
            (o.className = "boat patrolboat"),
              (o.id = "patrolboat" + "".concat(r));
            for (var f = 0; f < e[r].length; f++) {
              var g = document.createElement("div");
              (g.className = "boatSquare patrolboatSquare"),
                (g.draggable = !1),
                o.appendChild(g);
            }
            break;
          default:
            alert("Something went wrong when creating boats!");
        }
        l.appendChild(o);
      }
    })(),
      (function () {
        for (
          var e = document.getElementsByClassName("boat"),
            t = function () {
              var t = e[a];
              (t.draggable = !0),
                t.addEventListener("dragstart", u),
                t.addEventListener("click", function () {
                  t.classList.contains("vertical")
                    ? t.classList.remove("vertical")
                    : t.classList.add("vertical");
                });
            },
            a = 0;
          a < e.length;
          a++
        )
          t();
      })();
  }
  function D() {
    B.newShip(["1,6", "1,7", "1,8", "1,9", "1,10"]),
      B.newShip(["8,2", "8,3", "8,4", "8,5"]),
      B.newShip(["6,9", "7,9", "8,9", "9,9"]),
      B.newShip(["3,2", "4,2", "5,2"]),
      B.newShip(["10,5", "10,6", "10,7"]),
      B.newShip(["4,7", "4,8", "4,9"]),
      B.newShip(["1,1", "1,2"]),
      B.newShip(["10,1", "10,2"]),
      B.newShip(["5,5", "6,5"]),
      B.newShip(["2,4", "3,4"]);
    var e = document.getElementById("computerGrid"),
      t = document.getElementById("boatsDisplay");
    e.removeChild(t), (e.className = "grid"), d(x), m(B), b(), f();
  }
  o.addEventListener("click", function () {
    "Start Game" === o.textContent
      ? ((o.textContent = "Restart Game"),
        i.classList.remove("large"),
        (s.style.display = "block"),
        w())
      : window.location.reload();
  });
})();
