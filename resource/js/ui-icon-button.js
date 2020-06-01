$.IconButton = function (el, options) {
   var plugin = this;

   var defaults = {
      icon: null,
      onClick: function () { }
   };

   plugin.settings = {};

   var createWidget = function () {

      plugin.settings = $.extend({}, defaults, options);
      plugin.el = el;

      el.each(function () {

         $(el).empty();

         let html = `<i class="${plugin.settings.icon}"></i>`;
         $(el).html(html);

         if ($.isFunction(plugin.settings.onClick)) {
            el.on('click', function(evt) {
               evt.preventDefault();
               plugin.settings.onClick.call(el);
            });
         }
      });

   }

   plugin.disable = function() {
      $(el).attr("disabled", true);
   }

   plugin.enable = function() {
      $(el).attr("disabled", false);
   }

   createWidget();
}
