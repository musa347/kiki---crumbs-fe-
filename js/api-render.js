/**
 * KIKI & CRUMBS — API RENDERERS
 * Turns catalog API data into markup matching the existing static DOM exactly
 * (same classes/ids), so the current CSS and inline JS keep working.
 * Requires js/api-client.js to be loaded first.
 */
(function () {
  "use strict";

  if (!window.KikiAPI) return;

  function escapeHTML(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  var fmt = window.KikiAPI.formatNaira;

  window.KikiAPI.Render = {
    /** Box size radios → #box-size-options */
    boxOptions: function (boxes, selectedId) {
      return boxes.map(function (b, i) {
        var checked = selectedId ? b.id === selectedId : i === 0;
        var esc = checked ? " checked" : "";
        var sel = checked ? " selected" : "";
        return (
          '<label class="box-radio-label' + sel + '" id="box-label-' + b.quantity + '">' +
          '<input type="radio" name="box_size" class="box-radio-input"' + esc +
          ' value="' + escapeHTML(b.name) + " — " + fmt(b.price) + '"' +
          ' data-price="' + b.price + '" data-count="' + b.quantity + '"' +
          ' data-box-id="' + b.id + '" />' +
          '<div class="box-info-wrap"><div>' +
          '<div class="box-title-text">' + escapeHTML(b.name) + "</div>" +
          '<span class="box-desc-text">' + escapeHTML(b.description || "") + "</span>" +
          "</div></div>" +
          '<div class="box-price-text">' + fmt(b.price) + "</div>" +
          "</label>"
        );
      }).join("");
    },

    /** Flavor checkboxes → #flavors-checkbox-group */
    flavors: function (flavors) {
      return flavors.map(function (f, i) {
        var checked = i === 0 ? " checked" : "";
        var sel = checked ? " selected" : "";
        return (
          '<label class="flavor-checkbox-label' + sel + '" id="flavor-label-' + i + '">' +
          '<input type="checkbox" name="flavors" class="flavor-checkbox-input"' + checked +
          ' value="' + escapeHTML(f.name) + '" data-flavor-id="' + f.id + '" />' +
          '<div class="flavor-info">' +
          '<span class="flavor-name">' + escapeHTML(f.name) + "</span>" +
          '<span class="flavor-sub">' + escapeHTML(f.description || "") + "</span>" +
          "</div></label>"
        );
      }).join("");
    },

    /** Delivery select options → #delivery-select (Pickup first, free) */
    deliveryZones: function (zones) {
      var opts = ['<option value="Pickup (Free)" data-fee="0" data-type="PICKUP">Pickup (Free)</option>'];
      zones.forEach(function (z) {
        if (!z.is_active) return;
        opts.push(
          '<option value="' + escapeHTML(z.name) + " " + fmt(z.delivery_fee) + '"' +
          ' data-fee="' + z.delivery_fee + '" data-type="DELIVERY" data-zone-id="' + z.id + '">' +
          escapeHTML(z.name) + " (" + fmt(z.delivery_fee) + ")</option>"
        );
      });
      return opts.join("");
    },

    /**
     * Bake-day options → #bake-day-select, built ONLY from OPEN slots the
     * backend returned (PRD §18: availability is configurable, never assumed).
     */
    bakeDays: function (slots) {
      var opts = [];
      (slots || []).forEach(function (s) {
        if (s.status !== "OPEN") return;
        var remaining = s.remaining_capacity != null
          ? s.remaining_capacity
          : s.capacity - s.booked_capacity;
        if (remaining <= 0) return;
        var d = new Date(s.fulfillment_date + "T00:00:00");
        var label = d.toLocaleDateString("en-NG", {
          weekday: "long", day: "numeric", month: "long"
        });
        opts.push(
          '<option value="' + s.fulfillment_date + '" data-slot-id="' + s.id + '">' +
          escapeHTML(label) + " (" + remaining + " left)</option>"
        );
      });
      return opts.join("");
    },

    /** Product cards → #product-grid (same structure as static cards) */
    products: function (products, categorySlugById) {
      return products.filter(function (p) { return p.is_active; }).map(function (p) {
        var cat = categorySlugById[p.category_id] || "all";
        var img = p.image_url ||
          "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=700&q=80";
        return (
          '<article class="product-card" data-category="' + escapeHTML(cat) + '" id="product-' + escapeHTML(p.slug) + '">' +
          '<div class="product-media-wrap">' +
          '<img src="' + escapeHTML(img) + '" alt="' + escapeHTML(p.name) + '" loading="lazy" />' +
          "</div>" +
          '<div class="product-body">' +
          '<div class="product-head"><h3 class="product-name">' + escapeHTML(p.name) + "</h3></div>" +
          '<p class="product-desc">' + escapeHTML(p.description || "") + "</p>" +
          '<div class="product-footer"><div class="product-price-block">' +
          '<span class="product-price-label">Price</span>' +
          '<span class="product-price">' + fmt(p.base_price) + "</span></div>" +
          '<button class="btn btn-primary btn-sm preselect-order-btn"' +
          ' data-flavor="' + escapeHTML(p.name) + '">Order This Box</button>' +
          "</div></div></article>"
        );
      }).join("");
    },

    /** Filter chips → #category-filter-bar (from live categories) */
    categoryChips: function (categories) {
      var chips = ['<button class="filter-chip active" data-category="all" id="filter-all">All Bakes</button>'];
      categories.forEach(function (c) {
        if (!c.is_active) return;
        chips.push(
          '<button class="filter-chip" data-category="' + escapeHTML(c.slug) + '">' +
          escapeHTML(c.name) + "</button>"
        );
      });
      return chips.join("");
    }
  };
})();
