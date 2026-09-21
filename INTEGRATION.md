# Frontend ↔ Backend Integration Guide

The current frontend (`index.html`) is a self-contained static page: inline CSS,
hard-coded catalog data, and a vanilla-JS ordering engine that talks **only to
WhatsApp**. This document is the map for connecting it to the Go API.

---

## 1. What the frontend hard-codes today (must come from the API)

| Static today | Where | API replacement |
|---|---|---|
| 6 product cards (name, price, desc, image) | lines ~1700–1990 | `GET /api/v1/products` + `GET /api/v1/categories` |
| Filter chips (all/steamed/cupcakes) | ~1705 | `GET /api/v1/categories` (slugs differ — see §4) |
| Box radios (4/6/12, prices) | ~2008–2048 | `GET /api/v1/box-options` |
| Flavor checkboxes (6 names) | ~2072–2120 | `GET /api/v1/flavors` |
| Delivery select (Pickup + 3 zones) | ~2140–2143 | `GET /api/v1/delivery-zones` |
| Bake days (Thursday/Sunday) | ~2150 | `GET /api/v1/availability` (PRD §18 forbids hard-coding bake days) |
| `WHATSAPP_NUMBER` JS constant | line 2316 | `GET /api/v1/config` → `whatsapp_number` |
| WhatsApp message built client-side | `handleOrderSubmit` | `POST /api/v1/orders` → returns `whatsapp_url` |

## 2. The new order flow (PRD §32 — backend is the system of record)

```
fill form → POST /api/v1/orders (Idempotency-Key header)
          → 201 {order:{order_number, total, items...}, whatsapp_url}
          → show confirmation (order number)
          → "Confirm via WhatsApp" opens the returned whatsapp_url
```

The client never computes a total and never composes the WhatsApp message.

### Required form additions (backend validates these)
- **Customer phone** (required) — add `id="customer-phone"` input.
- **Delivery address** (required when DELIVERY) — add `id="delivery-address"`.
- **Promo code** (optional) — add `id="promo-code"` input; preview via
  `KikiAPI.validatePromo(code, boxPrice)` and show `discount`/`total`.
- **Payment method** — default `BANK_TRANSFER`; a small radio for CASH.

### Order payload (exact shape the API expects)

```js
{
  items: [{
    box_option_id: "<uuid from box options>",
    quantity: 1,
    flavors: [{ flavor_id: "<uuid>", quantity: 4 }]  // must sum to box quantity
  }],
  fulfillment_type: "PICKUP",            // or "DELIVERY"
  fulfillment_date: "2026-09-18",        // a value from /availability
  delivery_zone_id: "<uuid>",            // only when DELIVERY
  delivery_address: "12 Farm Rd",        // only when DELIVERY
  customer: { name: "...", phone: "..." },
  promo_code: "KIKI10",                  // optional
  payment_method: "BANK_TRANSFER"        // or "CASH"
}
```

## 3. Wiring steps in `index.html`

1. **Before** the inline `<script>` (after the closing `</style>`):
   ```html
   <script>window.KIKI_API_BASE = "http://localhost:8080";</script>
   <script src="js/api-client.js"></script>
   <script src="js/api-render.js"></script>
   ```
2. Add the new form inputs listed in §2 (phone, address, promo, payment).
3. Replace the static product grid / box radios / flavors / zone options /
   bake-day options with empty containers (keep the wrapper ids) and populate
   on load:
   ```js
   document.addEventListener("DOMContentLoaded", function () {
     KikiAPI.loadCatalog().then(function (cat) {
       window.KIKI_CATALOG = cat; // keep for submit-time ids
       var slugById = {};
       cat.categories.forEach(function (c) { slugById[c.id] = c.slug; });
       document.getElementById("product-grid").innerHTML =
         KikiAPI.Render.products(cat.products, slugById);
       document.getElementById("category-filter-bar").innerHTML =
         KikiAPI.Render.categoryChips(cat.categories);
       document.getElementById("box-size-options").innerHTML =
         KikiAPI.Render.boxOptions(cat.boxOptions);
       document.getElementById("flavors-checkbox-group").innerHTML =
         KikiAPI.Render.flavors(cat.flavors);
       document.getElementById("delivery-select").innerHTML =
         KikiAPI.Render.deliveryZones(cat.deliveryZones);
       document.getElementById("bake-day-select").innerHTML =
         KikiAPI.Render.bakeDays(cat.availability);
       // re-bind the inline listeners here (filter chips, radios, checkboxes,
       // preselect buttons) since the DOM was replaced
     }).catch(showErrorToast);
   });
   ```
4. Replace `handleOrderSubmit` with a call to `KikiAPI.createOrder(...)`
   mapped from the form, then:
   - success → show `order.order_number` + open/point to `whatsapp_url`;
   - failure → `showToast(err.message)` (codes like `FULFILLMENT_DATE_UNAVAILABLE`
     are user-actionable).
5. Re-bind listeners after any `innerHTML` replacement (or use event
   delegation on the container).

## 4. Data decisions — RESOLVED (2026-09)

All catalog data is **DB-configurable** (admin can change it any time); the
seeds now match the storefront (migration `000005`):

| Item | Resolution |
|---|---|
| Party Box price | **₦11,000** (DB seed updated) |
| Flavor names | Frontend copy: Chocolate Fudge, Strawberry Dream, Velvet Vanilla, Red Velvet, Cookies & Cream, **+ Rainbow Steamed added** |
| Categories | Slugs now `steamed` / `cupcakes` to match the filter chips |
| Zones | **Merged**: GRA-Nassarawa ₦1,500 (Nassarawa deactivated, not deleted — historical orders keep their reference), Tarauni ₦1,000, Hotoro ₦1,500 |
| Hosting | **Vercel** — the API now allow-lists `https://*.vercel.app` by default (wildcard subdomain support in the CORS middleware, exact origins still supported). When you buy the domain, add `https://yourdomain.com` to `CORS_ORIGINS`. |

Verified live: `GET /api/v1/box-options` → 4,500 / 6,000 / 11,000;
`GET /api/v1/flavors` → the six storefront names; wildcard CORS echoes
`https://<anything>.vercel.app` and rejects lookalike suffixes.

## 5. CORS

The API allow-lists origins via `CORS_ORIGINS` (default: the two Vite dev
ports). If the page is served from another origin (AI Studio preview, static
host), add it to `CORS_ORIGINS` in the API's environment. `file://` origins
cannot do CORS — serve the page over http during development.

## 6. Files added by this preparation

- `js/api-client.js` — fetch wrapper, envelope/error normalization,
  idempotency-key management, catalog loader, promo/track/inquiry calls.
- `js/api-render.js` — `KikiAPI.Render.*` producing markup identical to the
  current static DOM so existing CSS/listeners keep working.
