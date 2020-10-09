function defineDictionary(strKeyValue)
{
  var dict = {
  // Word name mapping
  objWord : Aliases.WINWORD.formWord, 
  key2 : "value2",
  
  // Notepad Name Mapping:
  notepadMainWindow : Aliases.notepad.wndNotepad
  }
  return dict[strKeyValue];
}

function returnObject(stringObjectName)
{
  var myObject = defineDictionary(stringObjectName);
  return myObject;
}
