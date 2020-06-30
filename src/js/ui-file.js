$.File = function (el, options) {
   var plugin = this;

   var defaults = {
      data: [],
      onSelect: function () { }
   };

   plugin.settings = {};

   var createWidget = function () {

      plugin.settings = $.extend({}, defaults, options);
      plugin.el = el;

      el.each(function () {

         if ($.isFunction(plugin.settings.onSelect)) {

         }

      });

   }

   createWidget();
}
