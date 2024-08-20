import { dataSource } from "./data-source";
import { ScanResult } from "../entity/ScanResult";

export class ScanResultRepository {
  public async createScanResult(
    scanResultData: ScanResult
  ): Promise<ScanResult> {
    return await dataSource.manager
      .getRepository(ScanResult)
      .save(scanResultData);
  }

  public async getAllScanResults(): Promise<ScanResult[]> {
    return await dataSource.manager.getRepository(ScanResult).find({
      order: {
        createdAt: "desc",
      },
    });
  }

  public async getScanResultById(id: string): Promise<ScanResult | null> {
    return await dataSource.manager.getRepository(ScanResult).findOneBy({ id });
  }
}
