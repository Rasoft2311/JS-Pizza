/**
 * Created by chaika on 25.01.16.
 */

$(function(){
    var GoogleMaps=require("./GoogleMaps");
    //This code will execute when the page is ready
    var PizzaMenu = require('./pizza/PizzaMenu');
    var PizzaCart = require('./pizza/PizzaCart');
    var API = require('./API');


    PizzaCart.initialiseCart();
    API.getPizzaList(function (err,pizzaList) {
        if(err)alert("Failed to load pizzas");
        else{
            PizzaMenu.initialiseMenu(pizzaList);
        }

    });


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


    $(".createOrder").click(function () {
        var name = $("#inputName").val();
        var phone = $("#inputPhone").val();
        var adress = $("#inputAdress").val();
        var pizzas = PizzaCart.getPizzaInCart();

        API.createOrder({name:name, phone:phone, adress:adress, pizzas:pizzas},function (err, data) {
            alert(JSON.stringify(data));
        });

    });





});