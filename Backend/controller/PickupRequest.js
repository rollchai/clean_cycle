import pickupMOdel from "../model/Pickup.js"
import usermodel from "../model/User.js"

export const pickuprequest=async(req,res)=>{
try {
    const getunassigned=await pickupMOdel.find({
        assignedPickups:null,
        status:"Scheduled"
    })
    if(getunassigned)
       res.json(getunassigned)
} catch (error) {
    res.status(404).json({error:"failed to fetch"})
}
}

export const assignAgent = async (req, res) => {
  try {
    const { agentId } = req.body;
    const { pickupId } = req.params;

    const pickup = await pickupMOdel.findById(pickupId);
    const agent = await usermodel.findById(agentId);

    if (!pickup || !agent || agent.role !== 'agent') {
      return res.status(400).json({ message: 'Invalid pickup or agent' });
    }

    // Assign the agent
    pickup.assignedTo = agentId; // use a clearer field name
    await pickup.save();

    // Increment assigned pickup count
    agent.assignedPickups = (agent.assignedPickups || 0) + 1;
    await agent.save();

    res.json({ message: 'Agent assigned successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to assign agent' });
  }
};
