@isTest
public class ExpenseControllerTest {
    
    @TestSetup
    static void makeData(){
        
        Expense__c expense = createExpense();
        insert expense;

    }

    @isTest
    public static void shouldGetExpenses() {

        Test.startTest();

        List<Expense__c> exList = ExpenseController.getExpenses();

        Test.stopTest();

        System.assert(exList.size() == 1);

    }

    @isTest
    public static void shouldGetExpensesByKey() {

        Test.startTest();

        List<Expense__c> exList = ExpenseController.getExpensesByKey('Test');

        Test.stopTest();

        System.assert(exList.size() == 1);

    }

    @isTest
    public static void shouldCreateExpense() {

        Expense__c ex = createExpense();

        Test.startTest();

        String result = ExpenseController.createExpense(ex);

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