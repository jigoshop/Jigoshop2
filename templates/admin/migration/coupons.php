<button<?=($countDone == $countAll ? ' disabled="disabled"' : ''); ?> type="submit" name="tool"
        value="<?= Jigoshop\Admin\Migration\Products::ID; ?>" class="btn btn-default btn-block migration-coupons<?=($countDone == $countAll ? ' btn_disabled' : ''); ?>"><?= __('Migrate coupons', 'jigoshop') . sprintf(__(' - %d/%d', 'jigoshop'), $countDone, $countAll) . ($countDone == $countAll ? __(' - done', 'jigoshop') : '') ?>
</button>
