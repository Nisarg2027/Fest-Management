import React, { useState } from 'react';
import api from '../lib/api';

function TeamRegister() {
  const [form, setForm] = useState({ event_id: '', team_id: '', fee_paid: '', registration_date: '' });
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    
    try {
      const res = await api.post('/registers/team', form);
      setMessage({ type: 'success', text: res.data.message });
      setForm({ event_id: '', team_id: '', fee_paid: '', registration_date: '' });
    } catch (err) {
      setMessage({ 
        type: 'error', 
        text: '❌ Transaction failed and rolled back: ' + (err.response?.data?.details || err.message) 
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">📝 Team Registration (Transaction)</h2>
          <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-6">
            <p className="text-sm text-yellow-700">
              <strong>🔄 Transaction Demo:</strong> This endpoint uses BEGIN TRANSACTION, COMMIT, and ROLLBACK to ensure data consistency.
            </p>
          </div>

          {message.text && (
            <div className={`border-l-4 p-4 mb-6 ${
              message.type === 'success' 
                ? 'bg-green-100 border-green-500 text-green-700' 
                : 'bg-red-100 border-red-500 text-red-700'
            }`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Event ID</label>
              <input
                name="event_id"
                value={form.event_id}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Team ID</label>
              <input
                name="team_id"
                value={form.team_id}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Fee Paid</label>
              <input
                name="fee_paid"
                type="number"
                step="0.01"
                value={form.fee_paid}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Registration Date</label>
              <input
                name="registration_date"
                type="date"
                value={form.registration_date}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition duration-300"
            >
              Register Team (Execute Transaction)
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TeamRegister;
