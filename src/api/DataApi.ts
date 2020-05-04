import axios, {AxiosInstance} from 'axios';
import {IData} from "../models/IData";

const DATA_URL = '/data/data.json';

class DataApi {
    static instance = new DataApi(axios);

    constructor(private axiosInstance: AxiosInstance) {
    }

    public getData(): Promise<IData> {
        return this.axiosInstance.get<IData>(DATA_URL)
            .then(response => (response.data))
    }
}

export default DataApi;
