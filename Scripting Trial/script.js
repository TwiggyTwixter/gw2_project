//=====================Variables===============================//
//Variable for submit button
var button = document.getElementById('button')

//Event Listeners
button.addEventListener('click', collectKey)


//==================================Functions==============================//


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
//--Display Item Icon (**resolved**)

//Display Material Storage (**resolved**)
//--Make multiple material calls if material storage has over 200 items (**resolved**)
//--Replace Item ID with Item Name (**resolved**)

//Display Currency (**resolved**)
//--Display Currency icon (**resolved**)


//Make character list clickable
//---when clicked display character inventory
//---After character selection is made, allow other characters to be selected
//---If other characters are selected, replace inventory with newly selected character


//If key is invalid, do not display div class "write"
//If key is invalid (401/400 response received from server), alert user



//============================////TEST SPACE///////==========================//

function GetAccount(key) {
    //Fetch and display account name
    fetch("https://api.guildwars2.com/v2/account?access_token=" + key)
    .then(response =>(response.json()))
    .then(function(data) {
        document.getElementById("accountName").innerHTML = "<p>" + data.name + "</p>"
    } )
    //Fetch Character list
    fetch("https://api.guildwars2.com/v2/characters?access_token=" + key)
    .then(response =>(response.json()))
    //add character list to document
    .then(function(data) {
        for(let i =0; i<data.length; i++){
         document.getElementById("characters").innerHTML +=  "<p class='characterName'>" + data[i] + "</p>"
        }
    } )


    //Fetch Bank items
    /*TO DO 
        Clean up and make more readable
    */
    fetch("https://api.guildwars2.com/v2/account/bank?access_token=" + key)
    .then(response =>(response.json()))
    .then(function(data) {
        const bankIds = []
        for(let i = 0; i< data.length; i++) {
            if(data[i] == null || undefined) {
                console.log("empty bank slot")
            } else {
                bankIds.push(data[i].id)
            }
        }
        //Iterate through results and display them on document
        getItems(bankIds).then(function(results) {
            for(let i = 0; i<results.length;i++) {
                document.getElementById("bank").innerHTML += "<div class='tooltip'><img class='icon' src=" + results[i].icon + "><span class='tooltiptext'>" + results[i].name + "</span></div>"
            }
        })
    } )


    //Fetch Material items
    fetch("https://api.guildwars2.com/v2/account/materials?access_token=" + key)
    .then(response => response.json())
    .then(function(data) {
        
        //psuedo code I found on the stackoverflow. It works and does what i need.
        //TO DO
        //--clean up  the code to make it more readable
        var chunk = 200
        console.log("data length: " + data.length)
        for(let i=0; i <data.length; i += chunk) {
            const anothertemp = [];
           let temporary = [];
           temporary = data.slice(i, i + chunk)
            
            for(let i = 0; i <temporary.length; i++) {
                if(temporary[i] == null || undefined) {
                    console.log("empty bank slot")
                } else {
                    anothertemp.push(temporary[i].id)
                }
            }
            getItems(anothertemp).then(function(results) {
                for(let i=0; i<results.length; i++) {
                    document.getElementById('materialStorage').innerHTML += "<div class='tooltip'><img class='icon' src=" + results[i].icon +"><span class='tooltiptext'>" + results[i].name + "</span></div>"
                }
            })
        }
    })



    //Fetch Currency
    fetch("https://api.guildwars2.com/v2/account/wallet?access_token=" + key)
    .then(response => response.json())
    .then(function(data) {
        fetchCurrencies(data).then(function(results) {
            for(let i = 0; i<results.length; i++) {
                document.getElementById("currency").innerHTML += "<p>" + results[i].name + ": " + results[i].value + "</p><img src=" + results[i].icon + ">"
            }
        })
    })
}







async function getItems(ids) {
//     /**
//      TO DO
//      Segment incoming array into no more than 200 count arrays if incoming parameter is over 200.
//      **/
var items
await fetch("https://api.guildwars2.com/v2/items?ids=" + ids)
.then(response => response.json())
.then(data => items = data)
return items
}



/** 
    TO DO
    Clean up this code. To many brackets are making it hard to read.
    And need meaningful variable names lol
**/
async function fetchCurrencies(wallet) {
    const whatIgot = []
    //Fetch all currencies
    await fetch("https://api.guildwars2.com/v2/currencies?ids=all")
    .then(response => response.json())
    .then(function(data) {
        //Compare wallet data with currency API to get the name and return name, id and value.
       wallet.filter(function(o1) {
            return data.filter(function(o2) {
                if (o1.id === o2.id) {
                    return whatIgot.push(
                        {
                            "id": o1.id,
                            "name": o2.name,
                            "value": o1.value,
                            "icon": o2.icon
                        }
                    )
                }
            })
        })
    })
    return whatIgot
}