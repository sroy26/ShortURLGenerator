const express = require('express')
const app     = express();
const validUrl = require("valid-url");
const port = 8080||process.env.port;
const dbconn=require('./shortenFunctions')
const useragent = require('express-useragent');
const dbservice=require('./dbservice');
const baseUrl = 'http://localhost:3000';
const querystring = require('querystring');
const shortid = require("shortid");


app.get('/createURL', async (req, res) => {
    var url = req.query.url;
    console.log(querystring.parse(url));
    urlCode = shortid.generate();
    console.log(urlCode)
    if(validUrl.isUri(url)){
        shortUrl = baseUrl + "/" + urlCode;
        console.log(shortUrl);
    
    }else{
        res.status(400).json("Invalid URL. Please enter a vlaid url for shortening.");
    }  

    await dbconn.f2(url,shortUrl,urlCode);
    res.send(shortUrl);
    //console.log(`Your shortened bitlink is ${response.link}`);
    
})

app.get('/fetchURL', async (req, res) => {
    var url = req.query.url;
    
    var source = req.headers['user-agent'];
    
    ua = useragent.parse("Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.2 Mobile/15E148 Safari/604.1");
    console.log(ua);
    //res.send(ua)
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
    
    if(validUrl.isUri(url)){
    }else{
        return res.status(400).json("Invalid URL. Please enter a vlaid url for shortening.");
    }  
    const query ="SELECT [long_url] FROM [dbo].[short_urls] where short_url='"+url+"';";
    try {
        var longurl = await dbservice.getView(query);
        await dbconn.f4(JSON.stringify(ua),ip);
        // console.log(longurl[0].long_url)
        
        return res.redirect(301,longurl[0].long_url);
    }catch(err){
        return res.status('500').json({success: false,message:'Oops something went wrong',data:err});
    }   
})

app.get('/getloc',async(res,req)=>{
    var ipaddr=req.query.ip;
    await client.city(ipaddr).then(response => {
        lat=response.location.latitude;
        long=response.location.longitude;
        country=response.country.names.en;
        state=response.subdivisions[0].names.en;
        if(response.city==null){
            city="";
        }
        else{
            city=response.city.names.en;
        }
        zip=response.postal.code;
        metro=response.location.metroCode;
        isp=response.traits.isp;
        radius=response.location.accuracyRadius;
        timeZone=response.location.timeZone;
        context.log('ip:'+ipaddr+'\n'+lat+' '+long+'\n'+country+'\n'+state+'\n'+city+'\n'+zip+'\n'+metro+'\n'+isp+'\n'+radius);
        insertdatabase(ipaddr,lat,long,metro,isp,radius,country,state,city,zip,timeZone);
        res.send(JSON.stringify(response));
    });



})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

