console.log("每日主動推播");
console.log('=====測試排程=====');
console.log(Date.now());
const { Client } = require('pg');
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

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        var info = JSON.parse(body);
        const client = new Client({
            connectionString: process.env.DATABASE_URL,
            ssl: true,
        });
        client.connect();
        var iFriend=0;    
        var repMessage="";  
        const ME = 'Ubb9f5c58d8fc3755bc871dcda17439f6';
        client.query("SELECT COUNT(*) FROM public.user_history_record where friend='Y';", (err, res) => {    
        if (err) throw err;
            for (let row of res.rows) {
                iFriend=row.count;
                repMessage="      目前訂閱人數:"+iFriend+"人";
                bot.push(ME, {
                    type: 'text',
                    text: repMessage
                });
                console.log('ok');
            }
            client.end();
        });
    }
}
request(options, callback);
console.log('==================');
