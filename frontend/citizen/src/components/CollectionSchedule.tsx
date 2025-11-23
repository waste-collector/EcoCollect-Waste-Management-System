import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { Trash2, Recycle, Leaf, Calendar } from "lucide-react";

// Mock data for zones and schedules
const zones = [
  { id: "zone-1", name: "City Center" },
  { id: "zone-2", name: "North District" },
  { id: "zone-3", name: "South District" },
  { id: "zone-4", name: "East District" },
  { id: "zone-5", name: "West District" },
];

const scheduleData: Record<string, any[]> = {
  "zone-1": [
    {
      type: "Household Waste",
      icon: Trash2,
      color: "bg-gray-500",
      days: ["Monday", "Thursday"],
      time: "7:00 AM - 12:00 PM",
    },
    {
      type: "Recycling",
      icon: Recycle,
      color: "bg-yellow-500",
      days: ["Wednesday"],
      time: "8:00 AM - 1:00 PM",
    },
    {
      type: "Green Waste",
      icon: Leaf,
      color: "bg-green-600",
      days: ["Saturday"],
      time: "9:00 AM - 2:00 PM",
    },
  ],
  "zone-2": [
    {
      type: "Household Waste",
      icon: Trash2,
      color: "bg-gray-500",
      days: ["Tuesday", "Friday"],
      time: "6:30 AM - 11:30 AM",
    },
    {
      type: "Recycling",
      icon: Recycle,
      color: "bg-yellow-500",
      days: ["Thursday"],
      time: "7:30 AM - 12:30 PM",
    },
    {
      type: "Green Waste",
      icon: Leaf,
      color: "bg-green-600",
      days: ["Saturday"],
      time: "8:00 AM - 1:00 PM",
    },
  ],
  "zone-3": [
    {
      type: "Household Waste",
      icon: Trash2,
      color: "bg-gray-500",
      days: ["Monday", "Thursday"],
      time: "1:00 PM - 6:00 PM",
    },
    {
      type: "Recycling",
      icon: Recycle,
      color: "bg-yellow-500",
      days: ["Tuesday"],
      time: "2:00 PM - 7:00 PM",
    },
    {
      type: "Green Waste",
      icon: Leaf,
      color: "bg-green-600",
      days: ["Friday"],
      time: "10:00 AM - 3:00 PM",
    },
  ],
  "zone-4": [
    {
      type: "Household Waste",
      icon: Trash2,
      color: "bg-gray-500",
      days: ["Tuesday", "Friday"],
      time: "7:00 AM - 12:00 PM",
    },
    {
      type: "Recycling",
      icon: Recycle,
      color: "bg-yellow-500",
      days: ["Wednesday"],
      time: "8:00 AM - 1:00 PM",
    },
    {
      type: "Green Waste",
      icon: Leaf,
      color: "bg-green-600",
      days: ["Saturday"],
      time: "9:00 AM - 2:00 PM",
    },
  ],
  "zone-5": [
    {
      type: "Household Waste",
      icon: Trash2,
      color: "bg-gray-500",
      days: ["Wednesday", "Saturday"],
      time: "6:00 AM - 11:00 AM",
    },
    {
      type: "Recycling",
      icon: Recycle,
      color: "bg-yellow-500",
      days: ["Friday"],
      time: "7:00 AM - 12:00 PM",
    },
    {
      type: "Green Waste",
      icon: Leaf,
      color: "bg-green-600",
      days: ["Monday"],
      time: "8:00 AM - 1:00 PM",
    },
  ],
};

export function CollectionSchedule() {
  const [selectedZone, setSelectedZone] = useState<string>("");

  const currentSchedule = selectedZone ? scheduleData[selectedZone] : null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-green-600" />
          Collection Schedule
        </CardTitle>
        <CardDescription>
          Check waste collection schedules in your area
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Zone Selection */}
        <div className="space-y-2">
          <label className="text-gray-700">Select your zone</label>
          <Select value={selectedZone} onValueChange={setSelectedZone}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a zone..." />
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

        {/* Schedule Display */}
        {currentSchedule && (
          <div className="space-y-4 mt-6">
            {currentSchedule.map((schedule, index) => {
              const Icon = schedule.icon;
              return (
                <div
                  key={index}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className={`${schedule.color} p-3 rounded-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-gray-900 mb-2">{schedule.type}</h3>
                      <div className="space-y-2">
                        <div className="flex flex-wrap gap-2">
                          {schedule.days.map((day: string) => (
                            <Badge key={day} variant="secondary">
                              {day}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-gray-600">
                          Time: {schedule.time}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Additional Info */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-blue-900">
                💡 <strong>Reminder:</strong> Please put your bins out the evening
                before collection day, no later than 8:00 PM.
              </p>
            </div>
          </div>
        )}

        {!selectedZone && (
          <div className="text-center py-12 text-gray-500">
            <Calendar className="w-16 h-16 mx-auto mb-4 opacity-20" />
            <p>Select your zone to view collection schedules</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}