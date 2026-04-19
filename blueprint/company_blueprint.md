# GlobalTrade Enterprises — Company Blueprint

## Overview
This document outlines the organizational and master data setup for GlobalTrade Enterprises, a fictitious industrial machinery trading and manufacturing company operating in India.

## 1. Company Structure

### Company Master Data
```
Company Code        : GTE1
Company Name        : GlobalTrade Enterprises
Country             : India
Currency            : INR
Fiscal Year Variant : V3 (April-March)
Chart of Accounts   : CAIN
Address             : Plot 12, MIDC Industrial Area, Pune, Maharashtra 411018
Contact             : +91-20-XXXX-XXXX
```

### Sales Organization Hierarchy
```
Sales Organization  : GTE1
├── Distribution Channel: 10 (Direct Sales)
│   └── Division: MA (Machinery)
│       └── Sales Area: GTE1 / 10 / MA
```

### Plant and Warehouse
```
Plant Code          : GTP1 (GlobalTrade Pune Plant)
Storage Location    : MA01 (Pune Machinery Warehouse)
Shipping Point      : GT01 (Pune Dispatch Point)
```

## 2. Customer Master Data (XD01)

### Customers Configured

| Cust ID | Customer Name | City | Payment Terms | Creditlimit | Status |
|---------|---------------|------|---------------|-------------|--------|
| C-1001  | Bharat Heavy Industries | Mumbai | 30 days net | ₹50L | Active |
| C-1002  | Tata Steel Ltd. | Jamshedpur | 45 days net | ₹75L | Active |
| C-1003  | Larsen & Toubro | Chennai | 60 days net | ₹1Cr | Active |
| C-1004  | ONGC Machinery Dept. | Vadodara | 30 days net | ₹40L | Active |

### Customer Tax Details
- GSTIN: Configured for each customer
- PAN: Available in master records
- Tax Condition: Standard 18% GST applicable

## 3. Material Master Data (MM01)

### Materials Configured

| Mat ID | Material Name | Type | UOM | Price (INR) | HSN Code | Status |
|--------|---------------|------|-----|------------|----------|--------|
| GT-CNC-001 | CNC Vertical Milling Machine | FERT | EA | 12,50,000 | 84629900 | Active |
| GT-HYD-002 | Hydraulic Press 50 Ton | FERT | EA | 4,75,000 | 84629900 | Active |
| GT-CVR-003 | Industrial Conveyor Belt System | FERT | EA | 2,30,000 | 84704000 | Active |
| GT-BLR-004 | Industrial Boiler 500 KG | FERT | EA | 8,90,000 | 84021100 | Active |

### Material Groups
- Machinery: MACH
- Components: COMP
- Services: SERV

## 4. Pricing Configuration (VK11)

### Condition Types Configured

| Cond Type | Description | Rate/Value |
|-----------|-------------|-----------|
| PR00 | Base Price | As per Material Master |
| K007 | Customer Discount | 5% (if order value > ₹10L) |
| MWST | Output GST (18%) | 18% |
| KF00 | Freight Charges | 2% of net value |
| SKTO | Early Payment Discount | 1% (if paid within 10 days) |

### Pricing Logic (in Fiori App)
1. Base Price (PR00) = Material master price
2. Line Item Subtotal = Qty × Base Price
3. Discount (K007) = 5% if subtotal > ₹10 Lakhs, else 0%
4. Taxable Amount = Subtotal - Discount
5. Freight (KF00) = 2% of Taxable Amount
6. GST (MWST) = 18% of (Taxable Amount + Freight)
7. **Total Invoice Value = Taxable Amount + Freight + GST**

## 5. O2C Transaction Codes & Mapping

### Sales Order (SD-Sales Order)
```
SAP Transaction  : VA01 — Create Sales Order
Fiori Screen     : CreateOrder.view.xml
Process Step     : Step 1
Data Captured    : Customer, Material, Qty, Delivery Date
```

### Delivery (SD-Outbound Delivery)
```
SAP Transaction  : VL01N — Create Outbound Delivery
Fiori Screen     : DeliveryTracker.view.xml
Process Step     : Step 2
Data Captured    : Delivery Note, Shipping Point, Carrier
```

### Goods Issue (SD-Goods Movement)
```
SAP Transaction  : VL02N — Post Goods Issue
Fiori Screen     : DeliveryTracker.view.xml
Process Step     : Step 3
Data Captured    : Movement Type 601 (Goods Issue)
```

### Billing (SD-Billing)
```
SAP Transaction  : VF01 — Create Invoice
Fiori Screen     : InvoiceView.view.xml
Process Step     : Step 4
Data Captured    : Invoice No., Line Items, Tax, Amount
```

## 6. OData Service Configuration

### Main Service (for live backend)
```
Service Name     : SD_O2C_SRV
Service Type     : OData V2
Gateway Service  : /IWFND/MAINT_SERVICE
Base URI         : /sap/opu/odata/sap/SD_O2C_SRV/
```

### Entity Sets (exposed in Fiori app)
- SalesOrderSet — List of sales orders
- CustomerSet — Customer master
- MaterialSet — Material master
- DeliverySet — Outbound deliveries
- InvoiceSet — Billing documents

## 7. Mock Data (Current Implementation)

The app currently uses **mock JSON data** for demonstration. Sample data is configured in `models.js`:

```javascript
salesOrders: [
  { orderId: "SO-1001", customer: "Bharat Heavy Industries", ... }
  { orderId: "SO-1002", customer: "Tata Steel Ltd.", ... }
  // ... more orders
]
```

### To connect to live SAP backend:
1. Configure OData data source in `manifest.json`
2. Point to `/sap/opu/odata/sap/SD_O2C_SRV/`
3. Replace `models.createMockModel()` with actual OData model binding
4. Test in SAP Fiori Launchpad with role-based access

## 8. Role-Based Access (SAP Launchpad)

### Proposed Roles

| Role | Description | Screen Access | Transactions |
|------|-------------|---------------|--------------|
| O2C_SALES_EXEC | Sales Executive | Home, SalesOrderList, CreateOrder, OrderDetail | VA01, VA05 |
| O2C_DELIVERY_MGR | Delivery Manager | DeliveryTracker, SalesOrderList | VL01N, VL02N |
| O2C_BILLING | Billing Clerk | InvoiceView, SalesOrderList | VF01, VF03 |
| O2C_MANAGER | Sales Manager | All screens + Analytics dashboard | VA01-03, VL01-03, VF01-03 |

## 9. Testing Scenarios

### Test Case 1: Create Sales Order (VA01 equivalent)
1. Navigate to Home → "Create Sales Order"
2. Select Customer: Tata Steel Ltd.
3. Select Material: Hydraulic Press 50 Ton
4. Enter Qty: 1
5. App calculates Total = ₹5,70,000 (including 18% GST)
6. Save → Order created as SO-XXXX

### Test Case 2: Track Delivery (VL01N → VL02N equivalent)
1. Navigate to SalesOrderList
2. Click "Track Delivery" for SO-1002
3. View delivery status timeline
4. Click "Post Goods Issue" → Confirms stock movement
5. Click "Proceed to Invoice" → Next step

### Test Case 3: Create Invoice (VF01 equivalent)
1. Navigate to OrderDetail for delivered order
2. Click "Create Invoice"
3. View invoice with customer, items, taxes
4. Click "Post Invoice" → INV-XXXX created
5. Click "Print Invoice" → PDF download

## 10. Future Configuration Steps (Phase 2)

- [ ] Configure actual SAP backend connection
- [ ] Setup SAP Fiori Launchpad tiles
- [ ] Assign roles to users
- [ ] Configure authorizations (T-codes access)
- [ ] Setup email notifications for approval workflows
- [ ] Configure print forms for invoice (SMARTFORMS/Adobe Forms)
- [ ] Setup credit limit blocking during sales order creation
- [ ] Configure intercompany billing (if multiple companies)

---

**Document Version**: 1.0  
**Last Updated**: April 2026  
**Status**: Complete (Capstone Project)
