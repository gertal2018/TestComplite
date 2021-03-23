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

function DataDrivenViaTableVariable(varTableVariable, intStartFromInteration)
{
  var numberOfIterations = Project.TestItems.Current.Iteration - 1;
  if(intStartFromInteration != undefined)
  {
    numberOfIterations = numberOfIterations + intStartFromInteration - 1;
  }
  var numberOfRows = varTableVariable.RowCount;
  var variableName = "dataDrivenVariableTemp";
  
  if(numberOfIterations + 1 > numberOfRows)
  {
    numberOfIterations = numberOfIterations + 1;
    Log.Error("Number of iterations: " + numberOfIterations + " is larger that rows in variable table: " + numberOfRows);
  } 
  else
  {
    var numberOfColumns = varTableVariable.ColumnCount;
  
    for(var i = 0; i < numberOfColumns; i++)
    {
      var currnetVariableValue = varTableVariable.Item(i,numberOfIterations);
      var currentVarType = aqObject.GetVarType(currnetVariableValue);
      
      switch (currentVarType)
      {
        case 0:
          currentVarType = "Empty";
          break;
        case 3:
          currentVarType = "Integer";
          break;
        case 8:
          currentVarType = "String";
          break;
        case 11:
          currentVarType = "Boolean";
          break;
        case 12:
          currentVarType = "Variant";
          break;
      }

      var currentVariableName = variableName+i;
      var boolVariableAlreadyExists = Project.Variables.VariableExists(currentVariableName);
      
      if(boolVariableAlreadyExists)
      {
        Project.Variables.RemoveVariable(currentVariableName);
        Project.Variables.AddVariable(currentVariableName, currentVarType);
        Project.Variables.$set(currentVariableName, currnetVariableValue);
      }
      else
      {
        Project.Variables.AddVariable(currentVariableName, currentVarType);
        Project.Variables.$set(currentVariableName, currnetVariableValue);
      }  
    }
  }
}

function DataDrivenViaTableExcel(stringExcelPath, stringSheetName, intStartFromInteration)
{
  var numberOfIterations = Project.TestItems.Current.Iteration - 1;
  var arrayValuesFromExcel =[];
  if(intStartFromInteration != undefined)
  {
    numberOfIterations = numberOfIterations + intStartFromInteration - 1;
  }
  
  if(aqString.StrMatches("..\\",stringExcelPath))
  {
    stringExcelPath = aqString.Replace(stringExcelPath,"..\\", ProjectSuite.Path)
  }
  
  var variableName = "dataDrivenVariableTemp";
  var Driver = DDT.ExcelDriver(stringExcelPath, stringSheetName);
  var numberOfColumns = Driver.ColumnCount;
  var currentInteration = numberOfIterations * numberOfColumns;
  while(!Driver.EOF())
  {
    for(var i = 0; i < numberOfColumns; i++)
    {
      var currnetVariableValue = Driver.Value(i);
      arrayValuesFromExcel.push(currnetVariableValue);
    }
    Driver.Next();
  }
  DDT.CloseDriver(Driver.Name);  
  
  var numberOfRows = arrayValuesFromExcel.length / numberOfColumns;
  if(numberOfIterations + 1 > numberOfRows)
  {
    numberOfIterations = numberOfIterations + 1;
    Log.Error("Number of iterations: " + numberOfIterations + " is larger that rows in variable table: " + numberOfRows);
  } 
  else
  {
    for(var i = 0; i < numberOfColumns; i++)
    {
      var currnetVariableValue = arrayValuesFromExcel[currentInteration + i];
      var currentVarType = aqObject.GetVarType(currnetVariableValue);
      
      switch (currentVarType)
      {
        case 0:
          currentVarType = "Empty";
          break;
        case 3:
          currentVarType = "Integer";
          break;
        case 8:
          currentVarType = "String";
          break;
        case 11:
          currentVarType = "Boolean";
          break;
        case 12:
          currentVarType = "Variant";
          break;
      }

      var currentVariableName = variableName+i;
      var boolVariableAlreadyExists = Project.Variables.VariableExists(currentVariableName);
      
      if(boolVariableAlreadyExists)
      {
        Project.Variables.RemoveVariable(currentVariableName);
        Project.Variables.AddVariable(currentVariableName, currentVarType);
        Project.Variables.$set(currentVariableName, currnetVariableValue);
      }
      else
      {
        Project.Variables.AddVariable(currentVariableName, currentVarType);
        Project.Variables.$set(currentVariableName, currnetVariableValue);
      }  
    }
  }
}


function cleanDataDrivenVariables()
{
  var variableName = "dataDrivenVariableTemp";
  for(var i = 0; i < 100; i++)
  {
    var currentVariableName = variableName+i;
    var boolVariableAlreadyExists = Project.Variables.VariableExists(currentVariableName);
      
    if(boolVariableAlreadyExists)
      Project.Variables.RemoveVariable(currentVariableName);
  }
}

function driver(stringPath, stringFileName)
{
  DDT.ExcelDriver(stringPath, stringFileName);
  DDT.CurrentDriver.DriveMethod("BaseUI.caller");  
}

// Parameter 1: stringColumnName: define a column name from variable table
// Parameter 2: variableTable: define a variable table
function ReturnVariableValue(stringColumnName, variableTable)
{
  var numberOfIterations = Project.Variables.DataDrivenCounter;
  var numberOfRows = variableTable.RowCount;
  if(numberOfIterations + 1 > numberOfRows)
    Log.Error("Number of iterations: " + numberOfIterations + 1 + " is larger that rows in variable table: " + numberOfRows);
  else
  {
    var numberOfColumns = variableTable.ColumnCount;
  
    for(var i = 0; i < numberOfColumns; i++)
    {
      var currentColumnName = Project.Variables.DataDriven1.ColumnName(i);
      if(aqString.Compare(stringColumnName, currentColumnName, true) == 0)
      {
        var CellValue = Project.Variables.DataDriven1.Item(i,numberOfIterations);
        return CellValue;
      }
    }
  }
}

function ReturnExcelValue(stringFilePath, stringSheetName)
{
  var hello = Project.Variables.DataDrivenCounter;
  var Driver = DDT.ExcelDriver(stringFilePath, stringSheetName);
      while (!Driver.EOF())
      {
        var hello = Driver.ColumnName(0);
        var world = Driver.Value(Project.Variables.DataDrivenCounter);
        Driver.Next();
        if(world == null){} 
        else
          return world;
      }

      DDT.CloseDriver(Driver.Name); 
}

function testBool(myBool)
{
  if(myBool)
    Log.Checkpoint("Its True");
  else
    Log.Checkpoint("Its false");
  
}
