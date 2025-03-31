import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'; // Assuming you're using shadcn-ui
import { Badge } from '@/components/ui/badge'; // Assuming you're using shadcn-ui
import { userData } from '@/lib/types/types';


interface Report {
    id: number;
    reportStatus: 'PENDING' | 'RESOLVED' | 'IGNORED'; // Adjust as needed
    user: userData;
    reportType: 'PRODUCT' | 'REVIEW' | 'USER'; // Adjust as needed
    reportTypeId: number;
    reportReason: string;
}

interface ReportCardProps {
    report: Report;
}

const ReportCard: React.FC<ReportCardProps> = ({ report }) => {
    console.log(report);
    return (
        <Card>
            <CardHeader>
                <CardTitle>Report #{report.id}</CardTitle>
                <CardDescription>
                    Reported {report.reportType.toLowerCase()} #{report.reportTypeId} by {report.user.username}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="mb-4">
                    <strong className="block mb-1">Reason:</strong>
                    <p>{report.reportReason || 'No reason provided.'}</p>
                </div>
                <div>
                    <strong className="block mb-1">Status:</strong>
                    <Badge variant={report.reportStatus === 'PENDING' ? 'secondary' : report.reportStatus === 'RESOLVED' ? 'secondary' : 'destructive'}>
                        {report.reportStatus}
                    </Badge>
                </div>
            </CardContent>
            <CardFooter>
                {/* Add actions here (e.g., buttons to resolve, ignore, etc.) */}
            </CardFooter>
        </Card>
    );
};

export default ReportCard;
