(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[4],{"34ay":function(e,t,n){"use strict";function r(e){var t,n="undefined"===typeof e?sessionStorage.getItem("antd-pro-authority"):e;try{n&&(t=JSON.parse(n))}catch(e){t=n}return"string"===typeof t?[t]:t}function u(e){var t="string"===typeof e?[e]:e;return sessionStorage.setItem("antd-pro-authority",JSON.stringify(t))}Object.defineProperty(t,"__esModule",{value:!0}),t.getAuthority=r,t.setAuthority=u},"5Vq6":function(e,t,n){"use strict";var r=n("g09b");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var u=r(n("jehZ")),o=r(n("Y/ft")),a=n("ArA+"),i=r(n("q1tI")),f=r(n("8jkW")),c=function(e){var t=e.component,n=e.render,r=e.authority,c=e.redirectPath,l=(0,o.default)(e,["component","render","authority","redirectPath"]);return i.default.createElement(f.default,{authority:r,noMatch:i.default.createElement(a.Route,(0,u.default)({},l,{render:function(){return i.default.createElement(a.Redirect,{to:{pathname:c}})}}))},i.default.createElement(a.Route,(0,u.default)({},l,{render:function(e){return t?i.default.createElement(t,e):n(e)}})))},l=c;t.default=l},"7mRv":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=t.CURRENT=void 0;var r="NULL";t.CURRENT=r;var u=function(e){return function(n){return n?("function"===typeof n&&(t.CURRENT=r=n()),("[object String]"===Object.prototype.toString.call(n)||Array.isArray(n))&&(t.CURRENT=r=n)):t.CURRENT=r="NULL",e}},o=function(e){return u(e)};t.default=o},"8jkW":function(e,t,n){"use strict";var r=n("g09b");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var u=r(n("q1tI")),o=r(n("W2l7")),a=function(e){var t=e.children,n=e.authority,r=e.noMatch,a=void 0===r?null:r,i="undefined"===typeof t?null:t,f=(0,o.default)(n,i,a);return u.default.createElement(u.default.Fragment,null,f)},i=a;t.default=i},"ArA+":function(e,t,n){"use strict";n.r(t),n.d(t,"dynamic",function(){return b}),n.d(t,"router",function(){return P});var r=n("2iEm");n.d(t,"Link",function(){return r["a"]});var u=n("uNOt");n.d(t,"NavLink",function(){return u["a"]});var o=n("mf+E");n.d(t,"Redirect",function(){return o["a"]});var a=n("2INN");n.d(t,"Route",function(){return a["a"]});var i=n("wIs1");n.d(t,"withRouter",function(){return i["a"]});var f=n("q1tI"),c=n.n(f),l=n("CnBM"),d=n.n(l),s=n("RFCh"),p=n.n(s),y=n("Mupe");for(var v in y)["Link","NavLink","Redirect","Route","dynamic","router","withRouter","default"].indexOf(v)<0&&function(e){n.d(t,e,function(){return y[e]})}(v);function m(e){return m="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},m(e)}function h(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function g(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),r.forEach(function(t){h(e,t,n[t])})}return e}function b(e,t){var n=d.a,r={loading:function(e){e.error,e.isLoading;return c.a.createElement("p",null,"loading...")}};if("function"===typeof e.then?r.loader=function(){return e}:"object"===m(e)&&(r=g({},r,e)),r=g({},r,t),e.render&&(r.render=function(t,n){return e.render(n,t)}),e.modules){n=d.a.Map;var u={},o=e.modules();Object.keys(o).forEach(function(e){var t=o[e];"function"!==typeof t.then?u[e]=t:u[e]=function(){return t.then(function(e){return e.default||e})}}),r.loader=u}return n(r)}function O(){p.a.push.apply(p.a,arguments)}function E(){p.a.replace.apply(p.a,arguments)}function R(){p.a.go.apply(p.a,arguments)}function j(){p.a.goBack.apply(p.a,arguments)}function k(){p.a.goForward.apply(p.a,arguments)}var P={push:O,replace:E,go:R,goBack:j,goForward:k}},HIRO:function(e,t,n){"use strict";var r=n("g09b");Object.defineProperty(t,"__esModule",{value:!0}),t.default=t.isComponentClass=void 0;var u=r(n("q1tI")),o=r(n("W2l7")),a=function(){return 403},i=function e(t){if(!t)return!1;var n=Object.getPrototypeOf(t);return n===u.default.Component||n===Function.prototype||e(n)};t.isComponentClass=i;var f=function(e){if(i(e)){var t=e;return function(e){return u.default.createElement(t,e)}}return u.default.isValidElement(e)?function(t){return u.default.cloneElement(e,t)}:function(){return e}},c=function(e,t){var n=!1;if(t&&(n=function(){return t}),!e)throw new Error("authority is required");return function(t){var r=(0,o.default)(e,t,n||a);return f(r)}},l=c;t.default=l},HZnN:function(e,t,n){"use strict";var r=n("g09b");Object.defineProperty(t,"__esModule",{value:!0}),t.default=t.reloadAuthorized=void 0;var u=r(n("yTbQ")),o=n("34ay"),a=(0,u.default)((0,o.getAuthority)()),i=function(){a=(0,u.default)((0,o.getAuthority)())};t.reloadAuthorized=i;var f=a;t.default=f},Mupe:function(e,t){},OJEV:function(e,t,n){"use strict";var r=n("tAuX"),u=n("g09b");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=u(n("2Taf")),a=u(n("vZ4D")),i=u(n("l4Ni")),f=u(n("ujKo")),c=u(n("MhPg")),l=r(n("q1tI")),d=n("2gLi"),s=n("HZnN"),p=u(n("3a4m")),y=function(e){function t(){return(0,o.default)(this,t),(0,i.default)(this,(0,f.default)(t).apply(this,arguments))}return(0,c.default)(t,e),(0,a.default)(t,[{key:"componentDidMount",value:function(){null==sessionStorage.getItem("oauthCallback")&&(0,d.currentUser)().then(function(e){if(null!=e&&200==e.code){var t=JSON.parse(e.data);t.authenticated&&"anonymousUser"!==t.username&&(sessionStorage.setItem("currentUser",e.data),sessionStorage.setItem("antd-pro-authority",JSON.stringify(t.authorities)),(0,s.reloadAuthorized)(),p.default.push("/welcome"),sessionStorage.setItem("oauthCallback",1))}}).catch(function(e){}),p.default.push("/")}},{key:"render",value:function(){return l.default.createElement(l.default.Fragment,null)}}]),t}(l.PureComponent);t.default=y},OWfW:function(e,t,n){"use strict";var r=n("g09b");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,n("T2oS");var u=r(n("W9HT")),o=r(n("Y/ft")),a=r(n("2Taf")),i=r(n("vZ4D")),f=r(n("l4Ni")),c=r(n("ujKo")),l=r(n("MhPg")),d=r(n("q1tI")),s=r(n("Y+p1")),p=n("HIRO"),y=function(e){function t(){var e,n;(0,a.default)(this,t);for(var r=arguments.length,u=new Array(r),o=0;o<r;o++)u[o]=arguments[o];return n=(0,f.default)(this,(e=(0,c.default)(t)).call.apply(e,[this].concat(u))),n.state={component:function(){return null}},n.shouldComponentUpdate=function(e,t){var r=n.state.component;return(0,s.default)(e,n.props)||n.setRenderComponent(e),t.component!==r},n.checkIsInstantiation=function(e){if((0,p.isComponentClass)(e)){var t=e;return function(e){return d.default.createElement(t,e)}}return d.default.isValidElement(e)?function(t){return d.default.cloneElement(e,t)}:function(){return e}},n}return(0,l.default)(t,e),(0,i.default)(t,[{key:"componentDidMount",value:function(){this.setRenderComponent(this.props)}},{key:"setRenderComponent",value:function(e){var t=this,n=this.checkIsInstantiation(e.ok),r=this.checkIsInstantiation(e.error);e.promise.then(function(){return t.setState({component:n}),!0}).catch(function(){t.setState({component:r})})}},{key:"render",value:function(){var e=this.state.component,t=this.props,n=(t.ok,t.error,t.promise,(0,o.default)(t,["ok","error","promise"]));return e?d.default.createElement(e,n):d.default.createElement("div",{style:{width:"100%",height:"100%",margin:"auto",paddingTop:50,textAlign:"center"}},d.default.createElement(u.default,{size:"large"}))}}]),t}(d.default.Component);t.default=y},W2l7:function(e,t,n){"use strict";var r=n("g09b");Object.defineProperty(t,"__esModule",{value:!0}),t.default=t.checkPermissions=void 0;var u=r(n("q1tI")),o=n("7mRv"),a=r(n("OWfW")),i=function(e,t,n,r){if(!e)return n;if(Array.isArray(e)){if(Array.isArray(t)){if(t.some(function(t){return e.includes(t)}))return n}else if(e.includes(t))return n;return r}if("string"===typeof e){if(Array.isArray(t)){if(t.some(function(t){return e===t}))return n}else if(e===t)return n;return r}if(e instanceof Promise)return u.default.createElement(a.default,{ok:n,error:r,promise:e});if("function"===typeof e)try{var o=e(t);return o instanceof Promise?u.default.createElement(a.default,{ok:n,error:r,promise:o}):o?n:r}catch(e){throw e}throw new Error("unsupported parameters")};function f(e,t,n){return i(e,o.CURRENT,t,n)}t.checkPermissions=i;var c=f;t.default=c},tAuX:function(e,t){function n(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)if(Object.prototype.hasOwnProperty.call(e,n)){var r=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(e,n):{};r.get||r.set?Object.defineProperty(t,n,r):t[n]=e[n]}return t["default"]=e,t}e.exports=n},yTbQ:function(e,t,n){"use strict";var r=n("g09b");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var u=r(n("8jkW")),o=r(n("5Vq6")),a=r(n("HIRO")),i=r(n("W2l7")),f=r(n("7mRv"));u.default.Secured=a.default,u.default.AuthorizedRoute=o.default,u.default.check=i.default;var c=(0,f.default)(u.default),l=c;t.default=l}}]);