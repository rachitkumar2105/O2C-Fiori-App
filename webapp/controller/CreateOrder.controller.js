sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "com/globaltrade/o2c/model/models",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], function (Controller, models, JSONModel, MessageToast, MessageBox) {
    "use strict";

    return Controller.extend("com.globaltrade.o2c.controller.CreateOrder", {

        onInit: function () {
            var oMockModel = models.createMockModel();
            this.getView().setModel(oMockModel, "mock");

            // Form model
            var oFormModel = new JSONModel({
                orderDate: new Date().toISOString().split("T")[0],
                unitPrice: 0,
                discount: 0,
                gst: 0,
                totalValue: 0
            });
            this.getView().setModel(oFormModel, "form");

            // Generate order ID
            var sId = "SO-" + (1006 + Math.floor(Math.random() * 100));
            this.byId("orderId").setValue(sId);
        },

        onNavBack: function () {
            this.getOwnerComponent().getRouter().navTo("salesOrderList");
        },

        onCustomerSelect: function () {
            this._recalculate();
        },

        onMaterialSelect: function (oEvent) {
            var oSelected = oEvent.getSource().getSelectedItem();
            if (!oSelected) return;
            var sKey = oSelected.getKey();
            var aMaterials = this.getView().getModel("mock").getProperty("/materials");
            var oMat = aMaterials.find(function (m) { return m.id === sKey; });
            if (oMat) {
                this.getView().getModel("form").setProperty("/unitPrice", oMat.price);
                this._recalculate();
            }
        },

        onQtyChange: function () {
            this._recalculate();
        },

        _recalculate: function () {
            var oForm = this.getView().getModel("form");
            var iQty = this.byId("quantity").getValue();
            var iPrice = oForm.getProperty("/unitPrice");
            var iSubtotal = iQty * iPrice;
            var iDiscount = iSubtotal > 1000000 ? iSubtotal * 0.05 : 0;
            var iGst = (iSubtotal - iDiscount) * 0.18;
            var iTotal = iSubtotal - iDiscount + iGst;

            oForm.setProperty("/discount", Math.round(iDiscount));
            oForm.setProperty("/gst", Math.round(iGst));
            oForm.setProperty("/totalValue", Math.round(iTotal));
        },

        onSaveOrder: function () {
            var oCustomer = this.byId("customerSelect").getSelectedItem();
            var oMaterial = this.byId("materialSelect").getSelectedItem();
            var iQty = this.byId("quantity").getValue();

            if (!oCustomer || !oMaterial || !iQty) {
                var oStrip = this.byId("msgStrip");
                oStrip.setType("Error");
                oStrip.setText("Please fill all required fields.");
                oStrip.setVisible(true);
                return;
            }

            var oForm = this.getView().getModel("form");
            var sTotal = "₹" + oForm.getProperty("/totalValue").toLocaleString("en-IN");

            // Show summary
            this.byId("summaryCustomer").setText(oCustomer.getText());
            this.byId("summaryMaterial").setText(oMaterial.getText());
            this.byId("summaryTotal").setText(sTotal);
            this.byId("summaryPanel").setVisible(true);

            MessageBox.confirm(
                "Confirm Sales Order?\n\nCustomer: " + oCustomer.getText() +
                "\nMaterial: " + oMaterial.getText() +
                "\nQty: " + iQty +
                "\nTotal: " + sTotal,
                {
                    title: "Confirm Order",
                    onClose: function (sAction) {
                        if (sAction === "OK") {
                            MessageToast.show("✅ Sales Order " + this.byId("orderId").getValue() + " created successfully!");
                            setTimeout(function () {
                                this.getOwnerComponent().getRouter().navTo("salesOrderList");
                            }.bind(this), 1500);
                        }
                    }.bind(this)
                }
            );
        }
    });
});
