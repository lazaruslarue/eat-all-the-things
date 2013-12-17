var Ingredient = function(name, type, amount, measure){

	return {
		name:		name,
		type:		type,
		amount:		amount,
		measure:	measure,
		printMe:	function() {
						return(name+" "+amount+" "+measure+"\n");
					},
		myName:		function (){
						return name;
					},
		myUnit:		function (){
						return measure;
					},
		myAmount:	function (){
						return amount;
					}
	};
};



// recipe constructor

var Recipe = function(name, ingredients, instructions){
	return {
		name:				name,
		ingredients:		ingredients,
		instructions:		instructions,
		listIngredients:	function() { // list the ingredients for this recipe
								for (i = 0;i<this.ingredients.length;i++){
									console.log(this.ingredients[i]);
								}
							},
		myName:				function (){
								return name;
							}


	};
};

//inventory of the shit in your fridge. 
var inventory = [];

// list of recipes 
var recipeList = [];


// function Recipe(name, ingredients, instructions) {
// 	this.name = name; // a string
// 	this.ingredients = ingredients; // an array of Ingredient
// 	this.instructions = instructions; // an array of instruction strings
// 	this.listIngredients = function() { // list the ingredients for this recipe
// 		for (i = 0;i<this.ingredients.length;i++){
// 			console.log(this.ingredients[i]);
// 		}

// 	};
// 	this.myName = function (){
// 		return name;
// 	};
// }



// this function called when you press the "add to fridge" button. 
// it adds the ingredients from the web form to the fridge inventory. 
function addToFridge(){
	this.food = $('#fridgeInput').val();
	this.quantity = $('#fridgeAmount').val();
	this.measure = $('#fridgeMeasure').val();
	var whatIsIt = 'food';
	var calledThis = new Ingredient(this.food,whatIsIt,this.quantity,this.measure);

	inventory[inventory.length]=calledThis;
	$('#addedIngredientHere').html(calledThis.myName()+ " added to your inventory"); // test-code to print our inventory length
}

//pulled this out of "addToFridge" so that we could see the var without pressing the "Click Me" button
var list;
function listInventory(){ // list all the things in your array
	inventory.forEach(function(bang) {
	list = list + "<tr><td>" + bang.myName() + "</td><td>" + bang.myAmount()+
	"</td><td>" + bang.myUnit() + "</td></tr>";
	});
	$('#inventoryHere').html(list);
}

var recipe = '';
function listRecipe(){ // list all the things in your array
	recipeList.forEach(function(boog) {
	recipe = recipe + "<tr><td>" + boog.myName() + "</td></tr>";
	});
	$('#recipeList').html(recipe);
}


//this is the part where things get interesting. i need to compare recipes and 
// compare ingredients
function recipeIngredientCompare(){
	var recipeMatchText;
	for (i=0;i<recipeList.length;i++){ // loop over recipes 
		var testR = recipeList[i]; // this is the recipe we're checking now
		console.log(testR.myName());
		for (ii=0;ii<testR.ingredients.length;ii++){
			var needIngredient=testR.ingredients[ii];
			console.log(needIngredient.myName());
			for (j=0;j<inventory.length;j++){ // loop over inventory 
				var haveIngredient = inventory[j]; // the inventory item we're checking now
				console.log(haveIngredient);
				if (needIngredient == haveIngredient){
				recipeMatchText += "<tr><td>" + needIngredient.myName()+ " does match " + haveIngredient.myName() + "</tr></td>";
				} else {console.log(needIngredient.myName()+ " doesn't match " + haveIngredient.myName());}
			}
		}
	}
	$('#recipeMatches').html(recipeMatchText);
}


// 
// testing code
//

// shit in yo fridge
var fridgeApple = new Ingredient('apple', 'food', 5, 'kg');
var fridgeOrange = new Ingredient('oranges','food',2,'kg');
var fridgeFlour = new Ingredient('flour', 'food', 5, 'kg');
var fridgeCinnamon = new Ingredient('cinnamon','food',1,'g');

inventory = [fridgeApple,fridgeOrange,fridgeFlour,fridgeCinnamon];

// shit you need to make complicated shit
var recipeApple = new Ingredient('apple','food',1,'kg');
var recipeCinnamon = fridgeCinnamon;
recipeCinnamon.amount=0.5;
var recipeFlour = fridgeFlour;
recipeFlour.amount = 0.25;
var recipeOrange = fridgeOrange;
var recipeFlour = fridgeFlour;

inventory[inventory.length] = recipeApple;


// shit to make 
var applePieRecipe = new Recipe(
    'apple pie',
    [recipeApple, recipeCinnamon, recipeFlour],
    ['cook that shit up right','boil it','eat it','tell your friends']
    );

var marmaladeRecipe = new Recipe(
    'marmalade',
    [recipeOrange, recipeFlour],
    ['blend it up','boil it up','add a grip of sugar','add agar']
    );


// This shit needs to get fixed next. 

		var cranberryRelish = new Recipe(
		'cranberry relish',
		[cranberry, orange, sugar, walnut],
		['wash that shit','cut the shit','process that shit in order', 'relish that shit']
		);

// put the recipes in the list for searching
recipeList = [marmaladeRecipe, applePieRecipe];


//
// end testing stuff
//
