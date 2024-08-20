import {
  JsonController,
  Req,
  Res,
  Get,
  Post,
  Param,
  Body,
} from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import { ScanResultService } from "../../service/scan-result";
import { handleResponse, handleErrorResponse } from "../../utils";
import { ScanResult } from "../../entity/ScanResult";

@JsonController("/scan-results")
export class ScanResultController {
  constructor(private scanResultService: ScanResultService) {
    this.scanResultService = new ScanResultService();
  }

  @OpenAPI({
    summary: "Get scan result list",
    security: [{ bearerAuth: [] }],
  })
  @Get("/")
  async getScanResults(@Req() request: any, @Res() response: any) {
    try {
      const scanResults = await this.scanResultService.getAllScanResults();
      return handleResponse(response, scanResults);
    } catch (e) {
      console.log("e", e);
      return handleErrorResponse(response, 500, "get_all_scan_results_error");
    }
  }

  @OpenAPI({
    summary: "Create scan result",
    security: [{ bearerAuth: [] }],
  })
  @Post("/")
  async createScanResult(
    @Body() scanResultData: ScanResult,
    @Res() response: any
  ) {
    try {
      const newScanResult =
        await this.scanResultService.createScanResult(scanResultData);
      return handleResponse(response, newScanResult);
    } catch (e) {
      console.log("e", e);
      return handleErrorResponse(response, 500, "create_scan_result_error");
    }
  }

  @OpenAPI({
    summary: "Get scan result by ID",
    security: [{ bearerAuth: [] }],
  })
  @Get("/:id")
  async getScanResultById(@Param("id") id: string, @Res() response: any) {
    try {
      const scanResult = await this.scanResultService.getScanResultById(id);
      if (scanResult) {
        return handleResponse(response, scanResult);
      } else {
        return handleErrorResponse(response, 404, "scan_result_not_found");
      }
    } catch (e) {
      return handleErrorResponse(response, 500, "get_scan_result_by_id_error");
    }
  }
}
