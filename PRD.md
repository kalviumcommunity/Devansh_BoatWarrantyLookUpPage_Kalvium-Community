## Warranty Lookup Page - PRD

Date: 18 Aug 2026
Figma: https://www.figma.com/design/KRHLRRjewSbQz8aD12DzkT/Untitled?node-id=0-1

---

### The problem

Customers can't check their warranty on their own right now, they'd have to reach out to support. And on our side, admin manages warranty PDFs and repair records manually, there's no real system linking them to a product.

I don't have exact numbers yet on how much admin time this eats up or how many customers this affects, need to check with support/ops before I can put real targets on this. Flagging that as something to confirm.

**What we want out of v1:** give admin a proper place to upload warranty PDFs and manage repair history against a product, and let customers self-check their warranty status. Main win we're going for is cutting down the manual work on admin's side.

**Who this is for:** customers checking warranty, and internal Boat admin who manage the records.

### Who's involved

- **Customers** - use the lookup page, no login needed.
- **Admin (internal staff only)** - upload PDFs, manage repair history.
- **Data owner** - whoever owns the product database, need to confirm exact team with eng.
- **Approvers before launch** - probably support/ops lead + eng lead, need to confirm.

### What data we're using

- **Product database** - already exists, need to confirm exact fields with eng.
- **Warranty expiry** - needs to be linked per product, source to confirm.
- **Repair history** - new, admin will enter this manually, nothing exists for it today.
- **Warranty PDFs** - new, admin uploads these, need file storage sorted.

Nothing here is fully confirmed yet, need to sit with eng/data team before locking this in.

### How we'll know it's working

| What | How we'll check | Target | By when |
|---|---|---|---|
| Admin time spent on warranty docs/repair records | Track before vs after | Don't have a number yet, need a baseline first | TBD |
| Serial number lookup accuracy | % of valid serials returning correct info | Aiming for 95%+ | At launch |
| Customers using self-serve vs contacting support | % split | Need current support volume as baseline first | 30-60 days after launch |

Can't lock real targets until I get baseline numbers from admin and support.

### What customers and admin need to be able to do

- Customer can enter their serial number and see if it's under warranty.
- Customer can see repair history for their product.
- Admin can upload a warranty PDF and attach it to a product.
- Admin can add/edit repair history manually.
- Admin can replace or delete a PDF they already uploaded.

### What's in v1 and what's not

**In:**
- Serial number search + validation
- Warranty status (active/expired + expiry date)
- Repair history, paginated
- Admin login (internal only)
- Admin PDF upload
- Admin manual repair history entry
- Admin can edit/delete a PDF

**Not in v1:**
- Auto-syncing repair data from any other system, manual only for now
- Service centers getting admin access, internal staff only
- Customer login/accounts, lookup stays open
- Multi-language
- Customer downloading the PDF directly - still deciding on this one

### How it should flow

1. Customer types serial number.
2. We check it against the product database (exact logic to confirm with eng).
3. If it's valid, pull the warranty status, expiry, and repair history for that product.
4. Show it all to the customer.
5. On admin side - admin logs in, picks a product, uploads a PDF and/or adds repair entries, it all gets saved against that serial number.

This is just a first pass at the flow, haven't gotten eng's take on feasibility yet.

### Things that could go wrong

- Don't have baseline numbers yet for admin time or support volume, so can't set real targets. Need to get this from admin/support first.
- Product database structure isn't confirmed with eng yet, could delay the build if something's different than expected.
- Not sure if one serial number could map to more than one product, need to check this edge case with eng.
- Haven't decided file size/type limits for PDF uploads yet, should lock this before building.
- No plan yet for rate-limiting or captcha on the lookup page, could be an issue if someone tries scraping serial numbers.

### Design

Figma link is at the top, that covers the actual look and layout. This doc is just about how it should work.

### Stuff We still need to figure out

- Real numbers on admin time spent and support ticket volume related to warranty
- Who exactly owns the data and who needs to approve before launch
- Product database schema, need to confirm with eng
- How many repair entries to show per page
- Whether customers can download the PDF in v1 or not
- When we're actually targeting to launch

