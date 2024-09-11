export const CrudFunctions = {
  handleToDetailsClick: () => {
    const productDiv = document.querySelector(".cardCreateSectionProduct");
    const detailsDiv = document.querySelector(".cardCreateSectionDetails");
    if (!productDiv.style.transform) {
      productDiv.style.transform = "rotateY(0deg)";
    }
    if (!detailsDiv.style.transform) {
      detailsDiv.style.transform = "rotateY(180deg)";
    }
    if (productDiv.style.transform === "rotateY(0deg)") {
      productDiv.style.transform = "rotateY(180deg)";
      detailsDiv.style.transform = "rotateY(360deg)";
    } else {
      productDiv.style.transform = "rotateY(0deg)";
      detailsDiv.style.transform = "rotateY(180deg)";
    }
  },
  validNumber: (input) => {
    const regex = /^\d+(\.\d+)?$/;
    return regex.test(input);
  },
  getProductValues: (product) => {
    return [
      product.id,
      product.Titulo,
      product.Precio,
      product.Costo,
      product.MLC,
      product.CUP,
      product.Imagen,
      product.Categoria,
      product.Descripcion,
      product.Estado,
      product.Proveedor,
      product.Detalles,
      product.Otro,
    ].join(",");
  },
};
