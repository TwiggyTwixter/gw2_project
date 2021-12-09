//=====================Variables===============================//
//Variable for submit button
var button = document.getElementById('button')

//Event Listener"
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
   



////==========================================================================////
//Bug in this function: If blank or invalid, GetAccount function call is made and 401 response is received. 

/*TO DO*/

//Check if input field is blank or not. (**resolved**)
//Alert users if the input field is blank (**resolved in a half assed manner**)
//Check if API Key is 72 characters long (**Resolved**)
//Alert users if the API key is of an incorrect length (**resolved in a half assed manner**)
}


//=========================================================================//
/*Function that needs action (is being tested in Test Space)
function GetAccount(key) {
    fetch("https://api.guildwars2.com/v2/account?access_token=" + key)
    .then(response =>(response.json()))
    .then(data => console.log(data))
    } )
}
*/

//============================////TEST SPACE///////==========================//

function GetAccount(key) {
    fetch("https://api.guildwars2.com/v2/account?access_token=" + key)
    .then(response =>(response.json()))
    .then(function(data) {
        document.getElementById("testToWrite").innerHTML = data.wvw_rank
    } )
}


//===========================NOTES=======================================//

//Authentication is successful with the API Key in plain text below:
//Account information is presented in browser console with the following code.

/*

fetch("https://api.guildwars2.com/v2/account?access_token=7B6B3CE1-6D31-E243-AF68-7600D0445B9D7FBF123E-1769-4CC3-8940-4F86D9495063")
.then(response =>response.json())
.then(data =>console.log(data))

*/

/* CODE TO RENDER TO THE DOCUMENT
    document.getElementById("testToWrite").innerHTML = a
*/

//Action Plan
/*
    Create function to determine if API key is valid or not.
*/