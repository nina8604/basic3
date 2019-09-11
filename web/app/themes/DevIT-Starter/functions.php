<?php
//https://elartica.com/2017/08/03/woocommerce-ajax-add-cart-single-product-page/
//https://diviengine.com/woocommerce-add-cart-ajax-single-variable-products-improve-ux/
//https://wppatrickk.com/woocommerce-add-cart-ajax-single-product-page/

// add styles
function registerStyles()
{
//    wp_enqueue_style('icons_style', 'https://use.fontawesome.com/releases/v5.9.0/css/all.css', array(), '1.1.0');
//    wp_enqueue_style('icons_style', 'https://use.fontawesome.com/releases/v5.9.0/css/v4-shims.css', array(), '1.1.0');
//    wp_enqueue_style('main_style', get_stylesheet_directory_uri() . '/src/css/main.css', array(), '1.0.0');
}
add_action('wp_enqueue_scripts', 'registerStyles');

// add scripts
function enqueue_scripts()
{
    //wp_enqueue_script('jquery');

    wp_enqueue_script('theme_scripts', get_stylesheet_directory_uri() . '/src/js/main.js', array('jquery'), '1.1.0', true);
//    wp_enqueue_script('jquery_ui_scripts', get_stylesheet_directory_uri() . '/src/js/jquery-ui.js', array('jquery'), '1.1.0', true);

}
add_action('wp_enqueue_scripts', 'enqueue_scripts');

//create function show contact form for shortcode
function show_message_1() {
    global $product;
    $productName = get_the_title();
//    $quantity = isset( $_POST['quantity'] ) ? wc_stock_amount( wp_unslash( $_POST['quantity'] ) ) : 1;
    var_dump(WC()->cart->get_cart());
//    var_dump($_POST);
//    $message = "$productName add to the cart $quantity";
//    $message = "";
//    echo $message;
}

// add shortcode
add_shortcode ('message_add_to_cart', 'show_message_1');

