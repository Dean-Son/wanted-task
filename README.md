# wanted-task

# 1. mysql 및 레디스 동작

mysql 과 레디스는 도커로 동작합니다

## 구조

'''
init_db/init.sql --> mysql도커 최초 실행 시 mysql 초기 셋팅 정보가 있습니다.

mysql_schema/task.sql --> init.sql이 실행되면서 task 데이터 베이스 및 테이블 생성 스크립트 쿼리가 있습니다.

docker-compose.yaml --> mysql 및 레디스 가 있습니다.

도커 실행(docker 폴더이동)
$) docker-compose up
'''

# 2. nestjs 실행

개발 로컬 환경으로 실행하시면 됩니다.
'''
$)npm run start:dev:local
'''

# 3. 스웨거 접속

/api/v1/api-docs 으로 접속하시면됩니다.
'''
[스웨거 접속](http://localhost:3000/api/v1/api-docs)
'''
