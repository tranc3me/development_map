import React,{Component} from 'react';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps'


class Map extends Component{
   state={
      img:[]
   }


   //get all images from API
  componentDidMount=()=>{

    fetch(`https://api.unsplash.com/search/photos?page=1&query=weed`, {
      headers: {
          Authorization: 'Client-ID 398ce061894810c9433d90c6212ac0b5ed129faac0f7cd9408d4f87a95638fac'
      }
   }).catch(()=>console.log("here is fail"))
    .then(response=>response.json())
    .then((result)=>this.setState({img:[...result.results]}))
    .catch(error => alert(`Something went wrong fetching from server,
                           make sure that you have internet connection
                            and refresh the page! `,error))
  }

   makeMarkers=()=>{

    const marker=this.props.markers.map((marker,id)=>{
      return <Marker key={id} marker={marker} position={{lat:marker.lat, lng:marker.lng}}
                      onClick={()=>this.props.onMarkerClick(marker)}
                      options={{icon:`${marker.icon}`}}
              >

                {marker.showWindow && (
                <InfoWindow>
                  {this.state.img.length!==0 ? (
                  <div>
                    <p style={{color:'black',fontSize:'10px'}}>Spot name: {marker.name}</p>

                    {this.addImage()}

                  </div>): (<p style={{color:'black'}}>If no image,refresh the page</p>)}
                </InfoWindow>)
                }
              </Marker>
    })
        return marker;
    }



    addImage=()=>{
      let img= this.state.img
      let randomIndex= Math.floor(Math.random() * (img.length))
      let url= img[randomIndex].urls.thumb

      return <img src={url} alt="weed" width="100px" height="100px"/>

    }




   render(){

    return(

         <GoogleMap
            defaultZoom={15}
            defaultCenter={this.props.center}
         >
         {this.props.isMarkerShown && (

              this.makeMarkers()

         )}

         </GoogleMap>

      )
   }
}

export default withGoogleMap(Map)
