import { useState, useEffect } from 'react';
import { getAddresses, addAddress, updateAddress, deleteAddress, setDefaultAddress } from '../utils/address';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

function AddressBook() {
  const [addresses, setAddresses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', phone: '', address: '', city: '', zip: '' });

  useEffect(() => {
    setAddresses(getAddresses());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.address || !form.city) {
      toast.error('Please fill all fields!');
      return;
    }
    if (editing) {
      const updated = updateAddress(editing, form);
      setAddresses(updated);
      toast.success('✅ Address updated!');
    } else {
      const updated = addAddress(form);
      setAddresses(updated);
      toast.success('✅ Address added!');
    }
    setForm({ name: '', phone: '', address: '', city: '', zip: '' });
    setShowForm(false);
    setEditing(null);
  };

  const handleDelete = (id) => {
    const updated = deleteAddress(id);
    setAddresses(updated);
    toast.success('🗑️ Address deleted!');
  };

  const handleDefault = (id) => {
    const updated = setDefaultAddress(id);
    setAddresses(updated);
    toast.success('✅ Default address updated!');
  };

  const handleEdit = (addr) => {
    setForm(addr);
    setEditing(addr.id);
    setShowForm(true);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">📍 Address Book</h3>
        <button onClick={() => { setShowForm(true); setEditing(null); setForm({ name: '', phone: '', address: '', city: '', zip: '' }); }} className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-xl font-bold hover:shadow-lg hover:scale-105 transition">
          ➕ Add Address
        </button>
      </div>

      {showForm && (
        <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} onSubmit={handleSubmit} className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl grid grid-cols-1 md:grid-cols-2 gap-3">
          <input type="text" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} placeholder="Full Name" className="p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-600 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none" required />
          <input type="text" value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})} placeholder="Phone" className="p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-600 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none" required />
          <input type="text" value={form.address} onChange={(e) => setForm({...form, address: e.target.value})} placeholder="Address" className="p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-600 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none" required />
          <div className="flex gap-2">
            <input type="text" value={form.city} onChange={(e) => setForm({...form, city: e.target.value})} placeholder="City" className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-600 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none" required />
            <input type="text" value={form.zip} onChange={(e) => setForm({...form, zip: e.target.value})} placeholder="ZIP" className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-600 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none" />
          </div>
          <div className="md:col-span-2 flex gap-2">
            <button type="submit" className="bg-green-500 text-white px-6 py-2 rounded-xl font-bold hover:bg-green-600 transition flex-1">{editing ? 'Update' : 'Add'}</button>
            <button type="button" onClick={() => { setShowForm(false); setEditing(null); }} className="bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-white px-6 py-2 rounded-xl font-bold hover:bg-gray-400 transition">Cancel</button>
          </div>
        </motion.form>
      )}

      <div className="space-y-3">
        {addresses.length === 0 && <p className="text-gray-500 text-center py-4">No addresses saved.</p>}
        {addresses.map((addr) => (
          <motion.div key={addr.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap justify-between items-center bg-gray-50 dark:bg-gray-700 p-4 rounded-xl border border-gray-200 dark:border-gray-600">
            <div>
              <p className="font-bold text-gray-800 dark:text-white">{addr.name} {addr.isDefault && <span className="text-green-500 text-xs font-bold">(Default)</span>}</p>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{addr.address}, {addr.city} {addr.zip}</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">📱 {addr.phone}</p>
            </div>
            <div className="flex gap-2 flex-wrap mt-2">
              {!addr.isDefault && <button onClick={() => handleDefault(addr.id)} className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-600 transition">Set Default</button>}
              <button onClick={() => handleEdit(addr)} className="bg-yellow-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-yellow-600 transition">✏️</button>
              <button onClick={() => handleDelete(addr.id)} className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600 transition">🗑️</button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default AddressBook;