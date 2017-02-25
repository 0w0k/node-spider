// node自带的模块
const path = require('path')
const url = require('url');
const fs = require('fs')
// npm安装的依赖库
const superagent = require('superagent');
const cheerio = require('cheerio');
const eventproxy = require('eventproxy');
const async = require('async');
const mkdir = require('mkdirp')
// 设置爬虫目标URL
var targetUrl = 'https://www.douyu.com/directory/game/How';

//---------- 1 ----------
// superagent.get(targetUrl).end(function(err,res){
// 	console.log(res);
// });

//---------- 2 ----------
superagent.get(targetUrl).end(function(err,res){
	var $ = cheerio.load(res.text);
	$('.ellipsis').each(function(index,element){
		// var href = url.resolve(targetUrl,$(element).attr('href'));
		var href = $(element).text();
		console.log(href);
	});
});

// ---------- 4 -------------
// 加入eventproxy来控制计数后回调
// var topicUrls = [];	
// function getTopicUrls() {

// 	return new Promise(function(resolve){
// 		superagent.get(targetUrl).end(function(err,res){
// 			var $ = cheerio.load(res.text);
// 			$('#topic_list .topic_title').each(function(index,element){
// 				var href = url.resolve(targetUrl,$(element).attr('href'));
// 				topicUrls.push(href);
// 				resolve(topicUrls);
// 			});
// 			// console.log(topicUrls);
// 		});
// 	});

// };


// getTopicUrls().then(function(topicUrls){
// 	console.log(1);
// 	var ep = new eventproxy();
// 	// eventproxy 模块要先定义回调函数
// 	ep.after('crawled', topicUrls.length, function(topics) {
// 		topics = topics.map(function(topicPair) {
// 			var topicUrl = topicPair[0];
// 			var topicHtml = topicPair[1];
// 			var $ = cheerio.load(topicHtml);
// 			return ({
// 				title: $('.topic_full_title').text(),
// 				href: topicUrl,
// 				comment1: $('.reply_content .markdown-text').eq(0).text().trim()
// 			});
// 		});
// 		console.log('outcome');
// 		console.log(topics);
// 	});
// 	topicUrls.forEach(function(topicUrl) {
// 		superagent.get(topicUrl)
// 			.end(function(err, res){
// 				console.log('fetch－－' + topicUrl + '－－successfully');
// 	      		// eventproxy 告诉after函数，执行了一次异步，等到次数满足条件，就可以执行回调了
// 				ep.emit('crawled', [topicUrl, res.text]);
// 			});
// 	});
// });

// ---------- 6 -----------
// 设置延迟，并发控制为5
// 打印出文章标题和第一条评论
// var topicUrls = [];	
// function getTopicUrls() {
// 	return new Promise(function(resolve){
// 		superagent.get(targetUrl)
// 			.end(function(err, res){
// 				if (err) {
// 					return console.log('error:', err)
// 				}
// 				var $ = cheerio.load(res.text);
// 				$('#topic_list .topic_title').each(function(index, element){
// 					var href = url.resolve(targetUrl, $(element).attr('href'));
// 					topicUrls.push(href);
// 					resolve(topicUrls);
// 				})
// 			});
// 	});
// };
// getTopicUrls().then(function(topicUrls){
// 	var ep = new eventproxy();
// 	ep.after('crawled', topicUrls.length, function(topics) {
// 		topics = topics.map(function(topicPair) {
// 			var topicUrl = topicPair[0];
// 			var topicHtml = topicPair[1];
// 			var $ = cheerio.load(topicHtml);
// 			return ({
// 				title: $('.topic_full_title').text(),
// 				href: topicUrl,
// 				comment1: $('.reply_content .markdown-text').eq(0).text().trim()
// 			});
// 		});
// 		console.log('------------------------ outcomes -------------------------');
// 		console.log(topics);
// 		console.log('本次爬虫结果总共' + topics.length + '条')
// 	});
// 	var curCount = 0;
// 	// 设置延时
//     function concurrentGet(url, callback) {
//     	var delay = parseInt((Math.random() * 30000000) % 1000, 10);
// 	    curCount++;
// 		setTimeout(function() {
// 		    console.log('现在的并发数是', curCount, '，正在抓取的是', url, '，耗时' + delay + '毫秒');  
// 	    	superagent.get(url)
// 				.end(function(err, res){
// 					console.log('fetch－－' + url + '－－successfully');
// 					ep.emit('crawled', [url, res.text]);
// 				});
// 		    curCount--;
// 		    callback(null,url +'Call back content');
// 		}, delay);
//     }
// 	// 使用async控制异步抓取 	
// 	// mapLimit(arr, limit, iterator, [callback])
// 	// 异步回调
// 	async.mapLimit(topicUrls, 5 ,function (topicUrl, callback) {
// 		    concurrentGet(topicUrl, callback);
// 	    });
// });


// =====================================


// var dir = './images'
// // 创建目录图片存储
// mkdir(dir, function(err) {
// 	if(err) {
// 	    console.log(err);
// 	}
// });
// //---------- 7 -----------
// // 设置延迟，并发控制为5
// // 下载头像
// var topicUrls = [];	
// function getTopicUrls() {
// 	return new Promise(function(resolve){
// 		superagent.get(targetUrl)
// 			.end(function(err, res){
// 				if (err) {
// 					return console.log('error:', err)
// 				}
// 				var $ = cheerio.load(res.text);
// 				$('#topic_list .topic_title').each(function(index, element){
// 					var href = url.resolve(targetUrl, $(element).attr('href'));
// 					topicUrls.push(href);
// 					resolve(topicUrls);
// 				})
// 			});
// 	});
// };
// getTopicUrls().then(function(topicUrls){
// 	var ep = new eventproxy();
// 	ep.after('crawled', topicUrls.length, function(topics) {
// 		var imgUrls = []
// 		topics = topics.map(function(topicPair) {
// 			// ...// 参照---6---
// 			var topicUrl = topicPair[0];
// 			var topicHtml = topicPair[1];
// 			var $ = cheerio.load(topicHtml);
// 			imgUrls.push($('.user_avatar img').attr('src'));
// 			return ({
// 				title: $('.topic_full_title').text(),
// 				href: topicUrl,
// 				comment1: $('.reply_content .markdown-text').eq(0).text().trim()
// 			});
// 		});
//       	// 下载图片的使用异步可能会导致没下载完然后图片破损了，这边使用async.mapSeries串行执行
// 		async.mapSeries(imgUrls, function (imgUrl, callback) {
// 			// 创建文件流
// 			const stream = fs.createWriteStream(dir + '/' + path.basename(imgUrl) + '.jpg');
// 			const res = superagent.get(imgUrl);
// 			// res.type('jpg')
// 			res.pipe(stream);
// 			console.log(imgUrl, '－－保存完成');
// 		    callback(null, 'Call back content');
// 	    });
// 		console.log('------------------------ outcomes -------------------------');
// 		console.log('本次爬虫结果总共' + topics.length + '条');
// 	});
// 	var curCount = 0;
// 	// 并发数量
//     function concurrentGet(url, callback) {
//     	var delay = parseInt((Math.random() * 30000000) % 1000, 10);
// 	    curCount++;
// 		setTimeout(function() {
// 		    console.log('现在的并发数是', curCount, '，正在抓取的是', url, '，耗时' + delay + '毫秒');  
// 	    	superagent.get(url)
// 				.end(function(err, res){
// 					console.log('fetch－－' + url + '－－successfully');
// 					ep.emit('crawled', [url, res.text]);
// 				});
// 		    curCount--;
// 		    callback(null,url +'Call back content');
// 		}, delay);
//     }
// 	// 使用async控制异步抓取 
// 	async.mapLimit(topicUrls, 5 ,function (topicUrl, callback) {
// 		    concurrentGet(topicUrl, callback);
// 	    });
// })