import { UserAuth } from "../../context/authContext";
import { onValue, ref, set } from "firebase/database";
import React, { useEffect, useState } from "react";
import { db } from "../../config/firebase"; // Import the db instance from the firebase.ts file

export interface StockItem {
  name: string;
  symbol: string;
  type: string;
  volume: number;
}

interface UserPortfolioProps {
  userPortfolio: StockItem[];
  onRemoveStock: (stock: StockItem) => void;
}

// const UserPortfolio: React.FC<UserPortfolioProps> = ({ userPortfolio, onRemoveStock }) => (
// <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//   <div>
//     <h2 style={{ textAlign: 'center' }}>User Portfolio</h2>
//     <ul style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 0 }}>
//       {userPortfolio.map((item, index) => (
//         <li key={index} style={{ textAlign: 'center', margin: '10px 0' }}>
//           {item.symbol} - {item.name} - {item.country} - {item.type}
//           <button onClick={() => onRemoveStock(item)}>Remove from Portfolio</button>
//         </li>
//       ))}
//     </ul>
//   </div>
// </div>

const UserPortfolio = () => {
  const { user } = UserAuth();
  const [userPortfolio, setUserPortfolio] = useState<StockItem[]>([]);

  useEffect(() => {
    if (user) {
      // Fetch user profile data from Firebase Realtime Database
      const userDatabaseRef = ref(db, `users/${user.uid}`);
      onValue(userDatabaseRef, (snapshot) => {
        if (snapshot.exists()) {
          const profileData = snapshot.val();
          setUserPortfolio(profileData.stockItems || []);
        }
      });
    }
  }, [user]);

  return (
    <div>
      <h2 style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>My portfolio</h2>
      {userPortfolio != null ? userPortfolio.map((item) => {
        return (
          <div>{item.symbol} - {item.name} - {item.type} - {item.volume}</div>
        )
      }) : <p>No stock</p>}
    </div>
  );
};
export default UserPortfolio;
