import React, { Component } from 'react'
import SummaryPanel from './Components/SummaryPanel';
import DistrictTable from './Components/DistrictTable';


class Table extends Component {
   constructor(props) {
      super();
      this.state = {selectedState:'',searchText:''}
   }
   componentDidMount(){

      const urls = [
         'https://api.covid19india.org/data.json',
         'https://api.covid19india.org/state_district_wise.json'
       ];
       
       // use map() to perform a fetch and handle the response for each url
       Promise.all(urls.map(url =>
         fetch(url)
         .then((response) => {
            return response.json();
         })
       ))
       .then(data => {
         let staterecords = data[0].statewise;         
         staterecords.push(staterecords.shift()); 
         this.setState((state, props) => {
            return {
               data: staterecords,
               totalSummary:staterecords[staterecords.length-1],
               stateDistricts:data[1]
            };
         });
       })
   }
   renderTableHeader() {
      const headerTitle =['State/UT','Confirmed','Active','Recovered','Death']
      if(headerTitle.length>0){
         return headerTitle.map((key, index) => {
               return <th key={index}>{key.toUpperCase()}</th>
         })        
      }       
   }
   renderTableData() {
   const{data,selectedState,searchText}=this.state
   if(data){
      var staterecords = data;     
      let handleClick =(state)=>{
         console.log(state);
         if(selectedState!=state)
            this.setState({selectedState:state})
         else
            this.setState({selectedState:''})
      }
      
      let districtTable = ''
      if(selectedState!==''){
         console.log(selectedState)
         districtTable =  <DistrictTable {...this.state}/>;

      }
      return staterecords.filter((val,index)=>val.state.toUpperCase().includes(searchText.toUpperCase())).map((stateObj, index) => {
         const { state,confirmed, active, recovered, deaths,deltaconfirmed,deltarecovered,deltadeaths} = stateObj //destructuring
         
         let dailyconfirmed = deltaconfirmed!=0 ? (<span><i class="fa fa-arrow-up dailyConfirmed-arrow" aria-hidden="true"></i><span className="daily-text confirm">{deltaconfirmed}</span></span>) : ('');
         let dailydeltarecovered = deltarecovered!=0 ? (<span><i class="fa fa-arrow-up deltarecovered-arrow" aria-hidden="true"></i><span className="daily-text recovered">{deltarecovered}</span></span>) : ('');
         let dailydeltadeaths = deltadeaths!=0 ? (<span><i class="fa fa-arrow-up deltadeaths-arrow" aria-hidden="true"></i><span className="daily-text death">{deltadeaths}</span></span>) : ('');
         
         return (
            <>
            <tr onClick={()=>handleClick(state)} key={index}>
               <td >{state}</td>
               <td> {dailyconfirmed}{confirmed}</td>
               <td>{active}</td>
               <td>{dailydeltarecovered}{recovered}</td>
               <td>{dailydeltadeaths}{deaths}</td>
            </tr>
            <tr>{state==selectedState? districtTable :''}</tr>
            </>
         )
      })
   }
   
 }

 

 render() {
   let handleChange =(event)=>{
      console.log(event.target.value);
      this.setState({searchText:event.target.value})
      
   }
    return (
       <div>
          <h1 id='headerTitle'>INDIA COVID-19 TRACKER</h1>
          <SummaryPanel {...this.state.totalSummary}/>
          <input type='text' placeholder='Search State....' id='SearchBox' onChange={handleChange}/>
          <table id='students'>
             <tbody>
                <tr>{this.renderTableHeader()}</tr>
                {this.renderTableData()}
             </tbody>
          </table>
       </div>
    )
 }
}

export default Table