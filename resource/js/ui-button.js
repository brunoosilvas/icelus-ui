$.Button = function (el, options) {
   var plugin = this;

   var defaults = {
      label: null,
      icon: null,
      iconPosition: null,
      onClick: function () { }
   };

   plugin.settings = {};

   var createWidget = function () {

      plugin.settings = $.extend({}, defaults, options);
      plugin.el = el;

      el.each(function () {

         $(el).empty();

         if (plugin.settings.icon) {
            let html = `<span class="mr-2"><i class="${plugin.settings.icon}" aria-hidden="true"></i></span><span>${plugin.settings.label}</span>`;
            if (plugin.settings.iconPosition === 'right') {
               html = `<span>${plugin.settings.label}</span><span class="ml-2"><i class="${plugin.settings.icon}" aria-hidden="true"></i></span>`;
            }
            $(el).html(html);
         } else {
            $(el).text(plugin.settings.label);
         }

         if ($.isFunction(plugin.settings.onClick)) {
            el.on('click', function () {
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
