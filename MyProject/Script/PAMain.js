//USEUNIT Repository
//USEUNIT BaseUI

var browser = Sys.Browser();
var polovniAutomobiliPage = "https://www.polovniautomobili.com*";

// This function will open browser
function openBrowser(strURL)
{
  Browsers.Item("chrome").Run(strURL);
}

// This function will clicl Pretraga button
function ClickPretragaButton()
{
  var page = browser.Page(polovniAutomobiliPage);
  var pretragaButton = page.FindElement(Repository.defineDictionary("polovniautomobili", "pretragaButton"));
  BaseUI.ClickObject(pretragaButton);
}

// This function will click Detaljna Pretraga button
function ClickDetaljnaPretragaButton()
{ 
  var page = browser.Page(polovniAutomobiliPage);
  var detaljnaPretragaButton = page.FindElement(Repository.defineDictionary("polovniautomobili", "detaljnaPretragaButton"));
  BaseUI.ClickObject(detaljnaPretragaButton);
}

// This function will select option from Karoserija dropdown
// Parameter 1 : strOption - Specify option that should be selected, use "," separator to select multiple options e.g. Karavan,Kupe 
function SelectKaroserija(strOptions)
{
  var page = browser.Page(polovniAutomobiliPage);
  var karoserijaDropdown = page.FindElement(Repository.defineDictionary("polovniautomobili", "karoserijaDropdown"));
  BaseUI.ClickObject(karoserijaDropdown);
  
  var prevSep = aqString.ListSeparator;
  aqString.ListSeparator = ",";
  var numberOfOptions = aqString.GetListLength(strOptions);
  
  for(var i = 0; i < numberOfOptions; i++)
  {
    var pageDetaljnaPretraga = browser.Page(polovniAutomobiliPage);
    var option = aqString.GetListItem(strOptions, i);
    var opcija = pageDetaljnaPretraga.FindElement("//label[.='"+option+"']/..//i");
    BaseUI.ClickObject(opcija);
  }
  
  BaseUI.ClickObject(karoserijaDropdown);
}

// This function will select option from Menjac dropdown
// Parameter 1 : strOption - Specify option that should be selected, use "," separator to select multiple options e.g. Poluautomatski,Automatski
function SelectMenjac(strOptions)
{
  var page = browser.Page(polovniAutomobiliPage);
  var karoserijaDropdown = page.FindElement(Repository.defineDictionary("polovniautomobili", "menjacDropdown"));
  BaseUI.ClickObject(karoserijaDropdown);
  
  var prevSep = aqString.ListSeparator;
  aqString.ListSeparator = ",";
  var numberOfOptions = aqString.GetListLength(strOptions);
  
  for(var i = 0; i < numberOfOptions; i++)
  {
    var pageDetaljnaPretraga = browser.Page(polovniAutomobiliPage);
    var option = aqString.GetListItem(strOptions, i);
    var opcija = pageDetaljnaPretraga.FindElement("//label[.='"+option+"']/..//i");
    BaseUI.ClickObject(opcija);
  }
  
  BaseUI.ClickObject(karoserijaDropdown);
}


function enterValueToCenaDo(strValue)
{
  var page = browser.Page(polovniAutomobiliPage);
  var cenaDoTextField = page.FindElement(Repository.defineDictionary("polovniautomobili", "cenaDo"));
  BaseUI.EnterTextToObject(cenaDoTextField, strValue);
}

// This function will wait until the page is loaded
function waitForPageToLoad()
{
  var page = browser.Page(polovniAutomobiliPage);
  page.Wait();
}

// This function will click next page button if it exists, it also returts bool value if button exists or not
function ClickNextPageButtonIfExists()
{
  var boolNextButtonExists = false;
  var page = browser.Page(polovniAutomobiliPage);
  var nextPageButton = page.FindElement(Repository.defineDictionary("polovniautomobili", "sledecaStranicaButton"));
  if(nextPageButton.WaitProperty("Exists", true, 5000))
  {
     BaseUI.ClickObject(nextPageButton);
     waitForPageToLoad();
     boolNextButtonExists = true;
  }
  return boolNextButtonExists;
}

// This function will open any link that contains searched value in new tab
function OpenCarInNewTab(strKola)
{
  var prevSep = aqString.ListSeparator;
  aqString.ListSeparator = ",";
  
  do
  {
    var page = browser.Page(polovniAutomobiliPage);
    var listOfLinks = page.EvaluateXPath("//a[@class='ga-title']", true);
    var numberOfLinks = listOfLinks.length;
    for(var i = 0; i < numberOfLinks ; i++)
    {
      var carLink = listOfLinks[i];
      var numberOfCarValues = aqString.GetListLength(strKola);
      
      for(var j = 0; j < numberOfCarValues; j++)
      {
        var currentSearchedValue = aqString.GetListItem(strKola, j);
        var currentLinkName = carLink.title;
        if(aqString.Find(currentLinkName, currentSearchedValue, false) != -1)
        {
          carLink.ClickM();
        }  
      }
    }
  }
  while(ClickNextPageButtonIfExists());
}

// This function will select option from Sortiraj dropdown
// Parameter 1 : strOption - Specify option that should be selected
function SelectSortiraj(strOptions)
{
  var page = browser.Page(polovniAutomobiliPage);
  var sortirajDropdown = Repository.defineDictionary("polovniautomobili", "sortirajDropdown");
  sortirajDropdown.Click();
  
  var optionList = Repository.defineDictionary("polovniautomobili", "sortirajDropdownOption");
  var numberOfOption = optionList.ChildCount;
  
  for(var i = 0; i < numberOfOption; i++)
  {
    var currentOption = optionList.child(i);
    if(aqString.Compare(strOptions, currentOption.outerText, false) == 0)
    {
      currentOption.Click();
      break;
    }
  }
  
  //sortirajDropdown.Click();
}
