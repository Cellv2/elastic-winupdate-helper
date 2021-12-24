export const CLUSTER_INFO_COLUMNS = [
    {
        Header: "Status",
        accessor: "status",
    },
    {
        Header: "Locked",
        accessor: "isLocked",
    },
    {
        Header: "Node Total",
        accessor: "nodeTotal",
    },
    {
        Header: "Relocating",
        accessor: "relocating",
    },
    {
        Header: "Initialising",
        accessor: "initialising",
    },
    {
        Header: "Unassigned",
        accessor: "unassigned",
    },
    {
        Header: "Active Shard %",
        accessor: "activeShardPct",
    },
];

export const NODE_INFO_COLUMNS = [
    {
        Header: "Master",
        accessor: "master",
    },
    {
        Header: "Node Name",
        accessor: "nodeName",
    },
    {
        Header: "Heap %",
        accessor: "heapPct",
    },
    {
        Header: "RAM %",
        accessor: "ramPct",
    },
    {
        Header: "CPU %",
        accessor: "cpuPct",
    },
    {
        Header: "Node Uptime",
        accessor: "nodeUptime",
    },
];
