$.Tab = function (el, options) {
   var plugin = this;

   var defaults = {
      onSelect: function () { }
   };

   plugin.settings = {};

   var createWidget = function () {

      plugin.settings = $.extend({}, defaults, options);
      plugin.el = el;

      el.each(function () {

         if ($.isFunction(plugin.settings.onSelect)) {
            $(el).on('shown.bs.tab', function (evt) {
               evt.preventDefault();
               plugin.settings.onSelect.call(el, evt);
            });
         }

      });
   }

   plugin.change = function(id) {

      $('.nav-item a').each(function(idx, context) {
         let selected = $(context).data('selected');
         if (selected === id) {
            $(context).click();
         }
      });

      // $(`.tab-pane[id*='tab']`).each(function(idx, item) {
      //    if ($(item).attr('id').includes(id)) {
      //       console.log($(item));
      //       $(item).click();
      //       /*$('.nav-item a', el).removeClass('active');
      //       $(`.nav-item a[id*='${id}']`, el).addClass('active');
      //       $(item).addClass('show active');*/
      //    }
      // });

     /* $('.tab-pane', plugin.elContent).first().removeClass('show active');
      $('.tab-pane', plugin.elContent).first().each(function(idx, item) {
         console.log(item);
         let selected = $(item).data('selected');
         console.log(selected);
         if (selected === id) {
            $(item).addClass('show active');
         }
      });*/
   }

   createWidget();
}
