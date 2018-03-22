/**
 * Created by chaika on 25.01.16.
 */

$(function(){
    //This code will execute when the page is ready
    var PizzaMenu = require('./pizza/PizzaMenu');
    var PizzaCart = require('./pizza/PizzaCart');
    var Pizza_List = require('./Pizza_List');

    PizzaCart.initialiseCart();
    PizzaMenu.initialiseMenu();

    var previous = $(".all");

    $(".all").click(function () {
        previous.removeClass("active");
        PizzaMenu.filterPizza("all");
        previous = $(".all");
        $(this).addClass("active");

    });

    $(".meat").click(function () {
        previous.removeClass("active");
        PizzaMenu.filterPizza("meat");
        previous = $(".meat");
        $(this).addClass("active");

    });
    $(".pineapple").click(function () {
        previous.removeClass("active");
        PizzaMenu.filterPizza("pineapple");
        previous = $(".pineapple");
        $(this).addClass("active");
    });

    $(".mushroom").click(function () {
        previous.removeClass("active");
        PizzaMenu.filterPizza("mushroom");
        previous = $(".mushroom");
        $(this).addClass("active");
    });

    $(".ocean").click(function () {
        previous.removeClass("active");
        PizzaMenu.filterPizza("ocean");
        previous = $(".ocean");
        $(this).addClass("active");
    });

    $(".vega").click(function () {
        previous.removeClass("active");
        PizzaMenu.filterPizza("vega");
        previous = $(".vega");
        $(this).addClass("active");
    });




});