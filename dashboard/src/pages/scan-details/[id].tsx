import React, { useEffect, useState } from "react";
import FindingsList from "@components/FindingList";
import { useRouter } from "next/router";
import { createScanResultStore, IFinding } from "@/stores/scanResult";
import { Button } from "antd";

const ScanDetails = () => {
  const router = useRouter();
  const { scanResult, getScanResult } = createScanResultStore();
  const [selectedFindings, setSelectedFindings] = useState<IFinding[]>([]);

  useEffect(() => {
    const { id } = router.query;

    // Handle both string and array of strings
    const scanId = Array.isArray(id) ? id[0] : id;

    if (scanId) {
      getScanResult(scanId);
    }
  }, [router.query]);

  return (
    <div className="flex flex-col items-center mt-[10%] min-h-screen p-m w-full">
      <h1 className="text-white mb-m">Findings for Selected Security Scan</h1>
      <FindingsList findings={scanResult.findings} />

      <div className="flex w-full justify-end mt-m">
        <Button type="primary" onClick={() => router.push("/")}>
          Back
        </Button>
      </div>
    </div>
  );
};

export default ScanDetails;
