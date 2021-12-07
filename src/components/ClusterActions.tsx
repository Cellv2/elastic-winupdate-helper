import React from "react";

type Props = {};

const ClusterActions = (props: Props) => {
    return (
        <>
            <div>
                <button>Lock cluster</button>
                <span>Cluster successfully locked</span>
            </div>
            <div>
                <button>Flush cluster</button>
                <span>
                    Cluster flushed. Total: 100. Successful: 100. Failures: 0
                </span>
            </div>
            <div>
                <button>Update shard reallocation count - Lock</button>
                <span>
                    Shard allocation updated. Shard allocation set to ...
                </span>
            </div>
            <div>
                <button>Unlock cluster</button>
                <span>Cluster successfully unlocked</span>
            </div>
            <div>
                <button>Update shard reallocation count - Unlock</button>
                <span>
                    Shard allocation updated. Shard allocation set to ...
                </span>
            </div>
        </>
    );
};

export default ClusterActions;
