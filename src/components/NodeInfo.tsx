import React from "react";
import RbTable from "react-bootstrap/Table";
import { useTable } from "react-table";
import { useAppSelector } from "../app/hooks";
import {
    selectClusterNodeStats,
    selectMasterNodeName,
} from "../features/elastic/elasticSlice";
import { mapClusterNodeStatsComponentData } from "../utils/mappers.utils";

type Props = {};

// _cat/nodes?v=true&h=heap.percent,ram.percent,cpu,master,name,u

const NodeInfo = (props: Props) => {
    const clusterNodeStats = useAppSelector(selectClusterNodeStats);
    const masterNode = useAppSelector(selectMasterNodeName);

    const mappedData = mapClusterNodeStatsComponentData(
        clusterNodeStats,
        masterNode
    );
    const data = React.useMemo(() => mappedData, [mappedData]);

    const columns = React.useMemo(
        () => [
            {
                Header: "Master",
                accessor: "master",
            },
            {
                Header: "Node Name",
                accessor: "nodeName",
            },
            {
                Header: "Heap %",
                accessor: "heapPct",
            },
            {
                Header: "RAM %",
                accessor: "ramPct",
            },
            {
                Header: "CPU %",
                accessor: "cpuPct",
            },
            {
                Header: "Node Uptime",
                accessor: "nodeUptime",
            },
        ],
        []
    );

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        // FIXME - typing for this are incorrect
        //@ts-expect-error
        useTable({ columns, data });
    return (
        <RbTable
            bordered
            striped
            hover
            size="sm"
            {...getTableProps()}
            className="text-center"
        >
            <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => {
                            const { key, ...restHeaderProps } =
                                column.getHeaderProps();
                            return (
                                <th key={key} {...restHeaderProps}>
                                    {column.render("Header")}
                                </th>
                            );
                        })}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => {
                                const { key, ...restCellProps } =
                                    cell.getCellProps();

                                return (
                                    <td key={key} {...restCellProps}>
                                        {cell.render("Cell")}
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </RbTable>
    );
};

export default NodeInfo;
