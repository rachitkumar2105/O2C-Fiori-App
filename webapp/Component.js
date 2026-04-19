sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/Device",
    "com/globaltrade/o2c/model/models"
], function (UIComponent, Device, models) {
    "use strict";

    return UIComponent.extend("com.globaltrade.o2c.Component", {
        metadata: {
            manifest: "json"
        },

        init: function () {
            UIComponent.prototype.init.apply(this, arguments);
            this.setModel(models.createDeviceModel(), "device");
            this.getRouter().initialize();
        },

        destroy: function () {
            UIComponent.prototype.destroy.apply(this, arguments);
        }
    });
});
