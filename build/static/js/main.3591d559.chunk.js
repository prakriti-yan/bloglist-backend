(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{17:function(e,t,n){e.exports=n(41)},41:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(16),l=n.n(c),u=n(1),o=n.n(u),s=n(2),i=n(3),m=n(5),p=n.n(m),f={login:function(){var e=Object(s.a)(o.a.mark(function e(t){var n;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,p.a.post("http://localhost:3003/api/login",t);case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()},b="http://localhost:3003/api/blogs",v=null,d={getAll:function(){var e=Object(s.a)(o.a.mark(function e(){var t;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,p.a.get(b);case 2:return t=e.sent,e.abrupt("return",t.data);case 4:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}(),create:function(){var e=Object(s.a)(o.a.mark(function e(t){var n,a;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n={headers:{Authorization:v}},e.next=3,p.a.post(b,t,n);case 3:return a=e.sent,e.abrupt("return",a.data);case 5:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),setToken:function(e){v="bearer ".concat(e)},update:function(){var e=Object(s.a)(o.a.mark(function e(t,n){var a;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,p.a.put("".concat(b,"/").concat(t),n);case 2:return a=e.sent,e.abrupt("return",a.data);case 4:case"end":return e.stop()}},e)}));return function(t,n){return e.apply(this,arguments)}}(),remove:function(){var e=Object(s.a)(o.a.mark(function e(t){var n,a;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n={headers:{Authorization:v}},e.next=4,p.a.delete("".concat(b,"/").concat(t),n);case 4:return a=e.sent,e.abrupt("return",a.status);case 8:e.prev=8,e.t0=e.catch(0),console.log(e.t0);case 11:case"end":return e.stop()}},e,null,[[0,8]])}));return function(t){return e.apply(this,arguments)}}()},g=(n(6),function(e){var t=e.createBlog,n=e.title,a=e.setTitle,c=e.author,l=e.setAuthor,u=e.url,o=e.setUrl;return r.a.createElement("div",null,r.a.createElement("h2",null,"Create new blog"),r.a.createElement("form",{onSubmit:t,className:"font"},r.a.createElement("div",{className:"form-group"},r.a.createElement("label",null,"Title:"),r.a.createElement("input",{type:"text",value:n,name:"Title",onChange:function(e){var t=e.target;return a(t.value)}}),r.a.createElement("br",null),r.a.createElement("label",null,"Author:"),r.a.createElement("input",{type:"text",value:c,name:"Author",onChange:function(e){var t=e.target;return l(t.value)}}),r.a.createElement("br",null),r.a.createElement("label",null,"Url:"),r.a.createElement("input",{type:"text",value:u,name:"Url",onChange:function(e){var t=e.target;return o(t.value)}})),r.a.createElement("button",{type:"submit"},"create")))}),h=function(e){var t=e.blogs,n=e.blog,c=e.setBlogs,l=e.user,u=Object(a.useState)(!1),m=Object(i.a)(u,2),p=m[0],f=m[1],b={display:p?"":"none"},v=function(){var e=Object(s.a)(o.a.mark(function e(){return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!window.confirm("Are you sure to remove ".concat(n.title))){e.next=5;break}return e.next=3,d.remove(n.id);case 3:204===e.sent&&(console.log("successfully deleted!"),c(t.filter(function(e){return e.id!==n.id})));case 5:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}(),g=function(){var e=Object(s.a)(o.a.mark(function e(){var t;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d.update(n.id,{user:n.user,likes:n.likes+1,author:n.author,title:n.title,url:n.url});case 2:return e.next=4,d.getAll();case 4:t=e.sent,c(t);case 6:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}();return r.a.createElement("div",{className:"blogSection"},r.a.createElement("div",{key:n.id,onClick:function(){f(!p),console.log(n.user),console.log(l.username)},className:"title"},n.title," by ",r.a.createElement("i",null,n.author)),r.a.createElement("div",{style:b,className:"togglebox"},"Url: ",n.url,r.a.createElement("br",null),"There are ",n.likes," likes for this post",r.a.createElement("button",{onClick:g},"like"),r.a.createElement("br",null),"Added by ",r.a.createElement("i",null,n.author),r.a.createElement("br",null),n.author===l.username&&r.a.createElement("button",{onClick:v},"remove")))},E=function(e){var t=e.notice,n={color:e.success?"green":"Red",background:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10};return null!==t?r.a.createElement("div",{style:n},t):null},w=function(e){var t=e.handleLogin,n=e.username,a=e.setUsername,c=e.password,l=e.setPassword,u=e.errorMessage;return r.a.createElement("div",null,r.a.createElement("h2",null,"Log in to application"),r.a.createElement(E,{notice:u,success:!1}),r.a.createElement("form",{onSubmit:t,className:"font"},r.a.createElement("div",{className:"form-group"},r.a.createElement("label",null,"Username:"),r.a.createElement("input",{type:"text",value:n,name:"Username",onChange:function(e){var t=e.target;return a(t.value)}}),r.a.createElement("br",null),r.a.createElement("label",null,"Password:"),r.a.createElement("input",{type:"text",value:c,name:"Password",onChange:function(e){var t=e.target;return l(t.value)}})),r.a.createElement("button",{type:"submit"},"login")))},O=function(e){var t=e.notice;return r.a.createElement(r.a.Fragment,null,r.a.createElement("h2",{className:"header"},"Blogs"),r.a.createElement(E,{notice:t,success:!0}))},y=function(e){var t=Object(a.useState)(!1),n=Object(i.a)(t,2),c=n[0],l=n[1],u={display:c?"none":""},o={display:c?"":"none"},s=function(){l(!c)};return r.a.createElement("div",null,r.a.createElement("div",{style:u},r.a.createElement("button",{onClick:s},e.buttonLable)),r.a.createElement("div",{style:o},e.children,r.a.createElement("button",{onClick:s},"cancel")))};var j=function(){var e=Object(a.useState)(""),t=Object(i.a)(e,2),n=t[0],c=t[1],l=Object(a.useState)(""),u=Object(i.a)(l,2),m=u[0],p=u[1],b=Object(a.useState)(null),v=Object(i.a)(b,2),E=v[0],j=v[1],k=Object(a.useState)(null),x=Object(i.a)(k,2),S=x[0],C=x[1],U=Object(a.useState)(null),A=Object(i.a)(U,2),N=A[0],B=A[1],T=Object(a.useState)([]),L=Object(i.a)(T,2),I=L[0],J=L[1],P=Object(a.useState)(""),z=Object(i.a)(P,2),D=z[0],M=z[1],R=Object(a.useState)(""),F=Object(i.a)(R,2),W=F[0],q=F[1],G=Object(a.useState)(""),H=Object(i.a)(G,2),K=H[0],Q=H[1];Object(a.useEffect)(function(){V()},[]),Object(a.useEffect)(function(){var e=window.localStorage.getItem("loggedBlogUser");if(e){var t=JSON.parse(e);j(t),d.setToken(t.token)}},[]);var V=function(){var e=Object(s.a)(o.a.mark(function e(){var t;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d.getAll();case 2:t=e.sent,J(t),console.log(t);case 5:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}(),X=function(){var e=Object(s.a)(o.a.mark(function e(t){var n,a;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.prev=1,e.next=4,d.create({title:D,author:W,url:K});case 4:(n=e.sent)&&(a='a new blog "'.concat(n.title,'" has been added by "').concat(n.author,'"!'),B(a),setTimeout(function(){B(null)},4e3),J(I.concat(n)),M(""),q(""),Q("")),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(1),console.log(e.t0);case 11:case"end":return e.stop()}},e,null,[[1,8]])}));return function(t){return e.apply(this,arguments)}}(),Y=function(){var e=Object(s.a)(o.a.mark(function e(t){var a;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.prev=1,e.next=4,f.login({username:n,password:m});case 4:a=e.sent,window.localStorage.setItem("loggedBlogUser",JSON.stringify(a)),d.setToken(a.token),j(a),c(""),p(""),e.next=18;break;case 12:e.prev=12,e.t0=e.catch(1),C("Wrong username or password!"),c(""),p(""),setTimeout(function(){C(null)},4e3);case 18:case"end":return e.stop()}},e,null,[[1,12]])}));return function(t){return e.apply(this,arguments)}}();return null===E?r.a.createElement(w,{errorMessage:S,handleLogin:Y,username:n,setUsername:c,password:m,setPassword:p}):r.a.createElement("div",null,r.a.createElement(O,{notice:N}),r.a.createElement("p",{className:"font"},E.username," is logged in! ",r.a.createElement("button",{onClick:function(e){e.preventDefault(),window.localStorage.removeItem("loggedBlogUser"),j(null)}},"logout")),r.a.createElement("br",null),r.a.createElement(y,{buttonLable:"create new note"},r.a.createElement(g,{createBlog:X,title:D,setTitle:M,author:W,setAuthor:q,url:K,setUrl:Q})),r.a.createElement("br",null),r.a.createElement("h2",null,"List"),I?I.map(function(e){return r.a.createElement(h,{key:e.id,blogs:I,blog:e,setBlogs:J,user:E})}):null)};l.a.render(r.a.createElement(j,null),document.getElementById("root"))},6:function(e,t,n){}},[[17,1,2]]]);
//# sourceMappingURL=main.3591d559.chunk.js.map