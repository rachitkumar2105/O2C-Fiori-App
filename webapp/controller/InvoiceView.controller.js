sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "com/globaltrade/o2c/model/models",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], function (Controller, models, MessageToast, MessageBox) {
    "use strict";

    return Controller.extend("com.globaltrade.o2c.controller.InvoiceView", {

        onInit: function () {
            var oMockModel = models.createMockModel();
            this.getView().setModel(oMockModel, "mock");

            this.getOwnerComponent().getRouter()
                .getRoute("invoice")
                .attachPatternMatched(this._onRouteMatched, this);
        },

        _onRouteMatched: function (oEvent) {
            var sOrderId = oEvent.getParameter("arguments").orderId;
            var oOrders = this.getView().getModel("mock").getProperty("/salesOrders");
            var oOrder = oOrders.find(function (o) { return o.orderId === sOrderId; });
            if (oOrder) {
                this.byId("invoiceOrderRef").setText(oOrder.orderId);
                this.byId("billCustomer").setText(oOrder.customer);
                if (oOrder.invoice !== "Not Created") {
                    this.byId("invoiceNo").setTitle(oOrder.invoice);
                    this.byId("invoiceStatus").setText("Posted");
                    this.byId("invoiceStatus").setState("Success");
                }
            }
        },

        onNavBack: function () {
            this.getOwnerComponent().getRouter().navTo("salesOrderList");
        },

        onPostInvoice: function () {
            var sInvNo = "INV-" + (3000 + Math.floor(Math.random() * 999));
            MessageBox.confirm(
                "Post Invoice " + sInvNo + "?\nThis will create a billing document in the system.",
                {
                    title: "Confirm Invoice Posting",
                    onClose: function (sAction) {
                        if (sAction === "OK") {
                            this.byId("invoiceNo").setTitle(sInvNo);
                            this.byId("invoiceStatus").setText("Posted");
                            this.byId("invoiceStatus").setState("Success");
                            MessageToast.show("✅ Invoice " + sInvNo + " posted successfully! AR updated.");
                        }
                    }.bind(this)
                }
            );
        },

        onPrint: function () {
            MessageToast.show("🖨 Preparing invoice PDF for printing...");
            setTimeout(function () {
                window.print();
            }, 500);
        }
    });
});
