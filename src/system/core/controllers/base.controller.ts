import { index } from "../index";

import {
  successResponse,
  errorResponse,
  notFoundResponse,
  validationError,
  unauthorizedResponse
} from '../helpers/apiResponse.helper';

import { log, error, info } from '../helpers/errorLogs.helper';

import { IRequest, IResponse, INext } from '../interfaces/index';

class baseController implements index {

  public service: any
  public success: any
  public notFound: any
  public error: any
  public validationError: any
  public unauthorized: any

  public log: any
  public errorLog: any
  public infoLog: any

  /**
   * Base Controller Layer
   * @author Ujjwal Bera
   * @param null
   */
  constructor(service: any) {

    this.service = service;
    this.success = successResponse;
    this.notFound = notFoundResponse;
    this.error = errorResponse;
    this.validationError = validationError;
    this.unauthorized = unauthorizedResponse;

    this.log = log;
    this.errorLog = error;
    this.infoLog = info;
  }

  async getAll(req: IRequest, res: IResponse, next: INext) {
    try {
      const response = await this.service.getAll(req.query);
      return res.status(200).json(this.success(response));
    } catch (e) {
      next(e);
    }
  }

  async get(req: IRequest, res: IResponse, next: INext) {
    const { id } = req.params;

    try {
      const response = await this.service.get(id);
      return res.status(200).json(this.success(response));
    } catch (e) {
      next(e);
    }
  }

  async insert(req: IRequest, res: IResponse, next: INext) {
    try {
      const response = await this.service.insert(req.body);
      return res.status(200).json(this.success(response));
    } catch (e) {
      next(e);
    }
  }

  async update(req: IRequest, res: IResponse, next: INext) {
    const { id } = req.params;

    try {
      const response = await this.service.update(id, req.body);
      return res.status(200).json(this.success(response));
    } catch (e) {
      next(e);
    }
  }

  async delete(req: IRequest, res: IResponse, next: INext) {
    const { id } = req.params;

    try {
      const response = await this.service.delete(id);
      return res.status(200).json(this.success(response));
    } catch (e) {
      next(e);
    }
  }
}

export default { baseController };
