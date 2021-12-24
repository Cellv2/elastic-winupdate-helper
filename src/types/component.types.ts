export type ElasticClusterInfo = {
    clusterName: string;
    status: string;
    isLocked: string;
    nodeTotal: number;
    startupTime: string;
    relocating: number;
    initialising: number;
    unassigned: number;
    activeShardPct: number;
};

export type ElasticNodeInfo = {
    master: string;
    nodeName: string;
    heapPct: number;
    ramPct: number;
    cpuPct: number;
    nodeUptime: string;
};
