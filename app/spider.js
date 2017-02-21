var superagent = require('superagent');
var cheerio = require('cheerio');
var express = require('express');

var app = express();

var getImagesFromUrl = function(url, callback) {
	superagent.get(url).end(function(err, res) {
		if (err) {
			callback(err);
			return;
		}

		try {

			var $ = cheerio.load(res.text);
            var girls = [];
            $('.thumbnail .img_single a').each(function(idx, element) {
                $element = $(element);
                var userPage = $element.attr('href');
                var arr = userPage.split('/');
                var uId = arr[arr.length - 1];
                girls.push({
                	uId: uId,
                	userPage: userPage,
                    title: $element.children('.height_min').attr('title'),
                    imgUrl: $element.children('.height_min').attr('src')
                });
            });
			callback(null, girls);

		} catch (err) {
			callback(err);
		}
	});
};

//所有
app.get('/image/all', function(req, res) {
	var page = req.query.page ? req.query.page : 1;
	var url = 'http://www.dbmeinv.com/dbgroup/show.htm?pager_offset=' + page;
	getImagesFromUrl(url, function(err, imgs) {
		if (err) {
			var errResponse = {
				error: err
			};

			return res.json(errResponse);
		}

		res.json(imgs);
	});
});

//大胸妹
app.get('/image/daxiong', function(req, res) {
	var page = req.query.page ? req.query.page : 1;
	var url = 'http://www.dbmeinv.com/dbgroup/show.htm?cid=2&pager_offset=' + page;
	getImagesFromUrl(url, function(err, imgs) {
		if (err) {
			var errResponse = {
				error: err
			};

			return res.json(errResponse);
		}

		res.json(imgs);
	});
});

//小翘臀
app.get('/image/qiaotun', function(req, res) {
	var page = req.query.page ? req.query.page : 1;
	var url = 'http://www.dbmeinv.com/dbgroup/show.htm?cid=6&pager_offset=' + page;
	getImagesFromUrl(url, function(err, imgs) {
		if (err) {
			var errResponse = {
				error: err
			};

			return res.json(errResponse);
		}

		res.json(imgs);
	});
});

//黑丝袜
app.get('/image/heisi', function(req, res) {
	var page = req.query.page ? req.query.page : 1;
	var url = 'http://www.dbmeinv.com/dbgroup/show.htm?cid=7&pager_offset=' + page;
	getImagesFromUrl(url, function(err, imgs) {
		if (err) {
			var errResponse = {
				error: err
			};

			return res.json(errResponse);
		}

		res.json(imgs);
	});
});

//美腿控
app.get('/image/meitui', function(req, res) {
	var page = req.query.page ? req.query.page : 1;
	var url = 'http://www.dbmeinv.com/dbgroup/show.htm?cid=3&pager_offset=' + page;
	getImagesFromUrl(url, function(err, imgs) {
		if (err) {
			var errResponse = {
				error: err
			};

			return res.json(errResponse);
		}

		res.json(imgs);
	});
});

//有颜值
app.get('/image/yanzhi', function(req, res) {
	var page = req.query.page ? req.query.page : 1;
	var url = 'http://www.dbmeinv.com/dbgroup/show.htm?cid=4&pager_offset=' + page;
	getImagesFromUrl(url, function(err, imgs) {
		if (err) {
			var errResponse = {
				error: err
			};

			return res.json(errResponse);
		}

		res.json(imgs);
	});
});

//大杂烩
app.get('/image/dazahui', function(req, res) {
	var page = req.query.page ? req.query.page : 1;
	var url = 'http://www.dbmeinv.com/dbgroup/show.htm?cid=5&pager_offset=' + page;
	getImagesFromUrl(url, function(err, imgs) {
		if (err) {
			var errResponse = {
				error: err
			};

			return res.json(errResponse);
		}

		res.json(imgs);
	});
});

//获取用户信息
app.get('/user/:uId', function(req, res) {
	var uId = req.params.uId ? req.params.uId : '1096900'; //给一个默认的
	var url = 'http://www.dbmeinv.com/dbgroup/' + uId;

	superagent.get(url).end(function(err, resp) {
		if (err) {
			var errResponse = {
				error: err
			};
			res.json(errResponse);
			return;
		}

		try {

			var $ = cheerio.load(resp.text);
            var imgs = [];
            $('.topic-figure.cc').each(function(idx, element) {
                $element = $(element);
                imgs.push({
                    title: $element.children('img').attr('alt'),
                    imgUrl: $element.children('img').attr('src')
                });
            });

            var portraitUrl = $('.media-object.avatar-48').attr('src');
			var nickname = $('.info ul li.name').text();

			var userInfo = {
				uId: uId,
				nickname: nickname,
				imgs: imgs
			};

			res.json(userInfo);

		} catch (err) {
			var errResponse = {
				error: err
			};
			res.json(errResponse);
		}
	});
});

app.listen(3500, function(err) {
	if (err) {
		console.log(err);
		return;
	}

	console.log('app is listening on port 3500...');
});