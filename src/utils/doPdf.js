export const  doPdf = (pdfData) => {
    // setBackOrderSubmitted(true);

    let order = pdfData.order;
    let products = [];
    order?.products?.map((prod) => {
      products.push({
        name: prod.product.name,
        quantity: prod.quantity,
        boxes:
          !prod.product.unitesperbox || prod.product.unitesperbox === 0
            ? prod.quantity
            : prod.product.unitesperbox,
      });
    })
}