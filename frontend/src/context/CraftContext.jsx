// src/context/CraftContext.jsx
import { createContext, useEffect, useState } from "react";
import api from "../api/axios";

export const CraftContext = createContext();

export const CraftProvider = ({ children }) => {
  const [materials, setMaterials] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch materials and projects from backend on mount
  useEffect(() => {
      const token = localStorage.getItem("token");
  if (!token) {
    setLoading(false);
    return; // do NOT fetch anything if user is not logged in
  }
  
    const fetchData = async () => {
      try {
        const [matRes, projRes] = await Promise.all([
          api.get("/api/materials"),
          api.get("/api/projects")
        ]);
        setMaterials(matRes.data);
        setProjects(projRes.data);
      } catch (err) {
        console.error("Error fetching craft data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Add new project
  const addProject = async (project) => {
    try {
      const res = await api.post("/api/projects", project);
      setProjects((prev) => [...prev, res.data]);
    } catch (err) {
      console.error("Error adding project:", err);
    }
  };

  // Add new material
  const addMaterial = async (material) => {
    try {
      const res = await api.post("/api/materials", material);
      setMaterials((prev) => [...prev, res.data]);
    } catch (err) {
      console.error("Error adding material:", err);
    }
  };

  // Assign material to a project
  const assignMaterialToProject = async (materialId, projectId, amount) => {
    try {
      const res = await api.post("/api/materials/assign", { materialId, projectId, amount });
      setMaterials(res.data.materials); // backend returns updated materials
      setProjects(res.data.projects);   // backend returns updated projects
    } catch (err) {
      console.error("Error assigning material:", err);
    }
  };

  return (
    <CraftContext.Provider
      value={{
        materials,
        projects,
        loading,
        addProject,
        addMaterial,
        assignMaterialToProject,
      }}
    >
      {children}
    </CraftContext.Provider>
  );
};
