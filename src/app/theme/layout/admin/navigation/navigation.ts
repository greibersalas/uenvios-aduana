import {Injectable} from '@angular/core';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  function?: any;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}

const NavigationItemsBase = [
  {
    id: 'navigation',
    title: 'Navigation',
    type: 'group',
    icon: 'feather icon-monitor',
    children: [
      {
        id: 'home',
        title: 'Inicio',
        type: 'item',
        icon: 'feather icon-home',
        url: '/inicio',
        breadcrumbs: false
      },
    ]
  }
];

const NavigationItems = [
  {
    id: 'navigation',
    title: 'Navigation',
    type: 'group',
    icon: 'feather icon-monitor',
    children: [
      {
        id: 'home',
        title: 'Inicio',
        type: 'item',
        icon: 'feather icon-home',
        url: '/inicio',
        breadcrumbs: false
      },
      {
        id: 'page-layouts',
        title: 'Configuración',
        type: 'collapse',
        icon: 'fas fa-users-cog',
        children: [
          {
            id: 'campus',
            title: 'Sedes',
            type: 'item',
            url: '/campus',
            target: false,
            breadcrumbs: false
          },
          {
            id: 'business-line',
            title: 'Linea de Negocio',
            type: 'item',
            url: '/business-line',
            target: false,
            breadcrumbs: false
          },
          {
            id: 'specialty',
            title: 'Especialidad',
            type: 'item',
            url: '/specialty',
            target: false,
            breadcrumbs: false
          },
          {
            id: 'tariff',
            title: 'Tarifas',
            type: 'item',
            url: '/tariff',
            target: false,
            breadcrumbs: false
          },
          {
            id: 'environment-doctor',
            title: 'Consultorios',
            type: 'item',
            url: '/environment-doctor',
            target: false,
            breadcrumbs: false
          },
          {
            id: 'doctor',
            title: 'Doctores',
            type: 'item',
            url: '/doctor',
            target: false,
            breadcrumbs: false
          },
          {
            id: 'laboratory-programming',
            title: 'Laboratorio Programación',
            type: 'item',
            url: '/laboratory-programming',
            target: false,
            breadcrumbs: false
          },
          {
            id: 'documents',
            title: 'Documentos',
            type: 'item',
            url: '/documents',
            target: false,
            breadcrumbs: false
          },
          {
            id: 'payment-method',
            title: 'Métodos de Pago',
            type: 'item',
            url: '/payment-method',
            target: false,
            breadcrumbs: false
          },
          {
            id: 'country',
            title: 'País',
            type: 'item',
            url: '/country',
            target: false,
            breadcrumbs: false
          },
          {
            id: 'coin',
            title: 'Monedas',
            type: 'item',
            url: '/coin',
            target: false,
            breadcrumbs: false
          },
          {
            id: 'districts',
            title: 'Distritos',
            type: 'item',
            url: '/districts',
            target: false,
            breadcrumbs: false
          },
          {
            id: 'exchange-rates',
            title: 'Tasa de Cambio',
            type: 'item',
            url: '/exchangerates',
            target: false,
            breadcrumbs: false
          }
        ]
      },
      {
        id: 'widget',
        title: 'Procesos',
        type: 'collapse',
        icon: 'fas fa-file-alt',
        children: [
          {
            id: 'clinic-history',
            title: 'Historia Clinica',
            type: 'item',
            url: '/clinic-history',
            target: false,
            breadcrumbs: false
          },
          {
            id: 'quotation',
            title: 'Cotización',
            type: 'item',
            url: '/quotation',
            target: false,
            breadcrumbs: false
          },
          {
            id: 'programming',
            title: 'Agenda de citas',
            type: 'item',
            url: '/diary',
            target: false,
            breadcrumbs: false
          },
          {
            id: 'lab-order',
            title: 'Laboratorio',
            type: 'item',
            url: '/lab-order',
            target: false,
            breadcrumbs: false
          }
        ]
      },
      {
        id: 'reports',
        title: 'Reportes',
        type: 'collapse',
        icon: 'fas fa-print',
        children: [
          {
            id: 'profile',
            title: 'Disponible',
            type: 'item',
            url: '/',
            breadcrumbs: false
          }
        ]
      },
      {
        id: 'users',
        title: 'Perfiles',
        type: 'collapse',
        icon: 'fas fa-users',
        children: [
          {
            id: 'roles',
            title: 'Roles',
            type: 'item',
            url: '/roles',
            breadcrumbs: false
          },
          {
            id: 'user',
            title: 'Usuarios',
            type: 'item',
            url: '/users',
            breadcrumbs: false
          }
        ]
      }
    ]
  }
];

const NavigationItemsAssistant = [
  {
    id: 'navigation',
    title: 'Navigation',
    type: 'group',
    icon: 'feather icon-monitor',
    children: [
      {
        id: 'home',
        title: 'Inicio',
        type: 'item',
        icon: 'feather icon-home',
        url: '/inicio',
        breadcrumbs: false
      },
      {
        id: 'widget',
        title: 'Procesos',
        type: 'collapse',
        icon: 'fas fa-file-alt',
        children: [
          {
            id: 'quotation',
            title: 'Cotización',
            type: 'item',
            url: '/quotation',
            target: false,
            breadcrumbs: false
          },
          {
            id: 'programming',
            title: 'Agenda de citas',
            type: 'item',
            url: '/diary',
            target: false,
            breadcrumbs: false
          },
          {
            id: 'lab-order',
            title: 'Laboratorio',
            type: 'item',
            url: '/lab-order',
            target: false,
            breadcrumbs: false
          }
        ]
      }
    ]
  }
];

const NavigationItemsDoctor = [
  {
    id: 'navigation',
    title: 'Navigation',
    type: 'group',
    icon: 'feather icon-monitor',
    children: [
      {
        id: 'home',
        title: 'Inicio',
        type: 'item',
        icon: 'feather icon-home',
        url: '/inicio',
        breadcrumbs: false
      },
      {
        id: 'widget',
        title: 'Procesos',
        type: 'collapse',
        icon: 'fas fa-file-alt',
        children: [
          {
            id: 'clinic-history',
            title: 'Historia Clinica',
            type: 'item',
            url: '/clinic-history',
            target: false,
            breadcrumbs: false
          },
          {
            id: 'programming',
            title: 'Agenda de citas',
            type: 'item',
            url: '/diary',
            target: false,
            breadcrumbs: false
          },
          {
            id: 'lab-order',
            title: 'Laboratorio',
            type: 'item',
            url: '/lab-order',
            target: false,
            breadcrumbs: false
          }
        ]
      }
    ]
  }
];

const NavigationItemsRecepcion = [
  {
    id: 'navigation',
    title: 'Navigation',
    type: 'group',
    icon: 'feather icon-monitor',
    children: [
      {
        id: 'home',
        title: 'Inicio',
        type: 'item',
        icon: 'feather icon-home',
        url: '/inicio',
        breadcrumbs: false
      },
      {
        id: 'widget',
        title: 'Procesos',
        type: 'collapse',
        icon: 'fas fa-file-alt',
        children: [
          {
            id: 'clinic-history',
            title: 'Historia Clinica',
            type: 'item',
            url: '/clinic-history',
            target: false,
            breadcrumbs: false
          },
          {
            id: 'programming',
            title: 'Agenda de citas',
            type: 'item',
            url: '/diary',
            target: false,
            breadcrumbs: false
          }
        ]
      }
    ]
  }
];

@Injectable()
export class NavigationItem {
  NavigationItemsConfiCab = {
    id: 'page-layouts',
    title: 'Configuración',
    type: 'collapse',
    icon: 'fas fa-users-cog',
    children: []
  };

  NavigationItemsProCab = {
    id: 'widget',
    title: 'Procesos',
    type: 'collapse',
    icon: 'fas fa-file-alt',
    children: []
  };

  NavigationItemsReportCab = {
    id: 'reports',
    title: 'Reportes',
    type: 'collapse',
    icon: 'fas fa-print',
    children: []
  };

  NavigationItemsUserCab = {
    id: 'users',
    title: 'Perfiles',
    type: 'collapse',
    icon: 'fas fa-users',
    children: []
  };

  NavigationItemsConfig = [
    {
      id: 'campus',
      title: 'Sedes',
      type: 'item',
      url: '/campus',
      target: false,
      breadcrumbs: false
    },
    {
      id: 'business-line',
      title: 'Linea de Negocio',
      type: 'item',
      url: '/business-line',
      target: false,
      breadcrumbs: false
    },
    {
      id: 'specialty',
      title: 'Especialidad',
      type: 'item',
      url: '/specialty',
      target: false,
      breadcrumbs: false
    },
    {
      id: 'tariff',
      title: 'Tarifas',
      type: 'item',
      url: '/tariff',
      target: false,
      breadcrumbs: false
    },
    {
      id: 'environment-doctor',
      title: 'Consultorios',
      type: 'item',
      url: '/environment-doctor',
      target: false,
      breadcrumbs: false
    },
    {
      id: 'doctor',
      title: 'Doctores',
      type: 'item',
      url: '/doctor',
      target: false,
      breadcrumbs: false
    },
    {
      id: 'laboratory-programming',
      title: 'Laboratorio Programación',
      type: 'item',
      url: '/laboratory-programming',
      target: false,
      breadcrumbs: false
    },
    {
      id: 'documents',
      title: 'Documentos',
      type: 'item',
      url: '/documents',
      target: false,
      breadcrumbs: false
    },
    {
      id: 'payment-method',
      title: 'Métodos de Pago',
      type: 'item',
      url: '/payment-method',
      target: false,
      breadcrumbs: false
    },
    {
      id: 'country',
      title: 'País',
      type: 'item',
      url: '/country',
      target: false,
      breadcrumbs: false
    },
    {
      id: 'coin',
      title: 'Monedas',
      type: 'item',
      url: '/coin',
      target: false,
      breadcrumbs: false
    },
    {
      id: 'districts',
      title: 'Distritos',
      type: 'item',
      url: '/districts',
      target: false,
      breadcrumbs: false
    },
    {
      id: 'exchange-rates',
      title: 'Tasa de Cambio',
      type: 'item',
      url: '/exchangerates',
      target: false,
      breadcrumbs: false
    }
  ];

  NavigationItemsPro = [
    {
      id: 'clinic-history',
      title: 'Historia Clinica',
      type: 'item',
      url: '/clinic-history',
      target: false,
      breadcrumbs: false
    },
    {
      id: 'quotation',
      title: 'Cotización',
      type: 'item',
      url: '/quotation',
      target: false,
      breadcrumbs: false
    },
    {
      id: 'diary',
      title: 'Agenda de citas',
      type: 'item',
      url: '/diary',
      target: false,
      breadcrumbs: false
    },
    {
      id: 'lab-order',
      title: 'Laboratorio',
      type: 'item',
      url: '/lab-order',
      target: false,
      breadcrumbs: false
    }
  ];

  NavigationItemsReport = [
    {
      id: 'report-clinic-history',
      title: 'Historia Clinica',
      type: 'item',
      url: '/reports/clinic-history',
      breadcrumbs: false
    },
    {
      id: 'report-quotations',
      title: 'Cotizaciones',
      type: 'item',
      url: '/reports/quotations',
      breadcrumbs: false
    },
    {
      id: 'report-diary',
      title: 'Agenda',
      type: 'item',
      url: '/reports/diary',
      breadcrumbs: false
    },
    {
      id: 'report-lab',
      title: 'Laboratorio',
      type: 'item',
      url: '/reports/lab',
      breadcrumbs: false
    },
    {
      id: 'report-doctor',
      title: 'Reporte Doctor',
      type: 'item',
      url: '/reports/doctor',
      breadcrumbs: false
    }
  ];

  NavigationItemsUser = [
    {
      id: 'roles',
      title: 'Roles',
      type: 'item',
      url: '/roles',
      breadcrumbs: false
    },
    {
      id: 'user',
      title: 'Usuarios',
      type: 'item',
      url: '/users',
      breadcrumbs: false
    }
  ];


  public get(): any{
    const dashboard = sessionStorage.getItem('dashboard');
    return NavigationItemsBase;
  }
}
