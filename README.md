# 🏭 GlobalTrade Enterprises — Order-to-Cash (O2C) SAP Fiori App

> **Capstone Project | SAP Fiori Course | 2025-2026**

## 📌 Project Overview

A complete **Order-to-Cash (O2C) Management Application** built using **SAP Fiori / SAPUI5** for GlobalTrade Enterprises — a fictitious industrial machinery company.

This app covers the full O2C business cycle:
**Sales Order → Delivery → Goods Issue → Invoice**

---

## 🎯 Problem Statement

GlobalTrade Enterprises manages industrial machinery sales across multiple customers. The existing SAP GUI-based process (VA01, VL01N, VF01) is desktop-bound, not mobile-friendly, and lacks a consolidated dashboard view. This Fiori app provides a unified, role-based interface for the entire O2C cycle.

---

## 🖥️ App Screens

| Screen | Description | SAP Equivalent |
|--------|-------------|----------------|
| **Dashboard (Home)** | KPI tiles — Total Orders, Open, In Delivery, Revenue | ME2M / VA05 |
| **Sales Order List** | All orders with search, filter by status, quick actions | VA05 |
| **Create Sales Order** | Form to create new order with auto price calculation | VA01 |
| **Order Detail** | Full order info + O2C process status timeline | VA03 |
| **Delivery Tracker** | Delivery status, shipment info, goods issue posting | VL03N |
| **Invoice View** | Full invoice with tax summary, post & print | VF03 |

---

## 🛠️ Tech Stack

- **Frontend**: SAPUI5 (XML Views + JavaScript Controllers)
- **Framework**: SAP Fiori / OpenUI5
- **Data**: Mock JSON Model (OData V2 ready)
- **Theme**: SAP Horizon (sap_horizon)
- **Routing**: sap.m.routing.Router
- **Backend**: SAP S/4HANA SD Module (OData service: SD_O2C_SRV)

---

## 📁 Project Structure

```
O2C-Fiori-App/
├── webapp/
│   ├── view/
│   │   ├── App.view.xml
│   │   ├── Home.view.xml              ← Dashboard with KPI tiles
│   │   ├── SalesOrderList.view.xml   ← All orders + filter/search
│   │   ├── CreateOrder.view.xml      ← Create new sales order
│   │   ├── OrderDetail.view.xml      ← Order detail + O2C timeline
│   │   ├── DeliveryTracker.view.xml  ← Delivery status + GI posting
│   │   └── InvoiceView.view.xml      ← Invoice generation + posting
│   ├── controller/
│   │   ├── Home.controller.js
│   │   ├── SalesOrderList.controller.js
│   │   ├── CreateOrder.controller.js
│   │   ├── OrderDetail.controller.js
│   │   ├── DeliveryTracker.controller.js
│   │   └── InvoiceView.controller.js
│   ├── model/
│   │   └── models.js                 ← Mock data + device model
│   ├── i18n/
│   │   └── i18n.properties
│   ├── Component.js
│   ├── manifest.json
│   └── index.html
├── blueprint/
│   └── company_blueprint.md
└── README.md
```

---

## 🚀 How to Run

### Option 1 — Direct Browser (Easiest)
1. Clone this repository
2. Open `webapp/index.html` in Chrome
3. The app loads with mock data — no SAP backend needed

### Option 2 — SAP Business Application Studio (BAS)
1. Import project into BAS workspace
2. Run with UI5 tooling: `npm start`
3. Connect to SAP backend via destination for live OData

### Option 3 — VS Code with UI5 Tooling
```bash
npm install -g @ui5/cli
ui5 serve
```

---

## 🏢 Company Master Data (Fictitious)

| Entity | Value |
|--------|-------|
| Company | GlobalTrade Enterprises |
| Company Code | GTE1 |
| Sales Org | GTE1 |
| Distribution Channel | 10 — Direct Sales |
| Division | MA — Machinery |
| Plant | GTP1 — Pune Plant |

### Sample Customers
- Bharat Heavy Industries (C-1001)
- Tata Steel Ltd. (C-1002)
- Larsen & Toubro (C-1003)
- ONGC Machinery Dept. (C-1004)

### Sample Materials
- CNC Vertical Milling Machine — ₹12,50,000
- Hydraulic Press 50 Ton — ₹4,75,000
- Industrial Conveyor Belt System — ₹2,30,000
- Industrial Boiler 500 KG — ₹8,90,000

---

## 🔮 Future Improvements

- Phase 2: Real OData V2 service connection to SAP S/4HANA backend
- SAP Analytics Cloud (SAC) embedded charts on dashboard
- WhatsApp order confirmation via SAP BTP integration
- Credit limit check before sales order creation
- Mobile PWA version for field sales teams

---

## 👤 Student Details

| Field | Value |
|-------|-------|
| Name | ______________________ |
| Roll No. | ______________________ |
| Batch | SAP Fiori 2025-2026 |
| Submission | April 21, 2026 |

---

