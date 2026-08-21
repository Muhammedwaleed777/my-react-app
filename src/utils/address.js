// Address Book
export const getAddresses = () => {
  const data = localStorage.getItem('addresses');
  return data ? JSON.parse(data) : [];
};

export const addAddress = (address) => {
  const addresses = getAddresses();
  const newAddress = { id: Date.now(), ...address, isDefault: addresses.length === 0 };
  addresses.push(newAddress);
  localStorage.setItem('addresses', JSON.stringify(addresses));
  return addresses;
};

export const updateAddress = (id, updated) => {
  let addresses = getAddresses();
  addresses = addresses.map(addr => addr.id === id ? { ...addr, ...updated } : addr);
  localStorage.setItem('addresses', JSON.stringify(addresses));
  return addresses;
};

export const deleteAddress = (id) => {
  let addresses = getAddresses();
  addresses = addresses.filter(addr => addr.id !== id);
  localStorage.setItem('addresses', JSON.stringify(addresses));
  return addresses;
};

export const setDefaultAddress = (id) => {
  let addresses = getAddresses();
  addresses = addresses.map(addr => ({ ...addr, isDefault: addr.id === id }));
  localStorage.setItem('addresses', JSON.stringify(addresses));
  return addresses;
};

export const getDefaultAddress = () => {
  const addresses = getAddresses();
  return addresses.find(addr => addr.isDefault) || addresses[0] || null;
};