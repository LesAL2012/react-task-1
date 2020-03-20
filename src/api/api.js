import * as axios from "axios";

const instance = axios.create({
    baseURL: 'https://react-task-1.ts.biz.ua/',
});

export const getData = {
   
    getUsersClientsTasks(queryString) {
        return instance.get('getData.php?' + queryString)
            .then(response => {
                //return response.data;
                if (response.status === 200) {
                    return response.data;
                } else {
                    alert('Some trouble with server or network - try to connect again')
                }
            });
    }
}
