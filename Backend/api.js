/**
 * Created by chaika on 09.02.16.
 */
var Pizza_List = require('./data/Pizza_List');
var LIQPAY_PUBLIC_KEY = "i31263397009";
var LIQPAY_PRIVATE_KEY = "ALdsMQyEZsVveAIcPRhM8E5mWmJTdXbwNr2pKWYL";


function	base64(str)	 {
    return	new	Buffer(str).toString('base64');
}

var crypto	=	require('crypto');
function	sha1(string)	{
    var sha1	=	crypto.createHash('sha1');
    sha1.update(string);
    return	sha1.digest('base64');
}



exports.getPizzaList = function(req, res) {
    res.send(Pizza_List);
};

exports.createOrder = function(req, res) {
    var order_info = req.body;
    console.log("Creating Order", order_info);

    var pizzasInString = "";

    req.body.pizzas.forEach(function (value) {
        pizzasInString+= "Name :" + value.pizza.title + ", Size :" + value.size + ", Quantity: "+  value.quantity +"\n";
    });

    var order	=	{
        version:	3,
        public_key:	LIQPAY_PUBLIC_KEY,
        action:	"pay",
        amount:	req.body.money,
        currency:	"UAH",
        description: "Name : " + req.body.name + "\n" + " Address : " + req.body.adress + "\n" +	pizzasInString ,
        order_id:	Math.random(),
//!!!Важливо щоб було 1,	бо інакше візьме гроші!!!
        sandbox:	1
    };
    var data	=	base64(JSON.stringify(order));
    var signature	=	sha1(LIQPAY_PRIVATE_KEY	+	data	+	LIQPAY_PRIVATE_KEY);



    res.send({
        success: true,
        name:req.body.name,
        adress:req.body.adress,
        pizzas:req.body.pizzas.length,
        phone:req.body.phone,
        data:data,
        signature:signature

    });
};