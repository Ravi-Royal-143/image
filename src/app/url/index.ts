import { environment } from "src/environments/environment";

export const baseURL = environment.baseURL

export const imageUrl = {
    upload: baseURL + '/upload',
    list: baseURL + '/list',
    delete: baseURL + '/delete/<PATH>'
}
