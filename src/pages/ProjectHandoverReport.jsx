import logo from "../assets/logo.png";
import { useLocation } from "react-router-dom";

export default function ProjectHandoverReport() {

    return (

        <div
            style={{
                maxWidth: "900px",
                margin: "30px auto",
                padding: "30px",
                background: "white"
            }}
        >

            <div
                style={{
                    textAlign: "center"
                }}
            >

                <img
                    src={logo}
                    alt="Logo"
                    style={{
                        width: "120px",
                        marginBottom: "15px"
                    }}
                />

                <h1>KPA INDIA SOLUTIONS</h1>

                <h2>PROJECT HANDOVER REPORT</h2>

                <hr />

            </div>

            <h3>Project Information</h3>

            <table
                border="1"
                cellPadding="10"
                width="100%"
                style={{
                    borderCollapse: "collapse"
                }}
            >

                <tbody>

                    <tr>
                        <td><b>Project Name</b></td>
                        <td>{data?.project_name}</td>
                    </tr>

                    <tr>
                        <td><b>Customer</b></td>
                        <td>{data?.customer_name}</td>
                    </tr>

                    <tr>
                        <td><b>Engineer</b></td>
                        <td>{data?.engineer}</td>
                    </tr>

                    <tr>
                        <td><b>Completion Date</b></td>
                        <td>{data?.completion_date}</td>
                    </tr>

                </tbody>

            </table>

            <br />

            <button
                onClick={() => window.print()}
                style={{
                    padding: "12px 30px",
                    cursor: "pointer"
                }}
            >
                Print PDF
            </button>

        </div>

    );

}