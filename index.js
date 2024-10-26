const express = require('express');
const mysql = require('mysql2');

const app = express();
app.use(express.json()); // JSON 형식의 요청을 처리하기 위한 미들웨어

// MySQL 데이터베이스 연결 설정
const db = mysql.createConnection({
  host: '192.168.0.20',
  user: 'junhaddi',
  password: '1qaz@wsx#wnsgk',
  database: 'my_database'
});

// 데이터베이스 연결 확인
db.connect((err) => {
  if (err) {
    console.error('MySQL 연결 실패:', err);
  } else {
    console.log('MySQL에 연결되었습니다.');
  }
});

// GET 요청: 모든 점수 기록 조회
app.get('/scores', (req, res) => {
  const query = 'SELECT * FROM scores';
  db.query(query, (err, results) => {
    if (err) {
      console.error('점수 기록 조회 실패:', err);
      res.status(500).send('서버 오류');
    } else {
      res.json(results);
    }
  });
});

// POST 요청: 새로운 점수 기록 추가
app.post('/scores', (req, res) => {
  const { playerName, elapsedTime, flipCount, deathCount } = req.body;
  const query = 'INSERT INTO scores (playerName, elapsedTime, flipCount, deathCount) VALUES (?, ?, ?, ?)';
  db.query(query, [playerName, elapsedTime, flipCount, deathCount], (err, result) => {
    if (err) {
      console.error('점수 기록 추가 실패:', err);
      res.status(500).send('서버 오류');
    } else {
      res.status(201).send('점수 기록이 추가되었습니다.');
    }
  });
});

// 서버 시작
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT}에서 실행 중입니다.`);
});
