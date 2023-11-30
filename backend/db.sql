use sw;

create table Users(
    ID int primary key auto_increment,
    Name varchar(50) not null,
    Password varchar(50) not null,
    Role varchar(50) not null
);

