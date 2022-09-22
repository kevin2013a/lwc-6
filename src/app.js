import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from   'lightning/platformShowToastEvent';
import { createRecord } from 'lightning/uiRecordApi';
import Lead from '@salesforce/schema/Lead';
import FirstName from '@salesforce/schema/Lead.FirstName';
import LastName from '@salesforce/schema/Lead.LastName';
import Company from '@salesforce/schema/Lead.Company';
import Phone from '@salesforce/schema/Lead.Phone';

export default class NewLeadUiRecordApi extends LightningElement {
    lead = {
        FirstName: "",
        LastName: "",
        Phone: "",
        Company: ""
    };

    handleInputChange(event){
        console.log(event);
        console.log(event.target);
        let name_ = event.target.name;
        let value_ = event.target.value;

        this.lead = {...this.lead, [name_]:value_};
        console.log(this.lead);
    }

    createLead(){

        const fields = {};
        console.log('obj fields vazio');
        console.log(fields);

        fields[FirstName.fieldApiName] = this.lead.FirstName;
        fields[LastName.fieldApiName] = this.lead.LastName;
        fields[Phone.fieldApiName] = this.lead.Phone;
        fields[Company.fieldApiName] = this.lead.Company;

        console.log('obj fields montado');
        console.log(fields);
        
        const recordInput = {apiName: Lead.objectApiName, fields};
        
        console.log('recordInput Montado');
        console.log(recordInput);
        
        createRecord(recordInput).then(
            (event)=>{

                const confirm = new ShowToastEvent({
                    title:'Lead criado',
                    message: 'ID do Lead: ' + event.id,
                    variant: 'success'
                });

                this.dispatchEvent(confirm);
            }
        ).catch(
            (error)=>{
                const erro = new ShowToastEvent({
                    title:'Erro',
                    message: error.body.message, 
                    variant: 'error'
                });

                this.dispatchEvent(erro);
            }
        )
    }
}