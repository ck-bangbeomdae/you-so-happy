const express = require('express');
const mysql = require('mysql2');

const app = express();
app.use(express.json());

// MySQL 연결 풀 설정
const pool = mysql.createPool({
  host: 'my-mysql',
  user: 'junhaddi',
  password: '1qaz@wsx#wnsgk',
  database: 'my_database',
  waitForConnections: true,
  connectionLimit: 10, // 최대 연결 수 설정
});

// GET 요청: 모든 점수 기록 조회
app.get('/scores', (req, res) => {
  pool.query('SELECT * FROM scores', (err, results) => {
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
  pool.query(query, [playerName, elapsedTime, flipCount, deathCount], (err, result) => {
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
