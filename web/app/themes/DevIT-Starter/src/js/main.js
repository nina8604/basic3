jQuery(document).ready(function ($) {
// // Ajax add to cart on the product page
//     var $warp_fragment_refresh = {
//         url: wc_cart_fragments_params.wc_ajax_url.toString().replace( '%%endpoint%%', 'get_refreshed_fragments' ),
//         type: 'POST',
//         success: function( data ) {
//             if ( data && data.fragments ) {
//
//                 $.each( data.fragments, function( key, value ) {
//                     $( key ).replaceWith( value );
//                 });
//
//                 $( document.body ).trigger( 'wc_fragments_refreshed' );
//             }
//         }
//     };
// // add a click event to the add to cart button in the product page
//     $('.entry-summary form.cart').on('submit', function (e)
//         {
//             e.preventDefault();
//
//             $('.entry-summary').block({
//                 message: null,
//                 overlayCSS: {
//                     cursor: 'none'
//                 }
//             });
//
//             var product_url = window.location,
//                 form = $(this);
//
//             $.post(product_url, form.serialize() + '&_wp_http_referer=' + product_url, function (result)
//             {
//                 var cart_dropdown = $('.widget_shopping_cart', result);
//
//                 // update dropdown cart
//                 $('.widget_shopping_cart').replaceWith(cart_dropdown);
//
//                 // update fragments
//                 $.ajax($warp_fragment_refresh);
//
//                 $('.entry-summary').unblock();
//
//             });
//         });
//     jQuery( function( $ ) {
//         $(".single_add_to_cart_button").addClass("ajax_add_to_cart");
//         $( ".post-type-archive-product" ).on( "click", ".quantity input", function() {
//             return false;   });
//         $( ".archive" ).on( "change input", ".quantity .qty", function() {
//             var add_to_cart_button = $( this ).parents( ".product" ).find( ".add_to_cart_button" );
//             // For AJAX add-to-cart actions
//             add_to_cart_button.data( "quantity", $( this ).val() );
//             // For non-AJAX add-to-cart actions
//             add_to_cart_button.attr( "href", "?add-to-cart=" + add_to_cart_button.attr( "data-product_id" ) + "&quantity=" + $( this ).val() );
//         });
//         $(".input-text.qty.text").bind('keyup mouseup', function () {
//             var value = $(this).val();
//             $(".product_quantity").val(value)
//         });
//         if ( typeof wc_add_to_cart_params === 'undefined' )
//             return false;
//         $( document ).on( 'click', '.ajax_add_to_cart', function(e) {
//             e.preventDefault();
//             var $thisbutton = $(this);
//             var $variation_form = $( this ).closest( '.variations_form' );
//             var var_id = $variation_form.find( 'input[name=variation_id]' ).val();
//             $( '.ajaxerrors' ).remove();
//             var item = {},
//                 check = true;
//             variations = $variation_form.find( 'select[name^=attribute]' );
//             if ( !variations.length) {
//                 variations = $variation_form.find( '[name^=attribute]:checked' );
//             }
//             if ( !variations.length) {
//                 variations = $variation_form.find( 'input[name^=attribute]' );
//             }
//             variations.each( function() {
//                 var $this = $( this ),
//                     attributeName = $this.attr( 'name' ),
//                     attributevalue = $this.val(),
//                     index,
//                     attributeTaxName;
//                 $this.removeClass( 'error' );
//                 if ( attributevalue.length === 0 ) {
//                     index = attributeName.lastIndexOf( '_' );
//                     attributeTaxName = attributeName.substring( index + 1 );
//                     $this.addClass( 'required error' ).before( '<div class="ajaxerrors"><p>Please select ' + attributeTaxName + '</p></div>' );
//                     check = false;
//                 } else {
//                     item[attributeName] = attributevalue;
//                 }
//             } );
//             if ( !check ) {
//                 return false;
//             }
//             if ( $thisbutton.is( '.ajax_add_to_cart' ) ) {
//                 $thisbutton.removeClass( 'added' );
//                 $thisbutton.addClass( 'loading' );
//                 if ($( this ).parents(".variations_form")[0]){
//                     var product_id = $variation_form.find('input[name=product_id]').val();
//                     var quantity = $variation_form.find( 'input[name=quantity]' ).val();
//                     var data = {
//                         action: 'bodycommerce_ajax_add_to_cart_woo',
//                         product_id: product_id,
//                         quantity: quantity,
//                         variation_id: var_id,
//                         variation: item
//                     };
//                 }   else {
//                     var product_id = $(this).parent().find(".product_id").val();
//                     var quantity = $(this).parent().find(".qty").val();
//                     var data = {
//                         action: 'bodycommerce_ajax_add_to_cart_woo_single',
//                         product_id: product_id,
//                         quantity: quantity
//                     };
//                 }
//                 $( 'body' ).trigger( 'adding_to_cart', [ $thisbutton, data ] );
//                 $.post( wc_add_to_cart_params.ajax_url, data, function( response ) {
//                     if ( ! response )
//                         return;
//                     var this_page = window.location.toString();
//                     this_page = this_page.replace( 'add-to-cart', 'added-to-cart' );
//                     if ( response.error && response.product_url ) {
//                         window.location = response.product_url;
//                         return;
//                     }
//                     if ( wc_add_to_cart_params.cart_redirect_after_add === 'yes' ) {
//                         window.location = wc_add_to_cart_params.cart_url;
//                         return;
//                     } else {
//                         $thisbutton.removeClass( 'loading' );
//                         var fragments = response.fragments;
//                         var cart_hash = response.cart_hash;
//                         if ( fragments ) {
//                             $.each( fragments, function( key ) {
//                                 $( key ).addClass( 'updating' );
//                             });
//                         }
//                         $( '.shop_table.cart, .updating, .cart_totals' ).fadeTo( '400', '0.6' ).block({ message: null,  overlayCSS: {   opacity: 0.6    }   });
//                         $thisbutton.addClass( 'added' );
//                         if ( fragments ) {
//                             $.each( fragments, function( key, value ) {
//                                 $( key ).replaceWith( value );
//                             });
//                         }
//                         $( '.widget_shopping_cart, .updating' ).stop( true ).css( 'opacity', '1' ).unblock();
//                         $( '.shop_table.cart' ).load( this_page + ' .shop_table.cart:eq(0) &gt; *', function() {
//                             $( '.shop_table.cart' ).stop( true ).css( 'opacity', '1' ).unblock();
//                             $( document.body ).trigger( 'cart_page_refreshed' );
//                         });
//                         $( '.cart_totals' ).load( this_page + ' .cart_totals:eq(0) &gt; *', function() {
//                             $( '.cart_totals' ).stop( true ).css( 'opacity', '1' ).unblock();
//                         });
//                     }
//                 });
//                 return false;
//             } else {
//                 return true;
//             }
//         });
//     });

    jQuery('.single_add_to_cart_button').click(function(e) {
        e.preventDefault();

        jQuery(this).addClass('adding-cart');
        var product_id = jQuery(this).val();
        var variation_id = jQuery('input[name="variation_id"]').val();
        var quantity = jQuery('input[name="quantity"]').val();
        console.log(quantity);
        jQuery('.cart-dropdown-inner').empty();

        if (variation_id != '') {
            jQuery.ajax ({
                url: myajax.url,
                type:'POST',
                data:'action=crispshop_add_cart_single&product_id=' + product_id + '&variation_id=' + variation_id + '&quantity=' + quantity,

                success:function(results) {
                    jQuery('#m-quantity').text(quantity);
                    jQuery('.cart-dropdown-inner').append(results);
                    var cartcount = jQuery('.item-count').html();
                    jQuery('.cart-totals span').html(cartcount);
                    jQuery('.single_add_to_cart_button').removeClass('adding-cart');
                    jQuery('html, body').animate({ scrollTop: 0 }, 'slow');
                    jQuery('.cart-dropdown').addClass('show-dropdown');
                    setTimeout(function () {
                        jQuery('.cart-dropdown').removeClass('show-dropdown');
                    }, 3000);
                }
            });
        } else {
            jQuery.ajax ({
                url: myajax.url,
                type:'POST',
                data:'action=crispshop_add_cart_single&product_id=' + product_id + '&quantity=' + quantity,

                success:function(results) {
                    jQuery('.cart-dropdown-inner').append(results);
                    var cartcount = jQuery('.item-count').html();
                    jQuery('.cart-totals span').html(cartcount);
                    jQuery('.single_add_to_cart_button').removeClass('adding-cart');
                    jQuery('html, body').animate({ scrollTop: 0 }, 'slow');
                    jQuery('.cart-dropdown').addClass('show-dropdown');
                    setTimeout(function () {
                        jQuery('.cart-dropdown').removeClass('show-dropdown');
                    }, 3000);
                }
            });
        }
    });


});

