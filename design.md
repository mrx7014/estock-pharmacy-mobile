# eStock Pharmacy Mobile Interface Design

## Product intent

eStock Pharmacy is a portrait-first operations companion for pharmacy owners and staff. The app prioritizes one-handed review of stock health, fast product lookup, and clear actions for inventory, sales, and purchasing. Arabic labels are supported for user-entered names, while the recovered English product and manufacturer fields are shown wherever the backup contains reliable values. Literal `?` values from the source backup are never displayed.

## Screen list

| Screen | Primary content and functionality |
|---|---|
| **Dashboard** | Today’s sales, low-stock count, expiring-soon count, purchase spend, branch selector, and quick actions for product lookup, receive stock, and stock adjustment. |
| **Inventory** | Search by English trade name, composition, barcode, or SKU; filter by branch, category, manufacturer, stock status, and expiry; compact product cards showing available quantity, sell price, and nearest expiry. |
| **Product detail** | Product identity, English name, editable Arabic name, composition, barcode, group, manufacturer, dosage/form, branch stock, batch expiry, cost/sell prices, suppliers, and audit history. |
| **Sales** | Sales summary, recent invoices, invoice total/date/cashier, and drill-down to line items. Includes lightweight date and branch filters. |
| **Purchasing** | Purchase summary, recent supplier invoices, supplier/product line items, and an action path to record a received purchase locally. |
| **Operations** | Stock adjustments, expiring batches, low-stock queue, and import status. Each operational list links to the relevant product or invoice context. |
| **Settings** | Manual branch naming, data refresh/import controls, display preferences, and source-data notes explaining incomplete Arabic fields. |
| **Invoice detail** | Header metadata plus line-item list with product, quantity, prices, totals, branch, and operation date. |

## Key user flows

### Review stock health

1. User opens **Dashboard** and sees low-stock and expiring-soon counts.
2. User taps a metric card to open the corresponding filtered **Inventory** or **Operations** list.
3. User taps a product row to open **Product detail**.
4. User reviews branch-level quantities and batch expiry, then returns using the native back affordance.

### Find a product quickly

1. User opens **Inventory**.
2. User enters a barcode, English name, composition, or SKU into the search field.
3. The list updates immediately and preserves the selected branch/filter state.
4. User opens the product detail and can edit the missing Arabic name locally.

### Review a sale

1. User opens **Sales** and optionally changes the branch/date filter.
2. User taps an invoice row.
3. **Invoice detail** shows the header total and its related line items.
4. User taps a line item to view the associated product detail.

### Receive or adjust inventory

1. User opens **Operations** and chooses **Stock adjustment** or **Receive stock**.
2. User searches for a product and selects a branch.
3. User enters quantity, optional batch expiry, and the relevant cost/sell values.
4. User saves the local action and receives visible confirmation; the dashboard metrics update from the local state.

### Rename recovered branches

1. User opens **Settings**.
2. User selects a recovered branch whose source name is unavailable.
3. User replaces the blank source name with a meaningful local name such as “Main Branch”.
4. The new label appears in branch selectors and inventory cards.

## Visual system

The visual direction uses a calm clinical navy with a mint-green operational accent. The background is a warm near-white, surfaces are white, and warning/error colors are reserved for stock risk and expiry states. Typography follows mainstream iOS patterns: large navigation title, semibold card headings, readable secondary metadata, and generous touch targets.

| Token | Light mode value | Intended use |
|---|---|---|
| Primary navy | `#153B50` | Navigation emphasis, main CTAs, dashboard hero |
| Mint accent | `#2BBFA3` | Active states, healthy stock, key metrics |
| Background | `#F6F8F7` | App canvas |
| Surface | `#FFFFFF` | Cards, sheets, list rows |
| Text | `#17323D` | Primary content |
| Muted text | `#70838B` | Supporting metadata |
| Border | `#DCE7E4` | Dividers and controls |
| Warning amber | `#D99524` | Expiring soon / attention |
| Error coral | `#D95F59` | Out of stock / data issue |

## Interaction and accessibility

All primary actions use a minimum 44-point touch target, visible pressed feedback, and concise confirmation states. Lists use native virtualized list patterns. The app remains usable with large text, does not rely on color alone for stock status, and uses explicit text labels such as “Low stock”, “Expiring soon”, and “Out of stock”.

## Data boundaries

The backup is treated as a local source snapshot. Products, product amounts, product vendors, sales, purchases, lookup tables, customers, vendors, stores, and audit records are modeled from the supplied CSVs. Arabic values that are literal question marks are normalized to empty strings. The initial app ships with a representative embedded dataset for fast interaction and an import/status experience that documents the full backup scale and the need for background import in a production sync pipeline.
