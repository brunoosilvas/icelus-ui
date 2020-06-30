$.Badge = function (el, options) {
   var plugin = this;

   var defaults = {
      data: [],
      key: 'id',
      display: [],
      displaySub: [],
      onSelect: function () { },
      onDelete: function () { }
   };

   plugin.settings = {};

   var createWidget = function () {

      plugin.settings = $.extend({}, defaults, options);
      plugin.el = el;

      el.each(function () {

      });

   }

   var template = function (key, display, displaySub) {
      let sub = displaySub ? `<small>${displaySub}</small>` : '';

      return `
         <div class="mr-2 mb-2">
            <a href="#" data-key="${key}" class="badge badge-light text-left p-2">
               <div class="d-flex w-100 justify-content-between align-items-center">
                  <span>${display}</span>
                  <span class="ml-2"><i class="fa fa-close" aria-hidden="true"></i></span>
               </div>
               ${sub}
            </a>
         </div>
      `;
   }

   var callClick = function (key) {
      let item = plugin.val(undefined, key);
      plugin.settings.onSelect.call(el, item);
   }

   var callDelete = function (key) {
      let item = plugin.val(undefined, key);
      plugin.settings.onDelete.call(el, item);
   }

   var evtClick = function() {

      $('div a', el).unbind('click');
      $('div a', el).each(function (i, context) {
         $(context).on('click', function (evt) {
            evt.preventDefault();

            let key = $(context).data('key');

            if ($(evt.target).hasClass('fa fa-close')) {
               callDelete(key);
            } else {
               callClick(key);
            }

         })
      });
   }

   var set = function (val) {

      $('div', el).remove();

      if ($.isArray(val)) {

         val.forEach((v) => {

            let key = v[plugin.settings.key];
            let display = $.evalScript(v, plugin.settings.display);
            let displaySub = $.evalScript(v, plugin.settings.displaySub);

            let html = template(key, display, displaySub);

            el.append(html);
         });

         evtClick();
      }
   }

   var get = function (key) {
      var value = null;
      plugin.settings.data.forEach((v) => {
         if (v[plugin.settings.key] === key) {
            value = v;
         }
      });
      if (value) {
         plugin.settings.selected = value;
      }
      return value;
   }

   plugin.val = function (val, key) {
      if (typeof val === 'undefined' && typeof key === 'undefined') {
         return plugin.settings.data || [];
      } else if (typeof val === 'undefined' && typeof key !== 'undefined') {
         return get(key);
      } else {

         set(val);

         plugin.settings.data = val;
         plugin.settings.selected = null;
      }
   }

   plugin.add = function(val) {
      let key = val[plugin.settings.key];
      let display = $.evalScript(val, plugin.settings.display);

      let html = template(key, display);
      el.append(html);

      plugin.settings.data = plugin.settings.data || [];
      plugin.settings.data.push(val);
      plugin.settings.selected = null;

      evtClick();
   }

   plugin.remove = function (key) {
      let data = plugin.settings.data.filter(item => item[plugin.settings.key] !== key);

      plugin.val(data);
   }

   createWidget();
}
