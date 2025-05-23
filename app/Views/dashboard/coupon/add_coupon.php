<div class="row">
    <div class="col-sm-12">
        <?= view('dashboard/includes/_messages'); ?>
    </div>
</div>
<div class="row">
    <div class="col-sm-12">
        <div class="box">
            <div class="box-header with-border">
                <div class="left">
                    <h3 class="box-title"><?= esc($title); ?></h3>
                </div>
                <div class="right">
                    <a href="<?= generateDashUrl('coupons'); ?>" class="btn btn-success btn-add-new">
                        <i class="fa fa-list-ul"></i>&nbsp;&nbsp;<?= trans("coupons"); ?>
                    </a>
                </div>
            </div>
            <div class="box-body">
                <form action="<?= base_url('add-coupon-post'); ?>" method="post">
                    <?= csrf_field(); ?>
                    <div class="form-group">
                        <label class="control-label"><?= trans("coupon_code"); ?>&nbsp;&nbsp;<small>(<?= trans("exp_special_characters"); ?> E.g: #, *, % ..)</small></label>
                        <div class="position-relative">
                            <input type="text" name="coupon_code" id="input_coupon_code" value="<?= old("coupon_code"); ?>" class="form-control form-input" placeholder="<?= trans("coupon_code"); ?>" maxlength="49" required>
                            <button type="button" class="btn btn-default btn-generate-sku" onclick="$('#input_coupon_code').val(Math.random().toString(36).substr(2,8).toUpperCase());"><?= trans("generate"); ?></button>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label"><?= trans("discount_rate"); ?></label>
                        <div class="input-group">
                            <span class="input-group-addon">%</span>
                            <input type="number" name="discount_rate" id="input_discount_rate" value="<?= old("discount_rate"); ?>" aria-describedby="basic-addon-discount" class="form-control form-input" placeholder="E.g: 5" min="0" max="99" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label"><?= trans("number_of_coupons"); ?>&nbsp;<small>(<?= trans("number_of_coupons_exp"); ?>)</small></label>
                        <input type="number" name="coupon_count" value="<?= old("coupon_count"); ?>" class="form-control form-input" placeholder="E.g: 100" min="1" max="99999999" required>
                    </div>
                    <div class="form-group">
                        <label class="font-600"><?= trans("minimum_order_amount"); ?>&nbsp;<small>(<?= trans("coupon_minimum_cart_total_exp"); ?>)</small></label>
                        <div class="input-group">
                            <span class="input-group-addon"><?= $defaultCurrency->symbol; ?></span>
                            <input type="hidden" name="currency" value="<?= $defaultCurrency->code; ?>">
                            <input type="text" name="minimum_order_amount" id="product_price_input" value="<?= old("minimum_order_amount"); ?>" aria-describedby="basic-addon1" class="form-control form-input price-input validate-price-input" placeholder="<?= $baseVars->inputInitialPrice; ?>" onpaste="return false;" maxlength="32">
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="row">
                            <div class="col-sm-12 col-xs-12">
                                <label><?= trans("coupon_usage_type"); ?></label>
                            </div>
                            <div class="col-sm-12 col-lg-4">
                                <div class="custom-control custom-radio">
                                    <input type="radio" name="usage_type" value="single" id="usage_type_1" class="custom-control-input" <?= old("usage_type") != 'multiple' ? 'checked' : ''; ?>>
                                    <label for="usage_type_1" class="custom-control-label"><?= trans("coupon_usage_type_1"); ?></label>
                                </div>
                            </div>
                            <div class="col-sm-12 col-lg-4">
                                <div class="custom-control custom-radio">
                                    <input type="radio" name="usage_type" value="multiple" id="usage_type_2" class="custom-control-input" <?= old('usage_type') == 'multiple' ? 'checked' : ''; ?>>
                                    <label for="usage_type_2" class="custom-control-label"><?= trans("coupon_usage_type_2"); ?></label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label><?= trans("public_coupon"); ?>&nbsp;<small>(<?= trans("public_coupon_exp"); ?>)</small></label>
                        <?= formRadio('is_public', 1, 0, trans("yes"), trans("no"), 1, 'col-lg-4'); ?>
                    </div>
                    <div class="form-group">
                        <div class="row">
                            <div class="col-sm-12 max-600">
                                <label><?= trans("expiry_date"); ?></label>
                                <div class='input-group date' id='datetimepicker'>
                                    <input type='text' class="form-control" name="expiry_date" value="<?= old("expiry_date"); ?>" placeholder="<?= trans("expiry_date"); ?>" required>
                                    <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-group text-right">
                        <button type="submit" name="submit" value="update" class="btn btn-md btn-success"><?= trans("add_coupon") ?></button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
<link rel="stylesheet" href="<?= base_url('assets/vendor/bootstrap-datetimepicker/bootstrap-datetimepicker.min.css'); ?>">
<script src="<?= base_url('assets/vendor/bootstrap-datetimepicker/moment.min.js'); ?>"></script>
<script src="<?= base_url('assets/vendor/bootstrap-datetimepicker/bootstrap-datetimepicker.min.js'); ?>"></script>
<script>
    $(function () {
        $('#datetimepicker').datetimepicker({
            format: 'YYYY-MM-DD HH:mm:ss'
        });
    });
</script>