<?php if ($product->is_sold == 1): ?>
    <strong class="lbl-price lbl-price-sold">
        <b class="discount-original-price">
            <?= priceFormatted($price, $product->currency); ?>
            <span class="price-line"></span>
        </b>
    </strong>
<?php else:
    if ($product->is_free_product == 1):?>
        <strong class="lbl-free text-success"><?= trans("free"); ?></strong>
    <?php else:
        if (!empty($price)):
            if ($product->listing_type == 'sell_on_site' || $product->listing_type == 'license_key'):
                if (!empty($discountRate)): ?>
                    <strong class="lbl-price">
                        <?= priceFormatted($priceDiscounted, $product->currency, true); ?>
                        <b class="discount-original-price">
                            <?= priceFormatted($price, $product->currency, true); ?>
                            <span class="price-line"></span>
                        </b>
                    </strong>
                    <div class="discount-rate">
                        -<?= discountRateFormat($discountRate); ?>
                    </div>
                <?php else: ?>
                    <strong class="lbl-price">
                        <?= priceFormatted($price, $product->currency, true); ?>
                    </strong>
                <?php endif;
            elseif ($product->listing_type == 'ordinary_listing'):
                if ($productSettings->classified_price == 1):?>
                    <strong class="lbl-price">
                        <?= priceFormatted($price, $product->currency); ?>
                    </strong>
                <?php endif;
            endif;
        endif;
    endif;
endif; ?>