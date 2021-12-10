//=====================Variables===============================//
//Variable for submit button
var button = document.getElementById('button')

//Event Listeners
button.addEventListener('click', collectKey)



//==================================Functions==============================//
//Function that triggers when submit button is clicked and stores user input into global variable (variable name = key).


function collectKey() {
        key = document.getElementById("input").value
        //Check if value is empty or not. If empty, stop with console.log. If not alert user
        if (key === "") {
            alert("No input detected")
        //Check if value is correct length. If incorrect, alert user
        } else if (key.length != 72) {
            alert("length of key is invalid")
        } else
        GetAccount(key)
    }
   



////==========================================================================////

/*TO DO*/

//Check if input field is blank or not. (**resolved**)
//Alert users if the input field is blank (**resolved in a half assed manner**)
//Check if API Key is 72 characters long (**Resolved**)
//Alert users if the API key is of an incorrect length (**resolved in a half assed manner**)
//Display Name (**resolved in a half assed manner**)
//Display Characters (**resolved in a half assed manner**)
//Display Bank
//Display Material Storage
//Make character list clickable
//---Make each individual character clickable
//---when clicked display character inventory
//---After character selection is made, allow other characters to be selected
//---If other characters are selected, replace inventory with newly selected character
//If key is invalid, do not display div class "write"
//If key is invalid (401/400 response received from server), alert user



//============================////TEST SPACE///////==========================//

function GetAccount(key) {
    //Fetch account name
    fetch("https://api.guildwars2.com/v2/account?access_token=" + key)
    .then(response =>(response.json()))
    .then(function(data) {
        document.getElementById("accountName").innerHTML = data.name
    } )
    //Fetch Character list
    fetch("https://api.guildwars2.com/v2/characters?access_token=" + key)
    .then(response =>(response.json()))
    .then(function(data) {
        document.getElementById("characters").innerHTML = data
    } )
}

//Action Plan
/*
    Create function to determine if API key is valid or not.
*/