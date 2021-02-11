﻿//USEUNIT Repository

//This function will start Word application
function RunWordApplication()
{
  TestedApps.Word.Run();
}

//This function will start Word application
function RunNotepadApplication()
{
  TestedApps.notepad.Run();
}

function VerifyElementExists(strDictinary, strElementName, boolExists)
{
  var objElement = Repository.returnObject(strDictinary, strElementName);
  var boolObjectFound = false;
  
  if(objElement.WaitProperty("Exists", true, 5000))
      boolObjectFound = true;
  else
    boolObjectFound = false;
  
  if(boolExists)
  {
    if(boolObjectFound)
      Log.Checkpoint(strElementName + " element exists");
    else
      Log.Error(strElementName + " element does not exists");
  }
  else
  {
    if(boolObjectFound)
      Log.Error(strElementName + " element exists");
    else
      Log.Checkpoint(strElementName + " element does not exists");
  }
  
  return boolObjectFound;
}

function ClickElement(strDict, strElementName)
{
  if(VerifyElementExists(strDict, strElementName, true))
  {
    var myElement = Repository.returnObject(strDict, strElementName);
    
    if(myElement.WaitProperty("Enabled", true, 5000))
    {
      Log.Checkpoint("Clicking on element " + strElementName)
      myElement.Click();
    }
    else
    {
      Log.Error("Element " + strElementName + " is not clickable.")
    }
   
  }
}

function ClickObject(objectName)
{
  if(objectName.WaitProperty("Exists", true, 10000))
  {
    if(objectName.WaitProperty("Enabled", true, 5000))
    {
      Log.Checkpoint("Clicking on element " + objectName)
      objectName.Click();
    }
    else
    {
      Log.Error("Element " + objectName + " is not clickable.")
    }
  }
  else
  {
    Log.Error("Eleemnt " + objectName + " does not exist")
  }
}

function EnterTextToObject(strDictionary, objectName, strValue)
{
  var objectName = Repository.returnObject(strDictionary, objectName);
  if(objectName.WaitProperty("Exists", true, 10000))
  {
    if(objectName.WaitProperty("Enabled", true, 5000))
    {
      Log.Checkpoint("Entering '" + strValue + "' to " + objectName);
      objectName.Keys(strValue);
    }
    else
    {
      Log.Error("Element " + objectName + " is not enabled.");
    }
  }
  else
  {
    Log.Error("Eleemnt " + objectName + " does not exist");
  }
}

function testinfExcel()
{
  var Driver = DDT.ExcelDriver("C:\\test.xls", "Sheet1");
  while (!Driver.EOF())
{
  var hello = Driver.ColumnName(0);
  var world = Driver.Value(0);
  Driver.Next();
}

DDT.CloseDriver(Driver.Name); 
}

function DataDriven()
{
  Project.Variables.DataDrivenCounter = Project.TestItems.Current.Iteration;
}

function driver(stringPath, stringFileName)
{
  DDT.ExcelDriver(stringPath, stringFileName);
  DDT.CurrentDriver.DriveMethod("BaseUI.caller");  
}

function caller()
{
  var hello = Project.Variables.DataDrivenCounter;
  var Driver = DDT.ExcelDriver("C:\\test.xls", "Sheet1");
      while (!Driver.EOF())
      {
        var hello = Driver.ColumnName(0);
        var world = Driver.Value(1);
        Driver.Next();
        if(world == null){} 
        else
          objectName.Keys(world+"[Enter]");
      }

      DDT.CloseDriver(Driver.Name); 
}
