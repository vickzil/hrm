jQuery(document).ready(function($) {
    getBodyFonts()

    $(".toggle-password").click(function() {

        $(this).toggleClass("fa-eye fa-eye-slash");
        var input = $($(this).attr("toggle"));
        if (input.attr("type") == "password") {
            input.attr("type", "text");
        } else {
            input.attr("type", "password");
        }
    });


    // $(".overlay-close").click(function() {

    //     $('.overlay_div').hide();
    // });

    $('.site_fonts').on('click', 'input', function() {
        let value = $(this).val();
        localStorage.setItem("bodyFont", JSON.stringify(value));
    })

    $('.setting_switch').on('click', '.btn-min_sidebar', function() {
        let value2 = '';
        let status = document.querySelector('.btn-min_sidebar').checked;
        if (status === true) {
            value2 = 'dark';
        } else {
            value2 = '';
        }

        localStorage.setItem("minbar", JSON.stringify(value2));
    })

    $('.setting_switch').on('click', '.btn-darkmode', function() {
        let value3 = '';
        let status = document.querySelector('.btn-darkmode').checked;
        if (status === true) {
            value3 = 'dark-mode';
        } else {
            value3 = '';
        }

        localStorage.setItem("darkMode", JSON.stringify(value3));
    })


    $('.setting_switch').on('click', '.btn-sidebar', function() {
        let value4 = '';
        let status = document.querySelector('.btn-sidebar').checked;
        if (status === true) {
            value4 = 'sidebar_dark';
        } else {
            value4 = '';
        }

        localStorage.setItem("sideBarDark", JSON.stringify(value4));
    })

    function getBodyFonts() {
        let bodyFont = JSON.parse(localStorage.getItem("bodyFont"));
        let miniBar = JSON.parse(localStorage.getItem("minbar"));
        let darkMode = JSON.parse(localStorage.getItem("darkMode"));
        let sideBarDark = JSON.parse(localStorage.getItem("sideBarDark"));

        if (localStorage.getItem("bodyFont") !== null) {
            $('body').removeClass('font-opensans');
            $('body').removeClass('font-montserrat');
            $('body').removeClass('font-poppins');

            $('body').addClass(bodyFont);

            if (bodyFont === 'font-opensans') {
                $(".font-opensans").prop('checked', true);
            }

            if (bodyFont === 'font-montserrat') {
                $(".font-montserrat").prop('checked', true);
            }

            if (bodyFont === 'font-poppins') {
                $(".font-poppins").prop('checked', true);
            }
        }


        if (localStorage.getItem("minbar") !== null) {
            $('.header_top').removeClass('dark');
            $('.header_top').addClass(miniBar);

            if (miniBar === 'dark') {
                $(".btn-min_sidebar").prop('checked', true);
            }
        }

        if (localStorage.getItem("darkMode") !== null) {
            $('body').removeClass('dark-mode');
            $('body').addClass(darkMode);

            if (darkMode === 'dark-mode') {
                $(".btn-darkmode").prop('checked', true);
            }
        }


        if (localStorage.getItem("sideBarDark") !== null) {
            $('body').removeClass('sidebar_dark');
            $('body').addClass(sideBarDark);

            if (sideBarDark === 'sidebar_dark') {
                $(".btn-sidebar").prop('checked', true);
            }
        } else {
            $('body').addClass('sidebar_dark');
            $(".btn-sidebar").prop('checked', true);
        }
    }




});


// const payWithPaystack = () => {

//     var handler = PaystackPop.setup({
//         key: 'pk_test_18f4e3dec75530f3ce059ff055ae8556bfead856',
//         email: 'victorjohson@gmail.com',
//         amount: 300000,
//         currency: "NGN",
//         ref: '' + Math.floor((Math.random() * 1000000000) + 1),
//         metadata: {
//             custom_fields: [{
//                 display_name: "Victor Johnson",
//                 variable_name: "vickkijohnson",
//                 value: "090864664334"
//             }]
//         },
//         callback: function(response) {

//             window.location.replace("index.html?ref=" + response.reference);
//         },
//         onClose: function() {}
//     });
//     handler.openIframe();

// }