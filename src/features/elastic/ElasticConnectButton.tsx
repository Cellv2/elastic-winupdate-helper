import React, { useState } from "react";
import RbButton from "react-bootstrap/Button";
import RbForm from "react-bootstrap/Form";
import RbInputGroup from "react-bootstrap/InputGroup";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getNodeInfoAsync, selectClusterInfo } from "./elasticSlice";

type Props = {};

type ElasticClusterHealthApiResponse = {
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

type ElasticClusterStateMasterNodeApiResponse = {
    cluster_name: string;
    cluster_uuid: string;
    master_node: string;
};

const getClusterStats = async (clusterUrl: string) => {
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

// TODO: maybe think about expanding this pattern?
// ports range from 0 to 65535, so [0-9]{1,5} should encompass any valid port
const clusterValidationRegex = new RegExp("^https?://.{1,}:[0-9]{1,5}/?");
const isClusterUrlValid = (clusterUrl: string): boolean => {
    return clusterValidationRegex.test(clusterUrl);
};

const ElasticConnectButton = (props: Props) => {
    const clusterInfo = useAppSelector(selectClusterInfo);
    const dispatch = useAppDispatch();
    const [isFormValid, setIsFormValid] = useState<boolean>(false);
    const [clusterConnectionVal, setClusterConnectionVal] =
        useState<string>("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        if (event) {
            const form = event.currentTarget;

            event.preventDefault(); // we don't want the page reloading

            if (form.checkValidity() === false) {
                setIsFormValid(false);
                event.stopPropagation();
            }

            setIsFormValid(true);
            console.log(clusterConnectionVal);
            if (isClusterUrlValid(clusterConnectionVal)) {
                try {
                    // await getClusterStats(clusterConnectionVal);
                    await dispatch(getNodeInfoAsync(clusterConnectionVal))
                    console.log("connected");
                    console.log("PRINTING THE THINGIES - ", clusterInfo)
                } catch (err) {
                    // TODO: handle error notifications
                    console.error(err);
                }
            } else {
                // TODO: handle error notifications
                // this shouldn't really be possible at this point, but just in case
                console.error("The connection URL was not valid");
            }
        }
    };

    // not the *exact* typing, but it'll do - https://github.com/DefinitelyTyped/DefinitelyTyped/issues/16208
    const handleClusterConnectionInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (event) {
            const value = event.target.value;
            setClusterConnectionVal(value);
        }
    };

    return (
        <div
            className="p-2"
            style={{
                background: `repeating-linear-gradient(
            -45deg,
            #bcb360,
            #bcb360 10px,
            #b89603 10px,
            #b89603 20px
          )`,
            }}
        >
            <h1>THIS IS TEMPORARY</h1>
            <RbForm
                noValidate
                validated={isFormValid}
                onSubmit={async (e) => await handleSubmit(e)}
            >
                <RbForm.Group
                    className="mb-3"
                    controlId="validationClusterConnection"
                >
                    <RbForm.Label>Cluster Connection</RbForm.Label>
                    <RbInputGroup hasValidation>
                        <RbForm.Control
                            type="text"
                            placeholder="http://cluster:port"
                            required
                            onChange={handleClusterConnectionInputChange}
                            pattern={`${clusterValidationRegex.source}`}
                            className="w-100"
                        />
                        <RbForm.Control.Feedback type="invalid">
                            Please ensure the url starts with http:// or
                            https:// and ends with a port
                        </RbForm.Control.Feedback>
                    </RbInputGroup>
                </RbForm.Group>

                <RbButton variant="primary" type="submit">
                    Connect
                </RbButton>
            </RbForm>
        </div>
    );
};

export default ElasticConnectButton;
