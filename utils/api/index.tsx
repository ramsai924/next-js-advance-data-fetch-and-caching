class ApiServiceMethods {
    private request = async (URL: string, options: RequestInit) => {
        try {
            const response = await fetch(URL, options);
            return response.json();
        } catch (err: any) {
            throw err;
        }
    }

    GET = async (URL: string, token: string, headers?: any) => {
         return this.request(URL, {
            method: 'GET',
            headers: {
            'Authorization': `Bearer ${token}`,
            ...headers
        }
        });
    }

    POST = (URL: string, body: any, token: string, headers?: any) => {
    
        return this.request(URL, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Authorization': `Bearer ${token}`,
                ...headers
            }
        });
    }

    PATCH = (URL: string, body: any, headers?: any) => {
        return this.request(URL, {
            method: 'PATCH',
            body: JSON.stringify(body),
            ...headers
        });
    }

    DELETE = (URL: string, headers?: any) => {
        return this.request(URL, {
            method: 'DELETE',
            ...headers
        });
    }
}

export default ApiServiceMethods
