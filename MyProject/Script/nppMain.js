//USEUNIT Repository
//USEUNIT BaseUI

//This function will start Word application
function RunNotepadApplication()
{
  TestedApps.notepadPlusPLus.Run();
}

function selectTab(strTabName)
{
  var tabList = Repository.returnObject("dict", "nppTabList");
  var numberOfTabs =  tabList.ChildCount;
  var boolTabFound = false;
 
  for(var i = 0; i < numberOfTabs; i++)
  {
    var currentTab = tabList.Child(i);
    var currentTabName = currentTab.Caption;
    
    if(aqString.Compare(currentTabName, strTabName, false) == 0)
    {
      boolTabFound = true;
      Log.Checkpoint("Selecting" + strTabName + " tab.");
      BaseUI.ClickObject(currentTab);
      break;
    }
  }
  
  if(boolTabFound == false)
  {
    Log.Error("Tab " + strTabName + " is not present.")
  }
}

function SelectChildMenuBar(srtParentName, strChildName)
{
  var MainMenuBar = Repository.returnObject("dict", "nppMainMenuBar");
  var ObjectParent = MainMenuBar.MenuItem(srtParentName);
  
  BaseUI.ClickObject(ObjectParent);
  
  var objectPopup = Aliases.notepadPlusPlus.Popup(srtParentName);
  var numberOfChildren = objectPopup.ChildCount;
  var itemFound = false;
  
  for(var i = 0; i < numberOfChildren; i++)
  {
    var currentChild = objectPopup.Child(i);
    var currentChildName = currentChild.ObjectIdentifier;
    if(aqString.Find(currentChildName, strChildName, false) != -1)
    {
      Log.Checkpoint("Selecting " + strChildName + " from " + srtParentName);
      BaseUI.ClickObject(currentChild);
      itemFound = true;
      break;
    }
  }
  
  if(itemFound == false)
    Log.Error(strChildName + " is not present under " + srtParentName);
}

 //Parameter 1: stringColumnName: define a column name from variable table
function enterTextIntoNotepadPLusPLus(stringText)
{
    EnterTextToObject("dict", "nppMainTextBox", stringText);
}

// Parameter 1: stringColumnName: define a column name from variable table
//function enterTextIntoNotepadPLusPLus(boolDataDriven, stringColumnName, stringVariableTable)
//{
//  if(boolDataDriven)
//    EnterTextToObject("dict", "nppMainTextBox", ReturnVariableValue(stringColumnName, stringVariableTable));
//  else
//    EnterTextToObject("dict", "nppMainTextBox", stringVariableTable);
//}