import React from "react";
import RbForm from "react-bootstrap/Form";
import RbButton from "react-bootstrap/Button";

type Props = {};

const getClusterStats = async () => {
    try {
        const response = await fetch("http://localhost:9200/_cat/nodes", {
            method: "GET",
        });
        console.log(response)
        return await response.json();
    } catch (err) {
        console.error(err);
    }
};

const ElasticConnectButton = (props: Props) => {
    const handleConnectOnClick = async (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        if (event) {
            event.preventDefault();
            // not sure this is needed yet
            // event.persist();
            console.log("awdasdawdasdw");
            const clusterStats = await getClusterStats();
            // console.log(clusterStats);
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
            <RbForm>
                <RbForm.Group className="mb-3" controlId="clusterName">
                    <RbForm.Label>Cluster Connection</RbForm.Label>
                    <RbForm.Control type="email" placeholder="cluster:port" />
                    <RbForm.Text className="text-muted">
                        Please enter the URL of the cluster
                    </RbForm.Text>
                </RbForm.Group>
                <RbButton
                    variant="primary"
                    type="submit"
                    onClick={async (e) => await handleConnectOnClick(e)}
                >
                    Connect
                </RbButton>
            </RbForm>
        </div>
    );
};

export default ElasticConnectButton;
