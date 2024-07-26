import axios from "axios";
const baseUrl = '../api/persons'

const getAll = () => {
    const req = axios.get(baseUrl)
    return req.then(response => response.data)
}

const create = newPerson => {
    const request = axios.post(baseUrl, newPerson)
    return request.then((response) => {
        return response.data
    })
}


const update = (id, personObj) => {
    const request = axios.put(`${baseUrl}/${id}`, personObj)
    return request.then(response => response.data)
}

const deleteObj = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

export default { getAll, create, update, deleteObj }



