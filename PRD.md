## Warranty Lookup Page - PRD

Date: 17 Aug 2026
Figma: https://www.figma.com/design/KRHLRRjewSbQz8aD12DzkT/Untitled?node-id=0-1

---

### What's the problem

Right now customers have no way to check if their Boat product is still under warranty, or see if it's been repaired before. And on our side, support doesn't have a proper place to upload warranty PDFs and link them to a product. Building this page to fix both.

### What we're building

A new page where:
- Customer types in their serial number and can see warranty status + expiry date + past repairs.
- Our internal staff (admin) can upload the warranty PDF and attach it to a product.

Repair history will be added manually by admins for now, no auto-sync with any other system.

### Who's using this

- **Customers** - just checking their warranty, no login needed.
- **Admins** - internal Boat staff only, they'll upload PDFs and enter repair history manually.

### How it should work

**Customer side:**
1. User comes to the page and types their serial number.
2. We check it against our product database.
   - Not found → show an error, ask them to check the number again.
   - Found → show warranty info.
3. Show: product name, warranty status (active/expired), expiry date, and repair history (paginated).
4. If there's no repair history, just show something like "No repair history found".

**Admin side:**
1. Admin logs in.
2. Admin finds the product (by serial number or product ID).
3. Admin uploads the warranty PDF for that product.
4. Admin can also add or edit repair history entries manually.
5. Everything gets saved against that product record.
6. Admin should be able to view, replace or delete a PDF they already uploaded.

### Features for v1

| Feature | What it does | Priority |
|---|---|---|
| Serial number search + validation | Check number against product DB, show error if wrong | Must have |
| Warranty status | Show if active/expired + expiry date | Must have |
| Repair history (paginated) | List of past repairs, paginated | Must have |
| Admin login | Only internal staff can log in | Must have |
| PDF upload | Admin uploads and attaches PDF to product | Must have |
| Manual repair history entry | Admin can add/edit repair entries | Must have |
| View PDF as customer | Customer can view/download the warranty PDF | Nice to have |
| Edit/delete PDF (admin) | Replace or remove a PDF already uploaded | Nice to have |

### Not doing this for v1

- No auto-sync of repair data from any other tool (ERP/CRM etc.) - manual only for now.
- No access for service centers, only internal staff can log in as admin.
- No multi-language support.
- No customer login/account, lookup stays open just with serial number.

### Some things to keep in mind

- Serial number field should check basic format on the frontend itself, so we're not hitting the database for obviously wrong inputs.
- Need to decide how many repair entries to show per page (5 or 10, need to confirm).
- PDF upload should only allow PDFs, and probably cap the size (10MB?) - need to confirm.
- Admin panel access needs to be locked down properly, no public signup obviously.
- Still deciding if customers can download the PDF in v1 or if that comes later.

### Design

Design is already done in Figma (link at top). This doc is just about how it should function, Figma has the actual look and feel.

### Things I'm still not sure about

- What if one serial number is linked to more than one product? Edge case, need to think about it.
- Should we add captcha/rate-limit on the lookup so people can't just scrape through serial numbers?
- Confirm pagination size with design.
- Can customer download the PDF directly, or just see the warranty info for now?
- How soon after a purchase does a serial number actually show up in our system? Any delay?

---
