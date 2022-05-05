start cmd /k call rs1.bat
start cmd /k call rs2.bat
start cmd /k call rs3.bat

@ECHO OFF
ECHO Linking replication sets ......
ECHO ==================================

timeout 20  &  mongosh --port 2717 < connectReplicas.js

PAUSE