jQuery(document).ready(function ($) {
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

    // choose color filter
    $('#woocommerce_layered_nav-6').find('ul').find('li').find('a').on('click', function(event) {
        event.preventDefault();
        $(this).parent().toggleClass('woocommerce-widget-layered-nav-list__item--chosen chosen');
        let filters = jQuery(this).closest('ul').find('li'), data = [];
        filters.each(function(index, filter){
            if (jQuery(filter).hasClass('chosen')) {
                data.push(jQuery(filter).find('a').text());
            }
        });
        if (data.length !== 0) {
            console.log('hello');
            data = 'filter_color=' + data.join(',');
        } else data = '';

        console.log(data);


    });






    // //url-tools
    // /*! (c) Andrea Giammarchi - ISC */
    // let self=this||{};try{!function(t,n){if(new t("q=%2B").get("q")!==n||new t({q:n}).get("q")!==n||new t([["q",n]]).get("q")!==n||"q=%0A"!==new t("q=\n").toString()||"q=+%26"!==new t({q:" &"}).toString())throw t;self.URLSearchParams=t}(URLSearchParams,"+")}catch(t){!function(t,a,o){"use strict";var u=t.create,h=t.defineProperty,n=/[!'\(\)~]|%20|%00/g,e=/\+/g,r={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"},i={append:function(t,n){l(this._ungap,t,n)},delete:function(t){delete this._ungap[t]},get:function(t){return this.has(t)?this._ungap[t][0]:null},getAll:function(t){return this.has(t)?this._ungap[t].slice(0):[]},has:function(t){return t in this._ungap},set:function(t,n){this._ungap[t]=[a(n)]},forEach:function(n,e){var r=this;for(var i in r._ungap)r._ungap[i].forEach(t,i);function t(t){n.call(e,t,a(i),r)}},toJSON:function(){return{}},toString:function(){var t=[];for(var n in this._ungap)for(var e=g(n),r=0,i=this._ungap[n];r<i.length;r++)t.push(e+"="+g(i[r]));return t.join("&")}};for(var s in i)h(c.prototype,s,{configurable:!0,writable:!0,value:i[s]});function c(t){var n=u(null);switch(h(this,"_ungap",{value:n}),!0){case!t:break;case"string"==typeof t:"?"===t.charAt(0)&&(t=t.slice(1));for(var e=t.split("&"),r=0,i=e.length;r<i;r++){var a=(s=e[r]).indexOf("=");-1<a?l(n,p(s.slice(0,a)),p(s.slice(a+1))):s.length&&l(n,p(s),"")}break;case o(t):for(r=0,i=t.length;r<i;r++){var s;l(n,(s=t[r])[0],s[1])}break;case"forEach"in t:t.forEach(f,n);break;default:for(var c in t)l(n,c,t[c])}}function f(t,n){l(this,n,t)}function l(t,n,e){var r=o(e)?e.join(","):e;n in t?t[n].push(r):t[n]=[r]}function p(t){return decodeURIComponent(t.replace(e," "))}function g(t){return encodeURIComponent(t).replace(n,v)}function v(t){return r[t]}self.URLSearchParams=c}(Object,String,Array.isArray)}!function(l){var r=!1;try{r=!!Symbol.iterator}catch(t){}function t(t,n){var e=[];return t.forEach(n,e),r?e[Symbol.iterator]():{next:function(){var t=e.shift();return{done:void 0===t,value:t}}}}"forEach"in l||(l.forEach=function(e,r){var i=this,t=Object.create(null);this.toString().replace(/=[\s\S]*?(?:&|$)/g,"=").split("=").forEach(function(n){!n.length||n in t||(t[n]=i.getAll(n)).forEach(function(t){e.call(r,t,n,i)})})}),"keys"in l||(l.keys=function(){return t(this,function(t,n){this.push(n)})}),"values"in l||(l.values=function(){return t(this,function(t,n){this.push(t)})}),"entries"in l||(l.entries=function(){return t(this,function(t,n){this.push([n,t])})}),!r||Symbol.iterator in l||(l[Symbol.iterator]=l.entries),"sort"in l||(l.sort=function(){for(var t,n,e,r=this.entries(),i=r.next(),a=i.done,s=[],c=Object.create(null);!a;)n=(e=i.value)[0],s.push(n),n in c||(c[n]=[]),c[n].push(e[1]),a=(i=r.next()).done;for(s.sort(),t=0;t<s.length;t++)this.delete(s[t]);for(t=0;t<s.length;t++)n=s[t],this.append(n,c[n].shift())}),function(c){var o=c.defineProperty,u=c.getOwnPropertyDescriptor,h=function(t){var n=t.append;t.append=l.append,URLSearchParams.call(t,t._usp.search.slice(1)),t.append=n},f=function(t,n){if(!(t instanceof n))throw new TypeError("'searchParams' accessed on an object that does not implement interface "+n.name)},t=function(n){var e,r,t=n.prototype,i=u(t,"searchParams"),a=u(t,"href"),s=u(t,"search");!i&&s&&s.set&&(r=function(e){function r(t,n){l.append.call(this,t,n),t=this.toString(),e.set.call(this._usp,t?"?"+t:"")}function i(t){l.delete.call(this,t),t=this.toString(),e.set.call(this._usp,t?"?"+t:"")}function a(t,n){l.set.call(this,t,n),t=this.toString(),e.set.call(this._usp,t?"?"+t:"")}return function(t,n){return t.append=r,t.delete=i,t.set=a,o(t,"_usp",{configurable:!0,writable:!0,value:n})}}(s),e=function(t,n){return o(t,"_searchParams",{configurable:!0,writable:!0,value:r(n,t)}),n},c.defineProperties(t,{href:{get:function(){return a.get.call(this)},set:function(t){var n=this._searchParams;a.set.call(this,t),n&&h(n)}},search:{get:function(){return s.get.call(this)},set:function(t){var n=this._searchParams;s.set.call(this,t),n&&h(n)}},searchParams:{get:function(){return f(this,n),this._searchParams||e(this,new URLSearchParams(this.search.slice(1)))},set:function(t){f(this,n),e(this,t)}}}))};try{t(HTMLAnchorElement),/^function|object$/.test(typeof URL)&&URL.prototype&&t(URL)}catch(t){}}(Object)}(self.URLSearchParams.prototype,Object);
    //
    // function prepareFilteredLink(params) {
    //     let urlParams = new URLSearchParams(window.location.search);
    //
    //     for (let prop in params) {
    //
    //         if(params.hasOwnProperty(prop)) {
    //             if(params[prop]) {
    //                 urlParams.set(prop, params[prop])
    //             } else {
    //                 urlParams.delete(prop)
    //             }
    //         }
    //     }
    //     let uri = decodeURIComponent(urlParams.toString());
    //
    //     return window.location.protocol + '//' +
    //         window.location.host + window.location.pathname  +
    //         ((uri.length > 0) ? '?' +  uri : '');
    // }
    //
    // // choose color filter
    // // $('#woocommerce_layered_nav-2').find('ul').find('li').find('a').on('click', function(event){
    // //     event.stopPropagation();
    // //     event.preventDefault();
    // //     // alert('color');
    // //     // check - this filter chosen
    // //     // if ($(this).parent().hasClass('woocommerce-widget-layered-nav-list__item--chosen')) {
    // //     //     // reset color
    // //     //     // console.log($(this).parent());
    // //     //     let url = prepareFilteredLink({
    // //     //         filter_color: 0,
    // //     //     });
    // //     //     // console.log(url);
    // //     //     window.history.pushState('', '', url);
    // //     //     $(this).parent().toggleClass('woocommerce-widget-layered-nav-list__item--chosen chosen');
    // //     //     return;
    // //     // }
    // //
    // //     let url;
    // //     if ($(this).parent().hasClass('woocommerce-widget-layered-nav-list__item--chosen')) {
    // //         //reset color
    // //         url = prepareFilteredLink({
    // //             filter_color: 0,
    // //         });
    // //         $(this).parent().removeClass('woocommerce-widget-layered-nav-list__item--chosen chosen');
    // //         window.history.pushState('', '', url);
    // //
    // //     } else {
    // //         // add color
    // //         let filter_color = $(this).text();
    // //         url = prepareFilteredLink({
    // //             filter_color: filter_color
    // //         });
    // //         $(this).parent().addClass('woocommerce-widget-layered-nav-list__item--chosen chosen');
    // //         window.history.pushState('', '', url);
    // //     }
    // //
    // //     // $(this).parent().toggleClass('woocommerce-widget-layered-nav-list__item--chosen chosen');
    // //     // // // alert(url);
    // //     // // let url =this.href;
    // //     // //
    // //     // let url = window.history.pushState('', '', this.href);
    // //     // // console.log(this.href);
    // //     // //
    // //     // window.location.href = url;
    // //     // // let url = window.location.href;
    // //     //
    // //     // return;
    // //
    // //     jQuery.ajax({
    // //         url: myajax.url,
    // //         type: 'POST',
    // //         data: {
    // //             // action : 'choose_color_size_filter',
    // //             action : 'choose_any_filter',
    // //             status : 'publish',
    // //             // color : color,
    // //             url : url,
    // //         },
    // //         beforeSend: function (xhr) {
    // //
    // //             // $('.sk-circle-bounce').css({
    // //             //     display:'block'
    // //             // });
    // //         },
    // //         success: function (result) {
    // //             // $('.sk-circle-bounce').css({
    // //             //     display:'none'
    // //             // });
    // //             console.log(result);
    // //             if (result === '') {
    // //                 $('.products.columns-4').html("<div class='no-result col-xs-12'><p>No result</p></div>");
    // //             } else {
    // //                 $('.products.columns-4').html(result);
    // //             }
    // //         }
    // //     });
    // //     return false;
    // // });
    //
    //
    //
    //
    //
    // // choose size filter
    // $('#woocommerce_layered_nav-3').find('ul').find('li').find('a').on('click', function(event){
    //     event.stopPropagation();
    //     event.preventDefault();
    //     // alert('size');
    //     // check - this filter chosen
    //     // if ($(this).parent().hasClass('woocommerce-widget-layered-nav-list__item--chosen')) {
    //     //     // reset size
    //     //     // console.log($(this).parent());
    //     //     let url = prepareFilteredLink({
    //     //         filter_size: 0,
    //     //     });
    //     //     // console.log(url);
    //     //     window.history.pushState('', '', url);
    //     //     $(this).parent().toggleClass('woocommerce-widget-layered-nav-list__item--chosen chosen');
    //     //     return;
    //     // }
    //
    //     // $(this).parent().toggleClass('woocommerce-widget-layered-nav-list__item--chosen chosen');
    //     let url;
    //     if ($(this).parent().hasClass('woocommerce-widget-layered-nav-list__item--chosen')) {
    //         // reset size
    //         url = prepareFilteredLink({
    //             filter_size: 0,
    //         });
    //         // console.log(url);
    //         window.history.pushState('', '', url);
    //         $(this).parent().removeClass('woocommerce-widget-layered-nav-list__item--chosen chosen');
    //     } else {
    //         let filter_size = $(this).text();
    //         url = prepareFilteredLink({
    //             filter_size: filter_size,
    //         });
    //         $(this).parent().addClass('woocommerce-widget-layered-nav-list__item--chosen chosen');
    //         window.history.pushState('', '', this.href);
    //     }
    //
    //
    //
    //     // window.history.pushState('', '', url);
    //     // let url =this.href;
    //     // url = window.location.href;
    //     // console.log(this.href);
    //     // return;
    //
    //
    //     // console.log(url);
    //     $.ajax({
    //        url: myajax.url,
    //        type: 'POST',
    //        data: {
    //           // action : 'choose_color_size_filter',
    //           action : 'choose_any_filter',
    //           status : 'publish',
    //           // color : color,
    //           url : url,
    //        },
    //        beforeSend: function (xhr) {
    //
    //           // $('.sk-circle-bounce').css({
    //           //    display:'block'
    //           // });
    //        },
    //        success: function (result) {
    //           // $('.sk-circle-bounce').css({
    //           //    display:'none'
    //           // });
    //           if (result === '') {
    //              $('.products.columns-4').html("<div class='no-result col-xs-12'><p>No result</p></div>");
    //           } else {
    //              $('.products.columns-4').html(result);
    //           }
    //        }
    //     });
    //     return false;
    // });
    //
    //
    // // filter price range
    // $( ".price_slider_amount" ).find('.button').on( "click", function( event, ui) {
    //     event.stopPropagation();
    //     event.preventDefault();
    //     // alert('price');
    //     let range_min = $( ".price_slider_amount" ).find('#min_price').val();
    //     let range_max = $( ".price_slider_amount" ).find('#max_price').val();
    //
    //     let url = prepareFilteredLink({
    //         min_price: range_min,
    //         max_price: range_max
    //     });
    //     // window.history.pushState('', '', url);
    //     window.history.replaceState('', '', url);
    //     // url = this.href;
    //     // window.location.href = url;
    //     // console.log(url);
    //     // return;
    //     $.ajax({
    //
    //         url: myajax.url,
    //         type: 'POST',
    //         data: {
    //             // action : 'choose_price_range',
    //             action : 'choose_any_filter',
    //             status : 'publish',
    //             url : url,
    //             // range_min : range_min,
    //             // range_max : range_max,
    //         },
    //         beforeSend: function (xhr) {
    //             // $('.sk-circle-bounce').css({
    //             //     display:'block'
    //             // });
    //         },
    //         success: function (result) {
    //             // $('.sk-circle-bounce').css({
    //             //     display:'none'
    //             // });
    //             if (result === '') {
    //                 $('.products.columns-4').html("<div class='no-result col-xs-12'><p>No result</p></div>");
    //             } else {
    //                 $('.products.columns-4').html(result);
    //             }
    //         }
    //     });
    //     return false;
    // });
    // function filterAjax(){
    //     jQuery.ajax({
    //         url: myajax.url,
    //         type: 'POST',
    //         data: {
    //             action : 'choose_color_size_filter',
    //             // action : 'choose_any_filter',
    //             status : 'publish',
    //             color : JSON.parse(localStorage.getItem('filter_color')),
    //             // url : url,
    //         },
    //         success: function (result) {
    //             if (result === '') {
    //                 $('.products.columns-4').html("<div class='no-result col-xs-12'><p>No result</p></div>");
    //             } else {
    //                 $('.products.columns-4').html(result);
    //             }
    //         }
    //     });
    // }
    // // jQuery('#woocommerce_layered_nav-2').find('ul a').click(function(){
    // //     event.stopPropagation();
    // //     event.preventDefault();
    // //     $(this).parent().toggleClass('woocommerce-widget-layered-nav-list__item--chosen chosen');
    // //     let filters = jQuery(this).closest('ul').find('li'), data = {};
    // //     filters.each(function(index, filter){
    // //         data[jQuery(filter).find('a').text()] = jQuery(filter).hasClass('chosen');
    // //     });
    // //     console.log(data);
    // //     let serialData = JSON.stringify(data);
    // //     localStorage.setItem('filter_color', serialData);
    // //     let localFilterColor = JSON.parse(localStorage.getItem('filter_color'));
    // //     // let localFilterColor = localStorage.getItem('filter_color');
    // //     console.log(localFilterColor);
    // //     filterAjax();
    // //     // jQuery.ajax({
    // //     //     url: myajax.url,
    // //     //     type: 'POST',
    // //     //     data: {
    // //     //         action : 'choose_color_size_filter',
    // //     //         // action : 'choose_any_filter',
    // //     //         status : 'publish',
    // //     //         color : localFilterColor,
    // //     //         // url : url,
    // //     //     },
    // //     //     beforeSend: function (xhr) {
    // //     //
    // //     //         // $('.sk-circle-bounce').css({
    // //     //         //     display:'block'
    // //     //         // });
    // //     //     },
    // //     //     success: function (result) {
    // //     //         // $('.sk-circle-bounce').css({
    // //     //         //     display:'none'
    // //     //         // });
    // //     //         console.log(result);
    // //     //         if (result === '') {
    // //     //             $('.products.columns-4').html("<div class='no-result col-xs-12'><p>No result</p></div>");
    // //     //         } else {
    // //     //             $('.products.columns-4').html(result);
    // //     //         }
    // //     //     }
    // //     // });
    // // });
    // // if (localStorage.getItem('filter_color')) {
    // //     // console.log('hello');
    // //     filterAjax();
    // //     // jQuery.ajax({
    // //     //     url: myajax.url,
    // //     //     type: 'POST',
    // //     //     data: {
    // //     //         action : 'choose_color_size_filter',
    // //     //         // action : 'choose_any_filter',
    // //     //         status : 'publish',
    // //     //         color : JSON.parse(localStorage.getItem('filter_color')),
    // //     //         // url : url,
    // //     //     },
    // //     //     beforeSend: function (xhr) {
    // //     //
    // //     //         // $('.sk-circle-bounce').css({
    // //     //         //     display:'block'
    // //     //         // });
    // //     //     },
    // //     //     success: function (result) {
    // //     //         // $('.sk-circle-bounce').css({
    // //     //         //     display:'none'
    // //     //         // });
    // //     //         console.log(result);
    // //     //         if (result === '') {
    // //     //             $('.products.columns-4').html("<div class='no-result col-xs-12'><p>No result</p></div>");
    // //     //         } else {
    // //     //             $('.products.columns-4').html(result);
    // //     //         }
    // //     //     }
    // //     // });
    // // }

});

