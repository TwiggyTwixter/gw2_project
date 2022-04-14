var button = document.getElementById("submit")
const discardedPrecursors = []

//Bring precursor to full attention
button.addEventListener('click', loadAccount)

//Iterate through all child items and hide all but clicked precursor
document.getElementById("Bifrost").addEventListener('click', function(event) {
   focusOnSelectedPrecursor("Bifrost")
})
document.getElementById("Bolt").addEventListener('click', function(event) {
   focusOnSelectedPrecursor("Bolt")
})
document.getElementById("The Dreamer").addEventListener('click', function(event) {
   focusOnSelectedPrecursor("The Dreamer")
})
document.getElementById("Flameseeker").addEventListener('click', function(event) {
   focusOnSelectedPrecursor("Flameseeker")
})
document.getElementById("Frenzy").addEventListener('click', function(event) {
   focusOnSelectedPrecursor("Frenzy")
})
document.getElementById("Frostfang").addEventListener('click', function(event) {
   focusOnSelectedPrecursor("Frostfang")
})
document.getElementById("Howler").addEventListener('click', function(event) {
   focusOnSelectedPrecursor("Howler")
})
document.getElementById("Incinerator").addEventListener('click', function(event) {
   focusOnSelectedPrecursor("Incinerator")
})
document.getElementById("The Juggernaut").addEventListener('click', function(event) {
   focusOnSelectedPrecursor("The Juggernaught")
})
document.getElementById("Kudzu").addEventListener('click', function(event) {
   focusOnSelectedPrecursor("Kudzu")
})
document.getElementById("Kraitkin").addEventListener('click', function(event) {
   focusOnSelectedPrecursor("Kraitkin")
})
document.getElementById("Kamohoali").addEventListener('click', function(event) {
   focusOnSelectedPrecursor("Kamohoali")
})
document.getElementById("Meteorlogicus").addEventListener('click', function(event) {
   focusOnSelectedPrecursor("Meteorlogicus")
})
document.getElementById("The Minstrel").addEventListener('click', function(event) {
   focusOnSelectedPrecursor("The Minstrel")
})
document.getElementById("The Moot").addEventListener('click', function(event) {
   focusOnSelectedPrecursor("The Moot")
})
document.getElementById("The Predator").addEventListener('click', function(event) {
   focusOnSelectedPrecursor("The Predator")
})
document.getElementById("Quip").addEventListener('click', function(event) {
   focusOnSelectedPrecursor("Quip")
})
document.getElementById("Rodgort").addEventListener('click', function(event) {
   focusOnSelectedPrecursor("Rodgort")
})
document.getElementById("Sunrise").addEventListener('click', function(event) {
   focusOnSelectedPrecursor("Sunrise")
})
document.getElementById("Twilight").addEventListener('click', function(event) {
   focusOnSelectedPrecursor("Twilight")
})
document.getElementById("Eternity").addEventListener('click', function(event) {
   focusOnSelectedPrecursor("Eternity")
})


//Remove all precursors except for selected one
function focusOnSelectedPrecursor(pre) {
   var j = 0
   let parent = document.getElementById("Gen1")
   let items = parent.getElementsByTagName('li')
   if(pre === "Bifrost") {
      j++
   }
   try{
      while (items[j].id !== pre) {
         discardedPrecursors.push(items[j])
         var img = document.getElementById(items[j].id)
         img.parentNode.removeChild(img)
         if(items[j].id === pre) {
            j++
         }
       }
      } catch(error){
         console.log(undefined)
      }
      
   // Insert element to choose crafting or lucky precursor drop
   var div = document.createElement("div")
   var crafting = document.createElement("P")
   var drop = document.createElement("p")
   crafting.innerHTML = "Crafting"
   drop.innerHTML = "drop"
   div.appendChild(crafting)
   div.appendChild(drop)
   document.getElementById("start").appendChild(div)
}








function loadAccount() {
   key = document.getElementById("key").value
        //Check if value is empty or not. If not alert user
        if (key === "") {
            alert("No input detected")
        //Check if value is correct length. If incorrect, alert user
        } else if (key.length != 72) {
            alert("length of key is invalid")
        } else {
         loader.style.visibility="visible";
         fetchAccount().then(function(data) {
            loader.remove();
            console.log(data)
            selectLegendaryWeapon.style.visibility="visible";
         });
        }
}

async function fetchAccount() {
   var account = {
                  "bank": [], 
                  "materials": []
               }
   //Get Account Name
   await fetch("https://api.guildwars2.com/v2/account?access_token=" + key)
         .then(response => response.json())
         .then(function(data) {
            account["Account Name"] = data.name
         })
   //Get Account characters
   await fetch("https://api.guildwars2.com/v2/characters?access_token=" + key)
         .then(response => response.json())
         .then(function(data) {
            account["Characters"] = data
         })
   
   //Get Bank with icons (short bank)
   await fetch("https://api.guildwars2.com/v2/account/bank?access_token=" + key)
         .then(response => response.json())
         .then(function(data) {
            for(let i = 0; i<data.length; i++) {
               if (data[i] === null) {
                  console.log("null")
               } else {
                  fetch("https://api.guildwars2.com/v2/items/" + data[i].id)
                  .then(response => response.json())
                  .then(function(something) {
                     data[i].icon = something.icon
                     data[i].name = something.name
                  })
               }
            }
            account["bank"] = data;
         })


   //Get Material Storage
   // TO DO:
   // Need to fetch icons for materials
   await fetch("https://api.guildwars2.com/v2/account/materials?access_token=" + key)
         .then(response => response.json())
         .then(function(data) {
            account["materials"] = data
         })
         return account;
      }