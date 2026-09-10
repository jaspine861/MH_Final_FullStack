import { useEffect, useState } from "react";
import "./PharmacySalesReport.css";
import { getBills } from "../../services/billService";

function PharmacySalesReport() {

    const [bills, setBills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [reportType, setReportType] = useState("daily");

    useEffect(() => {

        const fetchBills = async () => {

            try {

                const data = await getBills();

                console.log("BILLS:", data);

                setBills(
                    Array.isArray(data)
                        ? data
                        : []
                );

            } catch (error) {

                console.error(
                    "Error fetching bills:",
                    error
                );

            } finally {

                setLoading(false);

            }
        };

        fetchBills();

    }, []);


    const isSameDay = (date1, date2) => {

        return (
            date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate()
        );
    };


    const getStartOfWeek = (date) => {

        const result = new Date(date);

        const day = result.getDay();

        const difference =
            day === 0
                ? -6
                : 1 - day;

        result.setDate(
            result.getDate() + difference
        );

        result.setHours(0, 0, 0, 0);

        return result;
    };


    const filteredBills = bills.filter((bill) => {

        if (
            bill.payment_status?.toLowerCase() !==
            "paid"
        ) {
            return false;
        }

        if (!bill.bill_date) {
            return false;
        }

        const billDate =
            new Date(bill.bill_date);

        const today = new Date();


        if (reportType === "daily") {

            return isSameDay(
                billDate,
                today
            );
        }


        if (reportType === "weekly") {

            const startOfWeek =
                getStartOfWeek(today);

            const endOfWeek =
                new Date(startOfWeek);

            endOfWeek.setDate(
                startOfWeek.getDate() + 6
            );

            endOfWeek.setHours(
                23,
                59,
                59,
                999
            );

            return (
                billDate >= startOfWeek &&
                billDate <= endOfWeek
            );
        }


        if (reportType === "monthly") {

            return (
                billDate.getFullYear() ===
                    today.getFullYear() &&

                billDate.getMonth() ===
                    today.getMonth()
            );
        }


        return true;

    });


    const totalSales =
        filteredBills.reduce(
            (total, bill) =>
                total +
                Number(
                    bill.amount || 0
                ),
            0
        );


    const cashSales =
        filteredBills
            .filter(
                (bill) =>
                    bill.payment_method ===
                    "Cash"
            )
            .reduce(
                (total, bill) =>
                    total +
                    Number(
                        bill.amount || 0
                    ),
                0
            );


    const onlineSales =
        filteredBills
            .filter(
                (bill) =>
                    bill.payment_method !==
                    "Cash"
            )
            .reduce(
                (total, bill) =>
                    total +
                    Number(
                        bill.amount || 0
                    ),
                0
            );


    const formatDate = (date) => {

        if (!date) {
            return "-";
        }

        return new Date(date)
            .toLocaleDateString(
                "en-IN",
                {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                }
            );
    };


    return (

        <div className="sales-report-section">

            <div className="sales-report-header">

                <div>

                    <h2>
                        Pharmacy Sales Report
                    </h2>

                    <p>
                        View daily, weekly and monthly sales
                    </p>

                </div>

            </div>


            <div className="report-filter-buttons">

                <button
                    className={
                        reportType === "daily"
                            ? "active"
                            : ""
                    }
                    onClick={() =>
                        setReportType("daily")
                    }
                >
                    Daily
                </button>


                <button
                    className={
                        reportType === "weekly"
                            ? "active"
                            : ""
                    }
                    onClick={() =>
                        setReportType("weekly")
                    }
                >
                    Weekly
                </button>


                <button
                    className={
                        reportType === "monthly"
                            ? "active"
                            : ""
                    }
                    onClick={() =>
                        setReportType("monthly")
                    }
                >
                    Monthly
                </button>

            </div>


            <div className="sales-summary-grid">

                <div className="sales-summary-card">

                    <span>
                        Total Sales
                    </span>

                    <strong>
                        ₹{totalSales.toFixed(2)}
                    </strong>

                </div>


                <div className="sales-summary-card">

                    <span>
                        Total Bills
                    </span>

                    <strong>
                        {filteredBills.length}
                    </strong>

                </div>


                <div className="sales-summary-card">

                    <span>
                        Cash Sales
                    </span>

                    <strong>
                        ₹{cashSales.toFixed(2)}
                    </strong>

                </div>


                <div className="sales-summary-card">

                    <span>
                        Digital Sales
                    </span>

                    <strong>
                        ₹{onlineSales.toFixed(2)}
                    </strong>

                </div>

            </div>


            {loading ? (

                <p>
                    Loading sales report...
                </p>

            ) : (

                <div className="sales-report-table">

                    <table>

                        <thead>

                            <tr>

                                <th>
                                    Bill ID
                                </th>

                                <th>
                                    Patient
                                </th>

                                <th>
                                    Amount
                                </th>

                                <th>
                                    Payment Method
                                </th>

                                <th>
                                    Date
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {filteredBills.length > 0 ? (

                                filteredBills.map(
                                    (bill) => (

                                        <tr
                                            key={
                                                bill.bill_id
                                            }
                                        >

                                            <td>
                                                BILL
                                                {String(
                                                    bill.bill_id
                                                ).padStart(
                                                    3,
                                                    "0"
                                                )}
                                            </td>


                                            <td>
                                                P
                                                {String(
                                                    bill.patient_id
                                                ).padStart(
                                                    3,
                                                    "0"
                                                )}
                                            </td>


                                            <td>
                                                ₹
                                                {Number(
                                                    bill.amount ||
                                                    0
                                                ).toFixed(
                                                    2
                                                )}
                                            </td>


                                            <td>
                                                {
                                                    bill.payment_method ||
                                                    "-"
                                                }
                                            </td>


                                            <td>
                                                {
                                                    formatDate(
                                                        bill.bill_date
                                                    )
                                                }
                                            </td>

                                        </tr>

                                    )
                                )

                            ) : (

                                <tr>

                                    <td
                                        colSpan="5"
                                        style={{
                                            textAlign:
                                                "center",
                                            padding:
                                                "25px"
                                        }}
                                    >
                                        No sales found
                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

            )}

        </div>

    );
}

export default PharmacySalesReport;