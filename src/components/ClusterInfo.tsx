import React from "react";
import { useTable } from "react-table";

type Props = {};

type ElasticClusterHealthInfo = {
    clusterName: string;
    status: string;
    nodeTotal: number;
    startupTime: string;
    relocating: number;
    initialising: number;
    unassigned: number;
    activeShardPct: number;
};

const ClusterInfo = (props: Props) => {
    const data = React.useMemo(
        () =>
            [
                {
                    clusterName: "es-docker-cluster",
                    status: "green",
                    nodeTotal: 3,
                    startupTime: "",
                    relocating: 0,
                    initialising: 0,
                    unassigned: 0,
                    activeShardPct: 100,
                },
            ] as ElasticClusterHealthInfo[],
        []
    );

    const columns = React.useMemo(
        () => [
            {
                Header: "Cluster Name",
                accessor: "clusterName",
            },
            {
                Header: "Status",
                accessor: "status",
            },
            {
                Header: "Node Total",
                accessor: "nodeTotal",
            },
            {
                Header: "Startup Time",
                accessor: "startupTime",
            },
            {
                Header: "Relocating",
                accessor: "relocating",
            },
            {
                Header: "initialising",
                accessor: "initialising",
            },
            {
                Header: "Unassigned",
                accessor: "unassigned",
            },
            {
                Header: "Active Shard %",
                accessor: "activeShardPct",
            },
        ],
        []
    );

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        // FIXME - typing for this are incorrect
        //@ts-expect-error
        useTable({ columns, data });
    return (
        <table {...getTableProps()} style={{ border: "solid 1px blue" }}>
            <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <th
                                {...column.getHeaderProps()}
                                style={{
                                    borderBottom: "solid 3px red",
                                    background: "aliceblue",
                                    color: "black",
                                    fontWeight: "bold",
                                }}
                            >
                                {column.render("Header")}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => {
                                return (
                                    <td
                                        {...cell.getCellProps()}
                                        style={{
                                            padding: "10px",
                                            border: "solid 1px gray",
                                            background: "#eee",
                                        }}
                                    >
                                        {cell.render("Cell")}
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default ClusterInfo;