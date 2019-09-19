jQuery(document).ready(function ($) {
    let filtersService  = new Filters();
    //initFilters(document.location.href);
    // linkHref = linkHref.replace('?', '');
    // console.log(linkHref);
    function  initFilters(url) {
        console.log(123);
        let linkHref = new URL(url).search;
        if(!linkHref.length){
            return false;
        }

        linkHref = linkHref.replace('?', '');
        let params = linkHref.split('&');
        for (let i = 0, lenght = params.length ; i < lenght ; i++){
            let filter = params[i].split('=');
            filtersService.setFilter(filter[0] , filter[1]);
        }
    }
    //filterAjax(linkHref);


    jQuery('.single_add_to_cart_button').click(function(e) {
        e.preventDefault();
        jQuery(this).addClass('adding-cart');
        let product_id = jQuery(this).val();
        let variation_id = jQuery('input[name="variation_id"]').val();
        let quantity = jQuery('input[name="quantity"]').val();
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
                    let cartcount = jQuery('.item-count').html();
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
                    let cartcount = jQuery('.item-count').html();
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

    //filter color/size
    $('.woocommerce-widget-layered-nav-list__item').find('a').on('click' , function (event) {
        event.preventDefault();
        $(this).parent().toggleClass('woocommerce-widget-layered-nav-list__item--chosen chosen');
        prepareFilters();
        modifyUrl();
        let url = prepareUrl();
        window.history.pushState('', '', url);
        filterAjax(url);

    });

    function modifyUrl(){

    }

    // filter price range
    $( ".price_slider_amount" ).find('.button').on( "click", function( event, ui) {
        event.preventDefault();
        setPrice();
        let url = prepareUrl();
        window.history.pushState('', '', url);
        filterAjax(url);
    });

    function setPrice() {
        let range_min = $("#min_price").val();
        let range_max = $(".price_slider_amount").find('#max_price').val();
        filtersService.setPrice('min_price' , range_min);
        filtersService.setPrice('max_price' , range_max);
    }

    function prepareFilters() {
       let chosenFilters = document.querySelectorAll('.woocommerce-widget-layered-nav-list__item--chosen');
       if(filtersService.isHasPriceInFilter()){
           filtersService.clearFilters();
           setPrice();
       }else{
           filtersService.clearFilters();
       }
        for(let i = 0, length = chosenFilters.length ; i < length ; i++){
            let linkHref = new URL(chosenFilters[i].firstChild.href).search;
            linkHref = linkHref.replace('?', '');
            if(linkHref.indexOf('&') > -1){
                let params = linkHref.split('&');
                for (let i = 0, lenght = params.length ; i < lenght ; i++){
                    let filter = params[i].split('=');
                    filtersService.setFilter(filter[0] , filter[1]);
                }
            }else{
                let params = linkHref.split('=');
                filtersService.setFilter(params[0] , params[1]);
            }

        }
    }

    function prepareUrl() {
        let filters = filtersService.getFilters();
        let params = [];
        Object.keys(filters).map((key) =>{
            params = [...params , `${key}=${filters[key]}`]
        });
        let url = window.location.protocol + '//' +
            window.location.host + window.location.pathname  +
            ((params.join('&').length > 0) ? '?' +  params.join('&') : '');
        return url;
    }

    function filterAjax(url){
        jQuery.ajax({
            url: myajax.url,
            type: 'POST',
            data: {
                action : 'choose_filters',
                status : 'publish',
                url : url,
            },
            success: function (result) {
                if (result === '') {
                    $('.products.columns-4').html("<div class='no-result col-xs-12'><p>No result</p></div>");
                } else {
                    $('.products.columns-4').html(result);
                }
            }
        });
    }
});

