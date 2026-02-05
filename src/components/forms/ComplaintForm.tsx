 import { useState } from "react";
 import { Button } from "@/components/ui/button";
 import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
 import { Input } from "@/components/ui/input";
 import { Textarea } from "@/components/ui/textarea";
 import { Label } from "@/components/ui/label";
 import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
 } from "@/components/ui/select";
 import { MessageSquarePlus, CheckCircle2 } from "lucide-react";
 import { toast } from "sonner";
 
 interface ComplaintFormProps {
   department: "electricity" | "gas" | "municipal";
   issueTypes: string[];
 }
 
 export function ComplaintForm({ department, issueTypes }: ComplaintFormProps) {
   const [isSubmitted, setIsSubmitted] = useState(false);
   const [formData, setFormData] = useState({
     name: "",
     phone: "",
     issueType: "",
     description: "",
   });
 
   const buttonColors = {
     electricity: "bg-electricity hover:bg-electricity/90",
     gas: "bg-gas hover:bg-gas/90",
     municipal: "bg-municipal hover:bg-municipal/90",
   };
 
   const handleSubmit = (e: React.FormEvent) => {
     e.preventDefault();
     // Mock submission
     const complaintId = `CMP${Date.now().toString().slice(-6)}`;
     setIsSubmitted(true);
     toast.success(`Complaint registered successfully! ID: ${complaintId}`);
   };
 
   if (isSubmitted) {
     return (
       <Card className="border-2 border-success/30 bg-success-light">
         <CardContent className="flex flex-col items-center justify-center py-12 text-center">
           <CheckCircle2 className="mb-4 h-16 w-16 text-success" />
           <h3 className="text-xl font-semibold text-card-foreground">
             Complaint Submitted Successfully!
           </h3>
           <p className="mt-2 text-muted-foreground">
             Your complaint has been registered. You will receive updates via SMS.
           </p>
           <Button
             variant="outline"
             className="mt-6"
             onClick={() => {
               setIsSubmitted(false);
               setFormData({ name: "", phone: "", issueType: "", description: "" });
             }}
           >
             File Another Complaint
           </Button>
         </CardContent>
       </Card>
     );
   }
 
   return (
     <Card>
       <CardHeader>
         <CardTitle className="flex items-center gap-2">
           <MessageSquarePlus className="h-5 w-5" />
           File a Complaint
         </CardTitle>
       </CardHeader>
       <CardContent>
         <form onSubmit={handleSubmit} className="space-y-4">
           <div className="grid gap-4 sm:grid-cols-2">
             <div className="space-y-2">
               <Label htmlFor="name">Your Name</Label>
               <Input
                 id="name"
                 placeholder="Enter your full name"
                 value={formData.name}
                 onChange={(e) =>
                   setFormData({ ...formData, name: e.target.value })
                 }
                 required
                 className="touch-target"
               />
             </div>
             <div className="space-y-2">
               <Label htmlFor="phone">Phone Number</Label>
               <Input
                 id="phone"
                 type="tel"
                 placeholder="Enter your phone number"
                 value={formData.phone}
                 onChange={(e) =>
                   setFormData({ ...formData, phone: e.target.value })
                 }
                 required
                 className="touch-target"
               />
             </div>
           </div>
 
           <div className="space-y-2">
             <Label htmlFor="issueType">Issue Type</Label>
             <Select
               value={formData.issueType}
               onValueChange={(value) =>
                 setFormData({ ...formData, issueType: value })
               }
               required
             >
               <SelectTrigger id="issueType" className="touch-target">
                 <SelectValue placeholder="Select issue type" />
               </SelectTrigger>
               <SelectContent>
                 {issueTypes.map((type) => (
                   <SelectItem key={type} value={type}>
                     {type}
                   </SelectItem>
                 ))}
               </SelectContent>
             </Select>
           </div>
 
           <div className="space-y-2">
             <Label htmlFor="description">Description</Label>
             <Textarea
               id="description"
               placeholder="Describe your issue in detail..."
               value={formData.description}
               onChange={(e) =>
                 setFormData({ ...formData, description: e.target.value })
               }
               required
               rows={4}
             />
           </div>
 
           <Button
             type="submit"
             className={`w-full touch-target text-white ${buttonColors[department]}`}
           >
             Submit Complaint
           </Button>
         </form>
       </CardContent>
     </Card>
   );
 }