function setAjaxData(object = null) {
    var data = {
        'sysLangId': MdsConfig.sysLangId,
    };
    data[MdsConfig.csrfTokenName] = $('meta[name="X-CSRF-TOKEN"]').attr('content');
    if (object != null) {
        Object.assign(data, object);
    }
    return data;
}

function setSerializedData(serializedData) {
    serializedData.push({name: 'sysLangId', value: MdsConfig.sysLangId});
    serializedData.push({name: MdsConfig.csrfTokenName, value: $('meta[name="X-CSRF-TOKEN"]').attr('content')});
    return serializedData;
}

//run email queue
$(document).ready(function () {
    $.ajax({
        type: 'POST',
        url: MdsConfig.baseURL + '/Ajax/runEmailQueue',
        data: setAjaxData({})
    });
});

function swalOptions(message) {
    return {
        text: message,
        icon: 'warning',
        buttons: true,
        buttons: [MdsConfig.textCancel, MdsConfig.textOk],
        dangerMode: true,
    };
}

//custom scrollbar
$(function () {
    $('.sidebar-scrollbar').overlayScrollbars({});
});

$('.tags-input').tagsinput({
    confirmKeys: [13, 44],
    trimValue: true,
    freeInput: true,
    allowDuplicates: false,
    tagClass: 'label-tags-input'
});


//check all checkboxes
$("#checkAll").click(function () {
    $('input:checkbox').not(this).prop('checked', this.checked);
});

//show hide delete button
$('.checkbox-table').click(function () {
    if ($(".checkbox-table").is(':checked')) {
        $(".btn-table-delete").show();
    } else {
        $(".btn-table-delete").hide();
    }
});

//get blog categories
function getBlogCategoriesByLang(val) {
    var data = {
        'lang_id': val
    };
    $.ajax({
        type: 'POST',
        url: MdsConfig.baseURL + '/Ajax/getBlogCategoriesByLang',
        data: setAjaxData(data),
        success: function (response) {
            $('#categories').children('option:not(:first)').remove();
            $("#categories").append(response);
        }
    });
}


//approve selected edited products
function approveSelectedEditedProducts(message) {
    swal(swalOptions(message)).then(function (isConfirm) {
        if (isConfirm) {
            var productIds = [];
            $("input[name='checkbox-table']:checked").each(function () {
                productIds.push(this.value);
            });
            var data = {
                'product_ids': productIds,
            };
            $.ajax({
                type: 'POST',
                url: MdsConfig.baseURL + '/Product/approveSelectedEditedProducts',
                data: setAjaxData(data),
                success: function (response) {
                    location.reload();
                }
            });
        }
    });
};

//delete selected products
function deleteSelectedProducts(message) {
    swal(swalOptions(message)).then(function (isConfirm) {
        if (isConfirm) {
            var productIds = [];
            $("input[name='checkbox-table']:checked").each(function () {
                productIds.push(this.value);
            });
            var data = {
                'product_ids': productIds,
            };
            $.ajax({
                type: 'POST',
                url: MdsConfig.baseURL + '/Product/deleteSelectedProducts',
                data: setAjaxData(data),
                success: function (response) {
                    location.reload();
                }
            });
        }
    });
};

//delete selected products permanently
function deleteSelectedProductsPermanently(message) {
    swal(swalOptions(message)).then(function (isConfirm) {
        if (isConfirm) {
            var productIds = [];
            $("input[name='checkbox-table']:checked").each(function () {
                productIds.push(this.value);
            });
            var data = {
                'product_ids': productIds,
            };
            $.ajax({
                type: 'POST',
                url: MdsConfig.baseURL + '/Product/deleteSelectedProductsPermanently',
                data: setAjaxData(data),
                success: function (response) {
                    location.reload();
                }
            });
        }
    });
};

//remove from featured
function removeFromFeatured(val) {
    var data = {
        'product_id': val,
        'is_ajax': 1
    };
    $.ajax({
        type: 'POST',
        url: MdsConfig.baseURL + '/Product/addRemoveFeaturedProduct',
        data: setAjaxData(data),
        success: function (response) {
            location.reload();
        }
    });
}

//add remove special offer
function addRemoveSpecialOffer(val) {
    var data = {
        'product_id': val
    };
    $.ajax({
        type: 'POST',
        url: MdsConfig.baseURL + '/Product/addRemoveSpecialOffer',
        data: setAjaxData(data),
        success: function (response) {
            location.reload();
        }
    });
}

//delete item
function deleteItem(url, id, message) {
    swal(swalOptions(message)).then(function (isConfirm) {
        if (isConfirm) {
            var data = {
                'id': id,
            };
            $.ajax({
                type: 'POST',
                url: MdsConfig.baseURL + '/' + url,
                data: setAjaxData(data),
                success: function (response) {
                    location.reload();
                }
            });
        }
    });
};

//perform action
function performAction(url, id, message) {
    swal(swalOptions(message)).then(function (isConfirm) {
        if (isConfirm) {
            var data = {
                'id': id,
            };
            $.ajax({
                type: 'POST',
                url: MdsConfig.baseURL + '/' + url,
                data: setAjaxData(data),
                success: function (response) {
                    location.reload();
                }
            });
        }
    });
};

//confirm user email
function confirmUserEmail(id) {
    var data = {
        'id': id,
    };
    $.ajax({
        type: 'POST',
        url: MdsConfig.baseURL + '/Membership/confirmUserEmail',
        data: setAjaxData(data),
        success: function (response) {
            location.reload();
        }
    });
};

//ban remove user ban
function banRemoveBanUser(id) {
    var data = {
        'id': id,
    };
    $.ajax({
        type: 'POST',
        url: MdsConfig.baseURL + '/Membership/banRemoveBanUser',
        data: setAjaxData(data),
        success: function (response) {
            location.reload();
        }
    });
};


//add delete user affiliate program
function addDeleteUserAffiliateProgram(id) {
    var data = {
        'id': id,
    };
    $.ajax({
        type: 'POST',
        url: MdsConfig.baseURL + '/Membership/addDeleteUserAffiliateProgram',
        data: setAjaxData(data),
        success: function (response) {
            location.reload();
        }
    });
};

//get countries by continent
function getCountriesByContinent(key, firstOption = null) {
    var data = {
        'key': key
    };
    $.ajax({
        type: 'POST',
        url: MdsConfig.baseURL + '/Ajax/getCountriesByContinent',
        data: setAjaxData(data),
        success: function (response) {
            $('#select_countries option').remove();
            if (firstOption) {
                $("#select_countries").append('<option value="0">' + firstOption + '</option>');
            }
            $("#select_countries").append(response);
        }
    });
}

//get states by country
function getStatesByCountry(val, firstOption = null) {
    var data = {
        'country_id': val
    };
    $.ajax({
        type: 'POST',
        url: MdsConfig.baseURL + '/Ajax/getStatesByCountry',
        data: setAjaxData(data),
        success: function (response) {
            $('#select_states option').remove();
            if (firstOption) {
                $("#select_states").append('<option value="0">' + firstOption + '</option>');
            }
            $("#select_states").append(response);
        }
    });
}

//activate inactivate countries
function activateInactivateCountries(action) {
    var data = {
        'action': action
    };
    $.ajax({
        type: 'POST',
        url: MdsConfig.baseURL + '/Admin/activateInactivateCountries',
        data: setAjaxData(data),
        success: function (response) {
            location.reload();
        }
    });
};

function getStates(val) {
    $('#select_states').children('option').remove();
    $('#select_cities').children('option').remove();
    $('#get_states_container').hide();
    $('#get_cities_container').hide();
    var data = {
        'country_id': val,
    };
    $.ajax({
        type: 'POST',
        url: MdsConfig.baseURL + '/Ajax/getStates',
        data: setAjaxData(data),
        success: function (response) {
            var obj = JSON.parse(response);
            if (obj.result == 1) {
                document.getElementById("select_states").innerHTML = obj.content;
                $('#get_states_container').show();
            } else {
                document.getElementById("select_states").innerHTML = '';
                $('#get_states_container').hide();
            }
        }
    });
}

function getCities(val) {
    var data = {
        'state_id': val,
    };
    $.ajax({
        type: 'POST',
        url: MdsConfig.baseURL + '/Ajax/getCities',
        data: setAjaxData(data),
        success: function (response) {
            var obj = JSON.parse(response);
            if (obj.result == 1) {
                document.getElementById("select_cities").innerHTML = obj.content;
                $('#get_cities_container').show();
            } else {
                document.getElementById("select_cities").innerHTML = '';
                $('#get_cities_container').hide();
            }
        }
    });
}

//approve product
function approveProduct(id) {
    var data = {
        'id': id,
        'isAjax': true
    };
    $.ajax({
        type: 'POST',
        url: MdsConfig.baseURL + '/Product/approveProduct',
        data: setAjaxData(data),
        success: function (response) {
            location.reload();
        }
    });
};

//restore product
function restoreProduct(id) {
    var data = {
        'id': id,
    };
    $.ajax({
        type: 'POST',
        url: MdsConfig.baseURL + '/Product/restoreProduct',
        data: setAjaxData(data),
        success: function (response) {
            location.reload();
        }
    });
}

//delete attachment
function deleteSupportAttachment(id) {
    var data = {
        'id': id,
        'ticket_type': 'admin'
    };
    $.ajax({
        type: 'POST',
        url: MdsConfig.baseURL + '/Support/deleteSupportAttachmentPost',
        data: setAjaxData(data),
        success: function (response) {
            var obj = JSON.parse(response);
            if (obj.result == 1) {
                document.getElementById("response_uploaded_files").innerHTML = obj.response;
            }
        }
    });
}

//change ticket status
function changeTicketStatus(id, status) {
    var data = {
        'id': id,
        'status': status
    };
    $.ajax({
        type: 'POST',
        url: MdsConfig.baseURL + '/SupportAdmin/changeTicketStatusPost',
        data: setAjaxData(data),
        success: function (response) {
            location.reload();
        }
    });
}

function getSubCategories(parentId, level, divContainer = 'category_select_container') {
    level = parseInt(level);
    var newLevel = level + 1;
    var data = {
        'parent_id': parentId,
        'lang_id': MdsConfig.sysLangId
    };
    $.ajax({
        type: 'POST',
        url: MdsConfig.baseURL + '/Ajax/getSubCategories',
        data: setAjaxData(data),
        success: function (response) {
            $('.subcategory-select-container').each(function () {
                if (parseInt($(this).attr('data-level')) > level) {
                    $(this).remove();
                }
            });
            var obj = JSON.parse(response);
            if (obj.result == 1 && obj.htmlContent != '') {
                var selectTag = '<div class="subcategory-select-container m-t-5" data-level="' + newLevel + '"><select class="select2 form-control subcategory-select" data-level="' + newLevel + '" name="category_id[]" onchange="getSubCategories(this.value,' + newLevel + ',\'' + divContainer + '\');">' +
                    '<option value="">' + MdsConfig.textNone + '</option>' + obj.htmlContent + '</select></div>';
                $('#' + divContainer).append(selectTag);
            }
        }
    });
}

//get filter subcategories
function getFilterSubCategories(val) {
    var data = {
        'parent_id': val
    };
    $.ajax({
        type: 'POST',
        url: MdsConfig.baseURL + '/Ajax/getSubCategories',
        data: setAjaxData(data),
        success: function (response) {
            var obj = JSON.parse(response);
            if (obj.result == 1) {
                $('#subcategories').children('option:not(:first)').remove();
                $("#subcategories").append(obj.htmlContent);
            }
        }
    });
}

//upload product image update page
$(document).on('change', '#Multifileupload', function () {
    var MultifileUpload = document.getElementById("Multifileupload");
    if (typeof (FileReader) != "undefined") {
        var MultidvPreview = document.getElementById("MultidvPreview");
        MultidvPreview.innerHTML = "";
        var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.jpg|.jpeg|.gif|.png|.bmp)$/;
        for (var i = 0; i < MultifileUpload.files.length; i++) {
            var file = MultifileUpload.files[i];
            var reader = new FileReader();
            reader.onload = function (e) {
                var img = document.createElement("IMG");
                img.height = "100";
                img.width = "100";
                img.src = e.target.result;
                img.id = "Multifileupload_image";
                MultidvPreview.appendChild(img);
                $("#Multifileupload_button").show();
            }
            reader.readAsDataURL(file);
        }
    } else {
        alert("This browser does not support HTML5 FileReader.");
    }
});

function showPreviewImage(input) {
    var name = $(input).attr('name');
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#img_preview_' + name).attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}

//delete selected reviews
function deleteSelectedReviews(message) {
    swal(swalOptions(message)).then(function (isConfirm) {
        if (isConfirm) {
            var reviewIds = [];
            $("input[name='checkbox-table']:checked").each(function () {
                reviewIds.push(this.value);
            });
            var data = {
                'review_ids': reviewIds
            };
            $.ajax({
                type: 'POST',
                url: MdsConfig.baseURL + '/Product/deleteSelectedReviews',
                data: setAjaxData(data),
                success: function (response) {
                    location.reload();
                }
            });

        }
    });
};

//approve selected comments
function approveSelectedComments() {
    var commentIds = [];
    $("input[name='checkbox-table']:checked").each(function () {
        commentIds.push(this.value);
    });
    var data = {
        'comment_ids': commentIds
    };
    $.ajax({
        type: 'POST',
        url: MdsConfig.baseURL + '/Product/approveSelectedComments',
        data: setAjaxData(data),
        success: function (response) {
            location.reload();
        }
    });
};

//delete selected comments
function deleteSelectedComments(message) {
    swal(swalOptions(message)).then(function (isConfirm) {
        if (isConfirm) {
            var commentIds = [];
            $("input[name='checkbox-table']:checked").each(function () {
                commentIds.push(this.value);
            });
            var data = {
                'comment_ids': commentIds
            };
            $.ajax({
                type: 'POST',
                url: MdsConfig.baseURL + '/Product/deleteSelectedComments',
                data: setAjaxData(data),
                success: function (response) {
                    location.reload();
                }
            });
        }
    });
};

//approve selected comments
function approveSelectedBlogComments() {
    var commentIds = [];
    $("input[name='checkbox-table']:checked").each(function () {
        commentIds.push(this.value);
    });
    var data = {
        'comment_ids': commentIds
    };
    $.ajax({
        type: 'POST',
        url: MdsConfig.baseURL + '/Blog/approveSelectedComments',
        data: setAjaxData(data),
        success: function (response) {
            location.reload();
        }
    });
};

//delete selected blog comments
function deleteSelectedBlogComments(message) {
    swal(swalOptions(message)).then(function (isConfirm) {
        if (isConfirm) {
            var commentIds = [];
            $("input[name='checkbox-table']:checked").each(function () {
                commentIds.push(this.value);
            });
            var data = {
                'comment_ids': commentIds
            };
            $.ajax({
                type: 'POST',
                url: MdsConfig.baseURL + '/Blog/deleteSelectedComments',
                data: setAjaxData(data),
                success: function (response) {
                    location.reload();
                }
            });

        }
    });
};

//delete custom field option
function deleteCustomFieldOption(message, id) {
    swal(swalOptions(message)).then(function (isConfirm) {
        if (isConfirm) {
            var data = {
                'id': id
            };
            $.ajax({
                type: 'POST',
                url: MdsConfig.baseURL + '/Category/deleteCustomFieldOption',
                data: setAjaxData(data),
                success: function (response) {
                    location.reload();
                }
            });
        }
    });
};

//delete custom field category
function deleteCategoryFromField(message, fieldId, categoryId) {
    swal(swalOptions(message)).then(function (isConfirm) {
        if (isConfirm) {
            var data = {
                'field_id': fieldId,
                'category_id': categoryId
            };
            $.ajax({
                type: 'POST',
                url: MdsConfig.baseURL + '/Category/deleteCategoryFromField',
                data: setAjaxData(data),
                success: function (response) {
                    location.reload();
                }
            });
        }
    });
};

//approve bank transfer
function approveBankTransfer(id, message) {
    swal(swalOptions(message)).then(function (isConfirm) {
        if (isConfirm) {
            var data = {
                'report_id': id,
                'option': 'approved'
            };
            $.ajax({
                type: 'POST',
                url: MdsConfig.baseURL + '/Admin/bankTransferOptionsPost',
                data: setAjaxData(data),
                success: function (response) {
                    location.reload();
                }
            });

        }
    });
};

//cancel order
function cancelOrder(id, message) {
    swal(swalOptions(message)).then(function (isConfirm) {
        if (isConfirm) {
            var data = {
                'order_id': id
            };
            $.ajax({
                type: 'POST',
                url: MdsConfig.baseURL + '/Order/cancelOrderPost',
                data: setAjaxData(data),
                success: function (response) {
                    location.reload();
                }
            });
        }
    });
};

//remove by homepage manager
function removeItemHomepageManager(categoryId, submit) {
    var data = {
        'submit': submit,
        'category_id': categoryId
    };
    $.ajax({
        type: 'POST',
        url: MdsConfig.baseURL + '/Admin/homepageManagerPost',
        data: setAjaxData(data),
        success: function (response) {
            location.reload();
        }
    });
};

//update featured category order
$(document).on("input", ".input-featured-categories-order", function () {
    var val = $(this).val();
    var categoryId = $(this).attr("data-category-id");
    var data = {
        'order': val,
        'category_id': categoryId
    };
    $.ajax({
        type: 'POST',
        url: MdsConfig.baseURL + '/Category/editFeaturedCategoriesOrderPost',
        data: setAjaxData(data)
    });
});

//update homepage category order
$(document).on("input", ".input-index-categories-order", function () {
    var val = $(this).val();
    var categoryId = $(this).attr("data-category-id");
    var data = {
        'order': val,
        'category_id': categoryId
    };
    $.ajax({
        type: 'POST',
        url: MdsConfig.baseURL + '/Category/editIndexCategoriesOrderPost',
        data: setAjaxData(data)
    });
});

//update exchange rate
$(document).on('input', '.input-exchange-rate', function () {
    var val = $(this).val();
    var currencyId = $(this).attr('data-currency-id');
    var data = {
        'exchange_rate': val,
        'currency_id': currencyId
    };
    $.ajax({
        type: 'POST',
        url: MdsConfig.baseURL + '/Admin/updateCurrencyRate',
        data: setAjaxData(data)
    });
});

//get knowledge base categories by lang
function getKnowledgeBaseCategoriesByLang(val) {
    var data = {
        'lang_id': val
    };
    $.ajax({
        type: 'POST',
        url: MdsConfig.baseURL + '/SupportAdmin/getCategoriesByLang',
        data: setAjaxData(data),
        success: function (response) {
            $('#categories').children('option').remove();
            $("#categories").append(response);
        }
    });
}

$(document).on('click', '.btn-export-data', function () {
    var dateExportForm = $(this).attr("data-export-form");
    var dateExportType = $(this).attr("data-export-type");
    var dateExportFileType = $(this).attr("data-export-file-type");

    var formAction = '';
    if ($(this).attr("data-section") && $(this).attr("data-section") == 'vn') {
        formAction = MdsConfig.baseURL + '/Dashboard/exportTableDataPost';
    } else {
        formAction = MdsConfig.baseURL + '/File/exportTableDataPost';
    }

    var form = document.getElementById(dateExportForm);
    //csrf
    var inputCsrf = document.createElement('input');
    inputCsrf.type = 'hidden';
    inputCsrf.name = MdsConfig.csrfTokenName;
    inputCsrf.value = $('meta[name="X-CSRF-TOKEN"]').attr('content');
    form.appendChild(inputCsrf);
    //language
    var inputLang = document.createElement('input');
    inputLang.type = 'hidden';
    inputLang.name = 'lang_id';
    inputLang.value = MdsConfig.sysLangId;
    form.appendChild(inputLang);
    //data export type
    var inputDateExType = document.createElement('input');
    inputDateExType.type = 'hidden';
    inputDateExType.name = 'data_export_type';
    inputDateExType.value = dateExportType;
    form.appendChild(inputDateExType);
    //data export file type
    var inputDataExFileType = document.createElement('input');
    inputDataExFileType.type = 'hidden';
    inputDataExFileType.name = 'data_export_file_type';
    inputDataExFileType.value = dateExportFileType;
    form.appendChild(inputDataExFileType);
    //back url
    var inputBackUrl = document.createElement('input');
    inputBackUrl.type = 'hidden';
    inputBackUrl.name = 'back_url';
    inputBackUrl.value = MdsConfig.backURL;
    form.appendChild(inputBackUrl);
    //submit
    var oldAction = form.action;
    var oldMethod = form.method;
    form.action = formAction;
    form.method = 'POST';
    form.submit();
    form.action = oldAction;
    form.method = oldMethod;
});

$('#selected_system_marketplace').on('ifChecked', function () {
    $('.system-currency-select').show();
});
$('#selected_system_classified_ads').on('ifChecked', function () {
    $('.system-currency-select').hide();
});

$(document).ready(function () {
    $('.magnific-image-popup').magnificPopup({type: 'image'});
});

$(document).on("input keyup paste change", ".validate_price .price-input", function () {
    var val = $(this).val();
    val = val.replace(',', '.');
    if ($.isNumeric(val) && val != 0) {
        $(this).removeClass('is-invalid');
    } else {
        $(this).addClass('is-invalid');
    }
});

$(document).ready(function () {
    $('.validate_price').submit(function (e) {
        $('.validate_price .validate-price-input').each(function () {
            var val = $(this).val();
            val = val.replace(',', '.');
            if ($.isNumeric(val) && val != 0) {
                $(this).removeClass('is-invalid');
            } else {
                e.preventDefault();
                $(this).addClass('is-invalid');
                $(this).focus();
            }
        });
    });
});

//delete category image
function deleteCategoryImage(categoryId) {
    var data = {
        'category_id': categoryId
    };
    $.ajax({
        type: 'POST',
        url: MdsConfig.baseURL + '/Category/deleteCategoryImagePost',
        data: setAjaxData(data),
        success: function (response) {
            $(".img-category").remove();
            $(".btn-delete-category-img").hide();
        }
    });
};

$(document).bind('ready ajaxComplete', function () {
    $(".select2").select2({
        placeholder: $(this).attr('data-placeholder'),
        height: 40,
        dir: MdsConfig.directionality,
        "language": {
            "noResults": function () {
                return MdsConfig.textNoResultsFound;
            }
        },
    });
});

$(document).on('input keyup paste', '.number-spinner input', function () {
    var val = $(this).val();
    val = parseInt(val);
    if (val < 1) {
        val = 1;
    }
    $(this).val(val);
});

$(document).on("input keyup paste change", ".price-input", function () {
    var val = $(this).val();
    var subst = '';
    var regex = /[^\d.]|\.(?=.*\.)/g;
    val = val.replace(regex, subst);
    $(this).val(val);
});

$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
});