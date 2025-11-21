import { useEffect, useState } from "react";
import api, { setAuthToken } from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function ProjectTracker() {
  const [projects, setProjects] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [form, setForm] = useState({
    name: "",
    type: "",
    hookSize: "",
    rowCount: "",
    materials: [] // [{ materialId, quantity }]
  });

  const { isSignedIn, getToken } = useAuth();
  const craftTypes = ["Crochet", "Knitting", "Beadwork", "Other"];

  useEffect(() => {
    fetchProjects();
    fetchMaterials();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await api.get("/api/projects");
      setProjects(res.data);
    } catch (err) {
      alert("Failed to fetch projects");
    }
  };

  const fetchMaterials = async () => {
    try {
      const res = await api.get("/api/materials");
      setMaterials(res.data);
    } catch (err) {
      alert("Failed to fetch materials");
    }
  };

  const handleAddProject = async () => {
    if (!isSignedIn) return alert("Please login!");
    if (!form.name || !form.type || form.materials.length === 0)
      return alert("Please fill all required fields");

    try {
      const token = await getToken();
      setAuthToken(token);

      const res = await api.post("/api/projects", form);
      setProjects([...projects, res.data]);
      setForm({ name: "", type: "", hookSize: "", rowCount: "", materials: [] });

      // Deduct materials quantities
      for (const m of form.materials) {
        const mat = materials.find(x => x._id === m.materialId);
        if (!mat || !m.quantity) continue;

        const parseValue = (str) => {
          const match = str.match(/([\d.]+)/);
          return match ? parseFloat(match[1]) : 0;
        };
        const matValue = parseValue(mat.quantity || "0");
        const usedValue = parseValue(m.quantity);
        const unitMatch = mat.quantity?.match(/[a-zA-Z]+/)?.[0] || "";
        const newQuantity = `${Math.max(matValue - usedValue, 0)}${unitMatch}`;

        await api.patch(`/api/materials/${mat._id}`, { quantity: newQuantity });
      }

      fetchMaterials();
    } catch (err) {
      alert(err.response?.data?.error || "Failed to add project");
    }
  };

  const handleMaterialQuantityChange = (materialId, qty) => {
    setForm(prev => {
      const others = prev.materials.filter(m => m.materialId !== materialId);
      return { ...prev, materials: [...others, { materialId, quantity: qty }] };
    });
  };

  const availableMaterials = materials.filter(
    m => !m.craftType || m.craftType.toLowerCase() === form.type.toLowerCase()
  );

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Projects</h1>

      <div className="bg-white p-4 rounded-xl shadow mb-6">
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Project Name"
          className="border px-3 py-2 rounded mb-2 w-full"
          required
        />
        <select
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          className="border px-3 py-2 rounded mb-2 w-full"
          required
        >
          <option value="">Select Project Type</option>
          {craftTypes.map(ct => <option key={ct} value={ct}>{ct}</option>)}
        </select>
        <input
          value={form.hookSize}
          onChange={(e) => setForm({ ...form, hookSize: e.target.value })}
          placeholder="Hook Size"
          className="border px-3 py-2 rounded mb-2 w-full"
        />
        <input
          type="number"
          value={form.rowCount}
          onChange={(e) => setForm({ ...form, rowCount: e.target.value })}
          placeholder="Row Count"
          className="border px-3 py-2 rounded mb-2 w-full"
        />

        {availableMaterials.map((m) => (
          <div key={m._id} className="flex items-center gap-2 mb-2">
            <span>{m.name} {m.craftType ? `(${m.craftType})` : "(Universal)"}</span>
            <input
              type="text"
              placeholder="Quantity used (e.g., 50g, 100pcs)"
              className="border px-2 py-1 rounded w-36"
              onChange={(e) => handleMaterialQuantityChange(m._id, e.target.value)}
              required
            />
          </div>
        ))}

        <button
          onClick={handleAddProject}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add Project
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
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
