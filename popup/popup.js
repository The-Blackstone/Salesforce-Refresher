var MyData = {}
currentData = {Dash: "DN", List: "LVN"};


//Add event liseners to the DOM for every chaneg to the Dash and List drop down menues
//If a change happens run the coresponding function
document.getElementById("Dash").addEventListener("change", DashChange);
document.getElementById("List").addEventListener("change", ListChange);

//After the Dash drop down list has been changed get the value and update it is the chrome storage
function DashChange(){

   var SelectedItemDash = document.getElementById("Dash").selectedIndex;

    chrome.storage.sync.set({'DashRefreshRate': SelectedItemDash}, function() {
        console.log("Done");
      }); 

}

//After the List drop down list has been changed get the value and update it is the chrome storage
function ListChange(){

    var SelectedItemList = document.getElementById("List").selectedIndex;
 
     chrome.storage.sync.set({'ListRefreshRate': SelectedItemList}, function() {
         console.log("Done");
       }); 
 }

//When a user opens the options menu set the drop down lists to what they have set
window.onload = function () {
    //Get the Stored value in chrome storage for Dash
    chrome.storage.sync.get(['DashRefreshRate'], function (result) {
        var Result = result.DashRefreshRate;
        //console.log('Value currently is ' + Result);
        //If the stored value is an allowed option
        if (Result === 0 || Result === 1 || Result === 2 || Result === 3 || Result === 4 || Result === 5) {
            //Set the drop down box to the purfured value
            document.getElementById("Dash").selectedIndex = result.DashRefreshRate;
        }
        //If it is not an allowed value
        else {
            //set the defalt to 5 minutes
            console.log("First Time Detected, Setting Refresh Rate on Dashboardes to 5 minutes");
            document.getElementById("Dash").selectedIndex = 2;
        }
    });

    //Get the Stored value in chrome storage for List
    chrome.storage.sync.get(['ListRefreshRate'], function (result) {
        var Result = result.ListRefreshRate;
        //console.log('Value currently is ' + Result);
        //If the stored value is an allowed option
        if (Result === 0 || Result === 1 || Result === 2 || Result === 3 || Result === 4 || Result === 5) {
            //Set the drop down box to the preferred value
            document.getElementById("List").selectedIndex = result.ListRefreshRate;
        }
        //If it is not an allowed value
        else {
             //set the defalt to 5 minutes
            chrome.storage.sync.set({ 'ListRefreshRate': 1 }, function () {
                console.log("First Time Detected, Setting Refresh Rate on List's to 5 minutes");
            });
            document.getElementById("List").selectedIndex = 2;
        }
    });
}