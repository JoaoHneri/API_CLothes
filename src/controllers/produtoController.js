const Product = require("../models/Produto");

const addProd = async (req, res) => {
  try {
    const { productName, productPrice,  productCategory, productSizes, productDescription,productQuantity } = req.body;
    const file = req.file.path;
    if(!file) {
      return res.status(400).send({message: "Imagem não foi enviada"})
    }
    const Prods = await Product.create({ productName, productPrice,  productCategory, productSizes, productDescription,productQuantity, src: file });
    return res.status(201).json(Prods);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const getAll = async (req, res) => {
  try {
    const allProducts = await Product.find({});
    return res.status(200).json(allProducts);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const getById = async (req, res) => {
    const { _id } = req.params;
  
    try {
      const product = await Product.findById(_id);
      if (!product) {
        return res.status(404).send('Produto não encontrado');
      }
      return res.status(200).json(product);
    } catch (err) {
      return res.status(500).send(err);
    }
  };


  const getByCategory = async (req, res) => {
    let { category } = req.params;
    category = category.charAt(0).toUpperCase() + category.slice(1);
    try {
      console.log('Categoria recebida na requisição:', category);
  
      const produtos = await Product.find({ productCategory: category }).populate("productCategory");
      console.log('Produtos encontrados:', produtos);
  
      if (!produtos || produtos.length === 0) {
        console.log('Nenhum produto encontrado com essa categoria');
        return res.status(404).send('Nenhum produto encontrado com essa categoria');
      }
  
      console.log('Produtos retornados com sucesso');
      return res.status(200).json(produtos);
    } catch (err) {
      console.error('Erro ao buscar produtos por categoria:', err);
      return res.status(500).send(err);
    }
  };
  
  const updateProd = async (req, res) => {
    const { _id } = req.params;
    try {
      const { productName, productPrice, productCategory, productSizes, productDescription,productQuantity } = req.body;
      const updatedProds = await Product.findByIdAndUpdate(_id, { productName, productPrice, productCategory, productSizes, productDescription,productQuantity });
      return res.status(201).json({msg: `Produto Atualizado com sucesso: ${updatedProds}`});
    } catch (error) {
      return res.status(400).send(error);
    }
  };

  const deleteProd = async (req, res) => {
    const { _id } = req.params;
    try {
      const deletedProd = await Product.findByIdAndDelete(_id);
      return res.status(201).json(deletedProd);
    } catch (error) {
      return res.status(400).send({msg: "Produto não encontrado"})
    }
  }
  



module.exports = {
  getAll,
  addProd,
  getById,
  updateProd, deleteProd, getByCategory
};
