public with sharing class CSVController {

    @AuraEnabled
    public static string loadCSVData(Id contentDocumentId) {
  
      ContentVersion contentVersionObj = [SELECT Id, VersionData FROM
        ContentVersion WHERE
        ContentDocumentId =: contentDocumentId
      ];
  
      list<Account> acclist = new list<Account>();
  
      String data = contentVersionObj.VersionData.toString();
  
      string[] csvFileLines = data.split('\n');
  
      for (Integer i = 1; i < csvFileLines.size(); i++) {
  
        string[] csvRecordData = csvFileLines[i].split(',');
  
        Account accObj = new Account();
        accObj.name = csvRecordData[0];
        accObj.rating = csvRecordData[1];
        accObj.Industry = csvRecordData[2];
  
        acclist.add(accObj);
      }
      insert acclist;
  
      return string.valueOf(acclist.size());
  
    }
  }