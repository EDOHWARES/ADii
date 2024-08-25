import mongoose from "mongoose";
import bcryptjs from 'bcryptjs';

const adminSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
});

// Create the admin model
const adminModel = mongoose.models.admin || mongoose.model('admin', adminSchema);

// Create an admin with fixed username and password
const setupAdmin = async () => {
    const existingAdmin = await adminModel.findOne({username: 'adii-superuser'});
    
    if (!existingAdmin) {
        // eslint-disable-next-line no-undef
        const hashedPassword = await bcryptjs.hash(process.env.ADMIN_PASSWORD, 10);
        const theadmin = new adminModel({username: 'adii-superuser', password: hashedPassword});
        await theadmin.save();
    } else {
        return;
    };
};

setupAdmin();

export default adminModel;