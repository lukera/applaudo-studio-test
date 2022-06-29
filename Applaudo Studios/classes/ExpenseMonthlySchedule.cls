public class ExpenseMonthlySchedule implements Schedulable{
    public void execute(SchedulableContext SC) {
        Database.executeBatch(new ExpenseMonthlyBatch()); 
    }
}