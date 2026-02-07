import { Layout } from "@/components/layout/Layout";
import { PersonnelCard } from "@/components/cards/PersonnelCard";
import { BalanceCard } from "@/components/cards/BalanceCard";
import { NoticeCard } from "@/components/cards/NoticeCard";
import { ComplaintForm } from "@/components/forms/ComplaintForm";
import { ComplaintsList } from "@/components/complaints/ComplaintsList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Zap, Users, CreditCard, Bell, MessageSquare } from "lucide-react";

const personnelData = [
  { name: "Rajesh Kumar", role: "Area Engineer", phone: "9876543210", area: "Sector 15-20" },
  { name: "Priya Singh", role: "Junior Engineer", phone: "9876543211", area: "Sector 21-25" },
  { name: "Amit Sharma", role: "Lineman", phone: "9876543212", area: "Sector 15-25" },
];

const notices = [
  { title: "Scheduled Power Cut", description: "Maintenance work in Sector 17-19 on Feb 10, 10 AM - 4 PM", date: "Feb 8, 2024", type: "warning" as const },
  { title: "Emergency Repairs", description: "Transformer repair in Sector 21. Power restored by 6 PM today.", date: "Feb 5, 2024", type: "urgent" as const },
  { title: "New Online Payment Portal", description: "Pay your electricity bills online with 2% cashback. Available now!", date: "Feb 1, 2024", type: "info" as const },
];

const issueTypes = [
  "Power Outage",
  "Voltage Fluctuation",
  "Meter Issue",
  "Billing Problem",
  "Street Light Issue",
  "New Connection",
  "Other",
];

export default function Electricity() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-electricity/20 via-electricity/10 to-background py-12">
        <div className="container px-4 md:px-6">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-electricity/20 p-4">
              <Zap className="h-12 w-12 text-electricity" />
            </div>
            <div>
              <h1 className="text-heading text-foreground">Electricity Department</h1>
              <p className="mt-1 text-muted-foreground">
                Manage your electricity services, pay bills, and file complaints
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container px-4 py-8 md:px-6">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 gap-2 sm:w-auto sm:grid-cols-4">
            <TabsTrigger value="overview" className="touch-target gap-2">
              <CreditCard className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="personnel" className="touch-target gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Personnel</span>
            </TabsTrigger>
            <TabsTrigger value="complaints" className="touch-target gap-2">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Complaints</span>
            </TabsTrigger>
            <TabsTrigger value="notices" className="touch-target gap-2">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Notices</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="animate-fade-in space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <BalanceCard
                balance="₹1,250.00"
                validUntil="March 15, 2024"
                lastRecharge={{ amount: "₹500.00", date: "Feb 1, 2024" }}
                variant="electricity"
              />
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Recent Notices</h3>
                {notices.slice(0, 2).map((notice, index) => (
                  <NoticeCard key={index} {...notice} />
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="personnel" className="animate-fade-in">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-foreground">Appointed Personnel</h3>
              <p className="text-sm text-muted-foreground">
                Contact your area officers for assistance
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {personnelData.map((person, index) => (
                <PersonnelCard key={index} {...person} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="complaints" className="animate-fade-in">
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Your Complaints</h3>
                <ComplaintsList department="electricity" />
              </div>
              <ComplaintForm department="electricity" issueTypes={issueTypes} />
            </div>
          </TabsContent>

          <TabsContent value="notices" className="animate-fade-in">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-foreground">Notices & Alerts</h3>
              <p className="text-sm text-muted-foreground">
                Stay updated with power cuts, maintenance schedules, and announcements
              </p>
            </div>
            <div className="space-y-4">
              {notices.map((notice, index) => (
                <NoticeCard key={index} {...notice} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </Layout>
  );
}
