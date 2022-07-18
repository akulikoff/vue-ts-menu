import http from "../http-common";
class DishDataService {
  getAll() {
    return http.get("/dishes");
  }
  get(id: string) {
    return http.get(`/dishes/${id}`);
  }
  create(data: any) {
    return http.post("/dishes", data);
  }
  update(id: string, data: any) {
    return http.put(`/dishes/${id}`, data);
  }
  delete(id: string) {
    return http.delete(`/dishes/${id}`);
  }
  deleteAll() {
    return http.delete(`/dishes`);
  }
  findByTitle(title: string) {
    return http.get(`/dishes?title=${title}`);
  }
}
export default new DishDataService();