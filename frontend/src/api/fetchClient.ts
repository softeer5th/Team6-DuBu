interface RequestProps {
  method: 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT';
  body?: Record<string, string | number | string[] | boolean | null>;
  headers?: Record<string, string>;
}

type FetchProps = Omit<RequestProps, 'method'>;

const fetchClient = {
  async request<T = void>(url: string, { method, body, headers }: RequestProps): Promise<T> {
    try {
      const accessToken = localStorage.getItem('accessToken');

      const response = await fetch(url, {
        method,
        body: body && JSON.stringify(body),
        headers: {
          ...headers,
          'Content-Type': 'application/json',
          ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
        },
      });

      if (!response.ok) {
        throw new Error('API ERROR 발생');
      }

      if (response.status === 204) {
        return undefined as T;
      }

      return await response.json();
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },

  get<T = void>(url: string, options: FetchProps = {}): Promise<T> {
    return this.request<T>(url, { method: 'GET', headers: options.headers });
  },
  post<T = void>(url: string, options: FetchProps = {}): Promise<T> {
    return this.request(url, {
      method: 'POST',
      body: options.body,
      headers: options.headers,
    });
  },
  delete<T = void>(url: string, options: FetchProps = {}): Promise<T> {
    return this.request(url, { method: 'DELETE', headers: options.headers });
  },
  patch<T = void>(url: string, options: FetchProps = {}): Promise<T> {
    return this.request(url, {
      method: 'PATCH',
      body: options.body,
      headers: options.headers,
    });
  },
  put<T = void>(url: string, options: FetchProps = {}): Promise<T> {
    return this.request(url, { method: 'PUT', headers: options.headers });
  },
};

export default fetchClient;
