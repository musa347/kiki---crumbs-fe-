
# Kiki & Crumbs — Product Requirements Document (PRD)

**Product:** Kiki & Crumbs Ordering Platform  
**Version:** 1.0 — MVP  
**Location:** Kano, Nigeria  
**Status:** Development Ready  
**Primary Goal:** Build a real-world bakery ordering platform while serving as a production-quality Go backend learning project.

---

# 1. Product Overview

Kiki & Crumbs is a bakery and dessert business serving customers in Kano, Nigeria.

The platform will allow customers to:

- Browse available baked products.
- View flavors and box options.
- Build a custom box.
- Select pickup or delivery.
- Select an available fulfillment date.
- Provide customer and delivery information.
- Apply promotional codes.
- Place an order.
- Receive an order number.
- Confirm the order through WhatsApp.
- Track the order using their order number and phone number.
- Submit inquiries for larger/custom event orders.

The platform will also provide an admin dashboard for managing:

- Orders
- Products
- Flavors
- Box options
- Delivery zones
- Fulfillment availability
- Promotions
- Payments
- Order status

The existing frontend design generated using Google AI Studio will be retained and integrated with the new backend.

---

# 2. Problem Statement

Kiki & Crumbs currently relies heavily on manual ordering and WhatsApp communication.

This creates several problems:

- Customers cannot easily see current products and prices.
- Orders can become difficult to track.
- Manual calculations can cause pricing errors.
- Customers may submit duplicate orders.
- Availability is difficult to manage.
- Historical order information is difficult to organize.
- Business owners cannot easily monitor sales and order status.
- WhatsApp becomes the de facto system of record.

The new platform should make the website the system of record while continuing to use WhatsApp as a convenient communication channel.

---

# 3. Product Goals

## 3.1 Primary Goals

1. Allow customers to place bakery orders online.
2. Provide reliable server-side pricing.
3. Prevent duplicate orders.
4. Allow the business to control product availability.
5. Allow the business to control fulfillment dates and capacity.
6. Provide order tracking.
7. Provide a simple admin dashboard.
8. Keep WhatsApp as a communication channel rather than the database.
9. Build the backend using Go.
10. Keep the architecture simple enough to operate and maintain as a small business.

---

# 4. Non-Goals

The following features are explicitly outside the MVP:

- Native Android/iOS application.
- Microservices architecture.
- Kafka.
- Redis.
- Kubernetes.
- Elasticsearch.
- AI chatbot.
- Automated delivery-driver application.
- Full inventory management.
- Complex warehouse management.
- Card payment gateway integration.
- Customer accounts.
- Loyalty program.
- Advanced analytics.
- AI demand forecasting.

These may be considered for future versions.

---

# 5. Target Users

## 5.1 Customers

Customers who want to:

- Order cakes/bakes.
- Customize a box.
- Schedule pickup or delivery.
- Order for birthdays and small celebrations.
- Order for larger events.
- Track an existing order.

Customers should NOT be required to create an account for the MVP.

---

## 5.2 Business Admin

The bakery owner/staff who need to:

- Manage products.
- Manage flavors.
- Manage box options.
- Manage prices.
- Manage availability.
- Manage delivery zones.
- Manage orders.
- Confirm payments.
- Update order status.
- Manage promotions.

---

# 6. Product Experience

## 6.1 Customer Journey

```text
Landing Page
     ↓
Browse Menu
     ↓
Select Box
     ↓
Select Flavors
     ↓
Select Pickup/Delivery
     ↓
Select Available Date
     ↓
Enter Customer Details
     ↓
Review Order
     ↓
Create Order
     ↓
Receive Order Number
     ↓
Confirm Through WhatsApp
     ↓
Track Order
````

---

# 7. Existing Frontend Design

The current frontend design should remain visually consistent.

## Brand Direction

The visual identity should use:

* Warm cream backgrounds.
* Rich cacao brown.
* Blush/rose accents.
* Caramel highlights.
* Soft rounded UI elements.
* Premium but approachable presentation.
* Feminine/artisanal bakery aesthetic.

## Typography

Primary:

* Playfair Display for major headings.
* Outfit for body/interface text.
* Handwritten/cursive accents where appropriate.

---

# 8. Homepage

The homepage should contain:

## 8.1 Announcement Banner

Example:

> Freshly baked goodness, made with love.

The announcement content should eventually be configurable by the admin.

Do NOT hard-code specific weekly bake days.

---

## 8.2 Hero Section

Headline:

> Soft Bakes. Sweet Moments.

Supporting copy should communicate:

* Fresh bakery products.
* Kano delivery.
* Custom boxes.
* Easy ordering.

Primary CTA:

> Order Now

Secondary CTA:

> Custom Event Boxes

---

# 9. Product Catalog

Customers should be able to browse available products.

## Initial Products

Examples include:

* Rainbow Steamed Cakes
* Chocolate Fudge Swirl
* Strawberry Dream
* Velvet Vanilla Bean
* Royal Red Velvet
* Cookies & Cream Oreo

These products are initial seed data.

They must NOT be hard-coded permanently into the frontend.

Products should come from the backend API.

---

# 10. Product Categories

Initial categories:

* All Bakes
* Steamed Cakes
* Cupcake Boxes

The admin should eventually be able to create/update/deactivate categories.

---

# 11. Product Requirements

Each product should contain:

```text
id
name
slug
description
category_id
image_url
base_price
is_active
display_order
created_at
updated_at
```

Products can be:

* Active
* Inactive

Inactive products should not be available for new customer orders.

---

# 12. Flavors

Initial flavors:

* Chocolate Fudge Swirl
* Strawberry Dream
* Velvet Vanilla Bean
* Royal Red Velvet
* Cookies & Cream Oreo

Flavors should be database records.

The frontend should retrieve them from the API.

Each flavor should support:

```text
id
name
description
image_url
is_active
display_order
created_at
updated_at
```

---

# 13. Box Options

Initial box options:

| Box       | Quantity | Initial Price |
| --------- | -------: | ------------: |
| Box of 4  |        4 |        ₦4,500 |
| Box of 6  |        6 |        ₦6,000 |
| Party Box |       12 |       ₦11,500 |

These are initial values only.

Prices must NOT be hard-coded into the frontend.

Admins should be able to:

* Change prices.
* Change quantity.
* Activate/deactivate box options.
* Change display order.

---

# 14. Custom Box Builder

Customers should be able to:

1. Select a box size.
2. Select flavors.
3. Mix and match flavors.
4. See the live order summary.
5. Select fulfillment type.
6. Select fulfillment date.
7. See delivery fees where applicable.
8. See discounts.
9. See final total.

Example:

```text
Party Box
12 items

Chocolate Fudge Swirl × 4
Red Velvet × 4
Cookies & Cream × 4

Subtotal: ₦11,500
Delivery: ₦1,000
Discount: ₦0

Total: ₦12,500
```

---

# 15. Flavor Validation

The backend must validate the flavor selection.

For example:

A Box of 4 must contain exactly 4 units.

A Box of 6 must contain exactly 6 units.

A Party Box must contain exactly 12 units.

The backend must NOT trust the quantity calculated by the frontend.

---

# 16. Delivery

Customers should be able to select:

* Pickup
* Delivery

For delivery, the customer must select a valid delivery zone.

---

# 17. Delivery Zones

Initial examples:

* Nassarawa
* Tarauni
* GRA
* Hotoro

Delivery zones must be configurable.

Each zone should contain:

```text
id
name
delivery_fee
is_active
created_at
updated_at
```

Admins should be able to:

* Add zones.
* Edit zones.
* Change delivery fees.
* Disable zones.

---

# 18. Fulfillment Availability

The business must be able to control which dates are available for orders.

The system must NOT assume that Kiki & Crumbs always bakes on Thursday and Sunday.

Availability must be configurable.

Example:

```text
Date: 2026-09-20
Capacity: 20
Booked: 12
Remaining: 8
Status: OPEN
```

Possible statuses:

```text
OPEN
FULL
CLOSED
```

Each fulfillment slot should support:

```text
id
fulfillment_date
capacity
booked_capacity
status
minimum_notice_hours
created_at
updated_at
```

---

# 19. Fulfillment Rules

The backend must verify:

1. The selected date exists.
2. The date is open.
3. The date has sufficient capacity.
4. The order meets the minimum notice requirement.
5. The requested quantity can fit within remaining capacity.

The frontend should display only currently available dates.

However, the backend must perform the final validation.

---

# 20. Customer Information

Customers should not need to register.

Required:

```text
name
phone
fulfillment_type
```

For delivery:

```text
delivery_zone
delivery_address
```

Optional:

```text
email
order_note
```

---

# 21. Customer Data Model

```text
Customer

id
name
phone
email
created_at
updated_at
```

A customer can have multiple orders.

Customer accounts are not required for MVP.

---

# 22. Orders

An order represents a customer's confirmed request.

Example:

```text
Order Number:
KC-000042

Customer:
John Doe

Phone:
080XXXXXXXX

Fulfillment:
Delivery

Date:
2026-09-20

Status:
PENDING_CONFIRMATION

Payment:
PENDING
```

---

# 23. Order Status

Normal lifecycle:

```text
PENDING_CONFIRMATION
        ↓
CONFIRMED
        ↓
PREPARING
        ↓
READY
        ↓
OUT_FOR_DELIVERY
        ↓
DELIVERED
```

Pickup:

```text
READY
  ↓
PICKED_UP
```

Exceptional statuses:

```text
CANCELLED
REJECTED
```

---

# 24. Order Items

Orders should support one or more items.

Each order item should preserve the price at the time of purchase.

Example:

```text
OrderItem

id
order_id
box_option_id
box_name_snapshot
quantity
unit_price
subtotal
```

The product/box's current price must NOT be used to modify historical orders.

---

# 25. Order Item Flavors

Each order item should have its flavor breakdown.

Example:

```text
Order Item:
Party Box

Chocolate Fudge × 4
Red Velvet × 4
Cookies & Cream × 4
```

Data:

```text
order_item_flavors

id
order_item_id
flavor_id
flavor_name_snapshot
quantity
```

---

# 26. Pricing

Pricing must be calculated on the backend.

The frontend should send:

```text
box_option_id
flavor selections
fulfillment type
delivery zone
promo code
```

The backend should retrieve current prices and calculate:

```text
Subtotal
+ Delivery Fee
- Discount
= Total
```

The frontend must NOT be trusted to determine the final amount.

---

# 27. Price Snapshot

When an order is created, the system should store the relevant prices.

Example:

```text
box_price = 6000
delivery_fee = 1000
discount = 500
total = 6500
```

If the bakery later changes the box price from ₦6,000 to ₦7,000, existing orders must remain ₦6,000.

---

# 28. Promotions

The system should support promotional codes.

Example:

```text
KIKI10
```

Initial promotional behavior:

```text
10% discount
```

Promotions should support:

```text
id
code
discount_type
discount_value
minimum_order_amount
maximum_discount
start_date
end_date
usage_limit
usage_count
is_active
created_at
updated_at
```

Possible discount types:

```text
PERCENTAGE
FIXED_AMOUNT
```

---

# 29. Promo Validation

The backend must validate:

* Code exists.
* Code is active.
* Current date is within validity period.
* Usage limit has not been exceeded.
* Order meets minimum amount.
* Discount calculation is valid.

---

# 30. Payment

The MVP will NOT integrate card payments.

Supported payment methods:

```text
BANK_TRANSFER
CASH
```

Payment status:

```text
PENDING
CONFIRMED
FAILED
```

Payment should be represented separately from the order.

---

# 31. Future Payment Gateway

The payment architecture should allow future integration with providers such as Paystack without rewriting the order system.

Example abstraction:

```text
PaymentService

createPayment()
verifyPayment()
refundPayment()
```

Payment gateway integration is a future feature.

---

# 32. WhatsApp Integration

WhatsApp should remain part of the customer experience.

However:

> WhatsApp must NOT be the system of record.

Correct flow:

```text
Customer
   ↓
Website
   ↓
Backend creates order
   ↓
Order number generated
   ↓
Confirmation page
   ↓
"Confirm via WhatsApp"
   ↓
WhatsApp
```

Example message:

```text
Hello Kiki & Crumbs,

I'd like to confirm my order.

Order: KC-000042

Box: Party Box
Flavors:
- Chocolate Fudge × 4
- Red Velvet × 4
- Cookies & Cream × 4

Fulfillment: Delivery
Date: 20 September 2026

Total: ₦12,500
```

The backend remains the source of truth.

---

# 33. Order Number

Every successful order must receive a unique human-readable order number.

Format:

```text
KC-000001
KC-000002
KC-000003
```

Order numbers must be unique.

---

# 34. Idempotency

Order creation must support idempotency.

The endpoint:

```http
POST /api/v1/orders
```

should accept:

```http
Idempotency-Key
```

This prevents duplicate orders when:

* Customer double-clicks.
* Browser retries request.
* Network connection is unstable.
* Frontend retries after timeout.

Example:

```http
Idempotency-Key: 4f6a8c...
```

If the same key is submitted again, the backend should return the original result rather than creating another order.

---

# 35. Order Creation Transaction

Creating an order should happen inside a database transaction.

The transaction should:

1. Validate customer information.
2. Validate box option.
3. Validate flavors.
4. Validate fulfillment date.
5. Validate delivery zone.
6. Validate promo code.
7. Calculate pricing.
8. Verify capacity.
9. Create/update customer.
10. Create order.
11. Create order items.
12. Create flavor selections.
13. Create payment record.
14. Reserve fulfillment capacity.
15. Store idempotency record.
16. Commit transaction.

If any critical operation fails, the transaction should roll back.

---

# 36. Order Tracking

Customers should be able to track an order without creating an account.

Example:

```text
Order Number:
KC-000042

Phone:
080XXXXXXXX
```

The backend returns the current status.

Example timeline:

```text
✓ Order Received
✓ Confirmed
✓ Preparing
→ Ready
○ Out for Delivery
○ Delivered
```

---

# 37. Event Orders

Large/custom orders should use a separate inquiry flow.

Examples:

* Weddings
* Birthdays
* Anniversaries
* Corporate events
* Parties
* Religious events
* Custom gift boxes

Customers should submit:

```text
name
phone
email
event_type
event_date
estimated_quantity
preferred_flavors
delivery_location
budget
requirements
```

This creates an event inquiry rather than a normal order.

---

# 38. Event Inquiry API

```http
POST /api/v1/event-inquiries
```

The inquiry should be visible in the admin dashboard.

Possible statuses:

```text
NEW
CONTACTED
QUOTED
CONFIRMED
REJECTED
COMPLETED
```

---

# 39. Admin Dashboard

The admin dashboard should provide a centralized management interface.

---

# 40. Admin Dashboard Overview

Dashboard should display:

```text
Today's Orders
Today's Revenue
Pending Orders
Orders Preparing
Orders Ready
Orders Awaiting Payment
Upcoming Fulfillment
```

---

# 41. Admin Order Management

Admins should be able to:

* View orders.
* Search orders.
* Filter orders.
* Open order details.
* Update status.
* Confirm payment.
* Cancel orders.
* Reject orders.
* View customer details.
* View order history.

Filters:

```text
Status
Payment Status
Fulfillment Date
Fulfillment Type
Customer
Order Number
```

---

# 42. Admin Order Detail

Order detail should show:

```text
Order Number
Customer
Phone
Email
Items
Flavor Breakdown
Subtotal
Delivery Fee
Discount
Total
Payment Method
Payment Status
Fulfillment Type
Fulfillment Date
Delivery Zone
Delivery Address
Customer Note
Order Status
Created At
Updated At
```

---

# 43. Product Management

Admin can:

* Create product.
* Edit product.
* Deactivate product.
* Change price.
* Change image.
* Change category.
* Change description.
* Change display order.

---

# 44. Flavor Management

Admin can:

* Create flavor.
* Edit flavor.
* Activate/deactivate flavor.
* Change display order.

---

# 45. Box Management

Admin can:

* Create box.
* Edit box.
* Change quantity.
* Change price.
* Activate/deactivate box.
* Change display order.

---

# 46. Delivery Zone Management

Admin can:

* Create zone.
* Edit zone.
* Change delivery fee.
* Activate/deactivate zone.

---

# 47. Availability Management

Admin should be able to:

* Create fulfillment date.
* Set capacity.
* Increase/decrease capacity.
* Close a date.
* Reopen a date.
* View booked capacity.
* View remaining capacity.

Example:

```text
20 September 2026

Capacity: 20
Booked: 15
Remaining: 5

Status: OPEN
```

---

# 48. Promo Management

Admin can:

* Create promo.
* Activate/deactivate promo.
* Set discount.
* Set start/end dates.
* Set usage limit.
* View usage.

---

# 49. Admin Authentication

Admin endpoints must be protected.

Authentication:

```text
JWT
```

Password storage:

```text
bcrypt
```

Admin credentials must never be stored in plaintext.

---

# 50. API Architecture

Base URL:

```text
/api/v1
```

---

# 51. Public APIs

## Products

```http
GET /api/v1/products
GET /api/v1/products/{id}
```

## Flavors

```http
GET /api/v1/flavors
```

## Box Options

```http
GET /api/v1/box-options
```

## Delivery Zones

```http
GET /api/v1/delivery-zones
```

## Availability

```http
GET /api/v1/availability
```

## Orders

```http
POST /api/v1/orders
GET /api/v1/orders/{orderNumber}
```

## Promotions

```http
POST /api/v1/promo-codes/validate
```

## Event Inquiries

```http
POST /api/v1/event-inquiries
```

---

# 52. Admin APIs

## Authentication

```http
POST /api/v1/admin/login
```

## Dashboard

```http
GET /api/v1/admin/dashboard
```

## Orders

```http
GET /api/v1/admin/orders
GET /api/v1/admin/orders/{id}
PATCH /api/v1/admin/orders/{id}/status
PATCH /api/v1/admin/orders/{id}/payment
```

## Products

```http
POST /api/v1/admin/products
PATCH /api/v1/admin/products/{id}
```

## Flavors

```http
POST /api/v1/admin/flavors
PATCH /api/v1/admin/flavors/{id}
```

## Box Options

```http
POST /api/v1/admin/box-options
PATCH /api/v1/admin/box-options/{id}
```

## Delivery Zones

```http
POST /api/v1/admin/delivery-zones
PATCH /api/v1/admin/delivery-zones/{id}
```

## Availability

```http
POST /api/v1/admin/availability
PATCH /api/v1/admin/availability/{id}
```

## Promotions

```http
POST /api/v1/admin/promos
PATCH /api/v1/admin/promos/{id}
```

---

# 53. API Error Format

All API errors should follow a consistent structure.

Example:

```json
{
  "success": false,
  "error": {
    "code": "FULFILLMENT_DATE_UNAVAILABLE",
    "message": "The selected date is no longer available."
  }
}
```

---

# 54. Success Response Format

Example:

```json
{
  "success": true,
  "data": {
    "order_number": "KC-000042"
  }
}
```

---

# 55. Backend Technology

## Language

Go

## HTTP

Go standard library:

```text
net/http
```

Chi may be introduced if useful.

## Database

PostgreSQL

## PostgreSQL Driver

pgx

## Migrations

golang-migrate

## Authentication

JWT + bcrypt

## Logging

Structured logging using Go's standard logging facilities or a lightweight structured logger.

---

# 56. Frontend Technology

Existing frontend:

```text
React
TypeScript
```

Likely build environment:

```text
Vite
```

The existing visual implementation should be reused rather than rebuilding the UI.

---

# 57. Backend Architecture

Use a modular monolith.

Do NOT start with microservices.

High-level architecture:

```text
                    Customer
                       │
                       ▼
              React + TypeScript
                       │
                     HTTPS
                       │
                       ▼
                  Go REST API
                       │
          ┌────────────┼────────────┐
          │            │            │
          ▼            ▼            ▼
       Catalog       Orders      Availability
          │            │            │
          └────────────┼────────────┘
                       ▼
                  PostgreSQL
```

---

# 58. Go Project Structure

```text
kiki-and-crumbs-api/
│
├── cmd/
│   └── api/
│       └── main.go
│
├── internal/
│   ├── config/
│   ├── database/
│   │
│   ├── http/
│   │   └── middleware/
│   │
│   ├── auth/
│   ├── customer/
│   ├── product/
│   ├── flavor/
│   ├── box/
│   ├── order/
│   ├── delivery/
│   ├── availability/
│   ├── payment/
│   ├── promo/
│   ├── notification/
│   ├── event/
│   └── admin/
│
├── migrations/
│
├── docs/
│
├── .env.example
├── Dockerfile
├── docker-compose.yml
├── go.mod
└── README.md
```

---

# 59. Core Modules

## Auth

Admin authentication and authorization.

## Customer

Customer information and order history.

## Product

Product catalog.

## Flavor

Flavor management.

## Box

Box options and pricing.

## Order

Order creation, validation, pricing and lifecycle.

## Delivery

Delivery zones and fees.

## Availability

Fulfillment dates and capacity.

## Payment

Payment records and future payment gateway abstraction.

## Promo

Promotional codes and discounts.

## Event

Large/custom order inquiries.

## Notification

WhatsApp and future email notification integrations.

## Admin

Admin-specific operations and dashboard.

---

# 60. Database Entities

Initial database entities:

```text
admin_users

customers

categories

products

flavors

box_options

delivery_zones

fulfillment_slots

orders

order_items

order_item_flavors

payments

promo_codes

promo_redemptions

event_inquiries

idempotency_keys
```

---

# 61. Database Principles

The database should:

* Use UUIDs or appropriate stable IDs.
* Use foreign keys.
* Use indexes on frequently queried fields.
* Use timestamps.
* Use database transactions.
* Enforce uniqueness where appropriate.
* Avoid storing calculated values that can become inconsistent unless intentionally snapshotting historical values.

---

# 62. Important Indexes

Examples:

```text
orders.order_number
orders.customer_id
orders.status
orders.fulfillment_date

customers.phone

products.slug
products.is_active

fulfillment_slots.fulfillment_date

promo_codes.code

idempotency_keys.key
```

---

# 63. Security Requirements

The application must:

* Use HTTPS in production.
* Never expose database credentials.
* Store secrets in environment variables.
* Hash admin passwords using bcrypt.
* Validate all incoming requests.
* Validate prices server-side.
* Validate availability server-side.
* Validate promo codes server-side.
* Protect admin routes.
* Configure strict CORS.
* Rate-limit sensitive endpoints.
* Avoid exposing internal errors to customers.

---

# 64. CORS

The backend should only allow requests from the production frontend domain and explicitly configured development origins.

Do not use:

```text
Access-Control-Allow-Origin: *
```

for authenticated production APIs.

---

# 65. Environment Configuration

Example:

```text
APP_ENV=development

PORT=8080

DATABASE_URL=...

JWT_SECRET=...

CORS_ORIGINS=...

WHATSAPP_NUMBER=...

LOG_LEVEL=info
```

Never commit `.env`.

Provide:

```text
.env.example
```

---

# 66. Health Check

The API should expose:

```http
GET /health
```

Example response:

```json
{
  "status": "ok"
}
```

Optional database health:

```http
GET /health/ready
```

---

# 67. Observability

Logs should contain useful context.

Example:

```text
request_id
order_id
endpoint
HTTP method
status code
duration
error
```

Business events should include:

```text
ORDER_CREATED
ORDER_CONFIRMED
PAYMENT_CONFIRMED
ORDER_PREPARING
ORDER_READY
ORDER_DELIVERED
ORDER_CANCELLED
```

---

# 68. Frontend Requirements

The existing UI should be connected to real APIs.

Replace hardcoded data for:

* Products.
* Prices.
* Flavors.
* Box options.
* Delivery zones.
* Availability.
* Promotions.

---

# 69. Frontend Loading States

Every API-driven section should support:

```text
Loading
Success
Empty
Error
```

Example:

```text
Loading products...

No products available.

Unable to load products.
Try again.
```

---

# 70. Frontend Validation

The frontend should validate:

* Required fields.
* Phone number.
* Box selection.
* Flavor quantities.
* Delivery information.
* Fulfillment date.
* Promo code format.

However, frontend validation is only for UX.

The backend remains authoritative.

---

# 71. Duplicate Submission Prevention

The order button should:

1. Disable after submission.
2. Display loading state.
3. Generate/use an idempotency key.
4. Prevent accidental duplicate orders.

---

# 72. Order Confirmation Page

After successful order creation:

```text
Order Confirmed

Order Number:
KC-000042

Total:
₦12,500

Fulfillment:
Delivery

Date:
20 September 2026
```

Actions:

```text
Confirm via WhatsApp
Track Order
Back to Home
```

---

# 73. WhatsApp Deep Link

The frontend can construct a WhatsApp URL containing the order summary.

The link should use the configured Kiki & Crumbs WhatsApp number.

The WhatsApp message should reference the generated order number.

---

# 74. Mobile UX

The platform should be mobile-first.

Important considerations:

* Large touch targets.
* Sticky order summary where appropriate.
* Simple checkout.
* Minimal typing.
* Easy WhatsApp confirmation.
* Fast image loading.
* Responsive product cards.
* Clear CTA buttons.

---

# 75. Performance

The application should:

* Minimize API calls.
* Optimize bakery images.
* Lazy-load gallery images.
* Cache public catalog data where appropriate.
* Use database indexes.
* Avoid unnecessary frontend re-renders.
* Keep API responses small.

---

# 76. MVP Acceptance Criteria

The MVP is considered complete when a customer can:

1. Open the website.
2. Browse products.
3. View flavors.
4. Select a box.
5. Select flavors.
6. Select pickup/delivery.
7. Select an available fulfillment date.
8. Enter customer information.
9. Apply a valid promo code.
10. See calculated pricing.
11. Submit an order.
12. Receive a unique order number.
13. Open WhatsApp with the order information.
14. Track the order.

The admin must be able to:

1. Log in.
2. View orders.
3. Update order status.
4. Confirm payments.
5. Manage products.
6. Manage flavors.
7. Manage box options.
8. Manage delivery zones.
9. Manage fulfillment dates.
10. Manage promotions.
11. View event inquiries.

---

# 77. Testing Requirements

The backend should include unit/integration tests for:

## Pricing

* Correct box price.
* Correct delivery fee.
* Correct discount.
* Correct total.

## Flavor Validation

* Correct quantity.
* Invalid quantity rejected.
* Invalid flavor rejected.

## Availability

* Closed date rejected.
* Full date rejected.
* Insufficient capacity rejected.
* Minimum notice enforced.

## Orders

* Successful order creation.
* Invalid customer rejected.
* Invalid delivery zone rejected.
* Invalid fulfillment rejected.

## Idempotency

* Same idempotency key does not create duplicate order.

## Authentication

* Invalid credentials rejected.
* Protected endpoints require authentication.
* Valid JWT accepted.

## Promotions

* Expired promo rejected.
* Inactive promo rejected.
* Invalid promo rejected.
* Usage limit enforced.

---

# 78. Deployment

Target architecture:

```text
                    GitHub
                      │
             ┌────────┴────────┐
             │                 │
             ▼                 ▼
          Vercel            Backend Host
        React App             Go API
                                │
                                ▼
                         Managed PostgreSQL
```

The project should prioritize free/open-source software and free hosting tiers where available.

Hosting providers should remain replaceable.

Do not tightly couple the application to a specific cloud provider.

---

# 79. Local Development

Recommended local setup:

```text
React frontend
     ↓
localhost:5173

Go API
     ↓
localhost:8080

PostgreSQL
     ↓
localhost:5432
```

Docker Compose may be used for local PostgreSQL.

---

# 80. Development Phases

## Phase 1 — Go Foundation

Build:

* Go project.
* Configuration.
* HTTP server.
* PostgreSQL connection.
* Migration system.
* Health endpoint.
* Logging.
* Basic error handling.
* CORS.

---

## Phase 2 — Catalog

Build:

* Categories.
* Products.
* Flavors.
* Box options.
* Delivery zones.

Implement public APIs.

---

## Phase 3 — Orders

Build:

* Customers.
* Orders.
* Order items.
* Flavor selections.
* Pricing.
* Payment records.
* Idempotency.

---

## Phase 4 — Availability

Build:

* Fulfillment slots.
* Capacity.
* Availability validation.
* Capacity reservation.

---

## Phase 5 — Frontend Integration

Replace hardcoded frontend data with API calls.

Implement:

* Product loading.
* Flavor loading.
* Box loading.
* Delivery zones.
* Availability.
* Checkout.
* Order creation.
* Confirmation page.

---

## Phase 6 — Order Tracking

Implement:

* Order lookup.
* Phone verification.
* Status timeline.

---

## Phase 7 — Admin Dashboard

Implement:

* Admin authentication.
* Dashboard.
* Order management.
* Product management.
* Flavor management.
* Box management.
* Delivery management.
* Availability management.
* Promo management.

---

## Phase 8 — WhatsApp

Implement:

* Order confirmation deep link.
* Dynamic order message.
* Admin/customer communication workflow.

---

## Phase 9 — Event Orders

Implement:

* Event inquiry form.
* Admin event inquiry management.

---

## Phase 10 — Deployment

Deploy:

* React frontend.
* Go backend.
* PostgreSQL.

Configure:

* Environment variables.
* CORS.
* Production logging.
* HTTPS.
* Health checks.

---

# 81. Future Version 2

Potential features:

* Paystack integration.
* Automated WhatsApp notifications.
* Email notifications.
* Customer accounts.
* Customer order history.
* Repeat ordering.
* Saved favorites.
* Advanced coupons.
* Order cancellation rules.
* Refund handling.
* Better analytics.
* Sales reports.

---

# 82. Future Version 3

Potential intelligent features:

* Demand forecasting.
* Customer segmentation.
* Best-selling product analysis.
* Recommended products.
* Sales prediction.
* Automated business reports.
* AI business assistant.
* AI-powered customer support.
* Ingredient/inventory forecasting.

AI should only be introduced where it provides clear business value.

---

# 83. Architectural Principles

The project should follow these principles:

### 1. Backend is authoritative

Never trust frontend pricing, availability, discounts or order totals.

### 2. Database is the source of truth

WhatsApp is a communication channel, not the order database.

### 3. Configuration over hardcoding

Products, prices, availability, delivery zones and promotions should be configurable.

### 4. Simple architecture

Start with a modular monolith.

### 5. Production-quality fundamentals

Prioritize:

* Transactions.
* Validation.
* Idempotency.
* Error handling.
* Security.
* Logging.
* Testing.

### 6. Avoid premature complexity

Do not introduce Kafka, Redis, Kubernetes or microservices simply because they are common in large systems.

---

# 84. MVP Success Metrics

The initial system should measure:

```text
Total Orders
Confirmed Orders
Cancelled Orders
Average Order Value
Daily Revenue
Weekly Revenue
Top Products
Top Flavors
Most Popular Box
Delivery vs Pickup
Promo Usage
Order Completion Rate
```

These metrics can initially be calculated from the database.

A dedicated analytics platform is unnecessary for MVP.

---

# 85. Key Business Rules

1. Customers do not need accounts.
2. Every order gets a unique order number.
3. Orders are created by the backend.
4. Prices are calculated by the backend.
5. Historical prices are snapshotted.
6. Availability is configurable.
7. Bake days are NOT hard-coded.
8. Delivery zones are configurable.
9. Promo codes are validated server-side.
10. WhatsApp is not the source of truth.
11. Duplicate order creation must be prevented.
12. Large event orders use an inquiry workflow.
13. Admin operations require authentication.
14. Database credentials must never reach the frontend.
15. The system should remain a modular monolith during MVP.

---

# 86. Initial Seed Data

## Box Options

```text
Box of 4
Quantity: 4
Price: ₦4,500

Box of 6
Quantity: 6
Price: ₦6,000

Party Box
Quantity: 12
Price: ₦11,500
```

## Flavors

```text
Chocolate Fudge Swirl
Strawberry Dream
Velvet Vanilla Bean
Royal Red Velvet
Cookies & Cream Oreo
```

## Delivery Zones

```text
Nassarawa
Tarauni
GRA
Hotoro
```

## Promotion

```text
Code: KIKI10
Type: Percentage
Discount: 10%
```

These values are seed data and must be editable through the admin system.

---

# 87. Final MVP Architecture

```text
                         ┌──────────────────────┐
                         │      Customer        │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │ React + TypeScript   │
                         │     Frontend         │
                         └──────────┬───────────┘
                                    │
                                  HTTPS
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │       Go API         │
                         │  Modular Monolith    │
                         └──────────┬───────────┘
                                    │
             ┌──────────────────────┼──────────────────────┐
             │                      │                      │
             ▼                      ▼                      ▼
       ┌───────────┐          ┌───────────┐        ┌──────────────┐
       │  Catalog  │          │   Orders  │        │ Availability │
       └───────────┘          └───────────┘        └──────────────┘
             │                      │                      │
             └──────────────────────┼──────────────────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │     PostgreSQL       │
                         └──────────────────────┘

                                    │
                                    ▼
                         ┌──────────────────────┐
                         │      WhatsApp        │
                         │ Communication Layer  │
                         └──────────────────────┘


                         ┌──────────────────────┐
                         │    Admin Dashboard   │
                         └──────────┬───────────┘
                                    │
                                    ▼
                              Go Admin API
```

---

# 88. Definition of Done

The MVP is complete when:

* [ ] Go backend runs locally.
* [ ] PostgreSQL database is connected.
* [ ] Database migrations work.
* [ ] Catalog APIs work.
* [ ] Frontend consumes catalog APIs.
* [ ] Customer can configure a box.
* [ ] Backend validates the box.
* [ ] Backend calculates pricing.
* [ ] Fulfillment availability works.
* [ ] Delivery fees work.
* [ ] Promo codes work.
* [ ] Orders can be created.
* [ ] Idempotency works.
* [ ] Order numbers are generated.
* [ ] Payment records are created.
* [ ] Customer can track orders.
* [ ] WhatsApp confirmation works.
* [ ] Admin authentication works.
* [ ] Admin can manage orders.
* [ ] Admin can manage catalog.
* [ ] Admin can manage availability.
* [ ] Admin can manage delivery zones.
* [ ] Admin can manage promotions.
* [ ] Event inquiries work.
* [ ] Tests cover critical business logic.
* [ ] Production deployment works.
* [ ] HTTPS is enabled.
* [ ] Environment secrets are configured securely.

---

# 89. Product Vision

Kiki & Crumbs should start as a simple bakery ordering system, but the architecture should provide a foundation for a much more intelligent business platform.

The long-term direction is:

```text
Customer
   ↓
Ordering Platform
   ↓
Transactional Data
   ↓
Business Data
   ↓
Analytics
   ↓
Intelligence / AI
   ↓
Business Decisions
```
