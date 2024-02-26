const getAllProducts = async (req , res) => {
    res.status(200).json({msg :  'Get all products'})
}

const getAllProductstesting  = async (req , res) => {
    res.status(200).json({msg :  'Get all productstesting'})
}

module.exports = {getAllProducts,getAllProductstesting};
