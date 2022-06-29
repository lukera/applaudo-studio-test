public class ExpenseService {
    
    public static String insertExpense(Expense__c expense) {

        try {
            insert expense;
            return 'Expense Crated';
        }catch(DMLException e) {
            throw new ExpenseServiceException('Fail to create Expense: ' + e.getMessage() + ' ' + e.getCause() + ' ' + e.getLineNumber());
        }

    }

    private class ExpenseServiceException extends Exception {}

}