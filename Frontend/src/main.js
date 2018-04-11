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
        $(".whichPizzas").text("Усі піци");

    });

    $(".meat").click(function () {
        previous.removeClass("active");
        PizzaMenu.filterPizza("meat");
        previous = $(".meat");
        $(this).addClass("active");
        $(".whichPizzas").text("М'ясні піци");

    });
    $(".pineapple").click(function () {
        previous.removeClass("active");
        PizzaMenu.filterPizza("pineapple");
        previous = $(".pineapple");
        $(this).addClass("active");
        $(".whichPizzas").text("З ананасами піци");
    });

    $(".mushroom").click(function () {
        previous.removeClass("active");
        PizzaMenu.filterPizza("mushroom");
        previous = $(".mushroom");
        $(this).addClass("active");
        $(".whichPizzas").text("Грибні піци");
    });

    $(".ocean").click(function () {
        previous.removeClass("active");
        PizzaMenu.filterPizza("ocean");
        previous = $(".ocean");
        $(this).addClass("active");
        $(".whichPizzas").text("З морепродуктами піци");
    });

    $(".vega").click(function () {
        previous.removeClass("active");
        PizzaMenu.filterPizza("vega");
        previous = $(".vega");
        $(this).addClass("active");
        $(".whichPizzas").text("Вегетаріанські піци");
    });


    $(".createOrder").click(function () {
        var name = $("#inputName").val();
        var phone = $("#inputPhone").val();
        var adress = $("#inputAdress").val();
        var pizzas = PizzaCart.getPizzaInCart();
        var money =$(".sum").text();

        if (!$(".name-group").hasClass("has-success")) {
            $(".name-help-block").css("display", "block");
        }
        if (!$(".phone-group").hasClass("has-success")) {
            $(".phone-help-block").css("display", "block");
        }
        if (!($(".address-group").hasClass("has-success"))) {
            $(".address-help-block").css("display", "block");
        }

        if($(".name-group").hasClass("has-success")&&$(".phone-group").hasClass("has-success")&&$(".address-group").hasClass("has-success")) {

            API.createOrder({name: name, phone: phone, adress: adress, pizzas: pizzas, money:money}, function (err, data) {

                LiqPayCheckout.init({
                    data: data.data,
                    signature: data.signature,
                    embedTo: "#liqpay",
                    mode: "popup"	//	embed	||	popup
                }).on("liqpay.callback", function (data) {
                    console.log(data.status);
                    console.log(data);
                }).on("liqpay.ready", function (data) {
                }).on("liqpay.close", function (data) {
                });



                alert(JSON.stringify(data));

            });
        }

    });





});