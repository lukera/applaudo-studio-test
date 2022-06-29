import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import EXPENSE_OBJECT from '@salesforce/schema/Expense__c';
import NAME_FIELD from '@salesforce/schema/Expense__c.Name';
import CATEGORY_FIELD from '@salesforce/schema/Expense__c.Category__c';
import EXPENSE_DATE_FIELD from '@salesforce/schema/Expense__c.Expense_Date__c';
import AMOUNT_FIELD from '@salesforce/schema/Expense__c.Amount__c';
import RECURRENT_BASE_FIELD from '@salesforce/schema/Expense__c.Recurrent_Base__c';
import DUE_DATE_FIELD from '@salesforce/schema/Expense__c.Due_Date__c';
import createExpense from '@salesforce/apex/ExpenseController.createExpense';

export default class ExpenseCreator extends LightningElement {

    isRecurrentAvailable = true;
    isRecurrentRequired = false;

    @track name = NAME_FIELD;
    @track category = CATEGORY_FIELD;
    @track expenseDate = EXPENSE_DATE_FIELD;
    @track amount = AMOUNT_FIELD;
    @track dueDate = DUE_DATE_FIELD;
    @track recurrentBase = RECURRENT_BASE_FIELD;

    rec = {
        Name : this.name,
        Category__c : this.category,
        Expense_Date__c : this.expenseDate,
        Amount__c : this.amount,
        Recurrent_Base__c : this.recurrentBase,
        Due_Date__c : this.dueDate
    }

    get options() {
        return [
            { label: 'Weekly Basis', value: 'Weekly Basis' },
            { label: 'Monthly Basis', value: 'Monthly Basis' }
        ];
    }

    get categories() {
        return [
            { label: 'Housing', value: 'Housing' },
            { label: 'Transportation', value: 'Transportation' },
            { label: 'Food', value: 'Food' },
            { label: 'Medical Healthcare', value: 'Medical Healthcare' },
            { label: 'Others', value: 'Others' }
        ];
    }

    handleNameChange(event) {
        this.rec.Name =  event.target.value;
    }
    
    handleCategoryChange(event) {
        this.rec.Category__c = event.target.value;
    }
    
    handleExpenseDateChange(event) {
        this.rec.Expense_Date__c = event.target.value;
    }

    handleAmountChange(event) {
        this.rec.Amount__c = event.target.value;
    }

    handleBaseChange(event) {
        this.rec.Recurrent_Base__c = event.target.value;
    }

    handleDueDateChange(event) {
        this.rec.Due_Date__c = event.target.value;
    }

    handleClick() {

        if (this.validateFields()) {

            createExpense({ expense : this.rec })
            .then(result => {

                console.log('result', result);

                this.message = result;
                this.error = undefined;

                if(this.message !== undefined) {

                    this.template.querySelector('form').reset();
                    
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Success',
                            message: 'Expense created',
                            variant: 'success',
                        }),
                    );

                }
                
                console.log(JSON.stringify(result));
                console.log("result", this.message);
            })
            .catch(error => {
                this.message = undefined;
                this.error = error;
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating record',
                        message: error.body.message,
                        variant: 'error',
                    }),
                );
                console.log("error", JSON.stringify(this.error));
            });

        } else {

            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Into',
                    message: 'Fill all fields',
                    variant: 'info',
                }),
            );

        }
        
        
    }

    validateFields() {
        
        if (!this.rec.Name.length > 0)
            return false;
        if (!this.rec.Category__c.length > 0)
            return false
        if (!this.rec.Expense_Date__c.length > 0)
            return false;
        if (!this.rec.Amount__c.length > 0)
            return false;

        if (this.isRecurrentRequired) {

            if (!this.rec.Due_Date__c.length > 0)
                return false;

            if (!this.rec.Recurrent_Base__c.length > 0)
                return false;

        } else {
            this.rec.Due_Date__c = null;
            this.rec.Recurrent_Base__c = null;
        }

        return true;

    }

    handleRecurrent(event) {
        this.isRecurrentAvailable = !event.target.checked;
        this.isRecurrentRequired = event.target.checked;
    }

    toast(title, variant){

        const toastEvent = new ShowToastEvent({
            title, 
            variant: variant
        })

        this.dispatchEvent(toastEvent);
    }

}