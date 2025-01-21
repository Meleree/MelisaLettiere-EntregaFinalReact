import { useState, useEffect } from "react";
import ItemList from "./ItemList.jsx";
import { useParams, useNavigate } from "react-router-dom";
import { collection, getDocs, query, where, doc, getDoc } from "firebase/firestore";
import { db } from "../../db/db.js";  
import "./itemlistcontainer.css";
import Spinner from '../Spinner/Spinner.jsx'

const ItemListContainer = ({ greeting }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { idCategory, productId } = useParams();
  const collectionName = collection(db, "products");

  const getProducts = async () => {
    try {
      setLoading(true);
      const dataDb = await getDocs(collectionName);
      const data = dataDb.docs.map((productDb) => {
        return { id: productDb.id, ...productDb.data() };
      });
      setProducts(data);
    } catch (error) {
      console.error("Error obteniendo productos:", error);
    } finally {
      setLoading(false);
    }
  };

  const getProductsByCategory = async () => {
    try {
      setLoading(true);
      const q = query(collectionName, where("category", "==", idCategory));
      const dataDb = await getDocs(q);
      const data = dataDb.docs.map((productDb) => {
        return { id: productDb.id, ...productDb.data() };
      });

      if (data.length === 0) {
        console.log("No productos encontrados para la categoría.");
        navigate("/not-found", { replace: true });  
      } else {
        setProducts(data);
      }
    } catch (error) {
      console.error("Error obteniendo productos por categoría:", error);
    } finally {
      setLoading(false);
    }
  };

  const checkProductExistence = async () => {
    if (productId) {
      try {
        setLoading(true);
        const docRef = doc(db, "products", productId);
        const productDoc = await getDoc(docRef);

        if (!productDoc.exists()) {
          console.log("Producto no encontrado, redirigiendo a NotFound...");
          navigate("/not-found", { replace: true });  
        } else {
          const productData = { id: productDoc.id, ...productDoc.data() };
          setProducts([productData]);  
        }
      } catch (error) {
        console.error("Error buscando producto:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    console.log("Parametros obtenidos:", { idCategory, productId });

    if (productId) {
      checkProductExistence(); 
    } else if (idCategory) {
      getProductsByCategory();  
    } else {
      getProducts();  
    }
  }, [idCategory, productId]);

  return (
    <div className="itemlistcontainer">
      <h1>{greeting}</h1>
      {
        loading === true ? (
          <Spinner /> 
        ) : (
          <ItemList products={products} />
        )
      }
    </div>
  );
};

export default ItemListContainer;
