class Filters {
    constructor(){
        this.filters = {}
    }

    setFilter = (key , value) =>{
        console.log(key , value);
        if(this.filters.hasOwnProperty(key) && this.filters[key].indexOf(value) === -1){
            this.filters[key] += ','+value;
        }else {
            this.filters[key] = value;
        }
    };

    getFilters = () => {
        return this.filters;
    };

    clearFilters = () => {
        this.filters = {};
    };
    isHasPriceInFilter = () =>{
        return this.filters.hasOwnProperty('min_price') || this.filters.hasOwnProperty('max_price');
    };
    setPrice = (key, value) => {
        this.filters[key] = value;
    };
}
