import { LightningElement, wire, track } from 'lwc';

import getExpenses from '@salesforce/apex/ExpenseController.getExpenses';
import getExpensesByKey from '@salesforce/apex/ExpenseController.getExpensesByKey';

export default class ExpenseList extends LightningElement {

    @track expenses;
    error;

    columns = [
        { label: 'Name', fieldName: 'nameUrl', type: 'url',
        typeAttributes: {
            label: { 
                fieldName: 'Name' 
            }, 
            target: '_blank'
        },
        sortable: true },
        { label: 'Category', fieldName: 'Category__c', sortable: true },
        { label: 'Expense Date', fieldName: 'Expense_Date__c', type: 'date', sortable: true },
        { label: 'Amount', fieldName: 'Amount__c', type: 'currency', sortable: true },
        { label: 'Due Date', fieldName: 'Due_Date__c', type: 'date', sortable: true }
    ];

    @wire(getExpenses)
    wiredExpenses({ error, data }) {

        if (data) {
            let nameUrl;
            this.expenses = data.map(row => { 
                nameUrl = `/${row.Id}`;
                return {...row , nameUrl} 
            })
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.expenses = undefined;
            console.log('Error component expenseList method getExpenses: ', error);
        }

    }

    searchExpenses(event) {
        if(event.target.value.length > 3) 
        {
            getExpensesByKey({ key : event.target.value })
            .then((result) => {
                let nameUrl;
                this.expenses = result.map(row => { 
                    nameUrl = `/${row.Id}`;
                    return {...row , nameUrl} 
                })
            })
            .catch((error) => {
                console.log('Error component expenseList method searchExpenses: ', error);
            });
        } 
        else if (event.target.value == '') 
        {
            getExpenses()
            .then((result) => {
                let nameUrl;
                this.expenses = result.map(row => { 
                    nameUrl = `/${row.Id}`;
                    return {...row , nameUrl} 
                })
            })
            .catch((error) => {
                console.log('Error component expenseList method searchExpenses: ', error);
            });
        }
    }
}