export const adminRoute = async (req, res, next) => {
    try {
        if(req.user && req.user.role === 'admin') {
            next();
        }else {
            res.status(401).json({ error: 'Unauthorized: You are not an admin' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server error occurred please try again later' });
    }
};