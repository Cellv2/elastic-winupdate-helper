import { ElasticClusterHealthApiResponse, ElasticClusterStateMasterNodeApiResponse } from "../../types/elastic.types";

// A mock function to mimic making an async request for data
export function fetchCount(amount = 1) {
    return new Promise<{ data: number }>((resolve) =>
        setTimeout(() => resolve({ data: amount }), 500)
    );
}


export const getClusterStats = async (clusterUrl: string) => {
    // we need to ensure that the url is correctly formatted for the fetches
    let checkedClusterUrl = clusterUrl.trim();

    if (clusterUrl.endsWith("/")) {
        checkedClusterUrl = checkedClusterUrl.slice(0, -1);
    }

    try {
        // _cat/nodes?v=true&h=heap.percent,ram.percent,cpu,master,name,u
        // do existing tools monitor host % cpu/ram or process
        // name,jvm.mem.heap_used_percent,process.cpu.percent,process.mem.total_virtual_in_bytes,process.os.total_in_bytes

        // https://www.elastic.co/guide/en/elasticsearch/reference/current/cluster-stats.html
        // const response = await fetch("http://localhost:9200/_nodes/stats", {
        const response = await fetch(
            checkedClusterUrl + "/_nodes/stats/os,process",
            {
                method: "GET",
            }
        );
        const nodeStats = await response.json();
        console.log(nodeStats);

        // https://www.elastic.co/guide/en/elasticsearch/reference/current/cluster-health.html
        const clusterHealthResponse = await fetch(
            checkedClusterUrl + "/_cluster/health",
            {
                method: "GET",
            }
        );
        const clusterHealth: ElasticClusterHealthApiResponse =
            await clusterHealthResponse.json();
        console.log(clusterHealth);

        // https://www.elastic.co/guide/en/elasticsearch/reference/current/cluster-state.html#cluster-state-api-path-params
        const electedMasterResponse = await fetch(
            checkedClusterUrl + "/_cluster/state/master_node",
            {
                method: "GET",
            }
        );
        const electedMaster: ElasticClusterStateMasterNodeApiResponse =
            await electedMasterResponse.json();
        console.log(electedMaster);

        return nodeStats;
    } catch (err) {
        // TODO: handle error notifications
        console.error(err);
    }
};
