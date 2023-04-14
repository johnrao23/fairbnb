import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAD3mvL_xqfGDCbwC4M50FjrglGvBdZWxA",
  authDomain: "fairbnb-5b50b.firebaseapp.com",
  projectId: "fairbnb-5b50b",
  storageBucket: "fairbnb-5b50b.appspot.com",
  messagingSenderId: "686702915592",
  appId: "1:686702915592:web:544e15a1cb72a2130be1bd",
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

// console.log("firebaseApp: ", firebaseApp);
// console.log("auth: ", auth);
console.log("db: ", db);

export { auth, db };

// const user = {
//   name: "John",
//   email: "john@example.com",
//   age: 30,
// };

// const usersCollection = collection(db, "users");
// const locationCollection = collection(db, "location");

// // Add a document to the "users" collection
// async function addUser(user) {
//   try {
//     const docRef = await addDoc(usersCollection, user);
//     console.log("Document written with ID: ", docRef.id);
//   } catch (e) {
//     console.error("Error adding document: ", e);
//   }
// }

// const Firebase = () => {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     // Fetch some data from Firestore

//     // Get a reference to the "users" collection
//     const usersRef = collection(db, "users");

//     // Fetch all the documents in the "users" collection
//     // getDocs(usersRef).then((querySnapshot) => {
//     //   let tempUsers = [];
//     //   querySnapshot.forEach((doc) => {
//     //     // console.log(doc.id, '=>', doc.data());
//     //     tempUsers.push({ id: doc.id, data: doc.data() });
//     //   });
//     //   setUsers(tempUsers);
//     // });
//   }, []);

//   return (
//     <>
//       {users?.length && (
//         <ul>
//           {users.map((item) => (
//             <li key={item.id}>{item.data.name}</li>
//           ))}
//         </ul>
//       )}
//     </>
//   );
// };

// // db.collection('users')
// //   .get()
// //   .then((querySnapshot) => {
// //     const newData = [];
// //     querySnapshot.forEach((doc) => {
// //       newData.push({ id: doc.id, data: doc.data() });
// //     });
// //     setData(newData);
// //   });

// export default Firebase;