import { useEffect, useState } from "react";
import api, { setAuthToken } from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function MaterialTracker() {
const [materials, setMaterials] = useState([]);
const [editing, setEditing] = useState(null);
const [form, setForm] = useState({ name: "", quantity: "", imageUrl: "", craftType: "" });
const { isSignedIn, getToken } = useAuth();

const craftTypes = ["Crochet", "Knitting", "Beadwork", "Other"];

useEffect(() => {
fetchMaterials();
}, [isSignedIn]);

const fetchMaterials = async () => {
if (!isSignedIn) return;
try {
const token = await getToken();
setAuthToken(token);
const res = await api.get("/materials");
setMaterials(res.data);
} catch (err) {
alert(err.response?.data?.error || "Failed to fetch materials");
}
};

const handleChange = (e) => {
setForm({ ...form, [e.target.name]: e.target.value });
};

const handleAdd = async (e) => {
e.preventDefault();
if (!isSignedIn) return alert("Please login!");
try {
const token = await getToken();
setAuthToken(token);
const res = await api.post("/materials", form);
setMaterials([...materials, res.data]);
setForm({ name: "", quantity: "", imageUrl: "", craftType: "" });
} catch (err) {
alert(err.response?.data?.error || "Failed to add material");
}
};

const handleUpdate = async (id) => {
if (!isSignedIn) return alert("Please login!");
try {
const token = await getToken();
setAuthToken(token);
const res = await api.put(`/materials/${id}`, form);
setMaterials(materials.map(m => m._id === id ? res.data : m));
setEditing(null);
setForm({ name: "", quantity: "", imageUrl: "", craftType: "" });
} catch (err) {
alert(err.response?.data?.error || "Failed to update material");
}
};

const handleDelete = async (id) => {
if (!isSignedIn) return alert("Please login!");
try {
const token = await getToken();
setAuthToken(token);
await api.delete(`/materials/${id}`);
setMaterials(materials.filter(m => m._id !== id));
} catch (err) {
alert(err.response?.data?.error || "Failed to delete material");
}
};

const groupedMaterials = materials.reduce((acc, mat) => {
const type = mat.craftType || "Universal";
if (!acc[type]) acc[type] = [];
acc[type].push(mat);
return acc;
}, {});

return ( <div className="min-h-screen p-6 bg-gray-50"> <h1 className="text-3xl font-bold mb-4">Materials</h1>

  <form
    onSubmit={(e) => editing ? handleUpdate(editing) : handleAdd(e)}
    className="flex flex-col md:flex-row gap-4 mb-6 items-center"
  >
    <input
      name="name"
      value={form.name}
      onChange={handleChange}
      placeholder="Material Name"
      className="border p-2 rounded w-full md:w-1/4"
      required
    />
    <input
      name="quantity"
      value={form.quantity}
      onChange={handleChange}
      placeholder="Quantity (e.g., 50g, 100pcs)"
      className="border p-2 rounded w-full md:w-1/4"
      required
    />
    <select
      name="craftType"
      value={form.craftType}
      onChange={handleChange}
      className="border p-2 rounded w-full md:w-1/4"
    >
      <option value="">Select Craft Type (optional)</option>
      {craftTypes.map(ct => <option key={ct} value={ct}>{ct}</option>)}
    </select>
    <input
      name="imageUrl"
      value={form.imageUrl}
      onChange={handleChange}
      placeholder="Image URL (optional)"
      className="border p-2 rounded w-full md:w-1/4"
    />
    <button
      type="submit"
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
      {editing ? "Update Material" : "Add Material"}
    </button>
  </form>

  {Object.keys(groupedMaterials).map((type) => (
    <div key={type} className="mb-6">
      <h2 className="text-xl font-semibold mb-2">{type}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {groupedMaterials[type].map((m) => (
          <div key={m._id} className="bg-white p-4 rounded shadow flex flex-col items-center">
            {m.imageUrl && <img src={m.imageUrl} alt={m.name} className="h-32 w-32 object-cover mb-2 rounded"/>}
            <h3 className="font-semibold">{m.name}</h3>
            <p>{m.quantity}</p>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => { setEditing(m._id); setForm({ name: m.name, quantity: m.quantity, craftType: m.craftType, imageUrl: m.imageUrl }); }}
                className="px-2 py-1 bg-yellow-400 rounded hover:bg-yellow-500"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(m._id)}
                className="px-2 py-1 bg-red-500 rounded hover:bg-red-600 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  ))}
</div>

);
}
