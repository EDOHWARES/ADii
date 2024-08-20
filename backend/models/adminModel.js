import mongoose from "mongoose";
import bcryptjs from 'bcryptjs';

const adminSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
});

// // Hash the password before saving 
// adminSchema.pre('save', async function(next) {
//     if (this.isModified('password')) {
//         this.password = await bcryptjs.hash(this.password, 10);
//     };
//     next();
// });

// Create the admin model
const adminModel = mongoose.models.admin || mongoose.model('admin', adminSchema);

// Create an admin with fixed username and password
const setupAdmin = async () => {
    const existingAdmin = await adminModel.findOne({username: 'adii-superuser'});
    
    if (!existingAdmin) {
        const hashedPassword = await bcryptjs.hash(process.env.ADMIN_PASSWORD, 10);
        const theadmin = new adminModel({username: 'adii-superuser', password: hashedPassword});
        const admin = await theadmin.save();
        console.log('Admin credentials set up successfully',process.env.ADMIN_PASSWORD, admin);
    } else {
        console.log('Admin already set up');
    };
};

setupAdmin();

export default adminModel;