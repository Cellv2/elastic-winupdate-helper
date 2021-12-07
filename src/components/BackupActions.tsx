import React from "react";

type Props = {};

const BackupActions = (props: Props) => {
    return (
        <>
            <h2>Cluster Backups</h2>
            <div>
                <button>Backup cluster settings</button>
            </div>
            <div>
                <button>View saved settings</button>
            </div>
            <div>
                <button>Restore cluster settings</button>
            </div>
        </>
    );
};

export default BackupActions;
