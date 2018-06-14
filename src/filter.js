import React,{Component} from 'react';
import SideNav from 'react-simple-sidenav';
//import escapeRegExp from 'escape-string-regexp';
//import sortBy from 'sort-by';

import './sideNav.css'


class Filter extends Component{
   constructor(props){
         super(props)
         this.state={
               query:''

         }
   }


//this function filters this.allMarkers preventing two markers to 
//be active at same time !
filter=(marker)=>{
      this.allMarkers.forEach(markers=>{
            if(markers.name !== marker.name){
                  markers.showWindow=false;
                  markers.icon="blue-dot.png";    
            }
            return markers
      });
}   



   setQuery=(e)=>{
 
      this.setState({query:e.target.value},function(){
            
            if(this.state.query){
                  const match=new RegExp(`^${this.state.query}`,'i')
                 
                  this.activeMarkers= this.allMarkers.filter(marker=>{
                                    return match.test(marker.name)
                                    });
                  //function that updates markers on home screen
                 this.props.updateMarkers(this.activeMarkers);
           
            }else{
                   this.props.updateMarkers(false)
                  
            }
      })

         
        
      }

    

componentDidMount(props){
     
     //this sets initial markers to AllMarkers
      setTimeout(function(){
           this.allMarkers=this.props.markers 
            
      }.bind(this),0);
}




   render(){
      
     
      return(
         <SideNav showNav={this.props.showNav} onHideNav={this.props.onHideNav()}
                  navStyle={{maxWidth:"40vw",background:"#444"}}   >
            <div className="container">
               <p>Filter locations:</p>
               <input type="text" id="search" tabIndex="1"  aria-label="Filter locations: text input"
                        value={this.state.query}      
                        onChange={(e)=>this.setQuery(e)}/>



               <ul className="list" role="list">
                 {this.props.markers.map((marker,id)=>{
                       return <li key={id} tabIndex="1" role="listitem"
                              onClick={()=>{this.filter(marker);
                                          this.props.listClicked(marker,this.allMarkers);}}
                               >     
                              {marker.name}
                              </li>
                        })
                 }
               </ul>
            </div>

         </SideNav>
      )
   }
}

export default Filter
