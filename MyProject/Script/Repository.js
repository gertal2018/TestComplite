function defineDictionary(strApplication, strKeyValue)
{
  var dict = {
  // Word name mapping
  objWord : Aliases.WINWORD.formWord, 
  key2 : "value2",
  
  // Notepad Name Mapping:
  notepadMainWindow : Aliases.notepad.wndNotepad,
  
  // Notepad ++
  nppMainWindow : Aliases.notepadPlusPlus.MainWindow,
  nppMainMenuBar : Aliases.notepadPlusPlus.MainWindow.mainMenubar,
  nppToobar : Aliases.notepadPlusPlus.MainWindow.toolbar,
  nppMainToolbar : Aliases.notepadPlusPlus.MainWindow.mainToolbar,
  nppMainTextBox : Aliases.notepadPlusPlus.MainWindow.MainTextBox,
  nppTabList : Aliases.notepadPlusPlus.MainWindow.TabList,
  }
  
  var polovniAutomobili = {
  // Word name mapping
  detaljnaPretragaButton : "//button[.='Detaljna pretraga']",
  pretragaButton : "//button[.='PRETRAGA']",
  
  // detaljna pretraga page
  karoserijaDropdown : "//span[@class='placeholder' and .=' Karoserija']",
  menjacDropdown : "//span[@class='placeholder' and .=' Menjač']",
  cenaDo : "//input[@id='price_to']",
  
  // rezultati
  sledecaStranicaButton : "//a[@title='Sledeća stranica']"
  }
  
  if(aqString.Compare(strApplication, "polovniAutomobili", false) == 0)
    return polovniAutomobili[strKeyValue];
  else if(aqString.Compare(strApplication, "dict", false) == 0)
    return dict[strKeyValue];
}

function returnObject(stringObjectName)
{
  var myObject = defineDictionary(stringObjectName);
  return myObject;
}
