import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

export default function SendNotification() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [employees, setEmployees] = useState([]);

  const sendNotification = async () => {
    if (!username) {
      alert("Please select a name");
      return;
    }

    if (!message.trim()) {
      alert("Please enter a message");
      return;
    }

    try {
      const payload = {
        to_user: username,
        sender_name: localStorage.getItem("username") || "Unknown",
        message: message,
        type: type
      };

      console.log("Notification payload:", payload);

      const res = await axios.post(
        "https://sia-backend-khcp.onrender.com/notifications",
        payload
      );

      console.log("Notification response:", res.data);

      if (username === "ALL") {
        alert(
          `Notification sent to ${res.data.count || "all"} active employees`
        );
      } else {
        alert("Notification sent");
      }

      // Clear form after successful send
      setUsername("");
      setMessage("");
      setType("");

    } catch (err) {
      console.log(
        "ERROR DETAILS:",
        err.response?.data || err
      );

      alert(
        err.response?.data?.detail ||
        "Notification failed"
      );
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "https://sia-backend-khcp.onrender.com/employees",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log("EMPLOYEES API RESPONSE =", res.data);

      const activeEmployees = Array.isArray(res.data)
        ? res.data.filter(
            (employee) =>
              employee.status === "Active"
          )
        : [];

      console.log(
        "ACTIVE EMPLOYEES =",
        activeEmployees
      );

      setEmployees(activeEmployees);

    } catch (err) {
      console.log(
        "Employee fetch error:",
        err
      );
    }
  };

  return (
    <div>
      <Sidebar />

      <div
        style={{
          marginLeft: "240px",
          padding: "40px"
        }}
      >
        <h1>Send Notification</h1>

        <select
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
          style={{
            width: "212px",
            padding: "8px",
            fontSize: "16px"
          }}
        >
          <option value="">
            Select Name
          </option>

          {/* SEND TO EVERYONE */}
          <option value="ALL">
            All
          </option>

          {/* ACTIVE EMPLOYEES ONLY */}
          {employees.map((employee) => (
            <option
              key={employee.id}
              value={employee.username}
            >
              {employee.full_name}
            </option>
          ))}
        </select>

        <br />
        <br />

        <input
          placeholder="Notification Type"
          value={type}
          onChange={(e) =>
            setType(e.target.value)
          }
        />

        <br />
        <br />

        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
          style={{
            width: "300px",
            minHeight: "100px"
          }}
        />

        <br />
        <br />

        <button onClick={sendNotification}>
          Send Notification
        </button>
      </div>
    </div>
  );
}