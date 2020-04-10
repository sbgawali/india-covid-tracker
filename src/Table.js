import React, { Component } from 'react'
import SummaryPanel from './Components/SummaryPanel';

class Table extends Component {
   constructor(props) {
      super();
      this.state = {}
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
         this.setState((state, props) => {
            return {
               data: data[0].statewise,
               totalSummary:data[0].statewise[0],
               stateDistricts:data[1]
            };
         });
       })


        //fetch('https://api.covid19india.org/state_district_wise.json')
      //   fetch('https://api.covid19india.org/data.json')
      //   .then((response) => {
      //       return response.json();
      //   })
      //   .then((data) => {
      //       console.log(data);
      //       this.setState((state, props) => {
      //           return {
      //             data: data.statewise,
      //             totalSummary:data.statewise[0]
      //           };
      //       });
              
      //   });
      // try {
      //    const [response, stateDistrictWiseResponse] = await Promise.all([
      //      axios.get('https://api.covid19india.org/data.json'),
      //      axios.get('https://api.covid19india.org/state_district_wise.json'),
      //    ]);
      //    setStates(response.data.statewise);
      //    setTimeseries(response.data.cases_time_series);
      //    setLastUpdated(response.data.statewise[0].lastupdatedtime);
      //    setDeltas(response.data.key_values[0]);
      //    setStateDistrictWiseData(stateDistrictWiseResponse.data);
      //    setFetched(true);
      //    this.setState((state, props) => {
      //       return {
      //          data: data.statewise,
      //          totalSummary:data.statewise[0],
      //       };
      //    });

      //  } catch (err) {
      //    console.log(err);
      //  }

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
   if(this.state.data){
      var staterecords = this.state.data;     
      let handleClick =(state)=>{
         console.log(state);
         this.setState({selectedstate:state})
      }
      staterecords.push(staterecords.shift()); 
      return staterecords.map((student, index) => {
         const { state,confirmed, active, recovered, deaths,deltaconfirmed,deltarecovered,deltadeaths} = student //destructuring
         
         let dailyconfirmed = deltaconfirmed!=0 ? (<span><i class="fa fa-arrow-up dailyConfirmed-arrow" aria-hidden="true"></i><span className="daily-text confirm">{deltaconfirmed}</span></span>) : ('');
         let dailydeltarecovered = deltarecovered!=0 ? (<span><i class="fa fa-arrow-up deltarecovered-arrow" aria-hidden="true"></i><span className="daily-text recovered">{deltarecovered}</span></span>) : ('');
         let dailydeltadeaths = deltadeaths!=0 ? (<span><i class="fa fa-arrow-up deltadeaths-arrow" aria-hidden="true"></i><span className="daily-text death">{deltadeaths}</span></span>) : ('');
         
         return (
            <tr key={index}>
               <td onClick={()=>handleClick(state)}>{state}</td>
               <td> {dailyconfirmed}{confirmed}</td>
               <td>{active}</td>
               <td>{dailydeltarecovered}{recovered}</td>
               <td>{dailydeltadeaths}{deaths}</td>
            </tr>
         )
      })
   }
   
 }

 

 render() {
    return (
       <div>
          <h1 id='headerTitle'>INDIA COVID-19 TRACKER</h1>
          <SummaryPanel {...this.state.totalSummary}/>
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