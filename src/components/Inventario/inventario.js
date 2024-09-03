import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, onSnapshot} from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import './inventario.css';

const Inventario = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const q = query(collection(db, 'products'), orderBy('name'));
            const querySnapshot = await getDocs(q);
            const documents = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setData(documents);
            setLoading(false);
        };
        fetchData();
    }, []);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    // Función para formatear el precio
    const formatPrice = (price) => {
        // Convertir el precio a un número con dos decimales y formato de miles y coma
        return parseFloat(price).toLocaleString('es-ES', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    };

    const updateStockLocal = async () => {
        const q = query(collection(db, 'products'), orderBy('name'));
        const querySnapshot = await getDocs(q);
        const documents = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        setData(documents);
    };

    const filteredData = data.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='container'>
            <h1>Inventario de Productos</h1>
            <input
                type="text"
                placeholder="Buscar producto..."
                value={searchTerm}
                onChange={handleSearch}
            />
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Precio de compra</th>
                        <th>Precio venta sin IVA</th>
                        <th>Precio venta con IVA</th>
                        
                        <th>Cantidad</th>
                        
                    </tr>
                </thead>
                <tbody>
                {filteredData.map(item => (
                    <tr key={item.id} className={item.stock < 25 ? 'low-stock' : ''}>
                        <td>{item.name}</td>
                        <td>${formatPrice(item.compra)}</td>
                        <td>${formatPrice(item.sinIva)}</td>
                        <td>${formatPrice(item.conIva)}</td>
                        
                        <td>{item.stock}</td>
                       
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default Inventario;