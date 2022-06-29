public class ExpenseWeeklySchedule implements Schedulable {
    public void execute(SchedulableContext SC) {
        Database.executeBatch(new ExpenseWeeklyBatch()); 
    }
}