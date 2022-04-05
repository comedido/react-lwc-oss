import { LightningElement, api, track } from 'lwc';

export default class lwcPublicMethod extends LightningElement {
    @api
    getData() {
        return { isLWC: true };
    }
}
