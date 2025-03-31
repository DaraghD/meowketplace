import React, { useState } from 'react';
import { Button } from '@/components/ui/button'; // Assuming you're using shadcn-ui
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

interface ReportButtonProps {
    type: 'product' | 'review' | 'user';
    id: number | undefined;
}

const ReportButton: React.FC<ReportButtonProps> = ({ type, id }) => {
    const [open, setOpen] = useState(false);
    const [reason, setReason] = useState('');

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/report', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    reportType: type,
                    reportTypeId: id,
                    reportReason: reason,
                }),
            });
            const response_text = await response.text();

            if (response.ok) {
                console.log('Report submitted successfully');
                toast.success("Report submitted successfully");
                setOpen(false);
                setReason('');
            } else {
                toast.error(response_text);
            }
        } catch (error) {
            console.error('Error submitting report:', error);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="text-white" variant="destructive">Report</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Report {type}</DialogTitle>
                    <DialogDescription>
                        Please provide a reason for reporting this {type}.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <label htmlFor="reason" className="text-right">Reason</label>
                        <Textarea
                            id="reason"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder="Enter your reason here."
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handleSubmit}>Submit Report</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ReportButton;
