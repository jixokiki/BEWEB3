// "use client";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import {
//   doc,
//   setDoc,
//   updateDoc,
//   serverTimestamp,
// } from "firebase/firestore";
// import { db } from "@/firebase/firebase";
// import Navbar from "@/components/Navbar";

// const Cuti = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     fullname: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     reason: "",
//     bank: "BNI",
//     accountNumber: "",
//     salary: 0,
//     amount: "",
//   });
//   const [errors, setErrors] = useState({});
//   const [toastMessage, setToastMessage] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchUserData = async () => {
//       const userProfile = localStorage.getItem("userProfile");
//       if (userProfile) {
//         const userData = JSON.parse(userProfile);
//         setFormData({
//           ...formData,
//           username: userData.name,
//           fullname: userData.name,
//           email: userData.email,
//         });
//       }
//     };
//     fetchUserData();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     // let updatedFormData = { ...formData, [name]: value };
//     let updatedFormData = { ...formData, [name]: name === 'duration' ? parseInt(value) : value };

//     if (name === "employeeId") {
//       switch (value) {
//         case "11C":
//           updatedFormData.salary = 3000000;
//           updatedFormData.golongan = "Karyawan";
//           break;
//         case "11B":
//           updatedFormData.salary = 5000000;
//           updatedFormData.golongan = "Head Staff";
//           break;
//         case "11A":
//           updatedFormData.salary = 6000000;
//           updatedFormData.golongan = "HRD";
//           break;
//         default:
//           updatedFormData.salary = 0;
//           updatedFormData.golongan = "";
//       }
//     }

//     setFormData(updatedFormData);
//   };

//   const handleCuti = async () => {
//     try {
//       let newErrors = {};
//       if (!formData.username) {
//         newErrors.username = "Username is required";
//       }
//       if (!formData.fullname) {
//         newErrors.fullname = "Fullname is required";
//       }
//       if (!formData.reason) {
//         newErrors.reason = "reason is required";
//       }
//       if (!formData.email) {
//         newErrors.email = "Email is required";
//       } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//         newErrors.email = "Email address is invalid";
//       }
//       if (!formData.password) {
//         newErrors.password = "Password is required";
//       } else if (formData.password !== formData.confirmPassword) {
//         newErrors.confirmPassword = "Passwords do not match";
//       }
//       setErrors(newErrors);

//       if (Object.keys(newErrors).length > 0) {
//         return;
//       }

//       setIsLoading(true);

//       const userData = {
//         username: formData.username,
//         fullname: formData.fullname,
//         email: formData.email,
//         reason: formData.reason,
//         // jangka: parseInt(formData.duration),
//         bank: formData.bank,
//         nomorAkun: formData.accountNumber,
//         // employeeId: formData.employeeId,
//         salary: formData.salary,
//         // golongan: formData.golongan,
//         amount: formData.amount,
//         role: "user",
//         status: "online",
//         withDrawalStatus: "nothing",
//         balance: 0,
//       };

//       // Simpan data pengguna ke Firestore
//       const docRef = doc(db, "usersCuti", formData.email); // Menggunakan email sebagai ID
//       await setDoc(docRef, {
//         ...userData,
//         timeStamp: serverTimestamp(),
//       });

//       router.push("/"); // Redirect setelah pengajuan cuti berhasil

//       localStorage.setItem(
//         "userMSavingProfile",
//         JSON.stringify(userData)
//       );
//       // router.push("/admin/payment"); // Redirect to Payment page after cuti submission

//     } catch (error) {
//       console.error("Error submitting cuti:", error);
//       setToastMessage("Error submitting cuti. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div>
//       <Navbar />
//       <div className="max-w-xl mx-auto p-6 bg-white md:border rounded-md md:shadow-md mt-36">
//         <h2 className="text-2xl font-semibold mb-6">Data Diri & Pengajuan Cuti</h2>
//         {/* Username Input */}
//         <label className="block mb-4">
//           Username:
//           <div className="p-3 border rounded my-3">
//             <input
//               type="text"
//               name="username"
//               className="form-input mt-1 block w-full rounded-md outline-none border-none"
//               value={formData.username}
//               onChange={handleInputChange}
//               placeholder="Isi username anda disini..."
//             />
//             {errors.username && (
//               <p className="text-red-500">{errors.username}</p>
//             )}
//           </div>
//         </label>
//         {/* Fullname Input */}
//         <label className="block mb-4">
//           Fullname:
//           <div className="p-3 border rounded my-3">
//             <input
//               type="text"
//               name="fullname"
//               className="form-input mt-1 block w-full rounded-md outline-none border-none"
//               value={formData.fullname}
//               onChange={handleInputChange}
//               placeholder="Isi nama lengkap anda disini..."
//             />
//             {errors.fullname && (
//               <p className="text-red-500">{errors.fullname}</p>
//             )}
//           </div>
//         </label>
//         {/* Email Input */}
//         <label className="block mb-4">
//           Email:
//           <div className="p-3 border rounded my-3">
//             <input
//               type="email"
//               name="email"
//               className="form-input mt-1 block w-full rounded-md outline-none border-none"
//               value={formData.email}
//               onChange={handleInputChange}
//               placeholder="Isi email anda disini..."
//             />
//           </div>
//           {errors.email && <p className="text-red-500">{errors.email}</p>}
//         </label>
//         {/* Password Input */}
//         <label className="block mb-4">
//           Password:
//           <div className="p-3 border rounded my-3">
//             <input
//               type="password"
//               name="password"
//               className="form-input mt-1 block w-full rounded-md outline-none border-none"
//               value={formData.password}
//               onChange={handleInputChange}
//               placeholder="Isi password anda disini..."
//             />
//             {errors.password && (
//               <p className="text-red-500">{errors.password}</p>
//             )}
//           </div>
//         </label>
//         {/* Confirm Password Input */}
//         <label className="block mb-4">
//           Confirm Password:
//           <div className="p-3 border rounded my-3">
//             <input
//               type="password"
//               name="confirmPassword"
//               className="form-input mt-1 block w-full rounded-md outline-none border-none"
//               value={formData.confirmPassword}
//               onChange={handleInputChange}
//               placeholder="Isi password anda disini..."
//             />
//             {errors.confirmPassword && (
//               <p className="text-red-500">{errors.confirmPassword}</p>
//             )}
//           </div>
//         </label>
//         <label className="block mb-4">
//           Bank:
//           <div className="p-3 border rounded my-3">
//             <select
//               name="bank"
//               value={formData.bank}
//               onChange={handleInputChange}
//               className="form-select mt-1 block w-full rounded-md outline-none border-none p-2"
//             >
//               <option value="BNI">BNI</option>
//               <option value="BRI">BRI</option>
//               <option value="BCA">BCA</option>
//               <option value="Mandiri">Mandiri</option>
//             </select>
//           </div>
//         </label>
//         {/* Account Number Input */}
//         <label className="block mb-4">
//         Nomor Akun:
//           <div className="p-3 border rounded my-3">
//             <input
//               type="text"
//               name="accountNumber"
//               className="form-input mt-1 block w-full rounded-md outline-none border-none"
//               value={formData.accountNumber}
//               onChange={handleInputChange}
//               placeholder="Isi nomor akun anda disini..."
//             />
//             {errors.accountNumber && (
//               <p className="text-red-500">{errors.accountNumber}</p>
//             )}
//           </div>
//         </label>
//         {/* Amount Input */}
//         <label className="block mb-4">
//           Jumlah:
//           <div className="p-3 border rounded my-3">
//             <input
//               type="text"
//               name="amount"
//               className="form-input mt-1 block w-full rounded-md outline-none border-none"
//               value={formData.amount}
//               onChange={handleInputChange}
//               placeholder="Isi jumlah cuti anda disini..."
//             />
//           </div>
//         </label>
//         <label className="block mb-4">
//           Reason:
//           <div className="p-3 border rounded my-3">
//             <input
//               type="text"
//               name="reason"
//               className="form-input mt-1 block w-full rounded-md outline-none border-none"
//               value={formData.reason}
//               onChange={handleInputChange}
//               placeholder="Isi reason anda disini..."
//             />
//           </div>
//         </label>
//         <button
//           onClick={handleCuti}
//           className="w-full bg-blue-500 text-white p-3 rounded-md mt-6 hover:bg-blue-600"
//           disabled={isLoading}
//         >
//           {isLoading ? "Memproses..." : "Ajukan Cuti"}
//         </button>
//         {toastMessage && (
//           <div className="mt-4 p-3 bg-red-500 text-white rounded-md">
//             {toastMessage}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Cuti;



"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  doc,
  setDoc,
  query,
  where,
  getDocs,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";
import Navbar from "@/components/Navbar";

const Cuti = () => {
  const [formData, setFormData] = useState({
    username: "",
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    reason: "",
    bank: "BNI",
    accountNumber: "",
    salary: 0,
    amount: "",
  });
  const [errors, setErrors] = useState({});
  const [toastMessage, setToastMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cutiCount, setCutiCount] = useState(0);
  const [isFormVisible, setIsFormVisible] = useState(true); // State untuk menandai apakah form harus ditampilkan atau disembunyikan setelah mencapai batas cuti
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const userProfile = localStorage.getItem("userProfile");
      if (userProfile) {
        const userData = JSON.parse(userProfile);
        setFormData({
          ...formData,
          username: userData.name,
          fullname: userData.name,
          email: userData.email,
        });

        const usersCutiCollection = query(
          collection(db, "usersCuti"),
          where("email", "==", userData.email)
        );
        const cutiSnapshot = await getDocs(usersCutiCollection);
        setCutiCount(cutiSnapshot.size);

        // Set isFormVisible berdasarkan jumlah cuti yang sudah ada
        setIsFormVisible(cutiSnapshot.size < 2);
      }
    };
    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let updatedFormData = { ...formData, [name]: name === "duration" ? parseInt(value) : value };

    if (name === "employeeId") {
      switch (value) {
        case "11C":
          updatedFormData.salary = 3000000;
          updatedFormData.golongan = "Karyawan";
          break;
        case "11B":
          updatedFormData.salary = 5000000;
          updatedFormData.golongan = "Head Staff";
          break;
        case "11A":
          updatedFormData.salary = 6000000;
          updatedFormData.golongan = "HRD";
          break;
        default:
          updatedFormData.salary = 0;
          updatedFormData.golongan = "";
      }
    }

    setFormData(updatedFormData);
  };

  const handleCuti = async () => {
    try {
      let newErrors = {};
      if (!formData.username) {
        newErrors.username = "Username is required";
      }
      if (!formData.fullname) {
        newErrors.fullname = "Fullname is required";
      }
      if (!formData.reason) {
        newErrors.reason = "Reason is required";
      }
      if (!formData.email) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Email address is invalid";
      }
      if (!formData.password) {
        newErrors.password = "Password is required";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
      setErrors(newErrors);

      if (Object.keys(newErrors).length > 0 || !isFormVisible) {
        return;
      }

      setIsLoading(true);

      const userData = {
        username: formData.username,
        fullname: formData.fullname,
        email: formData.email,
        reason: formData.reason,
        bank: formData.bank,
        accountNumber: formData.accountNumber,
        salary: formData.salary,
        amount: formData.amount,
        role: "user",
        status: "online",
        withDrawalStatus: "nothing",
        balance: 0,
      };

      // Simpan data pengguna ke Firestore
      const docRef = doc(db, "usersCuti", formData.email); // Menggunakan email sebagai ID
      await setDoc(docRef, {
        ...userData,
        timeStamp: serverTimestamp(),
      });

      // Menampilkan pesan sukses
      setToastMessage("Cuti berhasil diajukan.");

      // Reset form setelah menyimpan data
      setFormData({
        username: "",
        fullname: "",
        email: "",
        password: "",
        confirmPassword: "",
        reason: "",
        bank: "BNI",
        accountNumber: "",
        salary: 0,
        amount: "",
      });

      // Update cutiCount setelah berhasil mengajukan cuti
      setCutiCount(cutiCount + 1);

      // Set isFormVisible menjadi false jika sudah mencapai batas cuti
      if (cutiCount + 1 >= 2) {
        setIsFormVisible(false);
      }
    } catch (error) {
      console.error("Error submitting cuti:", error);
      setToastMessage("Error submitting cuti. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      {isFormVisible && (
        <div className="max-w-xl mx-auto p-6 bg-white md:border rounded-md md:shadow-md mt-36">
          <h2 className="text-2xl font-semibold mb-6">Data Diri & Pengajuan Cuti</h2>
          {/* Username Input */}
          <label className="block mb-4">
            Username:
            <div className="p-3 border rounded my-3">
              <input
                type="text"
                name="username"
                className="form-input mt-1 block w-full rounded-md outline-none border-none"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Isi username anda disini..."
              />
              {errors.username && (
                <p className="text-red-500">{errors.username}</p>
              )}
            </div>
          </label>
          {/* Fullname Input */}
          <label className="block mb-4">
            Fullname:
            <div className="p-3 border rounded my-3">
              <input
                type="text"
                name="fullname"
                className="form-input mt-1 block w-full rounded-md outline-none border-none"
                value={formData.fullname}
                onChange={handleInputChange}
                placeholder="Isi nama lengkap anda disini..."
              />
              {errors.fullname && (
                <p className="text-red-500">{errors.fullname}</p>
              )}
            </div>
          </label>
          {/* Email Input */}
          <label className="block mb-4">
            Email:
            <div className="p-3 border rounded my-3">
              <input
                type="email"
                name="email"
                className="form-input mt-1 block w-full rounded-md outline-none border-none"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Isi email anda disini..."
              />
            </div>
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </label>
          {/* Password Input */}
          <label className="block mb-4">
            Password:
            <div className="p-3 border rounded my-3">
              <input
                type="password"
                name="password"
                className="form-input mt-1 block w-full rounded-md outline-none border-none"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Isi password anda disini..."
              />
              {errors.password && (
                <p className="text-red-500">{errors.password}</p>
              )}
            </div>
          </label>
          {/* Confirm Password Input */}
          <label className="block mb-4">
            Confirm Password:
            <div className="p-3 border rounded my-3">
              <input
                type="password"
                name="confirmPassword"
                className="form-input mt-1 block w-full rounded-md outline-none border-none"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Isi password anda disini..."
              />
              {errors.confirmPassword && (
                <p className="text-red-500">{errors.confirmPassword}</p>
              )}
            </div>
          </label>
          <label className="block mb-4">
            Bank:
            <div className="p-3 border rounded my-3">
              <select
                name="bank"
                value={formData.bank}
                onChange={handleInputChange}
                className="form-select mt-1 block w-full rounded-md outline-none border-none p-2"
              >
                <option value="BNI">BNI</option>
                <option value="BRI">BRI</option>
                <option value="BCA">BCA</option>
                <option value="Mandiri">Mandiri</option>
              </select>
            </div>
          </label>
          {/* Account Number Input */}
          <label className="block mb-4">
            Nomor Akun:
            <div className="p-3 border rounded my-3">
              <input
                type="text"
                name="accountNumber"
                className="form-input mt-1 block w-full rounded-md outline-none border-none"
                value={formData.accountNumber}
                onChange={handleInputChange}
                placeholder="Isi nomor akun anda disini..."
              />
              {errors.accountNumber && (
                <p className="text-red-500">{errors.accountNumber}</p>
              )}
            </div>
          </label>
          {/* Amount Input */}
          <label className="block mb-4">
            Jumlah:
            <div className="p-3 border rounded my-3">
              <input
                type="text"
                name="amount"
                className="form-input mt-1 block w-full rounded-md outline-none border-none"
                value={formData.amount}
                onChange={handleInputChange}
                placeholder="Isi jumlah cuti anda disini..."
              />
            </div>
          </label>
          <label className="block mb-4">
            Reason:
            <div className="p-3 border rounded my-3">
              <input
                type="text"
                name="reason"
                className="form-input mt-1 block w-full rounded-md outline-none border-none"
                value={formData.reason}
                onChange={handleInputChange}
                placeholder="Isi reason anda disini..."
              />
              {errors.reason && (
                <p className="text-red-500">{errors.reason}</p>
              )}
            </div>
          </label>
          <button
            onClick={handleCuti}
            className={`w-full bg-blue-500 text-white p-3 rounded-md mt-6 hover:bg-blue-600 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? "Memproses..." : "Ajukan Cuti"}
          </button>
          {toastMessage && (
            <div className="mt-4 p-3 bg-green-500 text-white rounded-md">
              {toastMessage}
            </div>
          )}
        </div>
      )}
      {!isFormVisible && (
        <div className="max-w-xl mx-auto p-6 bg-white md:border rounded-md md:shadow-md mt-36">
          <h2 className="text-2xl font-semibold mb-6">Anda sudah mencapai batas pengajuan cuti</h2>
          <p>Anda tidak dapat mengajukan cuti lagi karena sudah mencapai batas pengajuan sebanyak dua kali.</p>
        </div>
      )}
    </div>
  );
};

export default Cuti;

