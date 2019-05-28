const headingMain = {
  text: 'Main Navigation',
  heading: true
};

const Settings = {
  text: 'Settings',
  link: '/settings',
  icon: 'icon-settings',
  submenu: [
    {
      text: 'Plan',
      link: '/settings/plans',
      icon: 'icon-notebook'
    },
    {
      text: 'Fees Config',
      link: '/settings/fees_config',
      icon: 'icon-wallet'
    },
    {
      text: 'Category',
      link: '/settings/category',
      icon: 'icon-list'
    }
  ]
};

const Customers = {
  text: 'Customers',
  link: '/customers',
  icon: 'icon-user',
  submenu: [
     {
      text: 'List',
      link: '/pages/customer/view',
      icon: 'icon-eye',
    },
    {
      text: 'Add',
      link: '/pages/customer/add',
      icon: 'icon-plus',
    }
  ]
};
const Items = {
  text: 'Items',
  link: '/Items',
  icon: 'icon-chemistry',
  submenu: [
    {
      text: 'List',
      link: '/pages/item/view',
      icon: 'icon-eye'
    },
    {
      text: 'Add',
      link: '/pages/item/add',
      icon: 'icon-plus'
    }
  ]
};
const branch = {
  text: 'Branches',
  link: '/branch',
  icon: 'icon-vector',
  submenu: [
    {
      text: 'List',
      link: '/pages/branch/view',
      icon: 'icon-eye'
    },
    {
      text: 'Add',
      link: '/pages/branch/add',
      icon: 'icon-plus'
    }
  ]
};
const Requests = {
  text: 'Requests',
  link: '/pages/Request',
  icon: 'icon-note',
  submenu: [
    {
      text: 'List',
      link: '/pages/request/view',
      icon: 'icon-eye'
    },
    {
      text: 'Add',
      link: '/pages/request/add',
      icon: 'icon-plus'
    }
  ]
};
export const menu = [
  headingMain,
  Requests,
  Customers,
  branch,
  Items,
  Settings,

];
