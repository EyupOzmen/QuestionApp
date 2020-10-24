export default class Survey{
    HeaderLogo;
    FooterLogo;
    Questions=[];

    constructor(data){
        Object.assign(this,data);
    }
}