const Hapi = require('hapi');
const csv = require('csv');
const fs = require('fs');
const _ = require('underscore');
const corsHeaders = require('hapi-cors-headers')

const server = new Hapi.Server();
server.connection({ port: 4000, host: 'localhost', routes: { cors: { origin: ['*'] } } });

let data = '';

server.ext('onPreResponse', corsHeaders);

server.start((err) => {

    processCSV().then(response => {
        data = response
         if (err) {
            throw err;
        }
        console.log(`Server running at: ${server.info.uri}`);
    });
    
});

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply('Hello, world!');
    }
});

server.route({
    method: 'GET',
    path: '/getInitialData',
    handler: function (request, reply) {
        reply({publishers:Object.keys(publishers),bidders:Object.keys(bidders)})
    }
});

server.route({
    method: 'GET',
    path: '/groupByPublisher/{publisher}',
    handler: function (request, reply) {
        getTotalHitRatioByBidder(request.params.publisher,res =>  reply(res));
    }
});

server.route({
    method: 'GET',
    path: '/groupByBidder/{bidder}',
    handler: function (request, reply) {
        getTotalCostByPublisher(request.params.bidder,res =>  reply(res));
    }
});


const processCSV = () => {
    return new Promise((resolve, reject) => {
        
            var parser = csv.parse({columns: true});
            var data = [];
            
            parser.on('readable', function () {
                var r;
                while (r = parser.read()) {
                    data.push(r);
                }
            });
            parser.on('error', function (err) {
                reject(err);
            });
            parser.on('finish', function () {
                resolve(data);
            });
            const input = fs.createReadStream(__dirname+'/Assignment.csv');
            input.pipe(parser);
            
        });
}


var getTotalHitRatioByBidder = (publisher,cb) => {
    
    const publishers = _.groupBy(data,'Publisher');
    let publisherKeys = Object.keys(publishers);

    const countryPublishers = {};    
    
    _.each(publisherKeys, key => {
        countryPublishers[key] = _.groupBy(publishers[key], 'Date')
    });

    
    let bidders = []; 
    
    let bidderDateGroup = {};
   _.each(countryPublishers[publisher], (value,date) => {
      
        const bidderGroup = _.groupBy(value,'Bidder');
        bidders.length  === 0 ? bidders.push(['Date'].concat(Object.keys(bidderGroup).sort())) : true
        const result = {};
        _.each(bidderGroup, (bids,key) => {
            let totalBidRequest = 0, totalImpressions = 0;
            _.each(bids, bid => {
                    totalBidRequest += Number(bid['Bid Requests']);
                    totalImpressions += Number(bid['Impressions']);
                });
                result[key] = totalImpressions/totalBidRequest * 100;
        });
        bidderDateGroup[date] = result;
    });

    const dateGroup = Object.keys(bidderDateGroup).sort((date1, date2) => new Date(date1) > new Date(date2));
    const results = [];
    results.push(bidders[0]);
    _.each(dateGroup, date => {
         const chartBidderData = [date];
         for(let k=1;k<bidders[0].length;k++){
            chartBidderData.push(bidderDateGroup[date][bidders[0][k]]);
         }
         results.push(chartBidderData);
    });
    cb(results);
    
}

const getTotalCostByPublisher = (bidder,cb) => {

    const bidders = _.groupBy(data,'BIdder');

    let bidderKeys = Object.keys(bidders);
    const countryBidder = {};
    
    _.each(bidderKeys, key => {
        countryBidder[key] = _.groupBy(bidders[key], 'Date')
    });

    
    let publishers = []; 
    
    let publisherDateGroup = {};
   _.each(countryBidder[bidder], (value,date) => {
        
        const publisherGroup = _.groupBy(value,'Publisher');
        publishers.length  === 0 ? publishers.push(['Date'].concat(Object.keys(publisherGroup).sort())) : true
        const result = {};
        _.each(publisherGroup, (pubs,key) => {
            let totalCost = 0;
            _.each(pubs, pub => {
                    totalCost += Number(pub['Cost']);
                });
                result[key] = totalCost;
        });
        publisherDateGroup[date] = result;
    });

    const dateGroup = Object.keys(publisherDateGroup).sort((date1, date2) => new Date(date1) > new Date(date2));
    const results = [];
    results.push(publishers[0]);
    _.each(dateGroup, date => {
         const chartPublisherData = [date];
         for(let k=1;k<publishers[0].length;k++){
            chartPublisherData.push(publisherDateGroup[date][publishers[0][k]]);
         }
         results.push(chartPublisherData);
    });
    cb(results);
    
}