import { createContext, useContext, useState, useEffect } from 'react';
import { getFromLocalStorage, setToLocalStorage } from '../utils/localStorageUtils';

const ShipsContext = createContext();

export const ShipsProvider = ({ children }) => {
  const [ships, setShips] = useState(getFromLocalStorage('ships') || []);

  useEffect(() => {
    setToLocalStorage('ships', ships);
  }, [ships]);

  const addShip = (ship) => {
    const newShips = [...ships, { ...ship, id: crypto.randomUUID() }];
    setShips(newShips);
  };

  const updateShip = (id, updated) => {
    const newShips = ships.map(s => (s.id === id ? { ...s, ...updated } : s));
    setShips(newShips);
  };

  const deleteShip = (id) => {
    const newShips = ships.filter(s => s.id !== id);
    setShips(newShips);
  };

const addComponentToShip = (shipId, newComponent) => {
  setShips(prevShips => {
    const updatedShips = prevShips.map(ship => {
      if (ship.id === shipId) {
        return {
          ...ship,
          components: [...(ship.components || []), newComponent],
        };
      }
      return ship;
    });
    localStorage.setItem("ships", JSON.stringify(updatedShips));
    return updatedShips;
  });
};

const editComponentInShip = (shipId, componentId, updatedData) => {
  setShips(prevShips => {
    const updatedShips = prevShips.map(ship => {
      if (ship.id === shipId) {
        return {
          ...ship,
          components: ship.components.map(c =>
            c.id === componentId ? { ...c, ...updatedData } : c
          ),
        };
      }
      return ship;
    });
    localStorage.setItem("ships", JSON.stringify(updatedShips));
    return updatedShips;
  });
};

const deleteComponentFromShip = (shipId, componentId) => {
  setShips(prevShips => {
    const updatedShips = prevShips.map(ship => {
      if (ship.id === shipId) {
        return {
          ...ship,
          components: ship.components.filter(c => c.id !== componentId),
        };
      }
      return ship;
    });
    localStorage.setItem("ships", JSON.stringify(updatedShips));
    return updatedShips;
  });
};



  return (
    <ShipsContext.Provider value={{
  ships,
  addShip,
  updateShip,
  deleteShip,
  addComponentToShip,
  editComponentInShip,
  deleteComponentFromShip,
}}>
      {children}
    </ShipsContext.Provider>
  );
};

export const useShips = () => useContext(ShipsContext);
