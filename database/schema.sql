DROP DATABASE [IF EXISTS] abode;

CREATE DATABASE abode;



CREATE TABLE "neighborhoods" (
    "id" serial  PRIMARY KEY,
    "neighborhood" VARCHAR (20)  NOT NULL ,
    "transit_score" INTEGER NOT NULL,
    "walk_score" INTEGER NOT NULL,
    "value_inc_dec_past" INTEGER NOT NULL,
    "value_inc_dec_future" INTEGER NOT NULL,
    "median_value" INTEGER NOT NULL
);

CREATE TABLE "houses" (
    "id"  serial  PRIMARY KEY,
   "neighborhood_id" INTEGER NOT NULL,
    "home_cost" INTEGER NOT NULL,
    "bedrooms" INTEGER NOT NULL,
    "bathrooms" INTEGER NOT NULL,
    "home_address" VARCHAR (30) NOT NULL,
    "sf" INTEGER NOT NULL,
    "home_image" CHAR (7) NOT NULL,
    "heart_filled" BOOLEAN DEFAULT false
);

ALTER TABLE "houses" ADD FOREIGN KEY ("neighborhood") REFERENCES "neighborhoods" ("id");
