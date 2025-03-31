import React, { useState, useEffect } from 'react';
import ReportCard from '@/components/ReportCard'; // Adjust path
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Report } from '@/lib/types/types.ts'

const Reports: React.FC = () => {
    const [reports, setReports] = useState<Report[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchReports = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch('http://localhost:8080/api/report', {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data: Report[] = await response.json();
                setReports(data);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("An unknown error occurred");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchReports();
    }, []);

    if (loading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Loading Reports...</CardTitle>
                </CardHeader>
            </Card>
        );
    }

    if (error || !reports) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Error Loading Reports</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>Error: {error}</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <div>
            {reports && reports.map((report) => (
                <ReportCard key={report.id} report={report} />
            ))}
            {reports && reports.length === 0 && (
                <Card>
                    <CardContent>
                        <p>No reports found.</p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default Reports;
