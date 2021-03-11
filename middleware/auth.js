

const auth = async (req, res, next) => {
    try {
        if (!req.session.loggedIn) {
            console.log('not loggedin');
            throw new Error()
        }
        next()
    } catch (e) {
        res.status(401).redirect('/dashboard/signin?msg=Please Authenticate!')
    }
    
}
module.exports = auth