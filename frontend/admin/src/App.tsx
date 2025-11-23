import { useState } from 'react';
import { SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader, SidebarFooter } from './components/ui/sidebar';
import { LayoutDashboard, MapPin, Truck, Users, Route, FileText, Settings, Leaf } from 'lucide-react';
import { Dashboard } from './components/Dashboard';
import { CollectionPoints } from './components/CollectionPoints';
import { Vehicles } from './components/Vehicles';
import { Employees } from './components/Employees';
import { Tours } from './components/Tours';
import { Reports } from './components/Reports';

type ViewType = 'dashboard' | 'points' | 'vehicles' | 'employees' | 'tours' | 'reports';

export default function App() {
  const [activeView, setActiveView] = useState<ViewType>('dashboard');

  const menuItems = [
    { id: 'dashboard' as ViewType, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'points' as ViewType, label: 'Collection Points', icon: MapPin },
    { id: 'vehicles' as ViewType, label: 'Vehicles', icon: Truck },
    { id: 'employees' as ViewType, label: 'Employees', icon: Users },
    { id: 'tours' as ViewType, label: 'Tours', icon: Route },
    { id: 'reports' as ViewType, label: 'Reports', icon: FileText },
  ];

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'points':
        return <CollectionPoints />;
      case 'vehicles':
        return <Vehicles />;
      case 'employees':
        return <Employees />;
      case 'tours':
        return <Tours />;
      case 'reports':
        return <Reports />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <SidebarProvider>
      <div className="flex size-full">
        <Sidebar>
          <SidebarHeader className="border-b border-sidebar-border p-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 flex items-center justify-center">
                <img
                  src="/image/logo.png"
                  alt="EcoCollect Logo"
                  className="h-8 w-8 object-cover"
                  style={{ borderRadius: '10px' }}
                />
              </div>
              <div>
                <div className="text-sm">EcoCollect</div>
                <div className="text-xs text-muted-foreground">Waste Management</div>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        onClick={() => setActiveView(item.id)}
                        isActive={activeView === item.id}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="border-t border-sidebar-border p-4">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <main className="flex-1 overflow-auto bg-background">
          {renderView()}
        </main>
      </div>
    </SidebarProvider>
  );
}