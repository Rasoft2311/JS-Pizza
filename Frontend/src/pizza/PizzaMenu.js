/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');
var PizzaCart = require('./PizzaCart');
var Pizza_List = null;
console.log(Pizza_List);

//HTML едемент куди будуть додаватися піци
var $pizza_list = $("#pizza_list");

function showPizzaList(list) {
    //Очищаємо старі піци в кошику
    $pizza_list.html("");

    //Онволення однієї піци
    function showOnePizza(pizza) {
        var html_code = Templates.PizzaMenu_OneItem({pizza: pizza});

        var $node = $(html_code);

        $node.find(".buy-big").click(function(){
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Big);
        });
        $node.find(".buy-small").click(function(){
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Small);
        });

        $pizza_list.append($node);
    }

    list.forEach(showOnePizza);
}

function filterPizza(filter) {
    //Масив куди потраплять піци які треба показати
    var pizza_shown = [];

    Pizza_List.forEach(function(pizza){
        //Якщо піка відповідає фільтру
        //pizza_shown.push(pizza);
        if(filter==="all"){
            pizza_shown=Pizza_List;
        }
        if(filter==="meat"){
            if(("meat" in pizza.content)||("chicken" in pizza.content))pizza_shown.push(pizza);
        }
        if(filter==="mushroom"){
            if("mushroom" in pizza.content)pizza_shown.push(pizza);
        }
        if(filter==="pineapple"){
            if("pineapple" in pizza.content)pizza_shown.push(pizza);

        }
        if(filter==="ocean"){
            if("ocean" in pizza.content)pizza_shown.push(pizza);
        }
        if(filter==="vega"){
            if(!(("meat" in pizza.content)||("chicken" in pizza.content)||("ocean" in pizza.content)))pizza_shown.push(pizza);

        }


        //TODO: зробити фільтри
    });

    //Показати відфільтровані піци
    showPizzaList(pizza_shown);
}

function initialiseMenu(pizzas) {
    Pizza_List=pizzas;
    //Показуємо усі піци
    showPizzaList(Pizza_List)
}

exports.filterPizza = filterPizza;
exports.initialiseMenu = initialiseMenu;