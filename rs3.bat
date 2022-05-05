@ECHO OFF
ECHO starting batch file
ECHO starting replication Set3
ECHO +=+=+=+=+=+=+=+=+=+=+=+=+=
mongod --port 2719 --dbpath D:\CryptoVerse\rs3 --replSet ThreeReplicationSets --logpath D:\CryptoVerse\rs3\3.log --logappend

