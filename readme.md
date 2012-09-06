# Flatiron HTTP Configuration

Configuration is desireable amongst most applications.
This plugin allows for a simple association with a director HTTP router and a Broadway application.
It allows for simplified dynamic configuration without restarting a server.

## Options

### routers

An array of director HTTP routers to attach the config on

### prefix

The path to prepend to the paths for HTTP handlers

#### Default

```JSON
"config"
```

## Server Usage

```node.js
app.use(require('flatiron-http-config'), {
  routers: app.router,
  prefix: 'config'
});
```

## Client Usage

### GET /config-prefix/path/to/value

Returns the values of the given configuration point and all sub values.

#### Example

```bash
curl server.local/config/http/unauthorized/ok
```

#### Return values

* 200
* 500

### PUT /config-prefix/path/to/value with data

Overrides the values of the given configuration point and all sub values.

#### Example

```bash
curl server.local/config/http/unauthorized/ok --data ok=false -X PUT
```

#### Return values

* 200
* 400
* 500

### DELETE /config-prefix/path/to/value

Removes the values of the given configuration point and all sub values.
This may expose the default values without being able to set the configuration point to null.

#### Example

```bash
curl server.local/config/http/unauthorized/ok -X DELETE
```

#### Return values

* 200
* 500

### POST /config-prefix/path/to/value with data

Merges the values of the given configuration point and all sub values.

#### Example

```bash
curl server.local/config/http/unauthorized --data ok=true
```

#### Return values

* 200
* 400
* 500

## Security

Please refer to Director's `before` hooks in order to implement security.

## License

Copyright (C) 2012 Bradley Meck

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
