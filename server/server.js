const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 4000;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: '21cake'
})

connection.connect()

app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

// 首页
app.get('/home', (req, res) => {
  connection.query(`select * from c_home;`, function (err, result) {
    const obj = {
      status: 200,
      message: '查询成功！',
      data: result,
    }
    res.json(obj);
  })
})

// 详情
app.get('/produce', (req, res) => {
  connection.query(`select * from c_cake where id=${req.query.id};`, function (err, result) {
    result.forEach(item => {
      if(item.styles) {
        item.styles = item.styles.split(',')
      }
      if(item.tags) {
        item.tags = item.tags.split(',')
      }
      item.grams = item.grams.split(',')
      item.imgurl = item.imgurl.split(',')
      item.describe = item.describe.split(',')
    });
    const obj = {
      status: 200,
      message: '查询成功！',
      data: result,
    }
    res.json(obj);
  })
})

// tab
app.get('/tab', (req, res) => {
  connection.query(`select * from c_type order by id asc;`, function (err, result) {
    const obj = {
      status: 200,
      message: '查询成功！',
      data: result,
    }
    res.json(obj);
  })
})

// 分类
app.get('/gallery', (req, res) => {
  connection.query(`select * from c_cake where type_id=${req.query.type_id};`, function (err, result) {
    result.forEach(item => {
      if(item.styles) {
        item.styles = item.styles.split(',')
      }
      if(item.tags) {
        item.tags = item.tags.split(',')
      }
      item.grams = item.grams.split(',')
      item.imgurl = item.imgurl.split(',')
      item.describe = item.describe.split(',')
    });
    const obj = {
      status: 200,
      message: '查询成功！',
      data: result,
    }
    res.json(obj);
  })
})

// 类别
app.get('/type', (req, res) => {
  connection.query(`select * from c_cake where tags like '%${req.query.type}%';`, function (err, result) {
    result.forEach(item => {
      if(item.styles) {
        item.styles = item.styles.split(',')
      }
      if(item.tags) {
        item.tags = item.tags.split(',')
      }
      item.grams = item.grams.split(',')
      item.imgurl = item.imgurl.split(',')
      item.describe = item.describe.split(',')
    });
    const obj = {
      status: 200,
      message: '查询成功！',
      data: result,
    }
    res.json(obj);
  })
})

// 添加购物车
app.get('/addcart', (req, res) => {
  let cart = JSON.parse(req.query.cart)
  connection.query(`insert into c_cart (utel,cake_id,num,gram) values (${cart.utel},${cart.cake_id},${cart.num},'${cart.gram}');`, function (err, result) {
    if (err) console.log(err);
    const obj = {
      status: 200,
      message: '添加成功！',
    }
    res.json(obj);
  })
})

// 查询购物车
app.get('/selcart', (req, res) => {
  connection.query(`select c_cart.cid,c_cart.num,c_cart.gram,c_cake.* from c_cart,c_cake where c_cart.cake_id = c_cake.id and utel=${req.query.utel};`, function (err, result) {
    result.forEach(item => {
      if(item.styles) {
        item.styles = item.styles.split(',')
      }
      if(item.tags) {
        item.tags = item.tags.split(',')
      }
      item.grams = item.grams.split(',')
      item.imgurl = item.imgurl.split(',')
      item.describe = item.describe.split(',')
    });
    const obj = {
      status: 200,
      message: '查询成功！',
      data: result,
    }
    res.json(obj);
  })
})

// 删除购物车
app.get('/delcart', (req, res) => {
  connection.query(`delete from c_cart where cid=${req.query.id}`, function (err, result) {
    if (err) console.log(err);
    const obj = {
      status: 200,
      message: '删除成功！',
    }
    res.json(obj);
  })
})

// 清空购物车
app.get('/remove', (req, res) => {
  connection.query(`delete from c_cart where utel=${req.query.utel}`, function (err, result) {
    if (err) console.log(err);
    const obj = {
      status: 200,
      message: '删除成功！',
    }
    res.json(obj);
  })
})

// 期刊
app.get('/magiz', (req, res) => {
  connection.query(`select * from c_magiz order by mid asc;`, function (err, result) {
    const obj = {
      status: 200,
      message: '查询成功！',
      data: result,
    }
    res.json(obj);
  })
})

// 期刊详情
app.get('/magazine', (req, res) => {
  connection.query(`select * from c_magiz where mid=${req.query.mid};`, function (err, result) {
    const obj = {
      status: 200,
      message: '查询成功！',
      data: result,
    }
    res.json(obj);
  })
})

// 注册
app.get('/signup', (req, res) => {
  connection.query('insert into c_user (username,password,grade) values ("'+req.query.name+'","'+ req.query.psw +'","注册会员");', function (err, result) {
    if (err) console.log(err);
    const obj = {
      status: 200,
      message: '注册成功！',
    }
    res.json(obj);
  })
})

// 登录
app.get('/signin', (req, res) => {
  connection.query(`select * from c_user where username=${req.query.name};`, function (err, result) {
    const obj = {
      status: 200,
      message: '查询成功！',
      data: result,
    }
    res.json(obj);
  })
})

app.listen(port, () => console.log(`HTTP server start on ${port}`))