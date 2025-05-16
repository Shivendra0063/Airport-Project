import LightningDatatable from 'lightning/datatable';
import customImage from './customImage.html';

export default class LogoImage extends LightningDatatable {
    static customTypes = {
        customImage: {
            template: customImage,
            typeAttributes: ['value']
        }
    };
}