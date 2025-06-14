
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DollarSign, CreditCard, AlertCircle, Plus } from "lucide-react";

const paymentsData = [
  {
    id: 1,
    creator: "Maya Rodriguez",
    amount: "$2,500",
    status: "Pending",
    dueDate: "2024-06-15",
    campaign: "Summer Fashion 2024"
  },
  {
    id: 2,
    creator: "Joe Chen",
    amount: "$1,800",
    status: "Paid",
    dueDate: "2024-06-10",
    campaign: "Tech Product Launch"
  },
  {
    id: 3,
    creator: "Sara Williams",
    amount: "$3,200",
    status: "Failed",
    dueDate: "2024-06-12",
    campaign: "Fitness Challenge"
  }
];

const getStatusBadge = (status: string) => {
  const statusColors = {
    Pending: "bg-yellow-100 text-yellow-800",
    Paid: "bg-green-100 text-green-800",
    Failed: "bg-red-100 text-red-800"
  };
  return statusColors[status as keyof typeof statusColors] || "bg-gray-100 text-gray-800";
};

const Budget = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Budget & Payments</h1>
          <p className="text-slate-600 mt-1">Manage campaign budgets and creator payments</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">Process Payments</Button>
          <Button className="bg-teal-600 hover:bg-teal-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Budget
          </Button>
        </div>
      </div>

      {/* Budget Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Total Allocated
            </CardTitle>
            <DollarSign className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">$210,000</div>
            <p className="text-xs text-slate-600 mt-1">Across all campaigns</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Spent to Date
            </CardTitle>
            <CreditCard className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">$142,000</div>
            <p className="text-xs text-slate-600 mt-1">68% of total budget</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Pending Payments
            </CardTitle>
            <AlertCircle className="h-5 w-5 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">$18,500</div>
            <p className="text-xs text-slate-600 mt-1">7 payments due</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Remaining Budget
            </CardTitle>
            <DollarSign className="h-5 w-5 text-teal-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">$68,000</div>
            <p className="text-xs text-slate-600 mt-1">32% remaining</p>
          </CardContent>
        </Card>
      </div>

      {/* Payment Schedule */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Creator</TableHead>
                <TableHead>Campaign</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paymentsData.map((payment) => (
                <TableRow key={payment.id} className="hover:bg-slate-50">
                  <TableCell className="font-medium">{payment.creator}</TableCell>
                  <TableCell>{payment.campaign}</TableCell>
                  <TableCell className="font-medium">{payment.amount}</TableCell>
                  <TableCell>{payment.dueDate}</TableCell>
                  <TableCell>
                    <Badge className={getStatusBadge(payment.status)}>
                      {payment.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      {payment.status === "Pending" && (
                        <Button variant="outline" size="sm">
                          Process
                        </Button>
                      )}
                      {payment.status === "Failed" && (
                        <Button variant="outline" size="sm">
                          Retry
                        </Button>
                      )}
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Budget;
