import { useEffect, useState } from "react";

type Product = {
    id: number;
    name: string;
  };

const Products = () => {
const [products, setProducts] = useState<Product[]>([]);
const [searchTerm, setSearchTerm] = useState("");

const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
}

useEffect(() => {
    const fetchProducts = async () => {
        try {
        const response = await fetch("http://localhost:8080/api/products");
        const data = await response.json();
        setProducts(data);     
    }
        catch(error){
            console.error("Error fetching products", error);
        }
    }
    fetchProducts();
},[]);

const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
);

return(
    <div>
            <form onSubmit={handleSubmit}>
            <label> Search For Services
                <input type="text"
                value = {searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
            </label>
            <input type="submit" />
        </form>


<ul>
    {filteredProducts.map((product) => (
    <li key = {product.id}>
        <div>
            <p>{product.name}</p>
        </div>
    </li>
    ))}
</ul>
</div>
);
};

export default Products;