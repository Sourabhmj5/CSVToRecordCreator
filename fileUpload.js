import {
    LightningElement,
    track
} from 'lwc';
import loadCSVData from '@salesforce/apex/CSVController.loadCSVData';
import {
    ShowToastEvent
} from 'lightning/platformShowToastEvent';

export default class FileUploadExcel extends LightningElement {

    get acceptedFormats() {
        return ['.csv'];
    }

    @track contentDocumentId;
    @track recordCount;

    uploadFileHandler(event) {
        const uploadedFiles = event.detail.files;

        // to get File Name 
        console.log('file name is:-' + uploadedFiles[0].name);

        // to get document id
        console.log('document id is:-' + uploadedFiles[0].documentId);

        this.contentDocumentId = uploadedFiles[0].documentId;

        loadCSVData({
                contentDocumentId: this.contentDocumentId
            })
            .then((result) => {
                this.recordCount = result;

                const event = new ShowToastEvent({
                    title: 'Success',
                    message: this.recordCount + ' Account records inserted Successfully.',
                    variant: 'success',
                    mode: 'dismissible'
                });
                this.dispatchEvent(event);
            })
            .catch((error) => {
                this.error = error;
                const event = new ShowToastEvent({
                    title: 'Error',
                    variant: 'error',
                    message: 'Error while creating Records',
                    mode: 'dismissible'
                })
                this.dispatchEvent(event);
            })

    }

}