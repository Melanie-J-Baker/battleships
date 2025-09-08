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
  e.d({}, { vv: () => l, hG: () => d });
  const n = (e, t) => {
    const n = (e, t) =>
      e >= 1 && e <= 10 && t >= 1 && t <= 10 ? `${e},${t}` : void 0;
    return {
      right: n(e, t + 1),
      left: n(e, t - 1),
      top: n(e - 1, t),
      bottom: n(e + 1, t),
      topleft: n(e - 1, t - 1),
      topright: n(e - 1, t + 1),
      bottomleft: n(e + 1, t - 1),
      bottomright: n(e + 1, t + 1),
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
      },
      r = (a) => {
        if (null === t) {
          const n = e[Math.floor(Math.random() * e.length)];
          a.receiveAttack(n), a.hits.includes(n) && (t = n);
          const r = e.indexOf(n);
          r > -1 && e.splice(r, 1);
        } else {
          const [o, s] = t.split(","),
            c = parseInt(o, 10),
            i = parseInt(s, 10),
            l = n(c, i),
            d = [l.right, l.left, l.top, l.bottom].filter(
              (t) => !!t && e.includes(t),
            );
          if (d.length > 0) {
            const n = d[Math.floor(Math.random() * d.length)];
            a.receiveAttack(n), (t = a.hits.includes(n) ? n : null);
            const r = e.indexOf(n);
            r > -1 && e.splice(r, 1);
          } else (t = null), r(a);
        }
      };
    return {
      attack: a,
      playerMove: (t, n) => {
        const r = t.target.id.slice(1);
        e.includes(r) && a(n, r);
      },
      computerMove: r,
      availableMoves: e,
      lastHitCoord: t,
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
  function s(e) {
    const { infoBox: t } = o(),
      n = e.target;
    e.dataTransfer &&
      (e.dataTransfer.setData("text", n.id),
      e.dataTransfer.setData("text/class", Array.from(n.classList).toString())),
      t &&
        (t.textContent = "Place your ships on the grid. Click to rotate ship");
  }
  function c(e) {
    e.preventDefault(), e.dataTransfer && (e.dataTransfer.dropEffect = "move");
  }
  function i(e, t, a, r, s) {
    var c, i;
    e.preventDefault();
    const { infoBox: l } = o();
    if (!e.dataTransfer) return null;
    const u = e.target,
      p = e.dataTransfer.getData("text"),
      m = e.dataTransfer.getData("text/class"),
      f = document.getElementById(p);
    if (
      !f ||
      !(null === (c = null == u ? void 0 : u.id) || void 0 === c
        ? void 0
        : c.startsWith("p"))
    )
      return null;
    const h = f.children.length,
      [g, v] = u.id.slice(1).split(","),
      y = parseInt(g, 10),
      B = parseInt(v, 10),
      C = m.includes("vertical"),
      S = [];
    for (let e = 0; e < h; e++) {
      const t = C ? y + e : y,
        n = C ? B : B + e;
      S.push(`${t},${n}`);
    }
    if (
      !S.every((e) => {
        const t = document.getElementById("p" + e);
        return null !== t && !t.classList.contains("occupied");
      })
    )
      return l && (l.textContent = "Boat cannot be placed there!"), null;
    for (let e = 0; e < S.length; e++) {
      const t = S[e],
        n = document.getElementById("p" + t);
      (f.children[0].id = "p" + t),
        null === (i = n.parentNode) ||
          void 0 === i ||
          i.replaceChild(f.children[0], n);
    }
    return (
      (function (e, t, a, r, s) {
        const { infoBox: c } = o(),
          i = new Set(e.occupied),
          l = [];
        for (const e of t) {
          const [t, a] = e.split(","),
            r = parseInt(t, 10),
            o = parseInt(a, 10),
            s = n(r, o);
          l.push(...Object.values(s).filter(Boolean));
        }
        const u = t.some((e) => i.has(e)),
          p = l.some((e) => i.has(e));
        u || p
          ? c && (c.textContent = "Boat cannot be placed there!")
          : (e.newShip(t),
            (function (e) {
              const { playerGrid: t } = o();
              if (!t) return;
              const n = t.children;
              for (let t = 0; t < n.length; t++) {
                const a = n[t],
                  r = a.id.slice(1);
                e.occupied.includes(r) &&
                  (a.className = "square pSquare occupied");
              }
            })(e),
            30 === e.occupied.length &&
              (c && (c.textContent = "All ships placed! Let the battle begin!"),
              d(a, r, e, s)));
      })(t, S, a, r, s),
      S
    );
  }
  function l() {
    const {
      player: e,
      playerBoard: n,
      computer: l,
      computerBoard: d,
    } = {
      player: a(),
      computer: a(),
      playerBoard: t("Player"),
      computerBoard: t("Computer"),
    };
    (function (e, t, n, a) {
      const { infoBox: s, computerGrid: l } = o();
      if (!l || !s) return;
      let d = document.getElementById("boatsDisplay");
      d
        ? (d.innerHTML = "")
        : ((d = document.createElement("div")),
          (d.id = "boatsDisplay"),
          l.appendChild(d)),
        (l.className = ""),
        (function (e, t, n, a) {
          const { playerGrid: r, playerHeader: s } = o();
          if (r && s) {
            r.innerHTML = "";
            for (let o = 0; o < 100; o++) {
              let s = document.createElement("div");
              (s.className = "square pSquare"),
                (s.id = `p${e.availableMoves[o]}`),
                s.addEventListener("dragover", c),
                s.addEventListener("drop", (r) => i(r, t, e, n, a)),
                r.appendChild(s);
            }
            s.textContent = "Player";
          }
        })(e, t, n, a),
        (s.textContent = "Place your ships on the grid. Click to rotate ship");
      const u = [
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
      for (let e = 0; e < u.length; e++) {
        const t = document.createElement("div"),
          n = u[e][0];
        (t.className = `boat ${r(n)}`), (t.id = `${r(n)}${e}`);
        for (let a = 0; a < u[e].length; a++) {
          const e = document.createElement("div");
          (e.className = `boatSquare ${r(n)}Square`),
            (e.draggable = !1),
            t.appendChild(e);
        }
        d.appendChild(t);
      }
    })(e, n, l, d),
      (function () {
        const e = document.getElementsByClassName("boat");
        for (let t = 0; t < e.length; t++) {
          const n = e[t];
          (n.draggable = !0),
            n.addEventListener("dragstart", s),
            n.addEventListener("click", () => {
              n.classList.toggle("vertical");
            });
        }
      })();
  }
  function d(e, t, n, a) {
    !(function (e, t) {
      const { computerGrid: n, computerHeader: a } = o();
      if (n && a) {
        (n.innerHTML = ""), (n.className = "grid");
        for (let t = 0; t < 100; t++) {
          let a = document.createElement("div");
          (a.className = "square cSquare"),
            (a.id = `c${e.availableMoves[t]}`),
            n.appendChild(a);
        }
        (a.textContent = "Computer"),
          t.newShip(["1,6", "1,7", "1,8", "1,9", "1,10"]),
          t.newShip(["8,2", "8,3", "8,4", "8,5"]),
          t.newShip(["6,9", "7,9", "8,9", "9,9"]),
          t.newShip(["3,2", "4,2", "5,2"]),
          t.newShip(["10,5", "10,6", "10,7"]),
          t.newShip(["4,7", "4,8", "4,9"]),
          t.newShip(["1,1", "1,2"]),
          t.newShip(["10,1", "10,2"]),
          t.newShip(["5,5", "6,5"]),
          t.newShip(["2,4", "3,4"]);
      }
    })(t, a),
      (function (e) {
        const t = document.getElementsByClassName("square pSquare");
        for (let n = 0; n < t.length; n++) {
          const a = t[n].id.slice(1);
          e.hits.includes(a)
            ? (t[n].className = "square pSquare hit")
            : e.misses.includes(a)
            ? (t[n].className = "square pSquare miss")
            : e.occupied.includes(a) &&
              (t[n].className = "square pSquare occupied");
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
      })(a),
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
      })((t) => e.playerMove(t, a));
  }
  !(function () {
    const { start: e, heading: t, infoBox: n } = o();
    e.addEventListener("click", function () {
      "Start Game" === e.textContent
        ? ((e.textContent = "Restart Game"),
          t.classList.remove("large"),
          (n.style.display = "block"),
          l())
        : window.location.reload();
    });
  })();
})();
//# sourceMappingURL=main.js.map
