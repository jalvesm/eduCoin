import axios from "axios";
import { Vantagem } from "../types/student"; 

export const studentService = {
  async getAllVantagens(): Promise<Vantagem[]> {
    const response = await axios.get("http://localhost:8080/vantagens");
    return response.data;
    },
    
    
};