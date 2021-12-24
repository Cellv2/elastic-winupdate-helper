import React from "react";
import RbTable from "react-bootstrap/Table";
import { useTable } from "react-table";
import { useAppSelector } from "../app/hooks";
import { CLUSTER_INFO_COLUMNS } from "../constants/component.constants";
import { selectClusterHealth } from "../features/elastic/elasticSlice";
import { mapClusterHealthComponentData } from "../utils/mappers.utils";

type Props = {};

const ClusterInfo = (props: Props) => {
    const clusterHealth = useAppSelector(selectClusterHealth);

    const mappedData = mapClusterHealthComponentData(clusterHealth);
    const data = React.useMemo(() => [mappedData], [mappedData]);

    const columns = React.useMemo(() => CLUSTER_INFO_COLUMNS, []);

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        // FIXME - typing for this are incorrect
        //@ts-expect-error
        useTable({ columns, data });

    return (
        <RbTable
            striped
            bordered
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

export default ClusterInfo;
