icelus = {
   ui: {
      Button: function (el, options) {
         return new $.Button(el, options);
      },
      Badge: function (el, options) {
         return new $.Badge(el, options);
      },
      InputGroup: function (el, options) {
         return new $.InputGroup(el, options);
      },
      ListGroup: function(el, options) {
         return new $.ListGroup(el, options);
      },
      NavBar: function (el, options) {
         return new $.NavBar(el, options);
      },
      Select: function (el, options) {
         return new $.Select(el, options);
      },
      Tab: function (el, options) {
         return new $.Tab(el, options);
      },
      IconButton: function (el, options) {
         return new $.IconButton(el, options);
      },
      Upload: function (el, options) {
         return new $.Upload(el, options);
      }
   }
};
