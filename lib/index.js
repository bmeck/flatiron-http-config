exports.name = 'flatiron-http-config'
exports.attach = function (options) {
   options = options || {};
   var app = this;
   var routers = options.routers || app.router;
   function respond(err, value) {
      err ? this.json(500, err) : this.json(200, value);
   }
   function addConfigRoutes() {
      var pattern = /(.+|)/;
      var splitter = /\//g;
      function checkBody(req, res) {
         if (req.body) return true;
         res.json(400, {message:'Body required'});
         return false;
      }
      this.get(pattern, function (pathname) {
         app.config.get(pathname.replace(splitter,':'), respond.bind(this.res));
      });
      this.delete(pattern, function (pathname) {
         app.config.clear(pathname.replace(splitter,':'), respond.bind(this.res));
      });
      this.post(pattern, function (pathname) {
         var req = this.req;
         var res = this.res;
         checkBody(req, res) && app.config.merge(pathname.replace(splitter,':'), req.body, respond.bind(res));
      });
      this.put(pattern, function (pathname) {
         var req = this.req;
         var res = this.res;
         checkBody(req, res) && app.config.set(pathname.replace(splitter,':'), req.body, respond.bind(res));
      });
   }
   routers.forEach(function (router) {
      router.path(options.prefix || 'config', addConfigRoutes);
   });
   routers = null;
}
