exports.name = 'flatiron-http-config'
exports.attach = function (options) {
   options = options || {};
   var app = this;
   var routers = options.routers || [app.router];
   function respond(err, value) {
      err ? this.json(500, err) : this.json(200, value);
   }
   var pattern = /(.+|)/;
   var splitter = /\//g;
   function checkBody(req, res) {
      if (req.body) return true;
      res.json(400, {message:'Body required'});
      return false;
   }
   function getPath(pathname) {
      if (pathname.replace) {
         return pathname.replace(splitter,':')
      }
      else {
         return null;
      }
   }
   function get(pathname) {
      app.config.get(getPath(pathname), respond.bind(this.res));
   }
   function del(pathname) {
      app.config.clear(getPath(pathname), respond.bind(this.res));
   }
   function post(pathname) {
      var req = this.req;
      var res = this.res;
      checkBody(req, res) && app.config.merge(getPath(pathname), req.body, respond.bind(res));
   }
   function put(pathname) {
      var req = this.req;
      var res = this.res;
      checkBody(req, res) && app.config.set(getPath(pathname), req.body, respond.bind(res));
   }
   function addConfigRoutes() {
      this.get(pattern, get);
      this.delete(pattern, del);
      this.post(pattern, post);
      this.put(pattern, put);
   }
   var prefix = options.prefix || 'config';
   routers.forEach(function (router) {
      router.path(prefix, addConfigRoutes);
      router.get(prefix, get);
      router.delete(prefix, del);
      router.post(prefix, post);
      router.put(prefix, put);
   });
   routers = null;
   options = null;
}
