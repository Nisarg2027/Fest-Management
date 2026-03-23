const db = require('../db');

exports.getParticipantRegistrations = async (req, res) => {
  try {
    const { rows } = await db.query('SELECT e.event_name, p.pname, p.pemail, pr.fee_paid, pr.registration_date FROM pregister pr join participants p on p.participant_id = pr.participant_id join event e on e.event_id = pr.event_id');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTeamRegistrations = async (req, res) => {
  try {
    const { rows } = await db.query('SELECT e.event_name, t.team_name, t.team_leader, tr.fee_paid, tr.registration_date FROM tregister tr join team t on t.team_id = tr.team_id join event e on e.event_id = tr.event_id');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};