import { APIRequestContext } from "@playwright/test";
import { BaseUrl } from "../../baseUrls/BaseUrl";

export enum StatusCode {
    OK = 200,
    CREATED = 201,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    SERVER_ERROR = 500,
}

export class ApiFunctions {

    constructor(protected apiRequestContext: APIRequestContext) {
        this.apiRequestContext = apiRequestContext;
    }

    public async get(url: string, params?: Record<string, string>) {
        const response = await this.apiRequestContext.get(url, {
            headers: {
                'Content-Type': 'application/json'
            },
            params: params,
        })
        return response;
    }

    public async post<T>(baseUrl: string, data: { [key: string]: T }, options?: { tokenRequired?: boolean, token?: string }) {
        const contentHeaders = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }

        if (options?.tokenRequired) {
            contentHeaders['Authorization'] = `Bearer ${options.token}`;
        }
        const response = await this.apiRequestContext.post(baseUrl, {
            headers: contentHeaders,
            data,
        })

        return response;
    }

    public async put<T>(baseUrl: BaseUrl, data: { [key: string]: T }, options?: { tokenRequired?: boolean, token?: string }) {
        const contentHeaders = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }

        if (options?.tokenRequired) {
            contentHeaders['Authorization'] = `Bearer ${options.token}`;
        }

        const response = await this.apiRequestContext.put(baseUrl, {
            headers: contentHeaders,
            data,
        })

        return response;
    }

    public async patch<T>(baseUrl: string, data: { [key: string]: T }, options?: { tokenRequired?: boolean, token?: string }) {
        const contentHeaders = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
        if (options?.tokenRequired) {
            contentHeaders['Authorization'] = `Bearer ${options.token}`;
        }
        const response = await this.apiRequestContext.patch(baseUrl, {
            headers: contentHeaders,
            data,
        })

        return response;
    }

    public async delete<T>(url: string, options?: { tokenRequired?: boolean, token?: string }) {
        const contentHeaders = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
        if (options?.tokenRequired) {
            contentHeaders['Authorization'] = `Bearer ${options.token}`;
        }
        const response = await this.apiRequestContext.delete(url, {
            headers: contentHeaders,
        })
        return response;
    }
}