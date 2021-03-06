class AdminProductTags
  params:
    tag_name: 'product_tag'
    placeholder: ''

  constructor: (@params) ->
    $field = jQuery('#' + @params.tag_name + '_thumbnail_id')
    $thumbnail = jQuery('#' + @params.tag_name + '_thumbnail > img')
    jQuery('#add-image').jigoshop_media(
      field: $field
      thumbnail: $thumbnail
      callback: ->
        if $field.val() != ''
          jQuery('#remove-image').show()
      library:
        type: 'image'
    )
    jQuery('#remove-image').on 'click', (e) =>
      e.preventDefault()
      $field.val('')
      $thumbnail.attr('src', @params.placeholder)
      jQuery(e.target).hide()

jQuery ->
  new AdminProductTags(jigoshop_admin_product_tags)
