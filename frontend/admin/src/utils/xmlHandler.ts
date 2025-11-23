import { CollectionPoint, Employee, Tour } from '../types';

// Collection Points XML
export const exportCollectionPointsToXML = (points: CollectionPoint[]): string => {
  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>\n';
  const xmlContent = `<CollectionPoints>
${points.map(point => `  <CollectionPoint>
    <ID>${point.id}</ID>
    <Name>${escapeXML(point.name)}</Name>
    <Address>${escapeXML(point.address)}</Address>
    <Latitude>${point.latitude}</Latitude>
    <Longitude>${point.longitude}</Longitude>
    <WasteType>${point.wasteType}</WasteType>
    <Capacity>${point.capacity}</Capacity>
    <FillLevel>${point.fillLevel}</FillLevel>
    <LastCollection>${point.lastCollection.toISOString()}</LastCollection>
    <Status>${point.status}</Status>
  </CollectionPoint>`).join('\n')}
</CollectionPoints>`;
  return xmlHeader + xmlContent;
};

export const importCollectionPointsFromXML = (xmlString: string): CollectionPoint[] => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
  
  const pointElements = xmlDoc.getElementsByTagName('CollectionPoint');
  const points: CollectionPoint[] = [];
  
  for (let i = 0; i < pointElements.length; i++) {
    const element = pointElements[i];
    points.push({
      id: getElementText(element, 'ID'),
      name: getElementText(element, 'Name'),
      address: getElementText(element, 'Address'),
      latitude: parseFloat(getElementText(element, 'Latitude')),
      longitude: parseFloat(getElementText(element, 'Longitude')),
      wasteType: getElementText(element, 'WasteType') as any,
      capacity: parseInt(getElementText(element, 'Capacity')),
      fillLevel: parseInt(getElementText(element, 'FillLevel')),
      lastCollection: new Date(getElementText(element, 'LastCollection')),
      status: getElementText(element, 'Status') as any
    });
  }
  
  return points;
};

// Employees XML
export const exportEmployeesToXML = (employees: Employee[]): string => {
  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>\n';
  const xmlContent = `<Employees>
${employees.map(emp => `  <Employee>
    <ID>${emp.id}</ID>
    <LastName>${escapeXML(emp.lastName)}</LastName>
    <FirstName>${escapeXML(emp.firstName)}</FirstName>
    <EmployeeNumber>${emp.employeeNumber}</EmployeeNumber>
    <Role>${emp.role}</Role>
    <Phone>${emp.phone}</Phone>
    <Email>${emp.email}</Email>
    <Status>${emp.status}</Status>
  </Employee>`).join('\n')}
</Employees>`;
  return xmlHeader + xmlContent;
};

export const importEmployeesFromXML = (xmlString: string): Employee[] => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
  
  const empElements = xmlDoc.getElementsByTagName('Employee');
  const employees: Employee[] = [];
  
  for (let i = 0; i < empElements.length; i++) {
    const element = empElements[i];
    employees.push({
      id: getElementText(element, 'ID'),
      lastName: getElementText(element, 'LastName'),
      firstName: getElementText(element, 'FirstName'),
      employeeNumber: getElementText(element, 'EmployeeNumber'),
      role: getElementText(element, 'Role') as any,
      phone: getElementText(element, 'Phone'),
      email: getElementText(element, 'Email'),
      status: getElementText(element, 'Status') as any
    });
  }
  
  return employees;
};

// Tours XML
export const exportToursToXML = (tours: Tour[]): string => {
  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>\n';
  const xmlContent = `<Tours>
${tours.map(tour => `  <Tour>
    <ID>${tour.id}</ID>
    <Name>${escapeXML(tour.name)}</Name>
    <Date>${tour.date.toISOString()}</Date>
    <StartTime>${tour.startTime}</StartTime>
    <EndTime>${tour.endTime}</EndTime>
    <VehicleID>${tour.vehicleId}</VehicleID>
    <EmployeeIDs>
${tour.employeeIds.map(id => `      <EmployeeID>${id}</EmployeeID>`).join('\n')}
    </EmployeeIDs>
    <CollectionPointIDs>
${tour.collectionPointIds.map(id => `      <CollectionPointID>${id}</CollectionPointID>`).join('\n')}
    </CollectionPointIDs>
    <TotalDistance>${tour.totalDistance}</TotalDistance>
    <EstimatedDuration>${tour.estimatedDuration}</EstimatedDuration>
    <Status>${tour.status}</Status>
    <EstimatedEmissions>${tour.estimatedEmissions}</EstimatedEmissions>
    ${tour.collectedAmount ? `<CollectedAmount>${tour.collectedAmount}</CollectedAmount>` : ''}
  </Tour>`).join('\n')}
</Tours>`;
  return xmlHeader + xmlContent;
};

export const importToursFromXML = (xmlString: string): Tour[] => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
  
  const tourElements = xmlDoc.getElementsByTagName('Tour');
  const tours: Tour[] = [];
  
  for (let i = 0; i < tourElements.length; i++) {
    const element = tourElements[i];
    
    const employeeIdElements = element.getElementsByTagName('EmployeeID');
    const employeeIds: string[] = [];
    for (let j = 0; j < employeeIdElements.length; j++) {
      employeeIds.push(employeeIdElements[j].textContent || '');
    }
    
    const collectionPointIdElements = element.getElementsByTagName('CollectionPointID');
    const collectionPointIds: string[] = [];
    for (let j = 0; j < collectionPointIdElements.length; j++) {
      collectionPointIds.push(collectionPointIdElements[j].textContent || '');
    }
    
    const collectedAmountElement = element.getElementsByTagName('CollectedAmount')[0];
    
    tours.push({
      id: getElementText(element, 'ID'),
      name: getElementText(element, 'Name'),
      date: new Date(getElementText(element, 'Date')),
      startTime: getElementText(element, 'StartTime'),
      endTime: getElementText(element, 'EndTime'),
      vehicleId: getElementText(element, 'VehicleID'),
      employeeIds,
      collectionPointIds,
      totalDistance: parseFloat(getElementText(element, 'TotalDistance')),
      estimatedDuration: parseInt(getElementText(element, 'EstimatedDuration')),
      status: getElementText(element, 'Status') as any,
      estimatedEmissions: parseFloat(getElementText(element, 'EstimatedEmissions')),
      collectedAmount: collectedAmountElement ? parseInt(collectedAmountElement.textContent || '0') : undefined
    });
  }
  
  return tours;
};

// Tour Reports XML (generates a report for completed tours)
export const exportTourReportsToXML = (tours: Tour[]): string => {
  const completedTours = tours.filter(t => t.status === 'completed');
  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>\n';
  const xmlContent = `<TourReports>
${completedTours.map(tour => `  <TourReport>
    <TourID>${tour.id}</TourID>
    <TourName>${escapeXML(tour.name)}</TourName>
    <Date>${tour.date.toISOString()}</Date>
    <Duration>
      <Start>${tour.startTime}</Start>
      <End>${tour.endTime}</End>
      <EstimatedMinutes>${tour.estimatedDuration}</EstimatedMinutes>
    </Duration>
    <Performance>
      <DistanceCovered>${tour.totalDistance}</DistanceCovered>
      <CollectionPointsVisited>${tour.collectionPointIds.length}</CollectionPointsVisited>
      <CollectedAmount>${tour.collectedAmount || 0}</CollectedAmount>
      <CO2Emissions>${tour.estimatedEmissions}</CO2Emissions>
    </Performance>
    <Team>
      <VehicleID>${tour.vehicleId}</VehicleID>
      <EmployeeCount>${tour.employeeIds.length}</EmployeeCount>
    </Team>
  </TourReport>`).join('\n')}
</TourReports>`;
  return xmlHeader + xmlContent;
};

// Utility functions
const escapeXML = (str: string): string => {
  return str
    .replace(/&/g, '&')
    .replace(/</g, '<')
    .replace(/>/g, '>')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
};

const getElementText = (parent: Element, tagName: string): string => {
  const element = parent.getElementsByTagName(tagName)[0];
  return element?.textContent || '';
};

// Download helper
export const downloadXML = (xmlContent: string, filename: string) => {
  const blob = new Blob([xmlContent], { type: 'application/xml' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Upload helper
export const uploadXML = (onLoad: (content: string) => void) => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.xml,text/xml,application/xml';
  input.onchange = (e) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        onLoad(content);
      };
      reader.readAsText(file);
    }
  };
  input.click();
};
