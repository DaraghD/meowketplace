import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'; // Assuming you're using shadcn-ui
import { userData } from '@/lib/types/types';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { Menubar, MenubarContent, MenubarMenu, MenubarTrigger } from './ui/menubar';
import { MenubarItem } from '@radix-ui/react-menubar';
import { toast } from 'sonner';


interface Report {
    id: number;
    reportStatus: 'PENDING' | 'RESOLVED' | 'DENIED'; // Adjust as needed
    user: userData;
    reportType: 'PRODUCT' | 'REVIEW' | 'USER'; // Adjust as needed
    reportTypeId: number;
    reportReason: string;
}

interface ReportCardProps {
    report: Report;
}

const ReportCard: React.FC<ReportCardProps> = ({ report }) => {
    const updateReport = async (report_status: String, id: number) => {
        const response = await fetch('http://localhost:8080/api/report', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
                id: id,
                reportStatus: report_status,
            }),
        });
        const text = await response.text()
        toast(text);
    };
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
                    <strong className="block mb-1">{`Status: ${report.reportStatus}`}</strong>
                </div>
                <div>
                    <Link to={`/${report.reportType.toLowerCase()}/${report.reportTypeId}`}>
                        View Reported item
                    </Link>
                    {/* router to the product, if going to a review? */}
                </div>
            </CardContent>
            <CardFooter>
                {(report.reportStatus === 'PENDING') && (
                    <Menubar className="h-8">
                        <MenubarMenu>
                            <MenubarTrigger
                                className="flex items-center space-x-2 h-full cursor-pointer"
                                style={{ backgroundColor: "transparent" }}
                            >
                                <img
                                    src="/assets/icons/hamburger.png"
                                    className="w-auto h-10"
                                />
                                <span className="text-lg font-bold">
                                    Take action
                                </span>
                            </MenubarTrigger>
                            <MenubarContent>
                                <MenubarItem>
                                    <Button className='flex' onClick={() => {
                                        console.log("TRYING TO UPDATE : ", report.id);
                                        updateReport("RESOLVED", report.id);
                                    }}>
                                        {report.reportType === 'PRODUCT'
                                            ? 'Remove Product'
                                            : report.reportType === 'USER'
                                                ? 'Ban User'
                                                : 'Remove Review'}
                                    </Button>
                                </MenubarItem>
                                <MenubarItem>
                                    <Button onClick={() => {
                                        updateReport("DENIED", report.id);
                                    }}>
                                        Reject report
                                    </Button>
                                </MenubarItem>
                            </MenubarContent>
                        </MenubarMenu>
                    </Menubar>)}
                {/* Add actions here (e.g., buttons to resolve, ignore, etc.) */}
            </CardFooter>
        </Card >
    );
};

export default ReportCard;
