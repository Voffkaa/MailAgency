CREATE TABLE "Users"(
	"id" uuid PRIMARY KEY,
	"email" varchar(32) NOT NULL UNIQUE,
	"passwordHash" varchar(60) NOT NULL,
    "isSuperuser" bool DEFAULT FALSE
);
