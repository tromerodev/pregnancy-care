import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 1000,
  withCredentials: true
});

export default class AuthApi {
  static currentUser() {
    return instance
      .get("/api/auth/currentUser")
      .then(res => res.data)
      .catch(err => console.log(err));
  }
  static signup(name, surname, email, password) {
    return instance
      .post("/api/auth/signup", { name, surname, email, password })
      .then(res => res.data.user)
      .catch(err => console.log(err));
  }

  static edit(
    name,
    surname,
    email,
    idNum,
    street,
    number,
    city,
    state,
    zip,
    bornDate,
    phone,
    id
  ) {
    return instance
      .put("/api/auth/edit", {
        name,
        surname,
        email,
        idNum,
        street,
        number,
        city,
        state,
        zip,
        bornDate,
        phone,
        id
      })
      .then(res => res.data.user)
      .catch(err => console.log(err));
  }

  static login(email, password) {
    return instance
      .post(
        "/api/auth/login",
        { email, password }
      )
      .then(res => res.data.user)
      .catch(err => console.log(err));
  }

  static logout() {
    return instance
      .get("/api/auth/logout")
      .then(res => res)
      .catch(err => console.log(err));
  }
}
