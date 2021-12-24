import { ElasticClusterInfo, ElasticNodeInfo } from "../types/component.types";
import { ElasticClusterHealth, ElasticNodeStats } from "../types/elastic.types";

export const mapClusterHealthComponentData = (
    clusterHealthData: ElasticClusterHealth
): Partial<ElasticClusterInfo> => {
    const mappedObj: Partial<ElasticClusterInfo> = {
        status: clusterHealthData.status,
        isLocked: "false",
        nodeTotal: clusterHealthData.number_of_nodes,
        relocating: clusterHealthData.relocating_shards,
        initialising: clusterHealthData.initializing_shards,
        unassigned: clusterHealthData.unassigned_shards,
        activeShardPct: clusterHealthData.active_shards_percent_as_number,
    };

    return mappedObj;
};

export const mapClusterNodeStatsComponentData = (
    nodeStatsData: ElasticNodeStats,
    masterNodeName: string
): ElasticNodeInfo[] => {
    const nodeIds = Object.keys(nodeStatsData.nodes);
    const arrayedNodeStats = nodeIds.map((key) => nodeStatsData.nodes[key]);

    const mappedArr: ElasticNodeInfo[] = arrayedNodeStats.map((node) => {
        const master = node.name === masterNodeName ? "*" : "";

        const mappedObj: ElasticNodeInfo = {
            cpuPct: node.os.cpu.percent,
            heapPct: node.jvm.mem.heap_used_percent,
            nodeName: node.name,
            nodeUptime: node.jvm.uptime,
            ramPct: node.os.mem.used_percent, // TODO: is this the correct thing we are looking for? is it os or process?
            master,
        };

        return mappedObj;
    });

    return mappedArr;
};
