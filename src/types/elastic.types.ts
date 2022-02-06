export type ElasticNodeStats = {
    cluster_name: string;
    nodes: {
        [key: string]: {
            name: string;
            transport_address: string;
            host: string;
            ip: string;
            os: ElasticNodeStatsOs;
            process: ElasticNodeStatsProcess;
            jvm: ElasticNodeStatsJvm;
        };
    };
};

type ElasticNodeStatsProcess = {
    timestamp: number;
    open_file_descriptors: number;
    max_file_descriptors: number;
    cpu: {
        percent: number;
        total_in_millis: number;
    };
    mem: {
        total_virtual_in_bytes: number;
    };
};
type ElasticNodeStatsOs = {
    timestamp: number;
    cpu: {
        percent: number;
        load_average: {
            "1m": number;
            "5m": number;
            "15m": number;
        };
    };
    mem: {
        total_in_bytes: number;
        free_in_bytes: number;
        used_in_bytes: number;
        free_percent: number;
        used_percent: number;
    };
};

type ElasticNodeStatsJvm = {
    timestamp: number;
    uptime: string; // relies on the human query string param on the API request
    uptime_in_millis: number;
    mem: {
        heap_used_in_bytes: number;
        heap_used_percent: number;
        heap_committed_in_bytes: number;
        heap_max_in_bytes: number;
        non_heap_used_in_bytes: number;
        non_heap_committed_in_bytes: number;
        pools: {
            young: {
                used_in_bytes: number;
                max_in_bytes: number;
                peak_used_in_bytes: number;
                peak_max_in_bytes: number;
            };
            old: {
                used_in_bytes: number;
                max_in_bytes: number;
                peak_used_in_bytes: number;
                peak_max_in_bytes: number;
            };
            survivor: {
                used_in_bytes: number;
                max_in_bytes: number;
                peak_used_in_bytes: number;
                peak_max_in_bytes: number;
            };
        };
    };
    threads: {
        count: number;
        peak_count: number;
    };
    gc: {
        collectors: {
            young: {
                collection_count: number;
                collection_time_in_millis: number;
            };
            old: {
                collection_count: number;
                collection_time_in_millis: number;
            };
        };
    };
    buffer_pools: {
        mapped: {
            count: number;
            used_in_bytes: number;
            total_capacity_in_bytes: number;
        };
        direct: {
            count: number;
            used_in_bytes: number;
            total_capacity_in_bytes: number;
        };
        "mapped - 'non-volatile memory'": {
            count: number;
            used_in_bytes: number;
            total_capacity_in_bytes: number;
        };
    };
    classes: {
        current_loaded_count: number;
        total_loaded_count: number;
        total_unloaded_count: number;
    };
};

export type ElasticClusterHealth = {
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

export type ElasticClusterStateMasterNodeData = {
    cluster_name: string;
    cluster_uuid: string;
    master_node: string;
    nodes: {
        [key: string]: {
            name: string;
            ephemeral_id: string;
            transport_address: string;
        };
    };
};

export type ElasticSearchSettings = {
    persistent: ElasticSearchSettings_Cluster;
    transient: ElasticSearchSettings_Cluster;
};

export type ElasticSearchSettings_Cluster = {
    cluster: {
        routing: ElasticSearchSettings_Routing;
    };
};

export type ElasticSearchSettings_Routing = {
    allocation: {
        enable: typeof shardAllocationSettings[number];
    };
};

// https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-cluster.html#cluster-shard-allocation-settings
const shardAllocationSettings = [
    "all",
    "primaries",
    "new_primaries",
    "none",
] as const;
export type ClusterLevelShardAllocationSettings = {
    persistent: typeof shardAllocationSettings[number];
    transient: typeof shardAllocationSettings[number];
};
