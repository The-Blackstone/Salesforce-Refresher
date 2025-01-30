var DashStorage;
var ListStorage;
var RefreshRateDash;
var RefreshRateList;


//Get perfferd reset time in chrome storage for list and Dash Views

chrome.storage.sync.get(['DashRefreshRate'], function (result) {
  // console.log('Value currently is ' + result.DashRefreshRate);
  DashStorage = result.DashRefreshRate;
  // console.log("DashStorage = "+ DashStorage);
});
chrome.storage.sync.get(['ListRefreshRate'], function (result) {
    console.log('Value currently is ' + result.ListRefreshRate);
    ListStorage = result.ListRefreshRate;
    console.log("ListStorage = "+ ListStorage);

  });


//Convert the Stord variables in to mesurable time
function TimeConverter(StorageData){

  // console.log("Time Converter initiated Input =" + StorageData);

  switch (StorageData) {
    case 0:
      // console.log("Output is 24 houers");
      return 86400000; //24 Hour's
      break

    case 1:
      // console.log("Output is 5");
      return 300000; //5 Minutes
      break


    case 2:
      // console.log("Output is 10");
      return 600000; //10 Minutes
      break


    case 3:
      // console.log("Output is 15");
      return 900000; //15 Minutes
      break

    case 4:
      // console.log("Output is 20");
      return 1200000; //20 Minutes
      break

    case 5:
      // console.log("Output is 60");
      return 3600000; //60 Minutes
      break

    default:
      // console.log("Output is Not found");
      return 300000; //5 Minutes
      break
      
  }

}


// Refresh List
function listRefresh() {
  try {
    var refreshButtonList = $('[name="refreshButton"]'); //Find the button with the name "refreshButton"

    refreshButtonList.click(); //Click it
    console.log("List Refresh");
  } catch (err) {
    console.error('telarus log list reset error:' + err);
  }
}

// Refresh Dash
function dashRefresh() {
  try {
    //Look for an Iframe in the DOM
    var iframes = document.getElementsByTagName('iframe');

    //If one or more iframe is detected
    if (iframes) {
      // Go thru all of the ifremes and find the correct one
      var GetCorrectIframe;
      for (j = 0; j < iframes.length; j++) {
        if ($(iframes[j]).closest('.windowViewMode-maximized').hasClass('active')) {
          if (iframes[j] && iframes[j].title == 'dashboard') {
            //console.log('Iframe Found');
            GetCorrectIframe = iframes[j].contentWindow;
            break; //Stop when the correct one is found
          }
        }
      }

      //When the correct one is found and there is a button inside of it
      if (GetCorrectIframe != null && GetCorrectIframe.document.getElementsByTagName('button')) {
        //console.log('Buttons Found');
        var refreshButtonDash = GetCorrectIframe.document.getElementsByTagName('button'),
          i;
          //Go thru all of the buttons in the iframe and click the one that says has the index of "Refresh"
        for (i = 0; i < refreshButtonDash.length; i++) {
          if (refreshButtonDash[i].textContent == 'Refresh' || $(refreshButtonDash[i])[0].className.indexOf('refresh') > -1) {
            refreshButtonDash[i].click();
            console.log('Dash Reset');
            break;
          }
        }
      }
    }
    //If there are no I frames detected, Stop and report in the console
    else{
      console.log('No Iframes detected');
    }

    //In the case of an error, report the error in the console
  } catch (err) {
    console.error('telarus log dash reset error:' + err);
  }
}

//Set the listRefresh() and the dashRefresh() to run at a set interval depending on what is stored in the chrome storage
setInterval(dashRefresh, TimeConverter(DashStorage));
setInterval(listRefresh, TimeConverter(ListStorage));




