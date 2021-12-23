import { ElasticClusterHealth } from "../types/elastic.types";
import { ElasticClusterInfo } from "../types/component.types";

export const mapClusterHealthComponentData = (
    data: ElasticClusterHealth
): Partial<ElasticClusterInfo> => {
    const mappedObj: Partial<ElasticClusterInfo> = {
        status: data.status,
        isLocked: "false",
        nodeTotal: data.number_of_nodes,
        relocating: data.relocating_shards,
        initialising: data.initializing_shards,
        unassigned: data.unassigned_shards,
        activeShardPct: data.active_shards_percent_as_number,
    };

    return mappedObj;
};
