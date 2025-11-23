import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Users, Plus, Search, Phone, Mail, Download, Upload } from 'lucide-react';
import { mockEmployees } from '../data/mockData';
import { Employee } from '../types';
import { exportEmployeesToXML, importEmployeesFromXML, downloadXML, uploadXML } from '../utils/xmlHandler';
import { toast } from 'sonner@2.0.3';

export function Employees() {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.employeeNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || employee.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'in_service': return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'off_duty': return 'bg-gray-500/10 text-gray-700 border-gray-500/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'driver': return 'bg-purple-500/10 text-purple-600 border-purple-500/20';
      case 'collector': return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'supervisor': return 'bg-orange-500/10 text-orange-600 border-orange-500/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'driver': return 'Driver';
      case 'collector': return 'Collector';
      case 'supervisor': return 'Supervisor';
      default: return role;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'available': return 'Available';
      case 'in_service': return 'In Service';
      case 'off_duty': return 'Off Duty';
      default: return status;
    }
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const handleExportXML = () => {
    const xmlContent = exportEmployeesToXML(employees);
    downloadXML(xmlContent, 'employees.xml');
    toast.success('Employees exported successfully');
  };

  const handleImportXML = () => {
    uploadXML((content) => {
      try {
        const importedEmployees = importEmployeesFromXML(content);
        setEmployees(importedEmployees);
        toast.success(`Imported ${importedEmployees.length} employees`);
      } catch (error) {
        toast.error('Failed to import XML file');
        console.error('Import error:', error);
      }
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Employees</h1>
          <p className="text-muted-foreground">Manage collection personnel</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleImportXML}>
            <Upload className="h-4 w-4 mr-2" />
            Import XML
          </Button>
          <Button variant="outline" onClick={handleExportXML}>
            <Download className="h-4 w-4 mr-2" />
            Export XML
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Employee
          </Button>
        </div>
      </div>

      {/* Quick statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">Total Employees</div>
          <div className="text-2xl mt-1">{employees.length}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">Available</div>
          <div className="text-2xl mt-1 text-green-600">
            {employees.filter(e => e.status === 'available').length}
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">In Service</div>
          <div className="text-2xl mt-1 text-blue-600">
            {employees.filter(e => e.status === 'in_service').length}
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">Off Duty</div>
          <div className="text-2xl mt-1 text-gray-600">
            {employees.filter(e => e.status === 'off_duty').length}
          </div>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search employees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterRole} onValueChange={setFilterRole}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="driver">Driver</SelectItem>
            <SelectItem value="collector">Collector</SelectItem>
            <SelectItem value="supervisor">Supervisor</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Employee list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEmployees.map((employee) => (
          <Card key={employee.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {getInitials(employee.firstName, employee.lastName)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="text-lg">
                    {employee.firstName} {employee.lastName}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {employee.employeeNumber}
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="outline" className={getRoleColor(employee.role)}>
                      {getRoleLabel(employee.role)}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <Badge variant="outline" className={getStatusColor(employee.status)}>
                  {getStatusLabel(employee.status)}
                </Badge>
              </div>

              <div className="space-y-2 pt-4 border-t border-border">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{employee.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground break-all">{employee.email}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" className="flex-1" size="sm">
                  View Profile
                </Button>
                <Button variant="outline" className="flex-1" size="sm">
                  Assign
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
