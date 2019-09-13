<?php
// add styles
function registerStyles()
{
//    wp_enqueue_style('icons_style', 'https://use.fontawesome.com/releases/v5.9.0/css/all.css', array(), '1.1.0');
//    wp_enqueue_style('icons_style', 'https://use.fontawesome.com/releases/v5.9.0/css/v4-shims.css', array(), '1.1.0');
//    wp_enqueue_style('main_style', get_stylesheet_directory_uri() . '/src/css/main.css', array(), '1.0.0');
    wp_enqueue_style('jquery_ui_style', get_stylesheet_directory_uri() . '/src/css/jquery-ui.css', array(), '1.1.0');
}
add_action('wp_enqueue_scripts', 'registerStyles');

// add scripts
function enqueue_scripts()
{

    wp_enqueue_script('theme_scripts', get_stylesheet_directory_uri() . '/src/js/main.js', array('jquery'), '1.1.0', true);
    wp_enqueue_script('jquery_ui_scripts', get_stylesheet_directory_uri() . '/src/js/jquery-ui.js', array('jquery'), '1.1.0', true);
}
add_action('wp_enqueue_scripts', 'enqueue_scripts');

add_action( 'wp_enqueue_scripts', 'myajax_data', 99 );
function myajax_data(){
    wp_localize_script( 'theme_scripts', 'myajax',
        array(
            'url' => admin_url('admin-ajax.php')
        )
    );
}

function crispshop_add_cart_single_ajax() {
    $product_id = $_POST['product_id'];
    $variation_id = $_POST['variation_id'];

    $quantity = $_POST['quantity'];

    if ($variation_id) {
        WC()->cart->add_to_cart( $product_id, $quantity, $variation_id );
    } else {
        WC()->cart->add_to_cart( $product_id, $quantity);
    }

    $items = WC()->cart->get_cart();
    global $woocommerce;
    $item_count = $woocommerce->cart->cart_contents_count; ?>

    <span class="item-count"><?php echo $item_count; ?></span>

    <h4>Shopping Bag</h4>

    <?php foreach($items as $item => $values) {
        $_product = $values['data']->post; ?>

        <div class="dropdown-cart-wrap">
            <div class="dropdown-cart-left">
                <?php $variation = $values['variation_id'];
                if ($variation) {
                    echo get_the_post_thumbnail( $values['variation_id'], 'thumbnail' );
                } else {
                    echo get_the_post_thumbnail( $values['product_id'], 'thumbnail' );
                } ?>
            </div>

            <div class="dropdown-cart-right">
                <h5><?php echo $_product->post_title; ?></h5>
                <p><strong>Quantity:</strong> <?php echo $values['quantity']; ?></p>
                <?php global $woocommerce;
                $currency = get_woocommerce_currency_symbol();
                $price = get_post_meta( $values['product_id'], '_regular_price', true);
                $sale = get_post_meta( $values['product_id'], '_sale_price', true);
                ?>

                <?php if($sale) { ?>
                    <p class="price"><strong>Price:</strong> <del><?php echo $currency; echo $price; ?></del> <?php echo $currency; echo $sale; ?></p>
                <?php } elseif($price) { ?>
                    <p class="price"><strong>Price:</strong> <?php echo $currency; echo $price; ?></p>
                <?php } ?>
            </div>

            <div class="clear"></div>
        </div>
    <?php } ?>

    <div class="dropdown-cart-wrap dropdown-cart-subtotal">
        <div class="dropdown-cart-left">
            <h6>Subtotal</h6>
        </div>

        <div class="dropdown-cart-right">
            <h6><?php echo WC()->cart->get_cart_total(); ?></h6>
        </div>

        <div class="clear"></div>
    </div>

    <?php $cart_url = $woocommerce->cart->get_cart_url();
    $checkout_url = $woocommerce->cart->get_checkout_url(); ?>

    <div class="dropdown-cart-wrap dropdown-cart-links">
        <div class="dropdown-cart-left dropdown-cart-link">
            <a href="<?php echo $cart_url; ?>">View Cart</a>
        </div>

        <div class="dropdown-cart-right dropdown-checkout-link">
            <a href="<?php echo $checkout_url; ?>">Checkout</a>
        </div>

        <div class="clear"></div>
    </div>

    <?php die();
}

add_action('wp_ajax_crispshop_add_cart_single', 'crispshop_add_cart_single_ajax');
add_action('wp_ajax_nopriv_crispshop_add_cart_single', 'crispshop_add_cart_single_ajax');

//create function show message for shortcode
function show_message_1() {
    $productName = get_the_title();
    $span = '<span id="m-quantity"></span>';
    $message = " $productName added to the cart - $span item(s)";
    echo $message;
}

// add shortcode
add_shortcode ('message_add_to_cart', 'show_message_1');

// color and size filter
if (wp_doing_ajax()) {
    add_action('wp_ajax_choose_color_size_filter', 'choose_color_size_filter');
    add_action('wp_ajax_nopriv_choose_color_size_filter', 'choose_color_size_filter');
}
function choose_color_size_filter()
{
    $url = $_POST['url'];
//    var_dump($url);
    $query = parse_url($url, PHP_URL_QUERY);
    var_dump($query);
    parse_str($query, $filters);
//    var_dump($filters);
    $args = array(
        'post_status' => 'publish',
        'post_type' => 'product',
        'posts_per_page' => 6,
        'tax_query' => [
            'relation' => 'OR',
            [
                'relation' => 'AND',
                [
                    'taxonomy' => 'pa_color',
                    'field'    => 'slug',
                    'terms'    => [ $filters['filter_color'] ]
                ],
                [
                    'taxonomy' => 'pa_size',
                    'field'    => 'slug',
                    'terms'    => $filters['filter_size']
                ]
            ],
            [
                [
                    'taxonomy' => 'pa_color',
                    'field'    => 'slug',
                    'terms'    => [ $filters['filter_color'] ]
                ]
            ],
            [
                [
                    'taxonomy' => 'pa_size',
                    'field'    => 'slug',
                    'terms'    => $filters['filter_size']
                ]
            ],
        ]
    );
    $products = new WP_Query($args);
//    echo "<pre>";
//    var_dump($products->posts);
    while ($products->have_posts()) {
        $products->the_post();
        /**
         * Hook: woocommerce_shop_loop.
         *
         * @hooked WC_Structured_Data::generate_product_data() - 10
         */
        do_action('woocommerce_shop_loop');

        wc_get_template_part('content', 'product');
    }
    wp_die();
}

