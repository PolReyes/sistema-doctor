import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import UpdateIcon from '@material-ui/icons/Update';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';

export const SidebarData = [
  {
    title: 'Búsqueda de Atenciones',
    path: '/buscar',
    icon: <SearchIcon />,
    cName: 'nav-text'
  },
  {
    title: 'Citas Atendidas',
    path: '/cita',
    icon: <AssignmentIndIcon />,
    cName: 'nav-text'
  },
  {
    title: 'Procedimientos',
    path: '/procedimientos',
    icon: <AssignmentIcon />,
    cName: 'nav-text'
  },
  {
    title: 'Bonos de Cumplimiento',
    path: '/bonos',
    icon: <AssignmentTurnedInIcon />,
    cName: 'nav-text'
  },
  {
    title: 'Generar Factura/Recibo',
    path: '/generar',
    icon: <InsertDriveFileIcon />,
    cName: 'nav-text'
  },
  {
    title: 'Actualizar Datos',
    path: '/update',
    icon: <UpdateIcon />,
    cName: 'nav-text'
  },
  {
    title: 'Cerrar Sesión',
    path: '/logout',
    icon: <ExitToAppIcon />,
    cName: 'nav-text'
  }
];