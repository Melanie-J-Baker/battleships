(() => {
  "use strict";
  var e = {
    d: (t, n) => {
      for (var a in n)
        e.o(n, a) &&
          !e.o(t, a) &&
          Object.defineProperty(t, a, { enumerable: !0, get: n[a] });
    },
    o: (e, t) => Object.prototype.hasOwnProperty.call(e, t),
  };
  function t(e) {
    const t = [],
      n = [],
      a = [];
    return {
      name: e,
      hits: t,
      misses: n,
      occupied: a,
      receiveAttack: (e) => {
        a.includes(e) ? t.push(e) : n.push(e);
      },
      allSunk: () => a.length === t.length,
      newShip: (e) => {
        if (e.some((e) => a.includes(e)))
          return "Coordinate(s) already occupied";
        a.push(...e);
      },
    };
  }
  e.d({}, { v: () => c });
  const n = (e) => {
    var t, n, a, r, o, l;
    const i = [];
    let s = 0;
    for (let e = 0; e < 10; e++) {
      i.push([]);
      for (let t = 0; t < 10 && s < 100; t++) i[e].push(s), s++;
    }
    const c = Math.floor(e / 10),
      d = i[c].findIndex((t) => t === e);
    return {
      right: i[c][d + 1],
      left: i[c][d - 1],
      top: null === (t = i[c - 1]) || void 0 === t ? void 0 : t[d],
      bottom: null === (n = i[c + 1]) || void 0 === n ? void 0 : n[d],
      topleft: null === (a = i[c - 1]) || void 0 === a ? void 0 : a[d - 1],
      topright: null === (r = i[c - 1]) || void 0 === r ? void 0 : r[d + 1],
      bottomleft: null === (o = i[c + 1]) || void 0 === o ? void 0 : o[d - 1],
      bottomright: null === (l = i[c + 1]) || void 0 === l ? void 0 : l[d + 1],
    };
  };
  function a() {
    const e = [
      ...Array.from({ length: 10 }, (e, t) =>
        Array.from({ length: 10 }, (e, n) => `${t + 1},${n + 1}`),
      ).flat(),
    ];
    let t = null;
    const a = (t, n) => {
      if (!e.includes(n)) return "That move is not available";
      t.receiveAttack(n);
      const a = e.indexOf(n);
      a > -1 && e.splice(a, 1);
    };
    return {
      attack: a,
      playerMove: (t, n) => {
        const r = t.target.id.slice(1);
        e.includes(r) && a(n, r);
      },
      computerMove: (a) => {
        if (null === t) {
          const n = e[Math.floor(Math.random() * e.length)];
          a.receiveAttack(n), (t = a.hits.includes(n) ? e.indexOf(n) : null);
          const r = e.indexOf(n);
          r > -1 && e.splice(r, 1);
        } else {
          const r = n(t),
            o = Object.values(r)
              .slice(0, 4)
              .filter((e) => void 0 !== e),
            l = o[Math.floor(Math.random() * o.length)],
            i = e[l];
          a.receiveAttack(i), (t = a.hits.includes(i) ? e.indexOf(i) : null);
          const s = e.indexOf(i);
          s > -1 && e.splice(s, 1);
        }
      },
      availableMoves: e,
      lastHitIndex: t,
    };
  }
  function r(e) {
    switch (e) {
      case "C":
        return "carrier";
      case "B":
        return "battleship";
      case "D":
        return "destroyer";
      case "P":
        return "patrolboat";
      default:
        return "";
    }
  }
  function o() {
    return {
      playerGrid: document.getElementById("playerGrid"),
      playerHeader: document.getElementById("playerHeader"),
      computerGrid: document.getElementById("computerGrid"),
      computerHeader: document.getElementById("computerHeader"),
      start: document.getElementById("start"),
      heading: document.querySelector("h1"),
      infoBox: document.getElementById("info"),
      winnerText: document.getElementById("winner"),
    };
  }
  function l(e) {
    const { infoBox: t } = o(),
      n = e.target;
    e.dataTransfer &&
      (e.dataTransfer.setData("text", n.id),
      e.dataTransfer.setData("text/class", Array.from(n.classList).toString())),
      t &&
        (t.textContent = "Place your ships on the grid. Click to rotate ship");
  }
  function i(e) {
    e.preventDefault(), e.dataTransfer && (e.dataTransfer.dropEffect = "move");
  }
  function s(e) {
    var t;
    e.preventDefault();
    const { infoBox: n } = o();
    if (!e.dataTransfer) return null;
    const a = e.target,
      r = e.dataTransfer.getData("text"),
      l = e.dataTransfer.getData("text/class"),
      i = document.getElementById(r);
    if (
      !i ||
      !(null === (t = null == a ? void 0 : a.id) || void 0 === t
        ? void 0
        : t.startsWith("p"))
    )
      return null;
    const s = i.children.length,
      [c, d] = a.id.slice(1).split(","),
      u = parseInt(c, 10),
      m = parseInt(d, 10),
      p = l.includes("vertical");
    for (let e = 0; e < s; e++) {
      const t = `p${p ? u + e : u},${p ? m : m + e}`,
        a = document.getElementById(t);
      if (!(null == a ? void 0 : a.parentNode))
        return (
          n && (n.textContent = "Boat cannot be placed there!"),
          (i.draggable = !1),
          (i.draggable = !0),
          null
        );
      (i.children[0].id = t), a.parentNode.replaceChild(i.children[0], a);
    }
    return [];
  }
  function c() {
    const {
      player: e,
      computer: n,
      playerBoard: c,
      computerBoard: d,
    } = {
      player: a(),
      computer: a(),
      playerBoard: t("Player"),
      computerBoard: t("Computer"),
    };
    (function (e) {
      const { infoBox: t, computerGrid: n } = o();
      if (!n || !t) return;
      let a = document.getElementById("boatsDisplay");
      a
        ? (a.innerHTML = "")
        : ((a = document.createElement("div")),
          (a.id = "boatsDisplay"),
          n.appendChild(a)),
        (n.className = ""),
        (function (e) {
          const { playerGrid: t, playerHeader: n } = o();
          if (t && n) {
            t.innerHTML = "";
            for (let n = 0; n < 100; n++) {
              let a = document.createElement("div");
              (a.className = "square pSquare"),
                (a.id = `p${e.availableMoves[n]}`),
                a.addEventListener("dragover", i),
                a.addEventListener("drop", (e) => s(e)),
                t.appendChild(a);
            }
            n.textContent = "Player";
          }
        })(e),
        (t.textContent = "Place your ships on the grid. Click to rotate ship");
      const l = [
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
      for (let e = 0; e < l.length; e++) {
        const t = document.createElement("div"),
          n = l[e][0];
        (t.className = `boat ${r(n)}`), (t.id = `${r(n)}${e}`);
        for (let a = 0; a < l[e].length; a++) {
          const e = document.createElement("div");
          (e.className = `boatSquare ${r(n)}Square`),
            (e.draggable = !1),
            t.appendChild(e);
        }
        a.appendChild(t);
      }
    })(e),
      (function () {
        const e = document.getElementsByClassName("boat");
        for (let t = 0; t < e.length; t++) {
          const n = e[t];
          (n.draggable = !0),
            n.addEventListener("dragstart", l),
            n.addEventListener("click", () => {
              n.classList.toggle("vertical");
            });
        }
      })(),
      (function (e) {
        const { computerGrid: t, computerHeader: n } = o();
        if (t && n) {
          t.innerHTML = "";
          for (let n = 0; n < 100; n++) {
            let a = document.createElement("div");
            (a.className = "square cSquare"),
              (a.id = `c${e.availableMoves[n]}`),
              t.appendChild(a);
          }
          n.textContent = "Computer";
        }
      })(n),
      (function (e) {
        const t = document.getElementsByClassName("square cSquare");
        for (let n = 0; n < t.length; n++) {
          const a = t[n].id.slice(1);
          e.hits.includes(a)
            ? (t[n].className = "square cSquare hit")
            : e.misses.includes(a) && (t[n].className = "square cSquare miss");
        }
      })(d),
      (function () {
        const { infoBox: e } = o();
        e && (e.textContent = "Your move! Choose a square to attack.");
      })(),
      (function (e) {
        const t = document.getElementsByClassName("square cSquare");
        for (var n = 0; n < t.length; n++)
          t[n].removeEventListener("click", e),
            t[n].classList.contains("hit") ||
              t[n].classList.contains("miss") ||
              t[n].addEventListener("click", e);
      })((t) => e.playerMove(t, d));
  }
  !(function () {
    const { start: e, heading: t, infoBox: n } = o();
    e.addEventListener("click", function () {
      "Start Game" === e.textContent
        ? ((e.textContent = "Restart Game"),
          t.classList.remove("large"),
          (n.style.display = "block"),
          c())
        : window.location.reload();
    });
  })();
})();
//# sourceMappingURL=main.js.map
