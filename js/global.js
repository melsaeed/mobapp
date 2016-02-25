/**
 * Copyright (C) Brightery 2015
 * Author Muhammad El-Saeed m.elsaeed@brightery.com
 * http://www.brightery.com
 */


loading = {
    counter: 0,
    start: function () {
        this.counter++;
        if (this.counter == 1)
            $('body').append("<div class=\"loadingBG\"></div><div class=\"loading\"><br /><i class=\"fa fa-spinner fa-spin\"></i></div>");
    },
    stop: function () {
        if (this.counter == 1) {
            $('.loadingBG').remove();
            $('.loading').remove();
            this.counter--;
        } else {
            this.counter--;
        }
    }
};
error = {
    fire: function (message) {
        if (typeof $counter === 'undefined')
            $counter = 1;
        else
            $counter++;

        $('body').append('<div id="myModal' + $counter + '" class="modal fade">'
            + '<div class="modal-dialog">'
            + '<div class="modal-content">'
            + '<div class="modal-header">'
            + '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'
            + '<h4 class="modal-title">رسالة من النظام</h4>'
            + '</div>'
            + '<div class="modal-body">'
            + ' <p>' + message + '</p>'
            + '</div>'
            + ' <div class="modal-footer">'
            + '<button type="button" class="btn btn-default" data-dismiss="modal" >إغلاف</button>'
                //+ '    <button type="button" class="btn btn-primary">Save changes</button>'
            + '  </div>'
            + ' </div>'
            + '  </div>'
            + ' </div>'
        );
        $("#myModal" + $counter).modal('show');
        return false;
    }
};
dropdowns = {
    countries: function (element, defaultValue) {
        $.ajax({
            url: api_url + 'countries',
            type: 'GET',
            dataType: 'json',
            success: function (json) {
                $.each(json.countries, function (i, value) {
                    if (value.country_id == defaultValue) {
                        $(element).append($('<option>').text(value.name).attr('value', value.country_id).attr('selected', 'selected'));
                    }
                    else {
                        $(element).append($('<option>').text(value.name).attr('value', value.country_id));
                    }
                });
            }
        });
    },
    skills: function (element, defaultValue) {
        $.ajax({
            url: api_url + 'skills',
            type: 'GET',
            dataType: 'json',
            success: function (json) {
                $.each(json.skills, function (i, value) {
                    if (value.skill_id == defaultValue) {
                        $(element).append($('<option>').text(value.name).attr('value', value.skill_id).attr('selected', 'selected'));
                    }
                    else {
                        $(element).append($('<option>').text(value.name).attr('value', value.skill_id));
                    }

                });
            }
        });
    }
};
$(document).on('hidden', '.custom-modal', function () {
    $(this).remove();
});

genders = Array();
genders['M'] = "ذكر";
genders['F'] = "أنثي";

function show_notifications() {
    $('.id-notification-list').toggle();
}
function show_mobile_menu() {
    $('.mobile-nav-ul').toggle();
}

$('.slideMenuLinks a').click(function () {
    $('.side-menu').hide('slow');
});

//window.localStorage = cordova.SecureLocalStorage;
//window.innerWidth = window.innerWidth - 1;
//window.innerWidth = window.innerWidth + 1;