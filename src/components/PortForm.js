const PortForm = ({ newPort, handleInputChange, handleCreateOrUpdate, editingPort }) => {
  const isFormValid = newPort.name && newPort.country && newPort.city && newPort.address;

  return (
    <div className="mb-4 flex flex-col sm:flex-row gap-4 w-full">
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={newPort.name}
        onChange={handleInputChange}
        className="p-3 border rounded flex-1 bg-gray-100 text-lg text-black"
      />
      <input
        type="text"
        name="country"
        placeholder="Country"
        value={newPort.country}
        onChange={handleInputChange}
        className="p-3 border rounded flex-1 bg-gray-100 text-lg text-black"
      />
      <input
        type="text"
        name="city"
        placeholder="City"
        value={newPort.city}
        onChange={handleInputChange}
        className="p-3 border rounded flex-1 bg-gray-100 text-lg text-black"
      />
      <input
        type="text"
        name="address"
        placeholder="Address"
        value={newPort.address}
        onChange={handleInputChange}
        className="p-3 border rounded flex-1 bg-gray-100 text-lg text-black"
      />
      <button
        onClick={handleCreateOrUpdate}
        className={`bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 ${!isFormValid && 'opacity-50 cursor-not-allowed'}`}
        disabled={!isFormValid}
      >
        {editingPort ? "Update" : "Create"}
      </button>
    </div>
  );
};

export default PortForm;
