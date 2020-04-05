var express = require('express');
var router = express.Router();
var pool = require('../models/db');
var fs = require('fs');
const multer=require("multer");

router.get('/:id_join', function(req, res, next) {
    var pro_id = req.params.id_join;
    var q = 'SELECT pro_name FROM project WHERE pro_id = $1';
    pool.query(q, [pro_id], function(err, results) {
        if (err) throw err;
        var pro_name = results.rows[0].pro_name;
        res.render('member', { title: 'SmartMeeting', username: req.session.userName, pro_id: pro_id, pro_name: pro_name });
    })
});

router.post('/uploadminute', function(req, res) {
    var proid = req.query.proid;

    //上傳檔案儲存的路徑和檔名
    var storage = multer.diskStorage({
        destination: function(req, file, callback) {
            //建立以專案代號為名的資料夾
            fs.exists('../../solr-7.7.2/example/exampledocs/'+proid, function(exists) {
                if(!exists){
                    fs.mkdir('../../solr-7.7.2/example/exampledocs/'+proid, function(err) {
                        if(err){
                            console.log(err);
                        }
                        else{                           
                            callback(null, '../../solr-7.7.2/example/exampledocs/'+proid);                           
                        }
                    });
                }
                else{
                    callback(null, '../../solr-7.7.2/example/exampledocs/'+proid);
                }
            })           
        },
        filename: function(req, file, callback) {
            callback(null, file.originalname);
        }
    });   
    
    var upload = multer({
        storage: storage
    }).array('files');
    upload(req, res, function(err){
        if(err){
            return res.end("error uploading file");
        }
        res.end("file is uploaded");
        
    })
    res.redirect('/member/'+proid);
});

module.exports = router;