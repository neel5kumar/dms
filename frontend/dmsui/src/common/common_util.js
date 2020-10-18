
export default class CommonUtil{
    static formatAmountUsing(ccy){
        return new Intl.NumberFormat('en-US', {//TODO new or 
            style: 'currency',
            currency: ccy,
          
            // These options are needed to round to whole numbers if that's what you want.
            //minimumFractionDigits: 0,
            //maximumFractionDigits: 0,
          });
    }
    
    static currentFormatterINR(){
        return CommonUtil.formatAmountUsing('INR')
    }
    static formatAmount(value,ccy){
        return CommonUtil.formatAmountUsing(ccy).format(value)
    }
    static toPercentageFormat(num){
        return Number(num/100).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:2})
    }
    static toPctFormat(num){
        return Number(num).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:2})
    }
    static toNUmberFormat(num){
        return Number(num).toLocaleString(undefined,{maximumSignificantDigits:3, minimumFractionDigits:0})
    }
    static formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }
}