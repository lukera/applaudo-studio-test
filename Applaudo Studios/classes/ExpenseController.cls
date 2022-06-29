public class ExpenseController {
    
    @AuraEnabled(cacheable=true)
    public static List<Expense__c> getExpenses() {
        return [SELECT Id, Name, Amount__c, Category__c, Expense_Date__c, Recurrent_Base__c, Due_Date__c FROM Expense__c ORDER BY Name ASC];
    }

    @AuraEnabled(cacheable=true)
    public static List<Expense__c> getExpensesByKey(String key) {
        return [SELECT Id, Name, Amount__c, Category__c, Expense_Date__c, Recurrent_Base__c, Due_Date__c FROM Expense__c WHERE Name LIKE : '%' + key + '%' ORDER BY Name ASC LIMIT 200];
    }

    @AuraEnabled
    public static String createExpense(Expense__c expense){
        return ExpenseService.insertExpense(expense);
    }
    
}