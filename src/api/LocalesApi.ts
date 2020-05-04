import axios, {AxiosInstance} from "axios";

const LOCALE_URL_PREFIX = '/data/locales';

class LocalesApi {
    static instance = new LocalesApi(axios);

    constructor(private axiosInstance: AxiosInstance) {
    }

    public getLocales(locale: string): Promise<any> {
        return this.axiosInstance.get(`${LOCALE_URL_PREFIX}/${locale.toLowerCase()}.json`)
            .then(response => response.data);
    }
}

export default LocalesApi;
