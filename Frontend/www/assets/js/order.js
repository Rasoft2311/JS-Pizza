window.orderPage = true;

$(function(){

$(".menu").find("button").addClass("woutbut");
$(".menu").addClass("orderMenu");
$(".clearList").remove();

var $phone =$(".phone-group");
var $name = $(".name-group");

    $("#inputPhone").keyup (function () {

        var val = $(this).val();
        var re = /0\d{9}/;
        var re2 = /\+380\d{9}/
        if (!(re.test(val)||re2.test(val))) {

            $phone.addClass("has-error");
            $phone.removeClass("has-success");
            $(".phone-help-block").css("display","block");
        }
        else{
            $phone.addClass("has-success");
            $phone.removeClass("has-error");
            $(".phone-help-block").css("display","none");
        }

    });

    $("#inputName").keyup (function () {
        var val = $(this).val();
        var re = /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u;
        if (!re.test(val)) {

            $name.addClass("has-error");
            $name.removeClass("has-success");
            $(".name-help-block").css("display","block");
        }
        else{
            $name.addClass("has-success");
            $name.removeClass("has-error");
            $(".name-help-block").css("display","none");
        }

    });



    $("#inputAdress").keyup (function () {
        $(".address-group").addClass("has-success");
        $(".address-help-block").css("display","none");

    });















});