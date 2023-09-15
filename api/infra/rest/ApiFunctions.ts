import { APIRequestContext } from "@playwright/test";
import { type } from "os";

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

type Headers = {
    'Content-Type': 'application/json',
    'Accept'?: 'application/json',
}

export class ApiFunctions {
    private baseUrl = process.env.GORESTAPI_BASE_URL;



    constructor(protected apiRequestContext: APIRequestContext) {
        this.apiRequestContext = apiRequestContext;
    }

    public async get<T>(url = this.baseUrl, data: { [key: string]: T }) {
        const response = await this.apiRequestContext.get(url as string, {
            headers: {
                'Content-Type': 'application/json'
            },

            data,
        })
        return response;
    }

    public async put<T>(baseUrl = this.baseUrl, data: { [key: string]: T }, options?: { tokenRequired?: boolean, token?: string, multipart?: boolean, multipartKey?: string }) {
        const contentHeaders = {
            'Content-Type?': 'application/json',
            'Accept?': 'application/json',
        }
        const response = this.apiRequestContext.put(baseUrl as string, {
            headers: contentHeaders,
            data,
        })
        if (options?.tokenRequired) {
            contentHeaders['Authorization '] = options.token;
        }

        if (options?.multipart) {
            delete contentHeaders['Content-Type']
        }

        return response;
    }

    public async patch<T>(baseUrl = this.baseUrl, data: { [key: string]: T }, options?: { tokenRequired?: boolean, token?: string }) {
        const contentHeaders = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
        const response = this.apiRequestContext.patch(baseUrl as string, {
            headers: contentHeaders,
            data,
        })
        if (options?.tokenRequired) {
            contentHeaders['Authorization '] = options.token;
        }


        return response;
    }
}