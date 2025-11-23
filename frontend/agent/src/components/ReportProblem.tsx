import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Label } from "./ui/label";
import { AlertTriangle, CheckCircle2, MapPin, Upload } from "lucide-react";
import { toast } from "sonner";

const problemTypes = [
  { id: "missed-collection", label: "Missed Collection" },
  { id: "overflowing", label: "Overflowing Container" },
  { id: "damaged-container", label: "Damaged Container" },
  { id: "illegal-dumping", label: "Illegal Dumping" },
  { id: "schedule-issue", label: "Schedule Issue" },
  { id: "other", label: "Other" },
];

const zones = [
  { id: "zone-1", name: "City Center" },
  { id: "zone-2", name: "North District" },
  { id: "zone-3", name: "South District" },
  { id: "zone-4", name: "East District" },
  { id: "zone-5", name: "West District" },
];

export function ReportProblem() {
  const [formData, setFormData] = useState({
    problemType: "",
    zone: "",
    address: "",
    description: "",
    contactName: "",
    contactEmail: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [reportNumber, setReportNumber] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.problemType || !formData.zone || !formData.address || !formData.description) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Generate report number
    const newReportNumber = `SIG-${Date.now().toString().slice(-8)}`;
    setReportNumber(newReportNumber);
    setIsSubmitted(true);
    
    toast.success("Report submitted successfully!");
  };

  const handleReset = () => {
    setFormData({
      problemType: "",
      zone: "",
      address: "",
      description: "",
      contactName: "",
      contactEmail: "",
    });
    setIsSubmitted(false);
    setReportNumber("");
  };

  if (isSubmitted) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-8 space-y-6">
            <div className="flex justify-center">
              <div className="bg-green-100 p-4 rounded-full">
                <CheckCircle2 className="w-16 h-16 text-green-600" />
              </div>
            </div>
            <div>
              <h3 className="text-green-700 mb-2">Report submitted successfully!</h3>
              <p className="text-gray-600">
                Your report has been recorded and will be processed as soon as possible.
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg inline-block">
              <p className="text-gray-600 mb-1">Report Number:</p>
              <p className="text-gray-900">{reportNumber}</p>
            </div>
            <p className="text-gray-600">
              Keep this number to track the progress of your report.
            </p>
            <Button onClick={handleReset} variant="outline">
              Submit a new report
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-orange-600" />
          Report a Problem
        </CardTitle>
        <CardDescription>
          Inform us of an issue related to waste collection
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Problem Type */}
          <div className="space-y-2">
            <Label htmlFor="problemType">
              Problem Type <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.problemType}
              onValueChange={(value: string) =>
                setFormData({ ...formData, problemType: value })
              }
            >
              <SelectTrigger id="problemType">
                <SelectValue placeholder="Select problem type..." />
              </SelectTrigger>
              <SelectContent>
                {problemTypes.map((type) => (
                  <SelectItem key={type.id} value={type.id}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Zone */}
          <div className="space-y-2">
            <Label htmlFor="zone">
              Zone <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.zone}
              onValueChange={(value: string) =>
                setFormData({ ...formData, zone: value })
              }
            >
              <SelectTrigger id="zone">
                <SelectValue placeholder="Select your zone..." />
              </SelectTrigger>
              <SelectContent>
                {zones.map((zone) => (
                  <SelectItem key={zone.id} value={zone.id}>
                    {zone.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Address */}
          <div className="space-y-2">
            <Label htmlFor="address">
              Specific Address <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                id="address"
                placeholder="e.g., 15 Main Street"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                className="pl-10"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">
              Problem Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              placeholder="Describe the problem in detail..."
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={4}
            />
          </div>

          {/* Contact Information (Optional) */}
          <div className="border-t pt-6">
            <h4 className="text-gray-900 mb-4">Contact Information (optional)</h4>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="contactName">Full Name</Label>
                <Input
                  id="contactName"
                  placeholder="Your name"
                  value={formData.contactName}
                  onChange={(e) =>
                    setFormData({ ...formData, contactName: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactEmail">Email</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.contactEmail}
                  onChange={(e) =>
                    setFormData({ ...formData, contactEmail: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="w-full flex justify-center gap-3 pt-4">
            <Button type="submit" variant="destructive">
                Submit Report
            </Button>
            <Button type="button" variant="outline" onClick={handleReset}>
                Reset
            </Button>
        </div>


          <p className="text-gray-500 text-center">
            <span className="text-red-500">*</span> Required fields
          </p>
        </form>
      </CardContent>
    </Card>
  );
}