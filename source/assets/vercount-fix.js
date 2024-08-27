var t;
!(function () {
  var e,
    n = [],
    o = !1;
  function c() {
    (o = !0),
      document.removeEventListener("DOMContentLoaded", c),
      n.forEach((t) => t.call(document)),
      (n = []);
  }
  e = function (t) {
    o ||
    "interactive" === document.readyState ||
    "complete" === document.readyState
      ? t.call(document)
      : (n.push(t), document.addEventListener("DOMContentLoaded", c));
  };
  ({
    fetch: async function (n) {
      try {
        const o = await fetch(
            "https://events.vercount.one/log?jsonpCallback=VisitorCountCallback",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ 
              url: window.location.href.replace(/\/$/, "")
            }),
            },
          )
        c = await o.json();
        e(() => n(c)), t.showAll();
      } catch (e) {
        console.error("Error fetching visitor count:", e), t.hideAll();
      }
    },
  }).fetch(
    (t = {
      counterIds: ["site_pv", "page_pv", "site_uv"],
      updateText: function (t) {
        this.counterIds.forEach((e) => {
          const n = document.getElementById("busuanzi_value_" + e);
          n && (n.textContent = t[e] || "0");
        });
      },
      hideAll: function () {
        this.counterIds.forEach((t) => {
          const e = document.getElementById("busuanzi_container_" + t);
          e && (e.style.display = "none");
        });
      },
      showAll: function () {
        this.counterIds.forEach((t) => {
          const e = document.getElementById("busuanzi_container_" + t);
          e && (e.style.display = "inline");
        });
      },
    }).updateText.bind(t),
  );
})();
