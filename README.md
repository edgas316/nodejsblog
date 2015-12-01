#nodejsblog
##> seting up mongo db
######go to your mongodb dirrectory "bin folder"
>C:\mongodb\bin> 
######then run the following command
>mongod --directoryperdb --dbpath C:\mongodb\data\db --logpath C:\mongodb\log\mongodb.log --logappend -rest --install
######then run following commands
>net start MongoDB
#
>mongo
#
>db
#
>show dbs
######this will switch to your desired DB
>use nameOfDb
#
>show collections
#
>db.createCollection('nameOfCollection-ex-users')
#
>show dbs