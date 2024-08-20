import React from "react";
import { Table, Tag } from "antd";
import { IFinding } from "@stores/scanResult";
interface FindingsListProps {
  findings: IFinding[];
}

const FindingsList: React.FC<FindingsListProps> = ({ findings }) => {
  const columns = [
    {
      title: "RuleId",
      dataIndex: "ruleId",
      key: "ruleId",
      width: "20%",
    },
    {
      title: "Description",
      dataIndex: ["metadata", "description"],
      key: "description",
      width: "40%",
    },
    {
      title: "Severity",
      dataIndex: ["metadata", "severity"],
      key: "severity",
      width: "20%",
      render: (severity: string) => {
        let color = "";
        if (severity === "LOW") color = "green";
        if (severity === "MEDIUM") color = "orange";
        if (severity === "HIGH") color = "red";
        return <Tag color={color}>{severity}</Tag>;
      },
    },
    {
      title: "Path name : line number",
      key: "path",
      width: "20%",
      render: (_: any, record: IFinding) => (
        <span>
          {record.location.path} : {record.location.positions.begin.line}
        </span>
      ),
    },
  ];

  return (
    <Table
      className="w-full"
      bordered
      dataSource={findings}
      columns={columns}
      pagination={false}
      scroll={{ x: true }}
      rowKey={(record: IFinding) => record.ruleId}
    />
  );
};

export default FindingsList;
