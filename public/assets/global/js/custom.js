var app_url = $('#app_url').val(),
    $_token = '';
var ajax_errors = {
    401: {
        title: 'غير مصرح لك بعرض هذه الصفحة',
        desc: 'لا يمكن عرض هذه الصفحة .. يجب عليك تسجيل الدخول اولا'
    },
    404: {
        title: 'الصفحة المطلوبة غير موجودة',
        desc: 'الصفحة المطلوبة غير موجودة .. الرجاء التحقق من صحة الرابط المطلوب'
    },
    408: {
        title: 'انتهى الوقت المسموح لطلب الصفحة',
        desc: 'عرض الصفحة المطلوبة يتطلب وقت طويل .. يرجى مراجعة مسئول النظام'
    },
    500: {
        title: 'خطا داخلي في الصفحة المطلوبة',
        desc: 'لقد حدث خطا فادح في هذه الصفحة .. يرجى مراجعة مسئول النظام'
    },
    403: {
        title: 'لا يمكن تنفيذ هذا الامر',
        desc: 'لا تملك الصلاحيات الكافية لتنفيذ هذا الامر .. يرجى مراجعة مسئول النظام اذا كنت تعتقد بوجود خطا في الصلاحيات الممنوحة لك'
    }
};

var months = ["1- يناير", "2- فبراير", "3- مارس", "4- ابريل", "5- مايو", "6- يونيو", "7- يوليو", "8- اغسطس", "9- سبتمبر", "10- اكتوبر", "11- نوفمبر", "12- ديسمبر"],
    months_short = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];


function dd(data) {
    console.log(data);
}

function _e(e) {
    return $.parseJSON(e);
}

$.fn.exists = function () {
    return this.length > 0;
};

function ajax($url) {
    $.ajax({
        type: "post",
        url: $url,
        data: {_token: $_token},
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: function ($response) {
            notify($response.status, $response.msg)
            if ($response.redirect_url) {
                setTimeout(function () {
                    window.location.href = $response.redirect_url;
                }, 1000);
            }
        },
        dataType: 'JSON'
    });
}
$('.delete-item').on('click', function ($e) {
    swal({
        title: "Are you sure?",
        // text: "Your will not be able to recover this imaginary file!",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn btn-danger",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false
    }).then(function (e) {
        if (e.value) {
            var $url = $e.delegateTarget.dataset.url,
                $item = $e.currentTarget.closest('tr');
            if ($url) {
                $.ajax({
                    method: "delete",
                    url: $url,
                    data: {_token: $_token},
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    success: function ($response) {
                        if ($response.status == 'success') {
                            var parent = $($item).parent();
                            $item.remove();
                            if (parent.find('tr').length < 1) {
                                window.location.reload();
                            }

                        }
                        notify($response.status, $response.msg)
                    },
                    dataType: 'JSON'
                });
            }
        }
    });
});

$('.pay-item').on('click', function ($e) {
    $this = $(this);

    swal({
        title: "Are you sure?",
        text: "Which payment method would you like to choose?",
        type: "info",
        showCancelButton: true,
        confirmButtonClass: "btn btn-danger",
        cancelButtonClass: "btn btn-primary",
        cancelButtonText: "<i class='fa fa-paypal'></i> Paypal",
        confirmButtonText: "<i class='fa fa-money'></i> Cash",
    }).then(function (e) {
        //cash
        if (e.value) {
            window.location.href = $this.data('cash');
        } else if (e.dismiss == 'cancel') {
            window.location.href = $this.data('paypal');
        }
    });
});

$('.pay-service').on('click', function ($e) {
    $e.preventDefault();
    swal({
        title: "Are you sure?",
        text: "Do you want to set service as paid?",
        type: "info",
        showCancelButton: true,
        confirmButtonClass: "btn btn-danger",
        cancelButtonClass: "btn btn-primary"
    }).then(function (e) {
        if (e.value) {
            var $url = $e.delegateTarget.dataset.url;
            if ($url) {
                ajax($url);
            }
        }
    });
});

$('.activate-service').on('click', function ($e) {
    $e.preventDefault();
    swal({
        title: "Are you sure?",
        text: "Do you want to activate this service?",
        type: "info",
        showCancelButton: true,
        confirmButtonClass: "btn btn-danger",
        cancelButtonClass: "btn btn-primary"
    }).then(function (e) {
        if (e.value) {
            var $url = $e.delegateTarget.dataset.url;
            if ($url) {
                ajax($url);
            }
        }
    });
});
$('.suspend-item').on('click', function ($e) {
    $e.preventDefault();
    $this = $(this);
    swal({
        title: "Are you sure?",
        text: "Do you want to suspend this service?",
        type: "info",
        showCancelButton: true,
        confirmButtonClass: "btn btn-danger",
        cancelButtonClass: "btn btn-primary"
    }).then(function (e) {
        if (e.value) {
            var $url = $e.delegateTarget.dataset.url;
            if ($url) {
                ajax($url);
                $this.hide();
                var c = $this.next('.unsuspend-item').show();
            }
        }
    });
});
$('.unsuspend-item').on('click', function ($e) {
    $e.preventDefault();
    $this = $(this);
    swal({
        title: "Are you sure?",
        text: "Do you want to suspend this service?",
        type: "info",
        showCancelButton: true,
        confirmButtonClass: "btn btn-danger",
        cancelButtonClass: "btn btn-primary"
    }).then(function (e) {
        if (e.value) {
            var $url = $e.delegateTarget.dataset.url;
            if ($url) {
                ajax($url);
                $this.hide();
                var c = $this.prev('.suspend-item').show();
            }
        }
    });
});

$('.m-messenger__form-input[name="message"]').on('keypress', function (e) {
    var $url = e.delegateTarget.dataset.url;
    var message = $(this).val();
    var $this = $(this);
    if (e.handleObj.type == 'keypress') {
        if (e.which == 13) {
            if (message && !_.isEmpty(message.trim())) {
                $.ajax({
                    type: "post",
                    url: $url,
                    data: {_token: $_token, message: message},
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    success: function ($response) {
                        if ($response.status) {
                            var messageBody = '<div class="m-messenger__wrapper">' +
                                '<div class="m-messenger__message m-messenger__message--out">' +
                                '<div class="m-messenger__message-body">' +
                                '<div class="m-messenger__message-arrow">' +
                                '</div><div class="m-messenger__message-content">' +
                                '<div class="m-messenger__message-text">'
                                + message
                                + '</div>' +
                                '</div>' +
                                '</div>' +
                                '</div>' +
                                '</div>';
                            $('.messages-container').append(messageBody);
                            $this.val('');
                        }

                    },
                    dataType: 'JSON'
                });
            }
        }
    }
});

$('.m-messenger__form-input[name="comment"]').on('keypress', function (e) {
    var $url = e.delegateTarget.dataset.url;
    var description = $(this).val();
    var $this = $(this);
    if (e.handleObj.type == 'keypress') {
        if (e.which == 13) {
            if (description && !_.isEmpty(description.trim())) {
                $.ajax({
                    type: "post",
                    url: $url,
                    data: {_token: $_token, description: description},
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    success: function ($response) {
                        if ($response.status) {
                            var username = $response.user.name;
                            var img = $response.user.image;
                            var message = $response.message;
                            var messageBody = '<div class="m-messenger__wrapper">' +
                                '<div class="m-messenger__message m-messenger__message--in"  style="padding: 10px;">' +
                                '<div class="m-messenger__message-pic">' +
                                '<img src="' + img + '" alt="" class="mCS_img_loaded">' +
                                '</div>' +
                                '<div class="m-messenger__message-body">' +
                                '<div class="m-messenger__message-arrow">' +
                                '</div>' +
                                '<div class="m-messenger__message-content">' +
                                '<div class="m-messenger__message-username">' + username +
                                '</div><div class="m-messenger__message-text">' + message +
                                '</div></div></div></div></div>';
                            $('.comments').append(messageBody);
                            $("body").scrollTo($("footer"), 1200);
                            $this.val('');
                        }

                    },
                    dataType: 'JSON'
                });
            }
        }
    }
});


Pusher.logToConsole = false;
var pusher = new Pusher('7a68e36f5d86a102b273', {
    cluster: 'ap2',
    encrypted: true
});
var channel = pusher.subscribe('orders.' + window.user_id);
channel.bind('notify', function (data) {
    var element = '<li><a href="' + data.link + '"><span class="time">' + data.time + '</span>' +
        '<span class="details">' +
        '<span class="label label-sm label-icon label-success">' +
        '<i class="fa fa-plus"></i>' +
        '</span>' + data.message + '</span></a></li>';
    $('.dropdown-menu-list.scroller.notifications').append(element);
    var countSelect = $('.dropdown-notification .badge.badge-default');
    count = parseInt(countSelect.text()) + 1;
    countSelect.text(count);
});
channel.bind('message', function (data) {
    var container = $('.messages-container');
    var img = data.image;
    img = img && !_.isEmpty(img) ? img : app_url + "images/users/default.png";
    var username = data.username;
    var message = data.message;
    var body = '<div class="m-messenger__wrapper">' +
        '<div class="m-messenger__message m-messenger__message--in">' +
        '<div class="m-messenger__message-pic">' +
        '<img src="' + img + '" alt="" class="mCS_img_loaded">' +
        '</div>' +
        '<div class="m-messenger__message-body">' +
        '<div class="m-messenger__message-arrow">' +
        '</div><div class="m-messenger__message-content">' +
        '<div class="m-messenger__message-username">' + username +
        '</div>' +
        '<div class="m-messenger__message-text">' + message
        + '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';
    container.append(body);
});
$.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

$.fn.enterAsTab = function (options) {
    var settings = $.extend({
        'allowSubmit': false
    }, options);
    this.find('input, select').live("keypress", {localSettings: settings}, function (event) {
        if (settings.allowSubmit) {
            var type = $(this).attr("type");
            if (type == "submit") {
                return true;
            }
        }
        if (event.keyCode == 13) {
            var inputs = $(this).parents("form").eq(0).find(":input:visible:not(disabled):not([readonly])");
            var idx = inputs.index(this);
            if (idx == inputs.length - 1) {
                idx = -1;
            } else {
                inputs[idx + 1].focus(); // handles submit buttons
            }
            try {
                inputs[idx + 1].select();
            }
            catch (err) {
                // handle objects not offering select
            }
            return false;
        }
    });
    return this;
};

function __api($form, $ajax_data) {
    var $api_object = $('input,select,textarea', $form).serializeObject();
    if ((typeof $ajax_data == "object") && ($ajax_data !== null)) {
        $api_object = $.extend($ajax_data, $api_object);
    }
    return $api_object;
}
var params = function () {
    var url = decodeURIComponent(window.location.href);
    var result = {};
    url = url.split('?');
    if (url.length > 1) {
        url = url[1].split('&');
        for (var i = 0; i < url.length; i++) {
            var param = url[i];
            param = param.split('=');
            if (param.length > 1) {
                var attr = param[0];
                var value = param[1];
                result[attr] = value;
            }
        }
    }
    return result;
};

var tableToExcel = (function () {
    var uri = 'data:application/vnd.ms-excel;base64,'
        ,
        template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><body><table style="direction: rtl">{table}</table></body></html>'
        , base64 = function (s) {
            return window.btoa(unescape(encodeURIComponent(s)))
        }
        , format = function (s, c) {
            return s.replace(/{(\w+)}/g, function (m, p) {
                return c[p];
            })
        };

    return function (table, name) {
        if (!table.nodeType) table = document.getElementById(table);
        var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML};
        window.location.href = uri + base64(format(template, ctx));
    }
})();

var __ajax = function (url, data, type, settings) {
    switch (type) {
        case 'PUT':
            data._method = 'PUT';
            break;
        case 'DELETE':
            data._method = 'DELETE';
            break;
    }

    var $dfd = $.ajax({
        url: url,
        data: data,
        type: 'post',
        dataType: 'json',
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        async: true,
        cache: false
    });

    $dfd.fail(function (data) {
        if (data.status == 401) {
            setTimeout(function () {
                window.location.href = "/login";
            }, 0);
        }
    });

    $dfd.done(function (data) {

    });
    return $dfd;
};

$.ajaxSetup({
    type: 'post',
    dataType: 'json',
    async: true,
    cache: false
});

$(document).ajaxStart(function ($e) {
    $.blockUI({
        message: '<h2><img style="width: 65px;height:auto" src="' + app_url + '/assets/global/img/loader.gif"/></h2>',
        target: '.page-content',
        animate: true,
        css: {
            top: '50%',
            background: 'none',
            border: 'none',
            zIndex: '0',
        }
    });
}).ajaxStop($.unblockUI);


$(document).on('submit', 'form.ajax-form', {}, function (e) {
    e.preventDefault();
    var $ajax_data = e.data;

    var $form = $(this);
    var $data = __api($form, $ajax_data);
    var $_method = $('input[name=_method]', $form).val();
    var $_token = $('meta[name=_token]', $form).val();

    if ($_method) {
        $data._method = $_method;
    } else $data._method = 'POST';

    if ($_token) {
        $data._token = $_token;
    } else $data._token = '';

    var $BeforeAjaxDone = $form.data('ajax-before');
    if ($BeforeAjaxDone) {
        $return_before = window[$BeforeAjaxDone]($form);
        if ($return_before == false) {
            return false;
        }
    }

    var $ajax = __ajax($form.attr('action'), $data);

    var $response = {};

    $ajax.done(function (data) {
        notify(data.status, data.msg);
        $response = data;
        $('span.help-block').text('');
        if ($response.errors) {
            $.each($response.errors, function (key, value) {
                if ($('#' + key + '-error').length > 0) {
                    $('#' + key + '-error').text(value).closest('.form-group').addClass('has-error');
                }
            });
            if ($('#form_wizard_1').length > 0) {
                $('#form_wizard_1').bootstrapWizard('show', 0);
            }
        }

        if (data.status == 'success' && $form.attr('data-reset') != 'false') $form[0].reset();
        $('.focusThis', $form).focus();
        var $whenAjaxDone = $form.data('ajax-done');
        if ($whenAjaxDone) {
            window[$whenAjaxDone]($response, $form);
        }

        if ($response.redirect_url) {
            setTimeout(function () {
                window.location.href = $response.redirect_url;
            }, 1500);
        }
        return $response;
    });
    return $response;
});


function bootstrap_alert($type, $msg) {
    if ($type == 'error') $type = 'danger'
    App.alert({
        container: '.portlet-body.form', // alerts parent container(by default placed after the page breadcrumbs)
        place: 'prepend', // append or prepent in container
        type: $type,  // alert's type
        message: $msg,  // alert's message
        close: true, // make alert closable
        reset: true, // close all previouse alerts first
        focus: true, // auto scroll to the alert after shown
    });
}
function notify($status, $msg) {
    toastr[$status]($msg);
}

$(document).ready(function () {

    /*Ajax Model Start*/
    // $.fn.modal.defaults.spinner = $.fn.modalmanager.defaults.spinner = '<div class="loading-spinner" style="width: 200px; margin-left: -100px;"><div class="progress progress-striped active"><div class="progress-bar" style="width: 100%;"></div></div></div>', $.fn.modalmanager.defaults.resize = !0, $(".dynamic .demo").click(function () {
    //     $(a).modal()
    // });

    $('.modal-click').on('click', function (e) {
        var name = e.target.id;
        var $modal = $('#' + name + '-modal');

        // create the backdrop and wait for next modal to be triggered
        $('body').modalmanager('loading');
        var el = $(this);
        setTimeout(function () {
            $modal.load(el.attr('data-url'), '', function () {
                $modal.modal();
                var button = $modal.find('button.deliver');
                if (button)
                    button.on('click', function () {
                        e.preventDefault();
                        var url = $(this).data('url');
                        $.ajax({
                            'method': 'post',
                            'url': url,
                            data: {_token: $_token},
                            headers: {
                                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                            },
                            success: function (resp) {
                                if (resp.status) {
                                    notify(resp.status, resp.msg);
                                    if (resp.status == 'success') {
                                        var newText = resp.delivered == 1 ? 'نعم' : 'لا';
                                        $('.delivered').text(newText);
                                        newText = resp.delivered == 1 ? 'استلام' : 'عدم استلام';
                                        $('.delivered-text').text(newText);
                                    }
                                }
                            }
                        });
                    });
            });
        }, 1000);
    });
    /*Ajax Model Finish*/

    /*Table Controls Start*/
    $('.view_list .item .show_controls').on('click', function () {
        var $this = $(this),
            $parents = $this.parents('.item');
        $this.toggleClass('active');
        $parents.find('.footer').slideToggle();
    });
    /*Table Controls Finish*/


    $("input[data-inputmask]").inputmask();
    window.app_url = $('#app_url').val();
    window.$_token = $('meta[name="_token"]').val();


    $('input.search_input').each(function () {
        var $this = $(this)
        var bestPictures = new Bloodhound({
            datumTokenizer: Bloodhound.tokenizers.obj.whitespace($this.attr('data-by')),
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            prefetch: '',
            remote: {
                url: '/' + $this.attr('data-controller') + '/search?' + $this.attr('data-by') + '=QUERY',
                wildcard: 'QUERY'
            }
        });
        $('.search_input').typeahead(null, {
            name: 'best-pictures',
            display: $this.attr('data-by'),
            source: bestPictures,
        });
    });


    $('.cart_item').on('click', function ($e) {
        var $url = $e.delegateTarget.dataset.url;
        if ($url) {
            $.ajax({
                type: "post",
                url: $url,
                data: {_token: $_token},
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                success: function ($response) {
                    notify($response.status, $response.msg)
                    if ($response.redirect_url) {
                        setTimeout(function () {
                            window.location.href = $response.redirect_url;
                        }, 1000);
                    }
                },
                dataType: 'JSON'
            });
        }
    });

    $('.status').bootstrapSwitch({
        onSwitchChange: function ($e, $status) {
            var $url = $e.delegateTarget.dataset.url,
                $item = $e.currentTarget.closest('.item');
            $.ajax({
                type: "PATCH",
                url: $url,
                data: {_token: $_token},
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                    "Access-Control-Allow-Methods": "PATCH"
                },
                sucess: function () {
                    $item.addClass('disabled')
                },
                dataType: 'JSON'
            });
        }
    });

    $('.form-validate').validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-block help-block-error', // default input error message class
        focusInvalid: false, // do not focus the last invalid input
        ignore: "", // validate all fields including form hidden input
        invalidHandler: function (event, validator) { //display error alert on form submit
            bootstrap_alert('danger', 'هناك بعض الأخطاء باللون الاحمر، يرجى مراجعتها.')
        },
        errorPlacement: function (error, element) {
            if (element.is(':checkbox')) {
                error.insertAfter(element.closest(".md-checkbox-list, .md-checkbox-inline, .checkbox-list, .checkbox-inline"));
            } else if (element.is(':radio')) {
                error.insertAfter(element.closest(".md-radio-list, .md-radio-inline, .radio-list,.radio-inline"));
            } else {
                error.insertAfter(element); // for other inputs, just perform default behavior
            }
        },
        highlight: function (element) { // hightlight error inputs
            $(element).closest('.form-group').addClass('has-error'); // set error class to the control group
        },
        unhighlight: function (element) { // revert the change done by hightlight
            $(element).closest('.form-group').removeClass('has-error'); // set error class to the control group
        },
        success: function (label) {
            label.closest('.form-group').removeClass('has-error'); // set success class to the control group
        }
    });


    /* Show search for if search */
    var url = decodeURIComponent(window.location.href);
    url = url.split('?');
    if (url.length > 1) {
        url = url[1].split('&');
        for (var i = 0; i < url.length; i++) {
            var param = url[i];
            param = param.split('=');
            if (param.length > 1) {
                var attr = param[0];
                var value = param[1];
                var selector = $('[name="' + attr + '"]');
                selector.val(value);
                if (selector.is('select')) {
                    selector.trigger('change.select2');
                } else if (selector.is(':checkbox')) {
                    selector.prop('checked', true);
                }
            }
        }
        $('.advanced-search').slideDown(1000);
    }
    /* Show search for if search */
});


$('#select_all').on('click', function () {
    var checked = ($(this).prop('checked'));
    var checkboxes = $('.export-check:checkbox');
    $.each(checkboxes, function () {
        $(this).prop('checked', checked);
    });

    var count = $('.export-check:checkbox:checked').length;
    if (count > 0) {
        $('.number').show();
        $('.count-number').text(count);
    } else {
        $('.number').hide();
    }
});
$('.advanced-search-btn').on('click', function (e) {
    e.preventDefault();
    $('.advanced-search').slideDown(1000);
});
$('.hide-search').on('click', function (e) {
    e.preventDefault();
    $('.advanced-search').slideUp(1000);
});
$('.search-btn').on('click', function (e) {
    e.preventDefault();
    var data = $('.search-form').serialize();
    $('.search-form').submit();
});