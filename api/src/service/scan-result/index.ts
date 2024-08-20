import { Service } from "typedi";
import { ScanResultRepository } from "../../repositories/scanResult";
import { ScanResult } from "../../entity/ScanResult";

@Service()
export class ScanResultService {
  private scanResultRepository: ScanResultRepository =
    new ScanResultRepository();

  public getAllScanResults(): Promise<ScanResult[]> {
    return this.scanResultRepository.getAllScanResults();
  }

  public createScanResult(scanResult: ScanResult): Promise<ScanResult> {
    return this.scanResultRepository.createScanResult(scanResult);
  }

  public getScanResultById(id: string): Promise<ScanResult | null> {
    return this.scanResultRepository.getScanResultById(id);
  }
}
