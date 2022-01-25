

var ipaddr_nj='69.115.80.74';
// var ipaddr="66.102.7.8";
var ipaddr="74.125.212.139";
var lat,long,country,state,city,zip,metro,isp,radius;

const WebServiceClient = require('@maxmind/geoip2-node').WebServiceClient;

const client = new WebServiceClient('425598', 'SD1OaroLvJ3niMOQ');
 
client.city(ipaddr).then(response => {
    console.log(response)
    lat=response.location.latitude;
    long=response.location.longitude;
    country=response.country.names.en;
  
    if(response.subdivisions[0]!=null)
      state=response.subdivisions[0].names.en;
    else
      state="";
    
    if(response.city[0]!={})
      console.log("vg"+response.city[0])  
    //city=response.city.names.en;
    else
      city="";
    zip=response.postal.code;
    metro=response.location.metroCode;
    isp=response.traits.isp;
    radius=response.location.accuracyRadius;
    console.log('ip:'+ipaddr+'\n'+lat+' '+long+'\n'+country+'\n'+state+'\n'+city+'\n'+zip+'\n'+metro+'\n'+isp+'\n'+radius);
    //console.log('NJ geolocation:\n'+JSON.stringify(response));
});

