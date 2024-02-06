/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface ModelsPayload {
  description?: string;
  desired_price?: number;
  detailed_desc?: string;
  flight_date_end?: string;
  flight_date_start?: string;
  img_url?: string;
  is_available?: boolean;
  load_capacity?: number;
  payload_id?: number;
  title?: string;
  count?: number;
}

export interface ModelsRocketFlight {
  confirmed_at?: string;
  created_at?: string;
  creator_id?: number;
  creator_login?: string;
  flight_date?: string;
  flight_id?: number;
  formed_at?: string;
  load_capacity?: number;
  moderator_id?: number;
  moderator_login?: string;
  place_number?: number;
  price?: number;
  status?: string;
  title?: string;
}

export interface ModelsUser {
  email?: string;
  is_admin?: boolean;
  /** @maxLength 64 */
  login: string;
  /**
   * @minLength 6
   * @maxLength 64
   */
  password: string;
  userId?: number;
}

export interface ModelsUserLogin {
  /** @maxLength 64 */
  login: string;
  /**
   * @minLength 8
   * @maxLength 64
   */
  password: string;
}

export interface ModelsUserSignUp {
  email?: string;
  /** @maxLength 64 */
  login: string;
  /**
   * @minLength 8
   * @maxLength 64
   */
  password: string;
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "http://localhost:8080" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Satellite launch application
 * @version 1.0
 * @baseUrl http://localhost:8080
 * @contact
 *
 * Web application on the topic "Launching satellites from the Vostochny cosmodrome"
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  checkAuth = {
    /**
     * @description Retrieves user information based on the provided user context
     *
     * @tags Authentication
     * @name CheckAuthList
     * @summary Check user authentication
     * @request GET:/check-auth
     */
    checkAuthList: (params: RequestParams = {}) =>
      this.request<ModelsUser, string>({
        path: `/check-auth`,
        method: "GET",
        withCredentials: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  flightsPayloads = {
    /**
     * @description Remove a payload from a planned flight.
     *
     * @tags Flights Payloads
     * @name PayloadDelete
     * @summary Remove payload from flight
     * @request DELETE:/flights_payloads/payload/{id}
     */
    payloadDelete: (id: number, params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/flights_payloads/payload/${id}`,
        method: "DELETE",
        withCredentials: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Change the count of a payload for a planned flight.
     *
     * @tags Flights Payloads
     * @name PayloadCountUpdate
     * @summary Change payload count for flight
     * @request PUT:/flights_payloads/payload/{id}/count/{count}
     */
    payloadCountUpdate: (id: number, count: number, params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/flights_payloads/payload/${id}/count/${count}`,
        method: "PUT",
        withCredentials: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  logout = {
    /**
     * @description Logs out the user by blacklisting the access token
     *
     * @tags Authentication
     * @name LogoutCreate
     * @summary Logout
     * @request POST:/logout
     */
    logoutCreate: (params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/logout`,
        method: "POST",
        withCredentials: true,
        type: ContentType.Json,
        ...params,
      }),
  };
  payloads = {
    /**
     * @description Retrieves a list of payloads based on the provided filters
     *
     * @tags Payloads
     * @name PayloadsList
     * @summary Get Payload List
     * @request GET:/payloads
     */
    payloadsList: (
      query?: {
        /** Space Satellite */
        space_satellite?: string;
        /** Load Capacity Start */
        load_capacity_start?: string;
        /** Load Capacity End */
        load_capacity_end?: string;
        /** Flight Date Start */
        flight_date_start?: string;
        /** Flight Date End */
        flight_date_end?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ModelsPayload[], any>({
        path: `/payloads`,
        method: "GET",
        withCredentials: true,
        query: query,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Create a new payload with the provided details.
     *
     * @tags Payloads
     * @name PayloadsCreate
     * @summary Create new payload
     * @request POST:/payloads
     */
    payloadsCreate: (
      data: {
        /** Title of the payload */
        title: string;
        /**
         * Image file of the payload
         * @format binary
         */
        image: File;
        /** Load capacity of the payload */
        load_capacity?: string;
        /** Description of the payload */
        description?: string;
        /** Detailed description of the payload */
        detailed_description?: string;
        /** Desired price of the payload */
        desired_price?: string;
        /** Start date of the payload */
        flight_date_start: string;
        /** End date of the payload */
        flight_date_end: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<string, any>({
        path: `/payloads`,
        method: "POST",
        withCredentials: true,
        body: data,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * @description Adds a specified payload to a planned flight. The user must provide their creator ID and the payload ID in the request body.
     *
     * @tags Payloads
     * @name RocketFlightCreate
     * @summary Add Payload to Flight
     * @request POST:/payloads/rocket_flight/{payload}
     */
    rocketFlightCreate: (payload: number, params: RequestParams = {}) =>
      this.request<number, any>({
        path: `/payloads/rocket_flight/${payload}`,
        method: "POST",
        withCredentials: true,
        // body: query,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Retrieve the payload associated with a specific card ID
     *
     * @tags Payloads
     * @name PayloadsDetail
     * @summary Get card payload by ID
     * @request GET:/payloads/{id}
     */
    payloadsDetail: (id: number, params: RequestParams = {}) =>
      this.request<ModelsPayload, any>({
        path: `/payloads/${id}`,
        method: "GET",
        withCredentials: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Update the details of an existing payload.
     *
     * @tags Payloads
     * @name PayloadsUpdate
     * @summary Update existing payload
     * @request PUT:/payloads/{id}
     */
    payloadsUpdate: (
      id: number,
      data: {
        /** Title of the payload */
        title?: string;
        /** Image file of the payload */
        image?: File;
        /** Load capacity of the payload */
        load_capacity?: string;
        /** Description of the payload */
        description?: string;
        /** Detailed description of the payload */
        detailed_description?: string;
        /** Desired price of the payload */
        desired_price?: string;
        /** Start date of the payload */
        flight_date_start?: string;
        /** End date of the payload */
        flight_date_end?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<string, any>({
        path: `/payloads/${id}`,
        method: "PUT",
        withCredentials: true,
        body: data,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * @description Delete a payload with the provided ID.
     *
     * @tags Payloads
     * @name PayloadsDelete
     * @summary Delete payload by ID
     * @request DELETE:/payloads/{id}
     */
    payloadsDelete: (id: number, params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/payloads/${id}`,
        method: "DELETE",
        withCredentials: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  ping = {
    /**
     * @description very very friendly response
     *
     * @tags Tests
     * @name PingList
     * @summary Show hello text
     * @request GET:/ping
     */
    pingList: (params: RequestParams = {}) =>
      this.request<Record<string, any>, any>({
        path: `/ping`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  profile = {
    /**
     * @description Update the profile of the currently logged-in user. Allows changing login, password, and email.
     *
     * @tags Authentication
     * @name ProfileUpdate
     * @summary Update Profile
     * @request PUT:/profile
     * @secure
     */
    profileUpdate: (user: ModelsUserSignUp, params: RequestParams = {}) =>
      this.request<Record<string, any>, Record<string, any>>({
        path: `/profile`,
        method: "PUT",
        withCredentials: true,
        body: user,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  rocketFlights = {
    /**
     * @description Retrieve a list of rocket flights based on the provided query parameters.
     *
     * @tags RocketFlights
     * @name RocketFlightsList
     * @summary Get rocket flight list
     * @request GET:/rocket_flights
     */
    rocketFlightsList: (
      query?: {
        /** Start date of the formation period */
        form_date_start?: string;
        /** End date of the formation period */
        form_date_end?: string;
        /** Status of the flight */
        status?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ModelsRocketFlight[], any>({
        path: `/rocket_flights`,
        method: "GET",
        withCredentials: true,
        query: query,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Update the details of a rocket flight.
     *
     * @tags RocketFlights
     * @name RocketFlightsUpdate
     * @summary Change rocket flight
     * @request PUT:/rocket_flights
     */
    rocketFlightsUpdate: (flightDetails: ModelsRocketFlight, params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/rocket_flights`,
        method: "PUT",
        withCredentials: true,
        body: flightDetails,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Delete a rocket flight draft.
     *
     * @tags RocketFlights
     * @name RocketFlightsDelete
     * @summary Delete rocket flight
     * @request DELETE:/rocket_flights
     */
    rocketFlightsDelete: (params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/rocket_flights`,
        method: "DELETE",
        withCredentials: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Form a rocket flight.
     *
     * @tags RocketFlights
     * @name FormCreate
     * @summary Form rocket flight
     * @request POST:/rocket_flights/form
     */
    formCreate: (flightStatus: ModelsRocketFlight, params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/rocket_flights/form`,
        method: "POST",
        withCredentials: true,
        body: flightStatus,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Retrieve a rocket flight and its associated payloads based on the provided ID.
     *
     * @tags RocketFlights
     * @name RocketFlightsDetail
     * @summary Get rocket flight by ID
     * @request GET:/rocket_flights/{id}
     */
    rocketFlightsDetail: (id: number, params: RequestParams = {}) =>
      this.request<ModelsPayload[], any>({
        path: `/rocket_flights/${id}`,
        method: "GET",
        withCredentials: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Update the status of a rocket flight.
     *
     * @tags RocketFlights
     * @name ResponseUpdate
     * @summary Response rocket flight
     * @request PUT:/rocket_flights/{id}/response
     */
    responseUpdate: (id: number, flightStatus: ModelsRocketFlight, params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/rocket_flights/${id}/response`,
        method: "PUT",
        withCredentials: true,
        body: flightStatus,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  signIn = {
    /**
     * @description Authenticates a user and generates an access token
     *
     * @tags Authentication
     * @name SignInCreate
     * @summary User sign-in
     * @request POST:/sign_in
     */
    signInCreate: (user: ModelsUserLogin, params: RequestParams = {}) =>
      this.request<Record<string, any>, any>({
        path: `/sign_in`,
        method: "POST",
        withCredentials: true,
        body: user,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  signup = {
    /**
     * @description Register a new user account. The user will receive a JWT token upon successful registration.
     *
     * @tags Authentication
     * @name SignupCreate
     * @summary Sign up a new user
     * @request POST:/sign_up
     */
    signupCreate: (user: ModelsUserSignUp, params: RequestParams = {}) =>
      this.request<Record<string, any>, Record<string, any>>({
        path: `/sign_up`,
        method: "POST",
        withCredentials: true,
        body: user,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
