const { Propertymodel } = require('../Models/Property.model');
async function createPropertyService(name,address,type,owner){        
    const property = await Propertymodel.create({
            name: name,
            address: address,
            type: type,
            owner: owner
        })
        return property
    }
module.exports={createPropertyService}