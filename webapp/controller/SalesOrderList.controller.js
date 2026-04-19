sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "com/globaltrade/o2c/model/models",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageToast"
], function (Controller, models, Filter, FilterOperator, MessageToast) {
    "use strict";

    return Controller.extend("com.globaltrade.o2c.controller.SalesOrderList", {

        onInit: function () {
            var oMockModel = models.createMockModel();
            this.getView().setModel(oMockModel, "mock");
        },

        onNavBack: function () {
            this.getOwnerComponent().getRouter().navTo("home");
        },

        onCreateOrder: function () {
            this.getOwnerComponent().getRouter().navTo("createOrder");
        },

        onSearch: function (oEvent) {
            var sQuery = oEvent.getParameter("query");
            var oTable = this.byId("ordersTable");
            var oBinding = oTable.getBinding("items");
            if (sQuery) {
                var aFilters = [
                    new Filter("orderId",  FilterOperator.Contains, sQuery),
                    new Filter("customer", FilterOperator.Contains, sQuery),
                    new Filter("material", FilterOperator.Contains, sQuery)
                ];
                oBinding.filter(new Filter({ filters: aFilters, and: false }));
            } else {
                oBinding.filter([]);
            }
        },

        onFilterChange: function (oEvent) {
            var sKey = oEvent.getParameter("selectedItem").getKey();
            var oTable = this.byId("ordersTable");
            var oBinding = oTable.getBinding("items");
            if (sKey === "All") {
                oBinding.filter([]);
            } else {
                oBinding.filter([new Filter("status", FilterOperator.EQ, sKey)]);
            }
        },

        onOrderSelect: function (oEvent) {
            var oCtx = oEvent.getSource().getBindingContext("mock");
            var sId = oCtx.getProperty("orderId");
            this.getOwnerComponent().getRouter().navTo("orderDetail", { orderId: sId });
        },

        onTrackDelivery: function (oEvent) {
            var oCtx = oEvent.getSource().getBindingContext("mock");
            var sId = oCtx.getProperty("orderId");
            this.getOwnerComponent().getRouter().navTo("delivery", { orderId: sId });
        },

        onCreateInvoice: function (oEvent) {
            var oCtx = oEvent.getSource().getBindingContext("mock");
            var sStatus = oCtx.getProperty("status");
            var sId = oCtx.getProperty("orderId");
            if (sStatus === "Open") {
                MessageToast.show("Order must be delivered before invoicing.");
            } else {
                this.getOwnerComponent().getRouter().navTo("invoice", { orderId: sId });
            }
        },

        formatStatus: function (sStatus) {
            switch (sStatus) {
                case "Open":        return "Warning";
                case "In Delivery": return "Information";
                case "Invoiced":    return "Success";
                case "Completed":   return "Success";
                default:            return "None";
            }
        },

        formatDelivery: function (sDelivery) {
            switch (sDelivery) {
                case "Delivered":   return "Success";
                case "In Transit":  return "Information";
                case "Pending":     return "Warning";
                default:            return "None";
            }
        }
    });
});
