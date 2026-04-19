sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "com/globaltrade/o2c/model/models",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], function (Controller, models, MessageToast, MessageBox) {
    "use strict";

    return Controller.extend("com.globaltrade.o2c.controller.DeliveryTracker", {

        onInit: function () {
            var oMockModel = models.createMockModel();
            this.getView().setModel(oMockModel, "mock");

            this.getOwnerComponent().getRouter()
                .getRoute("delivery")
                .attachPatternMatched(this._onRouteMatched, this);
        },

        _onRouteMatched: function (oEvent) {
            var sOrderId = oEvent.getParameter("arguments").orderId;
            var oOrders = this.getView().getModel("mock").getProperty("/salesOrders");
            var oOrder = oOrders.find(function (o) { return o.orderId === sOrderId; });
            if (oOrder) {
                this.byId("delivOrderId").setTitle(oOrder.orderId);
                this.byId("delivCustomer").setText(oOrder.customer);
                this.byId("delivMaterial").setText(oOrder.material);
                this.byId("delivQty").setText(oOrder.quantity + " EA");
            }
        },

        onNavBack: function () {
            this.getOwnerComponent().getRouter().navTo("salesOrderList");
        },

        onPostGoodsIssue: function () {
            MessageBox.confirm("Post Goods Issue for this delivery?\nThis action cannot be reversed.", {
                title: "Post Goods Issue",
                onClose: function (sAction) {
                    if (sAction === "OK") {
                        MessageToast.show("✅ Goods Issue posted successfully! Stock updated.");
                    }
                }
            });
        },

        onConfirmDelivery: function () {
            MessageToast.show("✅ Delivery confirmed! Customer acknowledgement recorded.");
        },

        onProceedToInvoice: function () {
            var sOrderId = this.byId("delivOrderId").getTitle();
            this.getOwnerComponent().getRouter().navTo("invoice", { orderId: sOrderId });
        }
    });
});
