//USEUNIT Repository

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

function VerifyElementExists(strElementName, boolExists)
{
  var objElement = Repository.returnObject(strElementName);
  var boolObjectFound = undefined;
  
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

function ClickElement(strElementName)
{
  if(VerifyElementExists(strElementName, true))
  {
    var myElement = Repository.returnObject(strElementName);
    
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

function EnterTextToObject(objectName, strValue)
{
  if(objectName.WaitProperty("Exists", true, 10000))
  {
    if(objectName.WaitProperty("Enabled", true, 5000))
    {
      Log.Checkpoint("Entering '" + strValue + "' to " + objectName)
      objectName.Keys(strValue);
    }
    else
    {
      Log.Error("Element " + objectName + " is not enabled.")
    }
  }
  else
  {
    Log.Error("Eleemnt " + objectName + " does not exist")
  }
}
