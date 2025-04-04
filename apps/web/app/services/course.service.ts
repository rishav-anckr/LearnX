import api from "./api";

export interface CourseData {
  id?: number;
  title: string;
  description?: string;
  thumbnail?: string;
  price?: number;
  level?: string;
  duration?: number;
  status?: string;
  instructorId?: number;
}

export const courseService = {
  async getAllCourses(): Promise<CourseData[]> {
    const response = await api.get("/courses");
    return response.data;
  },

  async getCourseById(id: number): Promise<CourseData> {
    const response = await api.get(`/courses/${id}`);
    return response.data;
  },

  async createCourse(data: CourseData): Promise<CourseData> {
    const response = await api.post("/courses", data);
    return response.data;
  },
};
