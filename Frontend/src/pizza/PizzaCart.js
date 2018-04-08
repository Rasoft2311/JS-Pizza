/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');

//Перелік розмірів піци
var PizzaSize = {
    Big: "big_size",
    Small: "small_size"
};

//Змінна в якій зберігаються перелік піц в кошику
var Cart = [];

var $sum = $(".sum");

//HTML едемент куди будуть додаватися піци
var $cart = $(".cart");

function addToCart(pizza, size) {
    //Додавання однієї піци в кошик покупок
    var alreadyExist= false;
    Cart.forEach(function(item, i, arr) {
        if(item.pizza.id===pizza.id&&item.size===size){
            alreadyExist=true;
            item.quantity += 1;
        }

    });
    //Приклад реалізації, можна робити будь-яким іншим способом
    if(!alreadyExist) {
        Cart.push({
            pizza: pizza,
            size: size,
            quantity: 1
        });
    }

    var sum = +$sum.text()+ pizza[size].price;
        $sum.text(sum);



    //Оновити вміст кошика на сторінці
    updateCart();
}

function removeFromCart(cart_item) {
    //Видалити піцу з кошика
    for (var i = 0; i < Cart.length; i++) {
        if(Cart[i].pizza.id===cart_item.pizza.id&&Cart[i].size===cart_item.size)Cart.splice(i,1);
    }


    //Після видалення оновити відображення
    updateCart();
}

function initialiseCart() {
    Cart = JSON.parse(localStorage.getItem("nodes"));
    if(Cart===null){
        Cart=[];
    }
    var suma = 0;
    Cart.forEach(function (value) {
        suma+=value.pizza[value.size].price*value.quantity });
    $sum.text(suma);

    updateCart();
}

function getPizzaInCart() {
    //Повертає піци які зберігаються в кошику
    return Cart;
}

function updateCart() {
    //Функція викликається при зміні вмісту кошика
    //Тут можна наприклад показати оновлений кошик на екрані та зберегти вміт кошика в Local Storage

    //Очищаємо старі піци в кошику
    $cart.html("");

    //Онволення однієї піци
    function showOnePizzaInCart(cart_item) {
        var html_code = Templates.PizzaCart_OneItem(cart_item);

        var $node = $(html_code);

        $node.find(".plus").click(function(){
            var sum = +$sum.text()+ cart_item.pizza[cart_item.size].price;
            $sum.text(sum);
            //Збільшуємо кількість замовлених піц
            cart_item.quantity += 1;


            //Оновлюємо відображення
            updateCart();
        });

        $node.find(".minus").click(function(){
            var sum = +$sum.text()- cart_item.pizza[cart_item.size].price;
            $sum.text(sum);
            if(cart_item.quantity===1)removeFromCart(cart_item);
            else cart_item.quantity -= 1;



            //Оновлюємо відображення
            updateCart();
        });

        $node.find(".delete").click(function(){
            var sum = +$sum.text()- cart_item.pizza[cart_item.size].price*cart_item.quantity;
            $sum.text(sum);
            removeFromCart(cart_item);


            //Оновлюємо відображення
            updateCart();
        });

        $cart.append($node);
    }

    localStorage.clear();
    localStorage.setItem("nodes", JSON.stringify(Cart));

    Cart.forEach(showOnePizzaInCart);



}



$(".clearList").click(function () {
    Cart=[];
    $sum.text("");
    updateCart();
});

exports.removeFromCart = removeFromCart;
exports.addToCart = addToCart;

exports.getPizzaInCart = getPizzaInCart;
exports.initialiseCart = initialiseCart;

exports.PizzaSize = PizzaSize;