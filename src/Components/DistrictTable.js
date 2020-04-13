import React, { Component } from 'react';

class DistrictTable extends Component {
    getDistricts(){
        const{stateDistricts,selectedState} = this.props;
        let districtObj = {}
        let data = stateDistricts[selectedState];
        if(stateDistricts[selectedState]){
            districtObj = stateDistricts[selectedState].districtData
        }
        return districtObj;
    }
    renderTableHeader() {
        const headerTitle =['District','Confirmed']
        if(headerTitle.length>0){
           return headerTitle.map((key, index) => {
                 return <th key={index}>{key.toUpperCase()}</th>
           })        
        }       
    }
    getConvertedData(districtObj){
        if(Object.keys(districtObj).length > 0){
            
            var data =[];
            for(let outerKey in districtObj){
                let innerObj = districtObj[outerKey]
                if(Object.keys(innerObj).length > 0){
                    var newObj = {district:outerKey,...innerObj}
                    data.push(newObj)
                }
            }            
        }
        return data
    }
    renderTableData(districtObj){
        let mappedData = [];
        if(Object.keys(districtObj).length > 0)
            mappedData = this.getConvertedData(districtObj);

        return mappedData.map((distObj, index) => {
            const { district,confirmed,delta} = distObj   
            console.log(distObj)        
            let dailyconfirmed =''//
            if(delta.confirmed)
                dailyconfirmed = delta.confirmed!=0 ? (<span><i class="fa fa-arrow-up dailyConfirmed-arrow" aria-hidden="true"></i><span className="daily-text confirm">{delta.confirmed}</span></span>) : ('');
            return (
                <>
                <tr  key={index}>
                    <td >{district}</td>
                    <td> {dailyconfirmed}{confirmed}</td>
                    
                </tr>
                
                </>
            )
        })
        

    }
    render() {
        let  districtObj =  this.getDistricts();
        console.log('districtssssssss');
        console.log(this.props)
        return (
            <>
               <table id='district'>
                    <tbody>
                        <tr>{this.renderTableHeader()}</tr>
                        {this.renderTableData(districtObj)}
                    </tbody>
                </table>
            </>
        );
    }
}

export default DistrictTable;