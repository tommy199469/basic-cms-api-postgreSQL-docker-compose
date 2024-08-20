import React, { useEffect } from "react";
import { Table, Tag, Badge, Button } from "antd";
import { createScanResultStore, IScanResult } from "@/stores/scanResult";
import { useRouter } from "next/router";

const Dashboard = () => {
  const { scanResults, getScanResults } = createScanResultStore();
  const router = useRouter();

  useEffect(() => {
    getScanResults();
  }, [getScanResults]);

  const columns: any[] = [
    {
      title: "Repository Name",
      dataIndex: "repositoryName",
      key: "repositoryName",
      width: "30%",
    },
    {
      title: "Scan Status",
      dataIndex: "status",
      key: "status",
      width: "20%",
      render: (status: string) => {
        let color = "blue";
        if (status === "Queued") color = "orange";
        if (status === "In Progress") color = "cyan";
        if (status === "Success") color = "green";
        if (status === "Failure") color = "red";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Findings",
      dataIndex: "findings",
      key: "findings",
      width: "20%",
      render: (findings: any) => {
        const lowSeverityCount =
          findings?.filter(
            (finding: any) => finding.metadata.severity === "LOW"
          ).length || 0;
        const mediumSeverityCount =
          findings?.filter(
            (finding: any) => finding.metadata.severity === "MEDIUM"
          ).length || 0;
        const highSeverityCount =
          findings?.filter(
            (finding: any) => finding.metadata.severity === "HIGH"
          ).length || 0;

        return (
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <Badge
                showZero
                count={lowSeverityCount}
                style={{ backgroundColor: "#52c41a" }}
                title="Low Severity"
              />
              <p className="text-sm font-medium text-gray-700">Low Severity</p>
            </div>

            <div className="flex items-center space-x-2">
              <Badge
                showZero
                count={mediumSeverityCount}
                style={{ backgroundColor: "#faad14" }}
                title="Medium Severity"
              />
              <p className="text-sm font-medium text-gray-700">
                Medium Severity
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <Badge
                showZero
                count={highSeverityCount}
                style={{ backgroundColor: "#f5222d" }}
                title="High Severity"
              />
              <p className="text-sm font-medium text-gray-700">High Severity</p>
            </div>
          </div>
        );
      },
    },
    {
      title: "Timestamp",
      key: "timestamp",
      width: "30%",
      render: (record: IScanResult) => {
        const { status, queuedAt, scanningAt = "", finishedAt = "" } = record;
        let timestamp = queuedAt;
        if (status === "In Progress") timestamp = scanningAt;
        if (status === "Success" || status === "Failure")
          timestamp = finishedAt;
        return timestamp ? new Date(timestamp).toLocaleString() : "-";
      },
    },

    {
      title: "Action",
      key: "action",
      width: "10%",
      render: (_: any, record: IScanResult) => {
        return (
          <Button
            onClick={() => router.push(`/scan-details/${record.id}`)}
            type="link"
            style={{ marginRight: 8 }}
          >
            View Details
          </Button>
        );
      },
    },
  ];

  return (
    <div className="flex flex-col items-center min-h-screen p-m w-full">
      <Table
        className="w-full"
        bordered
        dataSource={scanResults}
        columns={columns}
        pagination={false}
        scroll={{ x: true }}
        rowKey={(record: IScanResult) => record.id || ""}
      />

      <Button
        onClick={() => router.push("/result-form")}
        type="primary"
        className="mt-xxl w-[50%]"
      >
        Add Scan Result
      </Button>
    </div>
  );
};

export default Dashboard;
