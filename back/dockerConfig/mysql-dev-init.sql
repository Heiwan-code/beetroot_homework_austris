CREATE USER 'beetroot'@'localhost' IDENTIFIED BY 'secret';
CREATE DATABASE [IF NOT EXISTS] beetroot_homework_austris
GRANT PRIVILEGE ON beetroot_homework_austris.* TO 'beetroot'@'localhost';
