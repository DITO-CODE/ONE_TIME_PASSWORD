
const admin = require('firebase-admin');


module.exports = function(req,res){

    //Verifica el provedor de telefono

    if(!req.body.phone){
        return res.status(422).send({error: 'Bad Input'});
    }

    // Formatea el numero de telefono removiendo guiones
    const phone = String(req.body.phone).replace(/[^\d]/g, "");

    //Crea un nuevo usuario usando ese numero de telefono
    admin.auth().createUser({ uid: phone })
    .then(user => res.send(user))
    .catch(err => res.status(422).send({ error: err }));
    // resputas al usuario diciendo que la cuenta fue creada

}