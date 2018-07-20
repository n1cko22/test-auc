// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
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

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
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
  return newRequire;
})({"src/utils/index.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.RequestError = RequestError;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var URL_PARAM_REGEXP = /:\w+/g;

var noop = exports.noop = function noop() {};

var toHtml = exports.toHtml = function toHtml(string) {
  var template = document.createElement('template');
  template.innerHTML = string.trim();

  return template.content;
};

var clearChildren = exports.clearChildren = function clearChildren(node) {
  node.innerHTML = '';
  return node;
};

var append = exports.append = function append(node, child) {
  if (Array.isArray(child)) {
    node.append.apply(node, _toConsumableArray(child));
  } else {
    node.append(child);
  }

  return node;
};

var bindAll = exports.bindAll = function bindAll(context) {
  for (var _len = arguments.length, names = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    names[_key - 1] = arguments[_key];
  }

  names.forEach(function (name) {
    if (typeof context[name] === 'function') {
      context[name] = context[name].bind(context);
    } else {
      throw Error('Expected function ' + name + '. Instead received: ' + _typeof(context[name]));
    }
  });
};

function RequestError(response) {
  this.status = response.statusText;
  this.code = response.status;
}

RequestError.prototype.toString = function () {
  return this.code + ' - ' + this.status;
};

var isUrlParam = function isUrlParam(path) {
  return URL_PARAM_REGEXP.test(path);
};
var urlToRegExp = function urlToRegExp(url) {
  return RegExp('^' + url.replace(URL_PARAM_REGEXP, '(.*)') + '$');
};
var isEqualPaths = exports.isEqualPaths = function isEqualPaths(template, url) {
  return urlToRegExp(template).test(url);
};

var extractUrlParams = exports.extractUrlParams = function extractUrlParams(template, url) {
  var values = url.split('/');
  var params = {};

  if (!values) {
    return params;
  }

  return template.split('/').reduce(function (acc, param, index) {
    if (!isUrlParam(param)) {
      return acc;
    }
    //We need to remove ':' from param name
    acc[param.slice(1)] = values[index];

    return acc;
  }, params);
};
},{}],"src/framework/Component.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = require('../utils');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Component = function () {
  function Component(props) {
    _classCallCheck(this, Component);

    this.state = {};
    this.props = props || {};
    this.host = null;

    (0, _utils.bindAll)(this, 'updateState', 'update');
  }

  _createClass(Component, [{
    key: '_render',
    value: function _render() {
      var html = this.render();

      if (!html && this.host) {
        return this.host;
      }

      if (typeof html === 'string') {
        return (0, _utils.append)((0, _utils.clearChildren)(this.host), (0, _utils.toHtml)(html));
      } else {
        return (0, _utils.append)((0, _utils.clearChildren)(this.host), html);
      }
    }
  }, {
    key: 'onBeforeUpdate',
    value: function onBeforeUpdate(nextProps) {}
  }, {
    key: 'onBeforeUnmount',
    value: function onBeforeUnmount() {}
  }, {
    key: 'unmount',
    value: function unmount() {
      this.onBeforeUnmount();
    }
  }, {
    key: 'update',
    value: function update(nextProps) {
      this.onBeforeUpdate(nextProps);
      this.props = nextProps;
      return this._render();
    }
  }, {
    key: 'updateState',
    value: function updateState(state) {
      var nextState = Object.assign({}, this.state, state);

      this.state = nextState;
      this._render();

      return nextState;
    }
  }, {
    key: 'render',
    value: function render() {}
  }, {
    key: 'name',
    get: function get() {
      return this.constructor.name;
    }
  }]);

  return Component;
}();

exports.default = Component;
},{"../utils":"src/utils/index.js"}],"src/framework/index.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Component = require('./Component');

Object.defineProperty(exports, 'Component', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_Component).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./Component":"src/framework/Component.js"}],"node_modules/parcel/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;
function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp):\/\/[^)\n]+/g);
    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"node_modules/parcel/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    link.remove();
  };
  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"node_modules/parcel/src/builtins/bundle-url.js"}],"src/components/navigation.css":[function(require,module,exports) {

var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"node_modules/parcel/src/builtins/css-loader.js"}],"src/components/Header.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _framework = require('../framework');

var _utils = require('../utils');

require('./navigation.css');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Header = function (_Component) {
  _inherits(Header, _Component);

  function Header(props) {
    _classCallCheck(this, Header);

    var _this = _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).call(this, props));

    _this.host = document.createElement('header');
    return _this;
  }

  _createClass(Header, [{
    key: 'render',
    value: function render() {

      var headerWrapper = document.createElement('div');
      var logoLink = document.createElement('a');
      var navigationEl = document.createElement('nav');
      var logoutButton = document.createElement('a');

      headerWrapper.className = 'header-wrapper';

      navigationEl.innerHTML = '\n    <ul class="slides">\n    <input type="radio" name="radio-btn" id="img-1" checked />\n    <li class="slide-container">\n\t\t<div class="slide">\n\t\t\t<img src="http://farm9.staticflickr.com/8072/8346734966_f9cd7d0941_z.jpg" />\n        </div>\n\t\t<div class="nav">\n\t\t\t<label for="img-6" class="prev">&#x2039;</label>\n\t\t\t<label for="img-2" class="next">&#x203a;</label>\n\t\t</div>\n    </li>\n\n    <input type="radio" name="radio-btn" id="img-2" />\n    <li class="slide-container">\n        <div class="slide">\n          <img src="http://farm9.staticflickr.com/8504/8365873811_d32571df3d_z.jpg" />\n        </div>\n\t\t<div class="nav">\n\t\t\t<label for="img-1" class="prev">&#x2039;</label>\n\t\t\t<label for="img-3" class="next">&#x203a;</label>\n\t\t</div>\n    </li>\n\n    <input type="radio" name="radio-btn" id="img-3" />\n    <li class="slide-container">\n        <div class="slide">\n          <img src="http://farm9.staticflickr.com/8068/8250438572_d1a5917072_z.jpg" />\n        </div>\n\t\t<div class="nav">\n\t\t\t<label for="img-2" class="prev">&#x2039;</label>\n\t\t\t<label for="img-4" class="next">&#x203a;</label>\n\t\t</div>\n    </li>\n\n    <input type="radio" name="radio-btn" id="img-4" />\n    <li class="slide-container">\n        <div class="slide">\n          <img src="http://farm9.staticflickr.com/8061/8237246833_54d8fa37f0_z.jpg" />\n        </div>\n\t\t<div class="nav">\n\t\t\t<label for="img-3" class="prev">&#x2039;</label>\n\t\t\t<label for="img-5" class="next">&#x203a;</label>\n\t\t</div>\n    </li>\n\n    <input type="radio" name="radio-btn" id="img-5" />\n    <li class="slide-container">\n        <div class="slide">\n          <img src="http://farm9.staticflickr.com/8055/8098750623_66292a35c0_z.jpg" />\n        </div>\n\t\t<div class="nav">\n\t\t\t<label for="img-4" class="prev">&#x2039;</label>\n\t\t\t<label for="img-6" class="next">&#x203a;</label>\n\t\t</div>\n    </li>\n\n    <input type="radio" name="radio-btn" id="img-6" />\n    <li class="slide-container">\n        <div class="slide">\n          <img src="http://farm9.staticflickr.com/8195/8098750703_797e102da2_z.jpg" />\n        </div>\n\t\t<div class="nav">\n\t\t\t<label for="img-5" class="prev">&#x2039;</label>\n\t\t\t<label for="img-1" class="next">&#x203a;</label>\n\t\t</div>\n    </li>\n\n    <li class="nav-dots">\n      <label for="img-1" class="nav-dot" id="img-dot-1"></label>\n      <label for="img-2" class="nav-dot" id="img-dot-2"></label>\n      <label for="img-3" class="nav-dot" id="img-dot-3"></label>\n      <label for="img-4" class="nav-dot" id="img-dot-4"></label>\n      <label for="img-5" class="nav-dot" id="img-dot-5"></label>\n      <label for="img-6" class="nav-dot" id="img-dot-6"></label>\n    </li>\n</ul>\n<div id=\'cssmenu\'>\n<ul>\n  <li><a href="#/auction"><span>Auction</span></a></li>\n  <li><a class="addbid-link" href="#/addbid">Add Bid</a></li>\n  <li><a class="contact-link" href="#/contacts">contact</a></li>\n  <li><a class="gallery-link" href="#/gallery">Gallery</a></li>\n  <li><a class="profile-link" href="#/login">Log in/out</a></li>\n</ul> \n</div>\n      ';

      headerWrapper.appendChild(navigationEl);

      return headerWrapper;
    }
  }]);

  return Header;
}(_framework.Component);

exports.default = Header;
},{"../framework":"src/framework/index.js","../utils":"src/utils/index.js","./navigation.css":"src/components/navigation.css"}],"src/components/footer.css":[function(require,module,exports) {

var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"node_modules/parcel/src/builtins/css-loader.js"}],"src/components/Footer.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _framework = require('../framework');

require('./footer.css');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Footer = function (_Component) {
	_inherits(Footer, _Component);

	function Footer(props) {
		_classCallCheck(this, Footer);

		var _this = _possibleConstructorReturn(this, (Footer.__proto__ || Object.getPrototypeOf(Footer)).call(this, props));

		_this.host = document.createElement('div');
		_this.host.classList.add('footer__container');
		return _this;
	}

	_createClass(Footer, [{
		key: 'render',
		value: function render() {
			return '\n\t\t\t<footer class="footer">\n\t\t\t<div class = "wrap">\n\t\t\t<span class="footer__copyright">EPAM Systems&copy; 2018</span>\n\t\t\t\t<address class="footer__address">\n\t\t\t\t\tsome street 1,\n\t\t\t\t\t<a href="tel:5778887">tel. 57-788-87</a>\n\t\t\t\t</address>\n\t\t\t\t<div>\n\t\t\t\t<a href="https://uk-ua.facebook.com/" class="fa fa-facebook"></a>\n\t\t\t\t <a href="#" class="fa fa-twitter"></a>\n\t\t\t\t </div>\n\t\t\t\t </div>\n\t\t\t</footer>\n\t\t';
		}
	}]);

	return Footer;
}(_framework.Component);

exports.default = Footer;
},{"../framework":"src/framework/index.js","./footer.css":"src/components/footer.css"}],"src/components/list.css":[function(require,module,exports) {

var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"node_modules/parcel/src/builtins/css-loader.js"}],"src/components/List.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _framework = require('../framework');

var _utils = require('../utils');

require('./list.css');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var List = function (_Component) {
	_inherits(List, _Component);

	function List(props) {
		_classCallCheck(this, List);

		var _this = _possibleConstructorReturn(this, (List.__proto__ || Object.getPrototypeOf(List)).call(this, props));

		_this.state = {
			bets: null,
			paginate: null
		};
		_this.host = document.createElement('div');
		_this.host.classList.add('list__container');
		_this.host.addEventListener('submit', function (ev) {
			return _this.handleSubmit(ev);
		});
		(0, _utils.bindAll)(_this);
		_this.getBets();

		return _this;
	}

	_createClass(List, [{
		key: 'getBets',
		value: function getBets() {
			var itemStorage = void 0;
			var fList = localStorage.getItem('itemStorage');
			if (fList !== undefined) {
				itemStorage = JSON.parse(fList);
			}
			this.updateState({ bets: itemStorage });
		}
	}, {
		key: 'render',
		value: function render() {
			var bets = this.state.bets;

			console.log(localStorage);
			if (!bets) return '\n\t\t\t<p class="message--success">\n\t\t\t\tLoading...\n\t\t\t</p>';

			if (!bets.length) return '\n\t\t\t<p class="message--success">\n\t\t\t\tList is empty\n\t\t\t</p>\n\t\t';

			var betHtml = bets.map(function (bet, i) {
				var img = "https://img1.moyo.ua/img/products/3828/83_1500x_1505364451.jpg";
				if (bet.file[0] !== undefined) {

					if (bet.file[0] !== 'data:,') {
						img = "data:image/png;base64," + bet.file[0];
					}

					var html = '\n\t\t\t<article class="list__item">\n\t\t\t\t<div class="wrapp-data">\t\n\t\t\t\t\t<h3 class="id">\n\t\t\t\t\t\t#' + (i + 1) + '\n\t\t\t\t\t</h3>\n\t\t\t\t\t<span class="item__price">\n\t\t\t\t\tName: ' + bet.betname + '\n                    </span>\n                    <span class="item__price">\n\t\t\t\t\tDescription' + bet.description + '\n                    </span>\n                    <span class="item__price">\n\t\t\t\t\tPrice in USD: ' + bet.price + '\n                    </span>\n\t\t\t\t\t<a class="buy" href="#/buy">Buy NOW!</a>\n\t\t\t\t</div>\n\t\t\t\t<div class="wrapp-img">\n\t\t\t\t\t<img src="' + img + '" class="item__pic">\n\t\t\t\t</div>\n\t\t\t</article>\n\t\t\t';
					var fragment = (0, _utils.toHtml)(html);
					return fragment;
				}
			});
			return betHtml;
		}
	}]);

	return List;
}(_framework.Component);

exports.default = List;
},{"../framework":"src/framework/index.js","../utils":"src/utils/index.js","./list.css":"src/components/list.css"}],"src/Auction.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _framework = require('./framework');

var _utils = require('./utils');

var _Header = require('./components/Header');

var _Header2 = _interopRequireDefault(_Header);

var _Footer = require('./components/Footer');

var _Footer2 = _interopRequireDefault(_Footer);

var _List = require('./components/List');

var _List2 = _interopRequireDefault(_List);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Auction = function (_Component) {
  _inherits(Auction, _Component);

  function Auction(props) {
    _classCallCheck(this, Auction);

    var _this = _possibleConstructorReturn(this, (Auction.__proto__ || Object.getPrototypeOf(Auction)).call(this, props));

    _this.header = new _Header2.default();
    _this.list = new _List2.default();
    _this.footer = new _Footer2.default();
    _this.host = document.createElement('div');
    _this.host.classList.add('application-container');
    _this.main = document.createElement('main');
    _this.main.classList.add('main');

    return _this;
  }

  _createClass(Auction, [{
    key: 'render',
    value: function render() {
      this.main.append(this.list.update());
      var toRender = [this.header.update(), this.main, this.footer.update()];

      return toRender;
    }
  }]);

  return Auction;
}(_framework.Component);

exports.default = Auction;
},{"./framework":"src/framework/index.js","./utils":"src/utils/index.js","./components/Header":"src/components/Header.js","./components/Footer":"src/components/Footer.js","./components/List":"src/components/List.js"}],"src/framework/Router.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Component2 = require('./Component');

var _Component3 = _interopRequireDefault(_Component2);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ANY_PATH = '*';

var Router = function (_Component) {
  _inherits(Router, _Component);

  function Router(routes) {
    _classCallCheck(this, Router);

    var _this = _possibleConstructorReturn(this, (Router.__proto__ || Object.getPrototypeOf(Router)).call(this));

    _this.state = {
      activeRoute: null,
      activeComponent: null,
      routes: routes
    };

    _this.host = document.createElement('div');

    window.addEventListener('hashchange', function () {
      return _this.handleUrlChange(_this.path);
    });

    _this.handleUrlChange(_this.path);
    return _this;
  }

  _createClass(Router, [{
    key: 'handleUrlChange',
    value: function handleUrlChange(url) {
      var _state = this.state,
          routes = _state.routes,
          activeRoute = _state.activeRoute;

      var nextRoute = routes.find(function (_ref) {
        var href = _ref.href;
        return (0, _utils.isEqualPaths)(href, url);
      });

      if (!nextRoute) {
        nextRoute = routes.find(function (_ref2) {
          var href = _ref2.href;
          return href === ANY_PATH;
        }); //looking for any route
      }

      if (nextRoute && activeRoute !== nextRoute) {
        if (!!nextRoute.redirectTo) {
          return this.handleRedirect(nextRoute.redirectTo);
        }

        if (!!nextRoute.onEnter) {
          return this.handleOnEnter(nextRoute, url);
        }

        this.applyRoute(nextRoute, url);
      }
    }
  }, {
    key: 'handleRedirect',
    value: function handleRedirect(url) {
      window.location.hash = url;
    }
  }, {
    key: 'handleOnEnter',
    value: function handleOnEnter(nextRoute, url) {
      var href = nextRoute.href;

      var params = (0, _utils.extractUrlParams)(href, url);

      nextRoute.onEnter(params, this.handleRedirect, nextRoute);
    }
  }, {
    key: 'applyRoute',
    value: function applyRoute(route, url) {
      var href = route.href,
          Component = route.component;
      var activeComponent = this.state.activeComponent;


      var componentInstance = new Component({
        params: (0, _utils.extractUrlParams)(href, this.path),
        replace: this.handleRedirect
      });

      if (activeComponent) {
        activeComponent.unmount();
      }

      this.updateState({
        activeRoute: route,
        activeComponent: componentInstance
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return this.state.activeComponent.update();
    }
  }, {
    key: 'path',
    get: function get() {
      return window.location.hash.slice(1);
    }
  }]);

  return Router;
}(_Component3.default);

exports.default = Router;
},{"./Component":"src/framework/Component.js","../utils":"src/utils/index.js"}],"src/components/service/AuthService.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var store = exports.store = function store(theForm, logStore) {
  logStore.push(theForm);
  var logStoreList = JSON.stringify(logStore);
  localStorage.setItem("logStore", logStoreList);

  console.log(localStorage);
  return false;
};
var logStorage = exports.logStorage = [];
var itemStore = exports.itemStore = [];
var storeData = exports.storeData = function storeData(data, itemStorage) {
  var i = [];

  if (data.file) {
    data.file.then(function (data) {
      i[0] = data;
      return data;
    });
    console.log(itemStorage);
  }
  data.file = i;
  itemStorage.push(data);
  var itemStoreList = JSON.stringify(itemStorage);
  localStorage.setItem("itemStorage", itemStoreList);
};
//function to sign in
function login(theForm) {
  document.getElementById('welcomeMessage').innerHTML = "";
  var inputUsername = theForm["username"];
  var inputPassword = theForm["password"];
  var username = inputUsername.value;
  var password = inputPassword.value;
  if (username == localStorage.getItem('username') && password == localStorage.getItem('password')) {
    document.getElementById('welcomeMessage').innerHTML = "Welcome " + localStorage.getItem('username') + "!";
  } else {
    document.getElementById('welcomeMessage').innerHTML = "Invalid Log-in!";
  }
  return false;
} // end login()
var getBase64Image = exports.getBase64Image = function getBase64Image(img) {
  var canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;

  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);

  var dataURL = canvas.toDataURL("image/png");

  return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
};
var getBet = exports.getBet = function getBet() {};
},{}],"src/components/create.css":[function(require,module,exports) {

var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"node_modules/parcel/src/builtins/css-loader.js"}],"src/components/СreateBid.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _framework = require('../framework');

var _utils = require('../utils');

var _AuthService = require('./service/AuthService');

require('./create.css');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CreateBid = function (_Component) {
    _inherits(CreateBid, _Component);

    function CreateBid(props) {
        _classCallCheck(this, CreateBid);

        var _this = _possibleConstructorReturn(this, (CreateBid.__proto__ || Object.getPrototypeOf(CreateBid)).call(this, props));

        _this.host = document.createElement('div');
        _this.host.classList.add('login-form__container');

        _this.host.addEventListener('submit', function (ev) {
            return _this.handleSubmit(ev);
        });
        _this.banImg = document.getElementById('bannerImg');
        _this.result = document.getElementById('res');
        _this.img = document.getElementById('tableBanner');

        return _this;
    }

    _createClass(CreateBid, [{
        key: 'handleSubmit',
        value: function handleSubmit(ev) {
            ev.preventDefault();
            var bidData = {
                betname: ev.target.betname.value,
                description: ev.target.decription.value,
                price: ev.target.price.value,
                file: this.saveTo(ev.target.bannerImg.files[0])

            };
            console.log(bidData.file);
            localStorage.clear();
            return (0, _AuthService.storeData)(bidData, _AuthService.itemStore);
        }
    }, {
        key: 'saveTo',
        value: function saveTo(image) {
            var file = image;
            var fReader = new FileReader();
            var img = document.getElementById('tableBanner');
            return new Promise(function (resolve) {
                fReader.onload = function () {
                    img.src = fReader.result;
                    console.log(img);
                    resolve((0, _AuthService.getBase64Image)(img));
                    localStorage.setItem("imgData", (0, _AuthService.getBase64Image)(img));
                };
                fReader.readAsDataURL(file);
            });
        }
    }, {
        key: 'render',
        value: function render() {

            var form = '\n    <div class =\'wrapper-form\'>\n        <form class="bet-form" method="post">\n        <div class = \'wrapp-create\'>\n\t\t    <label for="betname">Item Name</label>\n\t\t    <input type="text" class="bet-form__name" name="betname" id="betname" required>\n\t\t    <label for="description">Description</label>\n\t\t    <input type="decription" class="decription-form" name="decription" id="decription" required>\n\t\t    <label for="start">Price</label>\n\t\t    <input type="price" class="price-form__start" name="price" id="price" required>\n            <input type="file" id="bannerImg"/>\n            <a href="#/auction" class="button--reset">Cancel</a>\n            <input type="submit" class="button create__button create__button--submit"  value="Create Bid">\n        </div>\n        <div class="wrapper-img">\n            <img src="" id="tableBanner" />\n            <div id="res"></div>     \n        </div>\n        \n         </form>\n    </div>\n    \n        ';

            return [(0, _utils.toHtml)(form)];
        }
    }]);

    return CreateBid;
}(_framework.Component);

exports.default = CreateBid;
},{"../framework":"src/framework/index.js","../utils":"src/utils/index.js","./service/AuthService":"src/components/service/AuthService.js","./create.css":"src/components/create.css"}],"src/AddBid.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _framework = require('./framework');

var _utils = require('./utils');

var _Header = require('./components/Header');

var _Header2 = _interopRequireDefault(_Header);

var _reateBid = require('./components/\u0421reateBid');

var _reateBid2 = _interopRequireDefault(_reateBid);

var _Footer = require('./components/Footer');

var _Footer2 = _interopRequireDefault(_Footer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AddBid = function (_Component) {
	_inherits(AddBid, _Component);

	function AddBid(props) {
		_classCallCheck(this, AddBid);

		var _this = _possibleConstructorReturn(this, (AddBid.__proto__ || Object.getPrototypeOf(AddBid)).call(this, props));

		_this.host = document.createElement('div');
		_this.host.classList.add('login__container');

		_this.header = new _Header2.default();
		_this.loginForm = new _reateBid2.default();
		_this.footer = new _Footer2.default();

		_this.main = document.createElement('main');
		_this.main.classList.add('main');
		return _this;
	}

	_createClass(AddBid, [{
		key: 'render',
		value: function render() {
			this.main.append(this.loginForm.update());

			return [this.header.update(), this.main, this.footer.update()];
		}
	}]);

	return AddBid;
}(_framework.Component);

exports.default = AddBid;
},{"./framework":"src/framework/index.js","./utils":"src/utils/index.js","./components/Header":"src/components/Header.js","./components/СreateBid":"src/components/СreateBid.js","./components/Footer":"src/components/Footer.js"}],"src/components/login.css":[function(require,module,exports) {

var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"node_modules/parcel/src/builtins/css-loader.js"}],"src/components/LoginForm.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _framework = require('../framework');

var _utils = require('../utils');

require('./login.css');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LoginForm = function (_Component) {
	_inherits(LoginForm, _Component);

	function LoginForm(props) {
		_classCallCheck(this, LoginForm);

		var _this = _possibleConstructorReturn(this, (LoginForm.__proto__ || Object.getPrototypeOf(LoginForm)).call(this, props));

		_this.host = document.createElement('div');
		_this.host.classList.add('login-form__container');

		_this.host.addEventListener('submit', function (ev) {
			return _this.handleSubmit(ev);
		});

		return _this;
	}

	_createClass(LoginForm, [{
		key: 'handleSubmit',
		value: function handleSubmit(ev) {
			ev.preventDefault();

			var userData = {
				username: ev.target.username.value,
				password: ev.target.password.value
			};

			return this.props.username;
			console.log(this.props);
		}
	}, {
		key: 'render',
		value: function render() {

			var f = '\n<form class="login-form" method="post">\n\t<label for="username">Username:</label>\n\t<input type="text" class="login-form__name" name="username" id="username" required>\n\t<label for="password">Password:</label>\n\t<input type="password" class="login-form__password" name="password" id="password" required>\n\t<div class="login-form__button-wrapper">\n\t\t<input type="submit" class="button login-form__button button--sign-in"\n\t\t\tvalue="Login">\n\t\t<a href="#/register" class="button login-form__button button--sign-up">\n\t\t\tSign up\n\t\t</a>\n\t</div>\n</form>\n\t\t';
			var form = (0, _utils.toHtml)(f);
			return form;
		}
	}]);

	return LoginForm;
}(_framework.Component);

exports.default = LoginForm;
},{"../framework":"src/framework/index.js","../utils":"src/utils/index.js","./login.css":"src/components/login.css"}],"src/Login.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _framework = require('./framework');

var _utils = require('./utils');

var _Header = require('./components/Header');

var _Header2 = _interopRequireDefault(_Header);

var _LoginForm = require('./components/LoginForm');

var _LoginForm2 = _interopRequireDefault(_LoginForm);

var _Footer = require('./components/Footer');

var _Footer2 = _interopRequireDefault(_Footer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Login = function (_Component) {
	_inherits(Login, _Component);

	function Login(props) {
		_classCallCheck(this, Login);

		var _this = _possibleConstructorReturn(this, (Login.__proto__ || Object.getPrototypeOf(Login)).call(this, props));

		_this.host = document.createElement('div');
		_this.host.classList.add('login__container');

		_this.header = new _Header2.default();
		_this.loginForm = new _LoginForm2.default();
		_this.footer = new _Footer2.default();

		_this.main = document.createElement('main');
		_this.main.classList.add('main');
		return _this;
	}

	_createClass(Login, [{
		key: 'render',
		value: function render() {
			this.main.append(this.loginForm.update());

			return [this.header.update(), this.main, this.footer.update()];
		}
	}]);

	return Login;
}(_framework.Component);

exports.default = Login;
},{"./framework":"src/framework/index.js","./utils":"src/utils/index.js","./components/Header":"src/components/Header.js","./components/LoginForm":"src/components/LoginForm.js","./components/Footer":"src/components/Footer.js"}],"src/components/contact.css":[function(require,module,exports) {

var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"node_modules/parcel/src/builtins/css-loader.js"}],"src/components/Contacts.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _framework = require('../framework');

var _utils = require('../utils');

require('./contact.css');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Contact = function (_Component) {
	_inherits(Contact, _Component);

	function Contact(props) {
		_classCallCheck(this, Contact);

		var _this = _possibleConstructorReturn(this, (Contact.__proto__ || Object.getPrototypeOf(Contact)).call(this, props));

		_this.host = document.createElement('div');
		_this.host.classList.add('contact-form__container');
		return _this;
	}

	_createClass(Contact, [{
		key: 'render',
		value: function render() {
			var f = '\n\t\t<div class="contact-wrapper">\n\t\t\t<div class="contacts">\n\t\t\t\t<h2>CONTACT US</h2>\n\t\t\t\t<a href="tel:5778887"><span>tel.:</span> 57-788-87</a><br>\n\t\t\t\t<a href="mailto:bet@bet.com"><span>email:</span> bet@bet.com</a>\n\t\t\t</div>\n\t\t\t<iframe width="100%" height="400" frameborder="0" style="border:0"\n        \t\tsrc="https://www.google.com/maps/embed/v1/place?key=AIzaSyAulJ782upLgK_Tvrip2rGgzi2BWtFu89o&q=EPAM,Kyiv" allowfullscreen>\n\t   \t\t</iframe>\n\t   \t</div>';

			var form = (0, _utils.toHtml)(f);
			return form;
		}
	}]);

	return Contact;
}(_framework.Component);

exports.default = Contact;
},{"../framework":"src/framework/index.js","../utils":"src/utils/index.js","./contact.css":"src/components/contact.css"}],"src/Contact.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _framework = require('./framework');

var _utils = require('./utils');

var _Header = require('./components/Header');

var _Header2 = _interopRequireDefault(_Header);

var _Contacts = require('./components/Contacts');

var _Contacts2 = _interopRequireDefault(_Contacts);

var _Footer = require('./components/Footer');

var _Footer2 = _interopRequireDefault(_Footer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Login = function (_Component) {
	_inherits(Login, _Component);

	function Login(props) {
		_classCallCheck(this, Login);

		var _this = _possibleConstructorReturn(this, (Login.__proto__ || Object.getPrototypeOf(Login)).call(this, props));

		_this.host = document.createElement('div');
		_this.host.classList.add('login__container');

		_this.header = new _Header2.default();
		_this.loginForm = new _Contacts2.default();
		_this.footer = new _Footer2.default();

		_this.main = document.createElement('main');
		_this.main.classList.add('main');
		return _this;
	}

	_createClass(Login, [{
		key: 'render',
		value: function render() {
			this.main.append(this.loginForm.update());

			return [this.header.update(), this.main, this.footer.update()];
		}
	}]);

	return Login;
}(_framework.Component);

exports.default = Login;
},{"./framework":"src/framework/index.js","./utils":"src/utils/index.js","./components/Header":"src/components/Header.js","./components/Contacts":"src/components/Contacts.js","./components/Footer":"src/components/Footer.js"}],"src/components/register.css":[function(require,module,exports) {

var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"node_modules/parcel/src/builtins/css-loader.js"}],"src/components/RegisterForm.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _framework = require('../framework');

var _utils = require('../utils');

var _AuthService = require('./service/AuthService');

require('./register.css');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RegisterForm = function (_Component) {
	_inherits(RegisterForm, _Component);

	function RegisterForm(props) {
		_classCallCheck(this, RegisterForm);

		var _this = _possibleConstructorReturn(this, (RegisterForm.__proto__ || Object.getPrototypeOf(RegisterForm)).call(this, props));

		_this.host = document.createElement('div');
		_this.host.classList.add('login-form__container');

		_this.host.addEventListener('submit', function (ev) {
			return _this.handleSubmit(ev);
		});

		return _this;
	}

	_createClass(RegisterForm, [{
		key: 'handleSubmit',
		value: function handleSubmit(ev) {
			ev.preventDefault();

			var userData = {
				username: ev.target.username.value,
				password: ev.target.password.value,
				password_repeat: ev.target.password_repeat.value,
				email: ev.target.email.value

			};
			console.log(localStorage);
			return (0, _AuthService.store)(userData, _AuthService.logStorage);
		}
	}, {
		key: 'render',
		value: function render() {
			var f = '\n\t\t<form class="register-form">\n\t\t<label for="username">Username:</label>\n\t\t<input type="text" class="register-form__name" name="username" id="username" required>\n\t\t<label for="email">Email:</label>\n\t\t<input type="email" class="register-form__email" name="email" id="email" required>\n\t\t<label for="password">Password:</label>\n\t\t<input type="password" class="register-form__password" name="password"\n\t\t\tid="password" required>\n\t\t<label for="password_repeat">Confirm password:</label>\n\t\t<input type="password" class="register-form__password" name="password_repeat"\n\t\t\tid="password_repeat" required>\n\n\t\t<input type="submit" class="button register-form__button button--register"\n\t\t\tvalue="Sign up">\n\t</form>\n\t\t';
			var form = (0, _utils.toHtml)(f);
			return [form];
		}
	}]);

	return RegisterForm;
}(_framework.Component);

exports.default = RegisterForm;
},{"../framework":"src/framework/index.js","../utils":"src/utils/index.js","./service/AuthService":"src/components/service/AuthService.js","./register.css":"src/components/register.css"}],"src/Register.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _framework = require('./framework');

var _utils = require('./utils');

var _Header = require('./components/Header');

var _Header2 = _interopRequireDefault(_Header);

var _RegisterForm = require('./components/RegisterForm');

var _RegisterForm2 = _interopRequireDefault(_RegisterForm);

var _Footer = require('./components/Footer');

var _Footer2 = _interopRequireDefault(_Footer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Register = function (_Component) {
	_inherits(Register, _Component);

	function Register(props) {
		_classCallCheck(this, Register);

		var _this = _possibleConstructorReturn(this, (Register.__proto__ || Object.getPrototypeOf(Register)).call(this, props));

		_this.host = document.createElement('div');
		_this.host.classList.add('login__container');

		_this.header = new _Header2.default();
		_this.registerForm = new _RegisterForm2.default();
		_this.footer = new _Footer2.default();

		_this.main = document.createElement('main');
		_this.main.classList.add('main');
		return _this;
	}

	_createClass(Register, [{
		key: 'render',
		value: function render() {
			this.main.append(this.registerForm.update());

			return [this.header.update(), this.main, this.footer.update()];
		}
	}]);

	return Register;
}(_framework.Component);

exports.default = Register;
},{"./framework":"src/framework/index.js","./utils":"src/utils/index.js","./components/Header":"src/components/Header.js","./components/RegisterForm":"src/components/RegisterForm.js","./components/Footer":"src/components/Footer.js"}],"src/components/Gallery.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _framework = require('../framework');

var _utils = require('../utils');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Gallery = function (_Component) {
  _inherits(Gallery, _Component);

  function Gallery(props) {
    _classCallCheck(this, Gallery);

    var _this = _possibleConstructorReturn(this, (Gallery.__proto__ || Object.getPrototypeOf(Gallery)).call(this, props));

    (0, _utils.bindAll)(_this);
    _this.host = document.createElement('div');
    _this.host.classList.add('login-form__container');

    return _this;
  }

  _createClass(Gallery, [{
    key: 'render',
    value: function render() {

      var f = '\n        <div class="gallery cf"><div>\n        <img src="https://img1.moyo.ua/img/products/3828/83_1500x_1505364451.jpg" />\n        </div>\n        <div>\n        <img src="https://www.bhphotovideo.com/images/images2500x2500/samsung_sm_g960uzkaxaa_samsung_galaxy_s9_1394702.jpg"/>\n        </div>\n         <div>\n         <img src="https://www.passportauto.com/assets/stock/colormatched_01/white/640/cc_2018tos110001_01_640/cc_2018tos110001_01_640_1d6.jpg" />\n        </div>\n        <div>\n        <img src="https://besrefreshments.com/wp-content/uploads/2017/02/beverages5.jpg"/>\n      </div>\n     <div>\n      <img src="https://my.citrus.ua/imgcache/size_1000/uploads/shop/9/f/9f3728617fc6b9bd0acae80c57ee987b.jpg" />\n      </div>\n      <div>\n        <img src="https://gloimg.rglcdn.com/rosegal/pdm-provider-img/straight-product-img/20171226/T010666/T0106660065/goods-img/1514317216487549520.jpg" />\n      </div>\n</div>\n\t\t';
      var form = (0, _utils.toHtml)(f);
      return [form];
    }
  }]);

  return Gallery;
}(_framework.Component);

exports.default = Gallery;
},{"../framework":"src/framework/index.js","../utils":"src/utils/index.js"}],"src/GalleryMain.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _framework = require('./framework');

var _utils = require('./utils');

var _Header = require('./components/Header');

var _Header2 = _interopRequireDefault(_Header);

var _Gallery = require('./components/Gallery');

var _Gallery2 = _interopRequireDefault(_Gallery);

var _Footer = require('./components/Footer');

var _Footer2 = _interopRequireDefault(_Footer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GalleryMain = function (_Component) {
	_inherits(GalleryMain, _Component);

	function GalleryMain(props) {
		_classCallCheck(this, GalleryMain);

		var _this = _possibleConstructorReturn(this, (GalleryMain.__proto__ || Object.getPrototypeOf(GalleryMain)).call(this, props));

		_this.host = document.createElement('div');
		_this.host.classList.add('login__container');

		_this.header = new _Header2.default();
		_this.gallery = new _Gallery2.default();
		_this.footer = new _Footer2.default();

		_this.main = document.createElement('main');
		_this.main.classList.add('main');
		return _this;
	}

	_createClass(GalleryMain, [{
		key: 'render',
		value: function render() {
			this.main.append(this.gallery.update());

			return [this.header.update(), this.main, this.footer.update()];
		}
	}]);

	return GalleryMain;
}(_framework.Component);

exports.default = GalleryMain;
},{"./framework":"src/framework/index.js","./utils":"src/utils/index.js","./components/Header":"src/components/Header.js","./components/Gallery":"src/components/Gallery.js","./components/Footer":"src/components/Footer.js"}],"src/components/buy.css":[function(require,module,exports) {

var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"node_modules/parcel/src/builtins/css-loader.js"}],"src/components/FormPur.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _framework = require('../framework');

var _utils = require('../utils');

require('./buy.css');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormPur = function (_Component) {
    _inherits(FormPur, _Component);

    function FormPur(props) {
        _classCallCheck(this, FormPur);

        var _this = _possibleConstructorReturn(this, (FormPur.__proto__ || Object.getPrototypeOf(FormPur)).call(this, props));

        _this.host = document.createElement('div');
        _this.host.classList.add('login-form__container');
        return _this;
    }

    _createClass(FormPur, [{
        key: 'render',
        value: function render() {

            var f = '\n        <label for="name" class="pay-label">\n            <strong>Full name:</strong> \n            <input type="text" id="name" name="user-name" class="pay-input" placeholder="Mathieu Mayer" pattern="^[A-Za-zs.-]+$" required="">\n          </label>\n\n        <div class="autorisation">\n            <label for="email" class="pay-label">\n              <strong>Email adress:</strong> \n              <input type="email" id="email" name="user_email" class="pay-input" placeholder="mathieu.mm@me.com" required="" pattern="^[-w.]+@([A-z0-9][-A-z0-9]+.)+[A-z]{2,4}$">\n            </label>\n            <label for="pwd" class="pay-label">\n                <strong>Choose a password:</strong> \n                <input type="password" id="pwd" name="user_pwd" class="pay-input" placeholder=" " required="" minlength="5">\n                </label>\n            </div> \n            <div class="flex-bottom"> \n        </div>\n\n        <div class="card-details">\n        <label for="card-number"><strong>Card number:</strong>\n            <input type="number" id="card-number" name="cardnumber" required="" min="10000000000" placeholder=" ">\n        </label>\n        <label for="card-date"><strong>Expiry date:</strong>\n            <input type="text" id="card-date" name="expiration" placeholder="DD/MM/YY" required="" pattern="(0[1-9]|1[0-9]|2[0-9]|3[01])[- /.](0[1-9]|1[012])[/ -.][0-9]{2}">\n        </label>\n        <label for="card-code"><strong>Code:</strong>\n            <input type="number" id="card-code" name="codenumber" required="" min="100" max="999" placeholder=" ">\n        </label>\n    </div>      \n    </div>\n    <div class="flex-end">\n        <label for="agree">I agree to the <a href="#">Terms & Conditions</a></label>\n        <input type="checkbox" name="agree" id="agree" value="0">\n        <button class="button button_green">Place order</button>\n        <button class="button button_bordered">Print a quote</button>\n    </div>\n    </div>\n\t\t';
            var form = (0, _utils.toHtml)(f);
            return form;
        }
    }]);

    return FormPur;
}(_framework.Component);

exports.default = FormPur;
},{"../framework":"src/framework/index.js","../utils":"src/utils/index.js","./buy.css":"src/components/buy.css"}],"src/Purchase.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _framework = require('./framework');

var _utils = require('./utils');

var _Header = require('./components/Header');

var _Header2 = _interopRequireDefault(_Header);

var _FormPur = require('./components/FormPur');

var _FormPur2 = _interopRequireDefault(_FormPur);

var _Footer = require('./components/Footer');

var _Footer2 = _interopRequireDefault(_Footer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Purchase = function (_Component) {
	_inherits(Purchase, _Component);

	function Purchase(props) {
		_classCallCheck(this, Purchase);

		var _this = _possibleConstructorReturn(this, (Purchase.__proto__ || Object.getPrototypeOf(Purchase)).call(this, props));

		_this.host = document.createElement('div');
		_this.host.classList.add('login__container');

		_this.header = new _Header2.default();
		_this.formPur = new _FormPur2.default();
		_this.footer = new _Footer2.default();

		_this.main = document.createElement('main');
		_this.main.classList.add('main');
		return _this;
	}

	_createClass(Purchase, [{
		key: 'render',
		value: function render() {
			this.main.append(this.formPur.update());

			return [this.header.update(), this.main, this.footer.update()];
		}
	}]);

	return Purchase;
}(_framework.Component);

exports.default = Purchase;
},{"./framework":"src/framework/index.js","./utils":"src/utils/index.js","./components/Header":"src/components/Header.js","./components/FormPur":"src/components/FormPur.js","./components/Footer":"src/components/Footer.js"}],"src/routes.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Auction = require('./Auction');

var _Auction2 = _interopRequireDefault(_Auction);

var _AddBid = require('./AddBid');

var _AddBid2 = _interopRequireDefault(_AddBid);

var _Login = require('./Login');

var _Login2 = _interopRequireDefault(_Login);

var _Contact = require('./Contact');

var _Contact2 = _interopRequireDefault(_Contact);

var _Register = require('./Register');

var _Register2 = _interopRequireDefault(_Register);

var _GalleryMain = require('./GalleryMain');

var _GalleryMain2 = _interopRequireDefault(_GalleryMain);

var _Purchase = require('./Purchase');

var _Purchase2 = _interopRequireDefault(_Purchase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import { comp } from './service/AuthService';
exports.default = [{
  href: '',
  redirectTo: '/'
}, {
  href: '/',
  component: _Auction2.default
  //canActivate: comp.isAuthorized
}, {
  href: '/auction',
  component: _Auction2.default
  //canActivate: comp.isAuthorized
}, {
  href: '/addbid',
  component: _AddBid2.default
  //canActivate: comp.isAuthorized
}, {
  href: '/login',
  component: _Login2.default
}, {
  href: '/contacts',
  component: _Contact2.default
}, {
  href: '/register',
  component: _Register2.default
}, {
  href: '/gallery',
  component: _GalleryMain2.default
}, {
  href: '/buy',
  component: _Purchase2.default
}];
},{"./Auction":"src/Auction.js","./AddBid":"src/AddBid.js","./Login":"src/Login.js","./Contact":"src/Contact.js","./Register":"src/Register.js","./GalleryMain":"src/GalleryMain.js","./Purchase":"src/Purchase.js"}],"src/index.js":[function(require,module,exports) {
'use strict';

var _utils = require('./utils');

var _Auction = require('./Auction');

var _Auction2 = _interopRequireDefault(_Auction);

var _Router = require('./framework/Router');

var _Router2 = _interopRequireDefault(_Router);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = new _Router2.default(_routes2.default);

var root = (0, _utils.clearChildren)(document.getElementById('root'));

root.appendChild(router.host);
},{"./utils":"src/utils/index.js","./Auction":"src/Auction.js","./framework/Router":"src/framework/Router.js","./routes":"src/routes.js"}],"node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '59925' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();

      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
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
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
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

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

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

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["node_modules/parcel/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.37d16386.map