var Checkout,bind=function(t,e){return function(){return t.apply(e,arguments)}},hasProp={}.hasOwnProperty;Checkout=function(){function t(t){this.params=t,this._updateShippingField=bind(this._updateShippingField,this),this.updateDiscounts=bind(this.updateDiscounts,this),this.updatePostcode=bind(this.updatePostcode,this),this.updateState=bind(this.updateState,this),this.updateCountry=bind(this.updateCountry,this),this.selectShipping=bind(this.selectShipping,this),this.block=bind(this.block,this),this._prepareStateField("#jigoshop_order_billing_address_state"),this._prepareStateField("#jigoshop_order_shipping_address_state"),jQuery("#checkout-mobile").on("click",".show-product",function(t){var e;return e=jQuery(t.target),jQuery(".list-group-item-text",e.closest("li")).slideToggle(function(){return jQuery("span",e).toggleClass("glyphicon-collapse-down").toggleClass("glyphicon-collapse-up")})}),jQuery("#jigoshop-login").on("click",function(t){return t.preventDefault(),jQuery("#jigoshop-login-form").slideToggle()}),jQuery("#create-account").on("change",function(){return jQuery("#registration-form").slideToggle()}),jQuery("#different_shipping_address").on("change",function(){return jQuery("#shipping-address").slideToggle(),jQuery(this).is(":checked")?jQuery("#jigoshop_order_shipping_address_country").change():jQuery("#jigoshop_order_billing_address_country").change()}),jQuery("#payment-methods").on("change","li input[type=radio]",function(){return jQuery("#payment-methods li > div").slideUp(),jQuery("div",jQuery(this).closest("li")).slideDown()}),jQuery("#shipping-calculator").on("click","input[type=radio]",this.selectShipping),jQuery("#jigoshop_order_billing_address_country").on("change",function(t){return function(e){return t.updateCountry("billing_address",e)}}(this)),jQuery("#jigoshop_order_shipping_address_country").on("change",function(t){return function(e){return t.updateCountry("shipping_address",e)}}(this)),jQuery("#jigoshop_order_billing_address_state").on("change",this.updateState.bind(this,"billing_address")),jQuery("#jigoshop_order_shipping_address_state").on("change",this.updateState.bind(this,"shipping_address")),jQuery("#jigoshop_order_billing_address_postcode").on("change",this.updatePostcode.bind(this,"billing_address")),jQuery("#jigoshop_order_shipping_address_postcode").on("change",this.updatePostcode.bind(this,"shipping_address")),jQuery("#jigoshop_coupons").on("change",this.updateDiscounts).select2({tags:[],tokenSeparators:[","],multiple:!0,formatNoMatches:""})}return t.prototype.params={assets:"",i18n:{loading:"Loading..."}},t.prototype.block=function(){return jQuery("#checkout > button").block({message:'<img src="'+this.params.assets+'/images/loading.gif" alt="'+this.params.i18n.loading+'" />',css:{padding:"20px",width:"auto",height:"auto",border:"1px solid #83AC31"},overlayCss:{opacity:.01}})},t.prototype.unblock=function(){return jQuery("#checkout > button").unblock()},t.prototype._prepareStateField=function(t){var e,i,s;return e=jQuery(t),e.is("select")?(i=jQuery(document.createElement("input")).attr("type","text").attr("id",e.attr("id")).attr("name",e.attr("name")).attr("class",e.attr("class")).val(e.val()),s=[],jQuery("option",e).each(function(){return s.push({id:jQuery(this).val(),text:jQuery(this).html()})}),e.replaceWith(i),i.select2({data:s})):void 0},t.prototype.selectShipping=function(){var t,e;return t=jQuery("#shipping-calculator input[type=radio]:checked"),e=jQuery(".shipping-method-rate",t.closest("li")),jQuery.ajax({url:jigoshop.getAjaxUrl(),type:"post",dataType:"json",data:{action:"jigoshop_cart_select_shipping",method:t.val(),rate:e.val()}}).done(function(t){return function(e){return e.success?(t._updateTotals(e.html.total,e.html.subtotal),t._updateDiscount(e),t._updateTaxes(e.tax,e.html.tax)):jigoshop.addMessage("danger",e.error,6e3)}}(this))},t.prototype.updateCountry=function(t,e){return this.block(),jQuery(".noscript_state_field").remove(),jQuery.ajax({url:jigoshop.getAjaxUrl(),type:"post",dataType:"json",data:{action:"jigoshop_checkout_change_country",field:t,differentShipping:jQuery("#different_shipping_address").is(":checked"),value:jQuery(e.target).val()}}).done(function(t){return function(i){var s,o,r,n,a;if(null!=i.success&&i.success)if(t._updateTotals(i.html.total,i.html.subtotal),t._updateDiscount(i),t._updateTaxes(i.tax,i.html.tax),t._updateShipping(i.shipping,i.html.shipping),a="#"+jQuery(e.target).attr("id").replace(/country/,"state"),i.has_states){s=[],r=i.states;for(n in r)hasProp.call(r,n)&&(o=r[n],s.push({id:n,text:o}));jQuery(a).select2({data:s})}else jQuery(a).attr("type","text").select2("destroy").val("");else jigoshop.addMessage("danger",i.error,6e3);return t.unblock()}}(this))},t.prototype.updateState=function(t){var e;return e="#jigoshop_order_"+t+"_state",this._updateShippingField("jigoshop_checkout_change_state",t,jQuery(e).val())},t.prototype.updatePostcode=function(t){var e;return e="#jigoshop_order_"+t+"_postcode",this._updateShippingField("jigoshop_checkout_change_postcode",t,jQuery(e).val())},t.prototype.updateDiscounts=function(t){var e;return e=jQuery(t.target),this.block(),jQuery.ajax({url:jigoshop.getAjaxUrl(),type:"post",dataType:"json",data:{action:"jigoshop_cart_update_discounts",coupons:e.val()}}).done(function(t){return function(e){var i,s;if(null!=e.success&&e.success){if(null!=e.empty_cart==!0)return s=jQuery(e.html).hide(),i=jQuery("#cart"),i.after(s),i.slideUp(),s.slideDown(),void t.unblock();jQuery("td#product-subtotal").html(e.html.product_subtotal),t._updateTotals(e.html.total,e.html.subtotal),t._updateDiscount(e),t._updateTaxes(e.tax,e.html.tax),t._updateShipping(e.shipping,e.html.shipping)}else jigoshop.addMessage("danger",e.error,6e3);return t.unblock()}}(this))},t.prototype._updateShippingField=function(t,e,i){return this.block(),jQuery.ajax({url:jigoshop.getAjaxUrl(),type:"post",dataType:"json",data:{action:t,field:e,differentShipping:jQuery("#different_shipping_address").is(":checked"),value:i}}).done(function(t){return function(e){return null!=e.success&&e.success?(t._updateTotals(e.html.total,e.html.subtotal),t._updateDiscount(e),t._updateTaxes(e.tax,e.html.tax),t._updateShipping(e.shipping,e.html.shipping)):jigoshop.addMessage("danger",e.error,6e3),t.unblock()}}(this))},t.prototype._updateTotals=function(t,e){return jQuery("#cart-total > td > strong").html(t),jQuery("#cart-subtotal > td").html(e)},t.prototype._updateDiscount=function(t){var e;return null!=t.coupons&&(jQuery("input#jigoshop_coupons").select2("val",t.coupons.split(",")),e=jQuery("tr#cart-discount"),t.discount>0?(jQuery("td",e).html(t.html.discount),e.show()):e.hide(),null!=t.html.coupons)?jigoshop.addMessage("warning",t.html.coupons):void 0},t.prototype._updateShipping=function(t,e){var i,s,o,r;for(o in t)hasProp.call(t,o)&&(r=t[o],s=jQuery(".shipping-"+o),s.addClass("existing"),s.length>0?r>-1?(i=jQuery(e[o].html).addClass("existing"),s.replaceWith(i)):s.slideUp(function(){return jQuery(this).remove()}):null!=e[o]&&(i=jQuery(e[o].html),i.hide().addClass("existing").appendTo(jQuery("#shipping-methods")).slideDown()));return jQuery("#shipping-methods > li:not(.existing)").slideUp(function(){return jQuery(this).remove()}),jQuery("#shipping-methods > li").removeClass("existing")},t.prototype._updateTaxes=function(t,e){var i,s,o,r;s=[];for(r in e)hasProp.call(e,r)&&(o=e[r],i=jQuery("#tax-"+r),jQuery("th",i).html(o.label),jQuery("td",i).html(o.value),t[r]>0?s.push(i.show()):s.push(i.hide()));return s},t}(),jQuery(function(){return new Checkout(jigoshop_checkout)});