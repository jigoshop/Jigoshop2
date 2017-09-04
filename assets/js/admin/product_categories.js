var AdminProductCategories;AdminProductCategories=void 0,AdminProductCategories=function(){return AdminProductCategories=function(t){var e;e=void 0,e=this,this.bindCategoriesControls(),jQuery(".jigoshop-product-categories-edit-form").submit(function(t){var o,r;o=void 0,r=[],t.preventDefault(),jQuery(".jigoshop-product-categories-edit-form").find("button").attr("disabled","disabled"),o={},o.attachments=[],jQuery(".jigoshop-product-categories-edit-form").find("input,select,textarea").each(function(t,e){return jQuery(e).attr("name")?"checkbox"===jQuery(e).attr("type")?void(o[jQuery(e).attr("name")]=jQuery(e).is(":checked")):"attachments[]"===jQuery(e).attr("name")?o.attachments.push(jQuery(e).val()):o[jQuery(e).attr("name")]=jQuery(e).val():void 0}),o.action="jigoshop_product_categories_updateCategory",o.description=tinymce.activeEditor.getContent(),jQuery("#jigoshop-product-categories").find("tbody").find("tr").each(function(t,e){return"none"!==jQuery(e).css("display")?r.push(jQuery(e).data("category-id")):void 0}),o.visibleCategories=r,jQuery.post(ajaxurl,o,function(t){return jQuery("html,body").animate({scrollTop:jQuery(".jigoshop-product-categories-edit-form").offset().top-30}),1===t.status?(jigoshop.addMessage("success",t.info,3e3),jQuery("#jigoshop-product-categories tbody").html(t.categoriesTable),e.bindCategoriesControls()):jigoshop.addMessage("danger",t.error,3e3),jQuery(".jigoshop-product-categories-edit-form").find("button").removeAttr("disabled")},"json")}),jigoshop_admin_product_categories_data.forceEdit&&e.editCategory(jigoshop_admin_product_categories_data.forceEdit)},AdminProductCategories.prototype.params={category_name:"product_category",placeholder:""},AdminProductCategories.prototype.bindCategoriesControls=function(){var t;return t=this,jQuery(".jigoshop-product-categories-expand-subcategories").click(this.expandCategory),jQuery("#jigoshop-product-categories-add-button").click(function(e){e.preventDefault(),t.resetForm(),t.showForm()}),jQuery(".jigoshop-product-categories-edit-button").click(function(e){var o;return o=void 0,e.preventDefault(),(o=jQuery(e.delegateTarget).parents("tr").data("category-id"))?t.editCategory(o):void 0}),jQuery(".jigoshop-product-categories-remove-button").click(function(t){var e;return e=void 0,t.preventDefault(),confirm(jigoshop_admin_product_categories_data.lang.categoryRemovalConfirmation)?(e=jQuery(t.delegateTarget).parents("tr").data("category-id"),jQuery.post(ajaxurl,{action:"jigoshop_product_categories_removeCategory",categoryId:e},function(t){1===t.status&&(location.href=document.URL)},"json")):void 0})},AdminProductCategories.prototype.expandCategory=function(t,e){var o,r,i;return t.preventDefault(),o=jQuery(t.delegateTarget).parents("tr"),r=o.data("category-id"),i=o.data("expanded"),i||e?(o.data("expanded",0),o.nextAll("tr").each(function(t,e){return jQuery(e).data("parent-category-id")===r&&(jQuery(e).hide(),jQuery(e).data("expanded"))?jQuery(e).find(".jigoshop-product-categories-expand-subcategories").trigger("click",[1]):void 0})):(o.data("expanded",1),o.nextAll("tr").each(function(t,e){return jQuery(e).data("parent-category-id")===r?jQuery(e).show():void 0}))},AdminProductCategories.prototype.editCategory=function(t){var e;return e=this,e.select2=jQuery.fn.select2,e.jigoshop_media=jQuery.fn.jigoshop_media,e.bootstrapSwitch=jQuery.fn.bootstrapSwitch,e.magnificPopup=jQuery.magnificPopup,jQuery.post(ajaxurl,{action:"jigoshop_product_categories_getEditForm",categoryId:t},function(t){1===t.status&&(jQuery("#jigoshop-product-categories-edit-form-link").attr("href",t.categoryLink).show(),jQuery("#jigoshop-product-categories-edit-form-content").replaceWith(t.form),e.showForm())},"json")},AdminProductCategories.prototype.resetForm=function(){return jQuery(".jigoshop-product-categories-edit-form").find("input,select,textarea").each(function(t,e){return 0===jQuery(e).closest(".description_field").length?jQuery(e).val(""):void 0}),jQuery("#description").val(""),jQuery("#jigoshop-product-categories-edit-form-link").hide(),tinymce.activeEditor.setContent("")},AdminProductCategories.prototype.showForm=function(){this.bindGeneralControls(),this.attributesInheritEnabledChange(),this.attributesGetAttributes(),"block"!==jQuery(".jigoshop-product-categories-edit-form").css("display")&&jQuery(".jigoshop-product-categories-edit-form").slideToggle(),jQuery("html,body").animate({scrollTop:jQuery(".jigoshop-product-categories-edit-form").offset().top-30}),jQuery(".jigoshop-product-categories-edit-form").find("button").removeAttr("disabled")},AdminProductCategories.prototype.bindGeneralControls=function(){var t;t=this,"undefined"==typeof jQuery.fn.bootstrapSwitch&&(jQuery.fn.bootstrapSwitch=t.bootstrapSwitch),"undefined"==typeof jQuery.fn.jigoshop_media&&(jQuery.fn.jigoshop_media=t.jigoshop_media),"undefined"==typeof jQuery.fn.select2&&(jQuery.fn.select2=t.select2),"undefined"==typeof jQuery.magnificPopup&&(jQuery.magnificPopup=t.magnificPopup),jQuery(".jigoshop-product-categories-edit-form").find('input[type="checkbox"]').each(function(t,e){jQuery(e).bootstrapSwitch({size:"small",onText:"Yes",offText:"No"})}),jQuery("#parentId, #attributesInheritMode, #attributesNewSelector").select2,jQuery("#parentId").on("change",t.attributesGetAttributes),jQuery("#jigoshop-product-categories-thumbnail-add-button").jigoshop_media({field:jQuery("#thumbnailId"),thumbnail:jQuery("#jigoshop-product-categories-thumbnail").find("img"),callback:function(){return""!==jQuery("#thumbnailId").val()?jQuery("#jigoshop-product-categories-thumbnail-remove-button").css("display","inline-block"):void 0},library:{type:"image"}}),jQuery("#jigoshop-product-categories-thumbnail-remove-button").click(function(t){t.preventDefault(),jQuery("#thumbnailId").val(""),jQuery("#jigoshop-product-categories-thumbnail img").attr("src",jigoshop_admin_product_categories_data.thumbnailPlaceholder),jQuery("#jigoshop-product-categories-thumbnail-remove-button").hide()}),""!==jQuery("#thumbnailId").val()&&jQuery("#jigoshop-product-categories-thumbnail-remove-button").css("display","inline-block"),jQuery("#jigoshop-product-categories-edit-form-close").click(function(t){return t.preventDefault(),jQuery(".jigoshop-product-categories-edit-form").slideToggle()}),jQuery("#attributesInheritEnabled").on("switchChange.bootstrapSwitch",function(e,o){t.attributesInheritEnabledChange(1),t.attributesGetAttributes()}),jQuery("#attributesInheritMode").on("change",function(e){t.attributesGetAttributes()}),jQuery("#parentId, #attributesInheritMode, #attributesNewSelector").select2(),jQuery("#jigoshop-product-categories-attributes-add-button").click(function(e){var o;e.preventDefault(),o=jQuery("#attributesNewSelector").val(),null!==o&&0!==o.length&&(t.attributesGetAttributes(o),jQuery("#attributesNewSelector").select2("val",""))}),jQuery("#jigoshop-product-categories-attributes-add-new-button").click(t.attributesAddNewForm.bind(this)),jQuery("#parentId, #attributesInheritMode, #attributesNewSelector").select2()},AdminProductCategories.prototype.attributesInheritEnabledChange=function(t){var e;e=void 0,e=jQuery("#attributesInheritEnabled").is(":checked"),e?t?jQuery("#jigoshop-product-categories-attributes-inherit-mode").slideToggle():jQuery("#jigoshop-product-categories-attributes-inherit-mode").show():jQuery("#jigoshop-product-categories-attributes-inherit-mode").hide()},AdminProductCategories.prototype.attributesGetAttributes=function(t,e){var o,r,i;i=this,r=[],jQuery("#jigoshop-product-categories-attributes").find("tbody").find("tr").each(function(t,e){jQuery(e).data("attribute-inherited")||r.push(jQuery(e).data("attribute-id"))}),Array.isArray(t)||(t=[]),o={},jQuery("#jigoshop-product-categories-attributes").find('input[type="checkbox"]').each(function(t,e){return o[jQuery(e).parents("tr").data("attribute-id")]={state:jQuery(e).is(":checked")}}),jQuery.post(ajaxurl,{action:"jigoshop_product_categories_getAttributes",id:jQuery("#id").val(),parentId:jQuery("#parentId").val(),inheritEnabled:jQuery("#attributesInheritEnabled").is(":checked"),inheritMode:jQuery("#attributesInheritMode").val(),existingAttributes:r,addedAttributes:t,removedAttributeId:e,attributesStates:o},function(t){1===t.status&&(jQuery("#jigoshop-product-categories-attributes").find("tbody").html(t.attributes),jQuery("#jigoshop-product-categories-attributes").find('input[type="checkbox"]').each(function(t,e){jQuery(e).bootstrapSwitch({size:"small",onText:"Yes",offText:"No"})}),jQuery(".attributeRemoveButton").click(function(t){t.preventDefault(),e=jQuery(t.delegateTarget).parents("tr").data("attribute-id"),jQuery(t.delegateTarget).parents("tr").remove(),i.attributesGetAttributes([],e)}),jQuery("#attributesNewSelector").html(""),jQuery.each(t.attributesPossibleToAdd,function(t,e){jQuery("#attributesNewSelector").append(new Option(e,t))}),jQuery("#jigoshop-product-categories-attributes tbody").sortable({axis:"y"}))},"json")},AdminProductCategories.prototype.attributesAddNewForm=function(t){var e;e=this,t.preventDefault(),jQuery.magnificPopup.open({mainClass:"jigoshop",closeOnContentClick:!1,closeOnBgClick:!1,closeBtnInside:!0,showCloseBtn:!0,enableEscapeKey:!0,modal:!0,items:{src:jQuery("#jigoshop-product-categories-attributes-add-new-container")},type:"inline",callbacks:{open:function(){jQuery("#jigoshop-product-categories-attributes-add-new-form").find("input,textarea,select").each(function(t,e){return jQuery(e).val("")}),jQuery("#jigoshop-product-categories-attributes-add-new-button").removeAttr("disabled"),jQuery("#jigoshop-product-categories-attributes-add-new-close-button").off("click").click(function(t){return t.preventDefault(),jQuery.magnificPopup.close()}),jQuery("#jigoshop-product-categories-attributes-add-new-type").off("change").on("change",e.attributesAddNewTypeChanged).trigger("change"),jQuery("#jigoshop-product-categories-attributes-add-new-configure-button").off("click").click(e.attributesAddNewConfigure),jQuery("#jigoshop-product-categories-attributes-add-new-configure-container").find(".attribute-option-add-button").off("click").click(e.attributesAddOption.bind(e)),jQuery("#jigoshop-product-categories-attributes-add-new-configure-container").find(".attribute-option-remove-button").hide(),jQuery("#jigoshop-product-categories-attributes-add-new-form").off("submit").submit(e.attributesAddNewSave.bind(e)),jQuery("#jigoshop-product-categories-attributes-add-new-container").css("display","block")}}})},AdminProductCategories.prototype.attributesAddNewTypeChanged=function(){var t,e;t=void 0,e=void 0,t=parseInt(jQuery("#jigoshop-product-categories-attributes-add-new-type").val()),e=2===t?"none":"block",jQuery("#jigoshop-product-categories-attributes-add-new-configure-button").css("display",e),"block"===jQuery("#jigoshop-product-categories-attributes-add-new-configure-container").css("display")&&"none"===e&&jQuery("#jigoshop-product-categories-attributes-add-new-configure-container").css("display","block")},AdminProductCategories.prototype.attributesAddNewConfigure=function(t){t.preventDefault(),jQuery("#jigoshop-product-categories-attributes-add-new-configure-container").show()},AdminProductCategories.prototype.attributesAddOption=function(t){var e,o,r;r=void 0,o=void 0,r=this,t.preventDefault(),o=jQuery("#jigoshop-product-categories-attributes-add-new-configure-container").find("#attribute-option-prototype"),""!==o.find("#option-label").val()&&""!==o.find("#option-value").val()&&(e=o.clone(),e.removeAttr("id"),e.find(".attribute-option-add-button").remove(),e.find(".attribute-option-remove-button").show(),e.find(".attribute-option-remove-button").click(r.attributesRemoveOption.bind(r)),jQuery("#jigoshop-product-categories-attributes-add-new-configure-container").prepend(e),o.find("#option-label").val(""),o.find("#option-value").val(""))},AdminProductCategories.prototype.attributesRemoveOption=function(t){var e;e=this,t.preventDefault(),jQuery(t.delegateTarget).parents("tr").remove()},AdminProductCategories.prototype.attributesAddNewSave=function(t){var e,o,r,i,a,u;i=void 0,e=void 0,o=void 0,a=void 0,u=void 0,r=void 0,i=this,t.preventDefault(),e=jQuery("#jigoshop-product-categories-attributes-add-new-form"),o=jQuery("#jigoshop-product-categories-attributes-add-new-label").val(),a=jQuery("#jigoshop-product-categories-attributes-add-new-slug").val(),u=jQuery("#jigoshop-product-categories-attributes-add-new-type").val(),r=[],jQuery("#jigoshop-product-categories-attributes-add-new-configure-container").find("tr").each(function(t,e){var o;o=void 0,"attribute-option-prototype"!==jQuery(e).attr("id")&&(o={label:jQuery(e).find("#option-label").val(),value:jQuery(e).find("#option-value").val()},r.push(o))}),o&&0!==r.length&&(jQuery("#jigoshop-product-categories-attributes-add-new-button").attr("disabled","disabled"),jQuery.post(ajaxurl,{action:"jigoshop_product_categories_saveAttribute",categoryId:jQuery("#id").val(),label:o,slug:a,type:u,options:r},function(t){1===t.status&&(i.attributesGetAttributes([t.attributeId]),jQuery.magnificPopup.close()),jQuery("#jigoshop-product-categories-attributes-add-new-button").removeAttr("disabled")},"json"))},AdminProductCategories}(),jQuery(function(){return new AdminProductCategories});