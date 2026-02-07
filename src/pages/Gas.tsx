import { Layout } from "@/components/layout/Layout";
import { PersonnelCard } from "@/components/cards/PersonnelCard";
import { BalanceCard } from "@/components/cards/BalanceCard";
import { NoticeCard } from "@/components/cards/NoticeCard";
import { ComplaintForm } from "@/components/forms/ComplaintForm";
import { ComplaintsList } from "@/components/complaints/ComplaintsList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Flame, Users, CreditCard, Bell, MessageSquare } from "lucide-react";

const personnelData = [
  { name: "Suresh Patel", role: "Area Manager", phone: "9876543220", area: "Zone A" },
  { name: "Neha Gupta", role: "Gas Safety Officer", phone: "9876543221", area: "Zone A-B" },
  { name: "Vikram Rao", role: "Delivery Coordinator", phone: "9876543222", area: "All Zones" },
];

const notices = [
  { title: "Cylinder Delivery Delay", description: "Due to festival rush, delivery may be delayed by 2-3 days in Zone A. We apologize for inconvenience.", date: "Feb 7, 2024", type: "warning" as const },
  { title: "Safety Inspection Drive", description: "Free gas connection safety check in Sector 15-20 on Feb 15. Book your slot now!", date: "Feb 5, 2024", type: "info" as const },
  { title: "Gas Leak Alert - Zone B", description: "Temporary gas supply cut in Zone B Block 3. Repair work ongoing.", date: "Feb 4, 2024", type: "urgent" as const },
];

const issueTypes = [
  "Cylinder Delivery Delay",
  "Gas Leak",
  "Defective Equipment",
  "Booking Issue",
  "Refund Request",
  "New Connection",
  "Transfer Connection",
  "Other",
];

export default function Gas() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gas/20 via-gas/10 to-background py-12">
        <div className="container px-4 md:px-6">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-gas/20 p-4">
              <Flame className="h-12 w-12 text-gas" />
            </div>
            <div>
              <h1 className="text-heading text-foreground">Gas Department</h1>
              <p className="mt-1 text-muted-foreground">
                Book cylinders, track deliveries, and manage your gas services
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
                balance="2 Cylinders"
                validUntil="Next Booking: Feb 20"
                lastRecharge={{ amount: "₹1,103.00", date: "Jan 15, 2024" }}
                variant="gas"
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
                <ComplaintsList department="gas" />
              </div>
              <ComplaintForm department="gas" issueTypes={issueTypes} />
            </div>
          </TabsContent>

          <TabsContent value="notices" className="animate-fade-in">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-foreground">Notices & Alerts</h3>
              <p className="text-sm text-muted-foreground">
                Stay updated with delivery schedules, safety alerts, and announcements
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
