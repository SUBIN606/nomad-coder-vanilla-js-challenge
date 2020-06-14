// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/images/1.jpg":[function(require,module,exports) {
module.exports = "/1.dc490b2a.jpg";
},{}],"src/images/3.jpg":[function(require,module,exports) {
module.exports = "/3.9244bfb5.jpg";
},{}],"src/images/4.jpg":[function(require,module,exports) {
module.exports = "/4.09d11d79.jpg";
},{}],"src/images/5.jpg":[function(require,module,exports) {
module.exports = "/5.512058a9.jpg";
},{}],"src/images/7.jpg":[function(require,module,exports) {
module.exports = "/7.4a523fa0.jpg";
},{}],"src/images/2.jpg":[function(require,module,exports) {
module.exports = "/2.edab4a9e.jpg";
},{}],"src/images/6.jpg":[function(require,module,exports) {
module.exports = "/6.7a641bd3.jpg";
},{}],"src/images/*.jpg":[function(require,module,exports) {
module.exports = {
  "1": require("./1.jpg"),
  "2": require("./2.jpg"),
  "3": require("./3.jpg"),
  "4": require("./4.jpg"),
  "5": require("./5.jpg"),
  "6": require("./6.jpg"),
  "7": require("./7.jpg")
};
},{"./1.jpg":"src/images/1.jpg","./3.jpg":"src/images/3.jpg","./4.jpg":"src/images/4.jpg","./5.jpg":"src/images/5.jpg","./7.jpg":"src/images/7.jpg","./2.jpg":"src/images/2.jpg","./6.jpg":"src/images/6.jpg"}],"src/js/index.js":[function(require,module,exports) {
"use strict";

var _ = _interopRequireDefault(require("../images/*.jpg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var USERS = "users";
var body = document.querySelector("body"),
    container = document.querySelector(".default-text-container"),
    greetingText = container.querySelector(".js-greeting-text"),
    dateText = container.querySelector(".js-date"),
    clock = container.querySelector(".js-clock"),
    form = container.querySelector("form"),
    input = container.querySelector("input");
var toDoContainer = document.querySelector(".js-todo-container");

function getRandumNum() {
  var randumNumber = Math.floor(Math.random() * 7) + 1;
  return randumNumber;
}

function setBackgroundImage() {
  var num = getRandumNum();
  var image = new Image();
  image.src = "".concat(_.default[num]);
  image.classList.add("bg-image");
  image.classList.add("fade-in");
  body.appendChild(image);
}

function setClock() {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var week = date.getDay();
  var dayOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  dateText.innerHTML = "".concat(year, ".").concat(month < 10 ? "0".concat(month) : month, ".").concat(day < 10 ? "0".concat(day) : day, " ").concat(dayOfWeek[week]);
  var hour = date.getHours();
  var minute = date.getMinutes();
  clock.innerHTML = "".concat(hour >= 12 ? "PM" : "AM", " ").concat(hour < 10 ? "0".concat(hour) : hour > 12 ? hour - 12 : hour, ":").concat(minute < 10 ? "0".concat(minute) : minute);
}

function showForm() {
  container.style.marginTop = "200px";
  form.classList.remove("hide");
}

function hideForm() {
  container.style.marginTop = "65px";
  form.classList.add("hide");
}

function loadUsers() {
  var users = JSON.parse(localStorage.getItem(USERS));

  if (users === null) {
    showForm();
  } else {
    var userName = users.name;
    greetingText.innerHTML = "Hello ".concat(userName, "!");
    toDoContainer.classList.remove("hide");
  }
}

function saveUserName(name) {
  var users = {
    name: name
  };
  localStorage.setItem(USERS, JSON.stringify(users));
  greetingText.innerHTML = "Hello ".concat(name, "!");
  hideForm();
  toDoContainer.classList.remove("hide");
}

function handleSubmit(e) {
  e.preventDefault();
  var userName = input.value;
  saveUserName(userName);
}

function init() {
  setBackgroundImage();
  setClock();
  setInterval(setClock, 1000);
  loadUsers();
  form.addEventListener("submit", handleSubmit);
}

init();
},{"../images/*.jpg":"src/images/*.jpg"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51756" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/js/index.js"], null)
//# sourceMappingURL=/js.d818e0ef.js.map