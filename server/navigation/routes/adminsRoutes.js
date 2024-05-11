const User = require('../../auth/user');
const { updateTokens } = require('../../auth/auth');

module.exports.getAllAdmins = async (req, res) => {
    try {
        const admins = await User.find();
        
        res.json(admins);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.getAdminById = async (req, res) => {
    try {
        const { id } = req.params;

        const admin = await User.findById(id);

        if (!admin) {
            return res.status(404).json({ message: 'can not find this admin' });
        }

        res.json(admin);
    } catch (error) {
        console.error('Error getting admin by id', error);
        res.status(500).json({ message: error.message });
    }
};

module.exports.updateAdmin = async (req, res) => {
    try {
        const { id } = req.params;

         const userRole = req.user.role;

         if (userRole !== 'super-admin') {
             return res.status(403).json({ message: 'Only super-admin can perform this operation' });
         }

        const updatedAdmin = await User.findByIdAndUpdate(id, req.body, { new: true });

        if(!updatedAdmin) {
            return res.status(404).json({ message: 'No admin in database' });
        }

        let err = updatedAdmin.validateSync()

        if (err) {
            res.status(400).json({message: err.message})
        } else {
            const tokens = updateTokens(updatedAdmin);
            res.json({ updatedAdmin, tokens });
        }
    } catch (err) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.deleteAdmin = async (req, res) => {
    try {
        const { id } = req.params;

        const userRole = req.user.role;

        if (userRole !== 'super-admin') {
            return res.status(403).json({ message: 'Only super-admin can perform this operation' });
        }

        await User.findByIdAndDelete(id);

        res.json({ message: 'Admin was deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};