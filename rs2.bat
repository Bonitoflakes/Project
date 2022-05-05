@ECHO OFF
ECHO starting batch file
ECHO starting replication Set2
ECHO +=+=+=+=+=+=+=+=+=+=+=+=+=
mongod --port 2718 --dbpath D:\CryptoVerse\rs2 --replSet ThreeReplicationSets --logpath D:\CryptoVerse\rs2\2.log --logappend

