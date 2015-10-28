<?php
/**
 * @var $id string Field ID.
 * @var $label string Field label.
 * @var $name string Field name.
 * @var $classes array List of classes to add to the field.
 * @var $placeholder string Field's placeholder.
 * @var $value mixed Current value.
 * @var $tip string Tip to show to the user.
 * @var $description string Field description.
 */
$hasLabel = !empty($label);
?>
<div class="form-group <?php echo $id; ?>_field <?php echo join(' ', $classes); ?><?php $hidden and print ' not-active'; ?>">
	<?php if($hasLabel): ?>
	<label for="<?php echo $id; ?>" class="col-sm-<?php echo $size - 10; ?> control-label">
		<?php echo $label; ?>
		<?php if(!empty($tip)): ?>
			<span data-toggle="tooltip" class="badge" data-placement="top" title="<?php echo $tip; ?>">?</span>
		<?php endif; ?>
	</label>
	<?php else: ?>
		<span data-toggle="tooltip" class="badge pull-left<?php echo (empty($tip) ? ' invisible' : '' ); ?>" data-placement="top" title="<?php echo $tip; ?>">?</span>
	<?php endif; ?>
	<div class="<?php echo 'col-sm-'.($hasLabel ? $size - 2 : $size - 1); ?>">
		<p class="form-control-static <?php echo join(' ', $classes); ?>" id="<?php echo $id; ?>"><?php echo $value; ?></p>
		<?php if(!empty($description)): ?>
			<span class="help-block"><?php echo $description; ?></span>
		<?php endif; ?>
	</div>
</div>
