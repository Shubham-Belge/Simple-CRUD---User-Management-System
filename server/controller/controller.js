var Userdb = require('../model/model');


// create and save new user
exports.create = (req, res) => {
    // validate request
    if (!req.body) {
        return res.status(400).send({ message: "Content can not be empty" })

    }

    // new user
    const user = new Userdb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    })
    user.save(user)
        .then(data => {
          //  return res.send(data)
          res.redirect('/add-user')
        })
        .catch(err => {
            return res.status(500).send({ message: err.message || "something went wrong in create controller"
         })
        })

}

// retrive and return all users / retrive and return a single user
exports.find = (req, res) => {
    if (req.query.id) {
        const id = req.query.id;
        Userdb.findById(id)
            .then(data => {
                if (!data) {
                    return res.status(404).send({ message: "User not found with id:", id })
                } else {
                    return res.send(data)
                }
            }).catch(err => {
                return res.status(500).send({ message: " error occured while retrieving user information" })
            })
    } else {
        Userdb.find()
            .then(user => {
                return res.send(user)
            }).catch(err => {
                return res.status(500).send({ message: err.message || "something went wrong in find controller" })
            })
    }
}



// update a new identified user by user id 
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: "data to update cannot be empty" })
    }

    const id = req.params.id
    Userdb.findOneAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data)
                return res.status(404).send({ message: `Cannot update user with id:${id}` })
            else (res.send(data))
        }).catch(err => {
            return res.status(500).send({ message: "Error in updating user information" })
        })
}

// delete a user with specified user id in the request
exports.delete = (req, res) => {
    const id = req.params.id
    Userdb.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                return res.status(404).send({ message: `Cannot delete with id:${id}` })
            } else {
                return res.send({ message: " User deleted Successfully" })
            }
        }).catch(err => {
            return res.status(500).send({ message: 'could not delete user with id:', id })
        })
}


