export class HospitableClient {
  private token: string;
  private baseUrl = "https://public.api.hospitable.com/v2";

  constructor() {
    this.token = process.env.HOSPITABLE_API_TOKEN || "";
  }

  private async fetchAPI(endpoint: string, options: RequestInit = {}): Promise<any> {
    if (!this.token) {
      throw new Error("HOSPITABLE_API_TOKEN is not set.");
    }
    
    // Add wait logic for retries
    let retries = 3;
    let delay = 1000;
    
    while (retries > 0) {
      const response = await fetch(endpoint.startsWith('http') ? endpoint : `${this.baseUrl}${endpoint}`, {
        ...options,
        headers: {
          "Authorization": `Bearer ${this.token}`,
          "Content-Type": "application/json",
          ...options.headers,
        },
      });

      if (response.ok) {
        return response.json();
      }

      if (response.status === 429 || response.status >= 500) {
        retries--;
        if (retries === 0) {
          throw new Error(`Hospitable API Error ${response.status}: Rate limit or server error`);
        }
        await new Promise(r => setTimeout(r, delay));
        delay *= 2; // Exponential backoff
        continue;
      }
      
      const errText = await response.text();
      throw new Error(`Hospitable API Error ${response.status}: ${errText}`);
    }
  }

  private async fetchAllPages(endpoint: string): Promise<any[]> {
    let results: any[] = [];
    let nextUrl: string | null = endpoint;

    while (nextUrl) {
      if (nextUrl.startsWith('http://')) {
        nextUrl = nextUrl.replace('http://', 'https://')
      }
      
      const res = await this.fetchAPI(nextUrl);
      if (res.data) {
        results = results.concat(res.data);
      }
      
      const nextLink = res.links?.next;
      if (nextLink) {
        // Hospitable's next link drops all query parameters (like properties[]), which causes 400 errors
        // Extract the page number and append it to our original endpoint instead
        const match = nextLink.match(/page=(\d+)/);
        if (match) {
          const page = match[1];
          const hasQuery = endpoint.includes('?');
          nextUrl = `${endpoint}${hasQuery ? '&' : '?'}page=${page}`;
        } else {
          nextUrl = nextLink;
        }
      } else {
        nextUrl = null;
      }
    }

    return results;
  }

  async getProperties() {
    return this.fetchAllPages("/properties");
  }

  async getReservations(params?: { start_date?: string, end_date?: string, property_id?: string, property_ids?: string[] }) {
    const urlParams = new URLSearchParams();
    if (params?.start_date) urlParams.append("start_date", params.start_date);
    if (params?.end_date) urlParams.append("end_date", params.end_date);
    if (params?.property_id) urlParams.append("properties[]", params.property_id);
    
    // Also support passing an array of property IDs for mass sync
    if ((params as any)?.property_ids && Array.isArray((params as any).property_ids)) {
      (params as any).property_ids.forEach((id: string) => {
        urlParams.append("properties[]", id);
      });
    }
    
    // Include financials!
    urlParams.append("include", "financials");
    urlParams.append("per_page", "100");

    // Hospitable API does not accept URL-encoded brackets like properties%5B%5D
    // It specifically wants properties[]=id
    const queryString = urlParams.toString().replace(/%5B/g, '[').replace(/%5D/g, ']');

    return this.fetchAllPages(`/reservations?${queryString}`);
  }
}
