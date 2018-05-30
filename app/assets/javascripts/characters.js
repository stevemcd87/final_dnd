// -----------------ARRAYS------------------
let Race = ["Dwarf", "Elf", "Gnome", "Half Elf", "Half Orc", "Halfling", "Human", "Orc"];
let Job = ["Barbarian", "Bard", "Cleric", "Druid", "Fighter", "Monk", "Paladin", "Ranger", "Rogue", "Sorcerer", "Warlock", "Wizard"];
let Attributes = ["STR","DEX","CON","INT","WIS","CHA"];
let column3 = ["Initiative", "Speed", "Armor Class", "Proficiency"];

$('document').ready(function(){
  let errorList = [];
  let statRoll;
  let selectedStatRoll;
  let optionsLeft;
  let rollAmount = 5;
  $('#roll-amount').html(`${rollAmount}`);

  // -------CREATE COLUMN B
  Attributes.forEach((val) => {
    $('#b-column').append(`<div class="bc-box"></div>`)
  });
  // -------CREATE COLUMN C
  Attributes.forEach((val) => {
    $('#c-column').append(`<div class="bc-box"></div>`)
  });

// ----------------CLICKING ROLL BUTTON
  $('#roll-dice').click(function(){
    $("#accept-button").prop("disabled", false);
    rollAmount -= 1;
      $('#roll-amount').html(`${rollAmount}`);
      if (rollAmount >= 0) {
        statRoll = rollForStats(6);
        $('#rolled-nums').html("");
        statRoll.forEach((val) => {
          $('#rolled-nums').append(`<li class="r-nums ">${val}</li>`);
        })
        if (rollAmount === 0){
          $("#roll-dice").prop("disabled", true);
        }
      }
  }) // End of roll dice click

// CLICKING ACCEPT ROLL BUTTON
  $('#accept-button').click(function(){
    selectedStatRoll = statRoll;
    optionsLeft = selectedStatRoll;
    $("#accept-button").append("ed");
    $("#accept-button").prop("disabled", true);
    $("#roll-dice").prop("disabled", true);
    $('#error-list').html("");
  })

// ------------CLICKING ACCEPT STATS---------
$('#accept-stats').click(()=>{
$('#error-list').html("");
  errorList.length = 0;
  if(!selectedStatRoll){
    errorList.push("Must ROLL and ACCEPT before setting Stats");
  } else if (checkForFilledStats('.char-attr').length > 0){
    let errArr = checkForFilledStats('.char-attr');
      errorList.push(`${errArr.join(', ')} are empty. All must be filled in.`);
  } else {
    optionsLeft = selectedStatRoll.slice();
    for(let i = 0; i < Attributes.length; i += 1){
      let thisID = $('.char-attr')[i].id.split('-')[1];
      let thisValue = $('.char-attr')[i].value;
      if(thisValue){
        let foundIndex = optionsLeft.findIndex((val)=> {
          return +val === +thisValue;
        });
        if (foundIndex >= 0){
          optionsLeft.splice(foundIndex, 1);
        } else {
          errorList.push(`${thisValue} is not acceptable for ${thisID}.`)
        }
      }
    }
  }
  // -- IF ERRORS--
  if (errorList.length > 0) {
    errorList.forEach((val)=> {
      $('#error-list').append(`<p class="error">${val}</p>`);
    });
    if (optionsLeft){
      $('#error-list').append(`<p class=error>Available Options are : <strong>${optionsLeft.join(' - ')}</strong></p>`);
    }
  } else { // IF NO ERRORS
    $("#accept-stats").prop("disabled", true);
    $("#accept-stats").html("Stats Accepted");
    //
    console.log(  $('.char-attr'));
    for(let i = 0; i < Attributes.length; i += 1){
      let thisID = $('.char-attr')[i].id.split('-')[1];
      let thisValue = $('.char-attr')[i].value;
      $('.char-attr')[i].readOnly = true;
      $('#roll-stats').html("");
    }

  }
  // $('#hp-button').append(`${}`)
}); // ------------END OF BUTTON to ACCEPT STATS------------
$("#char-name").blur(()=>{
  let val = $("#char-name")[0].value
  if (val ===""){

  }
  console.log(val);
});

  // ------------- CREATE THIRD COLUMN-----
  column3.forEach((val) => {
    $('#third-column').append(`<div class="box"><span class="box-header">${val}</span></div>`)
  });
// ------------COLUMN FOURTH COLUMN-------

});// ---------------END OF DOCUMNET READY-----------


// ------ DANS CODE ---------------



var char_name;
const PROFICIENCY = 2;

const usersChoices = {
  races: [
    {
      dwarf : {name:"Dwarf", str:0, dex:0, con:2, int:0, wis:0, cha:0, speed:20}
    },
    {
      elf : {name:"Elf", str:0, dex:2, con:0, int:0, wis:0, cha:0, speed:30}
    },
    {
      gnome : {name:"Gnome", str:0, dex:0, con:0, int:2, wis:0, cha:0, speed:20}
    },
    {
      halfElf : {name:"Half Elf", str:0, dex:0, con:0, int:0, wis:0, cha:2, speed:30}
    },
    {
      halfOrc : {name:"Half Orc", str:2, dex:0, con:1, int:0, wis:0, cha:0, speed:30}
    },
    {
      halfling : {name:"Halfling", str:0, dex:2, con:0, int:0, wis:0, cha:0, speed:20}
    },
    {
      human :{name:"Human", str:1, dex:1, con:1, int:1, wis:1, cha:1, speed:30}
    },
    {
      orc : {name:"Orc", str:2, dex:0, con:1, int:-2, wis:0, cha:0, speed:30}
    }
  ], // END OF RACE ARRAY
  jobs: [
    {
      barbarian :
      {
        name:"Barbarian",
        armor_class:[10,"dex_mod","con_mod"],
        health:12,
        skills:[
          "Animal Handling", "Athletics", "Intimidation", "Nature", "Perception", "Survival"
        ]
      }
    }, {
      bard :
      {
        name:"Bard",
        armor_class:[11,"dex_mod"],
        health:8,
        skills:
        [
          "Acrobatics", "Animal Handling", "Arcana", "Athletics", "Deception", "History", "Insight", "Intimidation", "Investigation", "Medicine", "Nature", "Perception", "Performace", "Persuasion", "Religion", "Sleight of Hand", "Stealth", "Survival"
        ]
      }
     }, {
       cleric :
       {
         name:"Cleric",
         armor_class:[14,"dex_mod"],
         health:8,
         skills:
         ["History", "Insight", "Medicine", "Persuasion", "Religion"]
       }
     }, {
       druid : {
         name:"Druid",
         armor_class:[11,"dex_mod"],
         health:8,
         skills:
         ["Arcana", "Animal Handling", "Insight", "Medicine", "Nature", "Perception", "Religion", "Survival"]
       }
     }, {
       fighter : {

         name:"Fighter",
         armor_class:[13,"dex_mod"],
         health:10,
         skills:["Acrobatics", "Animal Handling", "Athletics", "History", "Insight", "Intimidation", "Perception", "Survival"]}
     }, {
       monk : {
         name:"Monk",
         armor_class:[10,"dex_mod","wis_mod"],
         health:8,
         skills:["Acrobatics", "Athletics", "History", "Insight", "Religion", "Stealth"]}
     }, {
       paladin : {
         name:"Paladin",
         armor_class:[13,"dex_mod"],
         health:10,
         skills:["Athletics", "Insight", "Intimidation", "Medicine", "Persuasion", "Religion"]}
     },
     {
       ranger : {
         name:"Ranger",
         armor_class:[11,"dex_mod"],
         health:10,
         skills:["Animal Handling", "Athletics", "Insight", "Investigation", "Nature", "Perception", "Stealth", "Survival"]}
     },
     {
       rogue : {
         name:"Rogue",
         armor_class:[11,"dex_mod"],
         health:8,
         skills:["Acrobatics", "Athletics", "Deception", "Insight", "Intimidation", "Investigation", "Perception", "Persuasion", "Sleight of Hand", "Stealth"]}
     },
     {
       sorcerer : {
         name:"Sorcerer",
         armor_class:[10,"dex_mod","wis_mod"],
         health:6,
         skills:["Arcana", "Deception", "Insight", "Intimidation", "Persuasion", "Religion"]}
     },
     {
       warlock : {
         name:"Warlock",
         armor_class:[11,"dex_mod"],
         health:8,
         skills:["Arcana", "Deception", "History", "Intimidation", "Investigation", "Nature", "Religion"]}
     },
     {
       wizard : {
         name:"Wizard",
         armor_class:[10,"dex_mod"],
         health:6,
         skills:["Arcana", "History", "Insight", "Investigation", "Medicine", "Religion"]}
     }
  ] // End of jobs
};// END OF usersChoices

const skills = ["acrobatics", "animal_handling", "arcana", "athletics", "deception", "history", "insight", "intimidation", "investigation", "medicine", "nature", "perception", "performace", "persuasion", "religion", "sleight_of_hand", "stealth", "survival"];

console.log(skills);
console.log(usersChoices);

// let tot_str = input_str + RACES[race_select].str;
// let tot_dex = input_dex + RACES[race_select].dex;
// let tot_con = input_con + RACES[race_select].con;
// let tot_int = input_int + RACES[race_select].int;
// let tot_wis = input_wis + RACES[race_select].wis;
// let tot_cha = input_cha + RACES[race_select].cha;
//
// function columnB(inputValue,raceValue,stat){
//   usersChoices.races.forEach((val)=>{
//     let selectedRace;
//     if (val =)
//
//   })
//   return inputValue +
// }

// var str_mod = (Math.floor(tot_str/2)-5);
// var dex_mod = (Math.floor(tot_dex/2)-5);
// var con_mod = (Math.floor(tot_con/2)-5);
// var int_mod = (Math.floor(tot_int/2)-5);
// var wis_mod = (Math.floor(tot_wis/2)-5);
// var cha_mod = (Math.floor(tot_cha/2)-5);
//

// var tot_health = CLASSES[class_select].health + con_mod;




// -----------------FUNCTIONS----------------
function rollDice(numOfSides){
  return Math.floor(Math.random() * numOfSides) + 1
}
function rollForStats(amountOfStats){
  arr = [];
  for(let i = 0; i < amountOfStats; i += 1) {
    arr.push(rollDice(18));
  }
  return arr
}
function checkForFilledStats(selector){
  selector = $(`${selector}`);
  emptyValues= [];
  let thisLength = selector.length;
  console.log(thisLength);
  for (var i = 0; i < thisLength; i += 1) {
    if(!selector[i].value){
      emptyValues.push(selector[i].id.split('-')[1]);
    }
  }
  return emptyValues
}
