(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[8],{iwq7:function(e,t,a){"use strict";var r=a("g09b"),l=a("tAuX");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("jCWc");var s=r(a("kPKH"));a("14J3");var n=r(a("BMrR"));a("+L6B");var u=r(a("2/Rp"));a("5NDa");var o=r(a("5rEg"));a("Pwec");var d=r(a("CtXQ")),f=r(a("2Taf")),i=r(a("vZ4D")),c=r(a("l4Ni")),m=r(a("ujKo")),g=r(a("MhPg"));a("miYZ");var p=r(a("tsqr"));a("y8nQ");var E,v,y,h,w=r(a("Vl3Y")),M=l(a("q1tI")),b=(r(a("17x9")),a("Y2fQ")),k=r(a("WxbV")),P=a("MuoO"),x=a("ArA+"),C=r(a("2gLi")),O="userLogin",q=(E=w.default.create(),v=(0,P.connect)(function(e){return{username:e[O].username,message:e[O].message}},function(e){return{userLogin:function(){p.default.info("userLogin request"),e({type:O+"/userLogin"})}}}),E(y=v((h=function(e){function t(){var e,a;(0,f.default)(this,t);for(var r=arguments.length,l=new Array(r),s=0;s<r;s++)l[s]=arguments[s];return a=(0,c.default)(this,(e=(0,m.default)(t)).call.apply(e,[this].concat(l))),a.handleOk=function(e){e.preventDefault(),a.props.form.validateFields(function(e,t){e||(console.log("Received values of form: ",t),(0,C.default)(t.username,t.password).then(function(e){console.log(e),200===e.code?(sessionStorage.setItem("CURRENT_USER",JSON.stringify(e.data)),x.router.push("/")):p.default.error((0,b.formatMessage)({id:e.message}))}))})},a}return(0,g.default)(t,e),(0,i.default)(t,[{key:"render",value:function(){var e=this.props,t=(e.loading,e.form),a=(e.dispatch,t.getFieldDecorator);return M.default.createElement(n.default,{justify:"space-around",type:"flex"},M.default.createElement(s.default,{xs:16,sm:12,md:8,lg:6,xl:4},M.default.createElement(w.default,null,M.default.createElement(w.default.Item,null,a("username",{rules:[{required:!0,message:(0,b.formatMessage)({id:"user.login.username.errorMessage"})}]})(M.default.createElement(o.default,{name:"username",suffix:M.default.createElement(d.default,{type:"user",style:{color:"rgba(0,0,0,.25)"}}),onPressEnter:this.handleOk,placeholder:(0,b.formatMessage)({id:"user.login.username"})}))),M.default.createElement(w.default.Item,null,a("password",{rules:[{required:!0,message:(0,b.formatMessage)({id:"user.login.password.errorMessage"})}]})(M.default.createElement(o.default.Password,{type:"password",autoComplete:"false",allowClear:!0,suffix:M.default.createElement(d.default,{type:"eye-invisible",style:{opacity:.5}}),onPressEnter:this.handleOk,placeholder:(0,b.formatMessage)({id:"user.login.password"})}))),M.default.createElement(n.default,null,M.default.createElement(u.default,{type:"primary",className:k.default.button,onClick:this.handleOk},M.default.createElement(b.FormattedMessage,{id:"user.login.signIn"})),M.default.createElement(n.default,{justify:"space-between",type:"flex"},M.default.createElement("span",null,M.default.createElement(b.FormattedMessage,{id:"user.login.Username"}),": test"),M.default.createElement("span",null,M.default.createElement(b.FormattedMessage,{id:"user.login.Password"}),": 123456"))))))}}]),t}(M.PureComponent),y=h))||y)||y),L=q;t.default=L}}]);