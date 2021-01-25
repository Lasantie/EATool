
export default class DataBase {

    constructor() {
        this._apiBase = 'http://localhost:3003/';
    }

    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}` +
                `, received ${res.status}`);
        }


        return await res.json();
    }

    getData = async (db) => {
        const res = await this.getResource(`${db}/`);
        return res;
    }
}
