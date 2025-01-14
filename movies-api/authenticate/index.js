import jwt from 'jsonwebtoken';
import User from '../api/users/userModel';

const authenticate = async (request, response, next) => {
    try { 
        const authHeader = request.headers.authorization;
        if (!authHeader) throw new Error('No authorization header');

        const token = authHeader.split(" ")[1];
        if (!token) throw new Error('Bearer token not found');

        const decoded = jwt.verify(token, process.env.SECRET); 
        console.log(decoded);

        // Assuming decoded contains a userId field
        const user = await User.findById(decoded.userId); 
        if (!user) {
            throw new Error('User not found');
        }
        request.user = user; 
        next();
    } catch(err) {
        if (err.message === "jwt expired") {
            return response.status(401).json({ message: 'Token expired', expired: true });
        }
        next(new Error(`Verification Failed: ${err.message}`));
    }
};

export default authenticate;
