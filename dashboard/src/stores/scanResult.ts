import { create } from "zustand";
import axios from "axios";
import { apiEndpoint } from "../config";
import { toast } from "react-toastify";

// Define Interface here

export interface IFinding {
  type: string;
  ruleId: string;
  location: ILocation;
  metadata: IMetadata;
}

interface ILocation {
  path: string;
  positions: IPositions;
}

interface IPositions {
  begin: {
    line: number;
  };
}

interface IMetadata {
  description: string;
  severity: "LOW" | "MEDIUM" | "HIGH";
}

export interface IScanResult {
  id?: string;
  status: "Queued" | "In Progress" | "Success" | "Failure";
  repositoryName: string;
  findings: IFinding[];
  queuedAt: string;
  scanningAt?: string;
  finishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

interface ScanResultState {
  scanResults: IScanResult[];
  scanResult: IScanResult;
  getScanResults: () => void;
  getScanResult: (id: string) => void;
  createScanResult: (scanResult: IScanResult) => void;
  loading: boolean;
}

const handleRequest = async (
  request: () => Promise<any>,
  successMessage?: string,
  errorMessage?: string
) => {
  try {
    const response = await request();
    successMessage && toast.success(successMessage);
    return response;
  } catch (error) {
    console.error(error);
    toast.error(errorMessage);
    throw error;
  }
};

export const createScanResultStore = create<ScanResultState>((set, get) => ({
  scanResults: [],
  scanResult: {
    id: "",
    status: "Queued",
    repositoryName: "",
    findings: [],
    queuedAt: "",
    scanningAt: "",
    finishedAt: "",
    createdAt: "",
    updatedAt: "",
  },
  loading: false,

  getScanResults: async () => {
    await handleRequest(
      async () => {
        const result = await axios.get(apiEndpoint + "scan-results");
        const { data } = result.data;
        set({ scanResults: data || [] });
      },
      "",
      "Failed to load scan results"
    );
  },

  createScanResult: async (scanResult: IScanResult) => {
    await handleRequest(
      async () => {
        await axios.post(apiEndpoint + "scan-results", {
          ...scanResult,
        });
        get().getScanResults();
      },
      "Scan result created successfully",
      "Failed to create scan result"
    );
  },

  getScanResult: async (id: string) => {
    await handleRequest(
      async () => {
        const result = await axios.get(apiEndpoint + "scan-results/" + id);
        const { data } = result.data;
        set({ scanResult: data || [] });
      },

      "",
      "Failed to load scan results"
    );
  },
}));
