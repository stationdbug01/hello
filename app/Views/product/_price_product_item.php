<?php if ($product->is_free_product == 1): ?>
    <span class="price-free"><?= trans("free"); ?></span>
<?php elseif ($product->listing_type == 'bidding'): ?>
    <a href="<?= generateProductUrl($product); ?>" class="a-meta-request-quote"><?= trans("request_a_quote") ?></a>
<?php else:
    if (!empty($product->price)):
        if ($product->listing_type == 'ordinary_listing'): ?>
            <span class="price"><?= priceFormatted($product->price_discounted, $product->currency, false); ?></span>
        <?php else: ?>
            <span class="price"><?= priceFormatted($product->price_discounted, $product->currency, true); ?></span>
            <?php if (!empty($product->discount_rate)): ?>
                <del class="discount-original-price">
                    <?= priceFormatted($product->price, $product->currency, true); ?>
                </del>
            <?php endif; ?>
        <?php endif;
    endif;
endif; ?>