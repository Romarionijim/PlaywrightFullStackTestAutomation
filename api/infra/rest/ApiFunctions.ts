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
    private baseUrl = process.env.GORESTAPI_BASE_URL;

    constructor(protected apiRequestContext: APIRequestContext) {
        this.apiRequestContext = apiRequestContext;
    }

    public async get(url: BaseUrl, params?: Record<string, string>) {
        const response = await this.apiRequestContext.get(url.valueOf(), {
            headers: {
                'Content-Type': 'application/json'
            },
            params: params,
        })
        return response;
    }

    public async post<T>(baseUrl: BaseUrl, data: { [key: string]: T }, options?: { tokenRequired?: boolean, token?: string }) {
        const contentHeaders = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
        const response = await this.apiRequestContext.put(baseUrl.valueOf(), {
            headers: contentHeaders,
            data,
        })
        if (options?.tokenRequired) {
            contentHeaders['Authorization'] = options.token;
        }
        return response;
    }

    public async put<T>(baseUrl: BaseUrl, data: { [key: string]: T }, options?: { tokenRequired?: boolean, token?: string }) {
        const contentHeaders = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
        const response = await this.apiRequestContext.put(baseUrl.valueOf(), {
            headers: contentHeaders,
            data,
        })
        if (options?.tokenRequired) {
            contentHeaders['Authorization'] = options.token;
        }
        return response;
    }

    public async patch<T>(baseUrl: BaseUrl, data: { [key: string]: T }, options?: { tokenRequired?: boolean, token?: string }) {
        const contentHeaders = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
        const response = await this.apiRequestContext.patch(baseUrl.valueOf(), {
            headers: contentHeaders,
            data,
        })
        if (options?.tokenRequired) {
            contentHeaders['Authorization'] = options.token;
        }
        return response;
    }

    public async delete<T>(url: BaseUrl, data: { [key: string]: T }, options?: { tokenRequired?: boolean, token?: string }) {
        const contentHeaders = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
        const response = await this.apiRequestContext.delete(url.valueOf(), {
            headers: contentHeaders,
            data,
        })
        if (options?.tokenRequired) {
            contentHeaders['Authorization'] = options.token;
        }
        return response;
    }
}