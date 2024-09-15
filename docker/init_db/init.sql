GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' WITH GRANT OPTION;
CREATE USER 'dev'@'%' IDENTIFIED BY 'Dev123!@';
GRANT ALL PRIVILEGES ON *.* TO 'dev'@'%' WITH GRANT OPTION;

/* v8 Row size too large error  */
SET GLOBAL innodb_strict_mode = 0;
SET innodb_strict_mode = 0;
SET GLOBAL log_bin_trust_function_creators = 1; 

flush privileges;

source /home/task.sql


