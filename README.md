# 🏭 GlobalTrade Enterprises — Order-to-Cash (O2C) SAP Fiori App

> **Capstone Project Submission | SAP Fiori Course | 2025-2026**

## 📌 Project Overview

This is a comprehensive **Order-to-Cash (O2C) Management Application** built using **SAP Fiori / SAPUI5**. The application is designed for **GlobalTrade Enterprises**, an industrial machinery company, to streamline their sales, delivery, and billing processes into a single, cohesive user interface.

It addresses the limitations of manual SAP GUI transactions (**VA01, VL01N, VF01**) by providing a modern, responsive, and role-based Web experience.

---

## 🖥️ Application Features

The app provides 6 dedicated screens covering the full O2C lifecycle:

| Screen | Primary Function | Business Process |
| :--- | :--- | :--- |
| **🏠 Dashboard** | High-level KPI tiles (Orders, Revenue, Status) | Sales Monitoring |
| **📋 Order List** | Search and filter all orders by status or customer | Order Management |
| **➕ Create Order** | Form with automatic pricing & GST logic | **VA01** Creation |
| **🔍 Order Detail** | Full order visibility + O2C process timeline | **VA03** Visibility |
| **🚚 Delivery** | Outbound delivery tracking & Goods Issue posting | **VL01N / VL02N** |
| **🧾 Invoice** | Tax breakdown (GST), posting, and print preview | **VF01 / VF03** |

### ✨ Technical Highlights
*   **Real-time Pricing Engine:** Automatically calculates Unit Price, Discounts (5% for >₹10L), and GST (18%).
*   **Process Automation:** One-click "Post Goods Issue" and "Post Invoice" simulation.
*   **Process Timeline:** Visual tracking of an order from *Created* → *In Delivery* → *Invoiced*.
*   **SAP S/4HANA Ready:** Structured for OData V2 integration with standard SAP SD modules.

---

## 🛠️ Technical Stack

*   **UI Framework:** OpenUI5 / SAPUI5 (Version 1.108.0)
*   **Theme:** SAP Horizon (sap_horizon)
*   **Metadata:** manifest.json (Descriptor for Applications)
*   **Routing:** sap.m.routing.Router (Standard Fiori Navigation)
*   **Data Model:** JSON Model (Mock Data implementation)
*   **Mock Backend:** Custom logic in `models.js` and `controllers`

---

## 📂 Repository Structure

```
O2C-Fiori-App/
├── webapp/                 ← Application Source Code
│   ├── view/              ← XML Layouts (MVC Pattern)
│   ├── controller/        ← Business Logic
│   ├── model/             ← Data & Mock Models
│   ├── i18n/              ← Localization Strings
│   ├── manifest.json      ← App Configuration
│   └── index.html         ← Entrance Point
├── blueprint/              ← Company Master Data Specs
└── screenshots/            ← Visual Documentation of the app
```

---

## 👤 Student Details

| Field | Value |
| :--- | :--- |
| **Name** | Rachit Kumar |
| **Roll Number** | **[INSERT YOUR ROLL NO. HERE]** |
| **Program** | SAP Fiori Capstone 2025-2026 |
| **Repo Link** | https://github.com/rachitkumar2105/O2C-Fiori-App |

---

## 🚀 Getting Started

### Direct Browser Access
1. Clone this repository.
2. Open `webapp/index.html` in Chrome or Edge.
3. The app will load with pre-configured mock data representing real industrial sales scenarios.

### Local Development
```bash
npm install
npm start  # Runs the UI5 dev server
```

---

*This project was developed for the SAP Fiori Capstone 2026 submission.*
