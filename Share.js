﻿
console.log('=====測試排程=====');
console.log(Date.now());
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

console.log('==================');