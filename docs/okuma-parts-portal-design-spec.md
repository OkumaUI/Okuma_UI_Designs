# Okuma Commerce Parts Portal — Design Specification
**Source:** Figma file `aZCk1TtPRxfpgBzSa0H3ro` (UX-VD — OKUMA)
**Generated:** 2026-06-16
**Purpose:** Complete reference spec for building the Okuma Commerce Parts Portal in Claude Code. Each section can be pasted independently into a Claude Code prompt to build that screen consistently.

---

## How to Use This Spec in Claude Code

Each screen section below is self-contained. When prompting Claude Code to build a screen:

1. **Paste the Design Tokens section** (always include this first)
2. **Paste the Shared Components section** (header, nav, footer, field patterns)
3. **Paste the specific screen section** you are building
4. Add any interaction notes from the section's "Behaviour" subsection

Example prompt structure:
```
Build [Screen Name] using the following design spec.

[Design Tokens]
[Shared Components]
[Screen Section]

Use React + Tailwind. Do not install any new dependencies.
```

---

## 1. Design Tokens

### Colours

```
/* Brand */
--color-primary:       #005EB8   /* Okuma Blue — primary CTAs, active states, links */
--color-dark-blue:     #0B308E   /* Dark blue — Visa brand, strong accent */
--color-warm-black:    #2C2A29   /* Near-black — headings, footer bg */

/* Text */
--color-text-primary:  #1A1A1A   /* Body text black */
--color-text-body:     #4B4B4B   /* Secondary body */
--color-text-label:    #717171   /* Form labels, captions */
--color-text-muted:    #6B7280   /* Muted / inactive labels */
--color-text-light:    #616161   /* Light descriptive text */
--color-text-placeholder: #757575 /* Input placeholders */
--color-text-disabled: #9E9E9E   /* Okuma Grey — disabled, inactive, metadata */

/* Backgrounds */
--color-bg-page:       #F5F5F5   /* Default page background */
--color-bg-alt:        #FAFAFA   /* Subtle alternate background */
--color-bg-soft:       #F7F8F9   /* Card / sidebar backgrounds */
--color-bg-white:      #FFFFFF

/* Borders */
--color-border-default: #E0E0E0
--color-border-light:   #E5E5E5
--color-border-subtle:  #DEDEDE

/* Status */
--color-success:        #2AAB3F   /* In-stock badge */
--color-success-light:  #10B981   /* Stepper complete */
--color-success-muted:  #74AA50   /* Verified badge border/text */
--color-success-bg:     #EBF7F2   /* Verified badge background */
--color-danger:         #AD0000   /* Discounted / sale price */
--color-savings:        #208831   /* Savings amount text */
--color-out-of-stock:   #9BA3AF   /* Out of stock badge */

/* Contextual */
--color-selected-row:   #E5EFF8   /* Table row highlight */
--color-info-bg:        #F0F9FF   /* Info notice background */
--color-info-border:    #BAE6FD   /* Info notice border */
--color-info-text:      #0369A1   /* Info notice text */
--color-delivery-bg:    #F0FDF4   /* Delivery banner background */
--color-delivery-border:#BBF7D0   /* Delivery banner border */
--color-delivery-text:  #166534   /* Delivery banner text */
--color-confirm-teal:   #38B2AC   /* Order confirmed icon border */
--color-confirm-teal-bg:#E6FFFA   /* Order confirmed icon bg */
--color-paypal:         #003087   /* PayPal brand */

/* Shadows */
--shadow-card:          0px 2px 4px rgba(0,0,0,0.08)
--shadow-card-lg:       0px 2px 8px 0px rgba(0,0,0,0.08)
--shadow-modal:         0px 12px 24px rgba(0,0,0,0.25)
--shadow-page-card:     0px 4px 10px rgba(0,0,0,0.06)
```

### Typography

All text uses **Helvetica Neue**. Weight tokens:

| Token | Weight | CSS |
|---|---|---|
| `font-light` | Light | 300 |
| `font-regular` | Regular | 400 |
| `font-medium` | Medium | 500 |
| `font-bold` | Bold | 700 |
| `font-heavy` | Heavy / Black | 900 |

Common type scales:
```
12px Light    → copyright, fine print
12px Bold     → field labels (uppercase), badge text
13px Regular  → footer nav links, metadata
13px Medium   → secondary links, "Back to Login"
14px Regular  → body text, input values, table rows
14px Medium   → helper text, button labels (registration)
14px Bold     → popup part name, stepper labels (active)
15px Bold     → card headings, item names in cart
16px Bold     → primary CTA labels
18px Bold     → "Added to Cart" modal heading
20px Medium   → section headings (registration wizard)
22px Bold     → "Check your inbox"
24px Bold     → Reset Password heading, Registration Submitted heading
24px Heavy    → reference number, order total
32px Heavy    → "Order Confirmed!" heading
```

### Spacing System (common values)
```
4px, 6px, 8px, 10px, 12px, 16px, 20px, 22px, 24px, 32px, 40px, 48px, 64px, 80px
```

### Border Radius
```
2px  → textarea
4px  → inputs, buttons, cards, modals (primary radius)
8px  → Order Summary card
12px → wizard step number circles
24px → pin circles on exploded diagram
32px → icon circles (forgot password)
36px → icon circles (registration submitted)
```

---

## 2. Shared Components

### 2.1 Page Shell (Auth pages — Login, Register, Forgot Password)

```
Layout: flex-col, min-h-screen, justify-between
Background: #F5F5F5

Header:
  pl-80 pt-40
  Logo: Okuma logo 208px wide × 56px tall (top-left)

Content area:
  flex-col items-center
  pb-120 (Login/Forgot Password) or pb-80 (Registration)

Footer:
  bg: #2C2A29
  border-top: 3px solid #005EB8
  px-80 py-40
  gap-32 between logo row and copyright

  Logo row:
    justify-between
    Left: Okuma white logo 120×32
    Right: nav links gap-40, Regular 13px #9E9E9E
      "Privacy Policy" | "Contact Okuma" | "Find a Distributor"

  Copyright:
    Light 12px #757575
    "© 2024 Okuma America Corporation. All rights reserved. Open Possibilities is a trademark of Okuma."
```

### 2.2 Main App Header / Nav (Dashboard, Parts Catalogue, Checkout)

```
Nav bar:
  bg: #FFFFFF
  border-bottom: 1px solid #E0E0E0
  height: 64px
  px-80
  justify-between

Left: Okuma logo
Center: nav links (Regular 14px #4B4B4B) — "My Machines" | "Parts Catalogue" | "Order History"
Right: icons — search, cart (with badge), user avatar

Cart badge: 
  bg #005EB8, white Bold 10px, 16px circle, top-right of cart icon
```

### 2.3 Standard Form Field

```
Label:
  Bold 12px #2C2A29 UPPERCASE
  margin-bottom: 6px

Input:
  height: 48px
  border: 1px solid #9E9E9E
  border-radius: 4px
  padding: 0 16px
  font: Regular 14px
  placeholder color: #757575

Focus state:
  border: 2px solid #005EB8 (inferred — apply consistently)

Error state:
  border: 2px solid #AD0000
  error text: Regular 12px #AD0000 below field

Verified state (machine serial):
  border: 1px solid #74AA50

Password field:
  Eye icon 20px on right side (toggle show/hide)
```

### 2.4 Primary Button

```
bg: #005EB8
height: 48px (registration) / 56px (checkout CTAs)
border-radius: 4px
font: Bold 16px white
width: full (most contexts) or fixed (modal CTAs)
letter-spacing: 0.7px (registration flow buttons)
```

### 2.5 Ghost / Outline Button

```
border: 1px solid #005EB8
bg: transparent
color: #005EB8
height: 48px
border-radius: 4px
font: Bold 14–16px
```

### 2.6 Back Link

```
"← Back" or "← Back to Login"
font: Medium 13px #005EB8
margin-top: 16px
No border, no background
```

### 2.7 Registration Wizard Step Indicator

```
Container: h-80, border-b #E0E0E0, px-40, justify-between, bg white

Each step:
  flex items-center gap-10

  Number circle (24×24, border-radius 12px):
    Active:   bg #005EB8, Bold 11px white
    Inactive: bg #F5F5F5, Bold 11px rgba(49,52,64,0.7)

  Label (Bold 11px UPPERCASE):
    Active:   #005EB8
    Inactive: rgba(49,52,64,0.7)

Steps: 1 COMPANY DETAILS | 2 MACHINE VERIFICATION | 3 ACCOUNT TYPE | 4 UPLOAD DOCUMENTS
```

### 2.8 Checkout Stepper

```
Container: py-40, justify-between, steps connected by 60px lines

Each step:
  Circle (24×24):
    Inactive:  white bg, border #9E9E9E, number #9E9E9E Regular
    Active:    bg #005EB8, white number
    Complete:  bg #10B981, white check icon 12px

  Label (14px):
    Inactive:  Medium #6B7280
    Active:    Bold #005EB8

  Connector line (60px):
    Before active: #E5E5E5
    After complete: #005EB8

Steps: Shipping → Payment → Review → Confirmation
```

### 2.9 Order Summary Sidebar (Checkout — shared across all steps)

```
Width: 440px
Position: right column

Order Summary card:
  border: 1px solid #2C2A29
  border-radius: 8px
  padding: 24px

  "Edit Cart" link: Regular 13px #005EB8 (top right)
  Line items: thumbnail 48×48, name Bold 14px, discount price #208831
  Subtotal / Shipping / Tax rows: Regular 14px, justify-between
  Total: Heavy 24px #005EB8

  Encryption notice:
    shield icon + Regular 12px #6B7280
    "Your transaction is secured with SSL encryption"

Need Help card:
  bg #F7F8F9
  phone icon + Bold 14px #2C2A29 phone number
  Regular 13px #6B7280 hours
```

### 2.10 Radio Card (Shipping method / Payment method)

```
Selected:
  border: 2px solid #005EB8
  bg: white
  radio dot: filled #005EB8 (border-6 inner dot)

Unselected:
  border: 1px solid #E5E5E5
  bg: white (or #F7F8F9 for payment option)
  radio: border #9E9E9E, empty
  opacity: 1 (or 0.7 for collapsed payment option)
```

---

## 3. Screens

---

### SCREEN 1 — Login
**Node:** `200:5447` | **Route:** `/login`

#### Layout
```
Auth page shell (see 2.1)
Content card:
  width: 480px
  padding: 40px
  bg: white
  shadow: var(--shadow-card)
  border-radius: 4px
```

#### Components
```
Title section:
  "Welcome Back" — Bold 28px #2C2A29
  "Sign in to access your parts catalogue and order history."
    Regular 15px #757575 line-height 1.5

Email field: standard form field (see 2.3)
  label: "Email Address"
  placeholder: "name@company.com"

Password field: standard form field with eye icon
  label: "Password"
  placeholder: "••••••••"

"Forgot Password?" link:
  Regular 13px #005EB8
  align: right, below password field
  margin-top: 8px

Primary CTA:
  "Sign In" — see 2.4, h-48, full width

Divider:
  "or" — Regular 13px #9E9E9E, centered with lines either side

Register CTA:
  "Create Account" — ghost button (see 2.5), full width

Bottom text:
  Regular 13px #757575 centered
  "Don't have an account? " + "Request Access" (Medium 13px #005EB8)
```

#### Behaviour
- Email and password are required; show inline error on blur if empty
- "Forgot Password?" → navigates to Forgot Password flow (Screen A)
- "Sign In" success → Dashboard (Screen 2)
- "Create Account" → Registration flow (Screen C)

---

### SCREEN 2 — Dashboard
**Node:** `128:2320` | **Route:** `/dashboard`

#### Layout
```
Main app shell with nav (see 2.2)
Page background: #F5F5F5
Content: px-80 py-40
Two-column layout:
  Left (main): flex-col gap-32
  Right (sidebar): 360px, gap-24
```

#### Components
```
Welcome banner:
  bg white, p-32, radius 4px, shadow var(--shadow-card)
  "Welcome back, [Name]" — Bold 24px #2C2A29
  subtitle Regular 15px #757575

My Registered Machines section:
  Heading: Bold 16px #2C2A29 "My Registered Machines"
  Machine card (per machine):
    bg white, p-24, radius 4px, border #E0E0E0
    Machine model: Bold 15px #2C2A29
    Serial number: Regular 13px #9E9E9E
    "Verified" badge: Regular 11px #74AA50, bg #EBF7F2, border #74AA50, px-8 py-2 radius 12px
    "Browse Parts Book" CTA: ghost button (see 2.5), h-40, w-full

Recent Orders section:
  Table: Part# | Description | Date | Status | Total
  Status badges: "Processing" #005EB8 bg tint | "Shipped" #2AAB3F bg tint | "Delivered" #10B981
```

#### Behaviour
- "Browse Parts Book" on any machine card → opens Browse Parts Book modal (Screen 3a)

---

### SCREEN 3a — Browse Parts Book Modal
**Node:** `181:13750` | **Trigger:** "Browse Parts Book" button on Dashboard

#### Layout
```
Overlay: rgba(0,0,0,0.5) full-screen
Modal:
  width: 640px
  bg: white
  border-radius: 4px
  shadow: var(--shadow-modal)
  padding: 40px
  position: centered (top ~15% from viewport top)
```

#### Components
```
Header:
  "Browse Parts Book" — Bold 20px #2C2A29
  X close button — top-right, 24px icon, #9E9E9E

Machine context:
  machine model Bold 15px #2C2A29
  serial Regular 13px #9E9E9E
  "Verified" badge (see Dashboard badge style)

Instruction text:
  Regular 14px #757575
  "Select a Parts Book to view the exploded diagram and order components."

Parts Book list:
  Each row: border-b #E0E0E0, py-16, justify-between
    Left: book icon + Bold 14px #2C2A29 title + Regular 13px #9E9E9E subtitle
    Right: chevron-right #9E9E9E

"Proceed" CTA:
  Primary button (see 2.4), full width, h-48
  "Proceed to Parts Catalogue →"
```

#### Behaviour
- X or click-outside closes modal
- "Proceed" → Parts Catalogue (Screen 3b, empty state)

---

### SCREEN 3b — Parts Catalogue (Empty State)
**Node:** `199:2128` | **Route:** `/parts-catalogue`

#### Layout
```
Main app shell with nav
Content: px-80 py-40
Two sections stacked:
  Top: 4-dropdown filter bar
  Bottom: Exploded diagram viewer + parts table (locked until all dropdowns selected)
```

#### Components
```
Page title: Bold 24px #2C2A29 "Parts Catalogue"
Machine context bar: machine name + serial, Regular 14px #9E9E9E

Filter bar (4 cascading dropdowns in a row, gap-16):
  Each dropdown:
    label: Bold 12px #2C2A29 UPPERCASE
    trigger: h-48 border #9E9E9E radius 4px px-16
      placeholder text: Regular 14px #757575
      chevron-down icon right
    Order: "Parts Book" → "Group" → "Sub Group" → "Sheet"

Exploded diagram viewer (locked state):
  Container: bg white border #E0E0E0 radius 4px
  Height: ~480px
  Overlay: semi-transparent bg-white/80
  Lock message: centered, lock icon + Bold 15px #9E9E9E
    "Select all filters above to unlock the parts diagram"

Parts table (locked state):
  Same overlay treatment, table headers visible but rows blurred/empty
```

#### Behaviour
- Dropdowns cascade — each unlocks only after prior is selected
- All 4 selected → overlay removes, viewer and table become interactive
- See Screens 3c and 3d for progressive states

---

### SCREEN 3c — Parts Catalogue (Dropdown States 2–3)
**Nodes:** `200:4103`, `200:4244`

```
State after "Parts Book" selected (node 4103):
  - "Parts Book" dropdown shows selected value, Bold 14px #2C2A29
  - "Group" dropdown unlocks (border #9E9E9E, placeholder visible)
  - "Sub Group" and "Sheet" remain disabled (bg #F5F5F5, opacity 0.5)

State after "Group" selected (node 4244):
  - "Group" shows selected value
  - "Sub Group" unlocks
  - "Sheet" still disabled

Viewer and table remain locked until all 4 are selected.
```

---

### SCREEN 3d — Parts Catalogue (Fully Active)
**Node:** `200:3785`

#### Exploded Diagram Viewer
```
Container:
  bg white, border #E0E0E0, radius 4px
  overflow: hidden (image clips to container)

Zoom controls (top-right corner):
  Two buttons stacked: "+" and "−"
  Each: 32×32, white bg, border #0B308E, Bold 16px #0B308E
  Functionality: zoom in/out on image, min 100% max ~400%

Pan:
  When zoomed in: click-drag to pan image within container
  Cursor: grab (idle) / grabbing (dragging)

Part number pins (overlaid on image):
  In-stock: 24px circle bg #005EB8, Bold 11px white number, cursor pointer
  Out-of-stock: 24px circle bg #9E9E9E, Bold 11px white number, cursor pointer
  Hover: scale 1.1 (inferred)
```

#### Part Popup (on pin click)
```
Container:
  bg: #2C2A29
  padding: 12px 16px
  border-radius: 4px
  min-width: 200px
  shadow: var(--shadow-modal)
  position: absolute, offset from pin

Contents:
  Part number: Bold 14px white
  Description: Regular 14px white, margin-top 4px
  Quantity stepper:
    height: 24px
    "−" | [qty] | "+" — Regular 14px white
    border: 1px solid rgba(255,255,255,0.3)
    border-radius: 2px

  "Add To Cart" button:
    bg: #005EB8
    width: 127px, height: 32px
    Bold 12px white, border-radius: 4px
    margin-top: 8px
```

#### Parts Table (bottom section)
```
Columns: Part# | Part Name | Description | Compatibility | Unit Price | Available | Qty | Action

Row:
  height: 48px
  border-b: #E0E0E0
  font: Regular 14px #1A1A1A

Selected row (matches active pin):
  bg: #E5EFF8

Availability badges:
  In Stock:    bg #2AAB3F (or tint), Regular 12px white, px-8 py-2 radius 12px
  Out of Stock: bg #9BA3AF, Regular 12px white, px-8 py-2 radius 12px

Action column:
  In-stock:    "Add To Cart"  — Medium 13px #005EB8, no border
  Out-of-stock: "Add To Quote" — Medium 13px #005EB8, no border

Table header:
  Bold 11px #717171 UPPERCASE, bg #F7F8F9, height 40px
```

#### Behaviour
- Click a pin → shows popup + highlights matching table row
- Click table row → highlights row + scrolls diagram to matching pin
- "Add To Cart" (popup or table) → Add to Cart modal (Screen 4)
- "Add To Quote" → adds to quote list (separate flow)

---

### SCREEN 4 — Add to Cart Modal
**Node:** `200:4721` | **Trigger:** "Add To Cart" action

#### Layout
```
Overlay: rgba(0,0,0,0.5) full-screen
Modal:
  width: 560px
  bg: white
  border-radius: 4px
  shadow: var(--shadow-modal)
  overflow: hidden
```

#### Components
```
Modal header:
  bg: #005EB8
  height: 56px
  px-24
  Layout: flex items-center gap-12
  Left: check-circle icon 20px white + "Added to Cart" Bold 18px white
  Right: X close button white

Modal body: p-24, gap-20

Part summary row:
  Thumbnail: 120×120, bg #F5F5F5, border-radius 4px, object-fit contain
  Right of thumbnail:
    Part name: Bold 16px #2C2A29
    Part number: Regular 13px #9E9E9E, margin-top 4px
    Qty stepper: same pattern as popup stepper, h-32
    Price row:
      Strikethrough original: Regular 16px #9E9E9E line-through
      Discounted total: Bold 16px #AD0000, margin-left 8px

Divider: 1px #E0E0E0

Cart summary row:
  Left: "[3] items in cart" — Regular 14px #4B4B4B
  Right: "Subtotal: $495.00" — Bold 14px #2C2A29

CTA row (gap-12):
  "Continue Shopping" — ghost button (see 2.5), flex-1, h-48
  "View Cart"         — primary button (see 2.4), flex-1, h-48
```

#### Behaviour
- X or "Continue Shopping" → closes modal, returns to Parts Catalogue
- "View Cart" → navigates to Cart page (Screen 5)

---

### SCREEN 5 — Cart Page
**Node:** `128:3660` | **Route:** `/cart`

#### Layout
```
Main app shell
Content: px-80 py-40
Two-column:
  Left (cart items): flex-1
  Right (order summary): 440px — see shared component 2.9
```

#### Components
```
Page title: Bold 24px #2C2A29 "Your Cart"

Cart item row:
  border-b: #E0E0E0
  padding: 20px 0
  Layout: flex gap-16 items-start

  Thumbnail: 80×80, bg #F5F5F5, border-radius 4px
  Info column:
    Name: Bold 15px #2C2A29
    Part#: Regular 12px #9E9E9E, margin-top 2px
    Machine tag: bg tint #005EB8, Medium 10px #005EB8, px-6 py-1 radius 4px
  Price: Bold 14px #2C2A29 (or strikethrough Regular 14px #9E9E9E + Bold #AD0000)
  Qty stepper:
    h-36, border #E0E0E0, radius 4px
    "−" [number] "+" Regular 14px #2C2A29
  Row total: Bold 14px #2C2A29 (or #AD0000 if discounted)
  Trash icon: 20px #9E9E9E, hover #AD0000

Order Summary (right sidebar — see 2.9):
  Additional elements on cart page:
    Coupon input:
      h-40 border #E0E0E0 placeholder "Enter coupon code"
      "Apply" button: bg #005EB8 h-40 px-16 Bold 13px white, radius right side only

  "Proceed To Checkout" — primary button h-56 Heavy 16px
  "Request a Quote instead →" — Regular 14px #005EB8 link, centered below CTA

  Payment icons row:
    Visa (bg #0B308E text) | Mastercard | VISA | PayPal (border #003087)
```

#### Behaviour
- Qty stepper updates row total and order summary totals in real time
- Trash icon removes item (confirm on mobile; immediate on desktop)
- "Proceed To Checkout" → Checkout: Shipping (Screen 6)
- Coupon "Apply" → validates and shows discount or error inline

---

### SCREEN 6 — Checkout: Shipping
**Node:** `128:3794` | **Route:** `/checkout/shipping`

#### Layout
```
Main app shell
Checkout stepper at top (Step 1 active — see 2.8)
Content: px-80 py-40, two-column
  Left (main): flex-1, gap-32
  Right: Order Summary sidebar 440px (see 2.9)
```

#### Components
```
Section: Saved Addresses

  Each address radio card:
    border-radius: 4px, padding: 20px, margin-bottom: 12px
    Selected: border-2 #005EB8, radio dot filled #005EB8
    Unselected: border #E5E5E5, radio border #9E9E9E
    Content: Bold 14px #2C2A29 name, Regular 14px #4B4B4B address lines

  "+ Add New Address" link: Medium 14px #005EB8

Section: Shipping Method

  Each method radio card (same selected/unselected pattern):
    Left: icon (truck or plane) + method name Bold 14px + estimated days Regular 13px #9E9E9E
    Right: price Bold 14px #2C2A29 (or "Free" in #2AAB3F)

  Options:
    Standard Ground  truck  5–7 business days   Free
    Express Shipping truck  2–3 business days   $24.99   ← default selected
    Overnight        plane  1 business day       $49.99

Section: Special Instructions
  Textarea:
    border: #9E9E9E, height: 100px, border-radius: 2px
    placeholder Regular 14px #757575

CTA block:
  "Continue to Payment Details →" — primary h-56 Bold 16px, full width
  "Back to Parts Book" — ghost button h-48, full width, margin-top 12px
```

---

### SCREEN 7a — Checkout: Payment (Credit Card)
**Node:** `128:3930` | **Route:** `/checkout/payment`

#### Layout
```
Checkout stepper (Step 2 active)
Left column gap-16
```

#### Components
```
Payment option: Credit / Debit Card
  Radio card — selected, border-2 #005EB8, expanded
  Fields within card:
    Card Number: value "•••• •••• •••• 4521"
    Expiration (MM/YY) + CVV (side by side, gap-16)
    Cardholder Name: value "JAMES R. WAREHOUSE"
    Checkbox: "Billing address same as shipping address"
      checkbox bg #005EB8 when checked, 18×18 radius 3px

Security notice:
  bg: #F0F9FF, border: #BAE6FD, radius 4px, p-12
  shield-check icon + Regular 13px #0369A1
  "Your payment is processed securely. We never store your card details."

Payment option: Purchase Order
  Radio card — unselected, border #E5E5E5, bg #F7F8F9, opacity 0.7, collapsed
  Shows: PO label + radio button only

CTA: "Continue to Review Order →" — primary h-56 Bold 16px
```

---

### SCREEN 7b — Checkout: Payment (Purchase Order)
**Node:** `191:16223`

```
Credit Card option: collapsed, unselected (border #E5E5E5)

Purchase Order option: selected (border-2 #005EB8), expanded
  Field: "Enter PO Number"
    label: Bold 12px #2C2A29 UPPERCASE
    value: "123456789"
    border: #9E9E9E h-48

CTA identical to 7a.
```

---

### SCREEN 8 — Checkout: Review Order
**Node:** `128:4061` | **Route:** `/checkout/review`

#### Layout
```
Checkout stepper (Step 3 active)
Left column: gap-24
```

#### Components
```
Shipping Summary card:
  bg white, border #E0E0E0, radius 4px, p-20
  Header: Bold 14px #2C2A29 "Shipping Details" + "Edit" link Regular 13px #005EB8
  Content: warehouse name Bold 14px, address Regular 14px #4B4B4B
  Method: truck icon + Bold 13px "Express Shipping — 2–3 days"

Payment Summary card:
  Same card treatment
  Card icon + "Visa ending in 4521" Bold 14px
  Expiry + billing address Regular 13px #9E9E9E

Order Items list:
  Each row (border-b #E0E0E0, py-12):
    Thumbnail: 60×60, bg #F5F5F5, radius 4px
    Name + Part# column
    Qty: Regular 14px #4B4B4B
    Price: Bold 15px #2C2A29

  Sample items:
    Spindle Bearing     Qty 1   $315.00
    O-Ring Seal Kit     Qty 2   $42.50
    Servo Drive Unit    Qty 1   $342.50

Terms row:
  Checkbox: 18×18, checked bg #005EB8, border-radius 3px
  Text: Regular 13px #4B4B4B
  Links: Medium 13px #005EB8 underline ("Terms of Service", "Privacy Policy")

CTA: "Place Order" — primary h-56 Heavy 18px, full width
```

---

### SCREEN 9 — Order Confirmation
**Node:** `128:4202` | **Route:** `/checkout/confirmation`

#### Layout
```
Page bg: #F7F8F9
Centered white card:
  width: 720px
  padding: 64px
  border-radius: 8px
  shadow: var(--shadow-page-card)
```

#### Components
```
Confirmation icon:
  80×80 circle
  bg: #E6FFFA
  border: 2px solid #38B2AC
  border-radius: 50%
  Check icon: 40px #38B2AC

Title: Heavy 32px #2C2A29 "Order Confirmed!" centered, margin-top 24px

Reference number block:
  bg: #005EB8
  padding: 24px
  border-radius: 4px
  margin: 20px 0
  "REFERENCE NUMBER" — Bold 12px white opacity 70%
  "#OKU-2026-00421" — Heavy 24px white

Delivery estimate banner:
  bg: #F0FDF4, border: #BBF7D0, radius 4px, p-16
  Calendar icon + Bold 15px #166534
  e.g. "Estimated delivery: June 23–25, 2026"

Shipping address block:
  Bold 14px #2C2A29 heading + Regular 14px #4B4B4B address

Order summary (simplified):
  Rows: Items / Shipping / Tax / Discount — Regular 14px justify-between
  Total Charged:
    Label Heavy 18px #2C2A29
    Amount Heavy 20px #005EB8

CTA row (gap-16):
  "View Order Details"   — primary h-48 flex-1
  "Continue Shopping"    — ghost h-48 flex-1

"Download Order Confirmation PDF" link:
  Regular 14px #005EB8 underline + download icon
  centered, margin-top 20px
```

---

### SCREEN A — Forgot Password: Request
**Node:** `200:6032` | **Route:** `/forgot-password`

#### Layout
```
Auth page shell (see 2.1)
Centered card: 480px wide, padding: 40px, shadow var(--shadow-card), radius 4px
```

#### Components
```
"← Back to Login":
  arrow-left-to-line icon 16px + Medium 14px #005EB8
  margin-bottom: 32px

Title: Bold 24px #2C2A29 "Reset Your Password"
Body: Light 15px #757575 line-height 1.5
  "Enter your registered email address and we'll send you a link to reset your password."

Email field: standard (see 2.3)
  label: "Email Address", placeholder: "name@company.com"

CTA: "Send Reset Link" — primary h-48, full width
```

#### Behaviour
- "← Back to Login" → Login (Screen 1)
- Submit → navigate to Check Inbox state (Screen B)

---

### SCREEN B — Forgot Password: Check Inbox
**Node:** `200:6086`

#### Layout
```
Auth page shell
Centered card: 480px wide, padding: 48px
```

#### Components
```
"← Back to Login" (left-arrow icon + Regular 13px #005EB8)

Envelope icon:
  64×64 circle bg #F0F6FF radius 32px
  28px envelope icon inside, centered

Heading row (centered):
  green check-circle icon 20px + Bold 22px #2C2A29 "Check your inbox"
  margin-top: 24px

Body (centered):
  Regular 14px #9E9E9E line-height 1.7
  "A reset link has been sent to [email bold #2C2A29]."
  "Check your inbox and follow the instructions."

"Resend email":
  Medium 14px #005EB8, text link, no border, centered
  margin-top: 32px
```

#### Behaviour
- "← Back to Login" → Login
- "Resend email" → re-triggers API call, shows brief "Sent!" confirmation inline

---

### SCREEN C — Registration: Step 1 Company Details
**Node:** `200:5502` | **Route:** `/register`

#### Layout
```
Auth page shell (pb-80)
Wizard card: 720px, shadow var(--shadow-card-lg), overflow-hidden, radius 4px
  Wizard step header (see 2.7) — Step 1 active
  Body: p-40, gap-32
```

#### Components
```
Section title: Medium 20px #2C2A29 "Company Details"

Fields (all use standard form field pattern — see 2.3):

Row 1 (2-col gap-20):  First Name | Last Name
Full width:            Job Title (placeholder "e.g. Purchasing Manager")
Full width:            Company Name (placeholder "Legal Entity Name")
Full width:            Company Address Line 1 (placeholder "Street Address")
Full width:            Address Line 2 (placeholder "Suite, Unit, etc.")
Row 2 (3-col gap-20):  City | State/Province | ZIP/Postal Code
Row 3 (2-col gap-20):  Country (default "United States") | Phone Number (placeholder "+1 (___) ___-____")
Full width:            Email Address (placeholder "name@company.com")
Row 4 (2-col gap-20):  Password (with eye icon) | Confirm Password (with eye icon)

CTA: "Next: Machine Verification" — primary h-48, full width
Back link: "← Back" Medium 13px #005EB8, margin-top 16px
```

---

### SCREEN D — Registration: Step 2 Machine Verification (Empty)
**Node:** `200:5632`

#### Components
```
Wizard step header — Step 2 active
Section title: Medium 20px #2C2A29 "Machine Verification"
Helper text: Regular 14px #9E9E9E
  "Enter the serial number(s) of your Okuma machine(s) to link them to your account."

Serial input row (gap-8, margin-top 24px):
  Input: flex-1, h-48, border #9E9E9E, radius 4px
    placeholder "e.g. OKU-2019-M56-0421"
  "VERIFY" button:
    border-2 #005EB8, h-48, px-22, Bold 13px #005EB8, radius 4px, bg transparent

"+ Add another machine":
  plus icon 16px + Medium 14px #005EB8 link
  margin-top: 16px

CTA: "Next: Account Type" — primary h-48 full-width, margin-top 32px
Back link below CTA
```

---

### SCREEN E — Registration: Step 2 Machine Verification (Verified State)
**Node:** `200:5939`

```
Same as Screen D but shows verified entry for first machine:

Verified input:
  border: 1px solid #74AA50
  Remove button replaces VERIFY: 48×48 bg #F5F5F5 radius 4px, X icon 16px

Verified confirmation (below input, gap-8, margin-top 8px):
  check icon 14px #74AA50 + Medium 13px #74AA50
  "LB2000 EX III — Verified ✓"

Second empty row shown with "VERIFY" button still available.
"+ Add another machine" link remains.
```

---

### SCREEN F — Registration: Step 3 Account Type
**Node:** `200:5711`

#### Components
```
Wizard step header — Step 3 active
Section title: Medium 20px #2C2A29 "Account Type"
Helper text: Regular 14px #9E9E9E
  "Select the role that best describes how you'll use this portal."

Role cards (3-col, gap-16, margin: 24px 0 32px):
  Each card: bg white, border-2 #E0E0E0 (unselected), radius 4px, p-22
  Selected: border-2 #005EB8

  Card internals (top to bottom):
    Emoji icon (28px text)
    Name: Bold 15px #2C2A29, margin-top 10px
    Description: Regular 12px #9E9E9E, width 154px, line-height 1.5, margin-top 6px
    Radio circle: 18×18, border-2 #9E9E9E (unselected) / filled #005EB8 (selected), radius 9px, margin-top 12px

  Roles:
    🔑 Admin       "Full access. Manage users, orders and account settings."
    🔧 Technician  "Browse parts catalogues and place orders."
    👁  Viewer     "View orders and catalogues only. No ordering access."

CTA: "Next: Upload Documents" — primary h-48, full width, tracking-[0.7px]
Back link below
```

---

### SCREEN G — Registration: Step 4 Upload Documents
**Node:** `200:5806`

#### Components
```
Wizard step header — Step 4 active
Section title: Medium 20px #2C2A29 "Upload Documents"
Body text:
  Regular 14px #9E9E9E "Upload your machine purchase documentation for account verification."
  Bold 14px #2C2A29 "Accepted formats: PDF, JPG, PNG."

Drag & drop zone:
  bg: #FAFAFA
  border: 2px dashed #9E9E9E
  border-radius: 4px
  padding: 42px 26px
  Upload cloud icon: 40px, centered horizontally
  "Drag and drop files here" — Medium 15px #2C2A29 centered, margin-top 12px
  "or click to browse" — Regular 13px #9E9E9E centered, margin-top 6px
  Entire zone is clickable (file picker trigger)

  Active/dragover state: border-color #005EB8, bg #F0F6FF (inferred)

  Uploaded file row (when file added):
    file icon + filename Medium 14px #2C2A29 + filesize Regular 13px #9E9E9E + X remove

CTA: "Submit Registration" — primary h-48 full-width, tracking-[0.7px]

Terms line (margin-top 16px, centered):
  Regular 12px #9E9E9E
  "By registering you agree to our Terms of Service and Privacy Policy"
  Links: #005EB8 underline

Back link below
```

---

### SCREEN H — Registration: Step 5 Submitted
**Node:** `200:5886`

#### Layout
```
Auth page shell
Centered card: 560px wide, padding: 48px, shadow var(--shadow-card)
No wizard header
```

#### Components
```
Icon circle:
  72×72, bg #F0F6FF, radius 36px
  36px blue check-circle icon inside, centered

Title: Bold 24px #2C2A29 "Registration Submitted!" centered, margin-top 24px

Info box:
  bg: #F0F6FF
  border: 1px solid #005EB8
  border-radius: 4px
  padding: 17px
  margin: 12px 0 24px
  Regular 14px #2C2A29 centered, max-width 430px
  "We'll review your details and send a confirmation to your email within 1 business day."

CTA: "Back To Login"
  bg #005EB8, h-45, width ~185px, centered (not full-width)
  Bold 14px white, tracking-[0.7px], radius 4px
```

---

## 4. Component Pattern Quick Reference

| Pattern | Where Used | Key Spec |
|---|---|---|
| Primary CTA | All screens | bg `#005EB8`, h-48 (auth) / h-56 (checkout), Bold 16px white |
| Ghost CTA | Cart, Checkout, Modals | border `#005EB8`, text `#005EB8` |
| Form field | Login, Register, Checkout | h-48, border `#9E9E9E`, label Bold 12px uppercase |
| Radio card | Shipping, Payment | selected: border-2 `#005EB8`; unselected: border `#E5E5E5` |
| Role card | Registration Step 3 | border-2, emoji + name + description + radio, p-22 |
| Wizard step indicator | Registration | 24px circles, `#005EB8` active, `#F5F5F5` inactive |
| Checkout stepper | Cart → Confirm | circles + connector lines, complete = `#10B981` |
| Exploded diagram viewer | Parts Catalogue | zoom +/−, pan, numbered pins |
| Part popup | Parts Catalogue | bg `#2C2A29`, white text, qty stepper, Add To Cart |
| In-stock badge | Parts table | bg `#2AAB3F` pill |
| Out-of-stock badge | Parts table | bg `#9BA3AF` pill |
| Verified badge | Dashboard, Machine Verify | border/text `#74AA50`, bg `#EBF7F2` |
| Order Summary sidebar | Checkout (all steps) | 440px, border `#2C2A29`, radius 8px |
| Drag & drop zone | Registration Step 4 | dashed border `#9E9E9E`, bg `#FAFAFA` |
| Add to Cart modal | Parts Catalogue | 560px, header bg `#005EB8`, part detail + cart summary |
| Info notice | Payment step | bg `#F0F9FF`, border `#BAE6FD`, text `#0369A1` |
| Delivery banner | Confirmation | bg `#F0FDF4`, border `#BBF7D0`, text `#166534` |

---

## 5. User Flow Map

```
/login ──────────────────────────────────────────────── (existing user)
  │
  ├── Forgot Password? ──→ /forgot-password ──→ Check Inbox ──→ (email link)
  │
  └── Create Account? ──→ /register ──→ Step 1: Company Details
                                              ↓
                                        Step 2: Machine Verification
                                              ↓
                                        Step 3: Account Type
                                              ↓
                                        Step 4: Upload Documents
                                              ↓
                                        Registration Submitted ──→ /login


/dashboard (post-login)
  │
  └── Browse Parts Book (on machine card)
        ↓
      Browse Parts Book Modal
        ↓ Proceed
      /parts-catalogue (empty state)
        ↓ Select all 4 dropdowns
      Parts Catalogue (active — exploded view + table)
        ↓ Add To Cart (pin popup or table row)
      Add To Cart Modal
        ↓ View Cart
      /cart
        ↓ Proceed To Checkout
      /checkout/shipping  [Stepper Step 1]
        ↓
      /checkout/payment   [Stepper Step 2]
        ↓
      /checkout/review    [Stepper Step 3]
        ↓ Place Order
      /checkout/confirmation [Stepper Step 4 — complete]
```

---

## 6. Footer (all pages)

```
bg: #2C2A29
border-top: 3px solid #005EB8
px: 80px, py: 40px
gap: 32px (between logo row and copyright)

Logo row:
  Left: Okuma white logo 120×32
  Right: links gap-40, Regular 13px #9E9E9E
    "Privacy Policy" | "Contact Okuma" | "Find a Distributor"

Copyright:
  Light 12px #757575
  "© 2024 Okuma America Corporation. All rights reserved. Open Possibilities is a trademark of Okuma."
```

---

*End of spec. All values sourced directly from Figma file `aZCk1TtPRxfpgBzSa0H3ro` (UX-VD — OKUMA). Do not distribute externally.*
