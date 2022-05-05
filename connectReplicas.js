config = {
  _id: "ThreeReplicationSets",
  members: [
    { _id: 0, host: "localhost:2717" },
    { _id: 1, host: "localhost:2718" },
    { _id: 2, host: "localhost:2719" },
  ],
};

rs.initiate(config);
rs.status();
