import Jersey from "../models/Jersey.js";

export const getJerseys = async (req, res) => {
  const { data, error } = await supabase.from("jerseys").select("*");

  if (error) return res.status(500).json({ error: error.message });

  res.json(data);
};

export const addJersey = async (req, res) => {
  try {
    const jersey = new Jersey(req.body);
    await jersey.save();
    res.status(201).json(jersey);
  } catch (error) {
    res.status(500).json({ error: "Failed to add jersey" });
  }
};

export const editJersey = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedJersey = await Jersey.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedJersey);
  } catch (error) {
    res.status(500).json({ error: "Failed to update jersey" });
  }
};

export const deleteJersey = async (req, res) => {
  try {
    await Jersey.findByIdAndDelete(req.params.id);
    res.json({ message: "Jersey deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete jersey" });
  }
};
