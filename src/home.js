import React,{Component} from 'react'

import Filter from './filter.js'
import Map from './map.js'
import './home.css'


class Home extends Component{
    state={
        markers:[],
        showNav:false,
        isMarkerShown: true
        
    }

    //this is where markers are initially set !!!!
    componentDidMount(){   
        this.markers=[{name:'Izvor',lat:43.519942,lng:16.129902,showWindow:false,icon:"blue-dot.png"},
                      {name:'Smile',lat:43.519061,lng:16.129364,showWindow:false,icon:"blue-dot.png"},
                      {name:'Old School',lat:43.517602,lng:16.119740,showWindow:false,icon:"blue-dot.png"},
                      {name:'Beton',lat:43.507854,lng:16.120494,showWindow:false,icon:"blue-dot.png"},
                      {name:'Sprave',lat:43.510190,lng:16.122898,showWindow:false,icon:"blue-dot.png"}  
                    ]
        this.setState({markers:this.markers});
    
    }


    closeNav=()=>{
        this.setState({showNav:false})
    }

    //open on enter when focus
    handeKeyPress=(e)=>{
     if(e.key==='Enter'){
        this.setState({showNav:true})
      }
   
    }

    //close side-bar on ESC
    closeModal=(e)=>{
     e.preventDefault();
        if(e.key==='Escape'){
            this.setState({showNav:false})
        }
    }

    //handles what happens when marker is clicked on MAP/LIST
    markerClick=(marker,allMarkers)=>{
  
    this.setState({markers:this.state.markers.map((markers)=>{
        //this are the inital settings,for all markers
        markers.showWindow=false;
        markers.icon="blue-dot.png"
        
        if(markers.name===marker.name){
          markers.showWindow= !marker.showWindow;
            if(markers.showWindow===false){
                markers.icon="blue-dot.png"
            }else{
                markers.icon="";
            }
        }
  
        return markers
    })});
}

updateMarkers=(markers)=>{
    //markers are passed from filter component
    if(markers){
        this.setState({markers:this.markers.filter((marker)=>{
                
                let i=markers.length
                while(i!==0){
                    i--;
                    if(marker.name===markers[i].name){
                        
                        return marker
                    }
                }
              return null;
        })});
    
    }else{
        this.setState({markers:this.markers})
    }
}


    render(){
      
        return(
            <div className="container" onKeyUp={(e)=>this.closeModal(e)}>
              <header>
                <span className="fa fa-bars" tabIndex="1"
                      aria-label="Side Navigation"
                      onClick={()=>this.setState({showNav:true})}
                      onKeyPress={(e)=>this.handeKeyPress(e)}  
                >
                &nbsp;neighborhod weed spots
                </span>
              </header>

              <section>
                    <Filter showNav={this.state.showNav}
                            onHideNav={()=>this.closeNav}
                            markers={this.state.markers}
                            updateMarkers={this.updateMarkers}
                            listClicked={(marker,allMarkers)=>this.markerClick(marker,allMarkers)}
                    />
                
                <div id="map" role="application" tabIndex="-1">
                    <Map  isMarkerShown={this.state.isMarkerShown}
                            onMarkerClick={(marker)=>this.markerClick(marker)}
                            center={{lat:43.513233 , lng:16.119414}}
                            containerElement={<div style={{height:'80vh'}}/>}
                            mapElement={<div style={{height:'80vh'}} />}
                            markers={this.state.markers}
                    />         
                </div>

               </section>

            </div>
        )
    }


}

export default Home;
