import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 1000,
  withCredentials: true,
  validateStatus:false,
});

export default class PatientsApi {
  static allPatients() {
    return instance
      .get("/api/patients/all")
      .then(res => res.data)
      .catch(err => console.log(err));
  }
  static search(query) {
    return instance
      .get(`/api/patients/search?q=${query}`)
      .then(res => res.data)
      .catch(err => console.log(err));
  }

  static getPatient(id) {
    return instance
      .get(`/api/patients/record/${id}`)
      .then(res => res)
      .catch(err => console.log(err));
  }

  static addRecord(record, id) {
    return instance
      .post(`/api/patients/record/add`, { record, id })
      .then(res => res.data)
      .catch(err => console.log(err));
  }

  static addPatient(patient) {
    return instance
      .post("/api/patients/create", { patient })
      .then(res => res.data)
      .catch(e => console.log(e));
  }
}