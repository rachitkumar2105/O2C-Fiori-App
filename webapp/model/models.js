sap.ui.define([
    "sap/ui/model/json/JSONModel",
    "sap/ui/Device"
], function (JSONModel, Device) {
    "use strict";

    return {
        createDeviceModel: function () {
            var oModel = new JSONModel(Device);
            oModel.setDefaultBindingMode("OneWay");
            return oModel;
        },

        createMockModel: function () {
            var oData = {
                salesOrders: [
                    { orderId: "SO-1001", customer: "Bharat Heavy Industries", material: "CNC Vertical Milling Machine", quantity: 2, price: 2500000, status: "Open",      date: "2026-04-01", delivery: "Pending",   invoice: "Not Created" },
                    { orderId: "SO-1002", customer: "Tata Steel Ltd.",          material: "Hydraulic Press 50 Ton",      quantity: 1, price: 475000,  status: "In Delivery", date: "2026-04-05", delivery: "In Transit", invoice: "Not Created" },
                    { orderId: "SO-1003", customer: "Larsen & Toubro",          material: "Industrial Conveyor Belt",    quantity: 3, price: 690000,  status: "Invoiced",    date: "2026-04-08", delivery: "Delivered",  invoice: "INV-3001" },
                    { orderId: "SO-1004", customer: "ONGC Machinery Dept.",     material: "Industrial Boiler 500 KG",   quantity: 1, price: 890000,  status: "Completed",   date: "2026-04-10", delivery: "Delivered",  invoice: "INV-3002" },
                    { orderId: "SO-1005", customer: "Bharat Heavy Industries",  material: "Hydraulic Press 50 Ton",      quantity: 2, price: 950000,  status: "Open",        date: "2026-04-15", delivery: "Pending",    invoice: "Not Created" }
                ],
                customers: [
                    { id: "C-1001", name: "Bharat Heavy Industries" },
                    { id: "C-1002", name: "Tata Steel Ltd." },
                    { id: "C-1003", name: "Larsen & Toubro" },
                    { id: "C-1004", name: "ONGC Machinery Dept." }
                ],
                materials: [
                    { id: "GT-CNC-001", name: "CNC Vertical Milling Machine",  price: 1250000 },
                    { id: "GT-HYD-002", name: "Hydraulic Press 50 Ton",        price: 475000  },
                    { id: "GT-CVR-003", name: "Industrial Conveyor Belt System",price: 230000  },
                    { id: "GT-BLR-004", name: "Industrial Boiler 500 KG",      price: 890000  }
                ],
                kpis: {
                    totalOrders: 5,
                    openOrders: 2,
                    inDelivery: 1,
                    invoiced: 2,
                    totalRevenue: "55,05,000"
                }
            };
            return new JSONModel(oData);
        }
    };
});
