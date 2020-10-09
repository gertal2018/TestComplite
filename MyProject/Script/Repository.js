﻿function defineDictionary(strKeyValue)
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
  nppTabList : Aliases.notepadPlusPlus.MainWindow.TabList
  }
  return dict[strKeyValue];
}

function returnObject(stringObjectName)
{
  var myObject = defineDictionary(stringObjectName);
  return myObject;
}
