function FormValidator(){this.errors={},this.rules={},this.messages={},this.is_show_alert=!0,this.is_standart=!0,this.errorTitle="Пожалуйста, исправьте следующие ошибки",this.errorNameField="Имя",this.errorNameMess="Укажите своё имя",this.errorPhoneField="Телефон",this.errorPhoneMess="Введите правильный телефон",this.errorAddress="Введите правильный адрес",this.errorPhone="указан неправильный телефон",this.errorRequired="обязательное поле",this.errorMaxLength="допустимо максимум {1} символа",this.errorMinLength="допустимо минимум {1} символа",this.errorEmailField="Email",this.errorEmail="указан не корректный email"}FormValidator.prototype.validators={length:function(r,t,e){var a,i=$(t).val(),o=[];e.args.minlength&&(a=(a=r.getMessage(t.name,"minlength"))||this.errorMinLength,i.toString().replace(/ +/g," ").trim().length<e.args.minlength&&o.push(FormValidator.utilStrFormat(a,e.name,e.args.minlength)));e.args.maxlength&&(a=(a=r.getMessage(t.name,"maxlength"))||this.errorMaxLength,i.toString().length>e.args.maxlength&&o.push(FormValidator.utilStrFormat(a,e.name,e.args.minlength)));return o},required:function(r,t,e){var a=$(t),i=a.val().replace(" ",""),o=(i=a.val().replace(/ +/g," ").trim(),r.getMessage(t.name,"required"));o=o||FormValidator.utilStrFormat(this.errorRequired,e.name);var s=[];return i&&""!==i?(a.attr("placeholder")||"").toLowerCase()===i.toString().toLowerCase()&&s.push(o):s.push(o),s},phone:function(r,t,e){var a=[],i=$(t).val(),o=i.replace(/[^\d]/g,""),s=r.getMessage(t.name,"phone");if(s=s||FormValidator.utilStrFormat(this.errorPhone,e.name),(i.length>40||i.length<7||o.length>15||o.length<7)&&a.push(s),e.args.interPhoneCodes&&!a.length){var n=e.args.interPhoneCodes.currentPhoneCode;"7"===n?0!==o.indexOf("7")&&0!==o.indexOf("8")&&a.push(s):0!==o.indexOf(n)&&a.push(s)}return a},email:function(r,t,e){var a=[];if(t){var i=$(t).val(),o=r.getMessage(t.name,"email");o=o||FormValidator.utilStrFormat(this.errorEmail,e.name),0!==i.search(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i)&&a.push(o)}return a}},FormValidator.prototype.addRule=function(r,t,e,a){a=a||null,this.rules[r]=this.rules[r]||[],this.rules[r].push({field:r,name:t,rule:e,args:a})},FormValidator.prototype.addMessages=function(r,t){this.messages[r]=t},FormValidator.prototype.getMessage=function(r,t){var e=this.messages[r];return e&&e[t]},FormValidator.prototype.watch=function(r){!0===this.is_standart&&$(document).on("submit",r,{validator:this},FormValidator.submitHandler),$(document).on("change click keyup",r,{validator:this},FormValidator.changeHandler)},FormValidator.submitHandler=function(r){if(!1!==this.is_standart){var t=r.data.validator;FormValidator.isFormLocked(this)?(t.fireEvent("locked",this,r),r.preventDefault()):(FormValidator.lockForm(this),t.validate(this,!0),t.fireEvent(t.isValid()?"valid":"error",this),t.isValid()?t.fireEvent("success",this,r):(r.preventDefault(),t.showErrors(),t.fireEvent("error",this,r),FormValidator.unlockForm(this)))}else r.preventDefault()},FormValidator.changeHandler=function(r){if($(this).data("validating")){var t=r.data.validator;t.validate(this,!0),t.fireEvent(t.isValid()?"valid":"error",this)}},FormValidator.lockForm=function(r){$(r).data("locked",!0)},FormValidator.unlockForm=function(r){$(r).data("locked",!1)},FormValidator.isFormLocked=function(r){return $(r).data("locked")},FormValidator.prototype.fireEvent=function(r,t,e){var a=jQuery.Event("validate."+r);a.submitEvent=e||null,a.validator=this,a.form=t,$(t).trigger(a)},FormValidator.prototype.validate=function(r,t){var e={};for(var a in this.rules)for(var i=this.rules[a],o=e[a]||[],s=0;s<i.length;++s){var n=i[s];e[a]=o.concat(this.checkRule(r,n))}return t&&($(r).data("validating",!0),this.errors=e),e},FormValidator.prototype.getErrorsList=function(r){return r=r||this.errors,$.map(r,(function(r,t){return $.map(r,(function(r){return{field:t,msg:r}}))}))},FormValidator.prototype.showFormErrors=function(r,t){t=t||this.errors,$.map(t,(function(t,e){0===t.length?$(r).find(e).removeClass("field-error").addClass("field-valid"):$(r).find(e).removeClass("field-valid").addClass("field-error")}))},FormValidator.prototype.showErrors=function(){if(!0===this.is_show_alert){var r=$.map(this.getErrorsList(),(function(r){return" - "+r.msg}));alert(this.errorTitle+":\n\n"+r.join("\n"))}else this.showFormErrors()},FormValidator.prototype.checkRule=function(r,t){var e=this.validators[t.rule];if(!0===t.field.startsWith("#"))var a=$(r).find(t.field).get(0);else{var i=t.field.replace("[","\\[").replace("]","\\]");a=$(r).find("[name="+i+"]").get(0)}return e(this,a,t)},FormValidator.prototype.isValid=function(){return 0==this.getErrorsList(this.errors).length},FormValidator.utilStrFormat=function(r){for(var t=0;t<arguments.length-1;t++){var e=new RegExp("\\{"+t+"\\}","gm");r&&(r=r.replace(e,arguments[t+1]))}return r};