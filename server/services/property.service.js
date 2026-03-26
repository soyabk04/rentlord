async function createProperty(name,address,type,owner){        
    const property = await Propertymodel.create({
            name: name,
            address: address,
            type: type,
            owner: owner
        })
        return property
    }
module.exports={createProperty}