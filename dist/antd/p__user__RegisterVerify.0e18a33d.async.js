(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[12],{hJcD:function(e,t,a){"use strict";var r=a("g09b"),s=a("tAuX");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("jCWc");var l=r(a("kPKH"));a("FJo9");var o=r(a("L41K"));a("14J3");var d=r(a("BMrR"));a("+L6B");var u=r(a("2/Rp"));a("5NDa");var f=r(a("5rEg"));a("Pwec");var i=r(a("CtXQ"));a("miYZ");var n=r(a("tsqr")),p=r(a("2Taf")),c=r(a("vZ4D")),m=r(a("l4Ni")),g=r(a("ujKo")),v=r(a("MhPg"));a("y8nQ");var w,y,E,h=r(a("Vl3Y")),M=s(a("q1tI")),P=a("Y2fQ"),k=r(a("Mbp2")),C=a("13DY"),b=r(a("3a4m")),F=(w=h.default.create(),w((E=function(e){function t(){var e,a;(0,p.default)(this,t);for(var r=arguments.length,s=new Array(r),l=0;l<r;l++)s[l]=arguments[l];return a=(0,m.default)(this,(e=(0,g.default)(t)).call.apply(e,[this].concat(s))),a.handleOk=function(e){e.preventDefault(),a.props.form.validateFields(function(e,t){if(!e){a.props.form.validateFields(["passwordRepeat"],{force:!0}),console.log("Received values of form: ",t),console.log("this.props.loca5ion.query ",a.props.location.query);var r=a.props.location.query.verifyCode;(0,C.registerVerify)(r,t.password).then(function(e){console.log(e),null!=e&&200===e.code&&(n.default.success((0,P.formatMessage)({id:"\u6ce8\u518c\u6210\u529f"})),b.default.push("/user/login"))})}})},a.compareTwoPassword=function(e,t,r){var s=a.props.form.getFieldValue("password"),l=a.props.form.getFieldValue("passwordRepeat");s!==l?r("\u4e24\u6b21\u5bc6\u7801\u4e0d\u4e00\u81f4"):r()},a}return(0,v.default)(t,e),(0,c.default)(t,[{key:"render",value:function(){var e=this.props.form,t=e.getFieldDecorator;return M.default.createElement(d.default,{justify:"space-around",type:"flex",className:k.default.main},M.default.createElement(l.default,{xs:16,sm:12,md:8,lg:6,xl:4},M.default.createElement("h3",null,M.default.createElement(P.FormattedMessage,{id:"user.register.verify.setPassword"})),M.default.createElement(h.default,null,M.default.createElement(h.default.Item,null,t("password",{rules:[{required:!0,message:(0,P.formatMessage)({id:"user.register.verify.password.errorMessage"})}]})(M.default.createElement(f.default.Password,{name:"password",type:"password",autoComplete:"false",allowClear:!0,suffix:M.default.createElement(i.default,{type:"eye-invisible",style:{opacity:.5}}),onPressEnter:this.handleOk,placeholder:(0,P.formatMessage)({id:"user.register.verify.password"})}))),M.default.createElement(h.default.Item,null,t("passwordRepeat",{rules:[{required:!0,message:(0,P.formatMessage)({id:"user.register.verify.password.repeat.errorMessage"})},{validator:this.compareTwoPassword}]})(M.default.createElement(f.default.Password,{name:"passwordRepeat",type:"password",autoComplete:"false",allowClear:!0,suffix:M.default.createElement(i.default,{type:"eye-invisible",style:{opacity:.5}}),onPressEnter:this.handleOk,placeholder:(0,P.formatMessage)({id:"user.register.verify.password.repeat"})}))),M.default.createElement(d.default,null,M.default.createElement(u.default,{type:"primary",className:k.default.button,onClick:this.handleOk},M.default.createElement(P.FormattedMessage,{id:"user.register.verify.ok"})))),M.default.createElement("div",{style:{margin:"1em 0"}},M.default.createElement(o.default,{size:"small",current:2,direction:"vertical"},M.default.createElement(o.default.Step,{title:(0,P.formatMessage)({id:"user.register.steps.0"})}),M.default.createElement(o.default.Step,{title:(0,P.formatMessage)({id:"user.register.steps.1"})}),M.default.createElement(o.default.Step,{title:(0,P.formatMessage)({id:"user.register.steps.2"})}),M.default.createElement(o.default.Step,{title:(0,P.formatMessage)({id:"user.register.steps.3"})})))))}}]),t}(M.PureComponent),y=E))||y),q=F;t.default=q}}]);