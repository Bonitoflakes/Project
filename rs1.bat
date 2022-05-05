@ECHO OFF
ECHO starting batch file
ECHO starting replication Set1
ECHO +=+=+=+=+=+=+=+=+=+=+=+=+=
mongod --port 2717 --dbpath D:\CryptoVerse\rs1 --replSet ThreeReplicationSets --logpath D:\CryptoVerse\rs1\1.log --logappend

