mysql-ctl start;

mysql --user drebbom;

create database `reddit`;

use reddit;

create table `Users` (`id` int auto_increment primary key, `email` varchar(250), `screenname` varchar(250), `password` varchar(40), `createdAt` timestamp, `updatedAt` timestamp);

create table `Posts` (`id` int auto_increment primary key, `url` text, `title` varchar(250), `userId` int, `createdAt` timestamp, `updatedAt` timestamp);

create table `Votes` (`id` int auto_increment primary key, `userId` int, `postId` int, `upDown` boolean, `createdAt` timestamp, `updatedAt` timestamp);
