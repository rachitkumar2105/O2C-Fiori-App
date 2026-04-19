sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "com/globaltrade/o2c/model/models"
], function (Controller, models) {
    "use strict";

    return Controller.extend("com.globaltrade.o2c.controller.OrderDetail", {

        onInit: function () {
            this.getView().setModel(models.createMockModel(), "mock");
            this.getOwnerComponent().getRouter()
                .getRoute("orderDetail")
                .attachPatternMatched(this._onRoute, this);
        },

        _onRoute: function (oEvent) {
            var sId = oEvent.getParameter("arguments").orderId;
            var oOrders = this.getView().getModel("mock").getProperty("/salesOrders");
            var oOrder = oOrders.find(function (o) { return o.orderId === sId; });
            if (!oOrder) return;
            this._oOrder = oOrder;
            this.byId("pageTitle").setText("Order: " + oOrder.orderId);
            this.byId("detOrderId").setTitle(oOrder.orderId);
            this.byId("detCustomer").setText(oOrder.customer);
            this.byId("detMaterial").setText(oOrder.material);
            this.byId("detQty").setText(oOrder.quantity + " EA");
            this.byId("detPrice").setNumber(oOrder.price.toLocaleString("en-IN"));
            this.byId("detDate").setText(oOrder.date);
            this.byId("detStatus").setText(oOrder.status);
            this.byId("detDelivery").setText(oOrder.delivery);

            if (oOrder.delivery !== "Pending") {
                this.byId("delivStep").setInfo("✅ " + oOrder.delivery);
                this.byId("delivStep").setInfoState("Success");
            }
            if (oOrder.invoice !== "Not Created") {
                this.byId("invoiceStep").setInfo("✅ " + oOrder.invoice);
                this.byId("invoiceStep").setInfoState("Success");
            }
        },

        onNavBack: function () {
            this.getOwnerComponent().getRouter().navTo("salesOrderList");
        },

        onTrackDelivery: function () {
            this.getOwnerComponent().getRouter().navTo("delivery", { orderId: this._oOrder.orderId });
        },

        onCreateInvoice: function () {
            this.getOwnerComponent().getRouter().navTo("invoice", { orderId: this._oOrder.orderId });
        }
    });
});
