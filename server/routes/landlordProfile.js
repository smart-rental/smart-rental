// import User from "../models/user.model";
// import router from "./auth";
//
// router.route('/').get((req, res) => {
//     User.find()
//         .then(users => res.json(users))
//         .catch(e => res.status(400).json(`Error: ${e}`));
// });
//
// router.route('/add').post((req, res) => {
//     const name = req.body.name;
//     const email = req.body.email;
//     const dob = Date.parse(req.body.dob);
//     const newUser = new User({
//         name,
//         email,
//         dob,
//     });
//
//     newUser.save()
//         .then(users => res.json(users))
//         .catch(e => res.status(400).json(`Error: ${e}`));
// });
//
// router.route('/:id').delete((req, res) => {
//     const { id } = req.params;
//     User.findByIdAndDelete(id)
//         .then(user => res.json(user))
//         .catch(e => res.status(404).json(`Error: ${e}`));
// });
//
// router.route('/update/:id').post((req, res) => {
//     const { id } = req.params;
//     User.findByIdAndUpdate(id)
//         .then(user => {
//             user.name = req.body.name;
//             user.email = req.body.email;
//             user.dob = Date.parse(req.body.dob);
//
//             user.save()
//                 .then(() => res.json('Exercise updated'))
//                 .catch(err => res.status(400).json(`Error: ${err}`));
//         })
//         .catch(e => res.status(404).json(`Error: ${e}`))
// })
