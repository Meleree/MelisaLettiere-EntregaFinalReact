import { useState, useEffect } from "react";
import ItemDetail from "./ItemDetail";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../db/db.js";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from '../Spinner/Spinner.jsx'

const ItemDetailContainer = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { idProduct } = useParams();
  const navigate = useNavigate();

  const getProduct = async () => {
    try {
      const docRef = doc(db, "products", idProduct);
      const dataDb = await getDoc(docRef);

      if (!dataDb.exists()) {
        console.log("Producto no encontrado.");
        navigate("/not-found", { replace: true });
      } else {
        const data = { id: dataDb.id, ...dataDb.data() };
        setProduct(data); 
      }
    } catch (error) {
      console.log(error);
      navigate("/not-found", { replace: true });
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    getProduct();
  }, [idProduct]);

  if (loading) {
    return <Spinner />; 
  }

  return product ? <ItemDetail product={product} /> : <div>Producto no encontrado.</div>; 
};

export default ItemDetailContainer;
