const API_URL = "https://fakestoreapi.com/products";

async function main() {
    try {
        const [, , method, endpoint, ...args] = process.argv;

        if (!method || !endpoint) {
            console.log("No se han recibido argumentos.");
            return;
        }

        const [recurso, id] = endpoint.split("/").filter(Boolean);

        if (recurso !== "products") {
            console.log("Error: falta el recurso 'products'.");
            return;
        }

        switch (method.toUpperCase()) {

            case "GET": {

                if (id) {
                    const res = await fetch(`${API_URL}/${id}`);
                    const product = await res.json();

                    console.log(`Mostrando product ${id}:`, product);

                } else {
                    const res = await fetch(API_URL);
                    const products = await res.json();

                    console.log("Lista completa de products:", products);
                }

                break;
            }

            case "POST": {

                const [titulo, precio, categoria] = args;

                if (!titulo || !precio || !categoria) {
                    console.log("Faltan datos del product");
                    return;
                }

                const newProduct = {
                    titulo,
                    precio: parseFloat(precio),
                    categoria
                };

                const res = await fetch(API_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newProduct)
                });

                const createdProduct = await res.json();

                console.log("Nuevo product creado:", createdProduct);

                break;
            }

            case "DELETE": {

                if (!id) {
                    console.log("Debe proporcionar un ID");
                    return;
                }

                const res = await fetch(`${API_URL}/${id}`, {
                    method: "DELETE"
                });

                const deletedProduct = await res.json();

                console.log(`Product ${id} eliminado:`, deletedProduct);

                break;
            }

            default:
                console.log(`Comando "${method}" no reconocido.`);
        }

    } catch (error) {

        console.error("Hubo un error:", error.message);
    }
}

main();
