sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "com/globaltrade/o2c/model/models",
    "sap/m/MessageToast"
], function (Controller, models, MessageToast) {
    "use strict";

    return Controller.extend("com.globaltrade.o2c.controller.Home", {

        onInit: function () {
            var oMockModel = models.createMockModel();
            this.getView().setModel(oMockModel, "mock");
        },

        onNavToOrders: function () {
            this.getOwnerComponent().getRouter().navTo("salesOrderList");
        },

        onCreateOrder: function () {
            this.getOwnerComponent().getRouter().navTo("createOrder");
        },

        onNavToDelivery: function () {
            MessageToast.show("Select an order first to track delivery.");
        },

        onNavToInvoice: function () {
            MessageToast.show("Select a delivered order to generate invoice.");
        },

        onOrderPress: function (oEvent) {
            var oItem = oEvent.getSource().getBindingContext("mock");
            var sOrderId = oItem.getProperty("orderId");
            this.getOwnerComponent().getRouter().navTo("orderDetail", { orderId: sOrderId });
        },

        formatStatus: function (sStatus) {
            switch (sStatus) {
                case "Open":        return "Warning";
                case "In Delivery": return "Information";
                case "Invoiced":    return "Success";
                case "Completed":   return "Success";
                default:            return "None";
            }
        }
    });
});
