# 1. Node.js 기반의 이미지 선택
FROM node:14

# 2. 작업 디렉토리 생성
WORKDIR /usr/src/app

# 3. 패키지 파일 복사
COPY package*.json ./

# 4. 필요한 패키지 설치
RUN npm install

# 5. 소스 코드 복사
COPY . .

# 6. 컨테이너가 노출할 포트 설정
EXPOSE 3000

# 7. 애플리케이션 시작 명령
CMD ["node", "index.js"]