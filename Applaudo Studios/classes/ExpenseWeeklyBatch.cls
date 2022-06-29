public class ExpenseWeeklyBatch implements Database.Batchable<sObject> {
    
    public List<Expense__c> start(Database.BatchableContext BC) {   
        return [SELECT Id, Name, Amount__c, Category__c, Expense_Date__c, Recurrent_Base__c, Due_Date__c FROM Expense__c WHERE Recurrent_Base__c = 'Weekly Basis' AND Due_Date__c >= TODAY];
    }

    public void execute(Database.BatchableContext BC, List<Expense__c> scope) {   

        List<Expense__c> expensesToInsert = new List<Expense__c>();
        String day = String.valueOf(System.today().day());
        String month = String.valueOf(System.today().month());

        for (Expense__c ex : scope) {

            Expense__c expense = new Expense__c(
                Name = ex.Name + day + '-' + month,
                Amount__c = ex.Amount__c,
                Category__c = ex.Category__c,
                Expense_Date__c = System.today()
            );

            expensesToInsert.add(expense);
        }

        if (expensesToInsert.size() > 0)
            insert expensesToInsert;

    }

    public void finish(Database.BatchableContext BC) { } 

}