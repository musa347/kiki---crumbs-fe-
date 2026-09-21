/**
 * KIKI & CRUMBS — API CLIENT
 * Plain-JS bridge between the static frontend and the Go backend.
 * Load with <script src="js/api-client.js"></script> BEFORE the inline
 * ordering-engine script, then use window.KikiAPI.
 *
 * Contract (PRD §51/§53/§54): every response is
 * {"success":true,"data":...} or {"success":false,"error":{"code","message"}}.
 * Money is whole Naira.
 */
(function () {
  "use strict";

  // Base URL of the Go API. Override before load:
  //   <script>window.KIKI_API_BASE = "https://api.example.com";</script>
  var API_BASE = window.KIKI_API_BASE || "http://localhost:8080";

  var API = {
    config: API_BASE + "/api/v1/config",
    categories: API_BASE + "/api/v1/categories",
    products: API_BASE + "/api/v1/products",
    flavors: API_BASE + "/api/v1/flavors",
    boxOptions: API_BASE + "/api/v1/box-options",
    deliveryZones: API_BASE + "/api/v1/delivery-zones",
    availability: API_BASE + "/api/v1/availability",
    orders: API_BASE + "/api/v1/orders",
    promoValidate: API_BASE + "/api/v1/promo-codes/validate",
    eventInquiries: API_BASE + "/api/v1/event-inquiries"
  };

  /**
   * request(method, url, body, extraHeaders)
   * Resolves with response.data; rejects with { code, message, status }.
   */
  function request(method, url, body, extraHeaders) {
    var opts = {
      method: method,
      headers: { Accept: "application/json" },
      credentials: "include"
    };
    if (body !== undefined && body !== null) {
      opts.headers["Content-Type"] = "application/json";
      opts.body = JSON.stringify(body);
    }
    if (extraHeaders) {
      Object.keys(extraHeaders).forEach(function (k) {
        opts.headers[k] = extraHeaders[k];
      });
    }

    var controller = typeof AbortController !== "undefined" ? new AbortController() : null;
    if (controller) {
      opts.signal = controller.signal;
      setTimeout(function () { controller.abort(); }, 15000);
    }

    return fetch(url, opts)
      .then(function (res) {
        return res.json().catch(function () { return null; }).then(function (json) {
          if (res.ok && json && json.success) return json.data;
          var err = (json && json.error) || {};
          throw {
            code: err.code || "NETWORK_ERROR",
            message: err.message || "Something went wrong. Please try again.",
            status: res.status
          };
        });
      })
      .catch(function (err) {
        if (err && err.name === "AbortError") {
          throw { code: "TIMEOUT", message: "The server took too long to respond.", status: 0 };
        }
        if (err instanceof TypeError) {
          var hint = "";
          if (window.location.protocol === "file:") {
            hint = " (You opened this page with file:// — serve it over http instead, e.g. `python3 -m http.server 5173`.)";
          } else {
            hint = " (Is the API running on " + API_BASE + "? Start it with: cd kiki-and-crumbs-api && ./scripts/start-dev.sh)";
          }
          throw {
            code: "UNREACHABLE",
            message: "Cannot reach the kitchen at " + API_BASE + "." + hint,
            status: 0
          };
        }
        throw err;
      });
  }

  function uuid() {
    if (window.crypto && window.crypto.randomUUID) return window.crypto.randomUUID();
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0;
      var v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  function newIdempotencyKey() {
    var key = uuid();
    try { sessionStorage.setItem("kiki_idem_key", key); } catch (e) { /* private mode */ }
    return key;
  }

  function currentIdempotencyKey() {
    try {
      var k = sessionStorage.getItem("kiki_idem_key");
      if (k) return k;
    } catch (e) { /* ignore */ }
    return newIdempotencyKey();
  }

  function formatNaira(naira) {
    return "₦" + Number(naira || 0).toLocaleString("en-NG");
  }

  window.KikiAPI = {
    API_BASE: API_BASE,
    formatNaira: formatNaira,
    newIdempotencyKey: newIdempotencyKey,
    currentIdempotencyKey: currentIdempotencyKey,

    /** Load everything the storefront needs, in parallel. */
    loadCatalog: function () {
      return Promise.all([
        request("GET", API.config),
        request("GET", API.categories),
        request("GET", API.products),
        request("GET", API.flavors),
        request("GET", API.boxOptions),
        request("GET", API.deliveryZones),
        request("GET", API.availability)
      ]).then(function (r) {
        return {
          config: r[0],
          categories: r[1],
          products: r[2],
          flavors: r[3],
          boxOptions: r[4],
          deliveryZones: r[5],
          availability: r[6]
        };
      });
    },

    /** Live promo preview (dry run; final check happens at order time). */
    validatePromo: function (code, subtotalNaira) {
      return request("POST", API.promoValidate, {
        code: code,
        subtotal: Math.round(subtotalNaira)
      });
    },

    /** createOrder — see INTEGRATION.md for the payload shape. */
    createOrder: function (payload) {
      return request("POST", API.orders, payload, {
        "Idempotency-Key": currentIdempotencyKey()
      });
    },

    /** Track an order (PRD §36). phone guards against casual enumeration. */
    trackOrder: function (orderNumber, phone) {
      var qs = phone ? "?phone=" + encodeURIComponent(phone) : "";
      return request("GET", API.orders + "/" + encodeURIComponent(orderNumber) + qs);
    },

    /** Submit an event inquiry (PRD §37/§38). */
    createEventInquiry: function (payload) {
      return request("POST", API.eventInquiries, payload);
    }
  };
})();
