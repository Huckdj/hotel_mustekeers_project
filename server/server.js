import  express  from "express";
import mysql from 'mysql';
import cors from 'cors';
import  jwt  from "jsonwebtoken";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cors({
   origin: ["http://localhost:3000"],
   methods:["POST", "GET"],
   credentials: true
}));
app.use(cookieParser());


const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:'hotel_musketeers'
})

const verifyUser = (req,res, next) => {
    const token = req.cookies.token;
    if(!token) {
        return res.json({Error: "You not authen"})
    }else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if(err){
                return res.json({Error: "Token is not okey"});
            }else {
                req.name = decoded.name;
                req.iduser = decoded.iduser;
                next();
            }
        })
    }
}

app.get('/', verifyUser,(req,res) => {
    return res.json({Status: "Success", name: req.name, iduser: req.iduser})
})


app.post('/register',(req, res)=> {
    const email = req.body.email;
    const checkEmailDuplicate ="SELECT * FROM users WHERE email = ?";
    db.query(checkEmailDuplicate, [email],(err, result) => {
        if(err) return res.json({Error:"Lỗi Đăng Kí, Thử Lại Sau"});
        if(result.length > 0 && result.length <= 1){
            return res.json({Status:"duplicate"})
        }else{
            const sql = "INSERT INTO users (`nameuser`,`email`,`password`) VALUES (?)";
            const values =[
                    req.body.nameuser,
                    req.body.email,
                    req.body.password
                ]
                db.query(sql, [values], (err, result) => {
                    if(err) return res.json({Error:"Lỗi Đăng Kí Thử Lại Sau"});
                    return res.json({Status: "Success"})
                })
        } 
    })
})
app.post('/contentnews',(req, res)=> {
    
    const sql = "INSERT INTO bangtin (`tuade`,`noidung`) VALUES (?)";
    const values =[
        req.body.tuade,
        req.body.noidung,
    ]
    db.query(sql, [values], (err, result) => {
        if(err) return res.json({Error:"Lỗi Thử Lại Sau"});
            return res.json({Status: "Success"})
        })
    } 
)

app.post('/login', (req, res) => {
            const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
            db.query(sql, [req.body.email, req.body.password], (err, data) => {
                if(err) return res.json({Error: "Lỗi hệ thống hãy thử lại"});
                if(data.length > 0){
                    if(data[0].role === "admin"){
                        return res.json({Status:"Admin"})
                    }else{
                        const name = data[0].nameuser;
                        const iduser = data[0].iduser;
                        const token = jwt.sign({name, iduser}, "jwt-secret-key", {expiresIn: '1d'});
                        res.cookie('token', token);
                        return res.json({Status: "Success"})
                    }
                } else {
                    return res.json({Error:"Sai tài khoản hoặc mật khẩu"})
                }
            })
})
app.get('/logout',(req,res) =>{
    res.clearCookie('token');
    return res.json({Status: "Success"})
})

app.get('/roominfo',(req, res)=>{
    const sql = "SELECT * FROM list_hotel_room";
    db.query(sql,(err,result)=>{
        if(err) return res.json({Message: "Error"})
        return res.json(result);
    })
})

app.get('/getnewshome', (req,res)=>{
    const sql = "SELECT * FROM bangtin LIMIT 3";
    db.query(sql,(err,result)=>{
        if(err) return res.json({Message: "Error"})
        return res.json(result);
    })
})

app.get('/newsdetail/:id',(req, res)=>{
    const id = req.params.id;
    const sql = "SELECT * FROM bangtin WHERE id=" + id ;
    db.query(sql,(err,result)=>{
        if(err) return res.json({Message: "Error"})
        return res.json(result);
    })
})

app.get('/infobranch',(req, res)=>{
    const sql = "SELECT * FROM hotel_branch";
    db.query(sql,(err,result)=>{
        if(err) return res.json({Message: "Error"})
        return res.json(result);
    })
})

app.get('/roominfo/:id',(req, res)=>{
    const id = req.params.id;
    const sql = "SELECT * FROM list_hotel_room WHERE id=" + id ;
    db.query(sql,(err,result)=>{
        if(err) {return res.json({Message: "Error"})
        }else{
            const branch = "SELECT * FROM hotel_branch WHERE idbranch IN (SELECT branch FROM list_hotel_room WHERE id =" + id + ")";
            db.query(branch,(err,data)=>{
                if(err) {return res.json({Message: "Error"})
                }else{
                    const combinedData = { roomInfo: result, branchInfo: data };
                return res.json(combinedData);
            }
            })
        }
    })
})

app.get('/tips',(req, res)=>{
    const sql = "SELECT * FROM list_hotel_room ORDER BY RAND() LIMIT 3";
    db.query(sql,(err,result)=>{
        if(err) return res.json({Message: "Error"})
        return res.json(result);
    })
})
app.get('/productfull',(req, res)=>{
    const sql = "SELECT * FROM list_hotel_room";
    db.query(sql,(err,result)=>{
        if(err) return res.json({Message: "Error"})
        return res.json(result);
    })
})

app.get('/branchinfo/:id',(req, res)=>{
    const id = req.params.id;
    const sql = "SELECT * FROM list_hotel_room WHERE branch=" + id ;
    db.query(sql,(err,result)=>{
        if(err) {return res.json({Message: "Error"})}
        else{
            const branch = "SELECT * FROM hotel_branch WHERE idbranch IN (SELECT branch FROM list_hotel_room WHERE id =" + id + ")";
            db.query(branch,(err,data)=>{
                if(err) {return res.json({Message: "Error"})
                }else{
                    const combinedData = { roomInfo: result, branchInfo: data };
                return res.json(combinedData);
            }
            })
        }
        
    })
})

app.post('/newbranch',(req, res)=> {
    const sql = "INSERT INTO hotel_branch (`namebranch`,`address`,`phonenumber`,`emailbranch`) VALUES (?)";
    const values =[
        req.body.namebranch,
        req.body.address,
        req.body.phonenumber,
        req.body.emailbranch,
    ]
    db.query(sql, [values], (err, result) => {
        if(err) return res.json({Error:"Lỗi Thử Lại Sau"});
            return res.json({Status: "Success"})
        })
    } 
)

app.post('/branches/:branchId', (req, res) => {
    const branchId = req.params.branchId;

    const sql = `DELETE FROM hotel_branch WHERE idbranch =` + branchId;
    db.query(sql, [branchId], (err, result) => {
        if (err) {
            console.error("Lỗi khi xóa dữ liệu:", err);
            res.status(500).json({ error: 'Có lỗi xảy ra khi xóa dữ liệu' });
            return;
        }
        console.log(`Đã xóa chi nhánh có id ${branchId}`);
        res.sendStatus(200); // Trả về mã status 200 để thông báo rằng xóa thành công
    });
});


app.post('/newrooms',(req, res)=> {
    const sql = "INSERT INTO list_hotel_room (`hangphong`,`giatien`,`images`,`loaigiuong`,`tenphong`,`giatienquadem`,`branch`) VALUES (?)";
    const values =[
        req.body.hangphong,
        req.body.giatien,
        req.body.images,
        req.body.loaigiuong,
        req.body.tenphong,
        req.body.giatienquadem,
        req.body.branch
    ]
    db.query(sql, [values], (err, result) => {
        if(err) return console.error(err);
            return res.json({Status: "Success"})
        })
    } 
)

app.get('/showfullroom',(req, res)=>{
    const sql = "SELECT list_hotel_room.*, hotel_branch.namebranch AS branchshow FROM list_hotel_room JOIN hotel_branch ON list_hotel_room.branch = hotel_branch.idbranch";
    db.query(sql,(err,result)=>{
        if(err) {return res.json({Message: "Error"})
        }else{
            return res.json(result)
            }
            })
        }
    )

    app.post('/roomid/:roomid', (req, res) => {
        const roomid = req.params.roomid;
    
        const sql = `DELETE FROM list_hotel_room WHERE id =` + roomid;
        db.query(sql, [roomid], (err, result) => {
            if (err) {
                console.error("Lỗi khi xóa dữ liệu:", err);
                res.status(500).json({ error: 'Có lỗi xảy ra khi xóa dữ liệu' });
                return;
            }
            console.log(`Đã xóa chi nhánh có id ${roomid}`);
            res.sendStatus(200); // Trả về mã status 200 để thông báo rằng xóa thành công
        });
    });
    
app.post('/order/:id',(req, res)=> {
    const idroom = req.params.id;
    const status = "Booked"
    const sql = "INSERT INTO booking (`iduser`,`checkin_date`,`checkout_date`,`status`,`cmnd`,`sdt`,`nameorder`,`idroom`) VALUES (?)";
    const values =[
        req.body.iduser,
        req.body.checkindate,
        req.body.checkoutdate,
        status,
        req.body.cmnd,
        req.body.sdt,
        req.body.nameorder,
        idroom
    ]
    db.query(sql, [values], (err, result) => {
        if(err) return console.error({Error:"Lỗi",err});
                return res.json({Status: "Success"})
        })
    } 
)

app.get('/infouser/:id',(req, res)=>{
    const id = req.params.id;
    const sql = "SELECT * FROM users WHERE iduser=" + id ;
    db.query(sql,(err,result)=>{
        if(err) {return res.json({Message: "Error"})}
        else{
                return res.json(result);
            }
            })
        }
    )

app.post('/resetpassword/:id', (req, res) => {
    const id = req.params.id;
    const newpassword = req.body.newpassword;
    const password = req.body.password
    const checkpassword = "SELECT * FROM users WHERE iduser = ? AND password = ?";
    db.query(checkpassword, [id, password], (err, result) => {
        if (err) {
            return console.error({Error:"Lỗi",err})
        } 
        if(result.length > 0) {
            const sql = "UPDATE users SET password = " + password +  " WHERE iduser =" + id;
            db.query(sql, [newpassword, id], (err, result) => {
                if (err) {
                    return console.error({Error:"Lỗi",err})
                } else {
                    return res.json({ Status: "Success" });
                }
            });
        }else{
            return res.json({Message:" Sai Mật Khẩu"})
        }
    })
});

app.get('/infooder/:id',  (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM booking WHERE iduser = ?"
    db.query(sql, [id], (err, result) => {
        if(err) {
            return console.error({Error:"Lỗi", err})
        }else{
            const inforoom = "SELECT * FROM list_hotel_room WHERE id IN (SELECT idroom FROM booking WHERE id )"
            db.query(inforoom, (err, data) => {
                if(err){
                    return console.error({Error:"Lỗi", err})
                }else{
                    const idbranch = data[0].branch;
                    const branch = "SELECT * FROM hotel_branch WHERE idbranch IN (SELECT branch FROM list_hotel_room WHERE id =" + idbranch + ")";
                    db.query(branch,(err,data2)=>{
                    if(err) {return res.json({Message: "Error"})
                    }else{
                    const combinedData = { orderinfo: result, roominfo: data, branchInfo: data2 };
                    return res.json(combinedData);
                    }
                })
                }
            })
        }
        
    })
})

app.listen(4000 , () => {
    console.log('Server listening on port 4000!');
  });
