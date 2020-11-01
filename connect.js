var express = require('express');
var http = require('http');
var cors = require('cors');
var mysql = require('mysql');
var bodyParser  = require('body-parser'); 
var db = mysql.createConnection({ 
host     : '127.0.0.1', 
user     : 'daffy',
password : 'd12345',
database : 'kmhdb'
});
db.connect();
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Select Data
app.get('/detail',(req,res)=> {   // Router เวลาเรียกใช้งาน
    let user = req.query.username;
    let pass = req.query.password;
    let remember = req.query.remember;

    console.log(remember);

    let sql = 'SELECT * FROM member where user="'+user+'" and pass="'+pass+'";';  // คำสั่ง sql
    db.query(sql,(err,results) => { // สั่ง Query คำสั่ง sql
        if(err) throw err
        if(results.length > 0){
            console.log(results);
            res.json(results);
        }else{
            console.log("ไม่พบ user นี้");
            res.json("noData");
        }
    })
});

app.get('/detail/pack',(req,res)=> {   // Router เวลาเรียกใช้งาน
    let depCode = req.query.dpCode;
    console.log(depCode);
    let sql = 'SELECT * FROM kmhpackage where departmentCode='+depCode+';';  // คำสั่ง sql
    db.query(sql,(err,results) => { // สั่ง Query คำสั่ง sql
        if(err) throw err
        if(results.length > 0){
            console.log(results);
            res.json(results);
        }else{
            console.log("ไม่พบรายการนี้");
            res.json("noData");
        }
    })
});

app.get('/searchDataCovid',(req,res)=> {   // Router เวลาเรียกใช้งาน
    let username = req.query.username;
    let sql = 'SELECT * FROM riskarea where fname="'+username+'";';  // คำสั่ง sql
    db.query(sql,(err,results) => { // สั่ง Query คำสั่ง sql
        if(err) throw err
        if(results.length > 0){
            console.log(results);
            res.json(results);
        }else{
            console.log("ไม่พบรายการนี้");
            res.json("noData");
        }
    })
});

app.post('/insertRiskArea',(req,res)=> {   // Router เวลาเรียกใช้งาน 
     console.log(req.body);
     let pname = req.body.pname;
     let fname = req.body.fname;
     let lname = req.body.lname;
     let age = req.body.age;
     let congenitalDisease = req.body.congenitalDisease;
     let occupation = req.body.occupation;
     let local_address = req.body.local_address;
     let comeFrom_address = req.body.comeFrom_address;
     let temperature = req.body.temperature;
     let tel = req.body.tel;
     let numberOfTouch = req.body.numberOfTouch;
     let symptom = req.body.symptom;
     let dataSource = req.body.dataSource;
     let staffNumber = req.body.staffNumber;
     let staff = req.body.staff;

    //เริ่มแปลงวันที่
      let date =req.body.Date_comeArea;
      let dateGet = new Date(date);
      var day = dateGet.getDate();
      var month = dateGet.getMonth();
      //วัน
      if(day < 10) {
        day = "0"+(day);
      }else{
        day = (day);  
      }
      //เดือน
      if(month < 10) {
        month = "0"+(month+1);
      }else{
        month = (month+1);  
      }
      var year = dateGet.getFullYear();
      var dateFormat = year+"-"+month+"-"+day;
      var Date_comeArea = new Date(dateFormat).toISOString();
      Date.parse(Date_comeArea);
      //สิ้นสุดแปลงวันที่

     let userSave = req.body.userSave;

     let sql = 'insert into riskarea (pname,fname,lname,age,congenitalDisease,occupation,'+
        'local_address,comeFrom_address,temperature,tel,numberOfTouch,symptom,dataSource,'+
        'staffNumber,staff,Date_comeArea,userSave)'+
        'values("'+pname+'","'+fname+'","'+lname+'","'+age+'","'+congenitalDisease+'","'+occupation+'" '+
        ',"'+local_address+'","'+comeFrom_address+'","'+temperature+'","'+tel+'","'+numberOfTouch+'" '+
        ',"'+symptom+'","'+dataSource+'","'+staffNumber+'","'+staff+'","'+Date_comeArea+'","'+userSave+'");';  // คำสั่ง sql
     db.query(sql,(err,results) => { // สั่ง Query คำสั่ง sql
         if(err) {
             console.log("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
             res.json("insertError");
             throw err
         }else{
             res.json("insertSuccess");
         }
     })
});

http.createServer(app).listen(3001, function () {
    console.log('start api kmh');
});