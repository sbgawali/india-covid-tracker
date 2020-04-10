import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
class SummaryPanel extends Component {
    render() {
        const {confirmed,active,recovered,deaths,deltaconfirmed,deltarecovered,deltadeaths} = this.props
        return (
            <div className="mb-2 summaryPanel">
                {/* <Button className='summaryBtn' variant="primary" size="lg">Confirmed :{confirmed} </Button> 
                <Button className='summaryBtn' variant="primary" size="lg">Active :{active} </Button> 
                <Button className='summaryBtn' variant="primary" size="lg">Recoverd: {recovered} </Button> 
                <Button className='summaryBtn' variant="primary" size="lg">Death :{deaths}</Button> <br/>  
         */}
        <div class="circle confirmed-c"><div class="circle-text"><span class='sm-txt'>confirmed</span> <br/>{confirmed}</div> <div class="tcircle confirmed-cs">+{deltaconfirmed}  </div></div>
        <div class="circle active-c"><div class="circle-text"><span class='sm-txt'>active</span> <br/>{active}</div> <div class="tcircle active-cs">{''}  &nbsp; </div></div>
        <div class="circle recovered-c"><div class="circle-text"><span class='sm-txt'>recovered</span> <br/>{recovered}</div> <div class="tcircle recovered-cs">+{deltarecovered}  </div></div>
        <div class="circle deaths-c"><div class="circle-text"><span class='sm-txt'>deaths</span> <br/>{deaths}</div> <div class="tcircle deaths-cs">+{deltadeaths}  </div></div>


                 
                   
            </div>
        );
    }
}

export default SummaryPanel;