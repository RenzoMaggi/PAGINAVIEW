var Ee = Object.create,
  q = Object.defineProperty,
  xe = Object.getOwnPropertyDescriptor,
  Te = Object.getOwnPropertyNames,
  be = Object.getPrototypeOf,
  Ae = Object.prototype.hasOwnProperty,
  Ne = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports),
  Se = (e, t, r, o) => {
    if ((t && typeof t == "object") || typeof t == "function")
      for (let n of Te(t))
        !Ae.call(e, n) &&
          n !== r &&
          q(e, n, {
            get: () => t[n],
            enumerable: !(o = xe(t, n)) || o.enumerable,
          });
    return e;
  },
  ve = (e, t, r) => (
    (r = e != null ? Ee(be(e)) : {}),
    Se(
      t || !e || !e.__esModule
        ? q(r, "default", { value: e, enumerable: !0 })
        : r,
      e
    )
  ),
  ne = Ne((exports, module) => {
    (function () {
      "use strict";
      var root = typeof window == "object" ? window : {},
        NODE_JS =
          !root.JS_SHA1_NO_NODE_JS &&
          typeof process == "object" &&
          process.versions &&
          process.versions.node;
      NODE_JS && (root = global);
      var COMMON_JS =
          !root.JS_SHA1_NO_COMMON_JS &&
          typeof module == "object" &&
          module.exports,
        AMD = typeof define == "function" && define.amd,
        HEX_CHARS = "0123456789abcdef".split(""),
        EXTRA = [-2147483648, 8388608, 32768, 128],
        SHIFT = [24, 16, 8, 0],
        OUTPUT_TYPES = ["hex", "array", "digest", "arrayBuffer"],
        blocks = [],
        createOutputMethod = function (e) {
          return function (t) {
            return new Sha1(!0).update(t)[e]();
          };
        },
        createMethod = function () {
          var e = createOutputMethod("hex");
          NODE_JS && (e = nodeWrap(e)),
            (e.create = function () {
              return new Sha1();
            }),
            (e.update = function (o) {
              return e.create().update(o);
            });
          for (var t = 0; t < OUTPUT_TYPES.length; ++t) {
            var r = OUTPUT_TYPES[t];
            e[r] = createOutputMethod(r);
          }
          return e;
        },
        nodeWrap = function (method) {
          var crypto = eval("require('crypto')"),
            Buffer = eval("require('buffer').Buffer"),
            nodeMethod = function (e) {
              if (typeof e == "string")
                return crypto
                  .createHash("sha1")
                  .update(e, "utf8")
                  .digest("hex");
              if (e.constructor === ArrayBuffer) e = new Uint8Array(e);
              else if (e.length === void 0) return method(e);
              return crypto
                .createHash("sha1")
                .update(new Buffer(e))
                .digest("hex");
            };
          return nodeMethod;
        };
      function Sha1(e) {
        e
          ? ((blocks[0] =
              blocks[16] =
              blocks[1] =
              blocks[2] =
              blocks[3] =
              blocks[4] =
              blocks[5] =
              blocks[6] =
              blocks[7] =
              blocks[8] =
              blocks[9] =
              blocks[10] =
              blocks[11] =
              blocks[12] =
              blocks[13] =
              blocks[14] =
              blocks[15] =
                0),
            (this.blocks = blocks))
          : (this.blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
          (this.h0 = 1732584193),
          (this.h1 = 4023233417),
          (this.h2 = 2562383102),
          (this.h3 = 271733878),
          (this.h4 = 3285377520),
          (this.block = this.start = this.bytes = this.hBytes = 0),
          (this.finalized = this.hashed = !1),
          (this.first = !0);
      }
      (Sha1.prototype.update = function (e) {
        if (!this.finalized) {
          var t = typeof e != "string";
          t && e.constructor === root.ArrayBuffer && (e = new Uint8Array(e));
          for (var r, o = 0, n, i = e.length || 0, a = this.blocks; o < i; ) {
            if (
              (this.hashed &&
                ((this.hashed = !1),
                (a[0] = this.block),
                (a[16] =
                  a[1] =
                  a[2] =
                  a[3] =
                  a[4] =
                  a[5] =
                  a[6] =
                  a[7] =
                  a[8] =
                  a[9] =
                  a[10] =
                  a[11] =
                  a[12] =
                  a[13] =
                  a[14] =
                  a[15] =
                    0)),
              t)
            )
              for (n = this.start; o < i && n < 64; ++o)
                a[n >> 2] |= e[o] << SHIFT[n++ & 3];
            else
              for (n = this.start; o < i && n < 64; ++o)
                (r = e.charCodeAt(o)),
                  r < 128
                    ? (a[n >> 2] |= r << SHIFT[n++ & 3])
                    : r < 2048
                    ? ((a[n >> 2] |= (192 | (r >> 6)) << SHIFT[n++ & 3]),
                      (a[n >> 2] |= (128 | (r & 63)) << SHIFT[n++ & 3]))
                    : r < 55296 || r >= 57344
                    ? ((a[n >> 2] |= (224 | (r >> 12)) << SHIFT[n++ & 3]),
                      (a[n >> 2] |= (128 | ((r >> 6) & 63)) << SHIFT[n++ & 3]),
                      (a[n >> 2] |= (128 | (r & 63)) << SHIFT[n++ & 3]))
                    : ((r =
                        65536 +
                        (((r & 1023) << 10) | (e.charCodeAt(++o) & 1023))),
                      (a[n >> 2] |= (240 | (r >> 18)) << SHIFT[n++ & 3]),
                      (a[n >> 2] |= (128 | ((r >> 12) & 63)) << SHIFT[n++ & 3]),
                      (a[n >> 2] |= (128 | ((r >> 6) & 63)) << SHIFT[n++ & 3]),
                      (a[n >> 2] |= (128 | (r & 63)) << SHIFT[n++ & 3]));
            (this.lastByteIndex = n),
              (this.bytes += n - this.start),
              n >= 64
                ? ((this.block = a[16]),
                  (this.start = n - 64),
                  this.hash(),
                  (this.hashed = !0))
                : (this.start = n);
          }
          return (
            this.bytes > 4294967295 &&
              ((this.hBytes += (this.bytes / 4294967296) << 0),
              (this.bytes = this.bytes % 4294967296)),
            this
          );
        }
      }),
        (Sha1.prototype.finalize = function () {
          if (!this.finalized) {
            this.finalized = !0;
            var e = this.blocks,
              t = this.lastByteIndex;
            (e[16] = this.block),
              (e[t >> 2] |= EXTRA[t & 3]),
              (this.block = e[16]),
              t >= 56 &&
                (this.hashed || this.hash(),
                (e[0] = this.block),
                (e[16] =
                  e[1] =
                  e[2] =
                  e[3] =
                  e[4] =
                  e[5] =
                  e[6] =
                  e[7] =
                  e[8] =
                  e[9] =
                  e[10] =
                  e[11] =
                  e[12] =
                  e[13] =
                  e[14] =
                  e[15] =
                    0)),
              (e[14] = (this.hBytes << 3) | (this.bytes >>> 29)),
              (e[15] = this.bytes << 3),
              this.hash();
          }
        }),
        (Sha1.prototype.hash = function () {
          var e = this.h0,
            t = this.h1,
            r = this.h2,
            o = this.h3,
            n = this.h4,
            i,
            a,
            s,
            l = this.blocks;
          for (a = 16; a < 80; ++a)
            (s = l[a - 3] ^ l[a - 8] ^ l[a - 14] ^ l[a - 16]),
              (l[a] = (s << 1) | (s >>> 31));
          for (a = 0; a < 20; a += 5)
            (i = (t & r) | (~t & o)),
              (s = (e << 5) | (e >>> 27)),
              (n = (s + i + n + 1518500249 + l[a]) << 0),
              (t = (t << 30) | (t >>> 2)),
              (i = (e & t) | (~e & r)),
              (s = (n << 5) | (n >>> 27)),
              (o = (s + i + o + 1518500249 + l[a + 1]) << 0),
              (e = (e << 30) | (e >>> 2)),
              (i = (n & e) | (~n & t)),
              (s = (o << 5) | (o >>> 27)),
              (r = (s + i + r + 1518500249 + l[a + 2]) << 0),
              (n = (n << 30) | (n >>> 2)),
              (i = (o & n) | (~o & e)),
              (s = (r << 5) | (r >>> 27)),
              (t = (s + i + t + 1518500249 + l[a + 3]) << 0),
              (o = (o << 30) | (o >>> 2)),
              (i = (r & o) | (~r & n)),
              (s = (t << 5) | (t >>> 27)),
              (e = (s + i + e + 1518500249 + l[a + 4]) << 0),
              (r = (r << 30) | (r >>> 2));
          for (; a < 40; a += 5)
            (i = t ^ r ^ o),
              (s = (e << 5) | (e >>> 27)),
              (n = (s + i + n + 1859775393 + l[a]) << 0),
              (t = (t << 30) | (t >>> 2)),
              (i = e ^ t ^ r),
              (s = (n << 5) | (n >>> 27)),
              (o = (s + i + o + 1859775393 + l[a + 1]) << 0),
              (e = (e << 30) | (e >>> 2)),
              (i = n ^ e ^ t),
              (s = (o << 5) | (o >>> 27)),
              (r = (s + i + r + 1859775393 + l[a + 2]) << 0),
              (n = (n << 30) | (n >>> 2)),
              (i = o ^ n ^ e),
              (s = (r << 5) | (r >>> 27)),
              (t = (s + i + t + 1859775393 + l[a + 3]) << 0),
              (o = (o << 30) | (o >>> 2)),
              (i = r ^ o ^ n),
              (s = (t << 5) | (t >>> 27)),
              (e = (s + i + e + 1859775393 + l[a + 4]) << 0),
              (r = (r << 30) | (r >>> 2));
          for (; a < 60; a += 5)
            (i = (t & r) | (t & o) | (r & o)),
              (s = (e << 5) | (e >>> 27)),
              (n = (s + i + n - 1894007588 + l[a]) << 0),
              (t = (t << 30) | (t >>> 2)),
              (i = (e & t) | (e & r) | (t & r)),
              (s = (n << 5) | (n >>> 27)),
              (o = (s + i + o - 1894007588 + l[a + 1]) << 0),
              (e = (e << 30) | (e >>> 2)),
              (i = (n & e) | (n & t) | (e & t)),
              (s = (o << 5) | (o >>> 27)),
              (r = (s + i + r - 1894007588 + l[a + 2]) << 0),
              (n = (n << 30) | (n >>> 2)),
              (i = (o & n) | (o & e) | (n & e)),
              (s = (r << 5) | (r >>> 27)),
              (t = (s + i + t - 1894007588 + l[a + 3]) << 0),
              (o = (o << 30) | (o >>> 2)),
              (i = (r & o) | (r & n) | (o & n)),
              (s = (t << 5) | (t >>> 27)),
              (e = (s + i + e - 1894007588 + l[a + 4]) << 0),
              (r = (r << 30) | (r >>> 2));
          for (; a < 80; a += 5)
            (i = t ^ r ^ o),
              (s = (e << 5) | (e >>> 27)),
              (n = (s + i + n - 899497514 + l[a]) << 0),
              (t = (t << 30) | (t >>> 2)),
              (i = e ^ t ^ r),
              (s = (n << 5) | (n >>> 27)),
              (o = (s + i + o - 899497514 + l[a + 1]) << 0),
              (e = (e << 30) | (e >>> 2)),
              (i = n ^ e ^ t),
              (s = (o << 5) | (o >>> 27)),
              (r = (s + i + r - 899497514 + l[a + 2]) << 0),
              (n = (n << 30) | (n >>> 2)),
              (i = o ^ n ^ e),
              (s = (r << 5) | (r >>> 27)),
              (t = (s + i + t - 899497514 + l[a + 3]) << 0),
              (o = (o << 30) | (o >>> 2)),
              (i = r ^ o ^ n),
              (s = (t << 5) | (t >>> 27)),
              (e = (s + i + e - 899497514 + l[a + 4]) << 0),
              (r = (r << 30) | (r >>> 2));
          (this.h0 = (this.h0 + e) << 0),
            (this.h1 = (this.h1 + t) << 0),
            (this.h2 = (this.h2 + r) << 0),
            (this.h3 = (this.h3 + o) << 0),
            (this.h4 = (this.h4 + n) << 0);
        }),
        (Sha1.prototype.hex = function () {
          this.finalize();
          var e = this.h0,
            t = this.h1,
            r = this.h2,
            o = this.h3,
            n = this.h4;
          return (
            HEX_CHARS[(e >> 28) & 15] +
            HEX_CHARS[(e >> 24) & 15] +
            HEX_CHARS[(e >> 20) & 15] +
            HEX_CHARS[(e >> 16) & 15] +
            HEX_CHARS[(e >> 12) & 15] +
            HEX_CHARS[(e >> 8) & 15] +
            HEX_CHARS[(e >> 4) & 15] +
            HEX_CHARS[e & 15] +
            HEX_CHARS[(t >> 28) & 15] +
            HEX_CHARS[(t >> 24) & 15] +
            HEX_CHARS[(t >> 20) & 15] +
            HEX_CHARS[(t >> 16) & 15] +
            HEX_CHARS[(t >> 12) & 15] +
            HEX_CHARS[(t >> 8) & 15] +
            HEX_CHARS[(t >> 4) & 15] +
            HEX_CHARS[t & 15] +
            HEX_CHARS[(r >> 28) & 15] +
            HEX_CHARS[(r >> 24) & 15] +
            HEX_CHARS[(r >> 20) & 15] +
            HEX_CHARS[(r >> 16) & 15] +
            HEX_CHARS[(r >> 12) & 15] +
            HEX_CHARS[(r >> 8) & 15] +
            HEX_CHARS[(r >> 4) & 15] +
            HEX_CHARS[r & 15] +
            HEX_CHARS[(o >> 28) & 15] +
            HEX_CHARS[(o >> 24) & 15] +
            HEX_CHARS[(o >> 20) & 15] +
            HEX_CHARS[(o >> 16) & 15] +
            HEX_CHARS[(o >> 12) & 15] +
            HEX_CHARS[(o >> 8) & 15] +
            HEX_CHARS[(o >> 4) & 15] +
            HEX_CHARS[o & 15] +
            HEX_CHARS[(n >> 28) & 15] +
            HEX_CHARS[(n >> 24) & 15] +
            HEX_CHARS[(n >> 20) & 15] +
            HEX_CHARS[(n >> 16) & 15] +
            HEX_CHARS[(n >> 12) & 15] +
            HEX_CHARS[(n >> 8) & 15] +
            HEX_CHARS[(n >> 4) & 15] +
            HEX_CHARS[n & 15]
          );
        }),
        (Sha1.prototype.toString = Sha1.prototype.hex),
        (Sha1.prototype.digest = function () {
          this.finalize();
          var e = this.h0,
            t = this.h1,
            r = this.h2,
            o = this.h3,
            n = this.h4;
          return [
            (e >> 24) & 255,
            (e >> 16) & 255,
            (e >> 8) & 255,
            e & 255,
            (t >> 24) & 255,
            (t >> 16) & 255,
            (t >> 8) & 255,
            t & 255,
            (r >> 24) & 255,
            (r >> 16) & 255,
            (r >> 8) & 255,
            r & 255,
            (o >> 24) & 255,
            (o >> 16) & 255,
            (o >> 8) & 255,
            o & 255,
            (n >> 24) & 255,
            (n >> 16) & 255,
            (n >> 8) & 255,
            n & 255,
          ];
        }),
        (Sha1.prototype.array = Sha1.prototype.digest),
        (Sha1.prototype.arrayBuffer = function () {
          this.finalize();
          var e = new ArrayBuffer(20),
            t = new DataView(e);
          return (
            t.setUint32(0, this.h0),
            t.setUint32(4, this.h1),
            t.setUint32(8, this.h2),
            t.setUint32(12, this.h3),
            t.setUint32(16, this.h4),
            e
          );
        });
      var exports = createMethod();
      COMMON_JS
        ? (module.exports = exports)
        : ((root.sha1 = exports),
          AMD &&
            define(function () {
              return exports;
            }));
    })();
  });
function _(e, t) {
  return Math.round(e * t) / t;
}
function W(e, t, r, o) {
  let n = (e + (o || "")).toString().includes("%");
  if (
    (typeof e == "string"
      ? ([e, t, r, o] = e.match(/(0?\.?\d+)%?\b/g).map((i) => Number(i)))
      : o !== void 0 && (o = Number.parseFloat(o)),
    typeof e != "number" ||
      typeof t != "number" ||
      typeof r != "number" ||
      e > 255 ||
      t > 255 ||
      r > 255)
  )
    throw new TypeError("Expected three numbers below 256");
  if (typeof o == "number") {
    if (!n && o >= 0 && o <= 1) o = Math.round(255 * o);
    else if (n && o >= 0 && o <= 100) o = Math.round((255 * o) / 100);
    else
      throw new TypeError(
        `Expected alpha value (${o}) as a fraction or percentage`
      );
    o = (o | 256).toString(16).slice(1);
  } else o = "";
  return (r | (t << 8) | (e << 16) | (1 << 24)).toString(16).slice(1) + o;
}
function L(e) {
  return e.filter(Z);
}
function Z(e) {
  return e != null;
}
function k(e) {
  console.warn(e);
}
var et = Object.assign(Object.create(null), {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  a: 10,
  A: 10,
  b: 11,
  B: 11,
  c: 12,
  C: 12,
  d: 13,
  D: 13,
  e: 14,
  E: 14,
  f: 15,
  F: 15,
});
function B(e) {
  return typeof e == "object" && e.type === "VARIABLE_ALIAS";
}
function Re(e) {
  if ("a" in e) {
    let r = _(e.a, 100);
    if (r !== 1) return `rgba(${e.r},${e.g},${e.b},${r})`;
  }
  let t = W(e.r, e.g, e.b);
  return t[0] === t[1] && t[2] === t[3] && t[4] === t[5]
    ? `#${t[0]}${t[2]}${t[4]}`
    : `#${t}`;
}
function we(e) {
  let { r: t, g: r, b: o, a: n = 1 } = e;
  return { r: _(t * 255, 1), g: _(r * 255, 1), b: _(o * 255, 1), a: n };
}
function V(e) {
  return `${_(e, 10)}px`;
}
function ee(e) {
  return `${_(e, 10)}%`;
}
function te(e) {
  switch (typeof e) {
    case "object":
      if (B(e)) return `var(${e.id})`;
      if ("r" in e) return Re(we(e));
    case "string":
    case "number":
    case "boolean":
    default:
      return String(e);
  }
}
function P(e) {
  return "T" + e;
}
function G(e, t, r) {
  let o = Object.entries(t);
  if (!o.length) return "";
  let n = [
    e + " {",
    ...o
      .filter(([, i]) => i !== void 0 && i !== "")
      .map(([i, a]) => `  ${i}: ${a};`),
    "}",
  ];
  return (
    r && (n = n.map((i) => r + i)),
    n.join(`
`)
  );
}
var Ce = { padding: "0", margin: "0" },
  Fe = {
    a: { color: "inherit", "text-decoration": "inherit" },
    input: {
      border: "none",
      font: "inherit",
      outline: "none",
      "background-color": "inherit",
    },
    button: {
      "border-style": "none",
      width: "auto",
      overflow: "visible",
      background: "transparent",
      font: "inherit",
      "background-color": "inherit",
      "line-height": "normal",
      color: "inherit",
    },
    textarea: { font: "inherit", "background-color": "inherit" },
    select: { font: "inherit", "background-color": "inherit" },
    img: { display: "block" },
    picture: { display: "block" },
    video: { display: "block" },
    canvas: { display: "block" },
    svg: { display: "block" },
  },
  Ct =
    G("*", Ce) +
    Object.entries(Fe).map(([e, t]) => G(e, t)).join(`
`),
  _e = ve(ne()),
  re = [
    "mousedown",
    "mouseenter",
    "mouseleave",
    "mouseup",
    "timeout",
    "click",
    "press",
    "drag",
    "keydown",
    "hover",
  ];
function oe(e, t, r) {
  if (r.direction === "LEFT") {
    if (t === "BOTTOM_LEFT" || t === "TOP_LEFT")
      return [{ eltId: e, props: [{ key: "left", from: "100%", to: "0%" }] }];
    if (t === "BOTTOM_RIGHT" || t === "TOP_RIGHT")
      return [
        {
          eltId: e,
          props: [{ key: "translate", from: "100% 0px", to: "0px 0px" }],
        },
      ];
    {
      let o = t === "CENTER" ? "-50%" : "0px";
      return [
        {
          eltId: e,
          props: [
            { key: "left", from: "100%", to: "50%" },
            { key: "translate", from: `0px ${o}`, to: `-50% ${o}` },
          ],
        },
      ];
    }
  } else if (r.direction === "RIGHT") {
    if (t === "BOTTOM_LEFT" || t === "TOP_LEFT")
      return [
        {
          eltId: e,
          props: [{ key: "translate", from: "-100% 0px", to: "0px 0px" }],
        },
      ];
    if (t === "BOTTOM_RIGHT" || t === "TOP_RIGHT")
      return [{ eltId: e, props: [{ key: "right", from: "100%", to: "0px" }] }];
    {
      let o = t === "CENTER" ? "-50%" : "0px";
      return [
        {
          eltId: e,
          props: [
            { key: "left", from: "0px", to: "50%" },
            { key: "translate", from: `-100% ${o}`, to: `-50% ${o}` },
          ],
        },
      ];
    }
  } else if (r.direction === "TOP")
    if (t === "BOTTOM_LEFT" || t === "BOTTOM_RIGHT" || t === "BOTTOM_CENTER") {
      let o = t === "BOTTOM_CENTER" ? "-50%" : "0px";
      return [
        {
          eltId: e,
          props: [{ key: "translate", from: `${o} 100%`, to: `${o} 0px` }],
        },
      ];
    } else
      return t === "TOP_LEFT" || t === "TOP_RIGHT" || t === "TOP_CENTER"
        ? [{ eltId: e, props: [{ key: "top", from: "100%", to: "0px" }] }]
        : [
            {
              eltId: e,
              props: [
                { key: "top", from: "100%", to: "50%" },
                { key: "translate", from: "-50% 0%", to: "-50% -50%" },
              ],
            },
          ];
  else if (r.direction === "BOTTOM") {
    if (t === "BOTTOM_LEFT" || t === "BOTTOM_RIGHT" || t === "BOTTOM_CENTER")
      return [
        { eltId: e, props: [{ key: "bottom", from: "100%", to: "0px" }] },
      ];
    if (t === "TOP_LEFT" || t === "TOP_RIGHT" || t === "TOP_CENTER") {
      let o = t === "TOP_CENTER" ? "-50%" : "0px";
      return [
        {
          eltId: e,
          props: [{ key: "translate", from: `${o} -100%`, to: `${o} 0px` }],
        },
      ];
    } else
      return [
        {
          eltId: e,
          props: [
            { key: "top", from: "0px", to: "50%" },
            { key: "translate", from: "-50% -100%", to: "-50% -50%" },
          ],
        },
      ];
  } else console.warn("Unsupported transition:", r);
  return [];
}
function $(e) {
  if (e)
    return (...t) => {
      if (!e) return;
      let r = e;
      return (e = void 0), r(...t);
    };
}
function U() {
  let e = navigator.userAgent;
  return e.includes("Safari") && !e.includes("Chrome");
}
var Ie = (e) => e instanceof HTMLElement || e instanceof SVGElement;
function Oe(e, t) {
  if (!e.parentElement) return;
  let r = new MutationObserver((o) => {
    for (let n of o.filter((i) => i.type === "childList"))
      for (let i of n.removedNodes) i === e && (t?.(), r.disconnect());
  });
  r.observe(e.parentElement, { childList: !0 });
}
function D(e, t) {
  let r = new MutationObserver((o) => {
    for (let n of o.filter((i) => i.type === "childList"))
      for (let i of n.addedNodes) Ie(i) && i.matches(e) && Oe(i, t(i));
  });
  return (
    r.observe(document, { childList: !0, subtree: !0 }), () => r.disconnect()
  );
}
var Me = !U(),
  He = !U();
if ("mediumZoom" in window) {
  let e = mediumZoom("[data-zoomable]");
  e.on("open", (t) => {
    let r = getComputedStyle(t.target).objectFit,
      o = t.detail.zoom.getZoomedImage();
    r && o && (o.style.objectFit = r);
  }),
    e.on("closed", (t) => {
      let r = t.detail.zoom.getZoomedImage();
      r.style.objectFit = "";
    });
}
var pe = () => window.F2W_REACTIONS,
  X = () => window.F2W_VARIABLES,
  ke = () => window.F2W_COLLECTION_MODE_BPS,
  Pe = (e, t) => window.F2W_COLLECTION_VARS?.[e]?.[t];
function fe(e, t) {
  X()[e] = t;
  let r = te(t);
  document.body.style.setProperty(e, r);
  let o = `data${e.slice(1)}`;
  document.body.hasAttribute(o) && document.body.setAttribute(o, r),
    document.dispatchEvent(
      new CustomEvent("f2w-set-variable", {
        detail: { id: e, value: t, str: r },
      })
    );
}
function Y(e, t) {
  document.body.setAttribute(`data-${e}`, t);
  let r = Pe(e, t) ?? {};
  for (let [o, n] of Object.entries(r)) fe(o, n);
}
function De(e, t) {
  Y(e, t),
    window.F2W_COLOR_SCHEMES?.includes(e) && localStorage?.setItem(he, t);
}
function h(e) {
  return typeof e == "number"
    ? e
    : typeof e == "boolean"
    ? e
      ? 1
      : 0
    : typeof e == "string"
    ? parseFloat(e)
    : 0;
}
function I(e) {
  return String(e);
}
function R(e) {
  return typeof e == "string" ? e === "true" : !!e;
}
function H(e, t) {
  if (e === void 0) return !1;
  if (B(e)) return H(X()[e.id]);
  if (typeof e == "object" && "expressionArguments" in e) {
    let r = e.expressionArguments
        .map((n) => n.value)
        .filter((n) => n !== void 0)
        .map((n) => H(n, t)),
      o = e.expressionArguments[0]?.resolvedType ?? "STRING";
    switch (e.expressionFunction) {
      case "ADDITION":
        return o === "FLOAT"
          ? r.map(h).reduce((n, i) => n + i)
          : r.map(I).reduce((n, i) => n + i);
      case "SUBTRACTION":
        if (r.length !== 2) throw new Error("Invalid expression");
        return h(r[0]) - h(r[1]);
      case "DIVISION":
        if (r.length !== 2) throw new Error("Invalid expression");
        return h(r[0]) / h(r[1]);
      case "MULTIPLICATION":
        return r.map(h).reduce((n, i) => n * i);
      case "NEGATE":
        if (r.length !== 1) throw new Error("Invalid expression");
        return -h(r[0]);
      case "GREATER_THAN":
        if (r.length !== 2) throw new Error("Invalid expression");
        return h(r[0]) > h(r[1]);
      case "GREATER_THAN_OR_EQUAL":
        if (r.length !== 2) throw new Error("Invalid expression");
        return h(r[0]) >= h(r[1]);
      case "LESS_THAN":
        if (r.length !== 2) throw new Error("Invalid expression");
        return h(r[0]) < h(r[1]);
      case "LESS_THAN_OR_EQUAL":
        if (r.length !== 2) throw new Error("Invalid expression");
        return h(r[0]) <= h(r[1]);
      case "EQUALS":
        if (r.length !== 2) throw new Error("Invalid expression");
        return o === "FLOAT"
          ? h(r[0]) === h(r[1])
          : o === "BOOLEAN"
          ? R(r[0]) === R(r[1])
          : I(r[0]) === I(r[1]);
      case "NOT_EQUAL":
        if (r.length !== 2) throw new Error("Invalid expression");
        return o === "FLOAT"
          ? h(r[0]) !== h(r[1])
          : o === "BOOLEAN"
          ? R(r[0]) !== R(r[1])
          : I(r[0]) !== I(r[1]);
      case "AND":
        if (r.length !== 2) throw new Error("Invalid expression");
        return R(r[0]) && R(r[1]);
      case "OR":
        if (r.length !== 2) throw new Error("Invalid expression");
        return R(r[0]) || R(r[1]);
      case "NOT":
        if (r.length !== 1) throw new Error("Invalid expression");
        return !R(r[0]);
      case "VAR_MODE_LOOKUP":
      default:
        return (
          console.warn(
            `Expression not implemented yet: ${e.expressionFunction}`
          ),
          !1
        );
    }
  } else return e;
}
function j(e, t, r) {
  let o = e.map((n) => Le(n, t, r));
  return (n, i) => {
    let a = o.map((s) => s(n, i)).filter((s) => !!s);
    if (a.length) return (s, l) => a.forEach((f) => f(s, l));
  };
}
function Le(e, t, r) {
  for (; e.type === "ALIAS"; ) e = pe()[e.alias];
  let o = Be(e, t, r);
  return (n) => {
    if (e.type !== "ANIMATE" && r === "drag") {
      let i = n.detail;
      if (!i.handled) return (i.handled = !0), o(n);
    }
    if (!C) {
      if (e.type === "ANIMATE" && e.rootId) {
        let i = document.getElementById(e.rootId);
        if (i?.parentElement) {
          let a = $(o(n));
          if (a) {
            let s = i?.parentElement;
            for (
              ;
              s &&
              ((s.f2w_reset || (s.f2w_reset = [])).push(a),
              (s = s.parentElement),
              s?.tagName !== "BODY");

            );
          }
          return a;
        }
      }
      return o(n);
    }
  };
}
function Be(action, bound, trigger) {
  switch (action.type) {
    case "BACK":
      return () => (window.F2W_PREVIEW_BACK ?? history.back)();
    case "JS":
      return () => eval(action.code);
    case "URL":
      return () => {
        action.newTab
          ? window.open(action.url, "_blank")
          : window.F2W_PREVIEW_NAVIGATE
          ? window.F2W_PREVIEW_NAVIGATE(action.url)
          : location.assign(action.url);
      };
    case "SET_VARIABLE":
      let { variableId, variableValue } = action;
      if (variableId && variableValue?.value !== void 0)
        return () => fe(variableId, H(variableValue.value, variableId));
      break;
    case "SET_VARIABLE_MODE":
      let { variableCollectionName, variableModeName } = action;
      if (variableCollectionName && variableModeName)
        return () => De(variableCollectionName, variableModeName);
      break;
    case "CONDITIONAL":
      let blocks = action.conditionalBlocks.map((e) => {
        let t = j(e.actions, bound, trigger),
          { condition: r } = e;
        return { test: r ? () => R(H(r.value)) : () => !0, run: t };
      });
      return () => {
        let e = [];
        for (let t of blocks)
          if (t.test()) {
            let r = t.run();
            r && e.push(r);
            break;
          }
        if (e.length) return (t) => e.forEach((r) => r(t));
      };
    case "KEY_CONDITION":
      let run = j(action.actions, bound, trigger),
        keyCode = action.keyCodes[0],
        shiftKey = action.keyCodes.slice(1).includes(16),
        ctrlKey = action.keyCodes.slice(1).includes(17),
        altKey = action.keyCodes.slice(1).includes(18),
        metaKey = action.keyCodes.slice(1).includes(91);
      return (e) => {
        if (e instanceof KeyboardEvent) {
          if (
            e.keyCode !== keyCode ||
            e.ctrlKey !== ctrlKey ||
            e.altKey !== altKey ||
            e.metaKey !== metaKey ||
            e.shiftKey !== shiftKey
          )
            return;
          e.preventDefault(), e.stopPropagation(), run(e);
        }
      };
    case "CLOSE_OVERLAY": {
      if (action.self) return (e) => e?.target?.f2w_close?.();
      if (action.overlayId) {
        let e = document.getElementById(action.overlayId);
        if (!e) break;
        return () => e.f2w_close?.();
      }
      break;
    }
    case "SCROLL_TO":
      if (!action.destinationId) break;
      let elt = document.getElementById(action.destinationId);
      if (!elt) break;
      return (e) => {
        e?.currentTarget instanceof HTMLAnchorElement && e?.preventDefault(),
          elt.scrollIntoView({
            behavior: action.transition?.type ? "smooth" : "instant",
          });
      };
    case "OVERLAY":
      if (!action.destinationId) break;
      let overlay = document.getElementById(action.destinationId);
      if (!overlay) break;
      let modal = Array(...overlay.children).find(
        (e) => e.tagName !== "TEMPLATE"
      );
      if (!modal) break;
      let { transition, overlayPositionType, overlayRelativePosition } = action,
        duration = Math.round(1e3 * (transition?.duration ?? 0)),
        animations = [
          {
            eltId: action.destinationId,
            props: [
              { key: "visibility", from: "hidden", to: "visible" },
              { key: "opacity", from: "0", to: "1" },
            ],
          },
        ];
      return overlayPositionType === "MANUAL"
        ? () => {
            if (trigger === "hover") {
              let o = bound.f2w_mouseleave_remove?.();
              if (o) {
                let n = (i) => {
                  ae(i, bound) &&
                    ae(i, modal) &&
                    (o(), document.removeEventListener("mousemove", n));
                };
                document.addEventListener("mousemove", n);
              }
            }
            let e = animations.slice(0),
              t = V(
                bound.getBoundingClientRect().left +
                  (overlayRelativePosition?.x ?? 0)
              ),
              r = V(
                bound.getBoundingClientRect().top +
                  (overlayRelativePosition?.y ?? 0)
              );
            return (
              modal.style.setProperty("left", t),
              modal.style.setProperty("top", r),
              transition?.type === "MOVE_IN" &&
                (transition.direction === "LEFT"
                  ? e.push({
                      eltId: modal.id,
                      props: [{ key: "left", from: "100%", to: t }],
                    })
                  : transition.direction === "RIGHT"
                  ? e.push({
                      eltId: modal.id,
                      props: [
                        { key: "left", from: "0px", to: t },
                        { key: "translate", from: "-100% 0px", to: "0px 0px" },
                      ],
                    })
                  : transition.direction === "TOP"
                  ? e.push({
                      eltId: modal.id,
                      props: [{ key: "top", from: "100%", to: r }],
                    })
                  : transition.direction === "BOTTOM" &&
                    e.push({
                      eltId: modal.id,
                      props: [
                        { key: "top", from: "0px", to: r },
                        { key: "translate", from: "0px -100%", to: "0px 0px" },
                      ],
                    })),
              K(
                e,
                transition?.easing,
                duration,
                bound,
                trigger,
                `${trigger}(manual_overlay)`,
                overlay
              )()
            );
          }
        : (transition?.type === "MOVE_IN"
            ? animations.push(...oe(modal.id, overlayPositionType, transition))
            : transition?.type &&
              console.warn("Unsupported transition:", transition),
          K(
            animations,
            transition?.easing,
            duration,
            bound,
            trigger,
            `${trigger}(overlay)`,
            overlay
          ));
    case "ANIMATE": {
      let { animations: e, transition: t, rootId: r, reset: o } = action,
        n = Math.round(1e3 * (t?.duration ?? 0)),
        i = K(
          e,
          t?.easing,
          n,
          bound,
          trigger,
          o ? `${trigger}(+reset)` : trigger
        );
      return o && r
        ? (a, s) => {
            let l = document.getElementById(r);
            if (l) {
              let { f2w_reset: f } = l;
              f?.length &&
                (delete l.f2w_reset, f.reverse().forEach((b) => b(void 0, !0)));
            }
            return i(a, s);
          }
        : i;
    }
    default:
      return () => console.warn("Action not implemented yet: " + action.type);
  }
  return () => {};
}
var ie = 9999;
function K(e, t = "linear", r, o, n, i, a) {
  return (s) => {
    a &&
      ((document.body.parentElement.style.overflow = "hidden"),
      e.unshift({
        eltId: a.id,
        props: [{ key: "z-index", from: 0, to: ie++ }],
      }));
    let l = M(e, t, r, o, n, i, s),
      f = $((b, v) => {
        a && (ie--, (document.body.parentElement.style.overflow = "")),
          M(l, t, v ? 0 : r, o, n, `${i}(revert)`);
      });
    return a && (a.f2w_close = f), f;
  };
}
function M(e, t, r, o, n, i, a) {
  let s = [],
    l = new Set();
  if (n === "drag") return Ve(e, t, r, o, a.detail), [];
  for (let { eltId: f, altId: b, props: v, reactions: g } of e) {
    let d = document.getElementById(f);
    if (!d) {
      k(`Can't find element for id: ${f}`);
      continue;
    }
    if (b) {
      let y = document.getElementById(P(b));
      if (!y) {
        k(`Can't find template for id: ${P(b)}`);
        continue;
      }
      let w = y.content.cloneNode(!0),
        p = w.querySelector("*"),
        m = document.getElementById(P(f));
      m ||
        ((m = document.createElement("template")),
        (m.id = P(f)),
        (m.innerHTML = d.outerHTML),
        d.insertAdjacentElement("afterend", m)),
        me(w, r);
      let { f2w_mouseup: u, f2w_mouseleave: A } = d;
      u && p.addEventListener("mouseup", u),
        A && p.addEventListener("mouseleave", A),
        (A || u) && p.classList.remove("pointer-events-none"),
        d.parentElement.replaceChild(p, d),
        s.push({ eltId: b, altId: f });
    } else {
      let y = +getComputedStyle(d).getPropertyValue("--f2w-order"),
        w = !1,
        p = (v || [])
          .map((c) => {
            let O = c.key.replace(/-([a-z])/gi, (N, Q) => Q.toUpperCase()),
              x = se(d, c.key, c.from),
              E = se(d, c.key, c.to),
              T = x !== E;
            if (!c.pseudo)
              switch (c.key) {
                case "display":
                  (d.style.display = String(E)), (T = Me);
                  break;
                case "overflow":
                  He || ((d.style.overflow = String(E)), (T = !1));
                  break;
                case "--f2w-order":
                  (y = E === void 0 ? NaN : +E),
                    isNaN(y) || d.style.setProperty("--f2w-order", String(y)),
                    (T = !1);
                  break;
                case "--f2w-img-src":
                  if (x !== E) {
                    let N = d.f2w_image_lazy_loader;
                    N ||
                      ((d.f2w_image_lazy_loader = N = new Image()),
                      (N.decoding = "sync"),
                      (N.onload = () => {
                        (d.decoding = "sync"),
                          d.setAttribute("src", E),
                          delete d.f2w_image_lazy_loader;
                      })),
                      (N.src = E);
                  }
                  T = !1;
                  break;
                case "$innerHTML":
                  x !== E && (d.innerHTML = String(E)), (T = !1);
                case "background-image":
                  w = x !== E;
                  break;
              }
            return {
              key: c.key,
              pseudo: c.pseudo,
              camelKey: O,
              from: x,
              to: E,
              animate: T,
            };
          })
          .filter((c) => c.from !== c.to),
        m = p.filter((c) => !c.pseudo),
        u = p.filter((c) => c.pseudo === "::before"),
        A = p.filter((c) => c.pseudo === "::after");
      w &&
        m
          .filter((c) => c.key.startsWith("background-"))
          .forEach((c) => {
            d.style.setProperty(c.key, String(c.to)), (c.animate = !1);
          }),
        isNaN(y) || l.add(d.parentElement);
      let S = (c, O) => {
        let x = c.filter((T) => T.animate);
        if (!x.length) return;
        let E = Object.fromEntries(x.map((T) => [T.camelKey, [T.from, T.to]]));
        O &&
          E.display &&
          (E.display[1] === "none"
            ? (d.classList.remove(O.slice(2) + "-visible"),
              d.classList.add(O.slice(2) + "-hidden"))
            : (d.classList.remove(O.slice(2) + "-hidden"),
              d.classList.add(O.slice(2) + "-visible"))),
          d.animate(
            { easing: t, ...E },
            { pseudoElement: O, iterations: 1, duration: r, fill: "both" }
          );
      };
      S(m),
        S(u, "::before"),
        S(A, "::after"),
        g &&
          (n !== "hover" && d.f2w_mouseleave_remove?.(),
          g.forEach((c) => ge(d, c.type, c.to, r))),
        s.push({
          eltId: f,
          props: p.map((c) => ({ key: c.key, from: c.to, to: c.from })),
          reactions: g?.map((c) => ({ type: c.type, from: c.to, to: c.from })),
        });
    }
  }
  for (let f of l) {
    let b = Array.from(f.children).map((g, d) => ({ it: g, i: d })),
      v = !1;
    b.sort((g, d) => {
      let y = +(
          getComputedStyle(g.it).getPropertyValue("--f2w-order") || "99999"
        ),
        w = +(
          getComputedStyle(d.it).getPropertyValue("--f2w-order") || "99999"
        );
      return y - w;
    }).forEach((g, d) => {
      v ? f.appendChild(g.it) : (v = d !== g.i);
    });
  }
  return s;
}
function Ve(e, t, r, o, n) {
  if (n.handled) return;
  let i = o.getBoundingClientRect(),
    a = M(
      e
        .filter((d) => d.props)
        .map(({ eltId: d, props: y }) => ({ eltId: d, props: y })),
      "linear",
      0,
      o,
      "click",
      "drag_start(tmp)"
    ),
    s = o.getBoundingClientRect(),
    l = s.left - i.left,
    f = s.top - i.top,
    b = Math.sqrt(l * l + f * f);
  M(a, "linear", 0, o, "click", "drag_start(tmp undo)");
  let { x: v, y: g } = J(n.start, n.end);
  if (
    (v > 0 && l > 0) ||
    (v < 0 && l < 0) ||
    (l === 0 && ((g > 0 && f > 0) || (g < 0 && f < 0)))
  ) {
    n.handled = !0;
    let d = e.map((p) => ({
        ...p,
        swapped: !1,
        props: p.props?.map((m) => ({ ...m, curr: m.from })),
      })),
      y = (p) => {
        let { x: m, y: u } = J(p.start, p.end),
          A = (m * l + u * f) / b;
        return Math.max(0, Math.min(100, (100 * A) / b));
      },
      w = (p) => {
        p.end.preventDefault(), p.end.stopPropagation();
        let m = y(p);
        M(
          L(
            d.map((u) => {
              let { reactions: A, ...S } = u;
              if (u.props)
                return {
                  ...S,
                  props: u.props.map((c) => {
                    let O = We(c, m),
                      x = c.curr;
                    return (c.curr = O), { ...c, from: x, to: O };
                  }),
                };
              if (u.altId) {
                if (m < 50 && u.swapped)
                  return (u.swapped = !1), { altId: u.eltId, eltId: u.altId };
                if (m >= 50 && !u.swapped) return (u.swapped = !0), S;
              }
            })
          ),
          "linear",
          0,
          o,
          "click",
          "dragging"
        );
      };
    w(n),
      (o.f2w_drag_listener = (p) => {
        if ((w(p), p.finished)) {
          let m = y(p);
          M(
            L(
              d.map((u) => {
                if (u.props) {
                  let A = m < 50 ? void 0 : u.reactions;
                  return {
                    eltId: u.eltId,
                    props: u.props.map((S) => ({
                      ...S,
                      from: S.curr,
                      to: m < 50 ? S.from : S.to,
                    })),
                    reactions: A,
                  };
                }
                if (u.altId) {
                  if (m < 50 && u.swapped)
                    return (u.swapped = !1), { altId: u.eltId, eltId: u.altId };
                  if (m >= 50 && !u.swapped) return (u.swapped = !0), u;
                }
              })
            ),
            t,
            r,
            o,
            "click",
            "drag_end"
          );
        }
      });
  }
}
function se(e, t, r) {
  return r !== "$current" ? r : getComputedStyle(e).getPropertyValue(t);
}
function me(e, t = 0) {
  for (let r of re)
    for (let o of e.querySelectorAll(`[data-reaction-${r}]`))
      ge(o, r, o.getAttribute(`data-reaction-${r}`), t);
}
function ge(e, t, r = "", o = 0) {
  let n = 0;
  if (r[0] === "T") {
    let l = r.indexOf("ms");
    (n = parseFloat(r.slice(1, l)) || 0), (r = r.slice(l + 3));
  }
  let i = pe(),
    a = L(r.split(",").map((l) => i[l])),
    s = j(a, e, t);
  if (t === "timeout") ze(e, () => s(), n + o);
  else if (t === "press") {
    let l,
      f = () => {
        l?.(), (l = void 0);
      };
    (e.f2w_mouseup = f),
      z(
        e,
        "mousedown",
        (b) => {
          l?.(), (l = s(b));
        },
        t,
        F(e, "mouseup", f)
      );
  } else if (t === "drag")
    z(
      e,
      "dragging",
      (l) => {
        s(l);
      },
      t
    );
  else if (t === "hover") {
    let l,
      f = (w) => {
        l || (l = $(s(w)));
      },
      b = e.f2w_mouseleave_remove?.(),
      v = () => {
        l?.(), (l = void 0), b?.();
      },
      g = setTimeout(() => {
        e.matches(":hover") && f();
      }, o),
      d = F(e, "mouseleave", v),
      y = () => (
        d(),
        clearTimeout(g),
        delete e.f2w_mouseleave,
        delete e.f2w_mouseleave_remove,
        v
      );
    z(e, "mouseenter", f, t, y),
      (e.f2w_mouseleave = v),
      (e.f2w_mouseleave_remove = y);
  } else
    t === "keydown" &&
      !e.getAttribute("tabindex") &&
      e.setAttribute("tabindex", "-1"),
      z(
        e,
        t,
        (l) => {
          t !== "keydown" && l.stopPropagation(),
            n ? setTimeout(() => s(l), n) : s(l);
        },
        t
      );
}
function ae({ clientX: e, clientY: t }, r) {
  let { top: o, left: n, right: i, bottom: a } = r.getBoundingClientRect();
  return e > i + 2 || e < n - 2 || t > a + 2 || t < o - 2;
}
function $e(e) {
  return `f2w_cleanup_${e}`;
}
function ze(e, t, r) {
  let o = setTimeout(t, r);
  e.f2w_cleanup_timeout?.(),
    (e.f2w_cleanup_timeout = () => {
      delete e.f2w_cleanup_timeout, clearTimeout(o);
    });
}
function z(e, t, r, o, ...n) {
  let i = [...n, F(e, t, r)],
    a = $e(o);
  e[a]?.(),
    (e[a] = () => {
      delete e[a], i.forEach((s) => s());
    });
}
function F(e, t, r, o) {
  let n = (i) => {
    !e.isConnected || r(i);
  };
  return (
    e.addEventListener(t, n, o),
    () => {
      e.removeEventListener(t, n, o);
    }
  );
}
var he = "f2w-color-scheme";
if (
  ((window.F2W_THEME_SWITCH = (e) =>
    window.F2W_COLOR_SCHEMES?.forEach((t) => Y(t, e))),
  window.F2W_COLOR_SCHEMES)
) {
  let e = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light",
    t = localStorage?.getItem(he);
  D("body", () => {
    let r = document.body.getAttribute("data-preview-theme") ?? t ?? e;
    window.F2W_THEME_SWITCH?.(r);
  });
}
var ce = {},
  Xe = Object.fromEntries(
    Object.entries(ke()).map(([e, t]) => [
      e,
      Object.entries(t).map(([r, { minWidth: o }]) => ({
        name: r,
        minWidth: o,
      })),
    ])
  );
function de() {
  let e = window.visualViewport?.width || window.innerWidth;
  for (let [t, r] of Object.entries(Xe)) {
    let o = [...r],
      n = o.splice(0, 1)[0].name;
    for (let { name: i, minWidth: a } of o) e >= a && (n = i);
    n !== ce[t] && (Y(t, n), (ce[t] = n));
  }
}
var C = !1;
D("body", () => {
  let e,
    t = !1;
  F(document, "mousedown", (r) => {
    (e = r), (C = !1);
  }),
    F(document, "mousemove", (r) => {
      if (e && J(e, r).dist > 2) {
        let o = { start: e, end: r };
        C
          ? e.target?.f2w_drag_listener?.(o)
          : (e.target?.dispatchEvent(
              new CustomEvent("dragging", { detail: o })
            ),
            (C = !0),
            (t = !0));
      }
    }),
    F(document, "mouseup", (r) => {
      e &&
        C &&
        e.target?.f2w_drag_listener?.({ start: e, end: r, finished: !0 }),
        (e = void 0),
        (C = !1);
    }),
    F(document, "mouseup", (r) => {
      e &&
        C &&
        e.target?.f2w_drag_listener?.({ start: e, end: r, finished: !0 }),
        (e = void 0),
        (C = !1);
    }),
    F(
      document,
      "click",
      (r) => {
        t && ((t = !1), r.preventDefault(), r.stopPropagation());
      },
      { capture: !0 }
    ),
    de(),
    window.addEventListener("resize", de);
}),
  addEventListener("DOMContentLoaded", () => me(document));
function le(e) {
  return e.endsWith("px") || e.endsWith("%") || e.startsWith("calc");
}
function ue(e) {
  return e.startsWith("calc") ? e.slice(4) : e;
}
function We({ from: e, to: t }, r) {
  if (e === t) return t;
  if (typeof e == "number" && typeof t == "number")
    return e + (t - e) * (r / 100);
  if (typeof e == "string" && typeof t == "string") {
    if (e === "none" || t === "none" || e === "auto" || t === "auto")
      return r < 50 ? e : t;
    if (e.endsWith("px") && t.endsWith("px")) {
      let o = parseFloat(e),
        n = parseFloat(t);
      return V(o + (n - o) * (r / 100));
    }
    if (e.endsWith("%") && t.endsWith("%")) {
      let o = parseFloat(e),
        n = parseFloat(t);
      return ee(o + (n - o) * (r / 100));
    }
    if (le(e) && le(t)) {
      let o = ue(e),
        n = ue(t);
      return `calc(${o} + (${n} - ${o}) * ${r / 100})`;
    }
    if (e.startsWith("rgb") && t.startsWith("rgb")) {
      let o = e.match(/\d+/g).map(Number),
        n = t.match(/\d+/g).map(Number);
      return `rgb(${o.map((i, a) => i + (n[a] - i) * (r / 100)).join(",")})`;
    }
  }
  return r < 50 ? e : t;
}
function J(e, t) {
  let r = t.clientX - e.clientX,
    o = t.clientY - e.clientY;
  return { x: r, y: o, dist: Math.sqrt(Math.pow(r, 2) + Math.pow(o, 2)) };
}
D("[data-bound-characters]", (e) => {
  let t = () => {
    let r = e.getAttribute("data-bound-characters"),
      o = I(H(X()[r]));
    o !== e.textContent && (e.textContent = o);
  };
  return (
    t(),
    document.addEventListener("f2w-set-variable", t),
    () => document.removeEventListener("f2w-set-variable", t)
  );
}),
  D("[data-bound-visible]", (e) => {
    let t = () => {
      let r = e.getAttribute("data-bound-visible"),
        o = I(H(X()[r]));
      o !== void 0 && e.setAttribute("data-visible", o);
    };
    return (
      t(),
      document.addEventListener("f2w-set-variable", t),
      () => document.removeEventListener("f2w-set-variable", t)
    );
  });
/*
 * [js-sha1]{@link https://github.com/emn178/js-sha1}
 *
 * @version 0.6.0
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2014-2017
 * @license MIT
 */
