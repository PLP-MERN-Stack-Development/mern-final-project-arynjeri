import { useEffect, useState } from "react";
import api from "../api/axios";

export default function ProjectTracker() {
  const [projects, setProjects] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [form, setForm] = useState({ name: "", type: "", hookSize: "", rowCount: "", materials: [] });
  const craftTypes = ["Crochet", "Knitting", "Beadwork", "Other"];
  const username = "Guest";

  useEffect(() => {
    fetchProjects();
    fetchMaterials();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await api.get("/api/projects");
      setProjects(res.data);
    } catch {
      alert("Failed to fetch projects");
    }
  };

  const fetchMaterials = async () => {
    try {
      const res = await api.get("/api/materials");
      setMaterials(res.data);
    } catch {
      alert("Failed to fetch materials");
    }
  };

  const handleAddProject = async () => {
    if (!form.name || !form.type || form.materials.length === 0) return alert("Please fill all required fields");

    try {
      const res = await api.post("/api/projects", form);
      setProjects([...projects, res.data]);
      setForm({ name: "", type: "", hookSize: "", rowCount: "", materials: [] });
      fetchMaterials();
    } catch {
      alert("Failed to add project");
    }
  };

  const handleMaterialQuantityChange = (materialId, qty) => {
    setForm(prev => {
      const others = prev.materials.filter(m => m.materialId !== materialId);
      return { ...prev, materials: [...others, { materialId, quantity: qty }] };
    });
  };

  const availableMaterials = materials.filter(m => !m.craftType || m.craftType.toLowerCase() === form.type.toLowerCase());

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Projects</h1>

      <div className="bg-white p-4 rounded-xl shadow mb-6">
        <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Project Name" className="border px-3 py-2 rounded mb-2 w-full" required />
        <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="border px-3 py-2 rounded mb-2 w-full" required>
          <option value="">Select Project Type</option>
          {craftTypes.map(ct => <option key={ct} value={ct}>{ct}</option>)}
        </select>
        <input value={form.hookSize} onChange={(e) => setForm({ ...form, hookSize: e.target.value })} placeholder="Hook Size" className="border px-3 py-2 rounded mb-2 w-full" />
        <input type="number" value={form.rowCount} onChange={(e) => setForm({ ...form, rowCount: e.target.value })} placeholder="Row Count" className="border px-3 py-2 rounded mb-2 w-full" />

        {availableMaterials.map(m => (
          <div key={m._id} className="flex items-center gap-2 mb-2">
            <span>{m.name} {m.craftType ? `(${m.craftType})` : "(Universal)"}</span>
            <input type="text" placeholder="Quantity used" className="border px-2 py-1 rounded w-36" onChange={(e) => handleMaterialQuantityChange(m._id, e.target.value)} required />
          </div>
        ))}

        <button onClick={handleAddProject} className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Add Project</button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map(p => (
          <div key={p._id} className="bg-white p-4 rounded-xl shadow">
            <h2 className="font-semibold text-xl">{p.name}</h2>
            <p>Type: {p.type}</p>
            {p.hookSize && <p>Hook Size: {p.hookSize}</p>}
            {p.rowCount && <p>Row Count: {p.rowCount}</p>}
            <p>Status: {p.status || "Ongoing"}</p>
            <p>Materials:</p>
            <ul className="list-disc ml-5">
              {p.materials.map(m => {
                const mat = materials.find(x => x._id === m.materialId);
                return <li key={m.materialId}>{mat?.name || "Unknown"}: {m.quantity}</li>
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
