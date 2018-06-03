
console.log('=====測試排程=====');
console.log(Date.now());
//////////////////為何都抓不到?
const { Client } = require('pg');




//////////////////      

//Line主動推播測試
var linebot = require('linebot');
var express = require('express');
var request = require('request');

console.log('宣告Line BOT');
var bot = linebot({
    channelId: '1585073032',
    channelSecret: '0af678b6490a7452cd453250d9bd6998',
    channelAccessToken: 'IOHrMu7KzhjGMinqIDTpoXrxN/NlHFzF3ni7SYAAjN0SShmin7XW/5omFuSGq4tJuTvIdMstBWVpfADfORx7cT0/97Tkx5lmHY2z+77az/1hXYQfRCJGGUbOlSg15drJNNaojTkOSK3bU982zARsZQdB04t89/1O/w1cDnyilFU='
});

//Request IMGUR callback 隨機取圖
var options = {
    url: 'https://api.imgur.com/3/album/BJNxWqK/images',
    headers: { 'Authorization': 'Client-ID d09fd3905abd246' }
};
function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        var info = JSON.parse(body);
        console.log("\t==>callback取圖OK: (" + info.data.length+")");

        const client = new Client({
            connectionString: process.env.DATABASE_URL,
            ssl: true,
        });
        client.connect();
        client.query('SELECT user_id FROM public.user_history_record;', (err, res) => {
            if (err) throw err;

            console.log("(after callback) Push Image For Each User");
            for (let row of res.rows) {
                var ui = row.user_id;
                //console.log(JSON.stringify(row));
                console.log('==>push ui:' + ui);
                var imgLink = info.data[Math.floor(Math.random() * info.data.length)].link;
                bot.push(ui, {
                    "type": "image",
                    "originalContentUrl": imgLink,
                    "previewImageUrl": imgLink
                });
                console.log('\t==>push [' + imgLink+'] ok');
            }
            client.end();
        });

        console.log('\t==>end callback');
    }
}
request(options, callback);


const ME = 'Ubb9f5c58d8fc3755bc871dcda17439f6';
/*bot.push(ME, {
    type: 'text',
    text: '女王呼喚：\n\n快去洗鳥！！'
});*/
/*bot.push(ME, {
 type: 'template',
       altText: 'this is a confirm template',
        template: {
            type: 'confirm',
            text: 'Are you sure?',
            actions: [{
                type: 'message',
                label: 'Yes',
                text: 'yes'
            }, {
                type: 'message',
                label: 'No',
                text: 'no'
            }]
        }
});*/
///////////下面推播template測試OK
/*bot.push(ME, {
 "type": "template",
  "altText": "This is a buttons template",
  "template": {
      "type": "buttons",
      "thumbnailImageUrl": "https://example.com/bot/images/image.jpg",
      "imageAspectRatio": "rectangle",
      "imageSize": "cover",
      "imageBackgroundColor": "#FFFFFF",
      "title": "Menu",
      "text": "Please select",
      "defaultAction": {
          "type": "uri",
          "label": "View detail",
          "uri": "http://example.com/page/123"
      },
      "actions": [
          {
            "type": "postback",
            "label": "Buy",
            "data": "action=buy&itemid=123"
          },
          {
            "type": "postback",
            "label": "Add to cart",
            "data": "action=add&itemid=123"
          },
          {
            "type": "uri",
            "label": "View detail",
            "uri": "http://example.com/page/123"
          }
      ]
  }
});
*/

/*var request = require('request');
var options = {
    url: 'https://api.imgur.com/3/album/ZaDbl2w/images',
    headers: { 'Authorization': 'Client-ID c5059e019ff8903' }
};*/

/*
function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        var info = JSON.parse(body);
        console.log(info.data[Math.floor(Math.random() * info.data.length)].link);

        console.log('傳遞卡片');
        //需要再加入隨機功能
        client.query('SELECT user_id FROM public.user_history_record;', (err, res) => {
            if (err) throw err;
            for (let row of res.rows) {
                var ui=row.user_id;
                console.log('ui:'+ui);
                console.log(JSON.stringify(row));
     //       }
     //   });  
        
        
        bot.push(ui, {
         "type": "image",
            "originalContentUrl": info.data[Math.floor(Math.random()*info.data.length)].link,
            "previewImageUrl": info.data[Math.floor(Math.random()*info.data.length)].link
        });
                ////////////
                    }
        });
        ///////////////
    }
}
*/
  //   }
//});
//////////////////////
//const ME2 = 'Ubb9f5c58d8fc3755bc871dcda17439f6';
//bot.push(ME2, {
//    "type": "template",
//    "altText": "This is a buttons template",
//    "template": {
//        "type": "buttons",
//        "thumbnailImageUrl": "https://example.com/bot/images/image.jpg",
//        "imageAspectRatio": "rectangle",
//        "imageSize": "cover",
//        "imageBackgroundColor": "#FFFFFF",
//        "title": "Menu",
//        "text": "Please select",
//        "defaultAction": {
//            "type": "uri",
//            "label": "View detail",
//            "uri": "http://example.com/page/123"
//        },
//        "actions": [
//            {
//                "type": "postback",
//                "label": "Buy",
//                "data": "action=buy&itemid=123"
//            },
//            {
//                "type": "postback",
//                "label": "Add to cart",
//                "data": "action=add&itemid=123"
//            },
//            {
//                "type": "uri",
//                "label": "View detail",
//                "uri": "http://example.com/page/123"
//            }
//        ]
//    }
//});

//const SAM = 'Uf11e08fe2c7bbabff46ad97b52806f3a';//'U96297178ee6ec3fbfe6d399b5b1e92e7';
//bot.push(SAM, {
//    type: 'text',
//    text: '讚讚讚！！'
//});

//Mark at 0529------------------------------------------------------------
/*console.log('取得相簿裡的所有照片');
var request = require('request');
var options = {
    url: 'https://api.imgur.com/3/album/ZaDbl2w/images',
    headers: { 'Authorization': 'Client-ID c5059e019ff8903' }
};
var i = 0;
function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        var info = JSON.parse(body);
        for (i = 0; i < info.data.length; i++) {
            console.log('取得相簿照片-',info.data[i].link);
        }
    }
}
request(options, callback);
*/

//------------------------------------------------------------
//console.log('資料庫測試');
//var MongoClient = require('mongodb').MongoClient;
//var url = 'mongodb://admin:tartan@ds235840.mlab.com:35840/heroku_p97hnb3x';

////Insert Sample
//MongoClient.connect(url, function (err, database) {
//    console.log('DB連線成功');
//    var db = database.db('heroku_p97hnb3x');
//    db.collection('test1').insertOne({
//        age: 40,
//        name: "Sam"
//    });
//    database.close();
//    console.log('DB插入資料成功');
//});

//// Find Data Sample
//MongoClient.connect(url, function (err, database) {
//    console.log('DB連線成功');
//    var db = database.db('heroku_p97hnb3x');
//    var cursor = db.collection('test1').find();

//    //For each
//    cursor.each(function (err, doc) {
//        console.log('DB資料讀取:', doc);
//    });
//    database.close();
//}); 

//// Update Data Sample
//MongoClient.connect(url, function (err, database) {
//    console.log('DB連線成功');
//    var db = database.db('heroku_p97hnb3x');
//    db.collection('test1').updateOne(
//        { "name": "Sam" },        //==>Where條件
//        //{ $set: { "age": 41 } }   //==>Set Value範例
//        { $inc: { age: 1 } }      //==> +1 的範例
//    );
//    console.log('DB更新資料成功:');
//    database.close();
//}); 

console.log('==================');
