@isTest
public class ExpenseWeeklyScheduleTest {
    
    @TestSetup
    static void makeData() {

            Expense__c expense = new Expense__c(
                    Name = 'Test Name',
                    Amount__c = 1000,
                    Category__c = 'Food',
                    Expense_Date__c = System.today(),
                    Due_Date__c = System.today(),
                    Recurrent_Base__c = 'Weekly Basis'
            );
    
            insert expense;
    }

    @isTest
    static void shouldScheduleWeekly() {

        String cronExpr = '0 0 0 15 3 ? 2030';

        Test.startTest();
        String jobId = System.schedule('myJobTestJobName', cronExpr, new ExpenseWeeklySchedule());
        Test.stopTest();

        System.assert(jobId != null);

    }

}