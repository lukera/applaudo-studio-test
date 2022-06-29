@isTest
public class ExpenseServiceTest {
    
    @isTest
    static void shouldInsertExpense() {

        Test.startTest();

        String result = ExpenseService.insertExpense(createExpense());

        Test.stopTest();

        System.assertEquals('Expense Crated', result);

    }

    static Expense__c createExpense() {
        Expense__c expense = new Expense__c(
                Name = 'Test Name',
                Amount__c = 1000,
                Category__c = 'Food',
                Expense_Date__c = System.today(),
                Due_Date__c = System.today(),
                Recurrent_Base__c = 'Weekly Basis'
        );

        return expense;
    }
    
}