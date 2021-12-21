export type ElasticNodeInfo = {
    master: string;
    nodeName: string;
    heapPct: number;
    ramPct: number;
    cpuPct: number;
    nodeUptime: string;
};

export type ElasticClusterHealthApiResponse = {
    cluster_name: string;
    status: string;
    timed_out: boolean;
    number_of_nodes: number;
    number_of_data_nodes: number;
    active_primary_shards: number;
    active_shards: number;
    relocating_shards: number;
    initializing_shards: number;
    unassigned_shards: number;
    delayed_unassigned_shards: number;
    number_of_pending_tasks: number;
    number_of_in_flight_fetch: number;
    task_max_waiting_in_queue_millis: number;
    active_shards_percent_as_number: number;
};

export type ElasticClusterStateMasterNodeApiResponse = {
    cluster_name: string;
    cluster_uuid: string;
    master_node: string;
};
