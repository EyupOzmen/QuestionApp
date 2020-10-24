export default class Option{
    ID;
    Order;
    Text;

    constructor(data){
        Object.assign(this,data);
    }

}

//"Options": [
    //                 {
    //                     "ID": 1,
    //                     "Order": 1,
    //                     "Text": "Fenerbahçe"
    //                 },
    //                 {
    //                     "ID": 2,
    //                     "Order": 2,
    //                     "Text": "Galatasaray"
    //                 },
    //                 {
    //                     "ID": 3,
    //                     "Order": 3,
    //                     "Text": "Beşiktaş"
    //                 },
    //                 {
    //                     "ID": 4,
    //                     "Order": 4,
    //                     "Text": "Trabzonspor"
    //                 }
