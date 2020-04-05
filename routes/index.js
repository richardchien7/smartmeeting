var express = require('express');
var solr = require('../models/solr')
var router = express.Router();
const testFolder = 'C:/Users/Admin/Desktop/wordmeeting';
const fs = require('fs');
var mammoth = require("mammoth");

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express', username: '王大明' });
});
router.get('/showfile_test', function (req, res, next) {
  res.render('showfile_test');
});
router.get('/showfile', function (req, res, next) {
  var filelist = new Array();
  const filedata = new Array();
  filedata.push("1");
  //console.log("abc");
  // fs.readdirSync(testFolder).forEach(file => {
  //   filelist.push(file);
  //   fs.readFile(file, (err, data) => { 
  //     mammoth.extractRawText({ path: "C:/Users/Admin/Desktop/wordmeeting/"+file })
  //     .then(function (result) {
  //       var text = result.value; // The raw text 

  //       //console.log("text:"+text);
  //       //filedata.push(text);
  //       //var messages = result.messages;
  //     }).done();

  //   }) 
  //   //console.log("file:"+file);
  // });
  var a = new Promise(function (resolve, reject) {
    
      fs.readdir(testFolder, (err, files) => {
        files.forEach(file => {
          filelist.push(file);
          //console.log("C:/Users/Admin/Desktop/wordmeeting/" + file);

          mammoth.extractRawText({ path: "C:/Users/Admin/Desktop/wordmeeting/" + file })
            .then(function (result) {
              var text = result.value; // The raw text 

              //console.log(text);
              filedata.push(text);
              //console.log("file1:" + filedata[1]);
              // var messages = result.messages;
            }).done();
            resolve('hello world');
          // console.log("file000:" + filedata[1]);
          // console.log("file" + file);
        
      });

    });
  });

 
 a.then(function(value) {
   console.log(value);
    setTimeout(function () { res.render('showfile', { title: 'Express', username: '王大明', filelist: filelist, filedata: filedata }) }, 5000);
 });
 a.catch(function(value) {
  console.log("error");
});
  function successCallback(result) {
    console.log("It succeeded with " + result);
  }

  function failureCallback(error) {
    console.log("It failed with " + error);
  }
  // res.send(filelist);
  // res.render('showfile', { title: 'Express', username: '王大明' });
});
router.get('/solr_upload', function (req, res, next) {
  res.render('solr_upload', { title: 'Express', username: '王大明' });
});


router.get('/hello', function (req, res, next) {
  res.send("helloworlds");
});

router.get('/upload', function (req, res, next) {
  res.render('upload', { title: 'Express', username: '王大明' });
});

router.get('/files', function (req, res, next) {
  res.render('files', { title: 'Express', username: '王大明' });
});

router.get('/test', function (req, res) {
  res.render('test', { title: 'test' });
});

router.post('/test', function (req, res) {
  //資料庫查詢方法
  //const sql = 'SELECT * FROM account'//若有參數改成 'SELECT * FROM account WHERE acc_id=$1'
  //var value = [req.body.loginacc]
  //pg.query(sql).then(results => {//若有參數改成 pg.query(sql, value).then(results => {
  //results.rowCount列出所有筆數
  //results.rows列出所有筆數的全部資料
  //results.rows[0]列出第0筆全部資料
  //results.rows[0].colName列出第0筆資料欄位名稱的資料
  //res.json({"count": results.rowCount, "alldata":results.rows, "data[0]":results.rows[0], "acc_id": results.rows[0].acc_id})

  /*const rows = results.rows;
  rows.map(row => {
      res.json({"count": row.rowCount, "data": row})//row是第0筆的全部資料、row.colName是第0筆欄位名稱的資料 我只會列第0筆後面的列不出來
  })*/

  //})

  //關鍵字查詢solr檔案
  var query = req.body.loginacc;
  var strquery = solr.query().q('text:' + query);//text是檔案的內文
  solr.search(strquery, function (err, result) {
    if (err) {
      res.json({ "關鍵字": query, "err": err });
    }
    res.json({ "關鍵字": query, "data": result.response });
  })
})
module.exports = router;
